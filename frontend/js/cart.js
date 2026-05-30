(function () {
  const cartItems = document.getElementById('cart-items');
  const cartStatus = document.getElementById('cart-status');
  const summaryItems = document.getElementById('summary-items');
  const summaryTotal = document.getElementById('summary-total');
  const checkoutMessage = document.getElementById('checkout-message');
  const clearButton = document.getElementById('clear-cart');
  const syncButton = document.getElementById('sync-cart');
  const orderButton = document.getElementById('create-order');
  const checkoutForm = document.getElementById('checkout-form');
  const orderConfirmation = document.getElementById('order-confirmation');
  const checkoutUserNote = document.getElementById('checkout-user-note');
  let apiCartId = null;

  const paymentLabels = {
    transferencia: 'Transferencia',
    tarjeta: 'Tarjeta',
    efectivo: 'Efectivo',
  };

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function renderCart() {
    const items = frescoStore.getCart();
    const totalUnits = frescoStore.getCartUnits(items);
    const total = frescoStore.getCartTotal(items);

    summaryItems.textContent = String(totalUnits);
    summaryTotal.textContent = frescoStore.formatCurrency(total);

    if (!items.length) {
      cartItems.innerHTML = '';
      cartStatus.textContent = 'El carrito esta vacio.';
      return;
    }

    cartStatus.textContent = '';
    cartItems.innerHTML = items
      .map(
        (item) => `
          <article class="cart-item">
            <div class="cart-icon" aria-hidden="true">${item.producto.categoria.slice(0, 3).toUpperCase()}</div>
            <div>
              <h3>${escapeHtml(item.producto.nombre)}</h3>
              <div class="cart-meta">
                <span>${escapeHtml(item.producto.marca)}</span>
                <span>${item.cantidad} x ${frescoStore.formatCurrency(item.producto.precio)}</span>
                <span>${frescoStore.formatCurrency(item.producto.precio * item.cantidad)}</span>
              </div>
            </div>
            <button type="button" aria-label="Quitar ${item.producto.nombre}" data-remove="${item.producto.id}">X</button>
          </article>
        `
      )
      .join('');
  }

  function setCheckoutMessage(message, isError = false) {
    checkoutMessage.textContent = message;
    checkoutMessage.classList.toggle('error', isError);
  }

  function getCheckoutData() {
    const formData = new FormData(checkoutForm);
    return {
      metodoPago: formData.get('metodoPago') || 'transferencia',
      entrega: {
        nombre: formData.get('nombre') || '',
        email: formData.get('email') || '',
        telefono: formData.get('telefono') || '',
        direccion: formData.get('direccion') || '',
      },
    };
  }

  function validateCheckout() {
    if (!checkoutForm.reportValidity()) {
      setCheckoutMessage('Completa los datos de compra para crear el pedido.', true);
      return false;
    }

    return true;
  }

  function renderOrderConfirmation(order, checkoutData, total) {
    orderConfirmation.hidden = false;
    orderConfirmation.innerHTML = `
      <div>
        <p class="eyebrow">Pedido creado</p>
        <h2>${escapeHtml(order.id)}</h2>
      </div>
      <dl>
        <div>
          <dt>Estado</dt>
          <dd>${escapeHtml(order.estado || 'confirmado')}</dd>
        </div>
        <div>
          <dt>Medio de pago</dt>
          <dd>${paymentLabels[checkoutData.metodoPago] || checkoutData.metodoPago}</dd>
        </div>
        <div>
          <dt>Total</dt>
          <dd>${frescoStore.formatCurrency(total)}</dd>
        </div>
        <div>
          <dt>Contacto</dt>
          <dd>${escapeHtml(checkoutData.entrega.nombre)} - ${escapeHtml(checkoutData.entrega.email)}</dd>
        </div>
      </dl>
      <p>
        Guardamos el pedido en la API. El siguiente paso seria que administracion confirme
        el pago, prepare los componentes y cambie el estado del pedido.
      </p>
      <a class="primary-link" href="/">Seguir comprando</a>
    `;
  }

  async function syncCartWithApi() {
    const items = frescoStore.getCart();
    if (!items.length) {
      setCheckoutMessage('Agrega productos antes de enviar el carrito.', true);
      throw new Error('Carrito vacio');
    }

    syncButton.disabled = true;
    setCheckoutMessage('Enviando productos al carrito de la API...');

    try {
      const data = await frescoStore.apiRequest('/carritos', {
        method: 'POST',
        body: JSON.stringify({
          usuarioId: frescoStore.getCurrentUserId(),
          items: items.map((item) => ({
            productoId: item.producto.id,
            cantidad: item.cantidad,
          })),
        }),
      });
      apiCartId = data.carrito.id;
      setCheckoutMessage(`Carrito ${apiCartId} enviado correctamente a la API.`);
      return apiCartId;
    } catch (error) {
      setCheckoutMessage(error.message, true);
      throw error;
    } finally {
      syncButton.disabled = false;
    }
  }

  async function createOrder() {
    const items = frescoStore.getCart();
    if (!items.length) {
      setCheckoutMessage('No hay productos para crear un pedido.', true);
      return;
    }

    if (!validateCheckout()) {
      return;
    }

    orderButton.disabled = true;
    setCheckoutMessage('Creando pedido...');

    try {
      const checkoutData = getCheckoutData();
      const total = frescoStore.getCartTotal(items);
      const cartId = await syncCartWithApi();
      const data = await frescoStore.apiRequest('/pedidos', {
        method: 'POST',
        body: JSON.stringify({
          usuarioId: frescoStore.getCurrentUserId(),
          carritoId: cartId,
          metodoPago: checkoutData.metodoPago,
          entrega: checkoutData.entrega,
        }),
      });
      frescoStore.clearCart();
      renderCart();
      checkoutForm.reset();
      renderOrderConfirmation(data.pedido, checkoutData, total);
      setCheckoutMessage(`Pedido ${data.pedido.id} creado con exito.`);
    } catch (error) {
      setCheckoutMessage(error.message, true);
    } finally {
      orderButton.disabled = false;
    }
  }

  cartItems.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-remove]');
    if (!button) {
      return;
    }

    frescoStore.removeFromCart(button.dataset.remove);
    renderCart();
  });

  clearButton.addEventListener('click', () => {
    frescoStore.clearCart();
    renderCart();
    setCheckoutMessage('');
  });

  syncButton.addEventListener('click', () => {
    syncCartWithApi().catch(() => {});
  });
  orderButton.addEventListener('click', createOrder);
  const session = frescoStore.getSession();
  if (checkoutUserNote && session) {
    checkoutUserNote.innerHTML = `Pedido a nombre de <strong>${escapeHtml(session.usuario.nombre)}</strong>.`;
  }
  renderCart();
})();

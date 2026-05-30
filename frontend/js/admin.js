(function () {
  const lockedPanel = document.getElementById('admin-locked');
  const adminContent = document.getElementById('admin-content');
  const productForm = document.getElementById('product-form');
  const productFormTitle = document.getElementById('product-form-title');
  const resetProductForm = document.getElementById('reset-product-form');
  const reloadProducts = document.getElementById('reload-products');
  const adminProducts = document.getElementById('admin-products');
  const adminMessage = document.getElementById('admin-message');

  const categoryNames = {
    cpu: 'CPU',
    motherboard: 'Mother',
    gpu: 'GPU',
    ram: 'RAM',
    storage: 'Disco',
    psu: 'Fuente',
    case: 'Gabinete',
    cooler: 'Cooler',
  };

  let products = [];

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function setMessage(message, isError = false) {
    adminMessage.textContent = message;
    adminMessage.classList.toggle('error', isError);
  }

  function isAdmin() {
    return frescoStore.getSession()?.usuario?.perfil === 'admin';
  }

  function resetForm() {
    productForm.reset();
    productForm.elements.id.value = '';
    productForm.elements.consumoWatts.value = '0';
    productFormTitle.textContent = 'Agregar producto';
    setMessage('');
  }

  function getPayload() {
    const formData = new FormData(productForm);
    const potenciaSalida = formData.get('potenciaSalida');

    return {
      nombre: formData.get('nombre'),
      categoria: formData.get('categoria'),
      marca: formData.get('marca'),
      socket: formData.get('socket') || null,
      precio: Number(formData.get('precio')),
      stock: Number(formData.get('stock')),
      consumoWatts: Number(formData.get('consumoWatts') || 0),
      potenciaSalida: potenciaSalida ? Number(potenciaSalida) : null,
    };
  }

  function renderProducts() {
    if (!products.length) {
      adminProducts.innerHTML = '<p class="status-message">No hay productos cargados.</p>';
      return;
    }

    adminProducts.innerHTML = products
      .map(
        (product) => `
          <article class="admin-product">
            <div>
              <h3>${escapeHtml(product.nombre)}</h3>
              <div class="cart-meta">
                <span>${escapeHtml(product.marca)}</span>
                <span>${categoryNames[product.categoria] || product.categoria}</span>
                <span>Stock ${product.stock}</span>
                <span>${frescoStore.formatCurrency(product.precio)}</span>
              </div>
            </div>
            <div class="admin-actions">
              <button class="ghost-button" type="button" data-edit="${product.id}">Editar</button>
              <button class="danger-button" type="button" data-delete="${product.id}">Eliminar</button>
            </div>
          </article>
        `
      )
      .join('');
  }

  async function loadProducts() {
    setMessage('Cargando productos...');
    try {
      const data = await frescoStore.apiRequest('/productos');
      products = data.productos || [];
      renderProducts();
      setMessage(`${products.length} producto${products.length === 1 ? '' : 's'} cargado${products.length === 1 ? '' : 's'}.`);
    } catch (error) {
      setMessage(error.message, true);
    }
  }

  function editProduct(id) {
    const product = products.find((item) => item.id === id);
    if (!product) {
      return;
    }

    productForm.elements.id.value = product.id;
    productForm.elements.nombre.value = product.nombre;
    productForm.elements.categoria.value = product.categoria;
    productForm.elements.marca.value = product.marca;
    productForm.elements.socket.value = product.socket || '';
    productForm.elements.precio.value = product.precio;
    productForm.elements.stock.value = product.stock;
    productForm.elements.consumoWatts.value = product.consumoWatts || 0;
    productForm.elements.potenciaSalida.value = product.potenciaSalida || '';
    productFormTitle.textContent = `Editando ${product.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function deleteProduct(id) {
    const product = products.find((item) => item.id === id);
    const confirmed = window.confirm(`Eliminar ${product?.nombre || id}?`);
    if (!confirmed) {
      return;
    }

    try {
      await frescoStore.apiRequest(`/productos/${id}`, { method: 'DELETE' });
      setMessage('Producto eliminado.');
      await loadProducts();
      resetForm();
    } catch (error) {
      setMessage(error.message, true);
    }
  }

  productForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = productForm.elements.id.value;
    const payload = getPayload();
    setMessage(id ? 'Actualizando producto...' : 'Creando producto...');

    try {
      await frescoStore.apiRequest(id ? `/productos/${id}` : '/productos', {
        method: id ? 'PUT' : 'POST',
        body: JSON.stringify(payload),
      });
      setMessage(id ? 'Producto actualizado.' : 'Producto creado.');
      resetForm();
      await loadProducts();
    } catch (error) {
      setMessage(error.message, true);
    }
  });

  adminProducts.addEventListener('click', (event) => {
    const editButton = event.target.closest('button[data-edit]');
    const deleteButton = event.target.closest('button[data-delete]');

    if (editButton) {
      editProduct(editButton.dataset.edit);
    }

    if (deleteButton) {
      deleteProduct(deleteButton.dataset.delete);
    }
  });

  resetProductForm.addEventListener('click', resetForm);
  reloadProducts.addEventListener('click', loadProducts);

  if (!isAdmin()) {
    lockedPanel.hidden = false;
    adminContent.hidden = true;
    return;
  }

  lockedPanel.hidden = true;
  adminContent.hidden = false;
  loadProducts();
})();

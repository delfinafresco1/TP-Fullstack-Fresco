(function () {
  const productsGrid = document.getElementById('products-grid');
  const statusMessage = document.getElementById('status-message');
  const filtersContainer = document.getElementById('category-filters');
  const searchInput = document.getElementById('search-input');
  const productsTitle = document.getElementById('products-title');
  const statProducts = document.getElementById('stat-products');
  const builderItems = document.getElementById('builder-items');
  const builderTotal = document.getElementById('builder-total');
  const categoryNames = {
    all: 'Todos',
    cpu: 'CPU',
    motherboard: 'Mother',
    gpu: 'GPU',
    ram: 'RAM',
    storage: 'Discos',
    psu: 'Fuentes',
    case: 'Gabinetes',
    cooler: 'Coolers',
  };

  let products = [];
  let activeCategory = 'all';

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function productInitial(product) {
    return product.categoria.slice(0, 3).toUpperCase();
  }

  function matchesSearch(product, query) {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return true;
    }

    return [product.nombre, product.marca, product.categoria, product.socket]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(normalized));
  }

  function getFilteredProducts() {
    return products.filter((product) => {
      const categoryMatch = activeCategory === 'all' || product.categoria === activeCategory;
      return categoryMatch && matchesSearch(product, searchInput.value);
    });
  }

  function renderFilters() {
    const categories = ['all', ...new Set(products.map((product) => product.categoria))];
    filtersContainer.innerHTML = categories
      .map((category) => {
        const activeClass = category === activeCategory ? 'active' : '';
        const count =
          category === 'all'
            ? products.length
            : products.filter((product) => product.categoria === category).length;

        return `
          <button class="${activeClass}" type="button" data-category="${category}">
            <span>${categoryNames[category] || category}</span>
            <span>${count}</span>
          </button>
        `;
      })
      .join('');
  }

  function renderBuilderSummary() {
    const cart = frescoStore.getCart();
    builderItems.textContent = String(frescoStore.getCartUnits(cart));
    builderTotal.textContent = frescoStore.formatCurrency(frescoStore.getCartTotal(cart));
  }

  function renderProducts() {
    const filtered = getFilteredProducts();
    const selectedCategory = categoryNames[activeCategory] || activeCategory;
    productsTitle.textContent =
      activeCategory === 'all' ? 'Todos los productos' : `Categoria ${selectedCategory}`;

    if (!filtered.length) {
      productsGrid.innerHTML = '';
      statusMessage.textContent = 'No hay productos para ese filtro.';
      return;
    }

    statusMessage.textContent = `${filtered.length} producto${filtered.length === 1 ? '' : 's'} encontrado${filtered.length === 1 ? '' : 's'}.`;
    productsGrid.innerHTML = filtered
      .map(
        (product) => `
          <article class="product-card">
            <div class="product-visual" aria-hidden="true">${productInitial(product)}</div>
            <div>
              <h3>${escapeHtml(product.nombre)}</h3>
              <div class="meta-row">
                <span>${escapeHtml(product.marca)}</span>
                <span>${categoryNames[product.categoria] || product.categoria}</span>
                ${product.socket ? `<span>${escapeHtml(product.socket)}</span>` : ''}
              </div>
            </div>
            <div class="product-specs">
              <span>${product.consumoWatts || 0}W consumo</span>
              ${product.potenciaSalida ? `<span>${product.potenciaSalida}W salida</span>` : ''}
              <span>Stock ${product.stock}</span>
            </div>
            <div class="price-row">
              <span class="price">${frescoStore.formatCurrency(product.precio)}</span>
              <span class="chip">${product.id}</span>
            </div>
            <label class="quantity-control">
              <span>Cantidad</span>
              <input id="quantity-${product.id}" type="number" min="1" max="${product.stock}" value="1">
            </label>
            <button type="button" data-product-id="${product.id}" ${product.stock === 0 ? 'disabled' : ''}>Agregar</button>
          </article>
        `
      )
      .join('');
  }

  async function loadProducts() {
    try {
      const data = await frescoStore.apiRequest('/productos');
      products = data.productos || [];
      statProducts.textContent = String(products.length);
      renderFilters();
      renderProducts();
      renderBuilderSummary();
    } catch (error) {
      statusMessage.textContent = error.message;
      statusMessage.classList.add('error');
    }
  }

  filtersContainer.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-category]');
    if (!button) {
      return;
    }

    activeCategory = button.dataset.category;
    renderFilters();
    renderProducts();
  });

  productsGrid.addEventListener('click', async (event) => {
    const button = event.target.closest('button[data-product-id]');
    if (!button) {
      return;
    }

    const product = products.find((item) => item.id === button.dataset.productId);
    const quantityInput = document.getElementById(`quantity-${product.id}`);
    const quantity = Math.max(1, Number(quantityInput.value || 1));

    frescoStore.addToCart(product, quantity);
    renderBuilderSummary();
    button.textContent = 'Agregado';
    setTimeout(() => {
      button.textContent = 'Agregar';
    }, 1200);
  });

  searchInput.addEventListener('input', renderProducts);
  loadProducts();
})();

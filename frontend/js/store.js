(function () {
  const CART_KEY = 'fresco-cart';
  const SESSION_KEY = 'fresco-session';
  const API_BASE = '/api';
  const DEFAULT_USER_ID = 'usuario-1';

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (error) {
      return [];
    }
  }

  function saveCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    updateCartCount();
    window.dispatchEvent(new CustomEvent('fresco-cart-updated'));
  }

  function addToCart(product, quantity) {
    const amount = Number(quantity);
    const items = getCart();
    const existing = items.find((item) => item.producto.id === product.id);

    if (existing) {
      existing.cantidad += amount;
    } else {
      items.push({ producto: product, cantidad: amount });
    }

    saveCart(items);
  }

  function removeFromCart(productId) {
    saveCart(getCart().filter((item) => item.producto.id !== productId));
  }

  function clearCart() {
    saveCart([]);
  }

  function getCartTotal(items) {
    return items.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);
  }

  function getCartUnits(items) {
    return items.reduce((total, item) => total + item.cantidad, 0);
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(value);
  }

  function updateCartCount() {
    const count = document.getElementById('cart-count');
    if (count) {
      count.textContent = String(getCartUnits(getCart()));
    }
  }

  function getSession() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY));
    } catch (error) {
      return null;
    }
  }

  function saveSession(session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    updateSessionNav();
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
    updateSessionNav();
  }

  function getCurrentUserId() {
    const session = getSession();
    return session?.usuario?.id || DEFAULT_USER_ID;
  }

  function updateSessionNav() {
    const session = getSession();
    document.querySelectorAll('[data-session-label]').forEach((element) => {
      element.textContent = session ? session.usuario.nombre : 'Ingresar';
    });
    document.querySelectorAll('[data-admin-link]').forEach((element) => {
      element.hidden = session?.usuario?.perfil !== 'admin';
    });
  }

  async function apiRequest(path, options) {
    const session = getSession();
    const response = await fetch(`${API_BASE}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(session?.token ? { Authorization: `Bearer ${session.token}` } : {}),
      },
      ...options,
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || 'No se pudo completar la operacion');
    }

    return data;
  }

  window.frescoStore = {
    DEFAULT_USER_ID,
    addToCart,
    apiRequest,
    clearSession,
    clearCart,
    formatCurrency,
    getCart,
    getCartTotal,
    getCartUnits,
    getCurrentUserId,
    getSession,
    removeFromCart,
    saveSession,
    updateCartCount,
    updateSessionNav,
  };

  updateCartCount();
  updateSessionNav();
})();

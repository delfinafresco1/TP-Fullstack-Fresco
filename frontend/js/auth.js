(function () {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const loginMessage = document.getElementById('login-message');
  const registerMessage = document.getElementById('register-message');
  const sessionCard = document.getElementById('session-card');
  const logoutButton = document.getElementById('logout-button');

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function setMessage(element, message, isError = false) {
    element.textContent = message;
    element.classList.toggle('error', isError);
  }

  function renderSession() {
    const session = frescoStore.getSession();

    if (!session) {
      sessionCard.innerHTML = '<p>No hay una sesion iniciada.</p>';
      logoutButton.disabled = true;
      return;
    }

    logoutButton.disabled = false;
    sessionCard.innerHTML = `
      <h2>${escapeHtml(session.usuario.nombre)}</h2>
      <p>${escapeHtml(session.usuario.email)}</p>
      <span class="chip">${escapeHtml(session.usuario.perfil)}</span>
      ${session.usuario.perfil === 'admin' ? '<a class="primary-link" href="/admin.html">Abrir admin</a>' : ''}
    `;
  }

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    setMessage(loginMessage, 'Ingresando...');

    try {
      const data = await frescoStore.apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
        }),
      });
      frescoStore.saveSession(data);
      setMessage(loginMessage, `Sesion iniciada como ${data.usuario.nombre}.`);
      renderSession();
    } catch (error) {
      setMessage(loginMessage, error.message, true);
    }
  });

  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(registerForm);
    setMessage(registerMessage, 'Creando usuario...');

    try {
      await frescoStore.apiRequest('/usuarios', {
        method: 'POST',
        body: JSON.stringify({
          nombre: formData.get('nombre'),
          email: formData.get('email'),
          password: formData.get('password'),
          perfil: formData.get('perfil'),
        }),
      });
      setMessage(registerMessage, 'Usuario creado. Ahora podes iniciar sesion.');
      registerForm.reset();
    } catch (error) {
      setMessage(registerMessage, error.message, true);
    }
  });

  logoutButton.addEventListener('click', () => {
    frescoStore.clearSession();
    setMessage(loginMessage, 'Sesion cerrada.');
    renderSession();
  });

  renderSession();
})();

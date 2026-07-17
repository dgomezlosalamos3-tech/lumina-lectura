
const supabaseClient = window.supabase.createClient(
  'https://lnblooccrqjmkkibqspj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuYmxvb2NjcnFqbWtraWJxc3BqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyMTgwMjIsImV4cCI6MjA5OTc5NDAyMn0.sf6aBWWzXZ6GvOwwZ6yJg857gxU-OfHlwr4776RF918'
);

const signupForm = document.querySelector('#signup-form');
const signupMessage = document.querySelector('#form-message');
const loginForm = document.querySelector('#login-form');
const loginMessage = document.querySelector('#login-message');
const library = document.querySelector('#biblioteca');
const logout = document.querySelector('#logout');
const downloadMessage = document.querySelector('#download-message');

function showLibrary() {
  library.hidden = false;
  library.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#signup-password').value;
  signupMessage.textContent = 'Creando tu cuentaâ€¦';

  const { error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: { data: { full_name: name } }
  });

  if (error) {
    signupMessage.textContent = error.message;
    return;
  }

  signupForm.reset();
  signupMessage.textContent = 'Â¡Cuenta creada! Ya puedes acceder a la biblioteca.';
  showLibrary();
});

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.querySelector('#login-email').value.trim();
  const password = document.querySelector('#password').value;
  loginMessage.textContent = 'Comprobando tu cuentaâ€¦';

  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if (error) {
    loginMessage.textContent = 'No pudimos iniciar sesiÃ³n. Revisa que el correo y la contraseÃ±a sean los mismos que usaste al crear tu cuenta.';
    return;
  }

  loginForm.reset();
  loginMessage.textContent = 'Â¡Bienvenido/a!';
  showLibrary();
});

logout.addEventListener('click', async () => {
  await supabaseClient.auth.signOut();
  library.hidden = true;
  document.querySelector('#registro').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.querySelectorAll('.download').forEach((button) => {
  button.addEventListener('click', () => {
    downloadMessage.textContent = 'Tu descarga se abrirÃ¡ en una nueva pestaÃ±a.';
  });
});

supabaseClient.auth.getSession().then(({ data: { session } }) => {
  if (session?.user) showLibrary();
});

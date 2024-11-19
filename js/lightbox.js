// Elementos do Lightbox
const lightboxLogin = document.getElementById('lightbox-login');
const lightboxCadastro = document.getElementById('lightbox-cadastro');
const closeLoginBtn = document.getElementById('close-login');
const closeCadastroBtn = document.getElementById('close-cadastro');
const openLoginBtn = document.getElementById('open-login');
const openCadastroBtn = document.getElementById('open-cadastro');

// Abrir o Lightbox de Login
openLoginBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Evita comportamento padrão do link
    lightboxLogin.classList.add('show'); // Mostra o lightbox de login
});

// Abrir o Lightbox de Cadastro
openCadastroBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Evita comportamento padrão do link
    lightboxCadastro.classList.add('show'); // Mostra o lightbox de cadastro
    lightboxLogin.classList.remove('show'); // Esconde o lightbox de login
});

// Fechar o Lightbox de Login
closeLoginBtn.addEventListener('click', () => {
    lightboxLogin.classList.remove('show');
});

// Fechar o Lightbox de Cadastro
closeCadastroBtn.addEventListener('click', () => {
    lightboxCadastro.classList.remove('show');
});

// Fechar os lightboxes ao clicar fora do conteúdo
window.addEventListener('click', (e) => {
    if (e.target === lightboxLogin) {
        lightboxLogin.classList.remove('show');
    }
    if (e.target === lightboxCadastro) {
        lightboxCadastro.classList.remove('show');
    }
});

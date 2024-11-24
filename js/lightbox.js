// Selecionando os elementos do lightbox
const openLoginBtn = document.getElementById('open-login');
const lightboxLogin = document.getElementById('lightbox-login');
const closeLoginBtn = document.getElementById('close-login');

const openCadastroBtn = document.getElementById('open-cadastro');
const lightboxCadastro = document.getElementById('lightbox-cadastro');
const closeCadastroBtn = document.getElementById('close-cadastro');

// Função para abrir o lightbox de login
openLoginBtn.addEventListener('click', () => {
    lightboxLogin.classList.add('show');
});

// Função para fechar o lightbox de login
closeLoginBtn.addEventListener('click', () => {
    lightboxLogin.classList.remove('show');
});

// Função para abrir o lightbox de cadastro
openCadastroBtn.addEventListener('click', () => {
    lightboxCadastro.classList.add('show');
    lightboxLogin.classList.remove('show'); // Fecha o lightbox de login ao abrir o de cadastro
});

// Função para fechar o lightbox de cadastro
closeCadastroBtn.addEventListener('click', () => {
    lightboxCadastro.classList.remove('show');
});

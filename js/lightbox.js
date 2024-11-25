// Selecionando os elementos do lightbox
const openLoginBtn = document.getElementById('open-login');
const lightboxLogin = document.getElementById('lightbox-login');
const closeLoginBtn = document.getElementById('close-login');

const openCadastroBtn = document.getElementById('open-cadastro');
const lightboxCadastro = document.getElementById('lightbox-cadastro');
const closeCadastroBtn = document.getElementById('close-cadastro');

const openSobreBtn = document.querySelector('a[href="sobre"]');
const lightboxSobre = document.getElementById('lightbox-sobre');
const closeSobreBtn = document.getElementById('close-sobre');

// Função para abrir o lightbox de login
openLoginBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Previne comportamento padrão do link
    lightboxLogin.classList.add('show');
});

// Função para fechar o lightbox de login
closeLoginBtn.addEventListener('click', () => {
    lightboxLogin.classList.remove('show');
});

// Função para abrir o lightbox de cadastro
openCadastroBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Previne comportamento padrão do link
    lightboxCadastro.classList.add('show');
    lightboxLogin.classList.remove('show'); // Fecha o lightbox de login ao abrir o de cadastro
});

// Função para fechar o lightbox de cadastro
closeCadastroBtn.addEventListener('click', () => {
    lightboxCadastro.classList.remove('show');
});

// Função para abrir o lightbox de sobre
openSobreBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Previne comportamento padrão do link
    lightboxSobre.classList.add('show');
});

// Função para fechar o lightbox de sobre
closeSobreBtn.addEventListener('click', () => {
    lightboxSobre.classList.remove('show');
});

// Fechar os lightboxes ao clicar fora do conteúdo
document.addEventListener('click', (e) => {
    if (e.target === lightboxLogin) {
        lightboxLogin.classList.remove('show');
    }
    if (e.target === lightboxCadastro) {
        lightboxCadastro.classList.remove('show');
    }
    if (e.target === lightboxSobre) {
        lightboxSobre.classList.remove('show');
    }
});

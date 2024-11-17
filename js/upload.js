const form = document.getElementById('uploadForm');
const messageDiv = document.getElementById('message');

form.addEventListener('submit', function(event) {
    event.preventDefault();  // Previne o envio tradicional do formulário

    const name = document.getElementById('name').value;
    const video = document.getElementById('video').files[0];

    // Limpar mensagens anteriores
    messageDiv.textContent = '';
    messageDiv.classList.remove('error', 'success');

    // Validação do arquivo
    if (video && video.size > 30 * 1024 * 1024) {  // Limite de 30MB
        messageDiv.textContent = 'O arquivo não pode ultrapassar 30 MB.';
        messageDiv.classList.add('error');
        return;
    }

    if (video && video.type !== 'video/mp4') {
        messageDiv.textContent = 'Por favor, envie um arquivo MP4.';
        messageDiv.classList.add('error');
        return;
    }

    // Criação de um FormData para enviar os dados
    const formData = new FormData();
    formData.append('name', name);
    formData.append('file', video);

    // Enviar para o backend
    fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            messageDiv.textContent = data.message + ' Tempo: ' + data.time + ' segundos';
            messageDiv.classList.add('success');
        } else if (data.error) {
            messageDiv.textContent = 'Erro: ' + data.error;
            messageDiv.classList.add('error');
        }
    })
    .catch(error => {
        messageDiv.textContent = 'Erro ao enviar o arquivo. Tente novamente.';
        messageDiv.classList.add('error');
    });
});
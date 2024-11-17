 // Função para buscar o ranking do backend
 function fetchRanking() {
    fetch('http://127.0.0.1:5000/ranking')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('rankingTable').getElementsByTagName('tbody')[0];
            const messageDiv = document.getElementById('message');
            tableBody.innerHTML = ''; // Limpar a tabela antes de adicionar novos dados

            if (data.error) {
                messageDiv.textContent = 'Erro ao carregar o ranking: ' + data.error;
                messageDiv.classList.add('error');
                messageDiv.classList.remove('success');
            } else if (data.length === 0) {
                messageDiv.textContent = 'Não há rankings registrados ainda.';
                messageDiv.classList.add('error');
                messageDiv.classList.remove('success');
            } else {
                messageDiv.textContent = '';
                messageDiv.classList.remove('error');
                messageDiv.classList.add('success');

                // Inserir os jogadores na tabela
                data.forEach((player, index) => {
                    const row = tableBody.insertRow();
                    const posCell = row.insertCell(0);
                    const nameCell = row.insertCell(1);
                    const timeCell = row.insertCell(2);
                    const videoCell = row.insertCell(3);

                    posCell.textContent = index + 1;
                    nameCell.textContent = player.name;
                    timeCell.textContent = player.time;
                    videoCell.innerHTML = `<a href="${player.video}" target="_blank">Ver Vídeo</a>`;
                });
            }
        })
        .catch(error => {
            const messageDiv = document.getElementById('message');
            messageDiv.textContent = 'Erro ao carregar o ranking. Tente novamente.';
            messageDiv.classList.add('error');
        });
}

// Chama a função quando a página for carregada
window.onload = fetchRanking;
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const formData = new FormData(this);
    const email = formData.get('email');
    const senha = formData.get('senha');

    fetch('http://localhost:3000/contas')
        .then(response => response.json())
        .then(contas => {
            const conta = contas.find(conta => conta.email === email);
            const errorMessage = document.getElementById('error-message');

            if (!conta) {
                errorMessage.textContent = 'Email incorreto';
            } else if (conta.senha !== senha) {
                errorMessage.textContent = 'Senha incorreta';
            } else {
                // Login bem-sucedido
                window.location.href = 'reservas.html';
            }
        })
        .catch(error => {
            console.error('Erro ao carregar contas:', error);
            alert('Erro ao realizar login. Tente novamente mais tarde.');
        });
});

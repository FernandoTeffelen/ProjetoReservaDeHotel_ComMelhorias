document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    if (data.senha !== data.confirmarSenha) {
        alert('A senha deve ser a mesma.');
        return;
    }

    fetch('http://localhost:3000/contas')
        .then(response => response.json())
        .then(contas => {
            const emailExistente = contas.find(conta => conta.email === data.email);
            if (emailExistente) {
                alert('Já existe uma conta com esse e-mail.');
                return;
            }

            fetch('http://localhost:3000/contas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome: data.nome, email: data.email, senha: data.senha }),
            })
            .then(response => response.json())
            .then(() => {
                alert('Conta criada com sucesso!');
                window.location.href = 'login.html'; // Redireciona para a página de login
            })
            .catch((error) => {
                console.error('Erro ao criar a conta:', error);
                alert('Ocorreu um erro ao criar a conta.');
            });
        })
        .catch(error => {
            console.error('Erro ao verificar contas:', error);
            alert('Ocorreu um erro ao verificar as contas.');
        });
});

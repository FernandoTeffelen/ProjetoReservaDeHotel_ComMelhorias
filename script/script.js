// Envio do formulário de reserva
document.getElementById('bookingForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    fetch('http://localhost:3000/reservas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Reserva criada:', data);
        alert('Reserva realizada com sucesso!');
        this.reset(); // Limpa o formulário
    })
    .catch((error) => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao realizar a reserva.');
    });
});

// Carregamento das reservas na página reservas.html
if (window.location.pathname.endsWith('controller/reservas.html')) {
    window.onload = function() {
        fetch('http://localhost:3000/reservas')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar reservas: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const tableBody = document.getElementById('reservasTableBody');
                tableBody.innerHTML = ''; // Limpa o conteúdo anterior
                data.forEach(reserva => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${reserva.nome || 'N/A'}</td>
                        <td>${reserva.email || 'N/A'}</td>
                        <td>${reserva.dataEntrada || 'N/A'}</td>
                        <td>${reserva.dataSaida || 'N/A'}</td>
                        <td>${reserva.adultos || 'N/A'}</td>
                        <td>${reserva.criancas || 'N/A'}</td>
                        <td>${reserva.observacoes || 'N/A'}</td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar reservas:', error);
                alert('Não foi possível carregar as reservas.');
            });
    };
}

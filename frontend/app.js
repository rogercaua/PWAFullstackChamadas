// Registrar o Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('Service Worker registrado com sucesso:', registration);
            })
            .catch(error => {
                console.error('Falha ao registrar o Service Worker:', error);
            });
    });
}

// Lógica para registrar presença
document.getElementById("presencaForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const nomeAluno = event.target.nomeAluno.value;
    const resumoAula = event.target.resumoAula.value;
    const localizacao = event.target.localizacao.value;

    try {
        const response = await fetch("http://localhost:8000/presenca", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nomeAluno, resumoAula, localizacao }),
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message); 
            event.target.reset(); 
            listarPresencas(); 
        }
    } catch (error) {
        console.error("Erro ao registrar presença:", error);
        alert("Ocorreu um erro ao registrar a presença.");
    }
});

// Função para listar as presenças
async function listarPresencas() {
    try {
        const response = await fetch("http://localhost:8000/presenca");
        const presencas = await response.json();

        const presencaList = document.getElementById("presencaList");
        presencaList.innerHTML = ""; // Limpa a lista atual
        presencas.forEach(presenca => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${presenca.nomeAluno}</td>
                <td>${presenca.resumoAula}</td>
                <td>${presenca.localizacao}</td>
            `;
            presencaList.appendChild(row);
        });
    } catch (error) {
        console.error("Erro ao listar presenças:", error);
    }
}

// Chama a função de listagem ao carregar a página
listarPresencas();

// Array para armazenar os dados da tabela
let dataArray = [];

// Função para alternar entre tema claro e escuro
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    
    // Alterna o ícone e o texto
    const themeIcon = document.getElementById('theme-icon');
    if (document.body.classList.contains('dark-theme')) {
        themeIcon.textContent = '🌞';  // Sol para tema escuro
    } else {
        themeIcon.textContent = '🌙';  // Lua para tema claro
    }
}

// Função para adicionar uma linha na tabela
function addRow() {
    let xValue = document.getElementById("xInput").value;
    let yValue = document.getElementById("yInput").value;

    // Verifica se os valores estão preenchidos
    if (xValue && yValue) {
        // Adiciona os dados na array
        dataArray.push({x: parseFloat(xValue), y: parseFloat(yValue)});
        
        // Atualiza a tabela
        populateTable();
        
        // Atualiza o gráfico
        updateChart();
        
        // Limpa os campos de entrada
        document.getElementById("xInput").value = '';
        document.getElementById("yInput").value = '';
    } else {
        alert("Por favor, preencha ambos os campos de X e Y.");
    }
}

// Função para preencher a tabela com os dados da array
function populateTable() {
    let tableBody = document.getElementById("table-body");
    tableBody.innerHTML = ""; // Limpa a tabela antes de adicionar
    dataArray.forEach((item, index) => {
        let row = document.createElement("tr");

        let cellX = document.createElement("td");
        let cellY = document.createElement("td");
        let cellAction = document.createElement("td");
        let deleteButton = document.createElement("button");

        cellX.textContent = item.x;
        cellY.textContent = item.y;

        // Botão para remover linha
        deleteButton.textContent = "Remover";
        deleteButton.onclick = () => {
            dataArray.splice(index, 1); // Remove o item da array
            populateTable(); // Atualiza a tabela
            updateChart(); // Atualiza o gráfico
        };

        cellAction.appendChild(deleteButton);
        row.appendChild(cellX);
        row.appendChild(cellY);
        row.appendChild(cellAction);
        tableBody.appendChild(row);
    });
}

// Função para criar o gráfico com base nos dados
function updateChart() {
    let ctx = document.getElementById("myChart").getContext("2d");

    // Se o gráfico já existir, destruímos ele antes de criar um novo
    if (window.chartInstance) {
        window.chartInstance.destroy();
    }

    // Criação do novo gráfico
    window.chartInstance = new Chart(ctx, {
        type: "scatter", // Tipo de gráfico (linha)
        data: {
            labels: dataArray.map(item => item.x), // Valores de X como labels
            datasets: [{
                label: "Gráfico de X vs Y",
                data: dataArray.map(item => item.y), // Valores de Y
                borderColor: "rgb(255, 0, 0)",
                backgroundColor: "rgb(255, 0, 0)",
                pointRadius: 5,
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true,
                    type: 'linear', // Escala linear para o eixo X
                    position: 'bottom',
                    grid: {
                        color: "rgb(0, 0, 200)", // Cor das linhas horizontais (X)
                    }
                },
                y: {
                    beginAtZero: true, // Começar o eixo Y no zero
                    grid: {
                        color: "rgb(0, 0, 200)" // Cor das linhas horizontais (X)
                    },
                }
            }
        }
    });
}
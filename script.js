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

// Função do plano cartesiano
function paresOrdenados() {
    //Lembrar de fazer uma verficação para nao permitir um conjunto vazio
    let xValue = document.getElementById("xInput").value;
    let yValue = document.getElementById("yInput").value;
    console.log(xValue);
 
    xArray = makeArray(xValue);
    yArray = makeArray(yValue);
    document.getElementById("testeDados").textContent = xArray;
    document.getElementById("testeDados2").textContent = yArray;
        
    console.log(xArray);
    console.log(yArray);

    function makeArray(value){
        let numArray = value.split(/[\s,]+/);// Regex para espaços e vírgulas
        numArray = numArray.map(num => parseFloat(num));
        return numArray;
    }

    let produtoCartesiano = [];
    for (let i = 0; i < xArray.length; i++) {
        for (let j = 0; j < yArray.length; j++) {
            produtoCartesiano.push([xArray[i], yArray[j]]);
        }
    }
    dataArray = produtoCartesiano;
    console.log(dataArray);
    dataArray.forEach((par) => {
        console.log(`Par: (${par[0]}, ${par[1]})`);
    });
    
    document.getElementById("testeDados3").textContent = produtoCartesiano;
        // Atualiza a tabela
        populateTable();
        
        // Atualiza o gráfico
        updateChart();
        
        // Limpa os campos de entrada (ver se mantem ou tira essa parte)
        //document.getElementById("xInput").value = '';
        //document.getElementById("yInput").value = '';

}

// Função para preencher a tabela com os dados da array
function populateTable() {
    let tableBody = document.getElementById("table-body");
    tableBody.innerHTML = ""; // Limpa a tabela antes de adicionar
    dataArray.forEach((par) => {
        let row = document.createElement("tr");

        let cellX = document.createElement("td");
        let cellY = document.createElement("td");
        let cellAction = document.createElement("td");
        let deleteButton = document.createElement("button");

        cellX.textContent = par[0];
        cellY.textContent = par[1];

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
            labels: dataArray.map(item => item[0]), // Valores de X como labels
            datasets: [{
                label: "Gráfico de X vs Y",
                data: dataArray.map(item => item[1]), // Valores de Y
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
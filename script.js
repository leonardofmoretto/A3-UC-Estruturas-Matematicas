// Array para armazenar os dados da tabela
let dataArray = [];
let array_A, array_B;
let max_A, min_A, max_B, min_B;
let maiorA, maiorB, maiorFinal;
const pointColors = [
        '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFFF33',
        '#FF8C00', '#8A2BE2', '#A52A2A', '#5F9EA0', '#D2691E',
        '#FF1493', '#C71585', '#7FFF00', '#D3D3D3', '#C0C0C0',
        '#FFD700', '#ADFF2F', '#8B0000', '#FF6347', '#20B2AA',
        '#FF4500', '#32CD32', '#FFD700', '#6A5ACD', '#FF8C00',
        '#708090', '#2E8B57', '#A9A9A9', '#F0E68C', '#FF1493',
        '#B0E0E6', '#800080', '#98FB98', '#D8BFD8', '#F4A460',
        '#2F4F4F', '#00FFFF', '#FF00FF', '#4682B4', '#B22222',
        '#9ACD32', '#FFB6C1', '#20B2AA', '#87CEEB', '#FF69B4'
    ];
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

function achaMaior(val1, val2){
    valAbsoluto1 = Math.abs(val1);
    valAbsoluto2 = Math.abs(val2);
    if(valAbsoluto1 > valAbsoluto2)
        return valAbsoluto1;
    else return valAbsoluto2;
}

// Função do plano cartesiano
function paresOrdenados() {
    
    //Lembrar de fazer uma verficação para nao permitir um conjunto vazio
    let conjuntoA = document.getElementById("xInput").value;
    let conjuntoB = document.getElementById("yInput").value;
    console.log(conjuntoA);
 
    function makeArray(value){
        let numArray = value.split(/[\s,]+/);// Regex para espaços e vírgulas
        numArray = numArray.map(num => parseFloat(num));
        return numArray;
    }
    
    array_A = makeArray(conjuntoA);
    max_A = Math.max(...array_A);
    min_A = Math.min(...array_A);

    array_B = makeArray(conjuntoB);
    max_B = Math.max(...array_B);
    min_B = Math.min(...array_B);

    maiorA = achaMaior(max_A,min_A);
    maiorB = achaMaior(max_B,min_B);
    maiorFinal = achaMaior(maiorA,maiorB);
    
    document.getElementById("testeDados").textContent = array_A + "MAX " + max_A + " MIN " + min_A;
    document.getElementById("testeDados2").textContent = array_B + "MAX " + max_B + " MIN " + min_B;
        
    console.log(array_A);
    console.log(array_B);

    

    let produtoCartesiano = [];
    for (let i = 0; i < array_A.length; i++) {
        for (let j = 0; j < array_B.length; j++) {
            produtoCartesiano.push([array_A[i], array_B[j]]);
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
    dataArray.forEach((par, index) => {
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
            console.log("PLAU");
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
            datasets: [{
                label: "A x B",
                data: dataArray.map(item => ({x: item[0], y: item[1]})), // Valores de Y
                borderColor: pointColors,
                backgroundColor: pointColors,
                pointRadius: 7,
                showLine: false,
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    min: -maiorFinal - 5,
                    max: maiorFinal + 5,
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1, // Ajusta o tamanho do passo
                        font: {
                            size: 14,  // Tamanho da fonte dos números no eixo Y
                            weight: 'bold', // Opção para aumentar a espessura da fonte
                            family: 'Arial', // Fonte utilizada (opcional)
                        },
                    },
                    grid: {
                        drawOnChartArea: true,
                        drawBorder: true,
                        //color: "rgb(200,200,200)",
                    }
                },
                y: {
                    min: -maiorFinal - 5,
                    max: maiorFinal + 5,
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1, // Ajusta o tamanho do passo
                        font: {
                            size: 14,  // Tamanho da fonte dos números no eixo Y
                            weight: 'bold', // Opção para aumentar a espessura da fonte
                            family: 'Arial', // Fonte utilizada (opcional)
                        },
                    },
                    grid: {
                        drawOnChartArea: true,
                        drawBorder: true,
                        //color: "rgb(200,200,200)",
                    }
                }
            },
            plugins: {
                legend: {
                    display: true // Exibe a legenda
                },
                tooltip: {
                    enabled: true,  // Habilita ou desabilita o tooltip
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Cor de fundo da caixa do tooltip
                    titleColor: '#FFFFFF',  // Cor do título do tooltip
                    bodyColor: '#FFFFFF',  // Cor do corpo do tooltip (onde os dados do ponto são exibidos)
                    borderColor: '#ff6347',  // Cor da borda da caixa de tooltip
                    borderWidth: 2,  // Largura da borda
                    padding: 10,  // Padding (espaçamento interno) da caixa de texto
                    cornerRadius: 5,  // Arredondamento dos cantos da caixa
                    boxWidth: 10,  // Tamanho da caixa que exibe o ponto (em pixels)
                    titleFont: { // Fonte do título
                        size: 14,
                        weight: 'bold',
                        family: 'Arial'
                    },
                    bodyFont: {  // Fonte do corpo
                        size: 12,
                        weight: 'normal',
                        family: 'Arial'
                    },
                    displayColors: false,  // Desabilita a exibição da cor do ponto no tooltip
                },
            }
        },
        // Depois de desenhar o gráfico, desenha as linhas pontilhadas
        plugins: [{
            beforeDraw: function (chart) {
                const ctx = chart.ctx;
                const dataset = chart.data.datasets[0];
                const points = dataset.data;
                
                const xCenter = chart.scales.x.getPixelForValue(0);
                const yCenter = chart.scales.y.getPixelForValue(0);

                ctx.beginPath();
                ctx.moveTo(35, yCenter);
                ctx.lineTo(chart.width - 10, yCenter);
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'black';
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(xCenter, 30);
                ctx.lineTo(xCenter, chart.height - 30);
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'black';
                ctx.stroke();

                points.forEach((point, index) => {
                    const color = dataset.backgroundColor[index];
        
                    // Desenhando as linhas pontilhadas
                    ctx.save();
                    ctx.strokeStyle = color; // Cor do ponto
                    ctx.setLineDash([5, 5]); // Define o estilo de linha pontilhada
                    ctx.lineWidth = 2;
        
                    // Linha horizontal do ponto até o eixo X
                    ctx.beginPath();
                    ctx.moveTo(chart.scales['x'].getPixelForValue(0), chart.scales['y'].getPixelForValue(point.y)); // Começa no eixo X
                    ctx.lineTo(chart.scales['x'].getPixelForValue(point.x), chart.scales['y'].getPixelForValue(point.y));
                    ctx.stroke();
        
                    // Linha vertical do ponto até o eixo Y (corrigido)
                    ctx.beginPath();
                    ctx.moveTo(chart.scales['x'].getPixelForValue(point.x), chart.scales['y'].getPixelForValue(0)); // Começa no eixo Y (y = 0)
                    ctx.lineTo(chart.scales['x'].getPixelForValue(point.x), chart.scales['y'].getPixelForValue(point.y)); // Vai até o ponto
                    ctx.stroke();
        
                    ctx.restore();
                });
            }
        }]        
    });
}

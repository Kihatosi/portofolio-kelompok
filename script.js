let myChart = null;

async function fetchData() {
  const response = await fetch('data.json');
  return await response.json();
}

async function renderChart() {
  const data = await fetchData();
  const selectedMetric = document.getElementById('metric').value;
  
  const labels = [...new Set(data.map(item => `Input: ${item.input_size}`))];
  const algoA = data.filter(item => item.metode === 'Algoritma A').map(item => item[selectedMetric]);
  const algoB = data.filter(item => item.metode === 'Algoritma B').map(item => item[selectedMetric]);

  const ctx = document.getElementById('experimentChart').getContext('2d');
  
  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        { label: 'Algoritma A', data: algoA, borderColor: '#1a73e8', fill: false },
        { label: 'Algoritma B', data: algoB, borderColor: '#e53935', fill: false }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: `Hasil Pengukuran: ${selectedMetric}` }
      }
    }
  });
}

renderChart();

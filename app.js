const ctx = document.getElementById('chart');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["2019","2020","2021","2022","2023"],
    datasets: [{
      label: 'BTC',
      data: [4000,9000,60000,20000,40000],
      borderColor: 'orange'
    }]
  }
});

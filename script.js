const ctx = document.getElementById('expenseChart').getContext('2d');
    let expenseData = {};
    let chart;

    function updateChart() {
      if (chart) chart.destroy();

      const labels = Object.keys(expenseData);
      const data = Object.values(expenseData);

      chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Expenses',
            data: data,
            backgroundColor: [
              '#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff', '#ff9f40'
            ],
          }],
        },
        options: {
          responsive: true,
        }
      });
    }

    document.getElementById('expense-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const category = document.getElementById('category').value.trim();
      const amount = parseFloat(document.getElementById('amount').value);
      if (!category || isNaN(amount) || amount <= 0) return;

      if (expenseData[category]) {
        expenseData[category] += amount;
      } else {
        expenseData[category] = amount;
      }

      updateChart();
      this.reset();
    });

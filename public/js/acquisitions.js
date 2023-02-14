(async function() {
  new Chart(
    document.getElementById('acquisitions'),
    {
      type: 'pie',
      data: {
        labels: ["Levi", "Jagpreet" ],
        datasets: [
          {
            backgroundColor: ["rgba(179,181,198,0.2)", "rgba(255,99,132,0.2)"],
            borderColor: "rgba(179,181,198,1)",
            pointBackgroundColor: "rgba(179,181,198,1)",
            pointHoverBorderColor: "rgba(179,181,198,1)",
            data: [60, 40]
          },
        ]
      }
    }
  );
})();

(async function() {
  new Chart(
    document.getElementById('acquisitions'),
    {
      type: 'radar',
      data: {
        labels: ["Exercise", "Coding", "Reading", "Breathing"],
        datasets: [
          {
            label: "Levi",
            backgroundColor: "rgba(179,181,198,0.2)",
            borderColor: "rgba(179,181,198,1)",
            pointBackgroundColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
            data: [40, 80, 10, 20]
          },
          {
            label: "Jagpreet",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            pointBackgroundColor: "rgba(255,99,132,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,99,132,1)",
            data: [80, 70, 60, 10]
          }
        ]
      }
    }
  );
})();
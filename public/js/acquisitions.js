new Chart(
    document.getElementById('acquisitions'),
    {
      type: 'radar',
      data: {
        labels: ["tictactoe", "Coding", "Reading", "Breathing"],
        datasets: [
          {
            label: "Levi",
            backgroundColor: "fff",
            borderColor: "rgba(179,181,198,1)",
            pointBackgroundColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
            data: [40, 80, 10, 20]
          },
          {
            label: "Jagpreet",
            backgroundColor: "fff",
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
;
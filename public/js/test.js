const addActivity = async (event) => {
    event.preventDefault();

    let activityName = document.querySelector('#event-label').value.trim();
    let date = document.querySelector('#date')
    let firstUser = document.querySelector('#first-username').value.trim();
    let firstUserScore = document.querySelector('#first-score').value.trim();
    let secondUser = document.querySelector('#second-username').value.trim();
    let secondUserScore = document.querySelector('#second-score').value.trim();
    let partnerID = 1;

    let firstUserID = await fetch(`/api/users/${firstUser}`)
      .then(function (res) {
        return res.json()
      })
      .then(function (dataOne) {
        return dataOne.id
      })
  
    let secondUserID = await fetch(`/api/users/${secondUser}`)
      .then(function (res) {
        return res.json()
      })
      .then(function (dataTwo) {
        return dataTwo.id
      })
  
    const response = await fetch('/api/activities', {
      method: 'POST',
      body: JSON.stringify({ activityName, date, firstUserID, secondUserID, firstUserScore, secondUserScore, partnerID }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      alert('Activity Created!')
    } else {
      alert('Failed to create new activity!')
    }
  }
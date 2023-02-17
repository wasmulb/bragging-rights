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

const partners_id=2
var actSection = document.getElementById('act-section')
function viewActivities(){
    fetch("/api/partners")
    .then(function(response){
        return response.json()
    })
    .then(function (data){
        console.log("activity data")
        console.log(data.dict[partners_id].activities)
        let partnersActivities = data.dict[partners_id].activities
        for(i = 0; i < partnersActivities.length; i++){
            var activityName = document.createElement('h1')
            var activityDate = document.createElement('h2')
            var firstUserScore = document.createElement('h2')
            var secondUserScore = document.createElement('h2')
            activityName.innerText = "Game/Match: " + partnersActivities[i].activity_name
            activityDate.innerText = "Date: " + partnersActivities[i].date
            firstUserScore.innerText = "User One Score: "+ partnersActivities[i].userOne_score
            secondUserScore.innerText = "User Two Score: "+ partnersActivities[i].userTwo_score
            actSection.appendChild(activityName)
            actSection.appendChild(activityDate)
            actSection.appendChild(firstUserScore)
            actSection.appendChild(secondUserScore)
        }
    })
}
viewActivities();

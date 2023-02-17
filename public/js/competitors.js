//For displaying the logged in users competitors
var compSection = document.getElementById('#comp-section')

var userID = 1
let username;
function viewCompetitors(){

    fetch("/api/partners/test")
    .then(function(response) {
      return response.json()
    })
    
    .then(function (data) {
      //check if fetch works
        console.log("get partners here")
        console.log(data)
        console.log(data.partnerships[0][0].username)
        // const user1 =data.partnerships[0][0].username
        // // console.log(user1)
        console.log(data.partnerships[1][0].username)
      //create for loop to append to page

        for(var i= 0; i<data.partnerships.length; i++){
            var compTag = document.createElement('a')
            compTag.classList.add("comp-tag")
            compTag.setAttribute("href", "/event")
            //after user clicks on competitors send them to next screen
            compTag.innerText = (" ")+ data.partnerships[i][0].username;
            let compSection = document.getElementById('compSection')
            compSection.appendChild(compTag)
        };
    })
    .catch(function (error) {
      console.log("Error: " + error);
})};


const addCompetitor = async (event) => {
  event.preventDefault();

  let firstUser = document.querySelector('#first-username').value.trim();
  let secondUser = document.querySelector('#second-username').value.trim();

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


  console.log('test!',firstUserID, secondUserID)

  const response = await fetch('/api/partners', {
    method: 'POST',
    body: JSON.stringify({ firstUserID, secondUserID }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    alert('Partnership Created!')
  } else {
    alert('Failed to create partnership')
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




document.querySelector(".new-comp-form").addEventListener('submit', addCompetitor)
viewCompetitors()
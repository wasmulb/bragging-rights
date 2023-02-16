//For displaying the logged in users competitors
var compSection = document.getElementsByClassName('comp-section')

var userID = 1
let username;
function viewCompetitors(username){

    fetch("/api/partners/test")
    .then(function(response) {
      return response.json()
    })
    
    .then(function (data) {
        console.log(data)

        for(var i= 0; i<data.length; i++){
            var compTag = document.createElement('a')
            compTag.classList.add("comp-tag")
            console.log(data.user.dataValues.partnership[i].username)
            compTag.innerText = data.user.dataValues.partnership[i].username;

            compSection.appendChild(compTag)
        };
})}



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



document.querySelector(".new-comp-form").addEventListener('submit', addCompetitor)
viewCompetitors()
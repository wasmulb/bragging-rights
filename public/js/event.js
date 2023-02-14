const eventHandler = async(event)=>{
    event.preventDefault();

    let activity = document.querySelector('#event-label').value.trim();

    let user1 = document.querySelector('#first-username').value.trim();
    let user1Score = document.querySelector('#first-score').value.trim();

    let user2 = document.querySelector("#second-username").value.trim();
    let user2Score = document.querySelector("#second-username").value.trim();

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

}

document.querySelector('.event-form').addEventListener('submit', eventHandler)
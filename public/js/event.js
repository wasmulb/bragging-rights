const eventHandler = async(event)=>{
    event.preventDefault();

    let user1 = document.querySelector('#first-username').value.trim();
    let user1Score = document.querySelector('#first-score').value.trim();

    let user2 = document.querySelector("#second-username").value.trim();
    let user2Score = document.querySelector("#second-username").value.trim();

    

}

document.querySelector('.event-form').addEventListener('submit', eventHandler)
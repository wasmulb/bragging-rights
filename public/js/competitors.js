var compSection = document.getElementsByClassName('comp-section')

var userID = 1

function viewCompetitors(){
    fetch('/api/partners')
    .then(function(response) {
      return response.json()
    })
    .then(function (data) {
        console.log(data)

        for(var i= 0; i<data.length; i++){
            var compTag = document.createElement('a')
            compTag.classList.add("comp-tag")
            compTag.innerText = data.partners;
            //select from data

            compSection.appendChild(compTag)
        };
})}
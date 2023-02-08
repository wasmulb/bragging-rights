const loginHandler = async (event) =>{

    //cancel event
    event.preventDefault();

    // information inputted by user
    let email= document.querySelector('#login-email').value.trim();
    let password= docuement.querySelector('#login-password').value.trim();

    //if statment for sending the information to the server
    if (email && password){
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
            document.location.replace('/');
          } else {
            alert('Failed to log in, please try again!');
          }


    };

};
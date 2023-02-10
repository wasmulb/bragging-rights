const loginHandler = async (event) =>{
    event.preventDefault();

    // information inputted by user
    let email= document.querySelector('#email-login').value.trim();
    let password= document.querySelector('#password-login').value.trim();

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

document.querySelector('.login-form').addEventListener('submit', loginHandler);
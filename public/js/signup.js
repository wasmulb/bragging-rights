const signUpHandler = async(event)=>{
    event.preventDefault();


const username = document.querySelector('#input-username').value.trim();
const email = document.querySelector('#input-email').value.trim();
const password = document.querySelector('#input-password').value.trim();

if (username && email && password){
    const response = await fetch('/api/users',{
        method: 'POST',
        body: JSON.stringify({
            username,
            email,
            password
        }),
        headers: {'Content-Type': 'application/json'}
    });

    if(response.ok){
        console.log('User Created!!!!');
        document.location.replace('/');
    }else{
        alert('Failed to sign up, please try again!');
    }
}
};


document.querySelector('.signUpForm').addEventListener('submit', signUpHandler);
 const logoutHandler = async(event)=>{
    event.preventDefault();

    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      // If successfully logged out, you should be redirected to the login page
      document.location.replace('/login');
    } else {
        alert('Failed to log out, please try again!');
    }
  };
  
document.querySelector('#logout').addEventListener('click', logoutHandler);
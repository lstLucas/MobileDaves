
const URL = "http://c1fb-2804-d45-9b1a-ca00-1a9d-7d5d-664-4c7d.ngrok.io"

const login = async (login, password) => {
    const apiUrl = `${URL}/api/User/Login`;

    try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: login, password }),
        });
        
        if (!response.ok) {
          throw new Error('Login failed');
        }
    
        const token = await response.text();
    
        console.log('Token:', token);
    
        return token;
      } catch (error) {
        return false;
      }
}

const getData = async (email) => {
    const apiUrl = `${URL}/api/User/Details/${email}`;

    try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error('Failed to fetch user details');
    }

    const userData = await response.json(); 

    return userData;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null; 
  }
}

const checkUserAdmin = async (userId) => {
    try {
      const response = await fetch(`${URL}/api/User/Role/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Error verifying user roles');
      }
      
      const isAdmin = await response.json();
      return isAdmin;
    } catch (error) {
      console.error('Error ocurred:', error);
      return false;
    }
  };


const registerUser = async (user) => {

    const v = await fetch(`${URL}/user`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    })
        .then((resp) => {
            if (resp.status == 201) {
                return true
            } else {
                return false
            }
        })
        .catch((error) => {
            console.log(error)
            return false
        })

    return v
}

export { login, registerUser, getData, checkUserAdmin }

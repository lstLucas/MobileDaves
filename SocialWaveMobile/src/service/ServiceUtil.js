import AsyncStorage from '@react-native-async-storage/async-storage';

const URL = "http://e640-2804-d45-9b1a-ca00-215-fe9c-e514-cef6.ngrok.io"

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

    await AsyncStorage.setItem('token', token);

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

const getAllMembers = async () => {
  const apiUrl = `${URL}/api/User/AllMembers`;

  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.status === 200) {
        const userData = await response.json();
        return userData;
      } else {
        throw new Error('Failed to find users');
      }
    } else {
      throw new Error('Token not found');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

const getAllPosts = async () => {
  const apiUrl = `${URL}/api/Post`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const postData = await response.json();
      return postData;
    } else {
      throw new Error('Failed to find posts');
    }
  } catch (error) {
    console.error('Error fetching post data:', error);
    return null;
  }
};


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


const createUser = async (user, admin) => {
  if (admin) {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const v = await fetch(`${URL}/api/User/CreateAdmin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
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
      console.error('No token recieved.')
    } catch {
      console.error('Wrong token sent to database')
    }

  } else {
    const v = await fetch(`${URL}/api/User/Create`, {
      method: "POST",
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

}

const deleteUser = async (userId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const response = await fetch(`${URL}/api/User/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error('User not found for delete!');
      }

      if (response.status === 200) {
        return 'User deleted successfully';
      } else {
        throw new Error('Error deleting user');
      }
    } else {
      throw new Error('Token not found');
    }
  } catch (error) {
    console.error('Error ocurred:', error);
    return 'Error deleting user';
  }
};

async function checkIfUserLikedPost(userId, postId) {
  try {
    const response = await fetch(`${URL}/api/Post/like/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 404) {
      return false;
    } else if (response.status === 200) {
      const likedPosts = await response.json();
      const isLiked = likedPosts.some(post => post.id === postId);
      return isLiked;
    }
  } catch (error) {
    console.log('Error occurred:', error);
    return null;
  }
}

const createPost = async (post) => {
  console.log(JSON.stringify(post));
  try {
    const p = await fetch(`${URL}/api/Post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post)
    })
      .then((resp) => {
        console.log(resp.status);
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

    return p

  } catch {
    console.error('Error on post creation')
  }
}

const deletePost = async (postId) => {
  try {
    const response = await fetch(`${URL}/api/Post/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(postId);

    if (!response.ok) {
      throw new Error('Post not deteled!');
    }

    if (response.status === 200) {
      return 'Post Deleted successfully';
    } else {
      throw new Error('Error deleting the post');
    }
  } catch (error) {
    console.error('Error ocurred:', error);
    return 'Error deleting user';
  }
};


async function likePost(postId, userId) {
  const apiUrl = `${URL}/api/Post/like/${postId}/${userId}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Like failed');
    }

    return response.ok;

  } catch (error) {
    return false;
  }
}



export {
  login, createUser, getData, getAllMembers, checkUserAdmin, deleteUser,
  getAllPosts, checkIfUserLikedPost, likePost, createPost, deletePost
}

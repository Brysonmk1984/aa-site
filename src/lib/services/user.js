
/**
 * 
 * @param {User} user 
 */
export const findOrCreateUser = async (user) => {
  const apiEndpoint = "http://127.0.0.1:8111";
  const url = `${apiEndpoint}/users`;

  console.log(user, JSON.stringify(user));
  const result = await fetch(url, {

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    
    method : 'POST',
    body : JSON.stringify(user)
  });

  console.log(result);
  const data = await result.json();

  console.log(data);
};
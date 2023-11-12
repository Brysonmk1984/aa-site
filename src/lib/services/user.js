
/**
 * 
 * @param {User} user 
 */
export const findOrCreateUser = async (user) => {
  const apiEndpoint = "http://127.0.0.1:8111";
  const url = `${apiEndpoint}/users`;
  const result = await fetch(url, {

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    
    method : 'POST',
    body : JSON.stringify(user)
  });

  try{
    const data = await result.json();
    return data;
  } catch(e){
    console.error(e);
  }
};
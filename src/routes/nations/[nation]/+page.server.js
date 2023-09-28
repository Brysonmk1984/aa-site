

export async function load(ctx){
  const { fetch, locals, params, platform, getClientAddress, route, url, request } = ctx;
  console.log(params)
  const apiEndpoint = "http://127.0.0.1:8111";

  try {
    const response = await fetch(`${apiEndpoint}/nation-profile/${params.nation}`);
    const result = await response.json();
    const nationInfo = result[0];
    const userArmies = result[1];
  
   return { nationInfo, userArmies };
  } catch (error) {
    console.error(error);
    
  }

  
  return {
    props: {
      origin: url.origin
    }
  };
}
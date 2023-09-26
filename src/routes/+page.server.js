/**
 * @type {import('@sveltejs/kit').Load}
 */
export async function load(ctx){
  const { fetch, locals, params, platform, getClientAddress, route, url, request } = ctx;

  const apiEndpoint = "http://127.0.0.1:8111";

  try {
    const response = await fetch(apiEndpoint);
   const armies = await response.json();
  
   return { armies };
  } catch (error) {
    console.error(error);
    
  }

  
  return {
    props: {
      origin: url.origin
    }
  };
}


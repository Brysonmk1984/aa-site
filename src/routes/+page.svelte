<script>
  import { onMount } from 'svelte';
  import auth from '$lib/services/auth';
  import { isAuthenticated, user } from '$lib/stores/auth';
  import { findOrCreateUser } from '$lib/services/user.js';
 import { fullUser } from '$lib/stores/profile.js';


  /**
  * @type {import("@auth0/auth0-spa-js").Auth0Client}
  */
  let auth0Client;

  onMount(async () => {
      auth0Client = await auth.createClient();
      isAuthenticated.set(await auth0Client.isAuthenticated());
      const response = await auth0Client.getUser();
      if(response){
        user.set(response);
      }
 
  });

  function login() {
      auth.loginWithPopup(auth0Client);
  }

  function logout() {
      auth.logout(auth0Client);
  }

  export let data;
  export const armies = data.armies;

  async function handleUserUpdateCheck({ email, email_verified : emailVerified, sub }){

    try{
      let user = await findOrCreateUser({ email, email_verified : emailVerified, auth0_sub : sub });
      console.log('found user, updating fullUser', user);

      fullUser.set(user)
    } catch (e){
      console.error(e)
    }
  }


  $ : $isAuthenticated && handleUserUpdateCheck($user);


 

</script>

<section>
  <p>An incremental strategy game set in a realm of medieval fantasy</p>
  <p>Battle for territory and control the Avalore! </p>
  <ul>
    { #if !!armies && armies.length }
      {#each armies as army}
        <li>{army.name}</li>
      {/each}
    { /if }
  </ul>


  {#if $isAuthenticated}
    {JSON.stringify($user)}
    <h2>Hey {$user.name}!</h2>
    {#if $user.picture}
        <img src={$user.picture} alt={user.name} />
    {:else}
        <img src="https://source.unsplash.com/random/400x300" alt="Random Photo" />
    {/if}
    <button on:click={logout}>Logout</button>
  {:else}
      <button on:click={login}>Login</button>
  {/if}
</section>


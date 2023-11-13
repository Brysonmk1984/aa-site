<script>
	import auth from '$lib/services/auth';
  import { isAuthenticated, user as authUser } from '$lib/stores/auth';
 	import { fullUser } from "$lib/stores/profile";
 import { onMount } from "svelte";
 import { findOrCreateUser } from '$lib/services/user.js';
 	export let user;
	export let nation = '';
	export let armies = [];

	const fetchNationDetails = async (userId) =>{console.log('fetching')
		const apiEndpoint = "http://127.0.0.1:8111";

	
		const route = `${apiEndpoint}/nation-profile/${userId}`;
		const response = await fetch(route);
		([nation, armies] = await response.json());

	}



	  /**
  * @type {import("@auth0/auth0-spa-js").Auth0Client}
  */
  let auth0Client;

  onMount(async () => {

		auth0Client = await auth.createClient();
		isAuthenticated.set(await auth0Client.isAuthenticated());
		const response = await auth0Client.getUser();

		if(response){

			authUser.set(response);
			handleUserUpdateCheck($authUser)
		}
 
  });


  async function handleUserUpdateCheck({ email, email_verified : emailVerified, sub }){
		try{
			let user = await findOrCreateUser({ email, email_verified : emailVerified, auth0_sub : sub });

			fullUser.set(user);
			fetchNationDetails(user.id);

		} catch (e){
			console.error(e)
		}
	}

	$: $fullUser && (() =>{
		user = $fullUser;
	})();
</script>


<section>
	{#if Object.keys(user).length}
	<h1>{nation?.name}</h1>
	{/if}
	
	<div class="army-dashboard">
		<div class="army-list">
			<ul>
				{#each armies as army}
					<li>{army.count} {army.army_name}</li>
				{/each}
			</ul>
		</div>

	</div>

</section>



<style>
	.army-dashboard{
		text-align:center;
	}
</style>

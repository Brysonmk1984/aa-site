<script>
  import { onMount } from 'svelte';
  import auth from '$lib/services/auth';
  import { isAuthenticated, user } from '$lib/stores/auth';
  import { findOrCreateUser } from '$lib/services/user.js';
 import { fullUser } from '$lib/stores/profile.js';


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
  <div class="center">
    { #if !!armies && armies.length }
    <table class="army-list">
      <thead>
        <tr>
          <th>Count</th>
          <th>Army</th>
          <th>Gold</th>
          <th></th>
        </tr>
      </thead>
        {#each armies as army}
          <tr >
            <td class="army-count">{army.count}</td>
            <td class="army-name">{army.name}</td>
            <td class="army-cost">ㆆ&nbsp;20,000</td>
            <td class="buy-cell">
              <button>Buy</button>
            </td>
          </tr>
        {/each}
    </table>
    { /if }
  </div>

</section>


<style>
	.center{
		text-align:center;
	}

  .army-list{
    max-width: 50%;
    margin: 0px auto;
  }

  .army-list .army-count{
    color:red;
    min-width:100px;
  }

  .army-list .army-name{
    font-weight: bold;
    text-align:left;
  }
  .army-cost{
    color: gold;
    text-align: right;
    min-width:150px;
  }

  .buy-cell{
    min-width:150px;
  }

  .buy-cell button{
    cursor: pointer;
    padding:4px 20px;
  }



</style>
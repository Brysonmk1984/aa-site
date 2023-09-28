<script>
  export let data;
  export let { nationInfo, userArmies } = data;



</script>



<section>
  <h1>Nation</h1>
  <p>This is where we show you Nation's armies</p>
  <p>
    {
      JSON.stringify(nationInfo)
    }
  </p>
  {#if userArmies.length}
    <ul>
      {#each userArmies as army}
        <li>{army.army_name}</li>
      {/each}
    </ul>
  {/if}
</section>
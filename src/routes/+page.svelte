<script>
  export let data;
  export const armies = data.armies;
  console.log({armies})
</script>

<section>
  <h1>Armies of Avalore</h1>
  <p>An incremental strategy game set in a realm of medieval fantasy</p>
  <p>Battle for territory and control the Avalore! </p>
  <ul>
    { #if !!armies && armies.length }
      {#each armies as army}
        <li>{army.name}</li>
      {/each}
    { /if }
  </ul>
</section>

<style>
  :global(body) {
    background-color: black;
  }
  h1 {
    color: darkgray;
  }
  p {
    color: darkred;
  }
  li{
    color: antiquewhite;
  }
</style>


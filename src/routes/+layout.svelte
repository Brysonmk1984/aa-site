<script>
 import Header from '$lib/components/Header.svelte';
 import './styles.css';
</script>


<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>&copy; Armies of Avalore 2023</p>
		<a href="/">Home</a>
		<a href="/nation">Nation</a>
	</footer>
</div>
<style>


  h1 {
    color: darkgray;
  }
  p {
    color: darkred;
  }
  

  section {
    color : antiquewhite;
  }

	a:hover {
		color: var(--color-theme-1);
	}

	@media (min-width: 900px) {
		header {
			flex-direction:row;
		}
		nav {
			position:absolute;
			top: 0px;
			left: 50%;
			margin-left: -200px;
		}
		.corner{
			margin:0px;
			width:256px;
		}
		.corner .site-title {
			font-size: 2.5em;
		}
		.corner .site-title span{
			font-size: .5em;
			margin-right: 10px;
		}
	}
</style>

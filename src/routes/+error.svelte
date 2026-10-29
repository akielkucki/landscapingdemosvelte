<script lang="ts">
	import { page } from '$app/state';
	import { business } from '#lib/content/site.ts';
	import Cta from '#lib/components/Cta.svelte';
	import Mascot from '#lib/components/Mascot.svelte';
</script>

<svelte:head>
	<title>{page.status === 404 ? 'Page not found' : 'Something went wrong'} | {business.name}</title>
</svelte:head>

<section class="wrap error">
	<Mascot size={120} />
	<p class="eyebrow">{page.status}</p>
	<h1>{page.status === 404 ? 'This page wandered off the property.' : 'Something went wrong on our end.'}</h1>
	<p class="lede">Head back home, or give us a call and we’ll help you directly.</p>
	<div class="ctas">
		<a class="home" href="/">Back to the homepage</a>
		<Cta kind="call" />
	</div>
</section>

<style>
	.error {
		display: grid;
		justify-items: start;
		gap: 22px;
		padding-block: clamp(56px, 9vw, 128px);
	}

	h1 {
		max-width: 16ch;
		font-size: clamp(2.8rem, 6vw, 4.8rem);
	}

	.ctas {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 20px;
	}

	.home {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.2rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--green);
	}
</style>

<script lang="ts">
	import '#lib/styles/global.css';
	import favicon from '#lib/assets/site/favicon-64.png';
	import touchIcon from '#lib/assets/site/apple-touch-icon.png';
	import MobileActionBar from '#lib/components/MobileActionBar.svelte';
	import SeasonBar from '#lib/components/SeasonBar.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/png" href={favicon} />
	<link rel="apple-touch-icon" href={touchIcon} />
</svelte:head>

<a class="skip" href="#main">Skip to content</a>

{#if data.season}
	<SeasonBar season={data.season} />
{/if}
<SiteHeader />

<main id="main" tabindex="-1">
	{@render children()}
</main>

<SiteFooter />
<MobileActionBar />

<style>
	.skip {
		position: absolute;
		top: 8px;
		left: 8px;
		z-index: 100;
		padding: 10px 16px;
		border-radius: var(--radius);
		background: var(--ink);
		color: var(--paper);
		font-weight: 600;
		transform: translateY(-160%);
	}

	.skip:focus {
		transform: none;
	}

	main:focus {
		outline: none;
	}

	@media (max-width: 720px) {
		/* Room for the fixed call / quote bar. */
		:global(body) {
			padding-bottom: calc(70px + env(safe-area-inset-bottom));
		}
	}
</style>

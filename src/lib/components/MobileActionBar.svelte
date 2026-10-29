<script lang="ts">
	import { business } from '#lib/content/site.ts';
	import Icon from './Icon.svelte';
</script>

<!-- Always-reachable call and quote actions on phones. -->
<div class="action-bar">
	<a class="call" href={business.phoneHref}>
		<Icon name="phone" size={18} />
		<span>Call</span>
	</a>
	<a class="quote" href={business.quoteHref}>
		<span>Instant quote</span>
		<Icon name="arrow" size={18} />
	</a>
</div>

<style>
	.action-bar {
		display: none;
	}

	@media (max-width: 720px) {
		.action-bar {
			position: fixed;
			inset: auto 0 0;
			z-index: 40;
			display: grid;
			grid-template-columns: 1fr 1.6fr;
			gap: 8px;
			padding: 10px 12px calc(10px + env(safe-area-inset-bottom));
			background: var(--charcoal-deep);
			box-shadow: 0 -8px 20px -12px rgb(0 0 0 / 0.6);
		}
	}

	a {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		min-height: 50px;
		border-radius: var(--radius);
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.15rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		text-decoration: none;
	}

	.call {
		border: 2px solid rgb(251 247 239 / 0.6);
		color: var(--on-dark);
	}

	.call :global(svg) {
		color: var(--orange-on-dark);
	}

	.quote {
		background: var(--green);
		color: var(--on-action);
		box-shadow: inset 0 -3px 0 rgb(0 0 0 / 0.18);
	}
</style>

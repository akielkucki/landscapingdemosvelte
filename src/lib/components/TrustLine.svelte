<script lang="ts">
	import { trust } from '#lib/content/site.ts';
	import { imageUrl } from '#lib/images.ts';
	import Icon from './Icon.svelte';

	/** stack: one item per line, for narrow sidebars. */
	let { tone = 'light', stack = false }: { tone?: 'light' | 'dark'; stack?: boolean } = $props();

	const bbbSrc = imageUrl(trust.badges.bbb.file);
	const bobSrc = imageUrl(trust.badges.bestOfBucks.file);
</script>

<ul class="trust {tone}" class:stack aria-label="Ratings and recognition">
	<li class="google">
		<span class="stars" aria-hidden="true">
			{#each { length: 5 } as _}<Icon name="star" size={17} />{/each}
		</span>
		<span><strong>{trust.googleRating}</strong> on Google</span>
	</li>
	<li>
		{#if bbbSrc}
			<img src={bbbSrc} alt={trust.badges.bbb.alt} height="36" />
		{:else}
			<span class="mark" aria-hidden="true">{trust.bbb}</span>
			<span>BBB rating</span>
		{/if}
	</li>
	<li>
		{#if bobSrc}
			<img src={bobSrc} alt={trust.badges.bestOfBucks.alt} height="44" />
		{:else}
			<span class="mark wide" aria-hidden="true">2026</span>
			<span>Best of Bucks nominee</span>
		{/if}
	</li>
</ul>

<style>
	.trust {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px 26px;
		list-style: none;
		font-size: 0.98rem;
		color: var(--ink-soft);
	}

	li {
		display: inline-flex;
		align-items: center;
		gap: 9px;
	}

	li + li {
		padding-left: 26px;
		border-left: 1px solid var(--sand);
	}

	strong {
		color: var(--ink);
		font-weight: 600;
	}

	.stars {
		display: inline-flex;
		gap: 1px;
		color: var(--orange);
	}

	.mark {
		display: inline-grid;
		place-items: center;
		min-width: 34px;
		height: 30px;
		padding: 0 6px;
		border: 2px solid currentColor;
		border-radius: 3px;
		font-family: var(--font-display);
		font-weight: 800;
		font-size: 1.05rem;
		color: var(--ink);
	}

	img {
		width: auto;
	}

	.dark {
		color: var(--on-dark-soft);
	}

	.dark strong,
	.dark .mark {
		color: var(--on-dark);
	}

	.dark li + li {
		border-color: var(--rule-dark);
	}

	.stack {
		flex-direction: column;
		align-items: flex-start;
	}

	.stack li + li {
		padding-left: 0;
		border-left: 0;
	}

	@media (max-width: 560px) {
		.trust {
			gap: 10px 16px;
		}

		li + li {
			padding-left: 16px;
		}

		li:last-child {
			padding-left: 0;
			border-left: 0;
		}
	}
</style>

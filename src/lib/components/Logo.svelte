<script lang="ts">
	import { business } from '#lib/content/site.ts';
	import { imageUrl } from '#lib/images.ts';

	/** `height` is the rendered logo height in px; a parent can override it with --logo-h. */
	let { tone = 'light', height = 64 }: { tone?: 'light' | 'dark'; height?: number } = $props();

	const src = imageUrl(business.logo.file);
</script>

{#if src}
	<img
		class="logo-img"
		{src}
		alt={business.logo.alt}
		width={business.logo.width}
		height={business.logo.height}
		style:--default-h="{height}px"
	/>
{:else}
	<span class="wordmark {tone}" aria-label={business.name}>
		<span class="rd" aria-hidden="true">RD’s</span>
		<span class="rest" aria-hidden="true">Total<br />Lawn</span>
	</span>
{/if}

<style>
	.logo-img {
		height: var(--logo-h, var(--default-h));
		width: auto;
	}

	.wordmark {
		display: inline-flex;
		align-items: center;
		gap: 9px;
		font-family: var(--font-display);
		line-height: 0.86;
		color: var(--ink);
	}

	.rd {
		font-weight: 800;
		font-size: 2.15rem;
		letter-spacing: -0.01em;
		color: var(--green);
	}

	.rest {
		padding-left: 9px;
		border-left: 2px solid var(--orange);
		font-weight: 700;
		font-size: 0.98rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.dark {
		color: var(--on-dark);
	}

	.dark .rd {
		color: var(--green-on-dark);
	}
</style>

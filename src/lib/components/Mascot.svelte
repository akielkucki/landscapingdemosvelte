<script lang="ts">
	import { business } from '#lib/content/site.ts';
	import { imageUrl } from '#lib/images.ts';

	/** `size` is the default width; a parent can override it with the --mascot-size custom property. */
	let { size = 120 }: { size?: number } = $props();

	const src = imageUrl(business.mascot.file);
</script>

{#if src}
	<img
		class="mascot"
		style:--default-size="{size}px"
		{src}
		alt={business.mascot.alt}
		width={business.mascot.width}
		height={business.mascot.height}
		loading="lazy"
		decoding="async"
	/>
{:else}
	<div class="mascot ph" style:--default-size="{size}px">
		<span>Mascot</span>
	</div>
{/if}

<style>
	.mascot {
		width: var(--mascot-size, var(--default-size));
		height: auto;
	}

	.ph {
		display: grid;
		place-items: center;
		aspect-ratio: 1;
		border: 2px dashed var(--orange);
		border-radius: 50%;
		background: var(--paper);
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 0.8rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--orange-ink);
	}
</style>

<script lang="ts">
	import type { Img } from '#lib/content/site.ts';
	import { imageUrl } from '#lib/images.ts';

	let {
		image,
		ratio = '4 / 3',
		eager = false,
		class: className = ''
	}: {
		image: Img;
		/** CSS aspect-ratio for the frame. The photo is cropped to fill it. */
		ratio?: string;
		eager?: boolean;
		class?: string;
	} = $props();

	const src = $derived(imageUrl(image.file));
</script>

<div class="photo {className}" style:aspect-ratio={ratio}>
	{#if src}
		<img
			class:crop-top={image.crop === 'top'}
			class:crop-bottom={image.crop === 'bottom'}
			{src}
			alt={image.alt}
			width={image.width}
			height={image.height}
			style:object-position={image.position}
			loading={eager ? 'eager' : 'lazy'}
			fetchpriority={eager ? 'high' : undefined}
			decoding="async"
		/>
	{:else}
		<div class="placeholder">
			<span class="ph-label">Photo needed</span>
			<span class="ph-brief">{image.brief}</span>
		</div>
	{/if}
</div>

<style>
	.photo {
		position: relative;
		overflow: hidden;
		border-radius: var(--radius);
		background: var(--forest);
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	/*
	 * Stacked before/after composites: the image box is twice the frame's
	 * height so each half fills the frame, nudged in slightly to hide the
	 * collage's white borders.
	 */
	.crop-top,
	.crop-bottom {
		position: absolute;
		left: 0;
		height: 200%;
		transform: scale(1.05);
	}

	.crop-top {
		top: 0;
		transform-origin: 50% 25%;
	}

	.crop-bottom {
		top: -100%;
		transform-origin: 50% 75%;
	}

	.placeholder {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		gap: 4px;
		padding: clamp(14px, 3%, 24px);
		color: var(--on-dark);
		box-shadow: inset 0 0 0 1px rgb(240 163 94 / 0.4);
		background-color: var(--forest);
		background-image: repeating-linear-gradient(
			100deg,
			var(--forest) 0 56px,
			var(--forest-stripe) 56px 112px
		);
	}

	.ph-label {
		align-self: flex-start;
		padding: 2px 8px;
		border: 1px dashed var(--orange-on-dark);
		border-radius: var(--radius);
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 0.78rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--orange-on-dark);
	}

	.ph-brief {
		max-width: 30ch;
		font-size: 0.9rem;
		line-height: 1.35;
		color: var(--on-dark-soft);
	}
</style>

<script lang="ts">
	import type { Img } from '#lib/content/site.ts';
	import Photo from './Photo.svelte';

	let { before, after, label }: { before: Img; after: Img; label: string } = $props();

	let position = $state(50);

	// Arrow keys move in steps of 5 (Home/End work natively); pointer dragging stays smooth.
	function onKeydown(event: KeyboardEvent) {
		const step = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5 }[event.key];
		if (step === undefined) return;
		event.preventDefault();
		position = Math.min(100, Math.max(0, position + step));
	}
</script>

<div class="compare" style:--pos="{position}%">
	<div class="layer">
		<Photo image={after} ratio="auto" class="fill align-end" />
	</div>
	<div class="layer before" aria-hidden={position === 0 ? 'true' : undefined}>
		<Photo image={before} ratio="auto" class="fill earth" />
	</div>

	<span class="chip chip-before" class:faded={position < 14} aria-hidden="true">Before</span>
	<span class="chip chip-after" class:faded={position > 86} aria-hidden="true">After</span>

	<div class="divider" aria-hidden="true">
		<span class="knob">
			<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M9 6 3 12l6 6M15 6l6 6-6 6" />
			</svg>
		</span>
	</div>

	<input
		class="range"
		type="range"
		min="0"
		max="100"
		step="1"
		bind:value={position}
		onkeydown={onKeydown}
		aria-label="{label}: slide to compare before and after"
		aria-valuetext="{position}% before"
	/>
</div>

<style>
	.compare {
		position: relative;
		aspect-ratio: 2 / 1;
		width: 100%;
		overflow: hidden;
		border-radius: var(--radius);
		background: var(--forest);
		touch-action: pan-y;
		user-select: none;
	}

	.layer {
		position: absolute;
		inset: 0;
	}

	.before {
		clip-path: inset(0 calc(100% - var(--pos)) 0 0);
	}

	.layer :global(.fill) {
		height: 100%;
		border-radius: 0;
	}

	.layer :global(.align-end .placeholder) {
		align-items: flex-end;
		text-align: right;
	}

	.layer :global(.ph-brief) {
		max-width: min(30ch, 42%);
	}

	/* Distinguish the "before" placeholder from the "after" one. */
	.layer :global(.earth .placeholder) {
		background-color: var(--earth);
		background-image: repeating-linear-gradient(100deg, var(--earth) 0 56px, var(--earth-stripe) 56px 112px);
	}

	.chip {
		position: absolute;
		top: 16px;
		padding: 5px 10px 4px;
		border-radius: 3px;
		font-family: var(--font-display);
		font-weight: 800;
		font-size: 0.85rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		pointer-events: none;
		transition: opacity 0.2s var(--ease);
	}

	/* Labels get out of the way when the handle reaches them. */
	.chip.faded {
		opacity: 0;
	}

	.chip-before {
		left: 16px;
		background: var(--charcoal-deep);
		color: var(--on-dark);
	}

	.chip-after {
		right: 16px;
		background: var(--orange);
		color: var(--ink);
	}

	.divider {
		position: absolute;
		top: 0;
		bottom: 0;
		left: var(--pos);
		width: 3px;
		margin-left: -1.5px;
		background: var(--paper);
		pointer-events: none;
	}

	.knob {
		position: absolute;
		top: 50%;
		left: 50%;
		display: grid;
		place-items: center;
		width: 52px;
		height: 52px;
		transform: translate(-50%, -50%);
		border: 3px solid var(--paper);
		border-radius: 50%;
		background: var(--green);
		color: var(--on-action);
		box-shadow: 0 4px 14px rgb(0 0 0 / 0.35);
	}

	.range {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		margin: 0;
		opacity: 0;
		cursor: ew-resize;
		-webkit-appearance: none;
		appearance: none;
		background: transparent;
	}

	/* A tall, wide thumb so touch users can grab the handle anywhere along the line. */
	.range::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 56px;
		height: 100vh;
	}

	.range::-moz-range-thumb {
		width: 56px;
		height: 100vh;
		border: 0;
	}

	@media (max-width: 640px) {
		.compare {
			aspect-ratio: 16 / 10;
		}
	}

	.compare:has(.range:focus-visible) .knob {
		outline: 3px solid var(--orange);
		outline-offset: 3px;
	}
</style>

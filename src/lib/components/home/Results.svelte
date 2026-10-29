<script lang="ts">
	import { gallery, results } from '#lib/content/site.ts';
	import BeforeAfter from '../BeforeAfter.svelte';
	import CtaRow from '../CtaRow.svelte';
	import Photo from '../Photo.svelte';

	let active = $state(0);
	const project = $derived(results[active]);
	const anyPlaceholder = results.some((r) => r.placeholder);
</script>

<section id="results" class="results on-dark" aria-labelledby="results-title">
	<div class="wrap">
		<div class="head">
			<div>
				<p class="eyebrow">Real results</p>
				<h2 id="results-title" class="h-section">Before and after, from yards we look after.</h2>
			</div>
			<div class="intro">
				<p class="lede">Drag the handle to compare. These are RD’s Total Lawn jobs, same yard, same angle.</p>
				{#if anyPlaceholder}<span class="ph-tag">Placeholder photos, add real job pairs</span>{/if}
			</div>
		</div>

		<div class="body">
			<div class="stage">
				{#key active}
					<BeforeAfter before={project.before} after={project.after} label={project.title} />
				{/key}
			</div>

			<div class="picker" role="group" aria-label="Choose a job to compare">
				{#each results as item, i (item.title)}
					<button type="button" aria-pressed={i === active} onclick={() => (active = i)}>
						<span class="n">{String(i + 1).padStart(2, '0')}</span>
						<span class="t">{item.title}</span>
						<span class="s">{item.service}{item.town ? ` · ${item.town}` : ''}</span>
					</button>
				{/each}
			</div>
		</div>

		{#if gallery.length}
			<h3 class="gallery-title">Lawns on our routes</h3>
			<ul class="gallery">
				{#each gallery as image (image.file)}
					<li><Photo {image} ratio="4 / 3" /></li>
				{/each}
			</ul>
		{/if}

		<CtaRow text="Want your yard looking like the after shot?" tone="dark" />
	</div>
</section>

<style>
	.results {
		background: var(--charcoal);
		padding-block: var(--section-y);
	}

	.head {
		display: grid;
		grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
		gap: 24px 64px;
		align-items: end;
		margin-bottom: 48px;
	}

	.head > div:first-child {
		display: grid;
		gap: 24px;
	}

	.intro {
		display: grid;
		justify-items: start;
		gap: 14px;
	}

	.body {
		display: grid;
		grid-template-columns: minmax(0, 8fr) minmax(0, 4fr);
		gap: 32px clamp(24px, 4vw, 56px);
		align-items: start;
	}

	.picker {
		display: grid;
		border-top: 1px solid var(--rule-dark);
	}

	button {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 2px 14px;
		padding: 18px 0 18px 16px;
		border: 0;
		border-bottom: 1px solid var(--rule-dark);
		border-left: 3px solid transparent;
		background: none;
		text-align: left;
		color: var(--on-dark-soft);
		cursor: pointer;
		transition:
			color 0.15s,
			border-color 0.15s,
			background-color 0.15s;
	}

	button:hover {
		color: var(--on-dark);
		background: rgb(255 255 255 / 0.03);
	}

	button[aria-pressed='true'] {
		border-left-color: var(--orange);
		color: var(--on-dark);
		background: rgb(255 255 255 / 0.05);
	}

	.n {
		grid-row: span 2;
		padding-top: 2px;
		font-family: var(--font-display);
		font-weight: 700;
		color: var(--orange-on-dark);
	}

	.t {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.45rem;
		line-height: 1.1;
	}

	.s {
		font-size: 0.92rem;
	}

	.gallery-title {
		margin: clamp(48px, 6vw, 72px) 0 16px;
		font-size: 1rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--on-dark-soft);
	}

	.gallery {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 16px;
		list-style: none;
	}

	@media (max-width: 900px) {
		.gallery {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 10px;
		}

		.head,
		.body {
			grid-template-columns: 1fr;
		}

		.picker {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			column-gap: 16px;
		}

		button {
			padding-left: 12px;
		}

		.t {
			font-size: 1.2rem;
		}
	}
</style>

<script lang="ts">
	import { business, story } from '#lib/content/site.ts';
	import Photo from '../Photo.svelte';
</script>

<section id="story" class="story" aria-labelledby="story-title">
	<div class="wrap grid">
		<figure class="portrait">
			<Photo image={story.image} ratio="4 / 5" />
			<figcaption>{story.caption}: {business.owners} and their kids</figcaption>
		</figure>

		<div class="copy">
			<p class="eyebrow">{story.eyebrow}</p>
			<h2 id="story-title" class="h-section">{story.headline}</h2>
			{#each story.paragraphs as paragraph (paragraph)}
				<p class="body">{paragraph}</p>
			{/each}

			<blockquote class="faith">
				<p>{story.faith}</p>
				<footer>{story.signoff}</footer>
			</blockquote>

			<dl class="facts">
				{#each story.facts as fact (fact.label)}
					<div>
						<dt>{fact.label}</dt>
						<dd>{fact.value}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</div>
</section>

<style>
	.story {
		background: var(--cream);
		padding-block: var(--section-y);
	}

	.grid {
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
		gap: 48px clamp(40px, 7vw, 112px);
		align-items: center;
	}

	.portrait {
		margin: 0;
	}

	figcaption {
		margin-top: 12px;
		font-size: 0.95rem;
		color: var(--ink-soft);
	}

	.copy {
		display: grid;
		gap: 22px;
	}

	.copy .eyebrow {
		margin-bottom: 2px;
	}

	.body {
		max-width: 34em;
		color: var(--ink-soft);
	}

	.faith {
		margin: 12px 0 0;
		padding: 28px 0 0;
		border-top: 2px solid var(--ink);
	}

	.faith p {
		max-width: 26em;
		font-family: var(--font-display);
		font-style: italic;
		font-weight: 600;
		font-size: clamp(1.55rem, 2.4vw, 2rem);
		line-height: 1.2;
		color: var(--ink);
	}

	.faith footer {
		margin-top: 14px;
		font-family: var(--font-display);
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--orange-ink);
	}

	.faith footer::before {
		content: '— ';
	}

	.facts {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
	}

	.facts div {
		display: flex;
		flex-direction: column-reverse;
		gap: 4px;
		padding-top: 14px;
		border-top: 1px solid var(--field-border);
	}

	dd {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 800;
		font-size: clamp(2.6rem, 4.4vw, 3.6rem);
		line-height: 0.9;
		color: var(--green);
	}

	dt {
		font-size: 0.92rem;
		line-height: 1.3;
		color: var(--ink-soft);
	}

	@media (max-width: 900px) {
		.grid {
			grid-template-columns: 1fr;
		}

		.portrait {
			max-width: 460px;
		}
		.facts {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			
			flex-direction: column;
		}
	}
</style>

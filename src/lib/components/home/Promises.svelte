<script lang="ts">
	import { business, promises } from '#lib/content/site.ts';
	import { reveal } from '#lib/reveal.ts';
</script>

<section class="promise mow-stripes on-dark" aria-labelledby="promise-title">
	<div class="wrap grid">
		<div class="head">
			<p class="eyebrow">How we work</p>
			<h2 id="promise-title" class="h-section">The part most lawn companies get wrong.</h2>
			<p class="lede">
				Mowing is the easy bit. Hearing back, and knowing when the crew is coming, is where people get let
				down. Here’s what you can expect from us.
			</p>
		</div>

		<ol class="list">
			{#each promises as item, i (item.title)}
				<li use:reveal={i * 250}>
					<span class="num" aria-hidden="true">0{i + 1}</span>
					<div>
						<p class="usual"><span class="usual-tag">The usual:</span> <s>{item.usual}</s></p>
						<h3>{item.title}</h3>
						<p>{item.body}</p>
					</div>
				</li>
			{/each}
		</ol>
	</div>
	<p class="wrap signoff">
		Try us: <a href={business.phoneHref}>{business.phone}</a>
	</p>
</section>

<style>
	.promise {
		padding-block: calc(var(--section-y) + 24px) var(--section-y);
	}

	.grid {
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
		gap: 48px clamp(40px, 7vw, 112px);
		align-items: start;
	}

	.head {
		display: grid;
		gap: 24px;
	}

	.list {
		list-style: none;
		border-top: 1px solid var(--rule-dark);
	}

	li {
		display: grid;
		grid-template-columns: 64px 1fr;
		gap: 8px;
		padding-block: 28px;
		border-bottom: 1px solid var(--rule-dark);
	}

	.num {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.15rem;
		letter-spacing: 0.08em;
		color: var(--orange-on-dark);
		padding-top: 0.45em;
	}

	/* Contrast framing: the usual experience, struck through, above our promise. */
	.usual {
		margin-bottom: 8px;
		font-size: 0.98rem;
		color: var(--on-dark-soft);
	}

	.usual-tag {
		font-family: var(--font-display);
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		font-size: 0.85rem;
	}

	.usual s {
		text-decoration-color: var(--orange-on-dark);
		text-decoration-thickness: 2px;
	}

	h3 {
		font-size: clamp(2rem, 3.4vw, 2.8rem);
		line-height: 1;
	}

	li p {
		margin-top: 10px;
		max-width: 36em;
		color: var(--on-dark-soft);
	}

	.signoff {
		margin-top: 40px;
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 1.5rem;
		color: var(--on-dark-soft);
	}

	.signoff a {
		color: var(--on-dark);
		text-decoration-color: var(--orange);
		text-decoration-thickness: 2px;
		text-underline-offset: 6px;
	}

	.signoff a:hover {
		color: var(--orange-on-dark);
	}

	@media (max-width: 900px) {
		.grid {
			grid-template-columns: 1fr;
		}

		li {
			grid-template-columns: 44px 1fr;
		}
	}
</style>

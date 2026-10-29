<script lang="ts">
	import { business, reviews, trust, type Review } from '#lib/content/site.ts';
	import CtaRow from '../CtaRow.svelte';
	import Icon from '../Icon.svelte';

	const [featured, ...rest] = reviews;
</script>

{#snippet stars(count: number)}
	<span class="stars" role="img" aria-label="{count} out of 5 stars">
		{#each { length: count } as _}<Icon name="star" size={18} />{/each}
	</span>
{/snippet}

{#snippet card(review: Review, big: boolean)}
	<article class="review" class:big>
		{#if review.placeholder}<span class="ph-tag">Placeholder, paste the real review</span>{/if}
		{@render stars(review.rating)}
		<blockquote>
			<p>“{review.text}”</p>
		</blockquote>
		<p class="who">
			<strong>{review.author}</strong>
			<span>{review.town} · {review.date}</span>
		</p>
		{#if review.reply}
			<div class="reply">
				<p class="reply-head">
					<Icon name="reply" size={18} />
					Reply from Ryan & Lindsay
				</p>
				<p>{review.reply}</p>
			</div>
		{/if}
	</article>
{/snippet}

<section id="reviews" class="reviews" aria-labelledby="reviews-title">
	<div class="wrap">
		<div class="head">
			<div class="title">
				<p class="eyebrow">Reviews</p>
				<h2 id="reviews-title" class="h-section">What neighbors say, and what we said back.</h2>
			</div>
			<div class="score">
				<p class="big-number">{trust.googleRating}</p>
				<div>
					{@render stars(5)}
					<p class="score-label">
						Google rating ·
						{trust.googleReviewCount.value} reviews
						{#if trust.googleReviewCount.placeholder}<span class="ph-tag">Count</span>{/if}
					</p>
					<a class="all" href={business.googleReviewsHref.value} rel="noopener">
						Read every review on Google <Icon name="arrow" size={16} />
					</a>
				</div>
			</div>
		</div>

		<div class="grid">
			{#if featured}{@render card(featured, true)}{/if}
			<div class="stack">
				{#each rest as review, i (i)}{@render card(review, false)}{/each}
			</div>
		</div>

		<CtaRow text="Your neighbors already have us on the schedule." />
	</div>
</section>

<style>
	.reviews {
		padding-block: var(--section-y);
	}

	.head {
		display: grid;
		grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
		gap: 32px 64px;
		align-items: end;
		margin-bottom: 56px;
	}

	.title {
		display: grid;
		gap: 24px;
	}

	.score {
		display: flex;
		align-items: center;
		gap: 20px;
		padding: 20px 0;
		border-top: 2px solid var(--ink);
		border-bottom: 1px solid var(--sand);
	}

	.big-number {
		font-family: var(--font-display);
		font-weight: 800;
		font-size: 5rem;
		line-height: 0.8;
	}

	.score-label {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 6px;
		margin-top: 4px;
		color: var(--ink-soft);
	}

	.all {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		margin-top: 6px;
		font-weight: 600;
		color: var(--green);
		text-underline-offset: 4px;
	}

	.stars {
		display: inline-flex;
		gap: 2px;
		color: var(--orange);
	}

	.grid {
		display: grid;
		grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
		gap: 24px;
		align-items: start;
	}

	.stack {
		display: grid;
		gap: 24px;
	}

	.review {
		display: grid;
		justify-items: start;
		gap: 16px;
		padding: clamp(24px, 3vw, 36px);
		border: 1px solid var(--sand);
		border-radius: var(--radius-lg);
		background: var(--card);
	}

	blockquote {
		margin: 0;
	}

	blockquote p {
		font-size: 1.05rem;
		line-height: 1.6;
	}

	.big blockquote p {
		font-family: var(--font-display);
		font-weight: 600;
		font-size: clamp(1.6rem, 2.6vw, 2.1rem);
		line-height: 1.2;
	}

	.who {
		display: flex;
		flex-wrap: wrap;
		gap: 4px 12px;
		font-size: 0.95rem;
		color: var(--ink-soft);
	}

	.who strong {
		color: var(--ink);
	}

	.reply {
		width: 100%;
		padding: 16px 18px;
		border-radius: var(--radius);
		background: var(--cream);
		font-size: 0.98rem;
	}

	.reply-head {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 6px;
		font-family: var(--font-display);
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--green);
	}

	@media (max-width: 900px) {
		.head,
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>

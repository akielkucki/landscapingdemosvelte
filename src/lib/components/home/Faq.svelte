<script lang="ts">
	import { business, faqs } from '#lib/content/site.ts';
</script>

<section id="faq" class="faq" aria-labelledby="faq-title">
	<div class="wrap grid">
		<div class="head">
			<p class="eyebrow">Questions</p>
			<h2 id="faq-title" class="h-section">Before you call.</h2>
			<p class="lede">
				Still wondering about something? Call <a href={business.phoneHref}>{business.phone}</a> and ask.
			</p>
		</div>

		<div class="list">
			{#each faqs as faq, i (faq.q)}
				<details open={i === 0}>
					<summary>
						<span>{faq.q}</span>
						<span class="sign" aria-hidden="true"></span>
					</summary>
					<div class="answer">
						{#if faq.placeholder}<span class="ph-tag">Answer needed</span>{/if}
						<p>{faq.a}</p>
					</div>
				</details>
			{/each}
		</div>
	</div>
</section>

<style>
	.faq {
		padding-block: var(--section-y);
	}

	.grid {
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
		gap: 40px clamp(40px, 6vw, 96px);
		align-items: start;
	}

	.head {
		display: grid;
		gap: 24px;
	}

	.head a {
		font-weight: 600;
		color: var(--green);
		white-space: nowrap;
	}

	.list {
		border-top: 2px solid var(--ink);
	}

	details {
		border-bottom: 1px solid var(--sand);
	}

	summary {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 24px;
		padding-block: 24px;
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(1.45rem, 2.2vw, 1.8rem);
		line-height: 1.15;
		list-style: none;
		cursor: pointer;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	summary:hover span:first-child {
		color: var(--green);
	}

	/* Plus that turns into a minus. */
	.sign {
		position: relative;
		flex-shrink: 0;
		width: 18px;
		height: 18px;
	}

	.sign::before,
	.sign::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 0;
		width: 100%;
		height: 3px;
		margin-top: -1.5px;
		background: var(--orange);
		transition: transform 0.2s var(--ease);
	}

	.sign::after {
		transform: rotate(90deg);
	}

	details[open] .sign::after {
		transform: rotate(0deg);
	}

	.answer {
		display: grid;
		justify-items: start;
		gap: 10px;
		padding-bottom: 26px;
		max-width: 40em;
		color: var(--ink-soft);
	}

	@media (max-width: 900px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>

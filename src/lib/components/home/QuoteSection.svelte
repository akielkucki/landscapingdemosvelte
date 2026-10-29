<script lang="ts">
	import { business, nextSteps } from '#lib/content/site.ts';
	import Mascot from '../Mascot.svelte';
	import QuoteForm from '../QuoteForm.svelte';
	import TrustLine from '../TrustLine.svelte';
</script>

<section id="quote" class="quote mow-stripes on-dark" aria-labelledby="quote-title">
	<div class="wrap grid">
		<div class="copy">
			<p class="eyebrow">Free quote</p>
			<h2 id="quote-title" class="h-section">Let’s get your lawn on the schedule.</h2>

			<ol class="steps">
				{#each nextSteps as step, i (step.title)}
					<li>
						<span class="n" aria-hidden="true">{i + 1}</span>
						<div>
							<h3>{step.title}</h3>
							<p>{step.body}</p>
						</div>
					</li>
				{/each}
			</ol>

			<div class="phone-card">
				<p class="kicker">Rather talk it through?</p>
				<a href={business.phoneHref}>{business.phone}</a>
				<p class="hours">
					{business.hours.value}
					{#if business.hours.placeholder}<span class="ph-tag">Confirm hours</span>{/if}
				</p>
			</div>

			<TrustLine tone="dark" />
		</div>

		<div class="panel">
			<div class="mascot-spot"><Mascot size={128} /></div>
			<div class="panel-head">
				<h3>Tell us about your yard</h3>
				<p>Takes about a minute.</p>
			</div>
			<QuoteForm />
		</div>
	</div>
</section>

<style>
	.quote {
		padding-block: var(--section-y);
	}

	.grid {
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
		gap: 48px clamp(40px, 6vw, 96px);
		align-items: start;
	}

	.copy {
		display: grid;
		gap: 32px;
	}

	.copy .eyebrow {
		margin-bottom: -8px;
	}

	.steps {
		display: grid;
		gap: 22px;
		list-style: none;
	}

	.steps li {
		display: grid;
		grid-template-columns: 44px 1fr;
		gap: 16px;
	}

	.n {
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		border: 2px solid var(--orange-on-dark);
		border-radius: 50%;
		font-family: var(--font-display);
		font-weight: 800;
		font-size: 1.3rem;
		color: var(--orange-on-dark);
	}

	.steps h3 {
		font-size: 1.6rem;
	}

	.steps p {
		margin-top: 4px;
		color: var(--on-dark-soft);
	}

	.phone-card {
		display: grid;
		justify-items: start;
		gap: 4px;
		padding-top: 24px;
		border-top: 1px solid var(--rule-dark);
	}

	.kicker {
		color: var(--on-dark-soft);
	}

	.phone-card a {
		font-family: var(--font-display);
		font-weight: 800;
		font-size: clamp(2.4rem, 4vw, 3.2rem);
		line-height: 1;
		text-decoration: none;
	}

	.phone-card a:hover {
		color: var(--orange-on-dark);
	}

	.hours {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px;
		color: var(--on-dark-soft);
	}

	.panel {
		position: relative;
		padding: clamp(22px, 3.4vw, 40px);
		border-radius: var(--radius-lg);
		background: var(--paper);
		color: var(--ink);
		box-shadow: 0 30px 60px -30px rgb(0 0 0 / 0.55);
	}

	.panel-head {
		margin-bottom: 24px;
		padding-right: 120px;
	}

	.panel-head h3 {
		font-size: clamp(1.9rem, 3vw, 2.4rem);
	}

	.panel-head p {
		margin-top: 6px;
		color: var(--ink-soft);
	}

	.mascot-spot {
		position: absolute;
		right: clamp(16px, 3vw, 36px);
		bottom: calc(100% - 2px);
		line-height: 0;
	}

	@media (max-width: 1000px) {
		.grid {
			grid-template-columns: 1fr;
			row-gap: 120px;
		}
	}

	@media (max-width: 560px) {
		.mascot-spot {
			--mascot-size: 104px;
		}

		.panel-head {
			padding-right: 0;
		}
	}
</style>

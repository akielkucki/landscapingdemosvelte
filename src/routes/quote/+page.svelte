<script lang="ts">
	import { page } from '$app/state';
	import { business, nextSteps } from '#lib/content/site.ts';
	import type { FormState } from '#lib/forms.ts';
	import Mascot from '#lib/components/Mascot.svelte';
	import QuoteForm from '#lib/components/QuoteForm.svelte';
	import TrustLine from '#lib/components/TrustLine.svelte';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();

	const service = $derived(page.url.searchParams.get('service') ?? '');
</script>

<svelte:head>
	<title>Get an instant quote | {business.name}</title>
	<meta
		name="description"
		content="Request a lawn care quote from RD's Total Lawn in about a minute, or call (215) 688-1622."
	/>
</svelte:head>

<section class="quote-page">
	<div class="wrap grid">
		<div class="main">
			<p class="eyebrow">Instant quote</p>
			<h1>Tell us about your yard.</h1>
			<p class="lede">
				A few quick questions, about a minute. We’ll come back to you with a clear price before any work
				starts.
			</p>
			<div class="card">
				<QuoteForm full initial={form as FormState} {service} />
			</div>
		</div>

		<aside class="aside">
			<div class="sticky">
				<h2>What happens next</h2>
				<ol>
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
				<div class="call">
					<p>Rather talk it through?</p>
					<a href={business.phoneHref}>{business.phone}</a>
				</div>
				<TrustLine tone="dark" stack />
				<div class="mascot-spot"><Mascot size={130} /></div>
			</div>
		</aside>
	</div>
</section>

<style>
	.quote-page {
		padding-block: clamp(40px, 6vw, 80px) var(--section-y);
	}

	.grid {
		display: grid;
		grid-template-columns: minmax(0, 7fr) minmax(0, 4fr);
		gap: 48px clamp(32px, 5vw, 72px);
		align-items: start;
	}

	.main {
		display: grid;
		gap: 22px;
	}

	h1 {
		font-weight: 800;
		font-size: clamp(3rem, 6vw, 5.2rem);
		line-height: 0.92;
		text-transform: uppercase;
	}

	.card {
		margin-top: 12px;
		padding: clamp(22px, 3.4vw, 40px);
		border: 1px solid var(--sand);
		border-radius: var(--radius-lg);
		background: var(--card);
	}

	.sticky {
		position: sticky;
		top: calc(var(--header-h) + 24px);
		display: grid;
		gap: 24px;
		padding: clamp(24px, 3vw, 36px);
		border-radius: var(--radius-lg);
		color: var(--on-dark);
		background-color: var(--forest);
		background-image: repeating-linear-gradient(100deg, var(--forest) 0 72px, var(--forest-stripe) 72px 144px);
	}

	.mascot-spot {
		justify-self: end;
		margin: -96px 0 calc(-1 * clamp(24px, 3vw, 36px));
		line-height: 0;
	}

	h2 {
		font-size: 2rem;
	}

	ol {
		display: grid;
		gap: 18px;
		list-style: none;
	}

	li {
		display: grid;
		grid-template-columns: 36px 1fr;
		gap: 14px;
	}

	.n {
		display: grid;
		place-items: center;
		width: 36px;
		height: 36px;
		border: 2px solid var(--orange-on-dark);
		border-radius: 50%;
		font-family: var(--font-display);
		font-weight: 800;
		color: var(--orange-on-dark);
	}

	h3 {
		font-size: 1.35rem;
	}

	li p {
		margin-top: 2px;
		font-size: 0.98rem;
		color: var(--on-dark-soft);
	}

	.call {
		padding-top: 20px;
		border-top: 1px solid var(--rule-dark);
		color: var(--on-dark-soft);
	}

	.call a {
		display: inline-block;
		margin-top: 2px;
		font-family: var(--font-display);
		font-weight: 800;
		font-size: 2.3rem;
		line-height: 1;
		color: var(--on-dark);
		text-decoration: none;
	}

	.call a:hover {
		color: var(--orange-on-dark);
	}

	@media (max-width: 1000px) {
		.grid {
			grid-template-columns: 1fr;
		}

		.sticky {
			position: static;
		}
	}
</style>

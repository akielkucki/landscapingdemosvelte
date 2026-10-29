<script lang="ts">
	import { hero } from '#lib/content/site.ts';
	import Cta from '../Cta.svelte';
	import Photo from '../Photo.svelte';
	import QuoteForm from '../QuoteForm.svelte';
	import TrustLine from '../TrustLine.svelte';
</script>

<section class="hero" aria-labelledby="hero-title">
	<div class="grid">
		<div class="copy">
			<h1 id="hero-title">
				<span class="line">{hero.headlineTop}</span>
				<span class="line second">
					Small enough to
					<span class="care"
						>care.<svg class="swash" viewBox="0 0 200 18" preserveAspectRatio="none" aria-hidden="true"
							><path d="M3 12.5c38-6.8 92-9.6 194-4.2" /></svg
						></span
					>
				</span>
			</h1>
			<p class="lede">{hero.lede}</p>
			<div class="ctas">
				<Cta kind="quote" />
				<Cta kind="call" label="Talk to a real person" />
			</div>
			<TrustLine />
		</div>

		<div class="visual">
			<Photo image={hero.image} ratio="auto" eager class="hero-photo" />
			<!-- Lead capture above the fold on desktop; phones get the sticky call / quote bar instead. -->
			<div class="quick-panel">
				<h2 class="qp-title">Quick quote</h2>
				<p class="qp-sub">Four fields. We’ll call you back with a price.</p>
				<QuoteForm quick stacked />
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		z-index: 1;
		padding-top: clamp(32px, 4.4vw, 64px);
	}

	/* The photo bleeds off the right edge of the page on wide screens. */
	.grid {
		display: grid;
		grid-template-columns:
			minmax(var(--gutter), 1fr)
			minmax(0, 680px)
			clamp(32px, 4vw, 64px)
			minmax(0, 496px)
			minmax(0, 1fr);
		align-items: stretch;
	}

	.copy {
		grid-column: 2;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 26px;
		padding-bottom: clamp(56px, 7vw, 104px);
	}

	h1 {
		font-weight: 800;
		font-size: clamp(3.3rem, 6.3vw, 6.1rem);
		line-height: 0.9;
		letter-spacing: -0.01em;
		text-transform: uppercase;
		color: var(--ink);
	}

	.line {
		display: block;
	}

	.second {
		color: var(--green);
	}

	.care {
		position: relative;
		display: inline-block;
		white-space: nowrap;
	}

	.swash {
		position: absolute;
		left: -2%;
		bottom: -0.1em;
		width: 104%;
		height: 0.2em;
		overflow: visible;
	}

	.swash path {
		fill: none;
		stroke: var(--orange);
		stroke-width: 7;
		stroke-linecap: round;
		vector-effect: non-scaling-stroke;
	}

	@media (prefers-reduced-motion: no-preference) {
		.swash path {
			stroke-dasharray: 220;
			stroke-dashoffset: 220;
			animation: draw 0.9s 0.35s var(--ease) forwards;
		}

		@keyframes draw {
			to {
				stroke-dashoffset: 0;
			}
		}
	}

	.lede {
		max-width: 33em;
	}

	.ctas {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}

	.visual {
		grid-column: 4 / 6;
		position: relative;
		margin-bottom: -88px;
		min-height: 560px;
	}

	.visual :global(.hero-photo) {
		height: 100%;
		border-radius: var(--radius) 0 0 var(--radius);
	}

	/*
	 * A tall panel down the right of the photo, lined up with the content edge
	 * (the photo itself bleeds to the window edge). Stripes stay visible below it.
	 */
	.quick-panel {
		position: absolute;
		top: clamp(20px, 2.4vw, 32px);
		right: max(28px, calc((100vw - var(--wrap)) / 2 - 8px));
		width: min(360px, calc(100% - 56px));
		padding: 26px 26px 20px;
		border-radius: var(--radius-lg);
		background: var(--paper);
		box-shadow: 0 24px 50px -24px rgb(0 0 0 / 0.55);
	}

	.qp-title {
		font-size: 1.9rem;
		line-height: 1;
	}

	.qp-sub {
		margin: 4px 0 16px;
		font-size: 0.95rem;
		color: var(--ink-soft);
	}

	@media (max-width: 1000px) {
		.quick-panel {
			display: none;
		}

		.grid {
			grid-template-columns: var(--gutter) minmax(0, 1fr) var(--gutter);
		}

		.copy {
			grid-column: 2;
			padding-bottom: 40px;
		}

		.visual {
			grid-column: 1 / -1;
			min-height: 0;
			margin-bottom: 0;
			aspect-ratio: 4 / 3;
		}

		.visual :global(.hero-photo) {
			border-radius: 0;
		}
	}

	@media (max-width: 560px) {
		.ctas {
			display: grid;
			width: 100%;
		}

		.ctas :global(.cta.call) {
			padding-right: 16px;
		}
	}
</style>

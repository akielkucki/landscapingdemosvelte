<script lang="ts">
	import { business, type Season } from '#lib/content/site.ts';
	import Icon from './Icon.svelte';

	let { season }: { season: Season } = $props();

	const href = $derived(`${business.quoteHref}?service=${encodeURIComponent(season.service)}`);
</script>

<!-- A ticket-style seasonal booking card: tag and deadline on the stub, details on the body. -->
<aside class="last-call" class:urgent={season.urgent} aria-label="{season.tag}: {season.headline}">
	<div class="stub">
		<span class="tag">{season.tag}</span>
		<span class="deadline">{season.deadline}</span>
	</div>
	<div class="body">
		<h3>{season.headline}</h3>
		<p>{season.detail}</p>
		<a class="book" {href}>
			Get on the list <Icon name="arrow" size={18} />
		</a>
	</div>
</aside>

<style>
	.last-call {
		display: grid;
		grid-template-columns: minmax(200px, 0.34fr) 1fr;
		border-radius: var(--radius-lg);
		background: var(--charcoal);
		color: var(--on-dark);
		overflow: hidden;
	}

	.stub {
		position: relative;
		display: grid;
		align-content: space-between;
		gap: 24px;
		padding: 24px;
		background: var(--orange);
		color: var(--ink);
	}

	/* Perforated tear line between stub and ticket. */
	.stub::after {
		content: '';
		position: absolute;
		top: 10px;
		bottom: 10px;
		right: -1px;
		width: 2px;
		background-image: linear-gradient(var(--charcoal) 50%, transparent 50%);
		background-size: 2px 10px;
	}

	.tag {
		font-family: var(--font-display);
		font-weight: 800;
		font-size: 1.4rem;
		line-height: 1;
		letter-spacing: 0.08em;
		white-space: nowrap;
		text-transform: uppercase;
	}

	.urgent .tag::before {
		content: '';
		display: inline-block;
		width: 10px;
		height: 10px;
		margin-right: 9px;
		border-radius: 50%;
		background: var(--red);
		vertical-align: 0.12em;
		box-shadow: 0 0 0 3px rgb(255 255 255 / 0.55);
	}

	.deadline {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.15rem;
		line-height: 1.1;
	}

	.body {
		display: grid;
		justify-items: start;
		gap: 10px;
		padding: 28px 30px;
	}

	h3 {
		font-size: clamp(1.8rem, 2.6vw, 2.3rem);
	}

	p {
		max-width: 36em;
		color: var(--on-dark-soft);
	}

	.book {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		margin-top: 8px;
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.15rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--orange-on-dark);
	}

	.book:hover {
		text-decoration: underline;
		text-underline-offset: 5px;
	}

	@media (max-width: 560px) {
		.last-call {
			grid-template-columns: 1fr;
		}

		.stub {
			grid-auto-flow: column;
			justify-content: space-between;
			align-items: baseline;
			padding: 16px 20px;
		}

		.stub::after {
			top: auto;
			left: 10px;
			right: 10px;
			bottom: -1px;
			width: auto;
			height: 2px;
			background-image: linear-gradient(90deg, var(--charcoal) 50%, transparent 50%);
			background-size: 10px 2px;
		}

		.body {
			padding: 22px 20px;
		}
	}
</style>

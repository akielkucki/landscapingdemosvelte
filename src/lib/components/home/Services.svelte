<script lang="ts">
	import { business, services, type Season } from '#lib/content/site.ts';
	import Cta from '../Cta.svelte';
	import Icon from '../Icon.svelte';
	import LastCall from '../LastCall.svelte';
	import Photo from '../Photo.svelte';

	let { season }: { season?: Season } = $props();

	const quoteFor = (name: string) => `${business.quoteHref}?service=${encodeURIComponent(name)}`;
</script>

<section id="services" class="services" aria-labelledby="services-title">
	<div class="wrap grid">
		<div class="aside">
			<div class="sticky">
				<p class="eyebrow">Services</p>
				<h2 id="services-title" class="h-section">Lawn care for the whole season.</h2>
				<p class="lede">
					Weekly visits, seasonal work and the cleanups in between. Tell us what your yard needs and we’ll
					put it on one schedule.
				</p>
				{#if services.placeholder}<span class="ph-tag">Draft list, confirm services</span>{/if}
				<Photo image={services.image} ratio="3 / 2" class="aside-photo" />
				<div class="aside-cta"><Cta kind="quote" /></div>
			</div>
		</div>

		<div class="main">
			<ol class="list">
				{#each services.items as item, i (item.name)}
					<li>
						<span class="num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
						<div class="body">
							<h3>{item.name}</h3>
							<p>{item.body}</p>
						</div>
						<div class="meta">
							<span class="season">{item.season}</span>
							<a class="quote-link" href={quoteFor(item.name)}>
								Quote this <span class="visually-hidden">: {item.name}</span>
								<Icon name="arrow" size={18} />
							</a>
						</div>
					</li>
				{/each}
			</ol>

			{#if season}
				<LastCall {season} />
			{/if}
		</div>
	</div>
</section>

<style>
	.services {
		padding-block: calc(var(--section-y) + 24px) var(--section-y);
	}

	.grid {
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
		gap: 56px clamp(40px, 6vw, 96px);
	}

	.sticky {
		position: sticky;
		top: calc(var(--header-h) + 32px);
		display: grid;
		justify-items: start;
		gap: 24px;
	}

	.sticky :global(.aside-photo) {
		width: 100%;
	}

	.list {
		list-style: none;
		border-top: 2px solid var(--ink);
	}

	li {
		display: grid;
		grid-template-columns: 52px minmax(0, 1fr) auto;
		gap: 8px 24px;
		padding-block: 30px;
		border-bottom: 1px solid var(--sand);
	}

	.num {
		padding-top: 0.5em;
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.05rem;
		letter-spacing: 0.08em;
		color: var(--orange-ink);
	}

	h3 {
		font-size: clamp(1.9rem, 2.8vw, 2.4rem);
	}

	.body p {
		margin-top: 10px;
		max-width: 34em;
		color: var(--ink-soft);
	}

	.meta {
		display: grid;
		justify-items: end;
		align-content: space-between;
		gap: 12px;
		text-align: right;
	}

	.season {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 0.9rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--ink-soft);
		white-space: nowrap;
	}

	.quote-link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.1rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--green);
		white-space: nowrap;
	}

	.quote-link:hover {
		text-decoration: underline;
		text-underline-offset: 5px;
	}

	.main > :global(.last-call) {
		margin-top: 48px;
	}

	/* On narrow screens the list comes straight after the heading; photo and button follow it. */
	@media (max-width: 1000px) {
		.grid {
			display: flex;
			flex-direction: column;
			align-items: stretch;
			gap: 24px;
		}

		.aside,
		.sticky {
			display: contents;
		}

		.sticky > :global(*) {
			justify-self: start;
			align-self: flex-start;
		}

		.main {
			order: 1;
			margin-top: 8px;
		}

		.sticky :global(.aside-photo) {
			order: 2;
			margin-top: 24px;
		}

		.aside-cta {
			order: 3;
		}
	}

	@media (max-width: 640px) {
		li {
			grid-template-columns: 36px minmax(0, 1fr);
		}

		.meta {
			grid-column: 2;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
			text-align: left;
		}
	}
</style>

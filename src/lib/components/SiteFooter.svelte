<script lang="ts">
	import { business, licenses, services, serviceArea } from '#lib/content/site.ts';
	import Logo from './Logo.svelte';
	import TrustLine from './TrustLine.svelte';

	const year = new Date().getFullYear();
</script>

<footer class="footer on-dark">
	<div class="wrap">
		<div class="top">
			<div class="brand">
				<Logo tone="dark" height={104} />
				<p class="slogan">{business.slogan}</p>
				<a class="phone" href={business.phoneHref}>{business.phone}</a>
				<p class="meta">
					<a href="mailto:{business.email.value}">{business.email.value}</a>
					{#if business.email.placeholder}<span class="ph-tag">Placeholder</span>{/if}
				</p>
				<p class="meta">
					{business.hours.value}
					{#if business.hours.placeholder}<span class="ph-tag">Confirm</span>{/if}
				</p>
			</div>

			<nav class="col" aria-label="Services">
				<h2>Services</h2>
				<ul>
					{#each services.items as item (item.name)}
						<li><a href="/#services">{item.name}</a></li>
					{/each}
				</ul>
			</nav>

			<nav class="col" aria-label="Company">
				<h2>Company</h2>
				<ul>
					<li><a href="/#story">Meet Ryan & Lindsay</a></li>
					<li><a href="/#crew">The crew</a></li>
					<li><a href="/#reviews">Reviews</a></li>
					<li><a href="/careers">Careers</a></li>
					<li><a href={business.quoteHref}>Get a quote</a></li>
				</ul>
			</nav>

			<div class="col">
				<h2>Service area</h2>
				<p class="towns">{serviceArea.towns.join(' · ')}</p>
				{#if serviceArea.placeholder}<span class="ph-tag">Confirm towns</span>{/if}
			</div>
		</div>

		<div class="credentials">
			<TrustLine tone="dark" />
			<dl class="licenses">
				{#each licenses as license (license.label)}
					<div>
						<dt>{license.label}</dt>
						<dd>
							{license.value}
							{#if license.placeholder}<span class="ph-tag">Placeholder</span>{/if}
						</dd>
					</div>
				{/each}
			</dl>
		</div>

		<div class="bottom">
			<p>© {year} {business.legalName}. Family-owned in {business.region}.</p>
			<ul>
				<li><a href="/privacy">Privacy</a></li>
				{#each business.social as link (link.label)}
					<li><a href={link.href} rel="noopener">{link.label}</a></li>
				{/each}
			</ul>
		</div>
	</div>
</footer>

<style>
	.footer {
		background: var(--charcoal-deep);
		padding-block: 72px 32px;
		font-size: 0.98rem;
		color: var(--on-dark-soft);
	}

	.top {
		display: grid;
		grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
		gap: 48px 40px;
		padding-bottom: 48px;
		border-bottom: 1px solid var(--rule-dark);
	}

	.slogan {
		margin-top: 18px;
		max-width: 22ch;
		font-family: var(--font-display);
		font-style: italic;
		font-weight: 600;
		font-size: 1.35rem;
		line-height: 1.15;
		color: var(--on-dark);
	}

	.phone {
		display: inline-block;
		margin-top: 18px;
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.7rem;
		color: var(--orange-on-dark);
		text-decoration: none;
	}

	.phone:hover {
		text-decoration: underline;
		text-underline-offset: 5px;
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px;
		margin-top: 6px;
	}

	h2 {
		margin-bottom: 16px;
		font-size: 0.95rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--on-dark);
	}

	.col ul {
		display: grid;
		gap: 8px;
		list-style: none;
	}

	.col a,
	.meta a,
	.bottom a {
		text-decoration: none;
	}

	.col a:hover,
	.meta a:hover,
	.bottom a:hover {
		color: var(--on-dark);
		text-decoration: underline;
		text-underline-offset: 4px;
	}

	.towns {
		margin-bottom: 10px;
		line-height: 1.75;
	}

	.credentials {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: 28px;
		padding-block: 32px;
		border-bottom: 1px solid var(--rule-dark);
	}

	.licenses {
		display: flex;
		flex-wrap: wrap;
		gap: 12px 32px;
		margin: 0;
	}

	dt {
		font-size: 0.82rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	dd {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px;
		margin: 2px 0 0;
		color: var(--on-dark);
	}

	.bottom {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 12px 24px;
		padding-top: 24px;
		font-size: 0.9rem;
	}

	.bottom ul {
		display: flex;
		gap: 20px;
		list-style: none;
	}

	@media (max-width: 980px) {
		.top {
			grid-template-columns: 1fr 1fr;
		}

		.brand {
			grid-column: 1 / -1;
		}
	}

	@media (max-width: 560px) {
		.top {
			grid-template-columns: 1fr;
		}
	}
</style>

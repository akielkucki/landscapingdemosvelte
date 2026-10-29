<script lang="ts">
	import { serviceArea } from '#lib/content/site.ts';
	import Cta from '../Cta.svelte';
	import Icon from '../Icon.svelte';
	import Photo from '../Photo.svelte';
</script>

<section id="area" class="area on-dark" aria-labelledby="area-title">
	<div class="wrap grid">
		<div class="copy">
			<p class="eyebrow">Service area</p>
			<h2 id="area-title" class="h-section">Close to home, all over Lower Bucks County.</h2>
			<p class="lede">
				These are the towns we work in. Don’t see yours? Call and ask, and we’ll tell you straight.
			</p>
			<Cta kind="call" tone="dark" label="Check your street" />
		</div>

		<div>
			{#if serviceArea.placeholder}<span class="ph-tag">Town list to confirm</span>{/if}
			<ul class="towns">
				{#each serviceArea.towns as town (town)}
					<li><Icon name="pin" size={18} />{town}</li>
				{/each}
			</ul>
		</div>
	</div>
	<div class="wrap">
		<Photo image={serviceArea.image} ratio="12 / 5" class="area-photo" />
	</div>
</section>

<style>
	.area {
		background: var(--charcoal);
		padding-block: var(--section-y);
	}

	.grid {
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
		gap: 48px clamp(40px, 7vw, 112px);
		align-items: center;
	}

	.copy {
		display: grid;
		justify-items: start;
		gap: 24px;
	}

	.towns {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		column-gap: 40px;
		margin-top: 16px;
		list-style: none;
		border-top: 1px solid var(--rule-dark);
	}

	li {
		display: flex;
		align-items: center;
		gap: 12px;
		padding-block: 14px;
		border-bottom: 1px solid var(--rule-dark);
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(1.5rem, 2.4vw, 1.95rem);
		line-height: 1.1;
	}

	li :global(svg) {
		flex-shrink: 0;
		color: var(--orange-on-dark);
	}

	.area :global(.area-photo) {
		margin-top: clamp(48px, 6vw, 80px);
	}

	@media (max-width: 900px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>

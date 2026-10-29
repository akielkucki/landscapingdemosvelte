<script lang="ts">
	import { careersTeaser, crew } from '#lib/content/site.ts';
	import { imageUrl } from '#lib/images.ts';
	import Icon from '../Icon.svelte';
	import Photo from '../Photo.svelte';
</script>

<section id="crew" class="crew on-dark" aria-labelledby="crew-title">
	<div class="wrap">
		<div class="head">
			<div class="title">
				<p class="eyebrow">{crew.eyebrow}</p>
				<h2 id="crew-title" class="h-section">{crew.headline}</h2>
			</div>
			<p class="lede">{crew.body}</p>
		</div>

		<Photo image={crew.image} ratio="21 / 9" class="crew-photo" />

		<div class="roster-head">
			<h3>On the crew</h3>
			{#if crew.rolesPlaceholder}<span class="ph-tag">Add roles</span>{/if}
		</div>
		<ul class="roster">
			{#each crew.members as member (member.name)}
				{@const src = imageUrl(member.photo)}
				<li>
					{#if src}
						<img {src} alt="" width="380" height="418" loading="lazy" decoding="async" />
					{:else}
						<span class="no-photo" aria-hidden="true">{member.name.charAt(0)}</span>
					{/if}
					<span class="name" class:visually-hidden={!crew.showNames}>{member.name}</span>
					{#if member.role}<span class="role">{member.role}</span>{/if}
				</li>
			{/each}
		</ul>

		<a class="careers" href="/careers">
			<span class="careers-copy">
				<span class="careers-title">{careersTeaser.headline}</span>
				<span class="careers-body">{careersTeaser.body}</span>
			</span>
			<span class="careers-cta">
				{careersTeaser.cta}
				<Icon name="arrow" size={22} />
			</span>
		</a>
	</div>
</section>

<style>
	.crew {
		background: var(--forest);
		padding-block: var(--section-y);
	}

	.head {
		display: grid;
		grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
		gap: 24px 64px;
		align-items: end;
		margin-bottom: 48px;
	}

	.title {
		display: grid;
		gap: 24px;
	}

	.roster-head {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 12px 20px;
		margin-top: 56px;
		padding-bottom: 14px;
		border-bottom: 1px solid var(--rule-dark);
	}

	h3 {
		font-size: 1rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--on-dark-soft);
	}

	/* A team sheet: small portraits with names, six across on desktop. */
	.roster {
		display: grid;
		grid-template-columns: repeat(6, minmax(0, 1fr));
		gap: 28px 20px;
		padding-top: 28px;
		list-style: none;
	}

	.roster li {
		display: grid;
		align-content: start;
		gap: 10px;
	}

	.roster img,
	.no-photo {
		width: 100%;
		aspect-ratio: 380 / 418;
		border-radius: var(--radius);
		object-fit: cover;
		background: var(--paper);
	}

	.no-photo {
		display: grid;
		place-items: center;
		font-family: var(--font-display);
		font-weight: 800;
		font-size: 2.4rem;
		color: var(--on-dark-soft);
	}

	.name {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.3rem;
		line-height: 1.05;
	}

	.role {
		margin-top: -6px;
		font-size: 0.9rem;
		color: var(--on-dark-soft);
	}

	.careers {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: 20px 40px;
		margin-top: 64px;
		padding: clamp(24px, 4vw, 40px);
		border-radius: var(--radius-lg);
		background: var(--paper);
		color: var(--ink);
		text-decoration: none;
		transition: background-color 0.18s var(--ease);
	}

	.careers:hover {
		background: var(--card);
	}

	.careers-copy {
		display: grid;
		gap: 8px;
		max-width: 44em;
	}

	.careers-title {
		font-family: var(--font-display);
		font-weight: 800;
		font-size: clamp(2.2rem, 4vw, 3rem);
		line-height: 1;
		color: var(--green);
	}

	.careers-body {
		color: var(--ink-soft);
	}

	.careers-cta {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.3rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		white-space: nowrap;
	}

	.careers-cta :global(svg) {
		color: var(--orange-ink);
		transition: transform 0.2s var(--ease);
	}

	.careers:hover .careers-cta :global(svg) {
		transform: translateX(4px);
	}

	@media (max-width: 1000px) {
		.head {
			grid-template-columns: 1fr;
		}

		.roster {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}

	@media (max-width: 640px) {
		.crew :global(.crew-photo) {
			aspect-ratio: 16 / 10 !important;
		}

		.roster {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 20px 12px;
		}

		.name {
			font-size: 1.05rem;
		}
	}
</style>

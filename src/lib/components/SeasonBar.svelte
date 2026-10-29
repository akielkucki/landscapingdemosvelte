<script lang="ts">
	import { onMount } from 'svelte';
	import { business, type Season } from '#lib/content/site.ts';
	import Icon from './Icon.svelte';

	let { season }: { season: Season } = $props();

	let dismissed = $state(false);
	const storageKey = $derived(`season-bar-dismissed:${season.id}`);

	onMount(() => {
		try {
			dismissed = sessionStorage.getItem(storageKey) === '1';
		} catch {
			// Storage can be unavailable (private mode); the bar just stays visible.
		}
	});

	function dismiss() {
		dismissed = true;
		try {
			sessionStorage.setItem(storageKey, '1');
		} catch {
			// Ignore: dismissal only lasts for this page view.
		}
	}
</script>

{#if !dismissed}
	<aside class="bar" aria-label="Seasonal booking notice">
		<div class="wrap inner">
			<a class="msg" href={business.quoteHref}>
				<span class="tag" class:urgent={season.urgent}>{season.tag}</span>
				<span class="headline">{season.headline}</span>
				<span class="deadline">{season.deadline}</span>
				<span class="go">Book now <Icon name="arrow" size={16} /></span>
			</a>
			<button class="close" type="button" onclick={dismiss} aria-label="Dismiss notice">
				<Icon name="close" size={16} />
			</button>
		</div>
	</aside>
{/if}

<style>
	.bar {
		background: var(--charcoal-deep);
		color: var(--on-dark);
		font-size: 0.95rem;
	}

	.inner {
		display: flex;
		align-items: center;
		gap: 12px;
		min-height: 44px;
	}

	.msg {
		display: flex;
		flex: 1;
		flex-wrap: wrap;
		align-items: center;
		gap: 4px 14px;
		padding: 8px 0;
		text-decoration: none;
	}

	.tag {
		padding: 3px 8px 2px;
		border-radius: 3px;
		background: var(--orange);
		color: var(--ink);
		font-family: var(--font-display);
		font-weight: 800;
		font-size: 0.82rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.tag.urgent {
		background: var(--red);
		color: var(--on-action);
	}

	.headline {
		font-weight: 600;
	}

	.deadline {
		color: var(--orange-on-dark);
	}

	.go {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		margin-left: auto;
		font-family: var(--font-display);
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	.msg:hover .go {
		text-decoration: underline;
		text-underline-offset: 4px;
	}

	.close {
		display: grid;
		place-items: center;
		width: 36px;
		height: 36px;
		padding: 0;
		border: 0;
		border-radius: var(--radius);
		background: transparent;
		color: var(--on-dark-soft);
		cursor: pointer;
	}

	.close:hover {
		background: rgb(255 255 255 / 0.08);
		color: var(--on-dark);
	}

	@media (max-width: 720px) {
		.go {
			display: none;
		}

		.msg {
			gap: 4px 10px;
			font-size: 0.9rem;
		}
	}
</style>

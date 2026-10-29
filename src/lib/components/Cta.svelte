<script lang="ts">
	import { business } from '#lib/content/site.ts';
	import Icon from './Icon.svelte';

	let {
		kind,
		tone = 'light',
		label,
		full = false,
		compact = false
	}: {
		/** quote: the green action button. call: click-to-call with the number. */
		kind: 'quote' | 'call';
		/** The background the button sits on. */
		tone?: 'light' | 'dark';
		label?: string;
		full?: boolean;
		/** Smaller size for the header. */
		compact?: boolean;
	} = $props();
</script>

{#if kind === 'quote'}
	<a class="cta quote" class:full class:compact href={business.quoteHref}>
		<span class="text">{label ?? 'Get an instant quote'}</span>
		<span class="icon"><Icon name="arrow" size={22} /></span>
	</a>
{:else}
	<a class="cta call {tone}" class:full class:compact href={business.phoneHref}>
		<span class="icon"><Icon name="phone" size={18} /></span>
		<span class="text">
			<span class="kicker">{label ?? 'Call us'}</span>
			<span class="number">{business.phone}</span>
		</span>
	</a>
{/if}

<style>
	.cta {
		display: inline-flex;
		align-items: stretch;
		min-height: 56px;
		border-radius: var(--radius);
		font-family: var(--font-display);
		font-weight: 700;
		text-decoration: none;
		white-space: nowrap;
		transition:
			background-color 0.18s var(--ease),
			border-color 0.18s var(--ease),
			transform 0.18s var(--ease);
	}

	.full {
		display: flex;
		width: 100%;
	}

	.cta:active {
		transform: translateY(1px);
	}

	/* Quote: green body with a darker "tab" carrying the arrow. */
	.quote {
		background: var(--green);
		color: var(--on-action);
		box-shadow: inset 0 -3px 0 rgb(0 0 0 / 0.18);
	}

	.quote .text {
		display: flex;
		flex: 1;
		align-items: center;
		padding: 0 20px 0 22px;
		font-size: 1.2rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	.quote .icon {
		display: grid;
		place-items: center;
		width: 54px;
		border-left: 1px solid rgb(255 255 255 / 0.22);
		background: var(--green-press);
		border-radius: 0 var(--radius) var(--radius) 0;
		box-shadow: inset 0 -3px 0 rgb(0 0 0 / 0.18);
	}

	.quote .icon :global(svg) {
		transition: transform 0.2s var(--ease);
	}

	.quote:hover {
		background: var(--green-press);
	}

	.quote:hover .icon :global(svg) {
		transform: translateX(3px);
	}

	/* Call: outlined, phone glyph in an orange tile, number set large. */
	.call {
		align-items: center;
		gap: 12px;
		padding: 0 20px 0 8px;
		border: 2px solid var(--ink);
		color: var(--ink);
	}

	.call.dark {
		border-color: rgb(251 247 239 / 0.7);
		color: var(--on-dark);
	}

	.call .icon {
		display: grid;
		place-items: center;
		width: 38px;
		height: 38px;
		border-radius: 3px;
		background: var(--orange);
		color: var(--ink);
	}

	.call .text {
		display: grid;
		line-height: 1;
		gap: 3px;
	}

	.kicker {
		font-size: 0.78rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		opacity: 0.8;
	}

	.number {
		font-size: 1.3rem;
		letter-spacing: 0.02em;
	}

	.call:hover {
		background: var(--ink);
		color: var(--paper);
	}

	.call.dark:hover {
		background: var(--on-dark);
		border-color: var(--on-dark);
		color: var(--ink);
	}

	.full.call {
		justify-content: center;
	}

	.compact {
		min-height: 46px;
	}

	.compact.quote .text {
		padding: 0 14px 0 16px;
		font-size: 1.05rem;
	}

	.compact.quote .icon {
		width: 42px;
	}
</style>

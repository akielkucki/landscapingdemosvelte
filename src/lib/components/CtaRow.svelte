<script lang="ts">
	import Cta from './Cta.svelte';

	/** A closing call-to-action line for the end of a section. */
	let { text, tone = 'light' }: { text: string; tone?: 'light' | 'dark' } = $props();
</script>

<div class="cta-row {tone}">
	<p>{text}</p>
	<div class="buttons">
		<Cta kind="quote" />
		<Cta kind="call" {tone} />
	</div>
</div>

<style>
	.cta-row {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: 20px 32px;
		margin-top: clamp(40px, 5vw, 64px);
		padding-top: clamp(24px, 3vw, 32px);
		border-top: 1px solid var(--sand);
	}

	.dark {
		border-top-color: var(--rule-dark);
	}

	p {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(1.6rem, 2.6vw, 2.1rem);
		line-height: 1.05;
		max-width: 22ch;
	}

	.buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}

	@media (max-width: 560px) {
		.buttons {
			display: grid;
			width: 100%;
		}
	}
</style>

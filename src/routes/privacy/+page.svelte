<script lang="ts">
	import { business } from '#lib/content/site.ts';
</script>

<svelte:head>
	<title>Privacy | {business.name}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<!-- PLACEHOLDER: plain-language draft. Have the business review it (and a professional if needed) before launch. -->
<article class="wrap privacy">
	<p class="eyebrow">Privacy</p>
	<h1>How we handle your details</h1>
	<span class="ph-tag">Draft, needs the owners’ review before launch</span>

	<h2>What we collect</h2>
	<p>
		When you request a quote or apply for a job, we collect what you type into the form: your name, phone
		number, email (if you give it), town and anything you tell us about your property or yourself.
	</p>

	<h2>How we use it</h2>
	<p>
		We use it to get back to you about your quote or application and to schedule work you ask for. We don’t
		sell your details or share them with anyone for marketing.
	</p>

	<h2>Questions</h2>
	<p>
		Call <a href={business.phoneHref}>{business.phone}</a> if you’d like us to update or delete what we have
		about you.
	</p>
</article>

<style>
	.privacy {
		display: grid;
		justify-items: start;
		gap: 18px;
		max-width: calc(760px + var(--gutter) * 2);
		padding-block: clamp(48px, 7vw, 96px) var(--section-y);
	}

	h1 {
		font-size: clamp(2.6rem, 5vw, 4rem);
	}

	h2 {
		margin-top: 18px;
		font-size: 1.8rem;
	}

	p {
		color: var(--ink-soft);
	}

	a {
		font-weight: 600;
		color: var(--green);
	}
</style>

<script lang="ts">
	import { enhance } from '$app/forms';
	import { business, careers } from '#lib/content/site.ts';
	import type { FormState } from '#lib/forms.ts';
	import Icon from '#lib/components/Icon.svelte';
	import Photo from '#lib/components/Photo.svelte';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();

	// svelte-ignore state_referenced_locally
	let result = $state<FormState>(form as FormState);
	let submitting = $state(false);

	const errors = $derived(result?.errors ?? {});
	const values = $derived(result?.values ?? {});
	const describedBy = (name: string) => (errors[name] ? `${name}-error` : undefined);
</script>

<svelte:head>
	<title>Careers | {business.name}</title>
	<meta
		name="description"
		content="Join the crew at RD's Total Lawn, a faith-driven, family-owned lawn care company in Lower Bucks County."
	/>
</svelte:head>

<section class="intro">
	<div class="wrap grid">
		<div class="copy">
			<p class="eyebrow">Careers</p>
			<h1>{careers.headline}</h1>
			<p class="lede">{careers.intro}</p>
			<a class="jump" href="#apply">Apply now <Icon name="arrow" size={20} /></a>
		</div>
		<Photo image={careers.image} ratio="3 / 2" eager />
	</div>
</section>

<section class="values on-dark" aria-labelledby="values-title">
	<div class="wrap">
		<div class="values-head">
			<h2 id="values-title" class="h-section">What we look for</h2>
			{#if careers.valuesDraft}<span class="ph-tag">Draft copy, confirm with owners</span>{/if}
		</div>
		<ol>
			{#each careers.values as value, i (value.title)}
				<li>
					<span class="n" aria-hidden="true">0{i + 1}</span>
					<h3>{value.title}</h3>
					<p>{value.body}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<section class="roles" aria-labelledby="roles-title">
	<div class="wrap grid-roles">
		<div>
			<p class="eyebrow">Open roles</p>
			<h2 id="roles-title" class="h-section">Where you’d fit.</h2>
			<p class="lede">Don’t see the right role? Apply anyway. We’re always glad to meet good people.</p>
		</div>
		<ul class="role-list">
			{#each careers.roles as role (role.title)}
				<li>
					<div>
						<h3>{role.title}</h3>
						<p>{role.type}</p>
					</div>
					{#if role.placeholder}<span class="ph-tag">Placeholder role</span>{/if}
				</li>
			{/each}
		</ul>
	</div>
</section>

<section id="apply" class="apply" aria-labelledby="apply-title">
	<div class="wrap grid-apply">
		<div class="apply-copy">
			<p class="eyebrow">Apply</p>
			<h2 id="apply-title" class="h-section">Tell us about yourself.</h2>
			<p class="lede">
				No résumé needed. Fill this in and someone from our team will reach out. Questions first? Call <a href={business.phoneHref}>{business.phone}</a>.
			</p>
		</div>

		<div class="card">
			{#if result?.success}
				<div class="sent" role="status">
					<p class="sent-title">Thanks{result.name ? `, ${result.name}` : ''}.</p>
					<p>We’ve got your application and we’ll be in touch.</p>
				</div>
			{:else}
				<form
					method="POST"
					novalidate
					use:enhance={() => {
						submitting = true;
						return async ({ result: outcome, update }) => {
							submitting = false;
							if (outcome.type === 'success' || outcome.type === 'failure') {
								result = (outcome.data ?? null) as FormState;
							} else {
								await update();
							}
						};
					}}
				>
					{#if Object.keys(errors).length > 0}
						<p class="form-summary" role="alert">Please check the highlighted fields.</p>
					{/if}
					<div class="fields">
						<div class="field">
							<label for="name">Name</label>
							<input
								class="input"
								id="name"
								name="name"
								autocomplete="name"
								required
								value={values.name ?? ''}
								aria-invalid={errors.name ? 'true' : undefined}
								aria-describedby={describedBy('name')}
							/>
							{#if errors.name}<p class="field-error" id="name-error">{errors.name}</p>{/if}
						</div>
						<div class="field">
							<label for="phone">Phone</label>
							<input
								class="input"
								id="phone"
								name="phone"
								type="tel"
								autocomplete="tel"
								required
								value={values.phone ?? ''}
								aria-invalid={errors.phone ? 'true' : undefined}
								aria-describedby={describedBy('phone')}
							/>
							{#if errors.phone}<p class="field-error" id="phone-error">{errors.phone}</p>{/if}
						</div>
						<div class="field">
							<label for="email">Email <span class="optional">(optional)</span></label>
							<input
								class="input"
								id="email"
								name="email"
								type="email"
								autocomplete="email"
								value={values.email ?? ''}
								aria-invalid={errors.email ? 'true' : undefined}
								aria-describedby={describedBy('email')}
							/>
							{#if errors.email}<p class="field-error" id="email-error">{errors.email}</p>{/if}
						</div>
						<div class="field">
							<label for="role">Interested in</label>
							<select class="input" id="role" name="role">
								{#each careers.roles as role (role.title)}
									<option value={role.title} selected={values.role === role.title}>{role.title}</option>
								{/each}
								<option value="Not sure" selected={values.role === 'Not sure'}>Not sure yet</option>
							</select>
						</div>
						<div class="field">
							<label for="experience">Lawn care experience</label>
							<select class="input" id="experience" name="experience">
								{#each ['None yet, happy to learn', 'Less than 1 year', '1–3 years', '3+ years'] as option (option)}
									<option value={option} selected={values.experience === option}>{option}</option>
								{/each}
							</select>
						</div>
						<div class="field">
							<label for="license">Valid driver’s license?</label>
							<select class="input" id="license" name="license">
								{#each ['Yes', 'No'] as option (option)}
									<option value={option} selected={values.license === option}>{option}</option>
								{/each}
							</select>
						</div>
						<div class="field wide">
							<label for="about">Anything you’d like us to know? <span class="optional">(optional)</span></label>
							<textarea class="input" id="about" name="about" rows="4">{values.about ?? ''}</textarea>
						</div>
					</div>
					<div class="form-trap" aria-hidden="true">
						<label>Company <input name="company" tabindex="-1" autocomplete="off" /></label>
					</div>
					<button class="btn-submit" type="submit" disabled={submitting}>
						<span>{submitting ? 'Sending…' : 'Send my application'}</span>
						<span class="icon"><Icon name="arrow" size={22} /></span>
					</button>
				</form>
			{/if}
		</div>
	</div>
</section>

<style>
	.intro {
		padding-block: clamp(40px, 6vw, 80px) var(--section-y);
	}

	.grid {
		display: grid;
		grid-template-columns: minmax(0, 6fr) minmax(0, 5fr);
		gap: 40px clamp(32px, 6vw, 88px);
		align-items: center;
	}

	.copy {
		display: grid;
		justify-items: start;
		gap: 24px;
	}

	h1 {
		font-weight: 800;
		font-size: clamp(2.9rem, 5.6vw, 4.9rem);
		line-height: 0.94;
	}

	.jump {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.25rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--green);
		text-decoration: none;
	}

	.jump:hover {
		text-decoration: underline;
		text-underline-offset: 5px;
	}

	.values {
		padding-block: var(--section-y);
		background: var(--forest);
	}

	.values-head {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 16px 24px;
		margin-bottom: 40px;
	}

	.values ol {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 32px clamp(24px, 4vw, 56px);
		list-style: none;
	}

	.values li {
		padding-top: 20px;
		border-top: 2px solid var(--orange);
	}

	.values .n {
		font-family: var(--font-display);
		font-weight: 700;
		color: var(--orange-on-dark);
	}

	.values h3 {
		margin-top: 6px;
		font-size: 2rem;
	}

	.values p {
		margin-top: 10px;
		color: var(--on-dark-soft);
	}

	.roles {
		padding-block: var(--section-y) 0;
	}

	.grid-roles,
	.grid-apply {
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
		gap: 40px clamp(32px, 6vw, 96px);
		align-items: start;
	}

	.grid-roles > div:first-child,
	.apply-copy {
		display: grid;
		gap: 22px;
	}

	.role-list {
		list-style: none;
		border-top: 2px solid var(--ink);
	}

	.role-list li {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
		padding-block: 24px;
		border-bottom: 1px solid var(--sand);
	}

	.role-list h3 {
		font-size: 2rem;
	}

	.role-list p {
		color: var(--ink-soft);
	}

	.apply {
		padding-block: var(--section-y);
	}

	.apply-copy a {
		font-weight: 600;
		color: var(--green);
		white-space: nowrap;
	}

	.card {
		padding: clamp(22px, 3.4vw, 40px);
		border: 1px solid var(--sand);
		border-radius: var(--radius-lg);
		background: var(--card);
	}

	form {
		display: grid;
		gap: 20px;
	}

	.fields {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 18px 16px;
	}

	.wide {
		grid-column: 1 / -1;
	}

	.sent {
		display: grid;
		gap: 8px;
	}

	.sent-title {
		font-family: var(--font-display);
		font-weight: 800;
		font-size: 2.4rem;
		color: var(--green);
	}

	@media (max-width: 900px) {
		.grid,
		.grid-roles,
		.grid-apply {
			grid-template-columns: 1fr;
		}

		.values ol {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 560px) {
		.fields {
			grid-template-columns: 1fr;
		}
	}
</style>

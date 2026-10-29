<script lang="ts">
	import { enhance } from '$app/forms';
	import { business, serviceArea, services } from '#lib/content/site.ts';
	import type { FormState } from '#lib/forms.ts';
	import Icon from './Icon.svelte';

	let {
		full = false,
		quick = false,
		stacked = false,
		initial = null,
		service = ''
	}: {
		/** The /quote page asks a few more questions than the homepage form. */
		full?: boolean;
		/** Four fields only (name, phone, town, service), for the hero panel. */
		quick?: boolean;
		/** One field per row, for tall narrow panels. */
		stacked?: boolean;
		/** Result of a no-JS submission, from the page's `form` prop. */
		initial?: FormState;
		/** Pre-selected service, e.g. from ?service= on /quote. */
		service?: string;
	} = $props();

	// Seeded once from the server result; after that the form manages its own state.
	// svelte-ignore state_referenced_locally
	let result = $state<FormState>(initial);
	let submitting = $state(false);

	const errors = $derived(result?.errors ?? {});
	const values = $derived(result?.values ?? {});
	const uid = $props.id();
	const id = (name: string) => `${uid}-${name}`;
	const describedBy = (name: string) => (errors[name] ? id(`${name}-error`) : undefined);
</script>

{#if result?.success}
	<div class="sent" class:quick role="status">
		<p class="sent-kicker">Request received</p>
		<p class="sent-title">Thanks{result.name ? `, ${result.name}` : ''}. We’ve got it.</p>
		<p>
			Someone from our team will get back to you about your quote. If it’s urgent, call us at
			<a href={business.phoneHref}>{business.phone}</a>.
		</p>
	</div>
{:else}
	<form
		method="POST"
		action="/quote"
		novalidate
		class:quick
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

		<div class="grid" class:stacked>
			<div class="field">
				<label for={id('name')}>Name</label>
				<input
					class="input"
					id={id('name')}
					name="name"
					autocomplete="name"
					required
					value={values.name ?? ''}
					aria-invalid={errors.name ? 'true' : undefined}
					aria-describedby={describedBy('name')}
				/>
				{#if errors.name}<p class="field-error" id={id('name-error')}>{errors.name}</p>{/if}
			</div>

			<div class="field">
				<label for={id('phone')}>Phone</label>
				<input
					class="input"
					id={id('phone')}
					name="phone"
					type="tel"
					autocomplete="tel"
					inputmode="tel"
					required
					value={values.phone ?? ''}
					aria-invalid={errors.phone ? 'true' : undefined}
					aria-describedby={describedBy('phone')}
				/>
				{#if errors.phone}<p class="field-error" id={id('phone-error')}>{errors.phone}</p>{/if}
			</div>

			{#if !quick}
				<div class="field">
					<label for={id('email')}>Email <span class="optional">(optional)</span></label>
					<input
						class="input"
						id={id('email')}
						name="email"
						type="email"
						autocomplete="email"
						value={values.email ?? ''}
						aria-invalid={errors.email ? 'true' : undefined}
						aria-describedby={describedBy('email')}
					/>
					{#if errors.email}<p class="field-error" id={id('email-error')}>{errors.email}</p>{/if}
				</div>
			{/if}

			<div class="field">
				<label for={id('town')}>Town</label>
				<input
					class="input"
					id={id('town')}
					name="town"
					list={id('towns')}
					autocomplete="address-level2"
					required
					value={values.town ?? ''}
					aria-invalid={errors.town ? 'true' : undefined}
					aria-describedby={describedBy('town')}
				/>
				<datalist id={id('towns')}>
					{#each serviceArea.towns as town (town)}<option value={town}></option>{/each}
				</datalist>
				{#if errors.town}<p class="field-error" id={id('town-error')}>{errors.town}</p>{/if}
			</div>

			<div class="field" class:wide={!full && !quick}>
				<label for={id('service')}>{quick ? 'Service' : 'What do you need?'}</label>
				<select class="input" id={id('service')} name="service">
					<option value="" selected={!(values.service || service)}>Not sure yet</option>
					{#each services.items as item (item.name)}
						<option value={item.name} selected={(values.service || service) === item.name}>{item.name}</option>
					{/each}
				</select>
			</div>

			{#if full}
				<div class="field">
					<label for={id('size')}>Property size</label>
					<select class="input" id={id('size')} name="size">
						{#each ['Not sure', 'Small (under ¼ acre)', 'Medium (¼ to ½ acre)', 'Large (½ acre or more)'] as size (size)}
							<option value={size} selected={values.size === size}>{size}</option>
						{/each}
					</select>
				</div>

				<fieldset class="field contact">
					<legend class="label">Best way to reach you</legend>
					<div class="choices">
						{#each ['Call', 'Text', 'Email'] as option (option)}
							<label class="choice">
								<input
									type="radio"
									name="contact"
									value={option}
									checked={(values.contact || 'Call') === option}
								/>
								<span>{option}</span>
							</label>
						{/each}
					</div>
				</fieldset>

				<div class="field">
					<label for={id('time')}>Best time to reach you</label>
					<select class="input" id={id('time')} name="time">
						{#each ['Any time', 'Morning', 'Afternoon', 'Evening'] as time (time)}
							<option value={time} selected={values.time === time}>{time}</option>
						{/each}
					</select>
				</div>
			{/if}

			{#if !quick}
				<div class="field wide">
					<label for={id('details')}>Anything we should know? <span class="optional">(optional)</span></label>
					<textarea
						class="input"
						id={id('details')}
						name="details"
						rows={full ? 5 : 3}
						placeholder="Gate code, problem spots, how often you'd like us…">{values.details ?? ''}</textarea
					>
				</div>
			{/if}
		</div>

		<!-- Spam trap: real visitors never see or fill this. -->
		<div class="form-trap" aria-hidden="true">
			<label>Company <input name="company" tabindex="-1" autocomplete="off" /></label>
		</div>

		<button class="btn-submit" type="submit" disabled={submitting}>
			<span>{submitting ? 'Sending…' : quick ? 'Get my quote' : 'Send my quote request'}</span>
			<span class="icon"><Icon name="arrow" size={22} /></span>
		</button>
		<p class="fine">
			{quick
				? 'No obligation. We’ll call you back.'
				: 'No obligation. We only use your details to get back to you about this quote.'}
		</p>
	</form>
{/if}

<style>
	form {
		display: grid;
		gap: 20px;
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 180px 16px;
	}

	.wide {
		grid-column: 1 / -1;
	}

	.grid.stacked {
		grid-template-columns: 1fr;
	}

	.contact {
		margin: 0;
		padding: 0;
		border: 0;
	}

	.contact legend {
		margin-bottom: 6px;
		padding: 0;
	}

	.choices {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	.choice {
		position: relative;
		cursor: pointer;
	}

	.choice input {
		position: absolute;
		opacity: 0;
		inset: 0;
		margin: 0;
		cursor: pointer;
	}

	.choice span {
		display: block;
		min-width: 76px;
		padding: 11px 14px;
		border: 1px solid var(--field-border);
		border-radius: var(--radius);
		background: var(--card);
		text-align: center;
		font-weight: 600;
	}

	.choice input:checked + span {
		border-color: var(--green);
		background: var(--green);
		color: var(--on-action);
	}

	.choice input:focus-visible + span {
		outline: 3px solid var(--orange);
		outline-offset: 2px;
	}

	.fine {
		font-size: 0.875rem;
		color: var(--ink-soft);
	}

	.sent {
		display: grid;
		gap: 10px;
		padding: 8px 0;
	}

	.sent-kicker {
		font-family: var(--font-display);
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--green);
	}

	.sent-title {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 2.2rem;
		line-height: 1;
	}

	.sent a {
		font-weight: 600;
		color: var(--green);
	}

	/* The hero panel is tighter. */
	form.quick {
		gap: 14px;
	}

	.quick .grid {
		gap: 14px 12px;
	}

	.sent.quick .sent-title {
		font-size: 1.7rem;
	}

	@media (max-width: 560px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
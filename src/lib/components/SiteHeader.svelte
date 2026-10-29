<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { business, nav } from '#lib/content/site.ts';
	import Cta from './Cta.svelte';
	import Icon from './Icon.svelte';
	import Logo from './Logo.svelte';

	let open = $state(false);
	let scrolled = $state(false);
	let header: HTMLElement;
	let menuTop = $state(0);

	function toggle() {
		menuTop = header.getBoundingClientRect().bottom;
		open = !open;
	}

	afterNavigate(() => {
		open = false;
	});

	$effect(() => {
		document.documentElement.style.overflow = open ? 'hidden' : '';
		return () => {
			document.documentElement.style.overflow = '';
		};
	});

	// Scroll spy: highlight the nav link for the homepage section in the middle of the screen.
	let current = $state('');

	$effect(() => {
		if (page.url.pathname !== '/') {
			current = page.url.pathname;
			return;
		}
		current = '';
		const sections = nav
			.map((item) => document.getElementById(item.href.split('#')[1] ?? ''))
			.filter((el): el is HTMLElement => el !== null);
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) if (entry.isIntersecting) current = `/#${entry.target.id}`;
			},
			{ rootMargin: '-45% 0px -50% 0px' }
		);
		for (const section of sections) observer.observe(section);
		return () => observer.disconnect();
	});

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') open = false;
	}
</script>

<svelte:window onscroll={() => (scrolled = window.scrollY > 8)} onkeydown={onKeydown} />

<header class="header" class:scrolled class:open bind:this={header}>
	<div class="wrap bar">
		<a class="home" href="/" aria-label="{business.name}, home">
			<Logo />
		</a>

		<nav class="desktop-nav" aria-label="Main">
			<ul>
				{#each nav as item (item.href)}
					<li>
						<a href={item.href} aria-current={current === item.href ? 'true' : undefined}>{item.label}</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="actions">
			<a class="phone" href={business.phoneHref}>
				<Icon name="phone" size={18} />
				<span>{business.phone}</span>
			</a>
			<div class="quote-btn">
				<Cta kind="quote" label="Instant quote" compact />
			</div>
			<a class="phone-icon" href={business.phoneHref} aria-label="Call {business.phone}">
				<Icon name="phone" size={20} />
			</a>
			<button
				class="menu-btn"
				type="button"
				aria-expanded={open}
				aria-controls="mobile-menu"
				onclick={toggle}
			>
				<Icon name={open ? 'close' : 'menu'} size={22} />
				<span class="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
			</button>
		</div>
	</div>

	<div class="mobile-menu" id="mobile-menu" hidden={!open} style:top="{menuTop}px">
		<nav class="wrap" aria-label="Mobile">
			<ul>
				{#each nav as item (item.href)}
					<li><a href={item.href} onclick={() => (open = false)}>{item.label}</a></li>
				{/each}
			</ul>
			<div class="mobile-ctas">
				<Cta kind="quote" full />
				<Cta kind="call" full />
			</div>
		</nav>
	</div>
</header>

<style>
	.header {
		position: sticky;
		top: 0;
		z-index: 50;
		background: var(--paper);
		border-bottom: 1px solid transparent;
		transition:
			border-color 0.2s,
			box-shadow 0.2s;
	}

	.header.scrolled {
		border-bottom-color: var(--sand);
		box-shadow: 0 6px 18px -14px rgb(28 33 30 / 0.5);
	}

	.bar {
		display: flex;
		align-items: center;
		gap: 24px;
		height: var(--header-h);
	}

	.home {
		--logo-h: 66px;
		display: inline-flex;
		text-decoration: none;
		flex-shrink: 0;
	}

	.desktop-nav {
		margin-left: auto;
	}

	.desktop-nav ul {
		display: flex;
		gap: 4px;
		list-style: none;
	}

	.desktop-nav a {
		display: block;
		padding: 8px 12px;
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 1.12rem;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--ink);
		border-radius: var(--radius);
	}

	.desktop-nav a[aria-current='true'] {
		color: var(--green);
		text-decoration: underline;
		text-decoration-color: var(--orange);
		text-decoration-thickness: 2px;
		text-underline-offset: 6px;
	}

	.desktop-nav a:hover {
		color: var(--green);
		text-decoration: underline;
		text-decoration-thickness: 2px;
		text-underline-offset: 6px;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 18px;
	}

	.phone {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.25rem;
		text-decoration: none;
		color: var(--ink);
	}

	.phone :global(svg) {
		color: var(--orange-ink);
	}

	.phone:hover span {
		text-decoration: underline;
		text-underline-offset: 4px;
	}

	.phone-icon,
	.menu-btn {
		display: none;
		place-items: center;
		width: 46px;
		height: 46px;
		padding: 0;
		border: 2px solid var(--ink);
		border-radius: var(--radius);
		background: transparent;
		color: var(--ink);
		cursor: pointer;
	}

	.phone-icon {
		border-color: var(--orange);
		background: var(--orange);
	}

	.mobile-menu {
		position: fixed;
		inset: var(--header-h) 0 0;
		z-index: 1;
		overflow-y: auto;
		background: var(--paper);
		border-top: 1px solid var(--sand);
	}

	.mobile-menu[hidden] {
		display: none;
	}

	.mobile-menu ul {
		list-style: none;
		padding-block: 12px;
	}

	.mobile-menu li a {
		display: block;
		padding: 14px 0;
		border-bottom: 1px solid var(--sand);
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 2rem;
		text-decoration: none;
	}

	.mobile-ctas {
		display: grid;
		gap: 12px;
		padding-block: 20px 40px;
	}

	@media (max-width: 1180px) {
		.phone {
			display: none;
		}
	}

	@media (max-width: 1000px) {
		.home {
			--logo-h: 54px;
		}

		.desktop-nav,
		.quote-btn {
			display: none;
		}

		.actions {
			margin-left: auto;
			gap: 10px;
		}

		.phone-icon,
		.menu-btn {
			display: grid;
		}
	}

	@media (min-width: 1001px) {
		.mobile-menu {
			display: none;
		}
	}
</style>

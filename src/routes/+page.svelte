<script lang="ts">
	import { business, serviceArea } from '#lib/content/site.ts';
	import Crew from '#lib/components/home/Crew.svelte';
	import Faq from '#lib/components/home/Faq.svelte';
	import Hero from '#lib/components/home/Hero.svelte';
	import Promises from '#lib/components/home/Promises.svelte';
	import QuoteSection from '#lib/components/home/QuoteSection.svelte';
	import Results from '#lib/components/home/Results.svelte';
	import Reviews from '#lib/components/home/Reviews.svelte';
	import ServiceArea from '#lib/components/home/ServiceArea.svelte';
	import Services from '#lib/components/home/Services.svelte';
	import Story from '#lib/components/home/Story.svelte';
	import { imageUrl } from '#lib/images.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	// Only facts the business has confirmed go into structured data.
	const jsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'LandscapingBusiness',
		name: business.legalName,
		slogan: business.slogan,
		url: business.siteUrl,
		// Assumes this site is deployed at business.siteUrl.
		logo: new URL(imageUrl(business.logo.file) ?? '/', business.siteUrl).href,
		telephone: '+1-215-688-1622',
		foundingDate: String(business.founded),
		founder: [
			{ '@type': 'Person', name: 'Ryan Dittes' },
			{ '@type': 'Person', name: 'Lindsay Dittes' }
		],
		areaServed: serviceArea.placeholder ? 'Lower Bucks County, PA' : serviceArea.towns.map((town) => `${town}, PA`)
	});
</script>

<svelte:head>
	<title>{business.name} | Lawn care in Levittown, Langhorne & Lower Bucks County</title>
	<meta
		name="description"
		content="Family-owned lawn care in Levittown, Langhorne and across Lower Bucks County since 2018. Mowing, lawn programs, aeration, mulch and leaf cleanup from a crew that answers the phone. Call (215) 688-1622."
	/>
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<Hero />
<Promises />
<Services season={data.season} />
<Results />
<Story />
<Crew />
<Reviews />
<ServiceArea />
<Faq />
<QuoteSection />

/**
 * All homepage, quote and careers content for RD's Total Lawn.
 *
 * HOW TO EDIT
 * - Photos: put a web-ready file in `src/lib/assets/site/` and set `file` to
 *   its name. Until a file is found, the site shows a labelled placeholder
 *   using `brief`. Full-size originals live in `src/lib/assets/rds-assets/`
 *   (from rdtotallawn.com, see its manifest.md) and are not bundled.
 * - Anything marked `placeholder: true` (or commented PLACEHOLDER) is not real
 *   yet and shows a visible "placeholder" tag on the page. Replace the content,
 *   then set `placeholder: false` or delete the flag.
 * - Never put in reviews, replies, licence numbers or credentials that the
 *   business hasn't supplied.
 *
 * Facts supplied by the business (safe to show): owners Ryan & Lindsay Dittes,
 * started 2018 as a side business, crew of about 10, faith-driven and
 * family-owned, Lower Bucks County, phone (215) 688-1622, 5.0 Google rating,
 * BBB A+, 2026 Best of Bucks nominee, slogan.
 */

export type Img = {
	/** Filename inside src/lib/assets/site/. Leave empty until the real photo exists. */
	file?: string;
	alt: string;
	/** What the photo should show. Used as the placeholder label. */
	brief: string;
	width?: number;
	height?: number;
	/** CSS object-position, to choose which part of the photo stays in frame. */
	position?: string;
	/** For stacked before/after composites: show only the top or bottom half. */
	crop?: 'top' | 'bottom';
};

export const business = {
	name: "RD's Total Lawn",
	legalName: "RD's Total Lawn LLC",
	slogan: 'Big enough to deliver, small enough to care.',
	owners: 'Ryan & Lindsay Dittes',
	founded: 2018,
	crewSize: 'about 10',
	region: 'Lower Bucks County, PA',
	phone: '(215) 688-1622',
	phoneHref: 'tel:+12156881622',
	/** Current public site (from the image manifest). Used in structured data. */
	siteUrl: 'https://www.rdtotallawn.com',
	email: { value: 'hello@example.com', placeholder: true }, // PLACEHOLDER: real email address
	hours: { value: 'Mon–Fri 7am–5pm', placeholder: true }, // PLACEHOLDER: confirm office hours
	/** Point this at a third-party instant-quote tool if the business uses one. */
	quoteHref: '/quote',
	googleReviewsHref: { value: 'https://www.google.com/maps', placeholder: true }, // PLACEHOLDER: Google Business Profile reviews link
	social: [
		{ label: 'Facebook', href: 'https://www.facebook.com/', placeholder: true }, // PLACEHOLDER
		{ label: 'Instagram', href: 'https://www.instagram.com/', placeholder: true } // PLACEHOLDER
	],
	logo: {
		file: 'logo.webp',
		alt: "RD's Total Lawn",
		brief: 'Logo (SVG or transparent PNG)',
		width: 304,
		height: 220
	} satisfies Img,
	/** Cropped from the logo artwork. Swap for a standalone mascot file if one exists. */
	mascot: {
		file: 'mascot.webp',
		alt: "RD's Total Lawn mascot giving a thumbs up",
		brief: 'Mascot, transparent PNG',
		width: 380,
		height: 330
	} satisfies Img
};

export const trust = {
	googleRating: '5.0',
	googleReviewCount: { value: '[count]', placeholder: true }, // PLACEHOLDER: number of Google reviews
	bbb: 'A+',
	award: 'Best of Bucks 2026 nominee',
	badges: {
		// PLACEHOLDER: no badge artwork supplied yet, so typographic marks are shown instead.
		bbb: { file: '', alt: 'BBB A+ rating', brief: 'BBB accreditation seal' } satisfies Img,
		bestOfBucks: {
			file: '',
			alt: 'Best of Bucks 2026 nominee',
			brief: 'Best of Bucks 2026 nominee badge'
		} satisfies Img
	}
};

export const nav = [
	{ label: 'Services', href: '/#services' },
	{ label: 'Results', href: '/#results' },
	{ label: 'Our story', href: '/#story' },
	{ label: 'Reviews', href: '/#reviews' },
	{ label: 'Careers', href: '/careers' }
];

/**
 * Seasonal "last call" campaigns. The one whose window contains today's date
 * shows in the top bar and in the services section.
 * PLACEHOLDER: dates, deadlines and wording need confirming with the owners.
 */
export type Season = {
	id: string;
	/** Inclusive window as [month, day] pairs (1-based months). */
	from: [number, number];
	to: [number, number];
	tag: string;
	headline: string;
	detail: string;
	deadline: string;
	/** Must match a service name so the quote form can pre-select it. */
	service: string;
	urgent: boolean;
	placeholder?: boolean;
};

export const seasons: Season[] = [
	{
		id: 'next-season',
		from: [12, 1],
		to: [2, 14],
		tag: 'Early booking',
		headline: 'Lock in next season',
		detail: 'Returning and new customers can reserve a spot on next year’s routes and lawn programs now.',
		deadline: 'Spots go in order',
		service: 'Lawn programs',
		urgent: false,
		placeholder: true
	},
	{
		id: 'spring-beds',
		from: [2, 15],
		to: [4, 30],
		tag: 'Last call',
		headline: 'Spring mulch & bed refresh',
		detail: 'Fresh edges and mulch before everything leafs out. The spring schedule fills fast.',
		deadline: 'Book by April 30',
		service: 'Mulch & stone beds',
		urgent: true,
		placeholder: true
	},
	{
		id: 'mosquito',
		from: [5, 1],
		to: [8, 14],
		tag: 'Now booking',
		headline: 'Mosquito season is here',
		detail: 'Get treatments on the calendar so you can actually use the backyard this summer.',
		deadline: 'Book your first visit',
		service: 'Mosquito control',
		urgent: false,
		placeholder: true
	},
	{
		id: 'aeration',
		from: [8, 15],
		to: [9, 30],
		tag: 'Last call',
		headline: 'Fall aeration & overseeding',
		detail: 'Early fall is the best window for new grass to take. Once it closes, it closes until next year.',
		deadline: 'Book by September 30',
		service: 'Aeration & overseeding',
		urgent: true,
		placeholder: true
	},
	{
		id: 'fall-cleanup',
		from: [10, 1],
		to: [11, 30],
		tag: 'Last call',
		headline: 'Fall leaf cleanups',
		detail: 'We clear the leaves off the lawn and beds so the grass goes into winter healthy.',
		deadline: 'Book by November 21',
		service: 'Leaf cleanup',
		urgent: true,
		placeholder: true
	}
];

/** Draft copy built from what the owners told us. Confirm wording with Ryan & Lindsay. */
export const hero = {
	eyebrow: 'Family-owned lawn care · Lower Bucks County · Since 2018',
	headlineTop: 'Big enough to deliver.',
	headlineBottom: 'Small enough to care.',
	lede: "Ryan and Lindsay Dittes run RD's Total Lawn with a crew of about ten. You get the warmth of a small family business and the follow-through of a bigger company: we answer the phone, return messages and tell you exactly when we're coming.",
	image: {
		file: 'hero-striped-front-lawn.webp',
		alt: 'A freshly striped front lawn cut by RD’s Total Lawn',
		brief: 'Hero: freshly striped front lawn, portrait 4:5',
		width: 1200,
		height: 900,
		position: '38% 70%'
	} satisfies Img
};

/**
 * The three promises. Drawn from the brief: answer phones, return messages, clear timelines.
 * `usual` is the contrast line ("typical crew vs us"); it describes common gripes, not any named company.
 */
export const promises = [
	{
		usual: 'A voicemail box that’s already full.',
		title: 'We answer the phone.',
		body: "Call (215) 688-1622 during business hours and you'll reach someone on our team."
	},
	{
		usual: 'A quote request that disappears.',
		title: 'We call you back.',
		body: "Messages and quote requests get a reply, so you're never left wondering whether we got it."
	},
	{
		usual: '“Sometime next week.”',
		title: "We tell you when we're coming.",
		body: 'Clear timelines before the work starts, and an update if anything changes.'
	}
];

/**
 * Services shown on rdtotallawn.com (mowing, lawn programs, aeration,
 * dethatching, mulch & stone, leaf cleanup, mosquito control).
 * PLACEHOLDER: descriptions and seasons are drafts. Confirm with the owners.
 */
export const services = {
	placeholder: true,
	items: [
		{
			name: 'Mowing & trimming',
			body: 'Regular cuts with those clean stripes, string trimming, edging along walks and beds, and clippings blown off the hard surfaces.',
			season: 'Spring – Fall'
		},
		{
			name: 'Lawn programs',
			body: 'Seasonal fertilization and weed control. Choose the Base, Best or Bite-Free plan.',
			season: 'Year-round plan'
		},
		{
			name: 'Aeration & overseeding',
			body: 'Core aeration and fresh seed in early fall, when new grass has the best chance to take.',
			season: 'Late summer – Fall'
		},
		{
			name: 'Dethatching',
			body: 'We pull out the layer of dead grass that chokes the lawn, so water and feed reach the roots.',
			season: 'Spring & Fall'
		},
		{
			name: 'Mulch & stone beds',
			body: 'Fresh mulch, clean stone, crisp edges and weeded beds that make the whole yard look finished.',
			season: 'Spring'
		},
		{
			name: 'Leaf cleanup',
			body: 'Leaves cleared off the lawn and out of the beds before they smother the grass.',
			season: 'Fall'
		},
		{
			name: 'Mosquito control',
			body: 'Treatments through the warm months so you can use your backyard again.',
			season: 'Summer'
		}
	],
	image: {
		file: 'services-mowing-crew.webp',
		alt: 'RD’s Total Lawn crew member mowing stripes on a zero-turn mower',
		brief: 'Services: crew mowing, landscape 3:2',
		width: 590,
		height: 598,
		position: '50% 60%'
	} satisfies Img
};

/** Real before/after composites from rdtotallawn.com (before on top, after below). */
export const results: {
	title: string;
	service: string;
	town?: string;
	placeholder?: boolean;
	before: Img;
	after: Img;
}[] = [
	{
		title: 'Fall leaf cleanup',
		service: 'Leaf cleanup',
		before: { file: 'ba-leaf-cleanup.webp', crop: 'top', alt: 'Front lawn covered in fallen leaves, crew member blowing them off', brief: 'Before' },
		after: { file: 'ba-leaf-cleanup.webp', crop: 'bottom', alt: 'Same front lawn cleared of leaves', brief: 'After' }
	},
	{
		title: 'Mulch bed refresh',
		service: 'Mulch & stone beds',
		before: { file: 'ba-mulch-beds.webp', crop: 'top', alt: 'Shrub bed with faded mulch before work', brief: 'Before' },
		after: { file: 'ba-mulch-beds.webp', crop: 'bottom', alt: 'Same bed edged and covered in fresh dark mulch', brief: 'After' }
	},
	{
		title: 'Front beds, edged & mulched',
		service: 'Mulch & stone beds',
		before: { file: 'ba-mulch-front.webp', crop: 'top', alt: 'Front-of-house bed before mulching', brief: 'Before' },
		after: { file: 'ba-mulch-front.webp', crop: 'bottom', alt: 'Front-of-house bed freshly edged and mulched', brief: 'After' }
	},
	{
		title: 'Stone bed cleanup',
		service: 'Mulch & stone beds',
		before: { file: 'ba-stone-bed.webp', crop: 'top', alt: 'Stone bed with weeds before cleanup', brief: 'Before' },
		after: { file: 'ba-stone-bed.webp', crop: 'bottom', alt: 'Same stone bed cleaned and weed-free', brief: 'After' }
	}
];

/** Recent striped lawns from rdtotallawn.com, shown under the before/after slider. */
export const gallery: Img[] = [
	{ file: 'gallery/front-yard-stripes.webp', alt: 'Front lawn mowed in crisp diagonal stripes', brief: 'Striped lawn', width: 720, height: 514 },
	{ file: 'gallery/backyard-stripes.webp', alt: 'Wide lawn with fresh mowing stripes beside a driveway', brief: 'Striped lawn', width: 720, height: 540 },
	{ file: 'gallery/corner-lot-stripes.webp', alt: 'Corner-lot lawn with even mowing stripes and a work truck parked behind', brief: 'Striped lawn', width: 720, height: 504 },
	{ file: 'gallery/levittown-lawn.webp', alt: 'Freshly striped front lawn on a residential street', brief: 'Striped lawn', width: 720, height: 540 }
];

/** Draft story copy from the owners' facts. Confirm with Ryan & Lindsay before launch. */
export const story = {
	eyebrow: 'Meet Ryan & Lindsay',
	headline: 'It started as a side business in 2018.',
	paragraphs: [
		"Ryan and Lindsay Dittes started RD's Total Lawn as a side business. Today it's a crew of about ten, looking after lawns across Lower Bucks County.",
		"The goal hasn't changed since the first season. We want you to get the warmth of a small family business and the professionalism of a larger company: a phone that gets answered, messages that get returned, and a clear answer on when we'll be there."
	],
	faith: "We're a faith-driven family, and we give God the credit for every bit of growth we've had. We try to run this business in a way that honors that.",
	signoff: 'Ryan & Lindsay',
	// VERIFY: the manifest flags owner photos as "verify identity". Confirm this is the Dittes family.
	image: {
		file: 'owners-family-trailer.webp',
		alt: 'Ryan and Lindsay Dittes with their children in front of an RD’s Total Lawn trailer',
		brief: 'Ryan & Lindsay together, portrait 4:5',
		width: 720,
		height: 708,
		position: '62% 50%'
	} satisfies Img,
	caption: 'The Dittes family',
	facts: [
		{ value: '2018', label: 'Started as a side business' },
		{ value: '~10', label: 'People on the crew' },
		{ value: '5.0', label: 'Google rating' }
	]
};

/**
 * Crew photos and names from the team page on rdtotallawn.com. The photos are
 * RD's own name cards (name printed on the card), so names are only shown to
 * screen readers unless `showNames` is true.
 * PLACEHOLDER: roles weren't published. Add each person's role (or leave it out).
 */
export const crew = {
	eyebrow: 'The crew',
	headline: 'Meet the people who show up at your house.',
	body: "Ryan and Lindsay will be the first to tell you the crew is the heart of this company. They're the ones on your lawn every week, and the reason we've been able to grow.",
	image: {
		file: 'crew-trucks-banner.webp',
		alt: "The RD's Total Lawn crew lined up in front of the company trucks",
		brief: 'Whole crew together by the trucks, wide 16:9',
		width: 1600,
		height: 654,
		position: '50% 60%'
	} satisfies Img,
	rolesPlaceholder: true,
	showNames: false,
	members: [
		{ name: 'Analiza Diego', photo: 'team/analiza-diego.webp' },
		{ name: 'Christian Canete', photo: 'team/christian-canete.webp' },
		{ name: 'Christian Hidalgo', photo: 'team/christian-hidalgo.webp' },
		{ name: 'Donald Bell', photo: 'team/donal-bell.webp' }, // name card reads DONALD; the file name says Donal
		{ name: 'Drew Tomalin', photo: 'team/drew-tomalin.webp' },
		{ name: 'Eli Murphy', photo: 'team/eli-murphy.webp' },
		{ name: 'Joseph Neisser', photo: 'team/joseph-neisser.webp' },
		{ name: 'Joseph Ruiz', photo: 'team/joseph-ruiz.webp' },
		{ name: 'Matthew Behrle', photo: 'team/matthew-behrle.webp' },
		{ name: 'Michael Budetti', photo: 'team/michael-budetti.webp' },
		{ name: 'Stephen Grauel', photo: 'team/stephen-grauel.webp' },
		{ name: 'Tyler Stercula', photo: 'team/tyler-stercula.webp' }
	] as { name: string; photo: string; role?: string }[]
};

export const careersTeaser = {
	headline: 'Join the crew.',
	body: "We're a family business that treats its people like family. If you like working outside and doing a job right, we'd like to hear from you.",
	cta: 'See careers'
};

/**
 * PLACEHOLDER: paste real Google reviews and the owners' real replies,
 * word for word. Do not write or edit reviews.
 */
export type Review = {
	author: string;
	town: string;
	date: string;
	rating: number;
	text: string;
	reply?: string;
	placeholder?: boolean;
};

export const reviews: Review[] = [
	{
		author: 'Customer name',
		town: 'Town',
		date: 'Month 2026',
		rating: 5,
		text: 'Paste a real Google review here, word for word. This is the featured review, so choose one that mentions the crew, communication or showing up on time.',
		reply: "Paste Ryan & Lindsay's real reply to this review here.",
		placeholder: true
	},
	{
		author: 'Customer name',
		town: 'Town',
		date: 'Month 2026',
		rating: 5,
		text: 'Paste a second real Google review here.',
		reply: "Paste the owners' real reply here.",
		placeholder: true
	},
	{
		author: 'Customer name',
		town: 'Town',
		date: 'Month 2026',
		rating: 5,
		text: 'Paste a third real Google review here.',
		reply: "Paste the owners' real reply here.",
		placeholder: true
	}
];

/**
 * Levittown and Langhorne appear on rdtotallawn.com; the rest are other
 * Lower Bucks towns. PLACEHOLDER: confirm the exact list of towns served.
 */
export const serviceArea = {
	placeholder: true,
	towns: [
		'Levittown',
		'Langhorne',
		'Bristol',
		'Fairless Hills',
		'Penndel',
		'Hulmeville',
		'Croydon',
		'Bensalem',
		'Morrisville',
		'Yardley',
		'Tullytown',
		'Newtown'
	],
	image: {
		file: 'area-trucks-langhorne.webp',
		alt: "RD's Total Lawn trucks parked together in Langhorne, PA",
		brief: 'Trucks in a local town, wide',
		width: 1600,
		height: 666,
		position: '50% 55%'
	} satisfies Img
};

export type Faq = { q: string; a: string; placeholder?: boolean };

export const faqs: Faq[] = [
	{
		q: 'How do I get a price?',
		a: `Request a quote online or call ${business.phone}. We'll ask a few questions about your property and come back to you with a clear price before any work starts.`
	},
	{
		q: 'Which towns do you serve?',
		a: "We work across Lower Bucks County. If you don't see your town in the list, call and ask. We'll tell you straight."
	},
	{
		q: 'Are you licensed and insured?',
		a: 'Confirm licensing and insurance details with the owners and add the PA HIC number here.',
		placeholder: true
	},
	{
		q: 'Do I have to sign a long contract?',
		a: 'Confirm how agreements work (season-long, month-to-month, per visit) and describe it here.',
		placeholder: true
	},
	{
		q: 'What happens when it rains on my service day?',
		a: 'Confirm the rain-day policy with the owners and describe it here.',
		placeholder: true
	}
];

/** What happens after someone asks for a quote. Draft copy. */
export const nextSteps = [
	{ title: 'Tell us about your yard', body: 'About a minute online, or give us a call.' },
	{ title: 'Get your price', body: 'We come back to you with a clear, written quote.' },
	{ title: 'We show up when we said', body: "You'll know your service day before the crew arrives." }
];

/** PLACEHOLDER: licence and registration numbers for the footer. */
export const licenses = [
	{ label: 'PA Home Improvement Contractor', value: 'PA HIC #[number]', placeholder: true },
	{ label: 'Insurance', value: 'General liability, details to confirm', placeholder: true }
];

/** Careers page. PLACEHOLDER: roles, pay and requirements need to come from the owners. */
export const careers = {
	/** DRAFT: values copy is a starting point; confirm it reflects how Ryan & Lindsay run the crew. */
	valuesDraft: true,
	headline: 'Good work, good people, and a family name on the truck.',
	intro: "RD's Total Lawn grew from a side business into a crew of about ten because of the people on it. Ryan and Lindsay credit God and this team for every season since 2018, and they run the company to be a place people want to stay.",
	image: {
		file: 'careers-crew-thumbs-up.webp',
		alt: "The RD's Total Lawn crew giving a thumbs up in front of the trucks",
		brief: 'Crew together, landscape 3:2',
		width: 1225,
		height: 782,
		position: '50% 40%'
	} satisfies Img,
	values: [
		{ title: 'Answer for your work', body: 'Customers trust us because we do what we said. That starts with every person on the crew.' },
		{ title: 'Treat people well', body: 'Customers, neighbors and each other. The small-business warmth people notice comes from the crew.' },
		{ title: 'Grow with us', body: 'We started small and keep growing. People who show up and care get more responsibility.' }
	],
	roles: [
		{ title: 'Lawn care crew member', type: 'Full-time, seasonal', placeholder: true },
		{ title: 'Crew lead', type: 'Full-time', placeholder: true }
	]
};

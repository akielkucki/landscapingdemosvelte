import { fail } from '@sveltejs/kit';
import { readApplication } from '#lib/forms.ts';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request }) => {
		const { values, errors, spam } = readApplication(await request.formData());

		if (Object.keys(errors).length > 0) {
			return fail(400, { errors, values });
		}

		if (!spam) {
			// TODO: deliver to the business (email or hiring inbox). Until then applications are only logged.
			console.info('[job application]', values);
		}

		return { success: true, name: values.name.split(' ')[0] };
	}
} satisfies Actions;

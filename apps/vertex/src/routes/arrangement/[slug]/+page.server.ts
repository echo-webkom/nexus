import { axis } from '$lib/axis/client.server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { marked } from 'marked';

export const load: PageServerLoad = async ({ params }) => {
	const event = await axis.events.getBySlug(params.slug);

	if (!event) {
		error(404, 'Finner ikke arrangmentet');
	}

	return {
		event: {
			...event,
			body: await marked(event.body ?? '')
		}
	};
};

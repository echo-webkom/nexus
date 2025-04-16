import { axis } from '$lib/axis/client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const posts = await axis.content.posts.list();

	return {
		posts
	};
};

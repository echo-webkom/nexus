import { fetchShoppingListItems } from '$lib/axis/client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const items = await fetchShoppingListItems();

	return {
		items
	};
};

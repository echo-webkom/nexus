<script lang="ts">
	import { page } from '$app/state';
	import { urlFor } from '$lib/sanity/image';
	import { ExternalLink } from '@lucide/svelte';
	import type { PageData } from '../$types';
	import { format } from 'date-fns';
	import { nb } from 'date-fns/locale';
	import { capitalize } from '$lib/strings';
	import RegistrationButton from './registration-button.svelte';

	let data = $derived(page.data as PageData);

	let isRegistrationOpen = $derived.by(() => {
		if (!data.event.registrationStart || !data.event.registrationEnd) {
			return false;
		}

		const now = new Date();
		const start = new Date(data.event.registrationStart);
		const end = new Date(data.event.registrationEnd);
		return now >= start && now <= end;
	});
</script>

<aside class="md:w-[270px] md:border-r-2 pr-4 pb-4 border-b-2 md:border-b-0 md:pb-0 w-full">
	{#if data.event.company?.image}
		<a href={data.event.company.website} target="_blank" rel="noopener noreferrer">
			<div class="aspect-square w-full overflow-hidden mb-4">
				<img
					src={urlFor(data.event.company.image).url()}
					alt="Company logo"
					class="w-full h-full object-cover rounded-xl border-2"
				/>
			</div>
		</a>
	{/if}

	<ul class="flex flex-col gap-2">
		{#if data.event.company}
			<li class="flex flex-col">
				<p class="font-bold text-xs text-muted-foreground">Bedrift</p>
				<p class="text-sm">
					<a
						class="hover:underline"
						href={data.event.company.website}
						target="_blank"
						rel="noopener noreferrer"
					>
						{data.event.company.name}
						<ExternalLink class="inline ml-1 size-3" />
					</a>
				</p>
			</li>
		{/if}

		<li class="flex flex-col">
			<p class="font-bold text-xs text-muted-foreground">Klokkeslett</p>
			<p class="text-sm">
				{format(new Date(data.event.date), 'HH:mm')}
			</p>
		</li>

		<li class="flex flex-col">
			<p class="font-bold text-xs text-muted-foreground">Dato</p>
			<p class="text-sm">
				{format(new Date(data.event.date), 'dd.MM.yyyy')}
			</p>
		</li>

		{#if data.event.contacts}
			<li class="flex flex-col">
				<p class="font-bold text-xs text-muted-foreground">Kontaktpersoner</p>
				<ul class="flex flex-col text-sm">
					{#each data.event.contacts as contact}
						<li class="flex flex-col">
							<p>
								<a class="hover:underline" href="mailto:{contact.email}">
									{contact.profile.name}
									<ExternalLink class="inline ml-1 size-3" />
								</a>
							</p>
						</li>
					{/each}
				</ul>
			</li>
		{/if}

		{#if data.event.location}
			<li class="flex flex-col">
				<p class="font-bold text-xs text-muted-foreground">Sted</p>
				<p class="text-sm">
					{data.event.location?.name}
				</p>
			</li>
		{/if}

		{#if data.event.registrationStart}
			<li class="flex flex-col">
				<p class="font-bold text-xs text-muted-foreground">Påmelding åpner</p>
				<p class="text-sm">
					{capitalize(
						format(new Date(data.event.registrationStart), "EEEE dd. MMMM 'kl' HH:mm", {
							locale: nb
						})
					)}
				</p>
			</li>
		{/if}

		{#if data.event.registrationEnd}
			<li class="flex flex-col">
				<p class="font-bold text-xs text-muted-foreground">Påmelding stenger</p>
				<p class="text-sm">
					{capitalize(
						format(new Date(data.event.registrationEnd), "EEEE dd. MMMM 'kl' HH:mm", {
							locale: nb
						})
					)}
				</p>
			</li>
		{/if}

		{#if data.event.externalLink}
			<li class="flex flex-col">
				<p class="font-bold text-xs text-muted-foreground">Ekstern lenke</p>
				<p>
					<a class="hover:underline" href={data.event.externalLink}>
						{data.event.externalLink}
						<ExternalLink class="inline ml-1 size-3" />
					</a>
				</p>
			</li>
		{/if}

		{#if data.event.cost && data.event.cost !== 0}
			<li class="flex flex-col">
				<p class="font-bold text-xs text-muted-foreground">Egenandel</p>
				<p class="text-sm">
					{data.event.cost} kr
				</p>
			</li>
		{/if}

		{#if data.event.registrationStartGroups}
			<li class="flex flex-col">
				<p class="font-bold text-sm text-muted-foreground">Påmelding for grupper åpner</p>
				<p class="text-sm">
					{capitalize(
						format(new Date(data.event.registrationStartGroups), "EEEE dd. MMMM 'kl' HH:mm", {
							locale: nb
						})
					)}
				</p>
			</li>
		{/if}

		{#if data.event.endDate}
			<li class="flex flex-col">
				<p class="font-bold text-xs text-muted-foreground">Sluttdato</p>
				<p class="text-sm">
					{format(new Date(data.event.endDate), 'EEE dd. MMMM', {
						locale: nb
					})}
				</p>
			</li>
		{/if}

		{#if isRegistrationOpen}
			<li>
				<RegistrationButton />
			</li>
		{/if}
	</ul>
</aside>

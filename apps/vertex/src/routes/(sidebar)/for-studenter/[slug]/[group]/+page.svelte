<script lang="ts">
	import Heading from '$lib/components/ui/heading.svelte';
	import Markdown from '$lib/components/ui/markdown.svelte';
	import { initials } from '$lib/strings.js';
	import { urlFor } from '$lib/sanity/image';
	import { GROUP_TYPES } from '@echo-webkom/lib';
	import { Send, Facebook, Instagram, Linkedin } from '@lucide/svelte';

	let { data } = $props();

	let socials = [
		{
			name: 'E-post',
			url: data.group.socials?.email,
			icon: Send
		},
		{
			name: 'Facebook',
			url: data.group.socials?.facebook,
			icon: Facebook
		},
		{
			name: 'Instagram',
			url: data.group.socials?.instagram,
			icon: Instagram
		},
		{
			name: 'LinkedIn',
			url: data.group.socials?.linkedin,
			icon: Linkedin
		}
	];

	let hasSocials = socials.some((social) => social.url);
	let type = $derived(GROUP_TYPES.find((type) => type.value === data.group.groupType)?.title);
</script>

<div class="max-w-4xl flex-col gap-8 py-0">
	<div>
		<p>{type}</p>
		<Heading>
			{data.group.name}
		</Heading>
	</div>

	{#if hasSocials}
		<section class="mb-8 flex items-center gap-4">
			{#each socials as social}
				{@const Icon = social.icon}
				{#if social.url}
					<a
						href={social.url}
						target="_blank"
						rel="noopener noreferrer"
						class="hover:bg-muted flex items-center gap-2 rounded-lg border-2 p-2 text-slate-700 dark:text-slate-200"
					>
						<Icon class="h-5 w-5" />
						<span>{social.name}</span>
					</a>
				{/if}
			{/each}
		</section>
	{/if}

	{#if data.group.description}
		<section>
			<Markdown markdown={data.group.description} />
		</section>
	{/if}

	{#if data.group.image}
		<div class="mx-auto mb-8 w-fit">
			<img alt={data.group.name} class="rounded-lg border-2" src={urlFor(data.group.image).url()} />
		</div>
	{/if}

	{#if data.group.members}
		<section>
			<h2 id="medlemmer" class="group mb-4 flex items-center text-2xl font-semibold tracking-tight">
				Medlemmer
			</h2>

			<ul class="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
				{#each data.group.members as member}
					<li class="flex flex-col gap-2 p-5 text-center">
						<span
							class="relative mx-auto flex h-24 w-24 shrink-0 overflow-hidden rounded-full border-2"
						>
							{#if member.profile?.picture}
								<img
									class="aspect-square h-full w-full object-cover"
									alt={member.profile?.name}
									src={urlFor(member.profile?.picture).url()}
								/>
							{:else}
								<p class="mx-auto my-auto text-2xl">
									{initials(member.profile?.name ?? 'Ola Nordmann')}
								</p>
							{/if}
						</span>

						<p class="text-lg font-medium">{member.profile?.name}</p>

						<p>{member.role}</p>
					</li>
				{/each}
			</ul>
		</section>
	{/if}
</div>

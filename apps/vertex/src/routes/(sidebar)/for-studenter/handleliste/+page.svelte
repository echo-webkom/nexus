<script lang="ts">
	import { enhance } from '$app/forms';
	import { cn } from '$lib/cn';
	import Button from '$lib/components/ui/button.svelte';
	import Input from '$lib/components/ui/form/input.svelte';
	import Label from '$lib/components/ui/form/label.svelte';
	import Heading from '$lib/components/ui/heading.svelte';
	import { getAuth } from '$lib/context/auth';
	import { Heart } from '@lucide/svelte';

	let { data } = $props();

	let items = $derived(data.items.toSorted((a, b) => b.likes.length - a.likes.length));

	let auth = getAuth();
</script>

<Heading>Hyggkoms handleliste</Heading>

{#if items.length > 0}
	<ul class="rounded-2xl border overflow-hidden">
		{#each items as item}
			{@const hasLiked = auth.user?.id && item.likes.includes(auth.user.id)}
			<li class="flex items-center justify-between py-4 px-6 odd:bg-muted">
				<p>
					{item.name}
				</p>

				<div class="flex items-center gap-3">
					<span class="text-muted-foreground">{item.likes.length}</span>
					<form class="flex items-center" action="?/like" method="post" use:enhance>
						<input type="hidden" name="id" value={item.id} />
						<button class="cursor-pointer group">
							<Heart
								class={cn(
									'text-muted-foreground size-5 group-hover:text-red-600 group-hover:fill-red-300 transition-all active:scale-95',
									{
										'text-red-500 fill-red-500': hasLiked
									}
								)}
							/>
						</button>
					</form>
				</div>
			</li>
		{/each}
	</ul>
{:else}
	<p>Handlelisten er tom.</p>
{/if}

{#if auth.user}
	<hr class="my-6" />

	<Heading size="sm" class="mt-4">Legg til i handlelisten</Heading>

	<form method="post" class="flex flex-col gap-4 max-w-md" action="?/add" use:enhance>
		<Label class="text-xl" for="name">Hva ønsker du?</Label>
		<Input name="name" placeholder="Ditt forslag her..." required />

		<Button class="md:w-fit" type="submit">Legg til</Button>
	</form>
{/if}

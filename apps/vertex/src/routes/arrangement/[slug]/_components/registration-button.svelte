<script lang="ts">
	import type { PageData } from '../$types';
	import { page } from '$app/state';
	import Button from '$lib/components/ui/button.svelte';
	import Dialog from '$lib/components/ui/dialog/dialog.svelte';
	import Label from '$lib/components/ui/form/label.svelte';
	import Input from '$lib/components/ui/form/input.svelte';
	import DialogContent from '$lib/components/ui/dialog/dialog-content.svelte';
	import DialogTitle from '$lib/components/ui/dialog/dialog-title.svelte';
	import DialogDescription from '$lib/components/ui/dialog/dialog-description.svelte';
	import DialogSeperator from '$lib/components/ui/dialog/dialog-seperator.svelte';
	import DialogFooter from '$lib/components/ui/dialog/dialog-footer.svelte';

	let data = $derived(page.data as PageData);
	let isOpen = $state(false);

	const open = () => (isOpen = true);
	const close = () => (isOpen = false);

	const handleRegistration = () => {};
</script>

{#if data.event.additionalQuestions}
	<Button onclick={open} variant="secondary" class="w-full">Fyll ut spørsmål</Button>
{:else}
	<Button onclick={handleRegistration} variant="secondary" class="w-full">Meld deg på</Button>
{/if}

<Dialog bind:open={isOpen}>
	<DialogContent>
		<DialogTitle>Fyll ut spørsmålene</DialogTitle>
		<DialogSeperator />
		<DialogDescription>
			Fyll ut de nødvendige feltene for å registrere deg til arrangementet.
		</DialogDescription>
		<form action="?/register" class="flex flex-col gap-2 mt-4" method="post">
			{#each data.event.additionalQuestions ?? [] as question}
				{#if question.type === 'text'}
					<div class="flex flex-col gap-1">
						<Label class="text-sm" for={question.title}>
							{question.title}
						</Label>
						<Input
							type="text"
							placeholder="Fyll her..."
							id={question.title}
							name={question.title}
						/>
					</div>
				{/if}

				{#if question.type === 'textarea'}
					<div class="flex flex-col gap-1">
						<Label class="text-sm" for={question.title}>
							{question.title}
						</Label>
						<textarea
							id={question.title}
							name={question.title}
							rows="4"
							class="border border-gray-300 rounded-md p-2"
							placeholder="Fyll her..."
						></textarea>
					</div>
				{/if}

				{#if question.type === 'checkbox'}
					<div class="flex flex-col gap-1">
						<Label class="text-sm" for={question.title}>
							{question.title}
						</Label>
						{#each question.options ?? [] as option}
							<div class="flex items-center gap-2">
								<input type="checkbox" id={option} name={question.title} value={option} />
								<label for={option}>{option}</label>
							</div>
						{/each}
					</div>
				{/if}

				{#if question.type === 'radio'}
					<div class="flex flex-col gap-1">
						<Label class="text-sm" for={question.title}>
							{question.title}
						</Label>
						{#each question.options ?? [] as option}
							<div class="flex items-center gap-2">
								<input type="radio" id={option} name={question.title} value={option} />
								<label for={option}>{option}</label>
							</div>
						{/each}
					</div>
				{/if}
			{/each}
		</form>
		<DialogFooter>
			<Button type="submit" form="registration-form" variant="secondary" class="w-full">
				Registrer deg
			</Button>
			<Button variant="danger" onclick={close} class="w-full">Lukk</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>

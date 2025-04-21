<script lang="ts">
	import { cn } from '$lib/cn';
	import { Dialog } from 'bits-ui';
	import { X } from '@lucide/svelte';

	type Props = Dialog.ContentProps & {
		noClose?: boolean;
	};

	let { children, class: className, noClose, ...props }: Props = $props();
</script>

<Dialog.Content
	class={cn(
		'rounded-2xl bg-background shadow-popover data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 outline-hidden fixed left-[50%] top-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] border-2 p-5 sm:max-w-[490px] md:w-full',
		className
	)}
	{...props}
>
	{#if !noClose}
		<Dialog.Close
			class="absolute top-4 right-4 rounded-sm p-1 text-muted-foreground transition-colors hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 data-[state=open]:bg-muted/50"
		>
			<span class="sr-only">Lukk</span>
			<X class="size-4" />
		</Dialog.Close>
	{/if}

	{@render children?.()}
</Dialog.Content>

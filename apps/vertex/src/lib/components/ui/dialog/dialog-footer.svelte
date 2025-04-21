<script lang="ts">
	import { cn } from '$lib/cn';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLDivElement>;

	let { children, class: className, ...props }: Props = $props();
</script>

<div class={cn('flex w-full mt-4 justify-end gap-2', className)} {...props}>
	{@render children?.()}
</div>

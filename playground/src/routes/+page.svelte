<script lang="ts">
    import '../app.css'
    import { createFloating } from 'floating-svelte'
    import styleToCss from 'style-object-to-css-string'

    const floating = createFloating({
        placement: 'right'
    })

    const floatingStyles = $derived(styleToCss(floating.floatingStyles))
</script>

<main class="max-w-md mx-auto">
    <button bind:this={floating.reference} class="p-2 bg-amber-300 rounded w-20">ref</button>
    <div bind:this={floating.floating} class="border p-2 rounded w-32" style={floatingStyles}>Today is a nice day.</div>
</main>


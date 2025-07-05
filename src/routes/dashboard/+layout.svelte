<script>
    import Sidebar from "$lib/components/Sidebar.svelte";
    let { children } = $props();
</script>

<div class="flex">
    <Sidebar />
    <main class="flex-1 p-6">
   {@render children()}    </main>
</div>
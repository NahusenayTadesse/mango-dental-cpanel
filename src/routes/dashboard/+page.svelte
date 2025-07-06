<script>
import { authClient } from "$lib/auth-client";
	import { submitButton } from "$lib/global.svelte";

const session = authClient.useSession();
let {data} = $props();


</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
    <div class="w-[350px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div class="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">Welcome {data.user.name.split(' ')[0]} to your Dashboard</h2>
        </div>
        <div class="flex items-center gap-4 mb-6">
            {#if $session.data?.user.image}
                <img
                    src="{$session.data.user.image}"
                    alt="User Avatar"
                    class="w-14 h-14 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 shadow"
                />
            {:else}
                <div class="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xl font-bold text-white border-2 border-gray-300 dark:border-gray-600 shadow">
                    {$session.data?.user.name[0]}
                </div>
            {/if}
            <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    {$session.data?.user.name}
                </h3>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                    {$session.data?.user.email}
                </p>
            </div>
        </div>
        <div class="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
            <button
                class={submitButton}
                onclick={() => {
                    authClient.signOut({
                        fetchOptions: {
                            body: {
                                callbackURL: "/",
                            },
                        },
                    });
                }}
            >
                Sign Out
            </button>
        </div>
    </div>
</div>
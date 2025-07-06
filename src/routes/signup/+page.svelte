<script lang="ts">
import { signUp } from "$lib/auth-client";
import { writable } from "svelte/store";
import { input, label, submitButton } from "$lib/global.svelte";

// Create writable stores for form fields
const firstName = writable("");
const lastName = writable("");
const email = writable("");
const password = writable("");

// Function to handle form submission
const handleSignUp = async () => {
	const user = {
		firstName: $firstName,
		lastName: $lastName,
		email: $email,
		password: $password, 
	};
	await signUp.email({
		email: user.email,
		password: user.password,
		name: `${user.firstName} ${user.lastName}`,
		callbackURL: "/dashboard", 
		fetchOptions: {
			onError(context) {
				alert(context.error.message);
			},
		},
	});
};
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">Create Your Account</h1>
        <div class="grid gap-5">
            <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-1">
                    <label for="first-name" class={label}>First name</label>
                    <input
                        id="first-name"
                        placeholder="Max"
                        required
                        bind:value={$firstName}
                        class="input input-bordered rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                    />
                </div>
                <div class="flex flex-col gap-1">
                    <label for="last-name" class={label}>Last name</label>
                    <input
                        id="last-name"
                        placeholder="Robinson"
                        required
                        bind:value={$lastName}
                        class="input input-bordered rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                    />
                </div>
            </div>
            <div class="flex flex-col gap-1">
                <label for="email" class={label}>Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    required
                    bind:value={$email}
                    class={input}
                />
            </div>
            <div class="flex flex-col gap-1">
                <label for="password" class={label}>Password</label>
                <input
                    id="password"
                    type="password"
                    bind:value={$password}
                    class={input}
                />
            </div>
            <button
                type="button"
                class={submitButton}
                onclick={handleSignUp}
            >
                Create an account
            </button>
           
        </div>
        <div class="mt-6 text-center text-sm text-gray-600">
            Already have an account?
            <a href="/login" class="text-primary-600 hover:underline font-medium">Sign in</a>
        </div>
    </div>
</div>

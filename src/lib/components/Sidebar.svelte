<script>
    let pageList = [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Patients", href: "/dashboard/patients" },
        { name: "Appointments", href: "/dashboard/appointments" },
        { name: "Invoices", href: "/dashboard/invoices" },
        { name: "Prescriptions", href: "/dashboard/prescriptions" },
        { name: "Treatments", href: "/dashboard/treatments" },
        { name: "Users", href: "/dashboard/users" }
    ];
</script>

<aside class="h-screen w-96 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col gap-16">
    <div class="flex items-center justify-center h-20 border-b border-gray-200 dark:border-gray-800 gap-16">
        <span class="text-2xl font-bold text-gray-800 dark:text-white tracking-wide m-4">Mango Dental</span>
    </div>
    <nav class="flex-1 px-4 py-6">
        <ul class="space-y-2">
            {#each pageList as page}
                <li>
                    <a
                        href={page.href}
                        class="flex items-center px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium"
                    >
                        {page.name}
                    </a>
                </li>
            {/each}
        </ul>
    </nav>
    <div class="p-4 border-t border-gray-200 dark:border-gray-800">
        <button class="w-full flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
            Logout
        </button>
    </div>
</aside>
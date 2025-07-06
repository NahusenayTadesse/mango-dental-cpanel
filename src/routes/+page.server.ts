import { auth } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { user } from "$lib/server/db/schema";

export const load: LayoutServerLoad = async ({ request }) => {
   const session = await auth.api.getSession({ headers: request.headers });

if (!session) {
    return redirect(302, "/login");
}

const users = await db.select().from(user);
   if (users.length === 0 ) {
        return redirect(302, "/signup");
    }

return {
    user: session?.user,
}}
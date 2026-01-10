import SignupView from "@/app/modules/auth/ui/views/signup-view";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!!session) {
    redirect("/");
  }
  return (
    <main className="min-h-screen flex items-center justify-center bg-muted p-4">
      <SignupView />
    </main>
  );
}

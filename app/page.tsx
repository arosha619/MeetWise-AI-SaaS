
import HomeView from "./modules/auth/home/ui/views/home-view";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
});

  if (!session) {
    redirect("/auth/sign-in");
  }

  return <HomeView />;
};

export default Page;

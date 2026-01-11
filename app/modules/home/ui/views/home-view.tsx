"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function HomeView() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  if (!session) {
    return <p>Loading...</p>;
  }
  return (
    <>
      Home page
      <p>Logged in as :{session?.user.name}</p>
      <div className="">
        <button
          onClick={async () => {
            try {
              authClient.signOut();
            } catch (err) {
              console.log("Error signing out:", err);
            } finally {
              router.push("/auth/sign-in");
            }
          }}
        >
          {" "}
          sign Out
        </button>
      </div>
    </>
  );
}

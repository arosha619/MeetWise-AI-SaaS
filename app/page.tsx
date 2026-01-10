"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/auth/sign-in");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (!session) {
    return null;
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

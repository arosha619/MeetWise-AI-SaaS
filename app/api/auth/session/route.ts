import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return Response.json({ session });
  } catch (error) {
    console.error("Session error:", error);
    return Response.json({ session: null }, { status: 401 });
  }
}

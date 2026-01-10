"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import z, { set } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlertIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SigninView() {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const [pending, setPending] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);

    authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          setPending(false);
          router.push("/");
        },
        onError: (error) => {
          setError(error.error.message || "An unexpected error occurred");
          setPending(false);
        },
      }
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-white flex flex-col md:flex-row">
      <div className="md:w-1/2 w-full p-6 md:p-12">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <div className="relative h-8 w-32">
              <Image
                src="/logo-color.svg"
                alt="MeetWise Logo"
                fill
                className="object-contain object-left"
              />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold">
            Log in to your Account
          </h1>{" "}
          <p className="mt-4 text-sm text-muted-foreground">
            Welcome back! Select method to log in:
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              disabled={pending}
              onClick={async () => {
                setPending(true);
                try {
                  await authClient.signIn.social({
                    provider: "google",
					callbackURL:"/"
                  });
                } catch (error) {
                  setError(
                    error instanceof Error ? error.message : "Login failed"
                  );
                  setPending(false);
                }
              }}
              variant="ghost"
              className="w-full justify-center gap-2 bg-white/90 text-slate-800 border border-slate-200 shadow-sm"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
            <Button
              disabled={pending}
              onClick={async () => {
                setPending(true);
                try {
                  await authClient.signIn.social({
                    provider: "github",
					callbackURL:"/"
                  });

                } catch (err) {
                 const errorMessage = err instanceof Error ? err.message : "GitHub login failed";
                  setError(errorMessage);
                  setPending(false);
                }
              }}
              variant="ghost"
              className="w-full justify-center gap-2 bg-white/90 text-slate-800 border border-slate-200 shadow-sm"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </Button>
          </div>
          <div className="my-6 flex items-center gap-3">
            <span className="flex-1 h-px bg-slate-200" />
            <span className="text-sm text-muted-foreground">
              or continue with email
            </span>
            <span className="flex-1 h-px bg-slate-200" />
          </div>
          {/* server errors */}
          {!!error && (
            <Alert variant="destructive" className="mb-4">
              <OctagonAlertIcon className="h-4 w-4 mr-2" />
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="meetwise@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="text-xs text-primary underline"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between text-sm">
                <label className="inline-flex items-center gap-2">
                  <Checkbox />
                  <span className="text-sm">Remember me</span>
                </label>
                <Link href="#" className="text-primary underline">
                  Forgot Password?
                </Link>
              </div>

              <div>
                <Button
                  disabled={pending}
                  type="submit"
                  className="w-full bg-linear-to-r from-indigo-600 to-sky-500 text-white shadow-xl"
                >
                  Log in
                </Button>
              </div>
            </form>
          </Form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/auth/sign-up" className="text-primary underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      <div className="md:w-1/2 w-full hidden md:flex items-stretch">
        <div className="flex-1 relative bg-linear-to-br from-cyan-400 via-blue-500 to-purple-600 p-8 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="relative w-56 h-56 md:w-80 md:h-80 opacity-100">
              <Image
                src="/logo.svg"
                alt="Logo background"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="max-w-xs md:max-w-sm text-center relative z-0">
            <div className="relative w-56 h-56 mx-auto z-20"></div>

            <h2 className="mt-6 text-lg md:text-xl font-semibold text-white">
              Connect with every application.
            </h2>
            <p className="mt-2 text-sm md:text-base text-white/90 max-w-xs mx-auto">
              Everything you need in an easily customizable dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

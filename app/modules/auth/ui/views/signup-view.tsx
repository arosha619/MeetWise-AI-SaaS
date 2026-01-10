"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import * as React from "react"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { OctagonAlertIcon } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { authClient } from "@/lib/auth-client"

const formSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().min(1, "Email is required").email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
	confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
	terms: z.boolean().refine((val) => val === true, {
		message: "You must agree to the terms and privacy policy",
	}),
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords don't match",
	path: ["confirmPassword"],
})

export default function SignupView() {
	const router = useRouter()
	const [error, setError] = React.useState<string | null>(null)
	const [showPassword, setShowPassword] = React.useState(false)
	const [showConfirm, setShowConfirm] = React.useState(false)
	const [pending, setPending] = React.useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
			terms: false,
		},
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setError(null)
		setPending(true)

		await authClient.signUp.email(
			{
				email: values.email,
				password: values.password,
				name: values.name,
			},
			{
				onSuccess: () => {
					router.push("/")
				},
				onError: (err) => {
					setError(err.error?.message || "An unexpected error occurred")
					setPending(false)
				},
			}
		)
	}

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
					<h1 className="text-2xl md:text-3xl font-semibold">Create your account</h1>
					<p className="mt-4 text-sm text-muted-foreground">Start your free account — join MeetWise to organize meetings faster.</p>

					{!!error && (
						<Alert variant="destructive" className="mb-4 mt-4">
							<OctagonAlertIcon className="h-4 w-4 mr-2" />
							<AlertTitle>{error}</AlertTitle>
						</Alert>
					)}

					<Form {...form}>
						<form className="mt-6 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Full name</FormLabel>
										<FormControl>
											<Input placeholder="Jane Doe" type="text" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="you@company.com" type="email" {...field} />
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
												placeholder="Create a password"
												type={showPassword ? "text" : "password"}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center justify-between">
											<FormLabel>Confirm password</FormLabel>
											<button
												type="button"
												onClick={() => setShowConfirm((s) => !s)}
												className="text-xs text-primary underline"
											>
												{showConfirm ? "Hide" : "Show"}
											</button>
										</div>
										<FormControl>
											<Input
												placeholder="Repeat password"
												type={showConfirm ? "text" : "password"}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="terms"
								render={({ field }) => (
									<FormItem className="flex items-center gap-2">
										<FormControl>
											<Checkbox checked={field.value} onCheckedChange={field.onChange} />
										</FormControl>
										<label className="text-sm">
											I agree to the{" "}
											<Link href="#" className="underline text-primary">
												Terms
											</Link>{" "}
											and{" "}
											<Link href="#" className="underline text-primary">
												Privacy Policy
											</Link>
										</label>
									</FormItem>
								)}
							/>

							<div>
								<Button disabled={pending} className="w-full bg-linear-to-r from-indigo-600 to-sky-500 text-white shadow-xl">
									{pending ? "Creating account..." : "Create account"}
								</Button>
							</div>
						</form>
					</Form>

					<p className="mt-6 text-center text-sm text-muted-foreground">
						Already have an account? <Link href="/auth/sign-in" className="text-primary underline">Sign in</Link>
					</p>
				</div>
			</div>

			<div className="md:w-1/2 w-full hidden md:flex items-stretch">
				<div className="flex-1 relative bg-linear-to-br from-cyan-400 via-blue-500 to-purple-600 p-6 md:p-8 flex items-center justify-center overflow-hidden">
					<div className="absolute inset-0 flex items-center justify-center z-0">
						<div className="relative w-56 h-56 md:w-80 md:h-80 opacity-100">
							<Image
								src="/logo.svg"
								alt="Logo background"
								fill
								className="object-contain"
							/>
						</div>
					</div>
					<div className="max-w-xs md:max-w-sm text-center relative z-20">
						<div className="relative w-44 h-44 md:w-72 md:h-72 mx-auto z-20">
						</div>

						<h2 className="mt-6 text-lg md:text-xl font-semibold text-white">Organize smarter meetings</h2>
						<p className="mt-2 text-sm md:text-base text-white/90 max-w-xs mx-auto">Collaborate, schedule, and run meetings with ease — built for teams.</p>
					</div>
				</div>
			</div>
		</div>
	)
}


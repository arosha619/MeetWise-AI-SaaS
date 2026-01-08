"use client"

import Image from "next/image"
import Link from "next/link"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignupView() {
	const [showPassword, setShowPassword] = React.useState(false)
	const [showConfirm, setShowConfirm] = React.useState(false)

	return (
		<div className="w-full px-4">
			<div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-white flex flex-col md:flex-row">
				<div className="md:w-1/2 w-full p-6 md:p-12">
					<div className="max-w-lg mx-auto">
					<div className="flex items-center gap-3">
						<div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-600 to-sky-400 flex items-center justify-center shadow-md"> 
							<span className="text-white font-bold">MW</span>
						</div>
						<h1 className="text-2xl md:text-3xl font-semibold">Create your account</h1>
					</div>

					<p className="mt-3 text-sm text-muted-foreground">Start your free account — join MeetWise to organize meetings faster.</p>

					<form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
						<div>
							<Label className="block text-sm mb-1">Full name</Label>
							<Input placeholder="Jane Doe" type="text" />
						</div>

						<div>
							<Label className="block text-sm mb-1">Email</Label>
							<Input placeholder="you@company.com" type="email" />
						</div>

						<div>
							<div className="flex items-center justify-between">
								<Label className="text-sm mb-1">Password</Label>
								<button
									type="button"
									onClick={() => setShowPassword((s) => !s)}
									className="text-xs text-primary underline"
								>
									{showPassword ? "Hide" : "Show"}
								</button>
							</div>
							<Input placeholder="Create a password" type={showPassword ? "text" : "password"} />
						</div>

						<div>
							<div className="flex items-center justify-between">
								<Label className="text-sm mb-1">Confirm password</Label>
								<button
									type="button"
									onClick={() => setShowConfirm((s) => !s)}
									className="text-xs text-primary underline"
								>
									{showConfirm ? "Hide" : "Show"}
								</button>
							</div>
							<Input placeholder="Repeat password" type={showConfirm ? "text" : "password"} />
						</div>

						<div className="flex items-center gap-2">
							<Checkbox />
							<Label className="text-sm">I agree to the <Link href="#" className="underline text-primary">Terms</Link> and <Link href="#" className="underline text-primary">Privacy Policy</Link></Label>
						</div>

						<div>
							<Button className="w-full bg-gradient-to-r from-indigo-600 to-sky-500 text-white shadow-xl">Create account</Button>
						</div>
					</form>

					<p className="mt-6 text-center text-sm text-muted-foreground">
						Already have an account? <Link href="/auth/sign-in" className="text-primary underline">Sign in</Link>
					</p>
				</div>
			</div>

				<div className="md:w-1/2 w-full hidden md:flex items-stretch">
					<div className="flex-1 relative bg-gradient-to-br from-indigo-600 via-blue-600 to-sky-500 p-6 md:p-8 flex items-center justify-center">
						<div className="max-w-xs md:max-w-sm text-center">
							<div className="relative w-44 h-44 md:w-72 md:h-72 mx-auto">
								<Image
									src="/auth-illustration.svg"
									alt="Illustration"
									fill
									sizes="(min-width: 768px) 40vw, 100vw"
									className="object-contain"
								/>
							</div>

							<h2 className="mt-6 text-lg md:text-xl font-semibold text-white">Organize smarter meetings</h2>
							<p className="mt-2 text-sm md:text-base text-white/90 max-w-xs mx-auto">Collaborate, schedule, and run meetings with ease — built for teams.</p>
						</div>
						</div>
					</div>
				</div>
                </div>
			)
}


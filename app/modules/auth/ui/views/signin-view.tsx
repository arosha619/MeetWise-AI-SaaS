"use client"

import Image from "next/image"
import Link from "next/link"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function SigninView() {
	const [showPassword, setShowPassword] = React.useState(false)

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
          <h1 className="text-2xl md:text-3xl font-semibold">Log in to your Account</h1>					<p className="mt-4 text-sm text-muted-foreground">Welcome back! Select method to log in:</p>

					<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
						<Button variant="ghost" className="w-full justify-center gap-2 bg-white/90 text-slate-800 border border-slate-200 shadow-sm">
							<svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M44.5 20H24v8.5h11.9C34.3 33 30 36 24 36c-7.7 0-14-6.3-14-14s6.3-14 14-14c3.8 0 7.2 1.5 9.6 4l6.8-6.8C35.7 2.6 30.1 0 24 0 10.7 0 0 10.7 0 24s10.7 24 24 24c12.3 0 22.4-9.8 23.9-22.2.1-.8.1-1.6.1-1.8 0-.6-.1-1.2-.5-1.8z" fill="#4285F4"/>
							</svg>
							Google
						</Button>
						<Button variant="ghost" className="w-full justify-center gap-2 bg-white/90 text-slate-800 border border-slate-200 shadow-sm">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 4.9 3.5 8.9 8 9.8v-6.9H7.8V12H10V9.6c0-2.2 1.3-3.4 3.2-3.4.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.3V12h2.2l-.4 2.9H13.7v6.9c4.5-.9 8-4.9 8-9.8z" fill="#1877F2"/>
							</svg>
							Facebook
						</Button>
					</div>

					<div className="my-6 flex items-center gap-3">
						<span className="flex-1 h-px bg-slate-200" />
						<span className="text-sm text-muted-foreground">or continue with email</span>
						<span className="flex-1 h-px bg-slate-200" />
					</div>

					<form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
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
							<div className="relative">
								<Input placeholder="••••••••" type={showPassword ? "text" : "password"} />
							</div>
						</div>

						<div className="flex items-center justify-between text-sm">
							<label className="inline-flex items-center gap-2">
								<Checkbox />
								<span className="text-sm">Remember me</span>
							</label>
							<Link href="#" className="text-primary underline">Forgot Password?</Link>
						</div>

						<div>
							<Button className="w-full bg-gradient-to-r from-indigo-600 to-sky-500 text-white shadow-xl">Log in</Button>
						</div>
					</form>

					<p className="mt-6 text-center text-sm text-muted-foreground">
						Don't have an account? <Link href="/auth/sign-up" className="text-primary underline">Create an account</Link>
					</p>
				</div>
			</div>

			<div className="md:w-1/2 w-full hidden md:flex items-stretch">
				<div className="flex-1 relative bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-8 flex items-center justify-center overflow-hidden">
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
						<div className="relative w-56 h-56 mx-auto z-20">
							{/* <Image
								src="/sign-in-illustration.svg"
								alt="Sign in illustration"
								fill
								sizes="(min-width: 768px) 40vw, 100vw"
								className="object-contain"
							/> */}
						</div>

						<h2 className="mt-6 text-lg md:text-xl font-semibold text-white">Connect with every application.</h2>
						<p className="mt-2 text-sm md:text-base text-white/90 max-w-xs mx-auto">Everything you need in an easily customizable dashboard.</p>
					</div>
				</div>
			</div>
		</div>
	)
}

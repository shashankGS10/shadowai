"use client";
import { z } from "zod";
import React,{useState} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import FormField from "./FormField";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { supabase } from "@/shadowai/lib/supabase";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  
  // const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  // const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);
    signIn("google", { callbackUrl: "/dashboard" });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-in") {
        // Sign in with Supabase
        const { error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });
  
        if (error) {
          console.error("Sign-in error:", error.message);
          // You can show toast or form error here
          return;
        }
        window.location.href = "/dashboard";
      } else {
        // Sign up with Supabase
        const { data, error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: {
            data: { name: values.name },
          },
        });
  
        if (error) {
          console.error("Sign-up error:", error.message);
          // Show error to user
          return;
        }
  
        // After sign-up, auto sign-in
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });
  
        if (signInError) {
          console.error("Auto sign-in error:", signInError.message);
          return;
        }
  
        // Redirect after sign-in
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  }

  const isSignIn = type === "sign-in";
  return (
    <div className="card-border transition-all duration-300">
      <div className="flex flex-col gap-6 card-background rounded-xl min-h-full py-14 px-10 transition-colors duration-300">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="PrepWise logo" height={32} width={38} />
          <h2 className="text-primary text-3xl font-semibold transition-colors duration-300">
            ShadowAi
          </h2>
        </div>
        <h3 className="text-2xl font-semibold text-center">
          Shadow Interviews with AI
        </h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full form"
            aria-label="Sign in form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
                type="text"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
            {/* Google Auth Button */}
            {/* <div className="mt-4">
              <Button
  type="button"
  onClick={handleGoogleSignIn}
  className="btn w-full bg-white text-black border border-gray-300 hover:bg-gray-100"
  disabled={isGoogleLoading}
>
  <Image
    src="/google-icon.svg"
    alt="Google"
    width={20}
    height={20}
    className="mr-2"
  />
  {isSignIn ? "Sign in with Google" : "Sign up with Google"}
</Button>
            </div> */}
            <Button className="btn" type="submit">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;

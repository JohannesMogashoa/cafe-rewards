import AuthPageTabs from '@/components/application/AuthPageTabs'
import React from 'react'
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const IndexPage = ({
  searchParams,
}: {
  searchParams: { message: string };
}) => {
    const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/protected");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <main className='flex flex-col justify-center h-screen'>
        <header className='mb-10'>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Welcome to Rewaaards</h1>
        </header>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
        <AuthPageTabs signIn={signIn} signUp={signUp} />
    </main>
  )
}

export default IndexPage
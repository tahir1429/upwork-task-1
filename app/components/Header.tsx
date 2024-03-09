import { OrganizationSwitcher, SignedIn, UserButton, SignInButton, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center h-20 gap-4 px-4 border-b border-black border-solid sm:px-8 border-opacity-20 bg-white">
      <Link href="/" className="flex items-center h-20 gap-2 sm:gap-4">
        {/* <Image
          src="/vercel.svg"
          alt="Clerk Logo"
          width={102}
          height={32}
          priority
        /> */}
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={90}
          height={18}
          priority
        />
      </Link>
      <div className="grow" />
      <SignedIn>
        <Link href={"/dashboard"} className="text-black me-5">Dashboard</Link>
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              userButtonTrigger: {
                "&:focus": {
                  boxShadow: "#7857FF 0px 0px 0px 3px",
                },
              },
            },
          }}
        />
      </SignedIn>

      
      <SignedOut>
        <Link className="button" href="/sign-in">Sign In</Link>
        {/* <SignInButton mode='modal' afterSignInUrl="/dashboard">
            <button className="bg-black p-2 rounded">Sign in with Clerk</button>
        </SignInButton> */}
      </SignedOut>
    </header>
  );
}
import Image from "next/image";
import Link from "next/link";
// import componentsImg from "@/assets/components.svg";

export default function Main() {
  return (
    <main className="grow">
      <article className="grid lg:grid-cols-2">
        <div className="px-8 py-20 md:px-20 lg:py-48">
          <h1 className="text-5xl font-semibold text-black md:text-6xl">
            Upwork Assignment.
          </h1>
          <p className="mt-2 text-lg text-black">
            A simple and powerful Next.js template featuring authentication and
            user management powered by Clerk.
          </p>
        </div>
      </article>
    </main>
  );
}
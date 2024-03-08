import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Header from "../components/Header";
export default function DashboardPage() {
  // const { user } = useUser();

  return (
    <div className="h-screen bg-white">
      <Header />

      <main className="grow">
        <article className="grid lg:grid-cols-2">
          <div className="px-8 py-5 md:px-20 lg:py-10 text-black flex">
            <div className="grow">
              <h1 className="text-2xl font-semibold md:text-3xl gradient">
                Agent Management
              </h1>
              <p className="mt-2 text-sm">
                Manage your agents
              </p>
            </div>
            <div>Button</div>
          </div>
        </article>
      </main>
    </div>
  );
}
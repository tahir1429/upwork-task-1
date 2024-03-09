import Header from "../components/Header";
import { SignIn } from "@clerk/nextjs";

export default async function DashboardPage() {
  return (
    <div className="h-screen bg-white">
      <Header />
      <div className="h-[85vh] relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h5>Sign In</h5>
          <SignIn afterSignInUrl="/dashboard"/>
        </div>
      </div>
    </div>
  );
}
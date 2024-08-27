import Header from "@/components/Header";
import Generation from "./generation/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />
      <div className="h-[90vh] py-8 w-full container">
        <Generation />
      </div>
    </main>
  );
}

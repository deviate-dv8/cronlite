import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <nav className="relative bg-white">
      <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <a href="#">
            <h1 className="text-xl font-bold text-blue-500">Cronlite</h1>
          </a>
        </div>

        <div className="absolute inset-x-0 z-20 w-full px-6 py-4 bg-white md:bg-transparent md:mt-0 md:p-0 md:top-0 md:relative md:w-auto md:flex md:items-center">
          <div className="flex flex-col md:flex-row md:mx-6">
            <Button variant="ghost">Login</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <header className="bg-white">
        <div className="container px-6 py-16 mx-auto">
          <div className="items-center lg:flex">
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-gray-800 lg:text-4xl">
                  Best place to setup your <br /> your{" "}
                  <span className="text-blue-500 ">crons</span>
                </h1>

                <p className="mt-3 text-gray-600 mb-4">
                  Free forever cron job service for developers. Easy to use. No
                  stoppage. No credit card required.
                </p>
                <Button>Add Cron</Button>
              </div>
            </div>

            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
              <Image
                src="hero-image.svg"
                alt="Hero Image"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
              ></Image>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

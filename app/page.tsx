import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col lg:flex-row items-center bg-[#1E1919] dark:bg-slate-800">
        <div className="p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800 text-white space-y-5">

        <h1 className="text-5xl font-bold">
        Welcome to Dropbox <br/>
        <br/>
        Storing everything for you and your business needs.All in one place
        </h1>

        <p className="pb-20">
        Dropbox: Elevate your file storage experience. Seamlessly store, share, and access all your files in one secure cloud platform. Effortlessly organize documents, photos, and more with user-friendly features. Whether at work or on the go, Dropbox ensures your data is safe and accessible. Simplify your digital life and collaborate effortlessly with Dropbox's reliable and efficient file storage solution.

        </p>
        <a href="/Dashboard" className="flex cursor-pointer bg-blue-500 p-5 w-fit">
          Try it for free!
          <ArrowRight className="ml-10"/>
        </a>
        </div>
        <div className="bg-[#1E1919] dark:bg-slate-800 h-full p-10 ">
          <video autoPlay loop muted className="rounded-lg">
            <source
            src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
            
            />


          </video>
        </div>
      </div>
    </main>
  );
}

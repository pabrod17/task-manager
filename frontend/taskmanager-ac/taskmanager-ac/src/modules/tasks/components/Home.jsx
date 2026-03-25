import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1
        className="bg-gradient-to-b from-black 
        to-gray-300/80 bg-clip-text text-6xl sm:text-7xl md:text-8xl 
        leading-none font-semibold text-transparent 
        dark:from-white dark:to-slate-900/10 
        hover:opacity-80 transition-opacity mb-10"
      >
        Task Management
      </h1>
            <Link to="/tasks">
        <Button
          size="lg"
          className="cursor-pointer rounded-full text-lg font-medium px-8 py-6
          bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600
          dark:from-slate-200 dark:via-slate-300 dark:to-slate-400
          text-white dark:text-slate-900
          shadow-md hover:shadow-lg
          hover:opacity-90 transition-all duration-300 border border-slate-500/20"
        >
          🚀 Get Started
        </Button>
      </Link>
    </div>
  );
}

export default Home;

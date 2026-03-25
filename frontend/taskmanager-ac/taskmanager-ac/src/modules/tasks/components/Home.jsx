import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import hola from "@/assets/hola.png";
function Home() {
  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center text-center px-6">
      <img
        src={hola}
        alt="GTA 6 Background"
        width={2560}
        height={1440}
        className={`w-full h-full object-cover duration-500 ${
          oneYearMode || blackFridayMode || newYearMode || valentinEffects
            ? "scale-110 brightness-125"
            : thaiBirthdayEffects
              ? "scale-105 brightness-100"
              : "scale-100 brightness-100"
        }`}
        loading="eager"
        decoding="async"
      />
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

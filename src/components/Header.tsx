import { Compass, ArrowUpRight } from "lucide-react";

export function Header() {
  return (
    <header className="flex flex-col items-center justify-center text-center mb-8 pt-4">
      <div className="tracking-[0.25em] text-[10px] font-bold mb-3 uppercase bg-gradient-to-r from-[#FF7B54] to-[#FFB26B] bg-clip-text text-transparent">
        VASEY/AI PRESENTS
      </div>
      <div className="flex items-center gap-3 mb-2 relative">
        <div className="relative w-10 h-10 flex items-center justify-center bg-safari-surface rounded-xl border border-safari-cyan/30 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
          <Compass
            className="text-safari-cyan w-6 h-6 absolute"
            strokeWidth={1.5}
          />
          <ArrowUpRight
            className="text-safari-teal w-4 h-4 absolute top-1.5 right-1.5"
            strokeWidth={2.5}
          />
        </div>
        <h1 className="text-2xl font-black tracking-tight text-safari-text">
          SafariServe
        </h1>
        <span className="px-2 py-0.5 rounded-full bg-safari-cyan/10 border border-safari-cyan/20 text-safari-cyan text-[10px] font-bold ml-1 tracking-wider">
          v1.2.0
        </span>
      </div>
      <p className="text-safari-text/50 text-sm font-medium tracking-wide">
        Your gateway to Safari, from anywhere.
      </p>
    </header>
  );
}

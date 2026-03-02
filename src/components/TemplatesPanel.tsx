import { Globe, Film, Music, FileText } from "lucide-react";

const TEMPLATES = [
  {
    type: "Webpage",
    icon: Globe,
    desc: "→ Safari",
    color: "text-blue-400",
  },
  {
    type: "Video",
    icon: Film,
    desc: "→ Native Player",
    color: "text-purple-400",
  },
  {
    type: "Audio",
    icon: Music,
    desc: "→ Apple Music",
    color: "text-pink-400",
  },
  {
    type: "Document",
    icon: FileText,
    desc: "→ Files App",
    color: "text-emerald-400",
  },
];

export function TemplatesPanel() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {TEMPLATES.map((tpl) => {
        const TplIcon = tpl.icon;
        return (
          <button
            key={tpl.type}
            className="bg-safari-surface/60 backdrop-blur-xl border border-safari-cyan/10 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.4),0_0_48px_rgba(0,210,255,0.04)] p-4 flex flex-col items-center justify-center gap-2 hover:bg-safari-surface/80 transition-all active:scale-95 group"
          >
            <div className="w-12 h-12 rounded-full bg-safari-deep border border-safari-cyan/10 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(0,210,255,0.15)] transition-shadow">
              <TplIcon className={`w-5 h-5 ${tpl.color}`} />
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-safari-text">
                {tpl.type}
              </div>
              <div className="text-[10px] text-safari-text/50 font-medium tracking-wide mt-0.5">
                {tpl.desc}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

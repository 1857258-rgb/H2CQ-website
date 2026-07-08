import { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";

type Component = {
  name: string;
  category: string;
  notes?: string;
};

const components: Component[] = [
  // Compute & AI
  { name: "Camera for AI", category: "Compute & AI", notes: "Dedicated inference camera" },
  { name: "Cooler for Raspberry Pi 5", category: "Compute & AI", notes: "Active cooling for sustained compute" },
  { name: "AI Accelerator", category: "Compute & AI", notes: "Edge inference chip (e.g. Hailo-8)" },
  { name: "PCIe Adapter", category: "Compute & AI", notes: "Connects AI accelerator to RPi 5" },
  { name: "MicroSD Card", category: "Compute & AI", notes: "OS and data storage" },
  { name: "Motherboard", category: "Compute & AI", notes: "Raspberry Pi 5 main board" },

  // Sensors
  { name: "Camera for Videos and Photos", category: "Sensors & Vision", notes: "High-res capture camera" },
  { name: "GPS", category: "Sensors & Vision", notes: "Position and navigation" },
  { name: "Lidar Sensor", category: "Sensors & Vision", notes: "Obstacle detection and altitude hold" },
  { name: "Optical Flow Sensor", category: "Sensors & Vision", notes: "Indoor hover stabilization" },

  // Propulsion
  { name: "Motors", category: "Propulsion", notes: "Brushless motors" },
  { name: "ESC and FC Stack", category: "Propulsion", notes: "Electronic speed controllers + flight controller" },
  { name: "Propellers 2 Blade", category: "Propulsion", notes: "Efficiency-optimized 2-blade props" },
  { name: "Servo", category: "Propulsion", notes: "Gimbal or control surface actuation" },

  // Power
  { name: "Batteries", category: "Power", notes: "LiPo flight packs" },
  { name: "Battery Charger", category: "Power", notes: "Multi-chemistry smart charger" },
  { name: "Step-down Converter", category: "Power", notes: "5V/12V rails for compute and sensors" },
  { name: "XT60H Plug Male Female", category: "Power", notes: "Main power connectors" },
  { name: "Battery for Controller", category: "Power", notes: "Ground station power" },

  // Communication
  { name: "Receiver", category: "Communication", notes: "RC link receiver" },
  { name: "Controller", category: "Communication", notes: "Ground pilot transmitter" },
  { name: "Wifi Adapter for Drone (Video)", category: "Communication", notes: "FPV video downlink" },
  { name: "Directional Panel Ground Station", category: "Communication", notes: "High-gain antenna for extended range" },
  { name: "Drone Antenna", category: "Communication", notes: "Onboard RF antenna" },

  // Interface & UX
  { name: "Mode Selection Button", category: "Interface", notes: "Hardware flight-mode toggle" },
  { name: "Double Touch to Launch", category: "Interface", notes: "Safety-gated arm and launch gesture" },
  { name: "Speaker", category: "Interface", notes: "Audio status alerts" },
  { name: "Microphone", category: "Interface", notes: "Voice commands or logging" },

  // Frame & Hardware
  { name: "Filament for Frame", category: "Frame & Hardware", notes: "3D printed structural frame material" },
  { name: "Damping Balls", category: "Frame & Hardware", notes: "Vibration isolation for FC and cameras" },
  { name: "Nylon Insert Hex Nuts", category: "Frame & Hardware", notes: "Vibration-resistant fasteners" },
  { name: "M3 Screws Assortment Kit", category: "Frame & Hardware", notes: "General assembly fasteners" },
  { name: "Servo Pushrod Linkage", category: "Frame & Hardware", notes: "Mechanical control linkage" },

  // Wiring
  { name: "14 Gauge Silicone Wire", category: "Wiring", notes: "High-current motor and battery runs" },
  { name: "22 Gauge Silicone Wire", category: "Wiring", notes: "Mid-current signal and peripheral runs" },
  { name: "28 Gauge Silicone Wire", category: "Wiring", notes: "Low-current sensor wiring" },
  { name: "Heat Shrink Tubing Kit", category: "Wiring", notes: "Insulation and strain relief" },
];

const categories = ["All", ...Array.from(new Set(components.map((c) => c.category)))];

const categoryColors: Record<string, string> = {
  "Compute & AI": "text-cyan-400 border-cyan-400/30 bg-cyan-400/5",
  "Sensors & Vision": "text-violet-400 border-violet-400/30 bg-violet-400/5",
  "Propulsion": "text-orange-400 border-orange-400/30 bg-orange-400/5",
  "Power": "text-yellow-400 border-yellow-400/30 bg-yellow-400/5",
  "Communication": "text-green-400 border-green-400/30 bg-green-400/5",
  "Interface": "text-pink-400 border-pink-400/30 bg-pink-400/5",
  "Frame & Hardware": "text-blue-400 border-blue-400/30 bg-blue-400/5",
  "Wiring": "text-red-400 border-red-400/30 bg-red-400/5",
};

export default function Components() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const filtered = activeCategory === "All"
    ? components
    : components.filter((c) => c.category === activeCategory);

  const toggleCheck = (name: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const total = components.length;
  const acquired = checked.size;
  const pct = Math.round((acquired / total) * 100);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="text-primary text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          Bill of Materials
        </p>
        <h1 style={{ fontFamily: "'Orbitron', sans-serif" }} className="text-4xl lg:text-5xl font-black text-foreground mb-4">
          Components
        </h1>
        <p className="text-muted-foreground font-light max-w-xl">
          All {total} components required for the H2CQ build. Check off parts as you acquire them.
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-10 p-6 border border-border bg-card">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted-foreground tracking-wider uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Acquisition Progress
          </span>
          <span style={{ fontFamily: "'Orbitron', sans-serif" }} className="text-primary font-bold text-sm">
            {acquired} / {total}
          </span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">{pct}% complete</p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 text-xs tracking-widest uppercase border transition-all duration-150 ${
              activeCategory === cat
                ? "border-primary/50 bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground hover:border-border/80"
            }`}
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Component list */}
      <div className="divide-y divide-border border border-border">
        {filtered.map((comp) => {
          const isChecked = checked.has(comp.name);
          const colorClass = categoryColors[comp.category] ?? "text-muted-foreground border-border bg-muted/10";
          return (
            <div
              key={comp.name}
              onClick={() => toggleCheck(comp.name)}
              className={`flex items-center gap-5 px-6 py-5 cursor-pointer transition-colors duration-150 group ${
                isChecked ? "bg-primary/5" : "hover:bg-card"
              }`}
            >
              <div className="shrink-0">
                {isChecked ? (
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-medium text-sm transition-colors ${isChecked ? "text-muted-foreground line-through" : "text-foreground"}`}>
                  {comp.name}
                </p>
                {comp.notes && (
                  <p className="text-xs text-muted-foreground mt-0.5 font-light">{comp.notes}</p>
                )}
              </div>
              <span className={`shrink-0 px-2.5 py-0.5 text-xs border tracking-wider uppercase hidden sm:inline-block ${colorClass}`} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                {comp.category}
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground mt-6 text-center tracking-wider">
        {filtered.length} component{filtered.length !== 1 ? "s" : ""} shown · click to mark acquired
      </p>
    </div>
  );
}

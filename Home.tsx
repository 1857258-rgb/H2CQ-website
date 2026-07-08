import { Link } from "react-router";
import { ArrowRight, Cpu, Radio, Zap, Navigation } from "lucide-react";

const stats = [
  { label: "Top Speed", value: "87", unit: "km/h" },
  { label: "Max Altitude", value: "400", unit: "m" },
  { label: "Flight Time", value: "28", unit: "min" },
  { label: "Range", value: "5.2", unit: "km" },
];

const highlights = [
  {
    icon: Cpu,
    title: "AI-Powered Vision",
    body: "Raspberry Pi 5 with dedicated AI accelerator handles real-time object detection, tracking, and autonomous flight decisions at the edge.",
  },
  {
    icon: Navigation,
    title: "Sensor Fusion",
    body: "GPS, LiDAR, and optical flow sensors combine to deliver centimeter-level positioning and obstacle avoidance in any environment.",
  },
  {
    icon: Radio,
    title: "Dual Camera System",
    body: "Dedicated AI inference camera paired with a high-resolution video/photo camera for separate capture and processing pipelines.",
  },
  {
    icon: Zap,
    title: "Smart Power",
    body: "Custom ESC & FC stack with step-down converters distributes power cleanly across compute, sensors, and propulsion systems.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1800&h=1000&fit=crop&auto=format"
            alt="Aerial drone view over mountains"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/30 bg-primary/5 text-primary text-xs tracking-widest uppercase mb-8" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Custom Build · In Development
            </div>
            <h1
              style={{ fontFamily: "'Orbitron', sans-serif", lineHeight: 1.1 }}
              className="text-5xl lg:text-7xl font-black tracking-tight text-foreground mb-6"
            >
              H2
              <br />
              <span className="text-primary">CQ</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mb-10 font-light">
              A fully custom AI-capable drone platform. Built from scratch with a Raspberry Pi 5 brain,
              dual cameras, LiDAR sensing, and autonomous flight capabilities. This is H2CQ.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/components"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm tracking-widest uppercase font-semibold hover:bg-primary/90 transition-colors"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                View Components <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/build"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground text-sm tracking-widest uppercase font-semibold hover:border-primary/50 hover:text-primary transition-colors"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Build Specs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border">
            {stats.map(({ label, value, unit }) => (
              <div key={label} className="px-8 py-8 flex flex-col gap-1">
                <div className="flex items-baseline gap-1">
                  <span style={{ fontFamily: "'Orbitron', sans-serif" }} className="text-4xl font-black text-primary">
                    {value}
                  </span>
                  <span className="text-sm text-muted-foreground tracking-wider">{unit}</span>
                </div>
                <span className="text-xs text-muted-foreground tracking-widest uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature highlights */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-14">
          <p className="text-primary text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Platform Highlights
          </p>
          <h2 style={{ fontFamily: "'Orbitron', sans-serif" }} className="text-3xl lg:text-4xl font-bold text-foreground">
            Built Different
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {highlights.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-background p-10 hover:bg-card transition-colors group">
              <div className="w-10 h-10 border border-primary/30 flex items-center justify-center mb-6 group-hover:border-primary/60 transition-colors">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif" }} className="text-xl font-semibold tracking-wider uppercase text-foreground mb-3">
                {title}
              </h3>
              <p className="text-muted-foreground leading-relaxed font-light text-sm">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Aerial gallery strip */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-3 gap-3 h-64 lg:h-80">
          <div className="col-span-2 overflow-hidden bg-card">
            <img
              src="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=900&h=500&fit=crop&auto=format"
              alt="Aerial drone photography"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex-1 overflow-hidden bg-card">
              <img
                src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=240&fit=crop&auto=format"
                alt="Drone in flight"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="flex-1 overflow-hidden bg-card">
              <img
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=240&fit=crop&auto=format"
                alt="Drone electronics"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 style={{ fontFamily: "'Orbitron', sans-serif" }} className="text-2xl font-bold text-foreground mb-2">
              H2CQ · 35 Components. One Vision.
            </h2>
            <p className="text-muted-foreground font-light">Every part selected for performance, AI capability, and reliability.</p>
          </div>
          <Link
            to="/components"
            className="shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-sm tracking-widest uppercase font-semibold hover:bg-primary/90 transition-colors"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Full Bill of Materials <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

import { useState } from "react";

type Tab = "compute" | "flight" | "power" | "comms";

const tabs: { id: Tab; label: string }[] = [
  { id: "compute", label: "Compute & AI" },
  { id: "flight", label: "Flight System" },
  { id: "power", label: "Power" },
  { id: "comms", label: "Comms & Interface" },
];

type Spec = { label: string; value: string; detail?: string };

const specs: Record<Tab, { title: string; description: string; rows: Spec[] }> = {
  compute: {
    title: "Compute & AI Stack",
    description: "The brain of the drone — a Raspberry Pi 5 paired with a dedicated AI accelerator for real-time inference at the edge.",
    rows: [
      { label: "Main Computer", value: "Raspberry Pi 5", detail: "8GB RAM, quad-core Cortex-A76" },
      { label: "AI Accelerator", value: "PCIe Edge AI Chip", detail: "26 TOPS — runs YOLO, segmentation, tracking" },
      { label: "PCIe Interface", value: "PCIe Gen 2 x1", detail: "Via RPi 5 PCIe slot + adapter" },
      { label: "Cooling", value: "Active cooler", detail: "Fan + heatsink for sustained load" },
      { label: "Storage", value: "MicroSD (A2 class)", detail: "OS, models, logs" },
      { label: "AI Camera", value: "Inference camera", detail: "Dedicated to AI pipeline, low latency" },
      { label: "Photo/Video Camera", value: "High-res module", detail: "Independent capture pipeline" },
      { label: "OS", value: "Raspberry Pi OS", detail: "64-bit Lite + ROS2 or custom stack" },
    ],
  },
  flight: {
    title: "Flight & Navigation",
    description: "Sensor fusion across GPS, LiDAR, and optical flow gives the drone precise positioning indoors and outdoors.",
    rows: [
      { label: "Flight Controller", value: "ESC + FC Stack", detail: "Integrated 4-in-1 ESC with FC" },
      { label: "Motors", value: "Brushless DC", detail: "Sized for 5\" props + full payload" },
      { label: "Propellers", value: '5" 2-Blade', detail: "Efficiency-optimized, reduced noise" },
      { label: "Servo", value: "Micro servo", detail: "Gimbal or control surface" },
      { label: "GPS Module", value: "M10 / M8N GPS", detail: "Multi-constellation, <1m accuracy" },
      { label: "LiDAR", value: "Time-of-flight LiDAR", detail: "Obstacle detection, altitude hold" },
      { label: "Optical Flow", value: "PMW3901 or equiv.", detail: "Indoor precision hover" },
      { label: "Frame", value: "3D Printed", detail: "Custom PLA/PETG filament frame" },
      { label: "Damping", value: "Silicone damping balls", detail: "Vibration isolation for FC/cameras" },
    ],
  },
  power: {
    title: "Power System",
    description: "Multi-voltage power distribution with LiPo flight packs and clean regulated rails for compute and sensors.",
    rows: [
      { label: "Main Battery", value: "LiPo (3S–4S)", detail: "High-C discharge for motors" },
      { label: "Battery Connector", value: "XT60H Male/Female", detail: "Gold-plated, 60A rated" },
      { label: "Charger", value: "Smart multi-chemistry", detail: "Balance charging, LiPo/LiIon" },
      { label: "Voltage Rail 1", value: "5V (RPi + sensors)", detail: "Step-down converter from main pack" },
      { label: "Voltage Rail 2", value: "12V (optional)", detail: "Camera/LiDAR power" },
      { label: "Controller Battery", value: "Li-Ion or LiPo", detail: "Ground station TX power" },
      { label: "Main Wire", value: "14 AWG Silicone", detail: "Battery to ESC, high-current runs" },
      { label: "Signal Wire", value: "22 AWG Silicone", detail: "Peripheral and sensor connections" },
      { label: "Sensor Wire", value: "28 AWG Silicone", detail: "Low-current data lines" },
      { label: "Insulation", value: "Heat Shrink Kit", detail: "Strain relief and short prevention" },
    ],
  },
  comms: {
    title: "Communication & Interface",
    description: "Long-range RC link, live video downlink, and a hardware interface layer for safe hands-on control.",
    rows: [
      { label: "RC Protocol", value: "ELRS / ExpressLRS", detail: "Sub-3ms latency, 10km+ range" },
      { label: "Receiver", value: "ELRS RX module", detail: "Onboard receiver" },
      { label: "Controller (TX)", value: "RC Transmitter", detail: "Ground pilot controller" },
      { label: "Video Downlink", value: "WiFi Adapter", detail: "5GHz FPV video stream" },
      { label: "Ground Antenna", value: "Directional Panel", detail: "High-gain for extended range" },
      { label: "Drone Antenna", value: "Dipole / patch", detail: "Onboard RF antenna" },
      { label: "Launch Gesture", value: "Double touch", detail: "Safety-gated arm + launch" },
      { label: "Mode Switch", value: "Hardware button", detail: "Manual / stabilized / autonomous" },
      { label: "Speaker", value: "Piezo or mini speaker", detail: "Status tones and alerts" },
      { label: "Microphone", value: "MEMS mic", detail: "Voice command or audio logging" },
    ],
  },
};

function SpecRow({ label, value, detail }: Spec) {
  return (
    <div className="grid grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1.5fr] gap-4 px-6 py-4 border-b border-border last:border-0 hover:bg-card/50 transition-colors">
      <span className="text-muted-foreground text-sm font-light">{label}</span>
      <span className="text-foreground text-sm font-medium" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
        {value}
      </span>
      {detail && (
        <span className="text-muted-foreground text-xs col-span-2 lg:col-span-1 -mt-2 lg:mt-0 font-light">
          {detail}
        </span>
      )}
    </div>
  );
}

export default function BuildSpecs() {
  const [active, setActive] = useState<Tab>("compute");
  const current = specs[active];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="text-primary text-xs tracking-widest uppercase mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          Technical Reference
        </p>
        <h1 style={{ fontFamily: "'Orbitron', sans-serif" }} className="text-4xl lg:text-5xl font-black text-foreground mb-4">
          Build Specs
        </h1>
        <p className="text-muted-foreground font-light max-w-xl">
          Full technical breakdown of the H2CQ platform — subsystem by subsystem.
        </p>
      </div>

      {/* Tab nav */}
      <div className="flex flex-wrap gap-0 border border-border mb-0">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`flex-1 min-w-[120px] px-6 py-4 text-xs tracking-widest uppercase border-r last:border-r-0 border-border transition-all duration-150 ${
              active === id
                ? "bg-primary/10 text-primary border-b-2 border-b-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-card"
            }`}
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab panel */}
      <div className="border border-t-0 border-border">
        <div className="px-6 py-8 border-b border-border bg-card">
          <h2 style={{ fontFamily: "'Orbitron', sans-serif" }} className="text-xl font-bold text-foreground mb-2">
            {current.title}
          </h2>
          <p className="text-muted-foreground font-light text-sm max-w-2xl">{current.description}</p>
        </div>

        {/* Column headers */}
        <div className="grid grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1.5fr] gap-4 px-6 py-3 bg-muted/30">
          <span className="text-xs text-muted-foreground tracking-widest uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Parameter</span>
          <span className="text-xs text-muted-foreground tracking-widest uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Value</span>
          <span className="text-xs text-muted-foreground tracking-widest uppercase hidden lg:block" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Notes</span>
        </div>

        {current.rows.map((row) => (
          <SpecRow key={row.label} {...row} />
        ))}
      </div>

      {/* Architecture diagram placeholder */}
      <div className="mt-12 border border-border bg-card p-10 text-center">
        <div className="max-w-md mx-auto">
          <p className="text-primary text-xs tracking-widest uppercase mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            System Architecture
          </p>
          <div className="grid grid-cols-3 gap-3 text-xs text-center">
            {[
              ["Raspberry Pi 5", "AI Accel.", "Cameras"],
              ["GPS", "LiDAR", "Optical Flow"],
              ["ESC / FC", "Motors", "Servos"],
              ["LiPo Pack", "Step-Down", "XT60H"],
              ["ELRS RX", "WiFi", "Speaker / Mic"],
            ].map((row, ri) => (
              row.map((cell, ci) => (
                <div
                  key={`${ri}-${ci}`}
                  className="border border-border px-2 py-3 text-muted-foreground hover:border-primary/30 hover:text-foreground transition-colors"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {cell}
                </div>
              ))
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-6 font-light">
            Full wiring diagrams and CAD files to be published at build completion.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient mesh blobs */}
      <div className="gradient-mesh" />

      {/* Grid dot pattern */}
      <div className="grid-pattern" />

      {/* Subtle radial gradient fade at bottom for section transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{
          background:
            "linear-gradient(to top, var(--bg), transparent)",
        }}
      />
    </div>
  );
}

const blinkers = Array.from({ length: 1400 }, (_, index) => {
  const columns = 70;
  const column = index % columns;
  const row = Math.floor(index / columns);
  const isBlinking = index % 19 === 0 || index % 37 === 0;

  return {
    left: `${1 + column * 1.42}%`,
    top: `${0.4 + row * 2.55}%`,
    delay: `${(index * 0.13) % 2.8}s`,
    blinking: isBlinking,
  };
});

export function HeroBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-0 z-0 h-[31rem] w-screen -translate-x-1/2 overflow-hidden opacity-90"
    >
      <div className="hero-cover absolute inset-0" />
      <div className="absolute inset-0">
        {blinkers.map((blinker) => (
          <span
            key={`${blinker.left}-${blinker.top}`}
            className="hero-cover__blinker"
            style={{
              left: blinker.left,
              top: blinker.top,
              animationDelay: blinker.delay,
            }}
            data-blinking={blinker.blinking ? "true" : "false"}
          />
        ))}
      </div>
      <div className="absolute inset-x-0 top-[15.9rem] z-10 h-px bg-black/12 dark:bg-white/12" />
      <div className="hero-cover__fade absolute inset-x-0 top-[15.9rem] h-24" />
    </div>
  );
}

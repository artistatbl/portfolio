const desktopBlinkers = Array.from({ length: 1400 }, (_, index) => {
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

const mobileBlinkers = Array.from({ length: 180 }, (_, index) => {
  const columns = 18;
  const column = index % columns;
  const row = Math.floor(index / columns);
  const isBlinking = index % 7 === 0 || index % 13 === 0;

  return {
    left: `${4 + column * 5.15}%`,
    top: `${1 + row * 4.7}%`,
    delay: `${(index * 0.19) % 3.8}s`,
    blinking: isBlinking,
  };
});

export function HeroBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-0 z-0 h-[32rem] w-screen -translate-x-1/2 overflow-hidden opacity-90"
    >
      <div className="hero-cover absolute inset-0 hidden sm:block" />
      <div className="absolute inset-0 hidden sm:block">
        {desktopBlinkers.map((blinker) => (
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
      <div
        className="absolute inset-x-0 top-0 h-[18rem] sm:hidden"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in srgb, var(--background) 6%, transparent), transparent 72%), linear-gradient(to bottom, color-mix(in srgb, var(--foreground) 4%, transparent), transparent 75%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-[18rem] sm:hidden">
        {mobileBlinkers.map((blinker) => (
          <span
            key={`mobile-${blinker.left}-${blinker.top}`}
            className="absolute"
            style={{
              left: blinker.left,
              top: blinker.top,
              width: "3px",
              height: "3px",
              borderRadius: "0",
              border: "1px solid color-mix(in srgb, var(--foreground) 14%, transparent)",
              background: blinker.blinking
                ? "color-mix(in srgb, var(--foreground) 20%, transparent)"
                : "color-mix(in srgb, var(--foreground) 8%, transparent)",
              opacity: blinker.blinking ? 0.42 : 0.18,
              boxShadow: blinker.blinking
                ? "0 0 10px color-mix(in srgb, var(--foreground) 10%, transparent)"
                : "none",
              animation: blinker.blinking
                ? `hero-blink 4.4s ease-in-out ${blinker.delay} infinite`
                : undefined,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-x-0 top-[16rem] z-10 hidden h-px bg-black/5 dark:bg-white/5 sm:block" />
      <div className="hero-cover__fade absolute inset-x-0 top-[16rem] hidden h-24 sm:block" />
      <div className="absolute inset-x-0 top-[14.25rem] z-10 h-px bg-black/7 sm:hidden dark:bg-white/7" />
      <div
        className="absolute inset-x-0 top-[14.25rem] h-20 sm:hidden"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--background))",
        }}
      />
    </div>
  );
}

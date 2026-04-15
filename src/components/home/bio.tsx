import type { ProfileData } from "@/lib/content";

interface BioSectionProps {
  profile: ProfileData;
  paragraphs: string[];
}

export function BioSection({ profile, paragraphs }: BioSectionProps) {
  return (
    <section className="space-y-7">
      <p className="max-w-[34ch] text-[1rem] font-medium leading-[1.75] tracking-[-0.02em] text-[#67615a] sm:text-[1.08rem]">
        <span className="font-semibold text-[#171513]">I&apos;m {profile.name}</span>, a{" "}
        <span className="font-semibold text-[#171513]">{profile.role}</span>{" "}
        {profile.introTail}
      </p>
      {paragraphs.map((paragraph) => (
        <p
          key={paragraph}
          className="max-w-[34ch] text-[0.9rem] leading-[1.8] text-[#7a746d]"
        >
          {paragraph}
        </p>
      ))}
    </section>
  );
}

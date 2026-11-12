const scenes = [
  ["portrait-1140", "Victory", "I like this version of me. Hoodie on, backpack ready, and still finding a reason to smile."],
  ["personal/anime", "The worlds I get lost in", "Anime makes me curious about how a world works and why the people in it do what they do."],
  ["personal/solitude", "Quiet enough to think", "I’m happy in my own company. A walk with my headphones or a few hours working alone gives me room to think."],
  ["personal/transit", "A seat by the window", "Public transport is part of how I get to know a city. I put on my headphones and watch the streets change."],
  ["personal/space", "What draws me to space", "Standing beside a spacesuit makes me think about all the people and engineering decisions that go into keeping one person alive out there."],
  ["personal/satellite", "My first satellite model", "I wanted to know what each part did and how it all worked together. I still approach new things that way."],
  ["personal/legacy", "As long as I’m breathing, I can think.", "My cousin took me here during one of the hardest periods of my life. I stood with my arms wide and realized I could still choose what I did next. If I can think, I can find a way forward. This pose reminds me that the legacy I want comes from what I do next."],
];

export function PhotoScenes() {
  return (
    <div aria-label="Personal stories">
      {scenes.map(([image, title, story], index) => (
        <section key={image} aria-labelledby={`scene-${index}`} className="relative isolate flex min-h-[78svh] items-end overflow-hidden border-b border-ivory/15 bg-[#11100e]">
          <div aria-hidden="true" className="absolute inset-0 -z-10 scale-110 bg-cover bg-center opacity-30 blur-2xl" style={{ backgroundImage: `url('/photos/${image}.webp')` }} />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-contain bg-top bg-no-repeat lg:bg-center" style={{ backgroundImage: `url('/photos/${image}.webp')` }} />
          <div className="w-full bg-gradient-to-t from-[#11100e] via-[#11100e]/90 to-transparent px-6 pb-10 pt-24 sm:px-12">
            <div className="mx-auto max-w-[1360px]">
              <h2 id={`scene-${index}`} className="display max-w-[760px] text-[clamp(2.4rem,5vw,5rem)] leading-none text-ivory">{title}</h2>
              <p className="mt-4 max-w-[560px] text-lg leading-relaxed text-ivory-2">{story}</p>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

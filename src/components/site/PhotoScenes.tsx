const scenes = [
  ["portrait-1140", "Victory", "I like this version of me. Hoodie on, backpack ready, and still finding a reason to smile."],
  ["personal/anime", "The worlds I get lost in", "Anime makes me curious about how a world works and why the people in it do what they do."],
  ["personal/solitude", "Quiet enough to think", "I’m happy in my own company. A walk with my headphones or a few hours working alone gives me room to think."],
  ["personal/transit", "A seat by the window", "Public transport is part of how I get to know a city. I put on my headphones and watch the streets change."],
  ["space-journey", "Space Journey", ""],
  ["personal/legacy", "As long as I’m breathing, I can think.", "My cousin took me here during one of the hardest periods of my life. I stood with my arms wide and realized I could still choose what I did next. If I can think, I can find a way forward. This pose reminds me that the legacy I want comes from what I do next."],
];

const spaceJourney = [
  ["personal/space", "Ujwal beside a spacesuit exhibit"],
  ["personal/satellite", "A suspended satellite model on display"],
];

function SpaceJourney() {
  return (
    <section aria-labelledby="space-journey" className="relative isolate overflow-hidden border-b border-ivory/15 bg-[#11100e]">
      <div aria-hidden="true" className="absolute inset-0 -z-10 scale-110 bg-cover bg-center opacity-20 blur-2xl" style={{ backgroundImage: "url('/photos/personal/satellite.webp')" }} />
      <div className="mx-auto max-w-[1360px] px-6 py-14 sm:px-12 lg:py-20">
        <h2 id="space-journey" className="display text-[clamp(2.4rem,5vw,5rem)] leading-none text-ivory">
          What draws me to space
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6">
          {spaceJourney.map(([image, alt]) => (
            <figure key={image} className="overflow-hidden rounded-md bg-black/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/photos/${image}.webp`} alt={alt} loading="lazy" className="h-[60svh] max-h-[720px] w-full object-contain object-center sm:h-[70svh]" />
            </figure>
          ))}
        </div>
        <p className="mt-8 max-w-[640px] text-lg leading-relaxed text-ivory-2">
          Standing beside a spacesuit makes me think about all the people and engineering decisions that go into keeping one person alive out there. The satellite model next to it was my first look at how a machine like that comes together. I wanted to know what each part did and how it all worked together, and I still approach new things that way.
        </p>
      </div>
    </section>
  );
}

export function PhotoScenes() {
  return (
    <div aria-label="Personal stories">
      {scenes.map(([image, title, story], index) => image === "space-journey" ? (
        <SpaceJourney key={image} />
      ) : image === "personal/legacy" ? (
        <section key={image} aria-labelledby={`scene-${image === "personal/legacy" ? index + 1 : index}`} className="bg-black px-5 py-12 sm:px-8 lg:py-20">
          <div className="mx-auto grid max-w-[1520px] items-center gap-5 lg:grid-cols-[1fr_1.5fr_1fr] lg:gap-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/photos/personal/legacy-quote-left.webp" alt="All you need is a little delusion and audacity and you can seriously do anything in this life." loading="lazy" className="mx-auto w-full max-w-md" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/photos/personal/legacy.webp" alt="Ujwal standing with arms outstretched above a forested valley" width={706} height={779} loading="lazy" className="mx-auto w-full max-w-xl" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/photos/personal/legacy-quote-right.webp" alt="A hero? Please. Some of us were born to be greater. — Toni Oba" loading="lazy" className="mx-auto w-full max-w-md" />
          </div>
          <div className="mx-auto mt-10 max-w-3xl text-center">
            <h2 id={`scene-${index}`} className="display text-[clamp(2.4rem,5vw,5rem)] leading-none text-ivory">{title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ivory-2">{story}</p>
          </div>
        </section>
      ) : (
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

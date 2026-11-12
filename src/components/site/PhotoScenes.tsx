const scenes = [
  ["portrait-1140", "Victory", "I like this version of me. Hoodie on, backpack ready, and still finding a reason to smile."],
  ["personal/anime", "The worlds I get lost in", "Anime makes me curious about how a world works and why the people in it do what they do."],
  ["personal/solitude", "Quiet enough to think", "I’m happy in my own company. A walk with my headphones or a few hours working alone gives me room to think."],
  ["book-portrait", "Books and low light", "Some of my best thinking happens with a book and almost no light."],
  ["personal/transit", "A seat by the window", "Public transport is part of how I get to know a city. I put on my headphones and watch the streets change."],
  ["stories", "Stories I keep coming back to", "Anime and film are where I find characters worth thinking about, and worlds I want to understand."],
  ["machines", "Machines with a reason for every line", "A 911 GT3 RS is aerodynamics you can see. The Corvette redesign sheet is the same idea drawn as design thinking. I like things where form follows function."],
  ["space-journey", "Space Journey", ""],
  ["conference", "Esplorare Space", "After my talk at the Sustainable Space Conference at Tor Vergata, with fellow students in front of our slide."],
  ["personal/legacy", "As long as I’m breathing, I can think.", "My cousin took me here during one of the hardest periods of my life. I stood with my arms wide and realized I could still choose what I did next. If I can think, I can find a way forward. This pose reminds me that the legacy I want comes from what I do next."],
];

type Img = { name: string; w: number; alt: string };
const interestImages: Record<string, Img> = {
  "book-portrait": { name: "book-portrait", w: 1152, alt: "Ujwal in a dark room, face hidden behind an open book, lit by a thin shaft of light" },
  "anime-art": { name: "anime-art", w: 1152, alt: "Black and white ink illustration of an anime swordsman with three swords and Japanese calligraphy" },
  "film-still": { name: "film-still", w: 736, alt: "A still from a film: a young man with curly hair standing at a bathroom sink" },
  "porsche-911": { name: "porsche-911", w: 1152, alt: "Poster of a white, red and blue Porsche 911 GT3 RS race car on a wet track with a large yellow 911 behind it" },
  "corvette-sheet": { name: "corvette-sheet", w: 720, alt: "Design sheet of black Corvettes from 1960, 1970 and 2010 shown from several angles" },
  conference: { name: "conference", w: 1152, alt: "Ujwal and three other students posing together in front of a projected Esplorare Space slide in a lecture hall" },
};

function InterestImg({ id, className }: { id: string; className?: string }) {
  const i = interestImages[id];
  const base = `/photos/interests/${i.name}`;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${base}-${i.w}.webp`}
      srcSet={`${base}-640.webp 640w, ${base}-${i.w}.webp ${i.w}w`}
      sizes="(min-width: 1024px) 560px, 100vw"
      alt={i.alt}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}

function PairScene({ title, story, a, b, id }: { title: string; story: string; a: string; b: string; id: string }) {
  return (
    <section aria-labelledby={id} className="relative isolate overflow-hidden border-b border-ivory/15 bg-[#11100e]">
      <div aria-hidden="true" className="absolute inset-0 -z-10 scale-110 bg-cover bg-center opacity-20 blur-2xl" style={{ backgroundImage: `url('/photos/interests/${interestImages[a].name}-640.webp')` }} />
      <div className="mx-auto grid max-w-[1360px] gap-10 px-6 py-14 sm:px-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:items-center lg:gap-16 lg:py-20">
        <div>
          <h2 id={id} className="display text-[clamp(2.2rem,4.4vw,4.4rem)] leading-[1.02] text-ivory">{title}</h2>
          <p className="mt-5 max-w-[460px] text-lg leading-relaxed text-ivory-2">{story}</p>
        </div>
        <div className="grid grid-cols-2 items-center gap-3 sm:gap-6">
          <figure className="overflow-hidden rounded-md bg-black/40 lg:-rotate-1">
            <InterestImg id={a} className="h-auto max-h-[70svh] w-full object-contain" />
          </figure>
          <figure className="overflow-hidden rounded-md bg-black/40 lg:mt-12 lg:rotate-1">
            <InterestImg id={b} className="h-auto max-h-[70svh] w-full object-contain" />
          </figure>
        </div>
      </div>
    </section>
  );
}

function SingleScene({ id, title, story, image, align }: { id: string; title: string; story: string; image: string; align: "left" | "right" }) {
  return (
    <section aria-labelledby={id} className="relative isolate overflow-hidden border-b border-ivory/15 bg-[#0c0b09]">
      <div className={`mx-auto grid max-w-[1360px] items-center gap-8 px-6 py-14 sm:px-12 lg:grid-cols-2 lg:gap-16 lg:py-20 ${align === "right" ? "" : "lg:[&>*:first-child]:order-2"}`}>
        <div>
          <h2 id={id} className="display text-[clamp(2.4rem,5vw,5rem)] leading-none text-ivory">{title}</h2>
          <p className="mt-5 max-w-[480px] text-lg leading-relaxed text-ivory-2">{story}</p>
        </div>
        <figure className="mx-auto w-full max-w-[460px] overflow-hidden rounded-md lg:max-w-[520px]">
          <InterestImg id={image} className="h-auto max-h-[80svh] w-full object-contain" />
        </figure>
      </div>
    </section>
  );
}

function ConferenceScene({ id, title, story }: { id: string; title: string; story: string }) {
  return (
    <section aria-labelledby={id} className="relative isolate border-b border-ivory/15 bg-[#11100e]">
      <div className="mx-auto max-w-[1360px] px-6 py-14 sm:px-12 lg:py-20">
        <figure>
          <InterestImg id="conference" className="h-auto max-h-[80svh] w-full rounded-md object-cover object-center" />
          <figcaption className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <h2 id={id} className="display text-[clamp(2.4rem,5vw,5rem)] leading-none text-ivory">{title}</h2>
            <p className="max-w-[560px] text-lg leading-relaxed text-ivory-2">{story}</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

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
        <div className="mt-10 grid items-center gap-8 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16">
          <figure className="mx-auto w-full max-w-[320px]">
            <video
              controls
              muted
              loop
              playsInline
              preload="none"
              poster="/video/space-hall-poster.webp"
              aria-label="Walking through a space museum hall with satellite and rocket models in low evening light"
              className="aspect-[9/16] w-full rounded-md bg-black object-cover"
            >
              <source src="/video/space-hall.mp4" type="video/mp4" />
            </video>
            <figcaption className="mt-2 text-[13px] text-ivory-3">Walking the exhibit hall. Press play; it has no sound.</figcaption>
          </figure>
          <p className="max-w-[640px] text-lg leading-relaxed text-ivory-2">
            Standing beside a spacesuit makes me think about all the people and engineering decisions that go into keeping one person alive out there. The satellite model next to it was my first look at how a machine like that comes together. I wanted to know what each part did and how it all worked together, and I still approach new things that way.
          </p>
        </div>
      </div>
    </section>
  );
}

export function PhotoScenes() {
  return (
    <div aria-label="Personal stories">
      {scenes.map(([image, title, story], index) => image === "space-journey" ? (
        <SpaceJourney key={image} />
      ) : image === "book-portrait" ? (
        <SingleScene key={image} id={`scene-${index}`} title={title} story={story} image={image} align="right" />
      ) : image === "stories" ? (
        <PairScene key={image} id={`scene-${index}`} title={title} story={story} a="anime-art" b="film-still" />
      ) : image === "machines" ? (
        <PairScene key={image} id={`scene-${index}`} title={title} story={story} a="porsche-911" b="corvette-sheet" />
      ) : image === "conference" ? (
        <ConferenceScene key={image} id={`scene-${index}`} title={title} story={story} />
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

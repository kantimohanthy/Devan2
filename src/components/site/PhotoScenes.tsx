import { Parallax, Zoomable, ViewerProvider, AutoVideo } from "./PhotoMotion";

const scenes = [
  ["quiet", "Quiet enough to think", "I’m happy in my own company. A walk with my headphones or a few hours working alone gives me room to think. So does a quiet corner at the Taj Mahal, or a puppy held close."],
  ["book-portrait", "Books and low light", "Some of my best thinking happens with a book and almost no light."],
  ["stories", "Worlds I get lost in, stories I keep coming back to", "Anime and film make me curious about how a world works and why the people in it do what they do. Those are the characters worth thinking about, and the stories I keep coming back to."],
  ["machines", "Machines with a reason for every line", "A 911 GT3 RS is aerodynamics you can see. The Corvette redesign sheet is the same idea drawn as design thinking. I like things where form follows function."],
  ["space-journey", "Space Journey", ""],
  ["personal/legacy", "As long as I’m breathing, I can think.", "My cousin took me here during one of the hardest periods of my life. I stood with my arms wide and realized I could still choose what I did next. If I can think, I can find a way forward. This pose reminds me that the legacy I want comes from what I do next."],
];

type Img = { name: string; w: number; alt: string; src?: string };
const interestImages: Record<string, Img> = {
  "book-portrait": { name: "book-portrait", w: 1152, alt: "Ujwal in a dark room, face hidden behind an open book, lit by a thin shaft of light" },
  solitude: { name: "solitude", w: 706, src: "/photos/personal/solitude.webp", alt: "Ujwal smiling beside the Tiber at night in Rome, headphones around his neck, wearing a 'Melting under pressure' t-shirt" },
  taj: { name: "taj", w: 1126, alt: "Ujwal in a red striped shirt leaning on a railing in front of the Taj Mahal, looking away from the camera in soft morning haze" },
  pup: { name: "pup", w: 592, src: "/photos/interests/pup-592.webp", alt: "Ujwal in a grey jacket and striped beanie, looking down and holding a small cream-coloured puppy against his chest" },
  "comics-shop": { name: "comics-shop", w: 706, src: "/photos/personal/anime.webp", alt: "Ujwal seated in a chair surrounded by shelves of colourful comic books and manga" },
  "anime-art": { name: "anime-art", w: 1152, alt: "Black and white ink illustration of an anime swordsman with three swords and Japanese calligraphy" },
  "film-still": { name: "film-still", w: 736, alt: "A still from a film: a young man with curly hair standing at a bathroom sink" },
  "porsche-911": { name: "porsche-911", w: 1152, alt: "Poster of a white, red and blue Porsche 911 GT3 RS race car on a wet track with a large yellow 911 behind it" },
  "corvette-sheet": { name: "corvette-sheet", w: 720, alt: "Design sheet of black Corvettes from 1960, 1970 and 2010 shown from several angles" },
  conference: { name: "conference", w: 1152, alt: "Ujwal and three other students posing together in front of a projected Esplorare Space slide in a lecture hall" },
};

function InterestImg({ id, className }: { id: string; className?: string }) {
  const i = interestImages[id];
  const base = `/photos/interests/${i.name}`;
  const src = i.src ?? `${base}-${i.w}.webp`;
  const srcSet = i.src ? undefined : `${base}-640.webp 640w, ${base}-${i.w}.webp ${i.w}w`;
  return (
    <Zoomable src={src} alt={i.alt}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={src}
      srcSet={srcSet}
      sizes="(min-width: 1024px) 560px, 100vw"
      alt={i.alt}
      loading="lazy"
      decoding="async"
      className={className}
    />
    </Zoomable>
  );
}

function StoriesScene({ title, story, id }: { title: string; story: string; id: string }) {
  return (
    <section aria-labelledby={id} className="relative isolate overflow-hidden border-b border-ivory/15 bg-[#11100e]">
      <div aria-hidden="true" className="absolute inset-0 -z-10 scale-110 bg-cover bg-center opacity-20 blur-2xl" style={{ backgroundImage: "url('/photos/interests/anime-art-640.webp')" }} />
      <div className="mx-auto grid max-w-[1360px] gap-10 px-6 py-14 sm:px-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.7fr)] lg:items-center lg:gap-14 lg:py-20">
        <div>
          <h2 id={id} className="reveal-heading display text-[clamp(2.1rem,4vw,4rem)] leading-[1.04] text-ivory">{title}</h2>
          <p className="mt-5 max-w-[460px] text-lg leading-relaxed text-ivory-2">{story}</p>
        </div>
        <div className="grid grid-cols-2 items-center gap-3 sm:gap-5 lg:grid-cols-3">
          <Parallax strength={14} className="col-span-2 lg:col-span-1 lg:-rotate-1">
            <figure className="overflow-hidden rounded-md bg-black/40">
              <InterestImg id="comics-shop" className="h-auto max-h-[70svh] w-full object-cover" />
            </figure>
          </Parallax>
          <Parallax strength={26} className="lg:mt-10 lg:rotate-1">
            <figure className="overflow-hidden rounded-md bg-black/40">
              <InterestImg id="anime-art" className="h-auto max-h-[70svh] w-full object-contain" />
            </figure>
          </Parallax>
          <Parallax strength={38} className="lg:-mt-4 lg:-rotate-1">
            <figure className="overflow-hidden rounded-md bg-black/40">
              <InterestImg id="film-still" className="h-auto max-h-[70svh] w-full object-contain" />
            </figure>
          </Parallax>
        </div>
      </div>
    </section>
  );
}

function QuietScene({ title, story, id }: { title: string; story: string; id: string }) {
  return (
    <section aria-labelledby={id} className="relative isolate overflow-hidden border-b border-ivory/15 bg-[#0c0b09]">
      <div aria-hidden="true" className="absolute inset-0 -z-10 scale-110 bg-cover bg-center opacity-25 blur-2xl" style={{ backgroundImage: "url('/photos/interests/taj-640.webp')" }} />
      <div className="mx-auto grid max-w-[1360px] gap-10 px-6 py-14 sm:px-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.7fr)] lg:items-center lg:gap-14 lg:py-20">
        <div>
          <h2 id={id} className="reveal-heading display text-[clamp(2.4rem,5vw,5rem)] leading-none text-ivory">{title}</h2>
          <p className="mt-5 max-w-[460px] text-lg leading-relaxed text-ivory-2">{story}</p>
        </div>
        <div className="grid grid-cols-2 items-center gap-3 sm:gap-5 lg:grid-cols-3">
          <Parallax strength={26} className="col-span-2 lg:col-span-1 lg:-rotate-1">
            <figure className="overflow-hidden rounded-md bg-black/40">
              <InterestImg id="solitude" className="h-auto max-h-[70svh] w-full object-cover" />
            </figure>
          </Parallax>
          <Parallax strength={36} className="lg:mt-12 lg:rotate-1">
            <figure className="overflow-hidden rounded-md bg-black/40">
              <InterestImg id="taj" className="h-auto max-h-[70svh] w-full object-cover" />
            </figure>
          </Parallax>
          <Parallax strength={18} className="lg:-mt-6 lg:-rotate-1">
            <figure className="overflow-hidden rounded-md bg-black/40">
              <InterestImg id="pup" className="h-auto max-h-[70svh] w-full object-cover" />
            </figure>
          </Parallax>
        </div>
      </div>
    </section>
  );
}

function PairScene({ title, story, a, b, id }: { title: string; story: string; a: string; b: string; id: string }) {
  return (
    <section aria-labelledby={id} className="relative isolate overflow-hidden border-b border-ivory/15 bg-[#11100e]">
      <div aria-hidden="true" className="absolute inset-0 -z-10 scale-110 bg-cover bg-center opacity-20 blur-2xl" style={{ backgroundImage: `url('/photos/interests/${interestImages[a].name}-640.webp')` }} />
      <div className="mx-auto grid max-w-[1360px] gap-10 px-6 py-14 sm:px-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:items-center lg:gap-16 lg:py-20">
        <div>
          <h2 id={id} className="reveal-heading display text-[clamp(2.2rem,4.4vw,4.4rem)] leading-[1.02] text-ivory">{title}</h2>
          <p className="mt-5 max-w-[460px] text-lg leading-relaxed text-ivory-2">{story}</p>
        </div>
        <div className="grid grid-cols-2 items-center gap-3 sm:gap-6">
          <Parallax strength={18} className="lg:-rotate-1"><figure className="overflow-hidden rounded-md bg-black/40">
            <InterestImg id={a} className="h-auto max-h-[70svh] w-full object-contain" />
          </figure></Parallax>
          <Parallax strength={34} className="lg:mt-12 lg:rotate-1"><figure className="overflow-hidden rounded-md bg-black/40">
            <InterestImg id={b} className="h-auto max-h-[70svh] w-full object-contain" />
          </figure></Parallax>
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
          <h2 id={id} className="reveal-heading display text-[clamp(2.4rem,5vw,5rem)] leading-none text-ivory">{title}</h2>
          <p className="mt-5 max-w-[480px] text-lg leading-relaxed text-ivory-2">{story}</p>
        </div>
        <Parallax strength={24} className="mx-auto w-full max-w-[460px] lg:max-w-[520px]">
          <figure className="overflow-hidden rounded-md">
            <InterestImg id={image} className="h-auto max-h-[80svh] w-full object-contain" />
          </figure>
        </Parallax>
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
        <h2 id="space-journey" className="reveal-heading display text-[clamp(2.4rem,5vw,5rem)] leading-none text-ivory">
          What draws me to space
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6">
          {spaceJourney.map(([image, alt]) => (
            <Parallax key={image} strength={20}>
              <figure className="overflow-hidden rounded-md bg-black/40">
                <Zoomable src={`/photos/${image}.webp`} alt={alt}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/photos/${image}.webp`} alt={alt} loading="lazy" className="h-[60svh] max-h-[720px] w-full object-contain object-center sm:h-[70svh]" />
                </Zoomable>
              </figure>
            </Parallax>
          ))}
        </div>
        <Parallax strength={16} className="mt-4 sm:mt-6">
          <figure className="overflow-hidden rounded-md bg-black/40">
            <InterestImg id="conference" className="h-auto max-h-[75svh] w-full object-cover object-center" />
          </figure>
        </Parallax>

        <div className="mt-10 grid items-center gap-8 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16">
          <figure className="mx-auto w-full max-w-[320px]">
            <AutoVideo
              src="/video/space-hall.mp4"
              poster="/video/space-hall-poster.webp"
              label="Walking through a space museum hall with satellite and rocket models in low evening light"
              className="aspect-[9/16] w-full rounded-md bg-black object-cover"
            />
            <figcaption className="mt-2 text-[13px] text-ivory-3">Walking the exhibit hall. It plays silently while on screen; use the controls to pause.</figcaption>
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
    <ViewerProvider>
    <div aria-label="Personal stories">
      {scenes.map(([image, title, story], index) => image === "space-journey" ? (
        <SpaceJourney key={image} />
      ) : image === "book-portrait" ? (
        <SingleScene key={image} id={`scene-${index}`} title={title} story={story} image={image} align="right" />
      ) : image === "quiet" ? (
        <QuietScene key={image} id={`scene-${index}`} title={title} story={story} />
      ) : image === "stories" ? (
        <StoriesScene key={image} id={`scene-${index}`} title={title} story={story} />
      ) : image === "machines" ? (
        <PairScene key={image} id={`scene-${index}`} title={title} story={story} a="porsche-911" b="corvette-sheet" />
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
            <h2 id={`scene-${index}`} className="reveal-heading display text-[clamp(2.4rem,5vw,5rem)] leading-none text-ivory">{title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ivory-2">{story}</p>
          </div>
        </section>
      ) : (
        <section key={image} aria-labelledby={`scene-${index}`} className="relative isolate flex min-h-[78svh] items-end overflow-hidden border-b border-ivory/15 bg-[#11100e]">
          <div aria-hidden="true" className="absolute inset-0 -z-10 scale-110 bg-cover bg-center opacity-30 blur-2xl" style={{ backgroundImage: `url('/photos/${image}.webp')` }} />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-contain bg-top bg-no-repeat lg:bg-center" style={{ backgroundImage: `url('/photos/${image}.webp')` }} />
          <div className="w-full bg-gradient-to-t from-[#11100e] via-[#11100e]/90 to-transparent px-6 pb-10 pt-24 sm:px-12">
            <div className="mx-auto max-w-[1360px]">
              <h2 id={`scene-${index}`} className="reveal-heading display max-w-[760px] text-[clamp(2.4rem,5vw,5rem)] leading-none text-ivory">{title}</h2>
              <p className="mt-4 max-w-[560px] text-lg leading-relaxed text-ivory-2">{story}</p>
            </div>
          </div>
        </section>
      ))}
    </div>
    </ViewerProvider>
  );
}

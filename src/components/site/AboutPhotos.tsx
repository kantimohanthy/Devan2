const stories = [
  { image: "anime", title: "Anime and manga", alt: "Ujwal sitting with an open comic surrounded by illustrated covers", caption: "I love anime for the worlds it builds and the stories those worlds make possible.", width: 706, height: 942 },
  { image: "solitude", title: "Quiet time", alt: "Ujwal smiling beside a river at night with headphones around his neck", caption: "I’m happy in my own company. A quiet walk or a few hours working alone gives me room to think.", width: 706, height: 717 },
  { image: "transit", title: "On the move", alt: "Ujwal wearing headphones and sunglasses on a train", caption: "Give me a seat on public transport, my headphones, and a city to look out at.", width: 365, height: 457 },
  { image: "space", title: "Space", alt: "Ujwal standing beside a spacesuit display", caption: "I’m drawn to space because every mission starts with a question and depends on thousands of engineering decisions.", width: 592, height: 790 },
  { image: "satellite", title: "My first satellite model", alt: "A suspended spacecraft model with broad solar arrays", caption: "The first time I saw a satellite model up close, I wanted to understand how all those pieces worked together.", width: 706, height: 942 },
  { image: "legacy", title: "Arms wide", alt: "Ujwal with arms outstretched overlooking a forested valley", caption: "My signature pose. Out in nature, I think about what I want to build and what I want to leave behind.", width: 706, height: 779 },
];

export function AboutPhotos() {
  return (
    <section aria-labelledby="personal-photos-title" className="mt-10">
      <h3 id="personal-photos-title" className="display text-3xl text-ivory">Outside the work</h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {stories.map(({ image, title, alt, caption, width, height }) => (
          <figure key={image} className={`overflow-hidden rounded-xl border border-ivory/15 bg-[#181613] ${image === "legacy" ? "sm:col-span-2" : ""}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/photos/personal/${image}.webp`} alt={alt} width={width} height={height}
              loading="lazy" decoding="async"
              className={`w-full object-cover ${image === "legacy" ? "aspect-square object-bottom sm:aspect-[2/1]" : "aspect-[4/3] object-center"}`} />
            <figcaption className="px-4 py-3">
              <span className="block font-medium text-ivory">{title}</span>
              <span className="mt-1 block text-sm leading-relaxed text-ivory-2">{caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/**
 * Approved public photographs. Leave a slot empty until the file exists in
 * /public/photos/ and has been approved for publication (EXIF/GPS stripped,
 * no private documents or unapproved bystanders visible).
 * The site renders a designed fallback for every empty slot.
 */
export interface PhotoRecord {
  src: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position for the crop, e.g. "70% 25%". */
  focal: string;
  caption?: string;
}

export const photos: {
  portrait: PhotoRecord | null;
  about: PhotoRecord[];
} = {
  portrait: {
    src: "/photos/portrait-720.webp",
    srcSet:
      "/photos/portrait-480.webp 480w, /photos/portrait-720.webp 720w, /photos/portrait-1140.webp 1140w",
    sizes: "(min-width: 1024px) 300px, (min-width: 640px) 200px, 240px",
    alt: "Ujwal smiling at the camera and making a peace sign, wearing an olive hoodie and an event lanyard",
    width: 1140,
    height: 1520,
    focal: "70% 25%",
  },
  about: [
    {
      src: "/photos/about-working-1200.webp",
      srcSet:
        "/photos/about-working-640.webp 640w, /photos/about-working-1200.webp 1200w, /photos/about-working-1600.webp 1600w",
      sizes: "(min-width: 1024px) 520px, 100vw",
      alt: "Ujwal in profile, working at a laptop with a hand on his chin, backlit by a patterned window",
      width: 1200,
      height: 800,
      focal: "35% 40%",
      caption: "Working at Adria Hack, Sarajevo.",
    },
    {
      src: "/photos/about-wall-800.webp",
      srcSet:
        "/photos/about-wall-480.webp 480w, /photos/about-wall-800.webp 800w, /photos/about-wall-1200.webp 1200w",
      sizes: "(min-width: 1024px) 300px, 60vw",
      alt: "Ujwal seated at a table with a laptop and phone in front of a green wall covered in team photos",
      width: 800,
      height: 1200,
      focal: "30% 50%",
      caption: "Between sessions at Adria Hack.",
    },
  ],
};

/**
 * Optional looping hero background (silent, muted, decorative).
 * Leave null until a file exists in /public/video/. The hero then keeps its still-photo backdrop.
 * If the clip is an AI-generated illustration of Ujwal, keep it labelled as an illustration, not a photograph.
 */
export const heroVideo: { src: string; poster: string } | null = null;

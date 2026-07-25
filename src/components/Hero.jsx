import "./Hero.css";

/* The film is the whole hero, as on the reference homepage — it is captioned
   and paced, so nothing is laid over it and no headline band follows it. */
export default function Hero() {
  return (
    <section className="film" id="top">
      <video
        className="film__video"
        src="/media/brand/hero-film.mp4"
        poster="/media/brand/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="TerraOne brand film"
      />
    </section>
  );
}

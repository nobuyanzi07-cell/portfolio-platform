import './Hero.css';

/**
 * Hero
 * Static, content-driven intro section. No props — kept separate from
 * App purely so App.jsx isn't cluttered with long-form copy.
 */
export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <p className="mono hero__eyebrow">Selected work, 2022 — present</p>
        <h1 className="hero__headline">
          Work,
          <br />
          indexed.
        </h1>
        <p className="hero__sub">
          Fulltone studiomax is a one-person studio working in branding, web design,
          and packaging. Every project below is filed the way we filed it
          internally — searchable, tagged, numbered.
        </p>
      </div>
    </section>
  );
}

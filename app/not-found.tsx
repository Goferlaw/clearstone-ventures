import Link from "next/link";
export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">PAGE NOT FOUND</p>
        <h1>Let’s find your way.</h1>
        <p className="body-copy">
          This page is not available. Explore our investment strategies or
          return to the homepage.
        </p>
        <div className="button-row" style={{ marginTop: 30 }}>
          <Link href="/" className="button button-navy">
            Return home ↗
          </Link>
          <Link href="/strategies" className="button button-light">
            Explore strategies ↗
          </Link>
        </div>
      </div>
    </section>
  );
}

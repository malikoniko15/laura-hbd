import React, { useState } from "react";

const COUPONS = [
  {
    title: "Coffee Date",
    subtitle: "just the two of us",
    body: "Redeemable for one long, unhurried coffee. No phones, no rush — just us and every topic under the sun.",
    code: "SISTERS-01",
  },
  {
    title: "Movie Night",
    subtitle: "your pick, no complaints",
    body: "Blankets, snacks, and full permission to choose even the weepiest movie. I won't say a word about the time.",
    code: "SISTERS-02",
  },
  {
    title: "Shopping Day",
    subtitle: "and I carry the bags",
    body: "We hit every store on your list, I carry everything, and I give my honest (okay, mostly honest) opinion on it all.",
    code: "SISTERS-03",
  },
  {
    title: "Cooking Together",
    subtitle: "the family recipe",
    body: "Flour everywhere, music too loud, and the one dish that only ever turns out right when we make it together.",
    code: "SISTERS-04",
  },
  {
    title: "Babysitting Coupon",
    subtitle: "only ONE free pass",
    body: "Redeemable for one free evening or day: I take full care of the kids! We play, we eat, we chaos - while you get to sleep...",
    code: "SISTERS-05",
  },
  {
    title: "Late Night Talk",
    subtitle: "one free pass",
    body: "Redeemable anytime life gets too much. You get 100% permission to cry, complain, or just yap about literally anything...",
    code: "SISTERS-06",
  },
];

const TAGS = [
  "Safe Space",
  "Chosen Family",
  "Forever Duo",
  "Soul Sister",
  "Always Her",
  "Constant Support",
];

function CameraFrame({ rotate = 0, big = false }) {
  return (
    <div
      style={{
        background: "#fffdf7",
        padding: "10px 10px 30px",
        boxShadow: "0 14px 28px rgba(90,70,120,0.28)",
        transform: `rotate(${rotate}deg)`,
        width: big ? 220 : 148,
        display: "inline-block",
      }}
    >
      <div
        style={{
          width: "100%",
          height: big ? 250 : 156,
          background: "linear-gradient(135deg,#cbb8e6 0%,#a98fce 55%,#9377b8 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          color: "#fffdf7",
        }}
      >
        <span style={{ fontSize: "28px" }}>💖</span>
        <span style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Best Memories
        </span>
      </div>
    </div>
  );
}

function FlipCoupon({ coupon, tilt }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="coupon-scene"
      style={{ transform: `rotate(${tilt}deg)` }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div className={`coupon-card ${flipped ? "is-flipped" : ""}`}>
        <div className="coupon-face coupon-front">
          <p className="coupon-front-title">{coupon.title}</p>
          <p className="coupon-front-sub">{coupon.subtitle}</p>
          <span className="coupon-hint">click to open ✨</span>
        </div>
        <div className="coupon-face coupon-back">
          <p className="coupon-back-label">Love Coupon</p>
          <p className="coupon-back-title">{coupon.title}</p>
          <p className="coupon-back-body">{coupon.body}</p>
          <div className="coupon-back-footer">
            <span>{coupon.code}</span>
            <span>valid forever</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="lb-root">
      <style>{`
        .lb-root {
          --lavender: #b9a7d6;
          --lavender-deep: #8f74b8;
          --lavender-ink: #4a3b57;
          --tan: #c9a06f;
          --tan-deep: #a67e4f;
          --cream: #fbf6ec;
          --cream-deep: #f1e6d0;
          font-family: sans-serif;
          color: var(--lavender-ink);
          background: var(--cream);
          min-height: 100vh;
          overflow-x: hidden;
          padding-bottom: 40px;
        }
        .lb-root * { box-sizing: border-box; }

        .lb-topbar {
          position: sticky;
          top: 0;
          z-index: 40;
          padding: 14px 22px;
          background: var(--lavender);
          border-bottom: 3px solid var(--lavender-deep);
        }
        .lb-topbar-title {
          font-weight: 900;
          letter-spacing: 0.08em;
          color: var(--cream);
          font-size: 18px;
          text-transform: uppercase;
        }

        .lb-hero-wrap { padding: 30px 5vw; }
        .lb-ribbon {
          background: var(--tan);
          border-top: 3px solid var(--lavender-deep);
          border-bottom: 3px solid var(--lavender-deep);
          text-align: center;
          padding: 10px;
          font-weight: 900;
          font-size: clamp(20px, 4vw, 34px);
          color: var(--cream);
          margin: 0 -5vw;
        }

        .lb-hero-card {
          background: var(--cream);
          margin-top: 26px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(90,70,120,0.15);
          display: flex;
          flex-wrap: wrap;
          gap: 30px;
          justify-content: space-between;
          align-items: center;
          border: 2px solid var(--cream-deep);
          border-radius: 12px;
        }

        .lb-hero-title {
          font-size: clamp(32px, 5vw, 48px);
          color: var(--lavender-deep);
          margin: 0 0 14px;
        }
        .lb-hero-body { font-size: 15px; line-height: 1.6; max-width: 450px; }

        .lb-tagbar {
          background: var(--lavender);
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          padding: 14px 5vw;
          margin: 30px 0;
        }
        .lb-tag { font-size: 13px; font-weight: 700; color: var(--cream); }

        .lb-coupons-section { padding: 40px 5vw; text-align: center; }
        .lb-coupons-title { font-size: 32px; color: var(--lavender-deep); margin-bottom: 20px; }
        .lb-coupons-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; max-width: 900px; margin: 0 auto; }

        .coupon-scene { perspective: 1000px; height: 200px; cursor: pointer; }
        .coupon-card { position: relative; width: 100%; height: 100%; transition: transform 0.6s; transform-style: preserve-3d; }
        .coupon-card.is-flipped { transform: rotateY(180deg); }
        .coupon-face { position: absolute; inset: 0; backface-visibility: hidden; border-radius: 12px; padding: 20px; display: flex; flex-direction: column; justify-content: center; }
        .coupon-front { background: var(--cream); border: 2px solid var(--lavender-deep); text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
        .coupon-front-title { font-weight: 700; font-size: 18px; color: var(--lavender-deep); margin: 0 0 6px; }
        .coupon-front-sub { font-size: 14px; color: var(--tan-deep); margin: 0 0 10px; }
        .coupon-hint { font-size: 11px; text-transform: uppercase; color: #888; }
        .coupon-back { background: var(--lavender-deep); color: var(--cream); transform: rotateY(180deg); text-align: left; border: 2px dashed var(--tan); }
        .coupon-back-label { font-size: 10px; text-transform: uppercase; color: var(--tan); margin: 0 0 4px; }
        .coupon-back-title { font-weight: 700; font-size: 16px; margin: 0 0 6px; }
        .coupon-back-body { font-size: 12px; line-height: 1.4; margin: 0 0 10px; flex: 1; }
        .coupon-back-footer { display: flex; justify-content: space-between; font-size: 9px; text-transform: uppercase; border-top: 1px dashed rgba(255,255,255,0.3); padding-top: 6px; color: var(--tan); }
      `}</style>

      <div className="lb-topbar">
        <span className="lb-topbar-title">Happy Birthday, Laura</span>
      </div>

      <div className="lb-hero-wrap">
        <p className="lb-ribbon">HAPPY BIRTHDAY, LAURA! 🎀</p>

        <div className="lb-hero-card">
          <div>
            <p style={{ fontSize: "12px", textTransform: "uppercase", color: "var(--tan-deep)", fontWeight: 700 }}>
              older sister &middot; best friend &middot; partner in crime
            </p>
            <h1 className="lb-hero-title">The girl who proved "soulmates" are real 💕</h1>
            <p className="lb-hero-body">
              There are people who make the world quieter, and then there's you —
              the one who makes it louder, warmer, and worth every second.
            </p>
          </div>
          <div>
            <CameraFrame rotate={-4} />
          </div>
        </div>
      </div>

      <div className="lb-tagbar">
        {TAGS.map((t) => (
          <span className="lb-tag" key={t}>• {t}</span>
        ))}
      </div>

      <div className="lb-coupons-section">
        <h2 className="lb-coupons-title">Love Coupons 💌</h2>
        <p style={{ color: "var(--tan-deep)", marginBottom: "24px" }}>нажми на карточку, чтобы открыть!</p>
        <div className="lb-coupons-grid">
          {COUPONS.map((c, i) => (
            <FlipCoupon coupon={c} key={c.title} tilt={i % 2 === 0 ? -2 : 2} />
          ))}
        </div>
      </div>
    </div>
  );
}

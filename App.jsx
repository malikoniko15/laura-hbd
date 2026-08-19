import { useState, useRef, useEffect } from "react";

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

function CameraFrame({ rotate = 0, big = false, tone = "lavender", imgSrc }) {
  const tones = {
    lavender: "linear-gradient(135deg,#cbb8e6 0%,#a98fce 55%,#9377b8 100%)",
    tan: "linear-gradient(135deg,#e0c8a3 0%,#c9a06f 55%,#b08a58 100%)",
    cream: "linear-gradient(135deg,#f7f0df 0%,#ecdfc2 55%,#ddc99f 100%)",
  };
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
          background: tones[tone],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {imgSrc ? (
          <img
            src={imgSrc || "/sisters.jpg"}
            alt="photo"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <svg width="42%" height="42%" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.9 }}>
            <path
              d="M4 8a2 2 0 0 1 2-2h1.2l.9-1.5A1.5 1.5 0 0 1 9.4 4h5.2a1.5 1.5 0 0 1 1.3.75L16.8 6H18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z"
              stroke="#fffdf7"
              strokeWidth="1.4"
            />
            <circle cx="12" cy="13" r="3.4" stroke="#fffdf7" strokeWidth="1.4" />
          </svg>
        )}
      </div>
    </div>
  );
}

function FlowerMark({ size = 90, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={style}>
      <g fill="#cbb8e6" stroke="#9377b8" strokeWidth="1.5">
        <ellipse cx="50" cy="26" rx="14" ry="20" />
        <ellipse cx="74" cy="50" rx="20" ry="14" />
        <ellipse cx="50" cy="74" rx="14" ry="20" />
        <ellipse cx="26" cy="50" rx="20" ry="14" />
      </g>
      <circle cx="50" cy="50" r="12" fill="#e0c8a3" stroke="#b08a58" strokeWidth="1.5" />
      <path d="M50 62 Q46 78 40 92" stroke="#9c8672" strokeWidth="2" fill="none" />
    </svg>
  );
}

function OrnamentSeal() {
  return (
    <div className="lb-seal">
      <div className="lb-seal-inner">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3 L14 9 L20 9 L15 13 L17 19 L12 15 L7 19 L9 13 L4 9 L10 9 Z"
            fill="#c9a06f"
          />
        </svg>
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
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setFlipped((f) => !f)}
      aria-label={`Coupon: ${coupon.title}. Click to flip.`}
    >
      <div className={`coupon-card ${flipped ? "is-flipped" : ""}`}>
        <div className="coupon-face coupon-front">
          <p className="coupon-front-title">{coupon.title}</p>
          <p className="coupon-front-sub">{coupon.subtitle}</p>
          <span className="coupon-hint">click to open</span>
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
let audioRef = { current: null };

const [musicOn, setMusicOn] = useState(false);
const toneRef = useRef(null);

  useEffect(() => {
  audioRef.current = new Audio("/music.mp3");
  audioRef.current.loop = true;

  return () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };
}, []);

const toggleMusic = () => {
  if (!audioRef.current) return;

  if (musicOn) {
    audioRef.current.pause();
    setMusicOn(false);
  } else {
    audioRef.current.play().catch((e) => console.error("Audio error:", e));
    setMusicOn(true);
  }
};

  return (
    <div className="lb-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Kalam:wght@300;400;700&family=Playfair+Display:ital,wght@0,700;0,900;1,600&display=swap');

        .lb-root {
          --lavender: #b9a7d6;
          --lavender-deep: #8f74b8;
          --lavender-ink: #4a3b57;
          --tan: #c9a06f;
          --tan-deep: #a67e4f;
          --cream: #fbf6ec;
          --cream-deep: #f1e6d0;
          font-family: 'Kalam', cursive;
          color: var(--lavender-ink);
          background: var(--cream);
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
        }
        .lb-root * { box-sizing: border-box; }

        .lb-topbar {
          position: sticky;
          top: 0;
          z-index: 40;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 22px;
          background: var(--lavender);
          border-bottom: 3px solid var(--lavender-deep);
        }
        .lb-topbar-title {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          letter-spacing: 0.08em;
          color: var(--cream);
          font-size: clamp(14px, 2.4vw, 20px);
          text-transform: uppercase;
        }
        .music-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--cream);
          border: 2px solid var(--lavender-deep);
          border-radius: 999px;
          padding: 7px 16px;
          cursor: pointer;
          font-family: 'Kalam', cursive;
          font-size: 13px;
          font-weight: 700;
          color: var(--lavender-deep);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .music-btn:hover { transform: translateY(-2px) rotate(-1deg); box-shadow: 0 6px 14px rgba(0,0,0,0.15); }
        .music-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--tan);
          display: inline-block;
        }
        .music-dot.on { animation: pulse 1.4s ease-in-out infinite; background: var(--lavender-deep); }
        @keyframes pulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.6); opacity: 0.5; } }

        /* HERO */
        .lb-hero-wrap { position: relative; padding: 46px 5vw 60px; }
        .lb-ribbon {
          background: var(--tan);
          border-top: 3px solid var(--lavender-deep);
          border-bottom: 3px solid var(--lavender-deep);
          text-align: center;
          padding: 10px 10px;
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          letter-spacing: 0.05em;
          font-size: clamp(20px, 4vw, 34px);
          color: var(--cream);
          text-shadow: 3px 3px 0 var(--tan-deep);
          margin: 0 -5vw 0;
          transform: rotate(-0.4deg);
        }
        .lb-ribbon-sub {
          text-align: center;
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--lavender-ink);
          background: var(--lavender);
          padding: 6px;
          margin: 0 -5vw 0;
          font-weight: 700;
        }

        .lb-hero-card {
          background: var(--cream);
          margin-top: 26px;
          padding: clamp(28px, 5vw, 60px);
          box-shadow: 0 20px 50px rgba(90,70,120,0.3);
          position: relative;
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 40px;
          align-items: center;
          border: 2px solid var(--cream-deep);
        }
        @media (max-width: 820px) { .lb-hero-card { grid-template-columns: 1fr; } }

        .lb-hero-eyebrow {
          font-size: 12.5px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--tan-deep);
          margin-bottom: 10px;
          font-weight: 700;
        }
        .lb-hero-title {
          font-family: 'Caveat', cursive;
          font-size: clamp(38px, 6vw, 64px);
          line-height: 1.08;
          color: var(--lavender-deep);
          margin: 0 0 18px;
          transform: rotate(-0.6deg);
        }
        .lb-hero-title em { font-style: normal; color: var(--tan-deep); }
        .lb-hero-body {
          font-size: 16px;
          line-height: 1.75;
          color: var(--lavender-ink);
          max-width: 460px;
          margin-bottom: 22px;
        }

        .lb-seal {
          width: 74px;
          height: 74px;
          border-radius: 50%;
          background: var(--lavender);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 14px rgba(0,0,0,0.2);
          transform: rotate(-6deg);
        }
        .lb-seal-inner {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: var(--cream);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lb-hero-photos { position: relative; display: flex; justify-content: center; align-items: flex-start; gap: 18px; padding-top: 10px; }
        .lb-strip {
          background: var(--lavender-deep);
          padding: 10px 8px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          transform: rotate(5deg);
          box-shadow: 0 14px 26px rgba(0,0,0,0.25);
        }
        .lb-strip-frame { width: 76px; height: 60px; background: linear-gradient(135deg,#e0c8a3,#b08a58); }
        .lb-strip-frame:nth-child(2) { background: linear-gradient(135deg,#cbb8e6,#9377b8); }
        .lb-strip-frame:nth-child(3) { background: linear-gradient(135deg,#f7f0df,#ddc99f); }

        .lb-caption {
          font-family: 'Caveat', cursive;
          font-size: 16px;
          color: var(--lavender-deep);
          position: absolute;
          transform: rotate(-5deg);
        }

        /* TAG NAV */
        .lb-tagbar {
          background: var(--lavender);
          border-top: 3px solid var(--lavender-deep);
          border-bottom: 3px solid var(--lavender-deep);
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0;
          padding: 14px 5vw;
        }
        .lb-tag {
          font-size: 14px;
          font-weight: 700;
          color: var(--cream);
          padding: 4px 16px;
          border-right: 1px solid rgba(251,246,236,0.4);
          white-space: nowrap;
        }
        .lb-tag:nth-child(odd) { transform: rotate(-1.5deg); display: inline-block; }
        .lb-tag:nth-child(even) { transform: rotate(1.2deg); display: inline-block; }
        .lb-tag:last-child { border-right: none; }

        /* QUOTE */
        .lb-quote-section {
          background: linear-gradient(180deg, var(--cream) 0%, var(--cream-deep) 100%);
          text-align: center;
          padding: 54px 6vw 44px;
        }
        .lb-quote {
          font-family: 'Caveat', cursive;
          font-weight: 700;
          font-size: clamp(24px, 4vw, 38px);
          color: var(--lavender-ink);
          max-width: 780px;
          margin: 0 auto;
          line-height: 1.5;
        }
        .lb-quote .hl1 { color: var(--lavender-deep); }
        .lb-quote .hl2 { color: var(--tan-deep); }

        /* FILES SECTION */
        .lb-files-section { background: var(--lavender-deep); padding: 60px 6vw 80px; position: relative; }
        .lb-files-card {
          background: var(--cream);
          max-width: 900px;
          margin: 0 auto;
          padding: clamp(20px, 4vw, 44px);
          border-radius: 4px 26px 4px 26px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.35);
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 30px;
          position: relative;
        }
        @media (max-width: 760px) { .lb-files-card { grid-template-columns: 1fr; } }

        .lb-files-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 22px;
          color: var(--cream);
          background: var(--tan);
          display: inline-block;
          padding: 4px 14px;
          margin-bottom: 18px;
          transform: rotate(-1deg);
        }
        .lb-files-name {
          font-family: 'Caveat', cursive;
          font-size: 42px;
          color: var(--lavender-deep);
          margin: 0 0 4px;
          border-bottom: 2px dashed var(--tan);
          padding-bottom: 6px;
        }
        .lb-files-label {
          font-size: 11.5px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--tan-deep);
          font-weight: 700;
          margin-bottom: 18px;
        }
        .lb-files-body { font-size: 15px; line-height: 1.75; color: var(--lavender-ink); margin-bottom: 18px; }
        .lb-files-quality { font-family: 'Caveat', cursive; font-size: 24px; color: var(--lavender-deep); margin-bottom: 16px; }
        .lb-stats { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; }
        .lb-stat { background: var(--lavender); border-radius: 6px; padding: 10px 16px; text-align: center; min-width: 84px; }
        .lb-stat:nth-child(2) { transform: rotate(-1.4deg); }
        .lb-stat:nth-child(3) { transform: rotate(1.2deg); }
        .lb-stat b { display: block; font-family: 'Playfair Display', serif; font-size: 20px; color: var(--cream); }
        .lb-stat span { font-size: 9.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--cream-deep); }
        .lb-files-btn {
          background: var(--tan);
          border: 2px solid var(--tan-deep);
          color: var(--cream);
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 9px 18px;
          border-radius: 4px;
          display: inline-block;
          transform: rotate(-0.8deg);
        }

        /* COUPONS */
        .lb-coupons-section { background: var(--cream); padding: 70px 6vw 90px; text-align: center; }
        .lb-coupons-eyebrow { font-size: 12.5px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--tan-deep); font-weight: 700; margin-bottom: 10px; }
        .lb-coupons-title {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: clamp(28px, 4.6vw, 46px);
          color: var(--lavender-deep);
          text-shadow: 3px 3px 0 var(--lavender);
          margin: 0 0 8px;
        }
        .lb-coupons-sub { font-family: 'Caveat', cursive; font-size: 20px; color: var(--tan-deep); margin-bottom: 44px; }
        .lb-coupons-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 26px; max-width: 980px; margin: 0 auto; }

        .coupon-scene { perspective: 1400px; height: 220px; cursor: pointer; }
        .coupon-card { position: relative; width: 100%; height: 100%; transition: transform 0.7s cubic-bezier(0.4,0.2,0.2,1); transform-style: preserve-3d; }
        .coupon-card.is-flipped { transform: rotateY(180deg); }
        .coupon-face { position: absolute; inset: 0; backface-visibility: hidden; border-radius: 14px; padding: 24px 18px; display: flex; flex-direction: column; }
        .coupon-front { background: var(--cream); border: 2px solid var(--lavender-deep); align-items: center; justify-content: center; text-align: center; box-shadow: 0 10px 24px rgba(90,70,120,0.2); }
        .coupon-front-title { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 19px; color: var(--lavender-deep); margin: 0 0 4px; }
        .coupon-front-sub { font-family: 'Caveat', cursive; font-size: 17px; color: var(--tan-deep); margin: 0 0 14px; }
        .coupon-hint { font-size: 10.5px; letter-spacing: 0.08em; text-transform: uppercase; color: #9c8672; }
        .coupon-back { background: var(--lavender-deep); color: var(--cream); transform: rotateY(180deg); justify-content: center; text-align: left; border: 2px dashed var(--tan); box-shadow: 0 10px 24px rgba(0,0,0,0.3); }
        .coupon-back-label { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--tan); margin: 0 0 6px; }
        .coupon-back-title { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 17px; margin: 0 0 8px; }
        .coupon-back-body { font-size: 13px; line-height: 1.55; color: var(--cream-deep); margin: 0 0 12px; flex: 1; }
        .coupon-back-footer { display: flex; justify-content: space-between; font-size: 9.5px; letter-spacing: 0.08em; text-transform: uppercase; border-top: 1px dashed rgba(251,246,236,0.4); padding-top: 8px; color: var(--tan); }

        /* FOOTER */
        .lb-footer { background: var(--lavender-deep); padding: 70px 6vw 50px; text-align: center; position: relative; overflow: hidden; }
        .lb-footer-title {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: clamp(36px, 9vw, 92px);
          color: var(--cream);
          text-shadow: 4px 4px 0 var(--tan);
          margin: 0;
          letter-spacing: 0.02em;
          line-height: 1;
        }
        .lb-footer-sub { font-family: 'Caveat', cursive; font-size: clamp(19px, 2.6vw, 27px); color: var(--cream); margin: 22px auto 30px; max-width: 560px; line-height: 1.5; }
        .lb-footer-name { color: var(--tan); }
        .lb-footer-sign { font-family: 'Caveat', cursive; font-size: 22px; color: var(--cream-deep); }
      `}</style>

      <div className="lb-topbar">
        <span className="lb-topbar-title">Happy Birthday, Laura</span>
        <button className="music-btn" onClick={toggleMusic} aria-pressed={musicOn}>
          <span className={`music-dot ${musicOn ? "on" : ""}`} />
          {musicOn ? "music playing" : "play music"}
        </button>
      </div>

      <div className="lb-hero-wrap">
        <p className="lb-ribbon">HAPPY BIRTHDAY, LAURA!</p>
        <p className="lb-ribbon-sub">one of the closest people to me</p>

        <div className="lb-hero-card">
          <div>
            <p className="lb-hero-eyebrow">older sister &middot; best friend &middot; partner in crime</p>
            <h1 className="lb-hero-title">
              the girl who proved
              <br />
              <em>"soulmates"</em> are real
            </h1>
            <p className="lb-hero-body">
              There are people who make the world quieter, and then there's you —
              the one who makes it louder, warmer, and worth every second. Happy
              birthday to my sister, Laura Tateshka, the main character of my
              favorite memories.
            </p>
            <OrnamentSeal />
          </div>

          <div style={{ position: "relative" }}>
            <div className="lb-hero-photos">
              <CameraFrame rotate={-6} tone="lavender" />
              <div style={{ position: "relative" }}>
                <div className="lb-strip">
                  <div className="lb-strip-frame" />
                  <div className="lb-strip-frame" />
                  <div className="lb-strip-frame" />
                </div>
                <span className="lb-caption" style={{ top: -24, right: -6 }}>
                  our favorite memory
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lb-tagbar">
        {TAGS.map((t) => (
          <span className="lb-tag" key={t}>{t}</span>
        ))}
      </div>

      <div className="lb-quote-section">
        <p className="lb-quote">
          You're the <span className="hl1">main character</span> in my favorite stories
          <br />and <span className="hl2">the soul</span> behind every memory
        </p>
      </div>

      <div className="lb-files-section">
        <div className="lb-files-card">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, justifyContent: "center" }}>
            <CameraFrame rotate={3} big tone="tan" />
            <FlowerMark size={70} />
          </div>
          <div>
            <span className="lb-files-title">Sister Files</span>
            <h3 className="lb-files-name">Laura Tateshka</h3>
            <p className="lb-files-label">my person</p>
            <p className="lb-files-body">
              Even when life gets busy and miles or routines keep us apart, you know my silence just as well as my laugh. Thank you for being the one who turns our rare moments together into unforgettable core memories, and for being endlessly, wonderfully you. Happy Birthday!
            </p>
            <p className="lb-files-quality">pretty vibes, kind heart</p>
            <div className="lb-stats">
              <div className="lb-stat"><b>&infin;</b><span>memories</span></div>
              <div className="lb-stat"><b>100%</b><span>real one</span></div>
              <div className="lb-stat"><b>10/10</b><span>vibe check</span></div>
            </div>
            <span className="lb-files-btn">stay smiling</span>
          </div>
        </div>
      </div>

      <div className="lb-coupons-section">
        <p className="lb-coupons-eyebrow">made just for you</p>
        <h2 className="lb-coupons-title">Love Coupons</h2>
        <p className="lb-coupons-sub">click a card to open it</p>
        <div className="lb-coupons-grid">
          {COUPONS.map((c, i) => (
            <FlipCoupon coupon={c} key={c.title} tilt={i % 2 === 0 ? -1 : 1} />
          ))}
        </div>
      </div>

      <div className="lb-footer">
        <h2 className="lb-footer-title">FOREVER FAVORITE</h2>
        <p className="lb-footer-sub">
          Happy birthday, <span className="lb-footer-name">Laura</span>. May this
          year bring you as much joy as you've given me all these years.
        </p>
        <p className="lb-footer-sign">with love, your little sister Malika</p>
      </div>
    </div>
  );
}
export default LauraBirthdaySite;

const styleElement = document.createElement('style');
styleElement.textContent = `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
        --ice-blue: #7dd3fc;
        --ice-grey: #94a3b8;
    }
    html, body { height: 100%; overflow: hidden; }
    body {
        min-height: 100vh;
        background: #05020d;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 40px;
        font-family: 'Segoe UI', system-ui, sans-serif;
        padding: 20px;
        perspective: 1400px;
    }

    /* ФОН ТА ПАРАЛАКС */
    .parallax-bg {
        position: fixed;
        inset: -12%;
        z-index: 0;
        pointer-events: none;
        overflow: hidden;
        transform: translateZ(0);
    }
    .layer-image {
        position: absolute;
        inset: 0;
        background: url('background.jpg') center/cover no-repeat;
        transform: scale(1.18);
        will-change: transform;
        filter: brightness(0.6) saturate(0.8) contrast(1.1) hue-rotate(-15deg);
    }
    .layer-nebula {
        position: absolute;
        inset: 0;
        background:
            radial-gradient(circle at 20% 30%, rgba(148,163,184,0.3) 0%, transparent 45%),
            radial-gradient(circle at 80% 70%, rgba(56,189,248,0.2) 0%, transparent 45%),
            radial-gradient(circle at 50% 50%, rgba(15,23,42,0.4) 0%, transparent 55%);
        filter: blur(50px);
        mix-blend-mode: screen;
        animation: nebulaPulse 18s ease-in-out infinite alternate;
    }
    @keyframes nebulaPulse { 100% { opacity: 0.95; } }
    .layer-stars {
        position: absolute;
        inset: 0;
        background-image:
            radial-gradient(1.4px 1.4px at 20px 30px, #fff, transparent),
            radial-gradient(1px 1px at 40px 70px, #fff, transparent),
            radial-gradient(1.2px 1.2px at 90px 40px, #e0d7ff, transparent);
        background-size: 320px 160px;
        opacity: 0.6;
        animation: starsTwinkle 4s ease-in-out infinite;
        mix-blend-mode: screen;
    }
    @keyframes starsTwinkle { 50% { opacity: 0.8; } }
    .layer-orbits {
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .orbit {
        position: absolute;
        border-radius: 50%;
        border: 1px solid rgba(125,211,252,0.15);
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
    }
    .orbit.o1 { width: 700px; height: 700px; animation: spinSlow 40s linear infinite; border-color: rgba(148,163,184,0.18); }
    .orbit.o2 { width: 1000px; height: 1000px; animation: spinSlow 60s linear infinite reverse; border-color: rgba(56,189,248,0.12); }
    .orbit.o3 { width: 1300px; height: 1300px; animation: spinSlow 90s linear infinite; border-color: rgba(125,211,252,0.1); }
    .orbit::after {
        content: '';
        position: absolute;
        width: 7px; height: 7px;
        border-radius: 50%;
        top: -3.5px; left: 50%;
        background: var(--ice-blue);
        box-shadow: 0 0 18px 3px var(--ice-blue);
    }
    @keyframes spinSlow { 100% { transform: translate(-50%, -50%) rotate(360deg); } }
    #snowCanvas { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 2; }
    .layer-vignette {
        position: absolute;
        inset: 0;
        background: radial-gradient(ellipse at center, transparent 30%, rgba(5,10,20,0.6) 75%, rgba(5,10,20,0.9) 100%);
        z-index: 3;
    }

    /* ПАДАЮЧІ ФРАЗИ */
    .layer-phrases { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 4; }
    .falling-phrase {
        position: absolute;
        top: -120px;
        font-family: 'Playfair Display', Georgia, serif;
        font-style: italic;
        font-weight: 900;
        font-size: clamp(2rem, 4.5vw, 3.8rem);
        letter-spacing: 2px;
        white-space: nowrap;
        background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 25%, #bae6fd 50%, #7dd3fc 75%, #ffffff 100%);
        background-size: 300% 300%;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        filter: drop-shadow(0 0 12px rgba(186,230,253,0.9)) drop-shadow(0 0 28px rgba(56,189,248,0.7));
        animation: phraseFall var(--fall-duration, 8s) linear forwards, phraseShine 3s linear infinite;
        opacity: 0;
    }
    @keyframes phraseFall {
        0%   { transform: translate3d(0,0,0) rotate(var(--rot-start,-4deg)) scale(0.7); opacity: 0; }
        10%  { opacity: 1; transform: translate3d(0,8vh,0) rotate(var(--rot-start,-4deg)) scale(1); }
        85%  { opacity: 1; }
        100% { transform: translate3d(var(--drift,40px),110vh,0) rotate(var(--rot-end,4deg)) scale(1); opacity: 0; }
    }
    @keyframes phraseShine { 100% { background-position: 300% 50%; } }

    /* ІНПУТ */
    .input-wrapper {
        width: 100%;
        max-width: 500px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        z-index: 10;
        position: relative;
    }
    .question-input {
        width: 90%;
        padding: 16px 26px;
        font-size: 1.1rem;
        text-align: center;
        border: 2px solid rgba(125,211,252,0.3);
        border-radius: 40px;
        background: rgba(15,23,42,0.7);
        color: #f0f9ff;
        font-weight: 600;
        outline: none;
        backdrop-filter: blur(12px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.6), 0 0 40px rgba(56,189,248,0.15);
        transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .question-input:focus {
        background: rgba(15,23,42,0.9);
        border-color: #38bdf8;
        box-shadow: 0 0 0 4px rgba(56,189,248,0.15), 0 0 40px rgba(56,189,248,0.4);
        transform: translateY(-2px) scale(1.02);
    }
    .question-input.error { border-color: #ef4444; animation: shakeInput 0.4s; }
    .error-text {
        color: #fca5a5;
        font-size: 0.85rem;
        height: 18px;
        visibility: hidden;
    }
    .error-text.active { visibility: visible; }
    @keyframes shakeInput { 25%, 75% { transform: translateX(-8px); } }

    /* ЛАПКА */
    .magic-ball-wrapper {
        position: relative;
        width: 290px;
        height: 290px;
        display: flex;
        justify-content: center;
        align-items: center;
        perspective: 1000px;
        z-index: 10;
    }
    .ball-aura {
        position: absolute;
        width: 380px; height: 380px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(148,163,184,0.3) 0%, rgba(56,189,248,0.15) 40%, transparent 70%);
        filter: blur(30px);
        animation: auraPulse 4s ease-in-out infinite;
        pointer-events: none;
    }
    @keyframes auraPulse { 50% { transform: scale(1.15); opacity: 1; } }
    .ball-shadow {
        position: absolute;
        bottom: -20px;
        width: 240px; height: 26px;
        background: radial-gradient(ellipse at center, rgba(148,163,184,0.4) 0%, transparent 70%);
        filter: blur(4px);
    }
    .magic-ball {
        width: 100%; height: 100%;
        position: relative;
        cursor: pointer;
        user-select: none;
        transform-style: preserve-3d;
        transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .paw-svg {
        width: 100%; height: 100%;
        filter: drop-shadow(0 10px 30px rgba(100,116,139,0.5)) drop-shadow(0 0 40px rgba(56,189,248,0.4));
    }
    .paw-inner-shine { animation: pawShine 4s ease-in-out infinite; }
    @keyframes pawShine { 50% { opacity: 0.95; } }
    .magic-ball:hover:not(.is-spinning) { transform: scale(1.05); }
    .magic-ball:active:not(.is-spinning) { transform: scale(0.98); }
    .answer-display {
        position: absolute;
        top: 55%; left: 50%;
        transform: translate(-50%, -50%);
        color: #000000; /* ЧОРНИЙ КОЛІР */
        font-size: 1.4rem;
        font-weight: 800;
        text-shadow: 0 2px 10px rgba(255, 255, 255, 0.5); /* Легка біла тінь для читабельності на темній лапці */
        text-align: center;
        pointer-events: none;
        z-index: 2;
        width: 90%;
    }
    .answer-display.reveal { animation: answerReveal 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
    @keyframes answerReveal {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); filter: blur(20px); }
        100% { opacity: 1; transform: translate(-50%, -50%) scale(1); filter: blur(0px); }
    }
    .magic-ball.is-spinning { pointer-events: none; }
    .magic-ball.spin-1 { animation: ballSuck 0.18s ease-in forwards; }
    @keyframes ballSuck { 100% { transform: scale(0.92) rotate(-15deg); } }
    .magic-ball.spin-2 { animation: ballSpin 0.85s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards; }
    @keyframes ballSpin {
        0% { transform: scale(0.92) rotateY(0deg); }
        50% { transform: scale(1.1) rotateY(540deg); }
        100% { transform: scale(1) rotateY(1080deg); }
    }
    .magic-ball.spin-3 { animation: ballReveal 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
    @keyframes ballReveal { 40% { transform: scale(1.18) rotateY(1080deg); } 100% { transform: scale(1) rotateY(1080deg); } }

    .magic-ring {
        position: absolute;
        width: 290px; height: 290px;
        border-radius: 50%;
        border: 2px solid rgba(148,163,184,0.8);
        top: 50%; left: 50%;
        transform: translate(-50%, -50%) scale(0.8);
        opacity: 0;
        pointer-events: none;
    }
    .magic-ring.active { animation: ringExpand 1s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
    @keyframes ringExpand { 0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.9; } 100% { transform: translate(-50%, -50%) scale(2.4); opacity: 0; } }
    .ring-2 { border-color: rgba(56,189,248,0.8); }
    .ring-3 { border-color: rgba(203,213,225,0.8); }
    .ball-flash {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(186,230,253,0.8) 40%, transparent 70%);
        opacity: 0;
        pointer-events: none;
        z-index: 5;
    }
    .ball-flash.active { animation: flashBang 0.55s ease-out forwards; }
    @keyframes flashBang { 25% { opacity: 1; transform: scale(1.3); } 100% { opacity: 0; transform: scale(1.8); } }

    /* БАНЕР */
    .intro-banner {
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: radial-gradient(circle at 50% 50%, rgba(15,23,42,0.9) 0%, rgba(5,10,20,0.98) 70%);
        overflow: hidden;
        animation: bannerBgIn 0.9s ease forwards;
    }
    @keyframes bannerBgIn { 100% { opacity: 1; } }
    .intro-banner::before {
        content: '';
        position: absolute;
        width: 200%; height: 200%;
        top: -50%; left: -50%;
        background: conic-gradient(from 0deg, transparent 0%, rgba(148,163,184,0.25) 15%, transparent 30%, rgba(56,189,248,0.25) 50%, transparent 65%);
        animation: bannerRotate 6s linear infinite;
        filter: blur(40px);
    }
    @keyframes bannerRotate { 100% { transform: rotate(360deg); } }
    .intro-content {
        position: relative;
        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 24px;
        animation: introContentBreath 3s ease-in-out infinite;
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    @keyframes introContentBreath { 50% { transform: scale(1.02); } }
    .intro-line {
        width: 0; height: 2px;
        background: linear-gradient(90deg, transparent, rgba(148,163,184,0.8), transparent);
        animation: lineGrow 1.2s ease 0.4s forwards;
    }
    @keyframes lineGrow { 100% { width: 260px; } }
    .intro-title {
        font-family: 'Playfair Display', Georgia, serif;
        font-style: italic;
        font-weight: 900;
        font-size: clamp(2.2rem, 7vw, 5.5rem);
        letter-spacing: 3px;
        white-space: nowrap;
        display: flex;
    }
    .intro-letter {
        display: inline-block;
        background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 30%, #bae6fd 55%, #7dd3fc 80%, #ffffff 100%);
        background-size: 300% 300%;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        filter: drop-shadow(0 0 12px rgba(186,230,253,0.9));
        animation: letterDrop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) backwards, letterShine 3s linear infinite;
    }
    @keyframes letterDrop { 0% { opacity: 0; transform: translateY(-80px) scale(0.3); filter: blur(20px); } 100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); } }
    @keyframes letterShine { 100% { background-position: 300% 50%; } }
    .intro-subtitle {
        font-size: clamp(0.9rem, 1.6vw, 1.15rem);
        letter-spacing: 8px;
        text-transform: uppercase;
        color: rgba(203,213,225,0.85);
        opacity: 0;
        animation: subtitleIn 1s ease 1.4s forwards;
    }
    @keyframes subtitleIn { 100% { opacity: 1; letter-spacing: 8px; } }
    .enter-btn {
        margin-top: 20px;
        padding: 14px 40px;
        font-size: 1rem;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: #f0f9ff;
        background: rgba(15,23,42,0.8);
        border: 2px solid rgba(125,211,252,0.6);
        border-radius: 40px;
        cursor: pointer;
        opacity: 0;
        animation: btnIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 2.5s forwards;
        transition: all 0.3s ease;
    }
    .enter-btn:hover { background: rgba(56,189,248,0.2); border-color: #38bdf8; transform: scale(1.05); }
    @keyframes btnIn { 100% { opacity: 1; transform: translateY(0); } }
    .intro-banner.leaving { animation: bannerFadeOut 1.1s ease forwards; }
    @keyframes bannerFadeOut { 100% { opacity: 0; transform: translateY(-100%); } }
    .intro-banner.leaving .intro-content { opacity: 0; transform: translateY(-40px); }

    /* ПЛЕЄР */
    .music-player {
        position: fixed;
        right: 22px; bottom: 22px;
        z-index: 100;
        width: 340px;
        background: rgba(15,23,42,0.75);
        backdrop-filter: blur(24px) saturate(160%);
        border-radius: 22px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        box-shadow: 0 20px 50px rgba(0,0,0,0.7), 0 0 40px rgba(56,189,248,0.2);
        opacity: 0;
        transform: translateY(30px) scale(0.9);
        pointer-events: none;
        transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .music-player.visible { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
    .music-player::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 22px;
        padding: 1.5px;
        background: linear-gradient(135deg, rgba(148,163,184,0.7), rgba(56,189,248,0.4), rgba(125,211,252,0.7));
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
    }
    .mp-top-bar { display: flex; align-items: center; justify-content: space-between; }
    .mp-label { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 2px; color: rgba(186,230,253,0.75); }
    .mp-equalizer { display: flex; align-items: flex-end; gap: 2px; height: 18px; width: 26px; margin-left: auto; margin-right: 10px; }
    .mp-eq-bar { width: 3px; height: 3px; background: linear-gradient(to top, var(--ice-grey), var(--ice-blue)); transition: height 0.15s; }
    .music-player.playing .mp-eq-bar { animation: eqDance 0.9s ease-in-out infinite; }
    .mp-eq-bar:nth-child(2) { animation-delay: 0.1s; animation-duration: 0.9s; }
    .mp-eq-bar:nth-child(3) { animation-delay: 0.25s; animation-duration: 0.6s; }
    .mp-eq-bar:nth-child(4) { animation-delay: 0.15s; animation-duration: 1s; }
    .mp-eq-bar:nth-child(5) { animation-delay: 0.3s; animation-duration: 0.8s; }
    @keyframes eqDance { 50% { height: 18px; opacity: 1; } }
    .mp-toggle {
        background: rgba(15,23,42,0.7);
        border: 1px solid rgba(125,211,252,0.25);
        color: #e2e8f0;
        width: 26px; height: 26px;
        border-radius: 50%;
        display: flex; justify-content: center; align-items: center;
        cursor: pointer;
        transition: all 0.25s;
    }
    .mp-toggle svg { width: 14px; height: 14px; fill: currentColor; transition: transform 0.3s; }
    .mp-cover-wrap {
        width: 100%;
        aspect-ratio: 1 / 1;
        border-radius: 14px;
        overflow: hidden;
        background: #0f172a;
        box-shadow: 0 10px 30px rgba(0,0,0,0.6);
    }
    .mp-cover-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.6s; }
    .music-player.playing .mp-cover-img { animation: coverBreath 6s ease-in-out infinite; }
    @keyframes coverBreath { 50% { transform: scale(1.04); } }
    .mp-info { display: flex; flex-direction: column; gap: 2px; }
    .mp-title { font-size: 1rem; font-weight: 700; color: #f0f9ff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .music-player.collapsed .mp-body, .music-player.collapsed .mp-cover-wrap { display: none; }
    .music-player.collapsed { width: 240px; padding: 12px 16px; }
    .music-player.collapsed .mp-toggle svg { transform: rotate(180deg); }
    .mp-body { display: flex; flex-direction: column; gap: 14px; }
    .mp-progress-wrap { display: flex; flex-direction: column; gap: 6px; }
    .mp-progress { position: relative; height: 6px; background: rgba(15,23,42,0.8); border-radius: 3px; overflow: hidden; cursor: pointer; }
    .mp-progress-fill { position: absolute; inset: 0; width: 0%; background: linear-gradient(90deg, var(--ice-grey), var(--ice-blue)); transition: width 0.1s linear; }
    .mp-times { display: flex; justify-content: space-between; font-size: 0.7rem; color: rgba(186,230,253,0.85); }
    .mp-controls { display: flex; align-items: center; justify-content: center; gap: 12px; }
    .mp-btn {
        background: rgba(15,23,42,0.7);
        border: 1px solid rgba(125,211,252,0.25);
        color: #e2e8f0;
        width: 38px; height: 38px;
        border-radius: 50%;
        display: flex; justify-content: center; align-items: center;
        cursor: pointer;
        transition: all 0.25s;
    }
    .mp-btn svg { width: 16px; height: 16px; fill: currentColor; }
    .mp-btn.main {
        width: 54px; height: 54px;
        background: linear-gradient(135deg, var(--ice-blue), #38bdf8);
        border: none;
        color: #0f172a;
    }
    .mp-btn.main svg { width: 24px; height: 24px; }
    .mp-volume { display: flex; align-items: center; gap: 8px; margin-top: 4px; }
    .mp-volume-btn { background: none; border: none; color: rgba(186,230,253,0.9); cursor: pointer; }
    .mp-volume-btn svg { width: 18px; height: 18px; fill: currentColor; }
    .mp-volume-slider { position: relative; flex: 1; height: 18px; display: flex; align-items: center; cursor: pointer; }
    .mp-volume-track { position: absolute; inset: 0; margin: auto 0; height: 4px; background: rgba(15,23,42,0.85); border-radius: 2px; }
    .mp-volume-fill { position: absolute; inset: 0; margin: auto 0; height: 4px; border-radius: 2px; background: linear-gradient(90deg, var(--ice-grey), var(--ice-blue)); width: 70%; }
    .mp-volume-thumb { position: absolute; top: 50%; left: 70%; width: 12px; height: 12px; border-radius: 50%; background: #fff; transform: translate(-50%, -50%); pointer-events: none; }
    .mp-volume-value { font-size: 0.7rem; color: rgba(186,230,253,0.85); width: 30px; text-align: right; }

    @media (max-width: 480px) {
        .input-wrapper { max-width: 100%; }
        .magic-ball-wrapper { width: 230px; height: 230px; }
        .ball-aura { width: 300px; height: 300px; }
        .music-player { width: calc(100% - 24px); right: 12px; bottom: 12px; left: 12px; }
    }
`;
document.head.appendChild(styleElement);

// ========== ІНІЦІАЛІЗАЦІЯ АУДІО ==========
const bgAudio = new Audio('music.mp3');
bgAudio.loop = true;
bgAudio.volume = parseFloat(localStorage.getItem('mp-volume') ?? '0.7');

// ========== БАНЕР ==========
const introBanner = document.createElement('div');
introBanner.className = 'intro-banner';

const introContent = document.createElement('div');
introContent.className = 'intro-content';

const introLineTop = document.createElement('div');
introLineTop.className = 'intro-line';

const introTitle = document.createElement('div');
introTitle.className = 'intro-title';
const INTRO_TEXT = 'Давиденко найкращий';
for (let i = 0; i < INTRO_TEXT.length; i++) {
    const span = document.createElement('span');
    span.className = 'intro-letter';
    span.textContent = INTRO_TEXT[i] === ' ' ? '\u00A0' : INTRO_TEXT[i];
    span.style.animationDelay = `${0.4 + i * 0.055}s`;
    introTitle.appendChild(span);
}

const introSubtitle = document.createElement('div');
introSubtitle.className = 'intro-subtitle';
introSubtitle.textContent = 'Магічна лапка';

const introLineBottom = document.createElement('div');
introLineBottom.className = 'intro-line';

const enterBtn = document.createElement('button');
enterBtn.className = 'enter-btn';
enterBtn.textContent = 'Увійти';

introContent.append(introLineTop, introTitle, introSubtitle, introLineBottom, enterBtn);
introBanner.appendChild(introContent);
document.body.appendChild(introBanner);

// ========== ПАРАЛАКС ==========
const parallaxBg = document.createElement('div');
parallaxBg.className = 'parallax-bg';

const layerImage = document.createElement('div');
layerImage.className = 'layer-image';

const layerNebula = document.createElement('div');
layerNebula.className = 'layer-nebula';

const layerStars = document.createElement('div');
layerStars.className = 'layer-stars';

const layerOrbits = document.createElement('div');
layerOrbits.className = 'layer-orbits';
['o1', 'o2', 'o3'].forEach(c => {
    const o = document.createElement('div');
    o.className = `orbit ${c}`;
    layerOrbits.appendChild(o);
});

const snowCanvas = document.createElement('canvas');
snowCanvas.id = 'snowCanvas';

const layerPhrases = document.createElement('div');
layerPhrases.className = 'layer-phrases';

const layerVignette = document.createElement('div');
layerVignette.className = 'layer-vignette';

parallaxBg.append(layerImage, layerNebula, layerStars, layerOrbits, snowCanvas, layerPhrases, layerVignette);
document.body.appendChild(parallaxBg);

// ========== ВВІД ТА ЛАПКА ==========
const inputWrapper = document.createElement('div');
inputWrapper.className = 'input-wrapper';

const questionInput = document.createElement('input');
questionInput.type = 'text';
questionInput.className = 'question-input';
questionInput.placeholder = 'Чи здійсниться моя мрія?';

const errorText = document.createElement('span');
errorText.className = 'error-text';
errorText.textContent = 'Введіть запитання!';

inputWrapper.append(questionInput, errorText);

const ballWrapper = document.createElement('div');
ballWrapper.className = 'magic-ball-wrapper';

const ballAura = document.createElement('div');
ballAura.className = 'ball-aura';

const ballShadow = document.createElement('div');
ballShadow.className = 'ball-shadow';

const magicBall = document.createElement('div');
magicBall.className = 'magic-ball';

magicBall.innerHTML = `
<svg class="paw-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <radialGradient id="pg" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stop-color="#f8fafc"/><stop offset="40%" stop-color="#cbd5e1"/>
            <stop offset="80%" stop-color="#64748b"/><stop offset="100%" stop-color="#334155"/>
        </radialGradient>
        <radialGradient id="tg" cx="40%" cy="30%" r="80%">
            <stop offset="0%" stop-color="#f8fafc"/><stop offset="55%" stop-color="#bae6fd"/>
            <stop offset="100%" stop-color="#38bdf8"/>
        </radialGradient>
        <radialGradient id="sh" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(255,255,255,0.9)"/><stop offset="100%" stop-color="rgba(255,255,255,0)"/>
        </radialGradient>
    </defs>
    <ellipse cx="100" cy="130" rx="62" ry="52" fill="url(#pg)"/>
    <ellipse cx="100" cy="130" rx="55" ry="46" fill="url(#sh)" class="paw-inner-shine"/>
    <ellipse cx="82" cy="108" rx="30" ry="20" fill="url(#sh)" opacity="0.9"/>
    <ellipse cx="100" cy="168" rx="40" ry="12" fill="rgba(0,0,0,0.4)"/>
    <ellipse cx="40" cy="70" rx="22" ry="26" fill="url(#tg)" transform="rotate(-25 40 70)"/>
    <ellipse cx="75" cy="42" rx="21" ry="24" fill="url(#tg)" transform="rotate(-8 75 42)"/>
    <ellipse cx="125" cy="42" rx="21" ry="24" fill="url(#tg)" transform="rotate(8 125 42)"/>
    <ellipse cx="160" cy="70" rx="22" ry="26" fill="url(#tg)" transform="rotate(25 160 70)"/>
</svg>
`;

const ballFlash = document.createElement('div');
ballFlash.className = 'ball-flash';

const answerDisplay = document.createElement('div');
answerDisplay.className = 'answer-display';
answerDisplay.textContent = 'Так';

magicBall.append(ballFlash, answerDisplay);

ballWrapper.append(ballAura, ballShadow, magicBall);
document.body.append(inputWrapper, ballWrapper);

// ========== СНІГ ==========
const ctx = snowCanvas.getContext('2d');
let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
let snowflakes = [];

function initSnow() {
    const rect = parallaxBg.getBoundingClientRect();
    W = rect.width; H = rect.height;
    snowCanvas.width = W * dpr; snowCanvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    snowflakes = Array.from({ length: Math.max(80, Math.min(260, Math.floor(W * H / 9000))) }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        r: 0.8 + Math.random() * 3.2, d: 0.3 + Math.random() * 0.7,
        vy: 0.3 + Math.random() * 0.9, vx: (Math.random() - 0.5) * 0.6,
        sw: Math.random() * Math.PI * 2, ss: 0.008 + Math.random() * 0.02,
        sa: 0.3 + Math.random() * 0.9, op: 0.35 + Math.random() * 0.65
    }));
}
initSnow();
window.addEventListener('resize', initSnow);

// ========== ПАРАЛАКС ==========
const layers = [
    { el: layerImage, f: 22, base: 'scale(1.18)' },
    { el: layerNebula, f: 30, base: '' },
    { el: layerStars, f: 45, base: '' },
    { el: layerOrbits, f: 55, base: '' }
];
let tx = 0, ty = 0, cx = 0, cy = 0;

document.addEventListener('mousemove', e => {
    tx = (e.clientX / window.innerWidth - 0.5) * 2;
    ty = (e.clientY / window.innerHeight - 0.5) * 2;
});
document.addEventListener('mouseleave', () => { tx = 0; ty = 0; });
window.addEventListener('deviceorientation', e => {
    if (e.gamma !== null && e.beta !== null) {
        tx = Math.max(-1, Math.min(1, e.gamma / 45));
        ty = Math.max(-1, Math.min(1, (e.beta - 45) / 45));
    }
});

// ========== РЕНДЕР ==========
function render() {
    cx += (tx - cx) * 0.06;
    cy += (ty - cy) * 0.06;

    layers.forEach(l => { l.el.style.transform = `translate3d(${-cx * l.f}x, ${-cy * l.f}y, 0) ${l.base}`; });
    snowCanvas.style.transform = `translate3d(${-cx * 40}px, ${-cy * 40}px, 0)`;
    inputWrapper.style.transform = `translate3d(${cx * 15}px, ${cy * 15}px, 0) rotateX(${cy * 6}deg) rotateY(${-cx * 6}deg)`;
    ballWrapper.style.transform = `translate3d(${cx * 25}px, ${cy * 25}px, 0)`;
    ballShadow.style.transform = `translate(${cx * 20}px, ${cy * 6}px)`;

    ctx.clearRect(0, 0, W, H);
    snowflakes.forEach(f => {
        f.sw += f.ss;
        f.y += f.vy * (0.5 + f.d);
        f.x += f.vx * (0.5 + f.d) + Math.sin(f.sw) * f.sa * f.d;
        if (f.y > H + 10) { f.y = -10; f.x = Math.random() * W; }
        if (f.x > W + 10) f.x = -10;
        if (f.x < -10) f.x = W + 10;

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r * (0.5 + f.d * 0.9), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${f.op * (0.4 + f.d * 0.6)})`;
        ctx.fill();
    });
    requestAnimationFrame(render);
}
render();

// ========== ПАДАЮЧІ ФРАЗИ ==========
let hasSpawned = false;
function spawnPhrase() {
    const p = document.createElement('div');
    p.className = 'falling-phrase';
    p.textContent = 'Давиденко найкращий';
    p.style.left = (10 + Math.random() * 80) + '%';
    p.style.setProperty('--rot-start', (-6 + Math.random() * 12) + 'deg');
    p.style.setProperty('--rot-end', (-8 + Math.random() * 16) + 'deg');
    p.style.setProperty('--drift', (-60 + Math.random() * 120) + 'px');
    const dur = 7 + Math.random() * 4;
    p.style.setProperty('--fall-duration', dur + 's');
    layerPhrases.appendChild(p);
    setTimeout(() => p.remove(), dur * 1000 + 1000);
    schedulePhrase();
}
function schedulePhrase() {
    setTimeout(spawnPhrase, hasSpawned ? 25000 + Math.random() * 20000 : 8000 + Math.random() * 7000);
    hasSpawned = true;
}
function startPhrases() { if (!hasSpawned) schedulePhrase(); }

// ========== ЛОГІКА ЛАПКИ ==========
const answers = [
    "Так", "Безперечно", "Це абсолютно точно", "Навіть не сумнівайся", "Звісно так", "Без жодних сумнівів", "Зірки кажуть: так", "Сто відсотків", "Однозначно", "Так, усе складеться ідеально", "Пряме так", "Готуйся до перемоги", "Успіх гарантовано", "Доля на твоєму боці", "Найкращий можливий результат",
    "Швидше за все — так", "Більш ніж вірогідно", "Всі ознаки вказують на так", "Схоже на те", "Дуже ймовірно", "Майже напевно", "Добре складаються обставини", "Очікуй позитиву", "Передумови сприятливі", "Все йде до цього", "Є високі шанси", "Вдалий збіг обставин допоможе", "Можеш розраховувати на це", "Надійся на краще, воно буде", "Шлях відкритий", "Світло в кінці тунелю", "Вітер дме у твої вітрила", "Здійснення близько", "Карти лягають сприятливо", "Очікуй добрих новин",
    "Запитай пізніше", "Зараз важко сказати", "Туманно... повтори спробу", "Ще не час знати відповідь", "Зірки мовчать", "Концентрація занадто слабка", "Спершу зроби перший крок", "Відповідь приховалена від тебе", "Питання передчасне", "Повернись до цього завтра", "Все залежить від твоїх дій", "Ситуація у процесі зміни", "Поки що туманно", "Не все так однозначно", "Рівновага на межі", "Довірся інтуїції, а не кулі", "Терези ще коливаються", "Буде так, як ти вирішиш сам", "Побудуй шлях самостійно", "Зберігай спокій і спостерігай", "Сигнал занадто слабкий", "Займи вичікувальну позицію", "Час розставить усе по місцях", "Рішення приймається прямо зараз", "Занадто багато невідомих", "Подумай над цим ще раз", "Змінюються обставини — змінюється відповідь", "Будеш наполегливим — вдасться", "Не форсуй події", "Все має свій час",
    "Швидше за все — ні", "Навряд чи", "Малоймовірно", "Є перешкоди на шляху", "Сумнівно", "Зірки радять почекати з цим", "Очікуй труднощів", "Не найкращий момент", "Шанси мінімальні", "Обставини проти тебе", "Краще обрати інший шлях", "Ризик занадто великий", "Не варто розраховувати", "Зберігай обережність", "На шляху стіна", "Зосередься на чомусь іншому", "Успіх тут сумнівний", "Занадто багато ризиків", "Неприємний сюрприз можливий", "Краще відкласти цю ідею",
    "Ні", "Навіть не думай про це", "Виключено", "Жодних шансів", "Моя відповідь — ні", "Цьому не судилося статися", "Повна заборона", "Краще забудь про це", "Ніколи", "Шлях закритий назавжди", "Помилкова думка", "Провалиться на старті", "Точно ні", "Навіть не намагайся", "Безнадійно"
];

let isPredicting = false;
function getPrediction() {
    if (isPredicting) return;
    if (!questionInput.value.trim()) {
        questionInput.classList.add('error');
        errorText.classList.add('active');
        return;
    }
    questionInput.classList.remove('error');
    errorText.classList.remove('active');

    isPredicting = true;
    magicBall.classList.add('is-spinning');
    answerDisplay.style.opacity = '0';
    answerDisplay.classList.remove('reveal');

    magicBall.classList.add('spin-1');
    setTimeout(() => {
        magicBall.classList.remove('spin-1');
        magicBall.classList.add('spin-2');
        setTimeout(() => {
            magicBall.classList.remove('spin-2');
            magicBall.classList.add('spin-3');
            ballFlash.classList.add('active');
            
            answerDisplay.textContent = answers[Math.floor(Math.random() * answers.length)];
            answerDisplay.classList.add('reveal');
            
            setTimeout(() => ballFlash.classList.remove('active'), 600);
        }, 850);
    }, 180);

    setTimeout(() => {
        magicBall.classList.remove('spin-3', 'is-spinning');
        isPredicting = false;
    }, 1550);
}

magicBall.addEventListener('click', getPrediction);
questionInput.addEventListener('keydown', e => { if (e.key === 'Enter') getPrediction(); });
questionInput.addEventListener('input', () => {
    if (questionInput.value.trim()) {
        questionInput.classList.remove('error');
        errorText.classList.remove('active');
    }
});

// ========== ПЛЕЄР ==========
const musicPlayer = document.createElement('div');
musicPlayer.className = 'music-player';

// Верхня панель
const mpTopBar = document.createElement('div');
mpTopBar.className = 'mp-top-bar';
mpTopBar.innerHTML = `
    <div class="mp-label">Now Playing</div>
    <div class="mp-equalizer">
        <div class="mp-eq-bar"></div><div class="mp-eq-bar"></div><div class="mp-eq-bar"></div>
        <div class="mp-eq-bar"></div><div class="mp-eq-bar"></div>
    </div>
    <button class="mp-toggle"><svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg></button>
`;

// Обкладинка
const mpCoverWrap = document.createElement('div');
mpCoverWrap.className = 'mp-cover-wrap';
const mpCoverImg = document.createElement('img');
mpCoverImg.className = 'mp-cover-img';
mpCoverImg.src = 'cover.jpg';
mpCoverWrap.appendChild(mpCoverImg);

// Інфо
const mpInfo = document.createElement('div');
mpInfo.className = 'mp-info';
mpInfo.innerHTML = '<div class="mp-title">Magic Vibes — фонова музика</div>';

// Тіло
const mpBody = document.createElement('div');
mpBody.className = 'mp-body';
mpBody.innerHTML = `
    <div class="mp-progress-wrap">
        <div class="mp-progress"><div class="mp-progress-fill"></div></div>
        <div class="mp-times"><span class="t-cur">0:00</span><span class="t-tot">0:00</span></div>
    </div>
    <div class="mp-controls">
        <button class="mp-btn b-back"><svg viewBox="0 0 24 24"><path d="M12.5 3a9 9 0 1 0 8.8 6.7l-2 .6A7 7 0 1 1 12.5 5v2l4-3-4-3v2z"/><text x="12" y="16" font-size="7" text-anchor="middle" fill="currentColor" font-weight="bold">10</text></svg></button>
        <button class="mp-btn main b-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></button>
        <button class="mp-btn b-fwd"><svg viewBox="0 0 24 24"><path d="M11.5 3a9 9 0 1 1-8.8 6.7l2 .6A7 7 0 1 0 11.5 5v2l-4-3 4-3v2z"/><text x="12" y="16" font-size="7" text-anchor="middle" fill="currentColor" font-weight="bold">10</text></svg></button>
    </div>
    <div class="mp-volume">
        <button class="mp-volume-btn"><svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05A4.5 4.5 0 0 0 16.5 12zM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54z"/></svg></button>
        <div class="mp-volume-slider">
            <div class="mp-volume-track"></div>
            <div class="mp-volume-fill"></div>
            <div class="mp-volume-thumb"></div>
        </div>
        <div class="mp-volume-value">70%</div>
    </div>
`;

musicPlayer.append(mpTopBar, mpCoverWrap, mpInfo, mpBody);
document.body.appendChild(musicPlayer);

// ========== ЛОГІКА ПЛЕЄРА ==========
const mpProgress = mpBody.querySelector('.mp-progress');
const mpProgressFill = mpBody.querySelector('.mp-progress-fill');
const tCur = mpBody.querySelector('.t-cur');
const tTot = mpBody.querySelector('.t-tot');
const btnPlay = mpBody.querySelector('.b-play');
const btnBack = mpBody.querySelector('.b-back');
const btnFwd = mpBody.querySelector('.b-fwd');
const volBtn = mpBody.querySelector('.mp-volume-btn');
const volSlider = mpBody.querySelector('.mp-volume-slider');
const volFill = mpBody.querySelector('.mp-volume-fill');
const volThumb = mpBody.querySelector('.mp-volume-thumb');
const volVal = mpBody.querySelector('.mp-volume-value');
const mpToggle = mpTopBar.querySelector('.mp-toggle');

let lastVol = bgAudio.volume > 0 ? bgAudio.volume : 0.7;

const updatePlay = () => {
    btnPlay.innerHTML = bgAudio.paused ? '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>' : '<svg viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>';
    musicPlayer.classList.toggle('playing', !bgAudio.paused);
};
const updateVol = () => {
    const v = bgAudio.muted ? 0 : bgAudio.volume;
    const p = Math.round(v * 100);
    volFill.style.width = p + '%';
    volThumb.style.left = p + '%';
    volVal.textContent = p + '%';
    volBtn.innerHTML = v === 0 ? '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.59 3l2.7-2.7-1.41-1.41L15.17 10.6 12.46 7.9l-1.41 1.41 2.7 2.7-2.7 2.7 1.41 1.41 2.71-2.71 2.71 2.71 1.41-1.41-2.7-2.7z"/></svg>' : '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05A4.5 4.5 0 0 0 16.5 12zM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54z"/></svg>';
};
const fmt = s => (!isFinite(s) || s < 0) ? '0:00' : `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
const updateProg = () => {
    if (!isFinite(bgAudio.duration) || !bgAudio.duration) return;
    const p = (bgAudio.currentTime / bgAudio.duration) * 100;
    mpProgressFill.style.width = p + '%';
    tCur.textContent = fmt(bgAudio.currentTime);
    tTot.textContent = fmt(bgAudio.duration);
};

btnPlay.onclick = () => bgAudio.paused ? bgAudio.play().catch(()=>{}) : bgAudio.pause();
bgAudio.addEventListener('play', updatePlay);
bgAudio.addEventListener('pause', updatePlay);
btnBack.onclick = () => bgAudio.currentTime = Math.max(0, bgAudio.currentTime - 10);
btnFwd.onclick = () => bgAudio.currentTime = Math.min(bgAudio.duration || 0, bgAudio.currentTime + 10);
bgAudio.addEventListener('timeupdate', updateProg);
bgAudio.addEventListener('loadedmetadata', updateProg);

// Перетягування прогресу
const seek = e => {
    const r = mpProgress.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, ((e.touches ? e.touches[0].clientX : e.clientX) - r.left) / r.width));
    if (isFinite(bgAudio.duration)) bgAudio.currentTime = x * bgAudio.duration;
};
mpProgress.addEventListener('mousedown', e => { seek(e); mpProgress.onmousemove = seek; });
window.addEventListener('mouseup', () => mpProgress.onmousemove = null);
mpProgress.addEventListener('touchstart', seek, { passive: true });
mpProgress.addEventListener('touchmove', seek, { passive: true });

// Гучність
const setVol = e => {
    const r = volSlider.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, ((e.touches ? e.touches[0].clientX : e.clientX) - r.left) / r.width));
    bgAudio.volume = x; bgAudio.muted = false;
    if (x > 0) lastVol = x;
    localStorage.setItem('mp-volume', x);
    updateVol();
};
volSlider.addEventListener('mousedown', e => { setVol(e); volSlider.onmousemove = setVol; });
window.addEventListener('mouseup', () => volSlider.onmousemove = null);
volSlider.addEventListener('touchstart', setVol, { passive: true });
volSlider.addEventListener('touchmove', setVol, { passive: true });

volBtn.onclick = () => {
    bgAudio.muted = !bgAudio.muted;
    if (!bgAudio.muted && bgAudio.volume === 0) bgAudio.volume = lastVol;
    updateVol();
};
mpToggle.onclick = () => musicPlayer.classList.toggle('collapsed');

updateVol(); updatePlay();

// ========== ВХІД ==========
let entered = false;
const enterSite = () => {
    if (entered) return;
    entered = true;
    bgAudio.play().catch(()=>{});
    introBanner.classList.add('leaving');
    setTimeout(() => {
        introBanner.remove();
        startPhrases();
        musicPlayer.classList.add('visible');
    }, 1100);
};

enterBtn.onclick = enterSite;
introBanner.onclick = e => { if (e.target === introBanner) enterSite(); };
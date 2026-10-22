/* ==========================================================
   NIETZSCHE SITE CONFIG — change the repo / commands here only.
   (The HTML hrefs carry the same values as a no-JS fallback.)
   Shares its structure with getwedge.dev.
   ========================================================== */
const SITE = {
  repo: "senavoh/nietzsche",
  github: "https://github.com/senavoh/nietzsche",
  domain: "nietzsche.dev",
  cmd: {
    npx: "npx skills add senavoh/nietzsche",
    pluginAdd: "/plugin marketplace add senavoh/nietzsche",
    pluginInstall: "/plugin install nietzsche@nietzsche",
    curl: "curl -fsSL https://raw.githubusercontent.com/senavoh/nietzsche/main/install.sh | sh",
    clone: "git clone https://github.com/senavoh/nietzsche",
    manualCopy: "cp -r nietzsche/skills/nietzsche ~/.claude/skills/",
  },
  usage: "Roast my repo.",
};

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- fill config values ---------- */
document.querySelectorAll("[data-cmd]").forEach((el) => {
  const v = SITE.cmd[el.dataset.cmd];
  if (typeof v === "string") el.textContent = v;
});
document.querySelectorAll("[data-usage]").forEach((el) => (el.textContent = `“${SITE.usage}”`));
document.querySelectorAll("[data-gh]").forEach((el) => (el.href = SITE.github));
document.querySelectorAll("[data-gh-issues]").forEach((el) => (el.href = SITE.github + "/issues"));
document.querySelectorAll("[data-domain]").forEach((el) => (el.textContent = SITE.domain));

/* ---------- copy buttons ---------- */
const live = document.createElement("div");
live.className = "sr-only";
live.setAttribute("aria-live", "polite");
document.body.appendChild(live);

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch { ok = false; }
    ta.remove();
    return ok;
  }
}

document.addEventListener("click", async (e) => {
  const btn = e.target.closest(".copy");
  if (!btn) return;
  const text = btn.dataset.copyText || SITE.cmd[btn.dataset.copyFrom];
  if (!text) return;
  const ok = await copyText(text);
  const lbl = btn.querySelector("span") || btn;
  lbl.textContent = ok ? "Copied" : "Press ⌘C";
  btn.classList.toggle("is-done", ok);
  live.textContent = ok ? "Copied to clipboard" : "Copy failed, select the text manually";
  clearTimeout(btn._t);
  btn._t = setTimeout(() => {
    lbl.textContent = "Copy";
    btn.classList.remove("is-done");
  }, 1800);
});

/* ---------- install tabs (ARIA tabs pattern) ---------- */
const tablist = document.querySelector('.itabs [role="tablist"]');
if (tablist) {
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  const select = (tab, focus) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
    if (focus) tab.focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => select(t));
    t.addEventListener("keydown", (e) => {
      let j = null;
      if (e.key === "ArrowRight") j = (i + 1) % tabs.length;
      if (e.key === "ArrowLeft") j = (i - 1 + tabs.length) % tabs.length;
      if (e.key === "Home") j = 0;
      if (e.key === "End") j = tabs.length - 1;
      if (j !== null) { e.preventDefault(); select(tabs[j], true); }
    });
  });
}

/* ---------- nav border on scroll ---------- */
const nav = document.querySelector(".nav");
const onScroll = () => nav && nav.classList.toggle("is-scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- scroll reveal ---------- */
if (!reduceMotion) {
  const els = document.querySelectorAll(".block .head, .vs, .block .split > *, .steps, .report, .itabs, .faq, .support");
  els.forEach((el) => el.classList.add("reveal"));
  // Reveal anything whose top has entered the lower edge of the viewport, including
  // anything already scrolled past (fast jumps and anchor links).
  const sweep = () => {
    const edge = window.innerHeight * 0.92;
    document.querySelectorAll(".reveal:not(.is-in)").forEach((el) => {
      if (el.getBoundingClientRect().top < edge) el.classList.add("is-in");
    });
  };
  let queued = false;
  const queue = () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; sweep(); }); } };
  ["scroll", "resize", "hashchange", "load"].forEach((ev) => window.addEventListener(ev, queue, { passive: true }));
  sweep();
}

/* ---------- live star count (shows only once the repo is public) ---------- */
fetch(`https://api.github.com/repos/${SITE.repo}`, { headers: { Accept: "application/vnd.github+json" } })
  .then((r) => (r.ok ? r.json() : null))
  .then((d) => {
    if (!d || typeof d.stargazers_count !== "number" || d.stargazers_count < 1) return;
    const n = d.stargazers_count;
    const txt = n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, "") + "k" : String(n);
    document.querySelectorAll("[data-stars]").forEach((el) => {
      el.textContent = "★ " + txt;
      el.closest(".gh")?.classList.add("has-count");
    });
  })
  .catch(() => {});

/* ---------- the live title page: name a repo, get its book ---------- */
const TITLES = [
  ["On the Genealogy of {n}", "A Polemic in Seven Aphorisms"],
  ["Beyond Good and Evil Code: {n}", "Prelude to a Philosophy of the Future Refactor"],
  ["Twilight of the Idols: {n}", "Or, How to Code Review with a Hammer"],
  ["Thus Spoke the Linter: {n}", "A Book for Every Commit and None"],
  ["{n}, All Too Human", "A Book for Free Spirits and Failing Builds"],
  ["The Gay Science of {n}", "With a Prelude in Dependency Hell"],
  ["Ecce {n}", "How One Becomes What One Ships"],
  ["The Will to Merge: {n}", "Notes Toward a Revaluation of All Pull Requests"],
];
const repoIn = document.getElementById("repo");
const tpage = document.querySelector(".titlepage");
if (repoIn && tpage) {
  const title = document.getElementById("tp-title");
  const sub = document.getElementById("tp-sub");
  const bind = (raw) => {
    const clean = raw.trim().replace(/^(https?:\/\/)?(www\.)?github\.com\//, "").replace(/\.git$/, "").replace(/\/+$/, "");
    if (clean.toLowerCase() === "senavoh/nietzsche") return ["Ecce Homo: How nietzsche Becomes What It Roasts", "Or: The Physician Who Has Not Healed Himself"];
    const name = (clean.split("/").pop() || "your repo").slice(0, 40);
    let h = 0;
    for (const c of name.toLowerCase()) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    const [t, s] = TITLES[h % TITLES.length];
    return [t.replace("{n}", name), s];
  };
  let tm;
  repoIn.addEventListener("input", () => {
    clearTimeout(tm);
    tpage.classList.add("is-swapping");
    tm = setTimeout(() => {
      const [t, s] = bind(repoIn.value);
      title.textContent = t;
      sub.textContent = s;
      tpage.classList.remove("is-swapping");
    }, reduceMotion ? 0 : 160);
  });
}

/* nietzsche.dev — change the repo and commands here only.
   (The HTML carries the same values as a no-JS fallback.) */
const SITE = {
  repo: "senavoh/nietzsche",
  github: "https://github.com/senavoh/nietzsche",
  cmd: {
    npx: "npx skills add senavoh/nietzsche",
    pluginAdd: "/plugin marketplace add senavoh/nietzsche",
    pluginInstall: "/plugin install nietzsche@nietzsche",
    curl: "curl -fsSL https://raw.githubusercontent.com/senavoh/nietzsche/main/install.sh | sh",
    clone: "git clone https://github.com/senavoh/nietzsche",
    manualCopy: "cp -r nietzsche/skills/nietzsche ~/.claude/skills/",
  },
};

// Real lines from his roast of this repo (examples/self-roast.md).
const LINES = [
  '<b>§5.</b> <code>TARGETS="$*"</code> and then <code>for t in $TARGETS</code>. Your installer splits on whitespace like the last man splits the bill: without thinking.',
  '<b>§1.</b> Here is a skill whose sacred law is “Tests: do they exist?” Then it walks into the town square with no tests, no evals and no CI.',
  '<b>§2.</b> The whole history is one commit. Eternal recurrence will be easy for you: there is only one moment to relive.',
  '<b>§3.</b> It clones into <code>"$(mktemp -d)/repo"</code> and never writes down where that is. It opens a fresh abyss and forgets its address.',
  '<b>§7.</b> Grudgingly: the rules are good. Someone has stared into the abyss of <code>rm -rf /</code> and blinked first.',
];

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelectorAll("[data-cmd]").forEach((el) => {
  const v = SITE.cmd[el.dataset.cmd];
  if (v) el.textContent = v;
});
document.querySelectorAll("[data-gh]").forEach((el) => (el.href = SITE.github));
document.querySelectorAll("[data-gh-issues]").forEach((el) => (el.href = SITE.github + "/issues"));

/* ---------- copy ---------- */
async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; }
  catch {
    const ta = Object.assign(document.createElement("textarea"), { value: text });
    ta.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(ta); ta.select();
    let ok = false; try { ok = document.execCommand("copy"); } catch {}
    ta.remove(); return ok;
  }
}
document.addEventListener("click", async (e) => {
  const btn = e.target.closest(".copy");
  if (!btn) return;
  const ok = await copyText(SITE.cmd[btn.dataset.copyFrom]);
  btn.textContent = ok ? "Copied" : "⌘C";
  btn.classList.toggle("is-done", ok);
  clearTimeout(btn._t);
  btn._t = setTimeout(() => { btn.textContent = "Copy"; btn.classList.remove("is-done"); }, 1600);
});

/* ---------- install tabs ---------- */
const tabs = [...document.querySelectorAll('[role="tab"]')];
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
    const j = { ArrowRight: (i + 1) % tabs.length, ArrowLeft: (i - 1 + tabs.length) % tabs.length, Home: 0, End: tabs.length - 1 }[e.key];
    if (j !== undefined) { e.preventDefault(); select(tabs[j], true); }
  });
});

/* ---------- the hero speaks: cycle real roast lines ---------- */
const speech = document.querySelector(".hero__speech");
const said = speech?.querySelector("[data-cycle]");
if (speech && said && !reduceMotion) {
  let n = 0;
  setInterval(() => {
    if (document.hidden) return;
    speech.classList.add("is-swapping");
    setTimeout(() => {
      n = (n + 1) % LINES.length;
      said.innerHTML = LINES[n];
      speech.classList.remove("is-swapping");
    }, 300);
  }, 6000);
}

/* ---------- live title page ---------- */
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
      [title.textContent, sub.textContent] = bind(repoIn.value);
      tpage.classList.remove("is-swapping");
    }, reduceMotion ? 0 : 160);
  });
}

/* ---------- reveal on scroll ---------- */
if (!reduceMotion) {
  const els = document.querySelectorAll(".sec .h2, .lede, .vs > *, .steps li, .doc, .titlepage, .itabs, .ask, .faq__list details, .close__copy, .band__list");
  els.forEach((el) => el.classList.add("reveal"));
  const sweep = () => {
    const edge = innerHeight * 0.92;
    document.querySelectorAll(".reveal:not(.is-in)").forEach((el, i) => {
      if (el.getBoundingClientRect().top < edge) { el.style.transitionDelay = `${Math.min(i, 3) * 70}ms`; el.classList.add("is-in"); }
    });
  };
  let q = false;
  ["scroll", "resize", "load", "hashchange"].forEach((ev) => addEventListener(ev, () => { if (!q) { q = true; requestAnimationFrame(() => { q = false; sweep(); }); } }, { passive: true }));
  sweep();
}

/* ---------- live star count, once the repo has any ---------- */
fetch(`https://api.github.com/repos/${SITE.repo}`, { headers: { Accept: "application/vnd.github+json" } })
  .then((r) => (r.ok ? r.json() : null))
  .then((d) => {
    const n = d?.stargazers_count;
    if (!n) return;
    const txt = n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, "") + "k" : String(n);
    document.querySelectorAll("[data-stars]").forEach((el) => (el.textContent = "★ " + txt));
  })
  .catch(() => {});

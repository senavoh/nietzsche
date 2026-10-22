<p align="center">
  <img src="assets/nietzsche.svg" alt="Nietzsche, the code reviewer, in woodcut" width="240">
</p>

<h1 align="center">Nietzsche</h1>

<p align="center"><b>The abyss reviews back.</b><br>
An open-source agent skill that reads your repo, roasts it in Friedrich Nietzsche's voice, and ends with three real fixes you can ship today.</p>

<p align="center">
  <a href="https://nietzsche.dev">nietzsche.dev</a> ·
  <a href="examples/self-roast.md">Example roast</a> ·
  <a href="#install">Install</a> ·
  <a href="#how-it-works">How it works</a>
</p>

```bash
npx skills add senavoh/nietzsche
```

Then open a project and ask your agent:

> Roast my repo.

Works with **Claude Code, Codex, Cursor, Gemini CLI, OpenCode**, and any agent that reads `SKILL.md` files. No API key, no account, nothing to host.

---

## A real roast. Of itself.

The first repo it roasted was its own. Unedited excerpt:

> ### Ecce Homo: How nietzsche Becomes What It Roasts
> *Or: The Physician Who Has Not Healed Himself*
>
> **§1.** Here is a skill whose sacred law, in `SKILL.md`, is "Tests: do they exist, and do they test anything real?" Then it walks into the town square with no tests, no evals and no CI. The prophet preaches to the herd and never looks in a mirror.
>
> **§5.** `TARGETS="$*"` and then `for t in $TARGETS`. Your installer splits on whitespace like the last man splits the bill: without thinking.
>
> #### Three Fixes for the Overman
>
> 1. **Keep the clone path** (`SKILL.md`, line 17): save the temp directory in a variable and print it.
> 2. **Stop word-splitting install targets** (`install.sh`, lines 26-37): loop over `"$@"` so paths with spaces survive.
> 3. **Add a minimal CI and a regression fixture**: shellcheck, validate the plugin JSON, keep one golden roast.
>
> *Physician, roast thyself: what does not kill your install script will at least make it quote its variables.*

Fixes 1 and 2 were real bugs, and they shipped before the first push. [Read all seven aphorisms](examples/self-roast.md).

## Why Nietzsche

Ask an AI to review your code and you get "Overall this is a well-structured project!" Nietzsche works differently:

- **The roast is the hook. The fixes are the point.** It picks the three fixes before it writes a single joke, ranked by impact: bugs and missing tests before naming nitpicks.
- **Every jab is real.** Each aphorism points at a file, line, dependency or commit it actually read. It re-opens each file to confirm a fix before handing it over.
- **Read only.** It never edits your code, runs it, installs its dependencies, commits or pushes.
- **Mock the code, never the person.** No jabs about anyone's identity, and it goes easy on a beginner's first project. If the code is good, it says so, grudgingly.

## How it works

1. **Read.** The tree, README, manifests, CI, entry points, tests and recent commits. Another repo gets a shallow clone into a temp folder, deleted afterwards.
2. **Choose.** Three fixes, ranked by impact.
3. **Check.** Re-opens each file to confirm the problem is there.
4. **Roast.** Four to seven aphorisms under a title that parodies one of his books (*Beyond Good and Evil Code*, *Twilight of the Idols*, *Ecce Homo*), then the fixes in a plain voice you can paste into an issue.

At the end it offers to save the roast as `NIETZSCHE.md`, and saves it only if you say yes.

## Install

**Any agent (recommended)**

```bash
npx skills add senavoh/nietzsche
```

The `skills` installer needs Node.js 22 or newer. On older versions, use the install script.

**Claude Code plugin**

```text
/plugin marketplace add senavoh/nietzsche
/plugin install nietzsche@nietzsche
```

**Install script.** Copies the skill into every agent skills folder it finds (`~/.claude`, `~/.codex`, `~/.gemini`, `~/.cursor`, `~/.config/opencode`, `~/.agents`):

```bash
curl -fsSL https://raw.githubusercontent.com/senavoh/nietzsche/main/install.sh | sh
```

To choose the folders yourself, pass them after `sh -s --`:

```bash
curl -fsSL https://raw.githubusercontent.com/senavoh/nietzsche/main/install.sh | sh -s -- ~/.claude/skills ~/.codex/skills
```

**Manual.** Copy `skills/nietzsche` into your agent's skills folder.

## Use

- "Roast my repo"
- "Roast vercel/next.js"
- "Nietzsche this codebase"

Private repos work if `gh` is logged in.

## Roadmap

- [x] Roast skill for any agent
- [ ] CI and a regression fixture (fix 3 from the [self-roast](examples/self-roast.md))
- [ ] Shareable roast card image
- [ ] Gallery of famous repos at [nietzsche.dev](https://nietzsche.dev)
- [ ] More philosophers (Diogenes, Schopenhauer, Marcus Aurelius...)
- [ ] GitHub Action that roasts your PRs
- [ ] "Survived Nietzsche" README badge

## Contributing

Issues and PRs welcome. If Nietzsche says something about your code that's just wrong, open an issue with the repo and the output.

## License

[MIT](LICENSE)

# nietzsche

> "He who has a why to commit can bear almost any how."

An agent skill that roasts your repo in Friedrich Nietzsche's voice, then ends with **three real fixes** you can ship today.

It runs inside the coding agent you already use (Claude Code, Codex, Cursor, Gemini CLI, OpenCode) on the model you already pay for. No API key, no server, no account.

The first repo it roasted was its own:

```text
> roast my repo

# Ecce Homo: How nietzsche Becomes What It Roasts
*Or: The Physician Who Has Not Healed Himself*

§1. Here is a skill whose sacred law is "Tests: do they exist, and do they test
    anything real?" Then it walks into the town square with no tests, no evals
    and no CI. The prophet preaches to the herd and never looks in a mirror.

§5. `TARGETS="$*"` and then `for t in $TARGETS`. Your installer splits on
    whitespace like the last man splits the bill: without thinking.

## Three Fixes for the Overman

2. Stop word-splitting install targets (install.sh, lines 26-37): any path
   with a space in it, including a $HOME with a space, gets cut in two...
```

Two of its three fixes were real bugs, and they shipped before the first push. [Read the full self-roast](examples/self-roast.md).

## Install

**Any agent (recommended)**

```bash
npx skills add senavoh/nietzsche
```

The `skills` installer needs Node.js 22 or newer. On older Node versions, use the install script below.

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

Open a project in your agent and say:

- "roast my repo"
- "roast vercel/next.js"
- "nietzsche this codebase"

For another repo, the agent makes a shallow clone into a temp folder. Private repos work if `gh` is logged in.

## What it does

1. Reads the repo the way a reviewer would: the tree, README, manifests, CI, entry points, tests and recent commit messages.
2. Chooses three fixes first and re-checks each one against the code, so they are real problems with a file and a concrete change.
3. Writes 4 to 7 aphorisms where every jab points at something it actually saw.

It's read only. It never edits your code, runs it, installs its dependencies, commits or pushes. At the end it offers to save the roast as `NIETZSCHE.md`, and saves it only if you say yes.

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

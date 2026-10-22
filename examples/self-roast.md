# Nietzsche roasts nietzsche

The first thing we roasted was this repo itself. This is the unedited output of `roast my repo`, run inside this repo, from before the first push.

What happened next: fixes 1 and 2 shipped in the first commit. Fix 3, CI and a regression fixture, is on the roadmap.

---

# Ecce Homo: How nietzsche Becomes What It Roasts
*Or: The Physician Who Has Not Healed Himself*

§1. Here is a skill whose sacred law, in `skills/nietzsche/SKILL.md`, is "Tests: do they exist, and do they test anything real?" Then it walks into the town square with no tests, no evals and no CI. The prophet preaches to the herd and never looks in a mirror.

§2. The whole history is one commit, `83f2454 Initial commit`. No herd of WIP commits, no "fix typo" ressentiment, just one god-like act of creation. Eternal recurrence will be easy for you: there is only one moment to relive.

§3. `SKILL.md` line 17 tells the agent to clone into `"$(mktemp -d)/repo"` and never writes down where that is. It opens a fresh abyss and forgets its address. Then the abyss can't gaze back, because nobody can find it.

§4. `install.sh` claims in its own header that it lives at `https://nietzsche.dev/install.sh`. The README's roadmap lists that domain as an unchecked box. The script is already preaching from a mountain that hasn't been raised yet.

§5. `TARGETS="$*"` and then `for t in $TARGETS`. Your installer splits on whitespace like the last man splits the bill: without thinking. Any skills folder with a space in its path gets cut into two folders, and one of them lands relative to whatever directory you ran the script from.

§6. The `.gitignore` guards against `node_modules/`, `.env` and `*.log` in a repo that has no JavaScript, no secrets and nothing that writes logs. The skill forbids jabs about dotfiles, so I won't say this. I'll only point out that I could.

§7. Grudgingly: the rules are good. "Choose the three fixes first", "re-open the file to confirm it", "mock the code, never the person". These are a master's values, not a slave's, and the `${t:?}` guard on that `rm -rf` shows someone has stared into the abyss of `rm -rf /` and blinked first.

## Three Fixes for the Overman

1. **Keep the clone path** (`skills/nietzsche/SKILL.md`, line 17): `git clone ... "$(mktemp -d)/repo"` throws away the temp directory's name, so the agent has to guess where the repo went, or it ends up re-cloning. Save it in a variable and print it, e.g. `dir="$(mktemp -d)/repo" && git clone --depth 20 --quiet https://github.com/<owner>/<repo> "$dir" && echo "$dir"`. Use the same `$dir` in the `gh repo clone` fallback, and add a line telling the agent to `rm -rf` it when the roast is done.

2. **Stop word-splitting install targets** (`install.sh`, lines 26-37): `TARGETS="$*"` followed by an unquoted `for t in $TARGETS` breaks any path with a space in it, and that includes a `$HOME` with a space in it on the default path. Loop over `"$@"` directly when arguments are given. For the default list, build the targets with `set -- "$@" "$d/skills"` inside the detection loop, then loop over `for t in "$@"`. While you're in the file, change the usage lines in the header (lines 3-4) to the `raw.githubusercontent.com` URL the README uses, because `nietzsche.dev` isn't live yet according to the roadmap.

3. **Add a minimal CI and a regression fixture** (new `.github/workflows/ci.yml`): the repo has no automated checks. Run `shellcheck install.sh` (it would catch fix 2), validate both `.claude-plugin/*.json` files with `jq empty`, and check that `SKILL.md` frontmatter has `name` and `description`. Then add a small fixture repo with planted, known bugs under `tests/fixtures/`, and keep one golden roast of it. The README already asks people to report wrong output, and this fixture lets you check whether a prompt change caused it.

> Physician, roast thyself: what does not kill your install script will at least make it quote its variables.

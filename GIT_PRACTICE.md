# Практика команд Git (п.5)

Виконано: `git reset --hard HEAD~`, `git reset --soft HEAD~`, `git cherry-pick <commit>`, `git stash` / `git stash pop`.

```text
$ git log --oneline -3
658d3dd test: commit for reset --hard
5056819 feat: add styles.css and index.js
5ebd3b6 feat: init index.html

$ git reset --hard HEAD~
HEAD is now at 5056819 feat: add styles.css and index.js

$ git log --oneline -3
5056819 feat: add styles.css and index.js
5ebd3b6 feat: init index.html
c4a1933 Initial commit

$ ls
README.md
index.html
index.js
styles.css

$ git log --oneline -3
cfaf5bc test: commit for reset --soft
5056819 feat: add styles.css and index.js
5ebd3b6 feat: init index.html

$ git reset --soft HEAD~

$ git status --short
A  soft.txt

$ git log --oneline -3
5056819 feat: add styles.css and index.js
5ebd3b6 feat: init index.html
c4a1933 Initial commit

$ git log --oneline -1 practice/hotfix
1273fb6 fix: smooth scroll (hotfix for cherry-pick)

$ git cherry-pick 1273fb6
[practice/git-commands 70d1362] fix: smooth scroll (hotfix for cherry-pick)
 Date: Wed Oct 7 07:05:14 2026 +0000
 1 file changed, 1 insertion(+)

$ git log --oneline -4
70d1362 fix: smooth scroll (hotfix for cherry-pick)
9bad35c docs: add soft.txt (recommitted after reset --soft)
5056819 feat: add styles.css and index.js
5ebd3b6 feat: init index.html

$ git status --short
 M index.js

$ git stash
Saved working directory and index state WIP on practice/git-commands: 70d1362 fix: smooth scroll (hotfix for cherry-pick)

$ git status --short

$ git stash list
stash@{0}: WIP on practice/git-commands: 70d1362 fix: smooth scroll (hotfix for cherry-pick)

$ git stash pop
On branch practice/git-commands
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   index.js

no changes added to commit (use "git add" and/or "git commit -a")
Dropped refs/stash@{0} (60ef1af0b1b905fef436e431195bfd299284ee54)

$ git status --short
 M index.js

```

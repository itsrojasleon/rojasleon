---
title: 'Remove folder from local git tracking'
description: 'How to remove a folder in your local machine (staging) when you accidentally added it using git'
date: 'April 06, 2021'
author: 'rojasleon'
---

# Remove folder from local git tracking

I accidentally did

```shell
git add .
```

with an specific folder that I did not mean to add

Actually it happend a couple of times. So this note is to stop me doing that.
And if it happen again, here's the git command to stop tracking that folder

```shell
git reset HEAD -- ugly_folder
```

This is basically of to undo a folder after a `git add .`

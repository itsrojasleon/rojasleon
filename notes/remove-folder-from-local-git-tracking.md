---
title: 'Remove folder from local git tracking'
description: 'How to remove a folder in your local machine (staging) when you accidentally added it using git'
date: 'April 06, 2021'
author: 'rojasleon'
---

# Remove folder from local git tracking

I accidentally added a folder to track it using git.

```shell
git add ugly_folder_that_i_dont_want_to_track
```

Actually it happend a couple of times. So this note is to stop me doing that.
And if it happen again, here's the git command to stop tracking that folder

```shell
git rm -r --cached path_to_your_ugly_folder
```

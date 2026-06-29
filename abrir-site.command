#!/bin/bash
# Double-click this file in Finder to preview the site.
# It runs Node from this project (outside any sandbox), so the browser can reach it.
cd "$(dirname "$0")" || exit 1
export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"
node serve-dist.mjs

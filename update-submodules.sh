#!/bin/bash
git pull
git submodule update --remote --recursive
git add -u
git commit -m "Update submodules"
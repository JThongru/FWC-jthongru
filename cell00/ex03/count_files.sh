#!/bin/sh
find . -mindepth 1 ! -path '*/.*' \( -type f -o -type d \) | wc -l | tr -d ' '
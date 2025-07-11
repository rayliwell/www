#!/usr/bin/env bash

echo "// File automatically generated by blog script" > "$blogOutputFile"

count=0

for post in "$blogDirectory"/*.md?; do
  filename=$(basename "$post")
  echo "import * as blog$count from '$blogInputPath/$filename'" >> "$blogOutputFile"
  count=$((count + 1))
done

echo >> "$blogOutputFile"
echo "export default [" >> "$blogOutputFile"

if [ $count -eq 0 ]; then
  echo "  // Failed to import blog posts" >> "$blogOutputFile"
  exit 1
fi

for i in $(seq 0 $((count - 1))); do
  echo "  blog$i," >> "$blogOutputFile"
done

echo "] as typeof import('*.mdx')[]" >> "$blogOutputFile"

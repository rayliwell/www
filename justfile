set export

# Development port
devPort := "8080"

# Directory containing blog posts
blogDirectory := "./blog"
# Blog exports output file
blogOutputFile := "./src/blog.ts"
# Blog TypeScript input path relative to output file
blogInputPath := "../blog"

# List available recipes
list:
  just --list

# Run the blog script
blog:
  ./scripts/blog.sh

dev:
  next dev --port {{devPort}}

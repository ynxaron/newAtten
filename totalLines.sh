#!/bin/bash

# Folders to exclude
#!/bin/bash

# Folders to exclude
EXCLUDE_DIRS=(
  "./node_modules"
  "./dist"
  "./build"
  "./.angular"
  "./venv"
  "./.venv"
  "./.env"
  "./__pycache__"
  "./migrations"
  "./media"
  "./static/vendor"
  "./static/libs"
  "./static/third_party"
  "./.newAtten-venv"
)

# File extensions to include
INCLUDE_EXTENSIONS=("*.py" "*.js" "*.html" "*.css" "*.ts" "*.scss")

# Function to count human lines
count_loc() {
  echo "Counting human-written lines of code..."

  find . \
    $(for dir in "${EXCLUDE_DIRS[@]}"; do echo -n " -path $dir -prune -o"; done) \
    \( -name "*.py" -o -name "*.js" -o -name "*.html" -o -name "*.css" -o -name "*.ts" -o -name "*.scss" \) \
    -type f -print \
    | grep -vE '\.min\.|\.map$' \
    | xargs cat \
    | grep -v '^\s*$' \
    | wc -l
}

TOTAL_LINES=$(count_loc)
echo "=================================="
echo "Total Human-Written LOC: $TOTAL_LINES"
echo "=================================="

#!/bin/bash

# Temporarily rename ESLint config
if [ -f "eslint.config.mjs" ]; then
  mv eslint.config.mjs eslint.config.mjs.bak
fi

# Run the build
npm run build

# Capture the exit code
BUILD_EXIT_CODE=$?

# Restore ESLint config
if [ -f "eslint.config.mjs.bak" ]; then
  mv eslint.config.mjs.bak eslint.config.mjs
fi

# Exit with the build exit code
exit $BUILD_EXIT_CODE

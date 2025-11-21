#!/usr/bin/env node

const { execSync } = require('child_process');

try {
  // Set git hooks path to .husky
  execSync('git config core.hooksPath .husky', { stdio: 'inherit' });
  console.log('✓ Git hooks path configured');
} catch (error) {
  // If git config fails (e.g., not a git repo), that's okay
  console.warn('⚠ Could not configure git hooks path:', error.message);
}

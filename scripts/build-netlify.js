const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Backup and modify next.config.ts to disable ESLint
const configPath = path.join(__dirname, '..', 'next.config.ts');
const configBackupPath = path.join(__dirname, '..', 'next.config.ts.backup');

// Read the current config
let config = fs.readFileSync(configPath, 'utf8');

// Backup the original config
fs.writeFileSync(configBackupPath, config);

// Make sure ESLint is disabled in the config
if (!config.includes('ignoreDuringBuilds: true')) {
  config = config.replace(
    'eslint: {',
    'eslint: {\n    ignoreDuringBuilds: true,'
  );
}

// Write the modified config
fs.writeFileSync(configPath, config);

try {
  // Run the build with increased memory
  console.log('Running Next.js build with increased memory...');
  execSync('npm run build', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=4096' }
  });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
} finally {
  // Restore the original config
  if (fs.existsSync(configBackupPath)) {
    fs.copyFileSync(configBackupPath, configPath);
    fs.unlinkSync(configBackupPath);
  }
}

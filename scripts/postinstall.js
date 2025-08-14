const fs = require('fs');
const path = require('path');

// Clean up any problematic files
const filesToClean = [
  '.next',
  'node_modules/.cache',
  '.netlify'
];

filesToClean.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`Cleaning ${file}...`);
    fs.rmSync(filePath, { recursive: true, force: true });
  }
});

console.log('Postinstall cleanup complete.');

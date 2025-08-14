const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all TypeScript/JavaScript files
const files = glob.sync('**/*.{ts,tsx,js,jsx}', {
  ignore: ['node_modules/**', '.next/**', 'scripts/**']
});

let updatedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let updated = false;

  // Update import statements
  if (content.includes('@supabase/auth-helpers-nextjs')) {
    content = content.replace(
      /import\s*{\s*createClientComponentClient\s*}\s*from\s*['"]@supabase\/auth-helpers-nextjs['"]/g,
      "import { createBrowserClient } from '@supabase/ssr'"
    );
    content = content.replace(
      /import\s*{\s*createServerComponentClient\s*}\s*from\s*['"]@supabase\/auth-helpers-nextjs['"]/g,
      "import { createServerClient } from '@supabase/ssr'"
    );
    content = content.replace(
      /@supabase\/auth-helpers-nextjs/g,
      '@supabase/ssr'
    );
    updated = true;
  }

  // Update client creation calls
  if (content.includes('createClientComponentClient()')) {
    content = content.replace(
      /createClientComponentClient\(\)/g,
      `createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )`
    );
    updated = true;
  }

  if (content.includes('createServerComponentClient')) {
    content = content.replace(
      /createServerComponentClient\(\s*{\s*cookies\s*}\s*\)/g,
      `createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookies().get(name)?.value
        },
      },
    }
  )`
    );
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${file}`);
    updatedCount++;
  }
});

console.log(`\nTotal files updated: ${updatedCount}`);

const fs = require('fs');
const path = require('path');

function getRelativePath(fromFile, toAlias) {
  // Map of @alias to relative paths
  const aliasMap = {
    '@lib/': '../lib/',
    '@components/': '../components/',
    '@styles/': '../styles/',
    '@utils/': '../utils/'
  };

  // Find matching alias
  for (const [alias, relPath] of Object.entries(aliasMap)) {
    if (toAlias.startsWith(alias)) {
      const rest = toAlias.slice(alias.length);
      return relPath + rest;
    }
  }

  return toAlias;
}

function fixImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Replace import/require statements with @alias
    content = content.replace(
      /from\s+['"](@[^'"]+)['"]/g,
      (match, alias) => {
        const relative = getRelativePath(filePath, alias);
        return `from '${relative}'`;
      }
    );

    content = content.replace(
      /require\s*\(\s*['"](@[^'"]+)['"]\s*\)/g,
      (match, alias) => {
        const relative = getRelativePath(filePath, alias);
        return `require('${relative}')`;
      }
    );

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed: ${filePath}`);
      return true;
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
  return false;
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    // Skip node_modules and .next
    if (file === 'node_modules' || file === '.next' || file === 'user_read_only_context') {
      return;
    }

    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {
      fixImportsInFile(fullPath);
    }
  });
}

// Start from src directory
const srcDir = path.join(__dirname, '../src');
if (fs.existsSync(srcDir)) {
  walkDir(srcDir);
  console.log('Import fixing complete!');
} else {
  console.error('src directory not found');
}

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, 'src');
const fontDir = path.join(__dirname, 'static/fonts');
const outputDir = path.join(__dirname, 'static/fonts');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const exts = ['.svelte', '.md', '.svx', '.js', '.ts', '.html', '.css', '.scss'];
const chars = new Set();

function walkDir(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (exts.includes(path.extname(entry.name))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      for (const ch of content) chars.add(ch);
    }
  });
}

console.log('Scanning source files for chars...');
walkDir(sourceDir);

const charList = [...chars].join('');
console.log(`Found ${chars.size} unique chars.`);

const charFile = path.join(__dirname, 'subset-chars.txt');
fs.writeFileSync(charFile, charList, 'utf8');

console.log(`Char list written to ${charFile}`);

const fonts = [
  { name: 'Fira Code', file: 'Fira_Code/FiraCode-VariableFont_wght.woff2' },
  { name: 'Victor Mono', file: 'Victor_Mono/VictorMono-Italic-VariableFont_wght.woff2' },
  { name: 'Roboto', file: 'Roboto/Roboto-VariableFont_wdth,wght.woff2' },
  { name: 'Lexend', file: 'Lexend/Lexend-VariableFont_wght.woff2' },
  { name: 'FiraCode Nerd Medium', file: 'Fira_Code_NF/FiraCodeNerdFont-Medium.woff2' },
  { name: 'FiraCode Nerd Bold', file: 'Fira_Code_NF/FiraCodeNerdFont-Bold.woff2' },
  { name: 'VictorMono Nerd Italic', file: 'Victor_Mono_NF/VictorMonoNerdFontMono-MediumItalic.woff2' }
];

for (const font of fonts) {
  const input = path.join(fontDir, font.file);
  const output = path.join(outputDir, font.file.replace('.woff2', '-subset.woff2'));

  console.log(`Subsetting ${font.name}...`);
  try {
    execSync(`pyftsubset "${input}" --output-file="${output}" --flavor=woff2 --text-file="${charFile}" --with-zopfli  --layout-features="*" --glyph-names="*" --no-layout-closure`, { stdio: 'inherit' });
    console.log(`[OK] Subset created: ${output}`);
  } catch (e) {
    console.error(`[FAIL] Failed to subset ${font.name}:`, e.message);
  }
}

console.log('All fonts processed.');

if (fs.existsSync(charFile)) {
  fs.unlinkSync(charFile);
  console.log(`Removed: ${charFile}`);
}

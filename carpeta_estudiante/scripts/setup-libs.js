const fs = require('fs');
const path = require('path');

const root = process.cwd();
const vendorDir = path.join(root, 'vendor');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFileSafe(from, to) {
  if (!fs.existsSync(from)) {
    console.error(`No se encontro: ${from}`);
    console.error('Ejecuta primero: npm install');
    process.exitCode = 1;
    return;
  }
  ensureDir(path.dirname(to));
  fs.copyFileSync(from, to);
  console.log(`Copiado: ${path.relative(root, to)}`);
}

ensureDir(vendorDir);

copyFileSafe(
  path.join(root, 'node_modules', 'papaparse', 'papaparse.min.js'),
  path.join(vendorDir, 'papaparse.min.js')
);

copyFileSafe(
  path.join(root, 'node_modules', 'chart.js', 'dist', 'chart.umd.js'),
  path.join(vendorDir, 'chart.umd.js')
);

copyFileSafe(
  path.join(root, 'node_modules', 'sweetalert2', 'dist', 'sweetalert2.all.min.js'),
  path.join(vendorDir, 'sweetalert2.all.min.js')
);

copyFileSafe(
  path.join(root, 'node_modules', 'jspdf', 'dist', 'jspdf.umd.min.js'),
  path.join(vendorDir, 'jspdf.umd.min.js')
);

copyFileSafe(
  path.join(root, 'node_modules', '@fortawesome', 'fontawesome-free', 'css', 'all.min.css'),
  path.join(vendorDir, 'fontawesome', 'css', 'all.min.css')
);

const webfontsSource = path.join(root, 'node_modules', '@fortawesome', 'fontawesome-free', 'webfonts');
const webfontsTarget = path.join(vendorDir, 'fontawesome', 'webfonts');
if (fs.existsSync(webfontsSource)) {
  ensureDir(webfontsTarget);
  for (const file of fs.readdirSync(webfontsSource)) {
    fs.copyFileSync(path.join(webfontsSource, file), path.join(webfontsTarget, file));
  }
  console.log('Copiados: vendor/fontawesome/webfonts/');
}

if (!process.exitCode) {
  console.log('\nLibrerias listas. Ahora ejecuta: npm run start');
}

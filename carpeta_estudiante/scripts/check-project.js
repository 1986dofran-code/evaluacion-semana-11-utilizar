const fs = require('fs');
const required = [
  'index.html',
  'css/styles.css',
  'js/app.js',
  'js/dataService.js',
  'js/validators.js',
  'js/reports.js',
  'js/storage.js',
  'js/ui.js',
  'data/produccion_base.csv',
  'data/inventario_base.json',
  'evidencias/bitacora_semana11.md'
];

let ok = true;
for (const file of required) {
  if (fs.existsSync(file)) {
    console.log(`OK: ${file}`);
  } else {
    console.log(`FALTA: ${file}`);
    ok = false;
  }
}

const vendor = [
  'vendor/papaparse.min.js',
  'vendor/chart.umd.js',
  'vendor/sweetalert2.all.min.js',
  'vendor/jspdf.umd.min.js',
  'vendor/fontawesome/css/all.min.css'
];

console.log('\nRevision de librerias locales:');
for (const file of vendor) {
  if (fs.existsSync(file)) console.log(`OK: ${file}`);
  else console.log(`PENDIENTE: ${file} -> ejecuta npm install y npm run setup:libs`);
}

if (!ok) process.exit(1);

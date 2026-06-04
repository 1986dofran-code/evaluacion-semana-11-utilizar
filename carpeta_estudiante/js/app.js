const AgroApp = (() => {
  const state = {
    production: [],
    inventory: [],
    findings: [],
    stats: { total: 0, ok: 0, warning: 0, error: 0, integrity: 0 },
    report: ''
  };

  function init() {
    AgroUI.verifyLibraries();
    bindEvents();
    const previous = AgroStorage.load();
    if (previous) {
      Object.assign(state, previous);
      renderAll();
    }
  }

  function bindEvents() {
    document.getElementById('btnCargarDatos').addEventListener('click', loadBaseData);
    document.getElementById('btnAnalizar').addEventListener('click', analyzeIntegrity);
    document.getElementById('btnExportarTxt').addEventListener('click', () => {
      if (!state.report) analyzeIntegrity();
      AgroReports.downloadTextReport(state.report || 'No hay reporte disponible.');
    });
    document.getElementById('btnExportarPdf').addEventListener('click', () => {
      if (!state.report) analyzeIntegrity();
      AgroReports.downloadPdfReport(state.report || 'No hay reporte disponible.');
    });

    document.getElementById('inputCsv').addEventListener('change', handleCsvUpload);
    document.getElementById('inputJson').addEventListener('change', handleJsonUpload);
  }

  async function loadBaseData() {
    try {
      const csvText = await AgroDataService.loadTextFile('data/produccion_base.csv');
      const production = AgroDataService.parseCsv(csvText);
      const inventory = await AgroDataService.loadJsonFile('data/inventario_base.json');
      state.production = production;
      state.inventory = Array.isArray(inventory) ? inventory : inventory.items || [];
      analyzeIntegrity(false);
      AgroUI.notify('success', 'Datos cargados', 'Se cargaron los archivos CSV y JSON del proyecto.');
    } catch (error) {
      console.error(error);
      AgroUI.notify('error', 'No fue posible cargar datos', error.message);
    }
  }

  async function handleCsvUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const text = await AgroDataService.readFileAsText(file);
      state.production = AgroDataService.parseCsv(text);
      analyzeIntegrity(false);
      AgroUI.notify('success', 'CSV cargado', `Archivo procesado: ${file.name}`);
    } catch (error) {
      console.error(error);
      AgroUI.notify('error', 'Error al leer CSV', error.message);
    }
  }

  async function handleJsonUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const text = await AgroDataService.readFileAsText(file);
      const parsed = JSON.parse(text);
      state.inventory = Array.isArray(parsed) ? parsed : parsed.items || [];
      analyzeIntegrity(false);
      AgroUI.notify('success', 'JSON cargado', `Archivo procesado: ${file.name}`);
    } catch (error) {
      console.error(error);
      AgroUI.notify('error', 'Error al leer JSON', error.message);
    }
  }

  function analyzeIntegrity(showMessage = true) {
    const production = state.production.map((record, index, all) => {
      const validation = AgroValidators.validateProductionRecord(record, index, all);
      return { ...record, validation };
    });

    const inventory = state.inventory.map((item) => {
      const validation = AgroValidators.validateInventoryItem(item);
      return { ...item, validation };
    });

    state.production = production;
    state.inventory = inventory;
    state.findings = buildFindings(production, inventory);
    state.stats = calculateStats(production, inventory);
    state.report = AgroReports.buildReport(state);

    AgroStorage.save(state);
    renderAll();

    if (showMessage) {
      const type = state.stats.error > 0 ? 'warning' : 'success';
      const message = state.stats.error > 0
        ? 'Se encontraron errores. Revisa tabla, JSON y reporte tecnico.'
        : 'No hay errores criticos segun las reglas implementadas.';
      AgroUI.notify(type, 'Analisis completado', message);
    }
  }

  function buildFindings(production, inventory) {
    const findings = [];

    production.forEach((record, index) => {
      record.validation.issues.forEach((message) => findings.push({ source: 'CSV', row: index + 1, status: 'error', message }));
      record.validation.warnings.forEach((message) => findings.push({ source: 'CSV', row: index + 1, status: 'warning', message }));
    });

    inventory.forEach((item, index) => {
      item.validation.issues.forEach((message) => findings.push({ source: 'JSON', row: index + 1, status: 'error', message }));
      item.validation.warnings.forEach((message) => findings.push({ source: 'JSON', row: index + 1, status: 'warning', message }));
    });

    return findings;
  }

  function calculateStats(production, inventory) {
    const validations = [...production, ...inventory].map((item) => item.validation);
    const total = validations.length;
    const ok = validations.filter((item) => item.status === 'ok').length;
    const warning = validations.filter((item) => item.status === 'warning').length;
    const error = validations.filter((item) => item.status === 'error').length;
    const integrity = total === 0 ? 0 : Math.round((ok / total) * 100);
    return { total, ok, warning, error, integrity };
  }

  function renderAll() {
    AgroUI.renderProductionTable(state.production);
    AgroUI.renderInventory(state.inventory);
    AgroUI.renderKpis(state.stats);
    AgroUI.renderChart(state.stats);
    AgroUI.renderReport(state.report);
  }

  return { init, loadBaseData, analyzeIntegrity };
})();

document.addEventListener('DOMContentLoaded', AgroApp.init);

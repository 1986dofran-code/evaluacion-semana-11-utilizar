const AgroDataService = (() => {
  async function loadTextFile(path) {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`No se pudo cargar el archivo: ${path}`);
    }
    return response.text();
  }

  async function loadJsonFile(path) {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`No se pudo cargar el archivo JSON: ${path}`);
    }
    return response.json();
  }

  function parseCsv(csvText) {
    if (!window.Papa) {
      throw new Error('PapaParse no esta disponible. Revisa si vendor/papaparse.min.js existe.');
    }

    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      transform: (value) => typeof value === 'string' ? value.trim() : value
    });

    if (parsed.errors.length > 0) {
      console.warn('Advertencias al leer CSV:', parsed.errors);
    }

    return parsed.data;
  }

  function readFileAsText(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file, 'utf-8');
    });
  }

  return {
    loadTextFile,
    loadJsonFile,
    parseCsv,
    readFileAsText
  };
})();

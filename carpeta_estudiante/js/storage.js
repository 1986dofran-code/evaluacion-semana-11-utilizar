const AgroStorage = (() => {
  const KEY = 'agrodata_integridad_semana11';

  function save(payload) {
    localStorage.setItem(KEY, JSON.stringify({ ...payload, savedAt: new Date().toISOString() }));
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      console.error('No fue posible leer localStorage:', error);
      return null;
    }
  }

  function clear() {
    localStorage.removeItem(KEY);
  }

  return { save, load, clear };
})();

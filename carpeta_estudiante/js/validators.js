const AgroValidators = (() => {
  const allowedUnitsByProduct = {
    leche: ['litros'],
    maiz: ['kilos', 'bultos'],
    cafe: ['kilos', 'arrobas'],
    yuca: ['kilos', 'bultos'],
    huevos: ['unidades']
  };

  function isEmpty(value) {
    return value === undefined || value === null || String(value).trim() === '';
  }

  function normalizeText(value) {
    return String(value || '').trim().toLowerCase();
  }

  function validateProductionRecord(record, index, allRecords) {
    const issues = [];
    const warnings = [];

    const producto = normalizeText(record.producto);
    const unidad = normalizeText(record.unidad);
    const cantidad = Number(record.cantidad);

    if (isEmpty(record.fecha)) issues.push('Fecha vacia');
    if (isEmpty(record.producto)) issues.push('Producto vacio');
    if (isEmpty(record.responsable)) warnings.push('Responsable no asignado');

    if (isEmpty(record.cantidad)) {
      issues.push('Cantidad vacia');
    } else if (Number.isNaN(cantidad)) {
      issues.push('Cantidad no numerica');
    }

    // TODO-ESTUDIANTE-01:
    // Detecta cantidades negativas. Una produccion no debe ser menor que cero.
    // Pista: si cantidad < 0, agrega un issue: 'Cantidad negativa'.

    // TODO-ESTUDIANTE-02:
    // Detecta cantidades iguales a cero como advertencia.
    // Pista: si cantidad === 0, agrega warning: 'Produccion en cero'.

    // TODO-ESTUDIANTE-03:
    // Detecta unidades incoherentes segun el producto.
    // Ejemplo: leche no deberia estar en kilos.
    // Usa allowedUnitsByProduct.

    // TODO-ESTUDIANTE-04:
    // Detecta registros duplicados con misma fecha, producto y responsable.
    // Pista: usa allRecords.findIndex(...).

    return buildValidationResult(issues, warnings);
  }

  function validateInventoryItem(item) {
    const issues = [];
    const warnings = [];

    if (isEmpty(item.producto)) issues.push('Producto de inventario vacio');
    if (isEmpty(item.categoria)) warnings.push('Categoria no definida');

    // TODO-ESTUDIANTE-05:
    // Valida que item.cantidad exista, sea numerica y no sea negativa.
    // Si el stock es cero, debe ser advertencia, no error.

    // TODO-ESTUDIANTE-06:
    // Valida que item.estado sea uno de estos valores:
    // disponible, bajo, agotado, revisar

    return buildValidationResult(issues, warnings);
  }

  function buildValidationResult(issues, warnings) {
    if (issues.length > 0) {
      return { status: 'error', label: 'Error', issues, warnings };
    }

    if (warnings.length > 0) {
      return { status: 'warning', label: 'Advertencia', issues, warnings };
    }

    return { status: 'ok', label: 'Valido', issues, warnings };
  }

  return {
    validateProductionRecord,
    validateInventoryItem,
    isEmpty,
    normalizeText
  };
})();

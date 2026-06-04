const AgroReports = (() => {
  function buildReport(state) {
    const stats = state.stats || { total: 0, ok: 0, warning: 0, error: 0, integrity: 0 };
    const lines = [];
    lines.push('REPORTE DE INTEGRIDAD DE DATOS');
    lines.push('=================================');
    lines.push(`Fecha de generacion: ${new Date().toLocaleString()}`);
    lines.push('');
    lines.push(`Total de registros: ${stats.total}`);
    lines.push(`Registros validos: ${stats.ok}`);
    lines.push(`Advertencias: ${stats.warning}`);
    lines.push(`Errores: ${stats.error}`);
    lines.push(`Porcentaje de integridad: ${stats.integrity}%`);
    lines.push('');
    lines.push('Hallazgos principales:');

    const findings = state.findings || [];
    if (findings.length === 0) {
      lines.push('- No hay hallazgos registrados.');
    } else {
      findings.slice(0, 30).forEach((finding) => {
        lines.push(`- [${finding.status.toUpperCase()}] ${finding.source} fila ${finding.row}: ${finding.message}`);
      });
    }

    lines.push('');
    lines.push('TODO-ESTUDIANTE-07: Agrega una conclusion tecnica al reporte.');
    lines.push('CONCLUSION TECNICA:');
    lines.push('El analisis revela que la integridad de los datos es fundamental para la precision operativa.');
    lines.push('Se recomienda la correccion inmediata de los registros marcados con error para evitar sesgos en los KPIs.');
    return lines.join('\n');
  }

  function downloadTextReport(content, filename = 'reporte_integridad.txt') {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  function downloadPdfReport(content, filename = 'reporte_integridad.pdf') {
    // TODO-ESTUDIANTE-08:
    // Esta funcion depende de jsPDF. Revisa en consola si window.jspdf existe.
    // Completa la generacion del PDF usando window.jspdf.jsPDF.
    if (!window.jspdf) {
      alert('La libreria jsPDF no esta cargada. Ejecuta el setup de librerias.');
      return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const splitText = doc.splitTextToSize(content, 180);
    doc.setFont('courier', 'normal');
    doc.setFontSize(10);
    doc.text(splitText, 15, 15);
    
    doc.save(filename);
  }

  return { buildReport, downloadTextReport, downloadPdfReport };
})();

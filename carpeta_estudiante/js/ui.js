const AgroUI = (() => {
  let chartInstance = null;

  function verifyLibraries() {
    const libs = [
      { name: 'PapaParse', ok: Boolean(window.Papa), file: 'vendor/papaparse.min.js' },
      { name: 'Chart.js', ok: Boolean(window.Chart), file: 'vendor/chart.umd.js' },
      { name: 'SweetAlert2', ok: Boolean(window.Swal), file: 'vendor/sweetalert2.all.min.js' },
      { name: 'jsPDF', ok: Boolean(window.jspdf), file: 'vendor/jspdf.umd.min.js' },
      { name: 'Font Awesome', ok: isFontAwesomeLoaded(), file: 'vendor/fontawesome/css/all.min.css' }
    ];

    const container = document.getElementById('estadoLibrerias');
    const missing = libs.filter((lib) => !lib.ok);
    container.innerHTML = `
      <h2><i class="fa-solid fa-plug-circle-check"></i> Estado de librerias</h2>
      <ul>
        ${libs.map((lib) => `<li class="${lib.ok ? 'status-ok' : 'status-bad'}">${lib.ok ? 'OK' : 'FALTA'} · ${lib.name}<br><small>${lib.file}</small></li>`).join('')}
      </ul>
      ${missing.length ? '<p class="hint">Ejecuta npm install y npm run setup:libs. Luego recarga la pagina.</p>' : '<p class="status-ok">Todas las librerias estan disponibles.</p>'}
    `;

    return { libs, missing };
  }

  function isFontAwesomeLoaded() {
    const test = document.createElement('i');
    test.className = 'fa-solid fa-check';
    document.body.appendChild(test);
    const fontFamily = getComputedStyle(test).fontFamily;
    test.remove();
    return /Font Awesome/i.test(fontFamily);
  }

  function notify(type, title, text) {
    if (window.Swal) {
      Swal.fire({ icon: type, title, text, confirmButtonColor: '#1769e0' });
    } else {
      alert(`${title}\n${text}`);
    }
  }

  function renderProductionTable(records) {
    const tbody = document.getElementById('tablaProduccion');
    if (!records.length) {
      tbody.innerHTML = '<tr><td colspan="8" class="empty">No hay registros para mostrar.</td></tr>';
      return;
    }

    tbody.innerHTML = records.map((item, index) => {
      const validation = item.validation;
      const rowClass = validation.status === 'error' ? 'row-error' : validation.status === 'warning' ? 'row-warning' : '';
      const badgeClass = validation.status === 'ok' ? 'ok' : validation.status === 'warning' ? 'warn' : 'error';
      const observations = [...validation.issues, ...validation.warnings].join('; ') || 'Sin observaciones';
      return `
        <tr class="${rowClass}">
          <td>${index + 1}</td>
          <td>${escapeHtml(item.fecha)}</td>
          <td>${escapeHtml(item.producto)}</td>
          <td>${escapeHtml(item.cantidad)}</td>
          <td>${escapeHtml(item.unidad)}</td>
          <td>${escapeHtml(item.responsable)}</td>
          <td><span class="badge ${badgeClass}">${validation.label}</span></td>
          <td>${escapeHtml(observations)}</td>
        </tr>
      `;
    }).join('');
  }

  function renderInventory(items) {
    const container = document.getElementById('listaInventario');
    if (!items.length) {
      container.innerHTML = '<p class="empty">No hay inventario para mostrar.</p>';
      return;
    }

    container.innerHTML = items.map((item) => {
      const validation = item.validation;
      const badgeClass = validation.status === 'ok' ? 'ok' : validation.status === 'warning' ? 'warn' : 'error';
      const observations = [...validation.issues, ...validation.warnings].join('; ') || 'Sin observaciones';
      return `
        <article class="inventory-item">
          <h3>${escapeHtml(item.producto || 'Producto sin nombre')}</h3>
          <p><strong>Cantidad:</strong> ${escapeHtml(item.cantidad)}</p>
          <p><strong>Unidad:</strong> ${escapeHtml(item.unidad || 'No definida')}</p>
          <p><strong>Estado:</strong> ${escapeHtml(item.estado || 'No definido')}</p>
          <p><span class="badge ${badgeClass}">${validation.label}</span></p>
          <p>${escapeHtml(observations)}</p>
        </article>
      `;
    }).join('');
  }

  function renderKpis(stats) {
    document.getElementById('kpiTotal').textContent = stats.total;
    document.getElementById('kpiValidos').textContent = stats.ok;
    document.getElementById('kpiAdvertencias').textContent = stats.warning;
    document.getElementById('kpiErrores').textContent = stats.error;
    document.getElementById('kpiIntegridad').textContent = `${stats.integrity}%`;
  }

  function renderReport(content) {
    document.getElementById('reporteTexto').textContent = content;
  }

  function renderChart(stats) {
    const canvas = document.getElementById('graficoIntegridad');
    if (!window.Chart) {
      canvas.replaceWith(createChartFallback(stats));
      return;
    }

    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['Validos', 'Advertencias', 'Errores'],
        datasets: [{
          data: [stats.ok, stats.warning, stats.error],
          backgroundColor: ['#0f8a4b', '#b7791f', '#c53030'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }

  function createChartFallback(stats) {
    const div = document.createElement('div');
    div.className = 'report-box';
    div.textContent = `Chart.js no esta disponible. Resumen: validos ${stats.ok}, advertencias ${stats.warning}, errores ${stats.error}.`;
    return div;
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
  }

  return {
    verifyLibraries,
    notify,
    renderProductionTable,
    renderInventory,
    renderKpis,
    renderReport,
    renderChart
  };
})();

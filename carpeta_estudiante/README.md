# AgroData Integridad Pro - Actividad Semana 11

## Tema

**Manejo de archivos y datos simples; integridad y organizacion de informacion.**

## Proposito

En esta practica vas a abrir una web en VS Code, instalar librerias, diagnosticar errores, analizar archivos `.csv` y `.json`, completar validaciones en JavaScript y documentar tus hallazgos en una bitacora.

La aplicacion trabaja con datos de produccion rural e inventario. No basta con que la pagina abra: debes verificar que los datos esten completos, sean coherentes y esten organizados.

---

## 1. Estructura del proyecto

```text
carpeta_estudiante/
├── README.md
├── package.json
├── index.html
├── css/styles.css
├── js/
│   ├── app.js
│   ├── dataService.js
│   ├── validators.js
│   ├── reports.js
│   ├── storage.js
│   └── ui.js
├── data/
│   ├── produccion_base.csv
│   ├── inventario_base.json
│   └── datos_con_errores.csv
├── reportes/reporte_base.txt
├── evidencias/
│   ├── bitacora_semana11.md
│   ├── checklist_integridad.md
│   └── respuestas_estudiante.md
└── scripts/
    ├── setup-libs.js
    └── check-project.js
```

---

## 2. Librerias que usa la web

La pagina necesita cinco librerias externas. En esta actividad no se cargan por internet directamente; debes instalarlas y copiarlas a la carpeta `vendor/`.

| Libreria | Funcion en la web |
|---|---|
| PapaParse | Leer y convertir archivos CSV |
| Chart.js | Mostrar grafico de integridad |
| SweetAlert2 | Mostrar alertas profesionales |
| Font Awesome | Mostrar iconos visuales |
| jsPDF | Exportar reporte PDF |

---

## 3. Instalacion paso a paso

### Paso 1: abrir la carpeta en VS Code

Abre esta carpeta completa en VS Code:

```text
carpeta_estudiante/
```

### Paso 2: abrir terminal

En VS Code abre:

```text
Terminal > New Terminal
```

### Paso 3: verificar Node.js

Ejecuta:

```bash
node -v
npm -v
```

Si esos comandos no funcionan, debes instalar Node.js antes de continuar.

### Paso 4: instalar librerias

Ejecuta:

```bash
npm install
```

### Paso 5: copiar librerias a vendor

Ejecuta:

```bash
npm run setup:libs
```

Esto creara la carpeta:

```text
vendor/
```

### Paso 6: revisar estructura

Ejecuta:

```bash
npm run check
```

### Paso 7: iniciar servidor local

Ejecuta:

```bash
npm run start
```

Luego abre en el navegador:

```text
http://localhost:5500
```

Tambien puedes usar Live Server si lo tienes instalado.

---

## 4. Errores esperados al inicio

Esta actividad contiene errores intencionales. Debes encontrarlos y documentarlos.

### Error 1: librerias faltantes

Si no ejecutas `npm install` y `npm run setup:libs`, la web mostrara que faltan librerias.

Debes revisar:

- consola del navegador;
- pestana Network;
- tarjeta "Estado de librerias";
- carpeta `vendor/`.

### Error 2: datos con problemas en CSV

Revisa:

```text
data/produccion_base.csv
```

Busca:

- campos vacios;
- cantidades negativas;
- cantidades no numericas;
- unidades incoherentes;
- duplicados.

### Error 3: datos con problemas en JSON

Revisa:

```text
data/inventario_base.json
```

Busca:

- cantidad negativa;
- cantidad en texto;
- producto vacio;
- estado no reconocido.

### Error 4: validaciones incompletas en JavaScript

Abre:

```text
js/validators.js
```

Busca las marcas:

```text
TODO-ESTUDIANTE
```

Debes completar esas validaciones.

### Error 5: exportacion PDF incompleta

Abre:

```text
js/reports.js
```

Completa el TODO relacionado con `jsPDF`.

---

## 5. Tareas que debes realizar

1. Instalar y preparar las librerias.
2. Ejecutar la web correctamente.
3. Cargar los datos base.
4. Analizar la integridad.
5. Revisar CSV y JSON.
6. Completar los TODO en `validators.js`.
7. Completar la exportacion PDF en `reports.js`.
8. Corregir o proponer correcciones para los datos con errores.
9. Exportar reporte TXT.
10. Exportar reporte PDF.
11. Completar la bitacora.
12. Completar el checklist.
13. Responder las preguntas de evidencia.

---

## 6. Evidencias obligatorias

Completa estos archivos:

```text
evidencias/bitacora_semana11.md
evidencias/checklist_integridad.md
evidencias/respuestas_estudiante.md
```

Incluye capturas de:

1. VS Code con la estructura del proyecto.
2. Terminal despues de `npm install`.
3. Terminal despues de `npm run setup:libs`.
4. Web mostrando librerias correctas.
5. Tabla con datos analizados.
6. Grafico de integridad.
7. Reporte generado.
8. Exportacion TXT o PDF.

---

## 7. Resultado esperado

Al finalizar, la web debe:

- cargar librerias correctamente;
- leer CSV con PapaParse;
- leer JSON con `fetch`;
- detectar errores de integridad;
- mostrar KPIs;
- mostrar grafico con Chart.js;
- mostrar alertas con SweetAlert2;
- usar iconos de Font Awesome;
- exportar TXT;
- exportar PDF con jsPDF;
- guardar estado en `localStorage`;
- tener bitacora completa.

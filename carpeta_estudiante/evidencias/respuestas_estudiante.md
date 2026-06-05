# Respuestas del estudiante

## 1. ¿Que funcion cumple cada libreria usada?

PapaParse: se usa para leer y convertir archivos CSV en objetos JavaScript, especialmente para cargar y analizar los datos de producción.

Chart.js: permite dibujar gráficos en la página para mostrar visualmente los indicadores y comparar el estado de la integridad de los datos.

SweetAlert2: muestra mensajes y notificaciones más amigables en la interfaz cuando se cargan archivos, se completa el análisis o hay errores.

Font Awesome: provee iconos en la interfaz, por ejemplo en botones o elementos visuales, para hacer la aplicación más clara y profesional.

jsPDF: genera y descarga un reporte en formato PDF con los resultados del análisis de datos y la integridad.

## 2. ¿Que diferencia hay entre CSV y JSON?

Respuesta: CSV es un formato de texto plano con datos separados por comas en filas y columnas, ideal para tablas simples. JSON es un formato estructurado con objetos y arreglos, que permite representar relaciones más complejas y nombres de campos, además de ser más fácil de usar directamente en JavaScript.

## 3. ¿Que significa integridad de informacion?

Respuesta: la integridad de información significa que los datos son completos, correctos y consistentes. Unos datos con integridad no tienen campos vacíos, errores de formato, duplicados ni valores incoherentes.

## 4. Menciona tres errores encontrados en los datos

1. Registros de producción con fecha vacía o incompleta.
2. Cantidades no numéricas o valores negativos en la producción.
3. Unidades incoherentes con el producto (por ejemplo leche en kilos).

## 5. ¿Que validacion agregaste en JavaScript y por que?

Respuesta: agregué validaciones para comprobar que los registros tienen fecha, producto y cantidad válidos; que la cantidad sea numérica y no negativa; y que las unidades sean coherentes según el tipo de producto. También validé los items de inventario para detectar stock vacío, no numérico o estados inválidos. Esto se hace para evitar que datos erróneos entren al análisis y generen reportes falsos.

## 6. ¿Por que no es recomendable guardar datos sin revisarlos?

Respuesta: porque datos sin revisar pueden contener errores, ser inconsistentes o estar incompletos. Guardarlos así puede llevar a decisiones equivocadas, informes incorrectos y pérdida de tiempo al corregirlos después.

## 7. ¿Como ayuda la organizacion de carpetas a mantener un proyecto?

Respuesta: la organización de carpetas separa los archivos por tipo (HTML, CSS, JS, datos, librerías, evidencias), lo que facilita encontrar, mantener y actualizar el proyecto. También ayuda a trabajar en equipo y a que el código sea más claro y ordenado.

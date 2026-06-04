# Checklist de integridad de informacion

Marca cada criterio despues de probar el proyecto.

## Organizacion del proyecto

- [si] La carpeta del proyecto abre correctamente en VS Code.
- [si] Los archivos HTML, CSS y JS estan separados.
- [si] Los datos estan en la carpeta `data/`.
- [si] Las evidencias estan en la carpeta `evidencias/`.
- [si] Las librerias estan en la carpeta `vendor/` despues de ejecutar el setup.

## Datos CSV

- [si] El CSV tiene encabezados claros.
- [si] No hay campos obligatorios vacios.
- [si] No hay cantidades negativas sin detectar.
- [ ] No hay cantidades no numericas sin detectar.
- [si] Las unidades son coherentes con los productos.
- [si] Se detectan duplicados o posibles duplicados.

## Datos JSON

- [si] El JSON tiene estructura valida.
- [si] Todos los productos tienen nombre.
- [si] Las cantidades son numericas.
- [ ] No hay cantidades negativas sin detectar.
- [si] Los estados son reconocibles.

## Funcionamiento de la web

- [si] La pagina carga correctamente.
- [si] La consola no muestra errores criticos despues de instalar librerias.
- [si] Los KPIs se actualizan.
- [si] El grafico se muestra correctamente.
- [si] El reporte TXT se descarga.
- [si] El reporte PDF se descarga.

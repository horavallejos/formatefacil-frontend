# Guía de Implementación y Despliegue (Hostinger / Shared Hosting)

## 1. Despliegue del Frontend (ESTO ES LO QUE NECESITAS AHORA)

**¡IMPORTANTE!**: No necesitas NodeJS en tu servidor de Hostinger.
React genera archivos estáticos (HTML, CSS, JS) que funcionan en cualquier servidor web.

### Pasos para subir tu web:

1.  **En tu computadora**:
    *   Abre la terminal en la carpeta del proyecto.
    *   Ejecuta: `npm run build`
    *   Esto creará una carpeta llamada `dist` (o `build`).

2.  **En tu Hosting (Hostinger)**:
    *   Ve al "Administrador de Archivos" -> `public_html`.
    *   Sube **todo el contenido** que está DENTRO de la carpeta `dist` de tu computadora.
    *   Sube también el archivo `.htaccess` que he incluido en el código.

**Resultado**: Tu web funcionará perfectamente, súper rápida, y sin pagar extras por servidores VPS o NodeJS.

---

## 2. Gestión de Cursos (Versión "Sin Backend")

Actualmente, la web lee los cursos del archivo `constants.ts`.

*   **Para cambiar un precio o pausar un curso**:
    1.  Editas el archivo `constants.ts` en tu computadora.
    2.  Ejecutas `npm run build` nuevamente.
    3.  Subes los nuevos archivos al hosting.

Esto es ideal para empezar porque es **gratis, irrompible y seguro**.

---

## 3. Backend Futuro (Opción PHP / Laravel)

Como mencionaste que tu hosting soporta Laravel/PHP y no NodeJS, esta es la ruta a seguir cuando quieras administrar cursos desde un panel sin editar código.

No uses Python si tu hosting no lo soporta nativamente. Usa lo que ya tienes.

### Estructura sugerida con PHP:

1.  **Base de Datos**: MySQL (Crear desde cPanel).
2.  **API Backend**: Un script sencillo en PHP o una instalación limpia de Laravel.
    *   Crear ruta `GET /api/cursos` que devuelva un JSON con los cursos desde la base de datos.
3.  **Frontend React**:
    *   En lugar de leer `constants.ts`, modificamos el `App.tsx` para hacer:
        ```javascript
        fetch('https://tudominio.com/api/cursos')
          .then(res => res.json())
          .then(data => setCourses(data));
        ```

### Resumen
Por ahora, **sigue con la versión estática**. Es lo más profesional en términos de rendimiento (carga instantánea) y te ahorra dolores de cabeza de configuración de servidores.
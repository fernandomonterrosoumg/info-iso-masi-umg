# Madurez en la adopción de ISO/IEC 27001 en empresas tecnológicas guatemaltecas

Repositorio del tablero de apoyo a la investigación de la Universidad Mariano Gálvez de Guatemala sobre prácticas de seguridad de la información, incidentes y beneficios organizacionales percibidos. Permite consultar indicadores, filtrar registros y exportar tablas y gráficas para revisión académica.

El código corresponde a la herramienta de consulta. Los datos de participantes, las credenciales y la infraestructura de producción se mantienen fuera del repositorio.

## Objetivo de investigación

Evaluar el nivel de adopción de ISO/IEC 27001 en empresas del sector tecnológico de Guatemala, identificar brechas en liderazgo, gestión de riesgos, controles y evaluación, y orientar estrategias de mejora. Los indicadores reflejan prácticas declaradas por los informantes; no constituyen una certificación ni una auditoría de cumplimiento.

## Tecnología y arquitectura

| Componente | Tecnología y función |
| --- | --- |
| Interfaz | HTML5, CSS y JavaScript; Vue 3.4.38 para filtros, tablas y estado |
| Visualización | Chart.js 4.4.1 |
| Exportación | ExcelJS 4.4.0 para archivos XLSX; canvas para imágenes PNG |
| Base consultada por esta versión | PostgreSQL alojado en Neon, mediante Data API REST |
| Autorización de consulta | JWT manual temporal o token anónimo solicitado a Neon Auth, según configuración |
| Desarrollo local | Python 3, sin paquetes adicionales, para servir recursos y configuración pública |
| Almacenamiento descrito en el manuscrito | SQL Server 2019 |

El navegador solicita las vistas analíticas a Neon y calcula agrupaciones y resúmenes para mostrarlos. El servidor Python no importa encuestas, no ejecuta consultas SQL y no actúa como intermediario de autenticación.

**Alcance documental:** el manuscrito menciona SQL Server 2019; el código entregado consume PostgreSQL/Neon. No se adjuntaron scripts de migración, DDL, importación ni generación de vistas. No se presupone que ambos motores sean la misma instalación ni que la migración esté reproducida en este repositorio.

## Metodología

### Diseño, participantes y unidades de análisis

Según el manuscrito de contexto, el estudio fue cuantitativo, no experimental, descriptivo y correlacional, de corte transversal. Se utilizó muestreo no probabilístico por conveniencia con profesionales de empresas guatemaltecas medianas y grandes, vinculados con tecnología, seguridad, operaciones o gestión de riesgos. La participación fue voluntaria.

La recolección correspondió a 2025, con información disponible desde diciembre de ese año. En octubre de 2026 se depuró y consolidó la base y se refinó el tablero. Estas fechas y cantidades provienen del manuscrito; no son una verificación independiente sobre la base remota.

| Instrumento | Formularios | Sin identificador empresarial |
| --- | ---: | ---: |
| Adopción ISO/IEC 27001 | 51 | 1 |
| Impacto percibido | 61 | 11 |
| Ficha de incidentes | 52 | 0 |
| Total | 164 | 12 |

Se identificaron 17 empresas, de las cuales 15 tenían información en los tres instrumentos. El formulario es la unidad de registro y la empresa es la unidad de comparación. Varias respuestas de una organización no equivalen a varias empresas.

### Instrumentos y procedencia

Las respuestas se recolectaron mediante Google Forms en tres instrumentos:

1. **Adopción:** doce ítems, escala de 1 a 5, distribuidos en liderazgo y política, gestión de riesgos, controles y operación, y evaluación y mejora. Cada dimensión contiene tres ítems.
2. **Impacto:** seis ítems, escala de 1 a 5; tres sobre seguridad y tres sobre competitividad y confianza. Son percepciones de informantes, sin medición directa de clientes.
3. **Incidentes:** diez campos sobre perfil, incidentes de los últimos doce meses, tipologías múltiples, impacto económico por rangos, recuperación, registro formal, acciones correctivas y disminución declarada.

### Depuración y preparación de la base

El procedimiento descrito en el manuscrito conservó el identificador de formulario, el instrumento y la empresa cuando estaba informada. Se comprobaron rangos de 1 a 5 y la codificación de variables numéricas y categóricas. Los vacíos se conservaron y se excluyeron del cálculo correspondiente, sin imputarlos como cero.

Los doce formularios sin identificador empresarial se mantuvieron en los descriptivos de su instrumento y se excluyeron de las comparaciones entre empresas. Para asociaciones, se promediaron primero las respuestas de cada organización, asignando igual peso a cada empresa.

El tablero contempla el campo `origen`, con valores `real` y `simulado`, y permite filtrarlos. La disponibilidad de ese filtro no prueba que la muestra del manuscrito contenga datos simulados. Para contrastar resultados empíricos debe seleccionarse **Reales** y verificarse la procedencia de los registros; el filtro inicial del tablero muestra todos los orígenes.

### Procesamiento en esta aplicación

La aplicación consulta cada vista por separado, en páginas de hasta 1,000 filas, con orden explícito. Después aplica filtros por origen y características empresariales, agrupa respuestas y construye indicadores, distribuciones y gráficas. Si falta la vista opcional de detalle, reconstruye una representación por pregunta a partir de las otras vistas.

| Vista requerida por el tablero | Contenido esperado |
| --- | --- |
| `v_empresa_resumen` | Resumen por empresa y atributos de clasificación |
| `v_iso_adopcion` | Puntuaciones, dimensiones e índice de adopción |
| `v_impacto_competitividad` | Resultados de impacto percibido |
| `v_ficha_incidentes` | Respuestas de la ficha de incidentes |
| `v_ficha_tipos_incidente` | Tipologías seleccionadas por ficha |
| `v_likert_detalle` | Valores de ítems, pregunta e instrumento |
| `v_respuestas_detalle` | Detalle de respuestas; consulta opcional |

Las vistas deben existir y exponer las columnas utilizadas en `assets/js/tablero.js`. No se crea automáticamente una base al iniciar el proyecto.

### Indicadores y análisis estadístico

El manuscrito establece medias, frecuencias, porcentajes y desviaciones estándar. La adopción se resume con la media de los doce ítems y con medias de tres ítems por dimensión. El índice se define como:

```text
índice de adopción = (promedio de adopción − 1) × 25
```

El tablero recibe el índice y los promedios por respuesta desde las vistas y calcula resúmenes sobre los registros filtrados. También calcula frecuencias, porcentajes, medias, medianas y extremos para las preguntas correspondientes. En selección múltiple, los porcentajes pueden sumar más de 100 %. Los incidentes representan reportes por ficha y no deben sumarse como eventos únicos de una empresa.

Para las asociaciones, el manuscrito reporta Spearman sobre las 15 empresas con información en los tres instrumentos y consistencia interna mediante alfa de Cronbach. Indica una verificación sobre exportaciones Excel con Python 3.12.14, pandas 2.2.3 y SciPy 1.17.0. **Estos análisis y dependencias corresponden al procedimiento reportado; sus scripts no están incluidos y el tablero no calcula Spearman ni alfa de Cronbach.**

Las etiquetas Inicial, Repetible, Definido, Gestionado y Optimizado son categorías descriptivas de la aplicación. Su uso no acredita certificación ISO ni valida por sí mismo un modelo de madurez.

### Interpretación, confidencialidad y límites

El muestreo por conveniencia limita la generalización. Las asociaciones no establecen causalidad. Los beneficios de negocio son percepciones y los recuentos pueden incluir varios informantes de una empresa. Los resultados del tablero pueden diferir del manuscrito por filtros, actualización de la base o tratamiento de faltantes.

El manuscrito señala difusión agregada y acceso restringido al equipo. Esta interfaz permite consultar y exportar detalle, incluidos nombres empresariales si la API los devuelve: antes de hacerla pública, la fuente debe anonimizarse y sus permisos deben limitarse. El código de presentación no sustituye los controles de acceso de la base.

## Ejecutar localmente

Requiere Python 3 y un navegador moderno. Las bibliotecas del navegador se descargan desde jsDelivr; se necesita conexión a internet.

```bash
cp .env.example .env
# Editar .env con las URL del entorno autorizado
python3 scripts/serve.py
```

Abrir `http://127.0.0.1:8000`. En esta copia de trabajo ya se conserva la configuración anterior en `.env`; no es necesario reemplazarla con el ejemplo.

Variables admitidas: `DATA_API_URL`, `AUTH_URL` y `PORT` (por defecto 8000). Las variables del proceso tienen prioridad sobre `.env`. El lector admite líneas simples `CLAVE=valor`, sin expansión de variables. Si se usa JWT manual, introducir únicamente un token temporal de lectura en el panel; permanece en memoria durante la sesión.

El servidor publica únicamente el HTML, CSS, JavaScript y `/config.json`. Este último contiene las dos URL públicas de conexión, nunca el contenido completo de `.env`. Las URL usadas por el navegador son visibles para quien acceda a la aplicación: excluirlas de Git separa entornos, pero no las convierte en secretos.

## Estructura

```text
tablero_iso27001_2.html   Plantilla y estructura de la interfaz
assets/css/tablero.css  Diseño visual
assets/js/tablero.js    Consultas, filtros, indicadores y exportaciones
scripts/serve.py        Servidor local y lectura de configuración
.env.example            Plantilla sin credenciales
.gitignore              Exclusiones de entornos, datos y producción
docs/SEGURIDAD.md        Controles de publicación y acceso
```

## API privada y solicitud de acceso

La API del proyecto se mantiene en un repositorio privado por razones de seguridad y confidencialidad de la información de investigación. Su código y configuración de infraestructura no se publican en este repositorio del tablero. El acceso se concede previa autorización del equipo investigador y con los permisos necesarios para el propósito académico solicitado.

Para solicitar acceso, utiliza el [enlace](https://github.com/fernandomonterrosoumg/info-iso-masi-umg/issues).

**Enlace para solicitar acceso:** pendiente de configurar con la dirección de contacto o formulario oficial del proyecto.

# Configuración y acceso

El servidor incluido es de desarrollo y escucha solo en `127.0.0.1`. No debe usarse como servidor de producción. Publica una lista cerrada de recursos para evitar servir `.env`, documentos, código Python o respaldos.

## Controles incluidos

- Configuración local separada y excluida mediante `.gitignore`.
- Plantilla `.env.example` sin direcciones del entorno real.
- JWT manual oculto en el formulario y conservado solo en memoria; el almacenamiento local guarda únicamente las URL de conexión.
- Validación de URL HTTPS sin credenciales incrustadas antes de conectar.
- Cabeceras locales `nosniff`, `no-referrer`, `DENY` y `no-store`.
- Sin conexión directa del navegador mediante contraseña de PostgreSQL.

## Controles que debe aplicar el administrador de la base

El token anónimo identifica una sesión anónima, no a un investigador autorizado. Si ese rol permite leer nombres o respuestas, cualquier visitante con acceso a la API puede obtenerlos. Para datos privados, exigir autenticación de usuarios autorizados y permisos adecuados en Neon.

Conceder solo lectura sobre vistas explícitamente autorizadas. Revisar permisos de tablas subyacentes y políticas de acceso para evitar que una vista exponga registros privados. No conceder escritura ni administración al rol del tablero. El filtrado de Vue no es una barrera de seguridad.

Publicar únicamente vistas anonimizadas o agregadas cuando la aplicación sea de acceso público. Limitar los orígenes CORS de acuerdo con el despliegue; CORS no reemplaza la autorización. Usar TLS en producción y revisar exportaciones antes de compartirlas.

Nunca colocar contraseñas, cadenas de conexión administrativas, claves privadas o tokens permanentes en HTML, JavaScript o configuración enviada al navegador. Las dependencias actuales se cargan desde un CDN con versiones fijas; para un despliegue controlado, evaluar su distribución local y una política CSP compatible con el compilador de plantillas de Vue utilizado.

No se verificaron los permisos de Neon ni se consultaron datos remotos durante esta preparación. Estos controles locales no permiten afirmar que la infraestructura cumpla ISO/IEC 27001.

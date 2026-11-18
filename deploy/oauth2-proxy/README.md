# Acceso de PJ-DOCS con Google

OAuth2 Proxy protege el acceso público a `https://pdf.csjla.pe` y reenvía las solicitudes autenticadas a `http://pj-docs:8080`. HAProxy debe conservar la ruta directa a PJ-DOCS para los clientes de la red interna y enviar todo el tráfico público del sitio, incluido `/oauth2/callback`, al proxy.

## Configuración en el servidor

[`docker-compose.oauth2.yml`](docker-compose.oauth2.yml) fija la imagen `quay.io/oauth2-proxy/oauth2-proxy:v7.15.6`, publica el puerto solo en `172.17.128.91:4180` y monta `templates/` en modo de solo lectura. Mantén el archivo Compose y ese directorio juntos.

1. Crea `/home/administrator/pj-docs-oauth/oauth2.env` fuera del repositorio, con permisos `0600`. Usa [`oauth2.env.example`](oauth2.env.example) como referencia. Rellena `OAUTH2_PROXY_CLIENT_ID` y `OAUTH2_PROXY_CLIENT_SECRET` con los valores del cliente web de Google y genera la clave de sesión.

   ```sh
   python3 -c 'import base64, secrets; print(base64.urlsafe_b64encode(secrets.token_bytes(32)).decode())'
   ```

   Guarda el resultado como `OAUTH2_PROXY_COOKIE_SECRET`. El origen registrado en Google es `https://pdf.csjla.pe` y la URI de redirección es `https://pdf.csjla.pe/oauth2/callback`.
2. Define `PJ_DOCS_DOCKER_NETWORK` con el nombre de la red Docker existente en la que `pj-docs` resuelve como servicio o alias. Define `PJ_DOCS_HAPROXY_CIDRS` con la IP o los CIDR de los proxies de confianza tal como los ve el contenedor, separados por comas y sin espacios. Puedes exportar ambas variables o pasarlas a Compose con un `--env-file` separado para interpolación.
3. Configura HAProxy para terminar TLS, enviar el host y protocolo públicos en las cabeceras reenviadas y reemplazar las cabeceras que provengan del cliente. Restringe el acceso directo al puerto 4180 al HAProxy. Valida y arranca el servicio desde este directorio.

   ```sh
   docker compose -f docker-compose.oauth2.yml config --quiet
   docker compose -f docker-compose.oauth2.yml up -d
   ```

| Configuración | Comportamiento |
| --- | --- |
| `--provider=google`, `--email-domain=pj.gob.pe` | Usa Google y admite correos verificados del dominio institucional. |
| `--reverse-proxy=true`, `--trusted-proxy-ip` | Acepta cabeceras reenviadas de los proxies configurados. |
| `--skip-provider-button=false`, `--custom-templates-dir` | Muestra las páginas de PJ-DOCS. |
| `--redirect-url=https://pdf.csjla.pe/oauth2/callback`, `--prompt=select_account`, `--code-challenge-method=S256` | Usa el callback registrado, el selector de cuentas de Google y PKCE. |
| `--cookie-secure=true`, `--cookie-domain=pdf.csjla.pe`, `--cookie-samesite=lax` | Limita la cookie a HTTPS y permite el retorno desde Google. |
| `--cookie-expire=12h`, `--cookie-refresh=45m` | Fija la vigencia de la cookie en 12 horas por emisión. Cuando la renovación de Google tiene éxito, se vuelve a emitir la cookie. |
| `--upstream=http://pj-docs:8080`, `--upstream-timeout=0s` | Transmite el cuerpo al upstream sin límite de tamaño en OAuth2 Proxy. El valor `0s` desactiva el tiempo de espera de las cabeceras de respuesta del upstream. Los límites y tiempos de HAProxy y PJ-DOCS se gestionan allí. |

Para restringir el acceso a miembros de un grupo, agrega `--google-group=<grupo>@pj.gob.pe` junto con `--google-admin-email` y `--google-service-account-json`. El JSON de la cuenta de servicio debe montarse desde fuera del repositorio y la cuenta necesita la delegación de todo el dominio para consultar grupos en Google Workspace. [Configuración oficial del proveedor Google](https://oauth2-proxy.github.io/oauth2-proxy/configuration/providers/google/)

## Plantillas y vistas previas

OAuth2 Proxy carga las dos plantillas en un mismo conjunto. `sign_in.html` contiene los estilos y los bloques compartidos con `error.html`. El botón de entrada usa el SVG multicolor oficial de Google y la fuente Google Sans Medium incrustada. [Carga de plantillas en v7.15.6](https://github.com/oauth2-proxy/oauth2-proxy/blob/v7.15.6/pkg/app/pagewriter/templates.go) · [Guía de marca de Google](https://developers.google.com/identity/branding-guidelines?hl=es-419)

Ambas páginas comparten una tarjeta con una ilustración de trabajo con documentos, el logo de PJ-DOCS y el emblema de la CSJLA. La ilustración, el logo y el favicon de [`assets/`](assets/) se incrustan en `sign_in.html` como URL de datos porque OAuth2 Proxy carga las plantillas sin servir esos archivos. En pantallas pequeñas los paneles se apilan.

Ambas vistas usan la fotografía de la sede judicial del [acceso del Portal CSJLA](https://csjla.pe/admin/login). La [imagen](assets/csjla-portal-background.webp) va incrustada en la plantilla, con un velo borgoña fijo que se adapta al tema del sistema.

El formulario usa `.ProxyPrefix` y `.Redirect` para enviar `rd` a `/start`. La página de error usa también `.StatusCode`, `.Title`, `.Message`, `.RequestID`, `.Footer` y `.Version`. El 403 incluye el requisito del dominio y permite elegir otra cuenta. [Variables de inicio de sesión](https://github.com/oauth2-proxy/oauth2-proxy/blob/v7.15.6/pkg/app/pagewriter/sign_in_page.go) · [Variables de error](https://github.com/oauth2-proxy/oauth2-proxy/blob/v7.15.6/pkg/app/pagewriter/error_page.go)

Desde la raíz del repositorio, ejecuta el renderizador con datos de ejemplo y abre los dos archivos HTML del directorio de salida.

```sh
go run ./deploy/oauth2-proxy/preview/render.go /tmp/pjdocs-oauth-preview
```

[Las capturas](preview/) cubren inicio de sesión y error 403 en claro y oscuro, a 1366 × 900 y 390 × 844 píxeles. [La captura con movimiento reducido](preview/sign_in-1366-dark-reduced-motion.png) confirma el mismo fondo fijo.

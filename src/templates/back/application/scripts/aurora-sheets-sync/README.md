# Aurora Sheets Sync

Herramienta de sincronización bidireccional entre los schemas YAML de Aurora y Google Sheets.

## Propósito

Aurora Sheets Sync permite gestionar los schemas de Aurora (archivos `.aurora.yaml`) de forma colaborativa mediante Google Sheets. Esto facilita:

- **Edición colaborativa**: Múltiples personas pueden editar los schemas simultáneamente en una hoja de cálculo
- **Visualización tabular**: Ver todas las propiedades de un módulo en formato tabla es más intuitivo que YAML
- **Validación visual**: Detectar errores y inconsistencias más fácilmente
- **Historial de cambios**: Google Sheets mantiene un historial de revisiones automático

### Flujo de trabajo

```
┌─────────────────┐         push          ┌─────────────────┐
│                 │ ───────────────────►  │                 │
│   YAML Files    │                       │  Google Sheets  │
│  (.aurora.yaml) │  ◄───────────────────  │  (Spreadsheet)  │
│                 │         pull          │                 │
└─────────────────┘                       └─────────────────┘
```

---

## Configuración

### 1. Configurar el archivo de configuración

Copia el archivo de ejemplo y renómbralo:

```bash
cp scripts/aurora-sheets-sync/aurora-sheets.config.example.json aurora-sheets.config.json
```

Edita `aurora-sheets.config.json` con tus datos:

```json
{
    "credentialsPath": "./scripts/aurora-sheets-sync/credentials/service-account.json",
    "boundedContexts": {
        "business-partner-portal": {
            "spreadsheetId": "1ABC123xyz...",
            "description": "Business Partner Portal schemas"
        },
        "iam": {
            "spreadsheetId": "1DEF456abc...",
            "description": "Identity and Access Management"
        }
    },
    "backupsPath": "backups/aurora-schemas",
    "cliterPath": "cliter"
}
```

| Campo | Descripción |
|-------|-------------|
| `credentialsPath` | Ruta al archivo JSON de credenciales de Google |
| `boundedContexts` | Mapa de bounded contexts con su spreadsheetId |
| `spreadsheetId` | ID del Google Sheet (ver sección siguiente) |
| `backupsPath` | Directorio para backups automáticos |
| `cliterPath` | Directorio donde están los archivos `.aurora.yaml` |

### 2. Obtener el Spreadsheet ID

El `spreadsheetId` se encuentra en la URL de tu Google Sheet:

```
https://docs.google.com/spreadsheets/d/1ABC123xyz.../edit
                                       └──────────┘
                                       spreadsheetId
```

---

## Configuración de Google Cloud

### Paso 1: Crear un proyecto en Google Cloud

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Haz clic en el selector de proyectos (arriba a la izquierda)
3. Haz clic en **"Nuevo Proyecto"**
4. Nombra tu proyecto (ej: `aurora-sheets-sync`)
5. Haz clic en **"Crear"**

### Paso 2: Habilitar la API de Google Sheets

1. En el menú lateral, ve a **"APIs y servicios"** > **"Biblioteca"**
2. Busca **"Google Sheets API"**
3. Haz clic en el resultado **"Google Sheets API"**
4. Haz clic en **"Habilitar"**

### Paso 3: Crear una cuenta de servicio

1. En el menú lateral, ve a **"APIs y servicios"** > **"Credenciales"**
2. Haz clic en **"Crear credenciales"** > **"Cuenta de servicio"**
3. Completa los datos:
   - **Nombre**: `aurora-sheets-sync`
   - **ID de cuenta de servicio**: se genera automáticamente
   - **Descripción**: `Service account for Aurora Sheets Sync`
4. Haz clic en **"Crear y continuar"**
5. (Opcional) Asigna roles - puedes omitir este paso
6. Haz clic en **"Listo"**

### Paso 4: Generar y descargar las credenciales JSON

1. En la lista de cuentas de servicio, haz clic en la cuenta que acabas de crear
2. Ve a la pestaña **"Claves"**
3. Haz clic en **"Agregar clave"** > **"Crear clave nueva"**
4. Selecciona **"JSON"**
5. Haz clic en **"Crear"**
6. El archivo JSON se descargará automáticamente

### Paso 5: Guardar las credenciales en el proyecto

1. Mueve el archivo JSON descargado a:
   ```
   scripts/aurora-sheets-sync/credentials/service-account.json
   ```

2. El archivo debe verse similar a esto:
   ```json
   {
     "type": "service_account",
     "project_id": "aurora-sheets-sync",
     "private_key_id": "abc123...",
     "private_key": "-----BEGIN PRIVATE KEY-----\n...",
     "client_email": "aurora-sheets-sync@aurora-sheets-sync.iam.gserviceaccount.com",
     "client_id": "123456789",
     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
     "token_uri": "https://oauth2.googleapis.com/token",
     ...
   }
   ```

> **Importante**: El archivo `service-account.json` contiene credenciales sensibles. Está incluido en `.gitignore` para evitar que se suba al repositorio.

### Paso 6: Compartir el Google Sheet con la cuenta de servicio

1. Abre tu Google Sheet
2. Haz clic en **"Compartir"** (botón verde arriba a la derecha)
3. En el campo de email, pega el `client_email` del archivo JSON
   - Ejemplo: `aurora-sheets-sync@aurora-sheets-sync.iam.gserviceaccount.com`
4. Selecciona el rol **"Editor"**
5. Desmarca "Notificar a las personas"
6. Haz clic en **"Compartir"**

---

## Estructura del Google Sheet

Cada spreadsheet debe tener las siguientes hojas:

| Hoja | Descripción |
|------|-------------|
| `DATA` | Datos para validaciones y dropdowns (no modificar) |
| `TEMPLATE` | Plantilla para nuevos módulos |
| `MODULES` | Índice de todos los módulos |
| `{module-name}` | Una hoja por cada módulo (ej: `business-partner`, `partner-contact`) |

### Hoja MODULES (índice)

| moduleName | hasAuth | hasTenant | front:outlineIcon | front:solidIcon | description |
|------------|---------|-----------|-------------------|-----------------|-------------|
| =HYPERLINK(...) | ✓ | | mat_outline:business | mat_solid:business | Descripción del módulo |

### Hojas de módulo

Cada hoja de módulo tiene los headers en la fila 1 y las propiedades desde la fila 2:

| name | type | subtype | values | nullable | relationship | primaryKey | index | ... |
|------|------|---------|--------|----------|--------------|------------|-------|-----|
| id | id | | | | | ✓ | | |
| name | varchar | | | ✓ | | | index | |

---

## Uso

### Instalar dependencias

```bash
cd scripts/aurora-sheets-sync
npm install
```

### Comandos disponibles

#### Push: YAML → Google Sheets

Sincroniza los archivos YAML locales hacia el Google Sheet:

```bash
# Push un bounded context específico
npx ts-node src/index.ts push --bc business-partner-portal

# Push todos los bounded contexts configurados
npx ts-node src/index.ts push --all

# Modo dry-run (muestra qué haría sin ejecutar)
npx ts-node src/index.ts push --bc business-partner-portal --dry-run

# Modo verbose (más detalle)
npx ts-node src/index.ts push --bc business-partner-portal --verbose
```

#### Pull: Google Sheets → YAML

Sincroniza los cambios del Google Sheet hacia los archivos YAML locales:

```bash
# Pull un bounded context específico
npx ts-node src/index.ts pull --bc business-partner-portal

# Pull todos los bounded contexts configurados
npx ts-node src/index.ts pull --all

# Pull sin crear backup
npx ts-node src/index.ts pull --bc business-partner-portal --no-backup

# Modo dry-run
npx ts-node src/index.ts pull --bc business-partner-portal --dry-run
```

> **Nota**: El pull es idempotente. Si no hay cambios de contenido en el spreadsheet, los archivos YAML no se modifican.

#### Validate: Verificar conexión

```bash
npx ts-node src/index.ts validate --bc business-partner-portal
```

#### List: Listar bounded contexts

```bash
npx ts-node src/index.ts list
```

---

## Flujo de trabajo recomendado

### Escenario 1: Editar schemas en Google Sheets

1. Edita las propiedades en el Google Sheet
2. Ejecuta `pull` para traer los cambios:
   ```bash
   npx ts-node src/index.ts pull --bc mi-bounded-context
   ```
3. Revisa los cambios con `git diff`
4. Regenera el código con Aurora CLI si es necesario

### Escenario 2: Editar schemas en YAML

1. Edita los archivos `.aurora.yaml` localmente
2. Ejecuta `push` para subir los cambios:
   ```bash
   npx ts-node src/index.ts push --bc mi-bounded-context
   ```
3. Verifica los cambios en el Google Sheet

### Escenario 3: Nuevo bounded context

1. Crea un nuevo Google Sheet con las hojas `DATA`, `TEMPLATE`, `MODULES`
2. Añade el bounded context a `aurora-sheets.config.json`
3. Comparte el sheet con la cuenta de servicio
4. Ejecuta `push` para poblar el sheet desde los YAML existentes

---

## Backups

Por defecto, el comando `pull` crea un backup automático antes de modificar los archivos YAML. Los backups se guardan en:

```
backups/aurora-schemas/{bounded-context}/{timestamp}/
```

Para desactivar los backups:

```bash
npx ts-node src/index.ts pull --bc mi-bounded-context --no-backup
```

---

## Troubleshooting

### Error: "The caller does not have permission"

- Verifica que compartiste el Google Sheet con el email de la cuenta de servicio
- Asegúrate de que la cuenta tiene rol "Editor"

### Error: "Google Sheets API has not been enabled"

- Ve a Google Cloud Console y habilita la API de Google Sheets para tu proyecto

### Error: "Could not load credentials"

- Verifica que el archivo `service-account.json` existe en la ruta configurada
- Verifica que el JSON es válido

### Los cambios no se reflejan

- Verifica que estás editando el spreadsheet correcto (compara el `spreadsheetId`)
- Ejecuta `validate` para verificar la conexión

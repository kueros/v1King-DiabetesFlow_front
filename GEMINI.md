[SYSTEM_OVERRIDE]
MODE: STRICT_SCOPE
AUTO_CLEANUP: DISABLED
FILE_MODIFICATION_POLICY: EXPLICIT_ONLY

# DIABETESFLOW — Knowledge Base & Antigravity Assistant

## REGLAS DE EFICIENCIA Y PERSONALIDAD
- **Senior Persona:** Actúa como Tech Lead. Respuestas directas, técnicas y concisas.
- **Sin Preámbulos:** No saludes, no expliques lo que vas a hacer, solo hazlo.
- **Sin Comentarios:** **REGLA DE ORO: No incluyas comentarios internos en el código.** Código puro y limpio.
- **Gestión de Tokens:** No leas archivos completos si puedes usar `grep` o leer rangos. No releas archivos ya procesados en la sesión.
- **Validación:** Antes de dar una tarea por finalizada, verifica que el código compile o no rompa tipos de TypeScript.
- **PROHIBIDO MODIFICAR ARCHIVOS FUERA DE SCOPE:** Bajo ninguna circunstancia debes refactorizar, limpiar imports o aplicar formateos a archivos que no se te haya pedido modificar explícitamente. No dispares formateadores globales. Respeta el linter local.

## PARTE A: INSTRUCCIONES DE DESARROLLO

### Stack Tecnológico
- **Backend:** NestJS (TS), Prisma ORM, PostgreSQL (Dockerizado localmente en puerto 5440).
- **Frontend:** Next.js (React), TypeScript.
- **Infraestructura:** Antigravity CLI (agy) para desarrollo asistido aislado. Docker Compose para la base de datos.
- **Datos:** Gestión estricta de decimales nativos en Prisma para cálculos médicos e ingredientes.

### Estándares de Código
- Tipado estricto en TypeScript (evitar `any`).
- Desacoplamiento: Uso de `ConfigModule` de NestJS para variables de entorno (no usar `process.env` directamente en la lógica de negocio).
- Modularidad: Uso de módulos globales para conexiones transversales (ej. `PrismaModule` y su `PrismaService`).
- Archivos completos solo si el cambio es >80%. Si no, usar cambios parciales o inserciones quirúrgicas.

## PARTE B: KNOWLEDGE BASE (Lógica de Negocio)

### Arquitectura de Datos (Dominios Principales)
- **Usuarios y Configuración:** Separación estricta entre credenciales (`Users`) y configuración médica (`User_Settings`, `User_Ratios`). Los factores como el ICR (Insulina/Carbohidrato) y el ISF (Sensibilidad) varían por franja horaria.
- **Mediciones y Dosis:** Los registros de glucemia (`Glucose_Logs`) y las inyecciones de insulina (`Insulin_Logs`, distinguiendo entre Basal y Bolo) deben mantenerse en entidades separadas.
- **Alimentación (Cálculo de Macros):** Catálogo base de ingredientes (`Foods`), platos ingeridos (`Meals`) e ítems intermedios (`Meal_Items`). Los carbohidratos se calculan automáticamente sumando el cruce de gramos consumidos contra la proporción del ingrediente.
- **Contexto y Biometría:** Actividad física manejada con campos paralelos y opcionales (`duration_min` y `steps`) para soportar tanto rutinas medidas en minutos como el conteo pasivo de pasos del teléfono. 

### Procesos y Algoritmos Críticos (A Implementar)
- **Cálculo de Insulina Activa (IOB):** Algoritmo crítico. Seguimiento de la curva de acción de la insulina rápida inyectada (generalmente 3 a 4 horas) para evitar el *stacking* de dosis y prevenir hipoglucemias severas.
- **Calculadora de Bolos:** Motor que sugiere dosis tomando: glucemia actual, glucemia objetivo, carbohidratos de la comida, IOB restante, ICR e ISF.
- **Métricas de "Tiempo en Rango" (TIR):** Porcentaje del día en que los niveles de glucosa se mantienen dentro del `target_min` y `target_max` del usuario.

## HISTORIAL DE SESIONES

- **2026-05-22**: 
  - **Tarea**: Creación del Dashboard base de glucemia (formulario de carga e historial asíncrono).
  - **Archivos**: `src/services/api.ts`, `src/app/page.tsx`, `src/components/GlucoseForm.tsx`, `src/components/GlucoseHistory.tsx`.
  - **Pendientes**: Integrar autenticación real para reemplazar el userId temporal (`temp-user-id`). Manejo visual de errores de la API.

- **2026-05-22**: 
  - **Tarea**: Implementación de Calculadora de Bolos, Gestor de Alimentación y Navegación principal.
  - **Archivos**: `src/services/api.ts`, `src/components/BolusCalculator.tsx`, `src/app/calculator/page.tsx`, `src/app/layout.tsx`, `src/components/FoodManager.tsx`, `src/app/food/page.tsx`.
  - **Pendientes**: Reemplazar uso del ID estático (`user-123`) por contexto de autenticación real. Expandir validaciones de formularios y control de errores asíncronos.

- **2026-05-22**: 
  - **Tarea**: Ajustes de SSR, gestión de caché (`no-store`) y manejo de errores de API.
  - **Archivos**: `src/app/page.tsx`, `src/services/api.ts`, `src/components/GlucoseHistory.tsx`, `src/components/GlucoseForm.tsx`, `src/components/BolusCalculator.tsx`, `src/components/FoodManager.tsx`.
  - **Pendientes**: Reemplazar el UUID estático (`11111111-1111-1111-1111-111111111111`) por el ID del usuario autenticado. Replicar el manejo detallado de errores (lectura de `response.text()`) en el resto de los endpoints.

- **2026-05-22**: 
  - **Tarea**: Tipado estricto en API y aplicación del sistema de diseño v1King Brand Book (Tailwind + Next Fonts).
  - **Archivos**: `src/services/api.ts`, `tailwind.config.ts`, `src/app/layout.tsx`, `src/components/FoodManager.tsx`.
  - **Pendientes**: Expandir la aplicación de los tokens visuales v1King al resto de componentes (`GlucoseLogger`, `GlucoseHistory`) y vistas principales (`DashboardPage`). Reemplazar uso del UUID estático por contexto de autenticación real.

- **2026-05-22**: 
  - **Tarea**: Expansión del diseño v1King a BolusCalculator, creación de ActivityManager, refactor de endpoints (/glucose, /activities) y renombramiento/validación estricta en GlucoseLogger.
  - **Archivos**: `src/services/api.ts`, `src/components/BolusCalculator.tsx`, `src/components/ActivityManager.tsx`, `src/app/activities/page.tsx`, `src/app/calculator/page.tsx`, `src/app/globals.css`, `src/components/GlucoseLogger.tsx`, `src/components/GlucoseHistory.tsx`, `src/app/page.tsx`.
  - **Pendientes**: Refactorizar el diseño de `GlucoseLogger`, `GlucoseHistory` y el layout de `DashboardPage` (`src/app/page.tsx`) para adoptar los tokens visuales v1King. Integrar autenticación real.

- **2026-05-22**: 
  - **Tarea**: Creación de la página principal de Glucemia (`/glucose`) implementando Lifting State Up, corrección del mapeo de datos de BD (`level`, `context`) y hardcodeo de URLs absolutas en el cliente API (`http://localhost:8080`).
  - **Archivos**: `src/app/glucose/page.tsx`, `src/components/GlucoseLogger.tsx`, `src/components/GlucoseHistory.tsx`, `src/services/api.ts`, `src/app/page.tsx`.
  - **Pendientes**: Integrar sistema de autenticación real para reemplazar el uso estático de UUID en los componentes.

- **2026-05-23**: 
  - **Tarea**: Refactor de función `getMeals` a Path Parameters y múltiples mejoras de UI/UX en formulario de alimentos (placeholders, reset de estados numéricos a '0', contraste de etiquetas y botones primarios, y opciones hardcodeadas).
  - **Archivos**: `src/services/api.ts`, `src/components/FoodManager.tsx`.
  - **Pendientes**: Corregir error de tipado TypeScript preexistente en `src/app/glucose/page.tsx` (Property 'level' is missing). Integrar autenticación real para reemplazar UUID estático.

- **2026-05-23**: 
  - **Tarea**: Refactorización integral y estricta del UI/UX al sistema de diseño v1King (FinanceFlow). Creación de App Shell (Header, StatusStrip, Layout base) y reescritura de los estilos globales (`globals.css`) con variables CSS para modo oscuro puro. Reestructuración del módulo de glucemia (`/glucose`) aplicando clases utilitarias (`.panel`, `.input`, `.btn`), fondos negros y botones transparentes. Corrección crítica de tipado (mapping `glucose` a `level`) que bloqueaba el build en producción.
  - **Archivos**: `src/app/globals.css`, `src/app/layout.tsx`, `src/components/Header.tsx`, `src/app/glucose/page.tsx`, `src/components/GlucoseLogger.tsx`, `src/components/GlucoseHistory.tsx`.
  - **Pendientes**: Reemplazar el UUID estático (`11111111-1111-1111-1111-111111111111`) por autenticación real. Extender las correcciones del diseño estricto a las vistas `FoodManager` y `BolusCalculator`.

- **2026-05-23**: 
  - **Tarea**: Aplicación estricta del sistema de diseño v1King a la Calculadora de Bolos. Refactorización visual pura sin alteración de lógica ni estado. Incorporación de layout tipo ledger-row en panel de resultados con fuentes y acentos de color propios del brand book. Corrección definitiva del data binding en el historial de glucemia (`level`, `context`, `timestamp`).
  - **Archivos**: `src/app/calculator/page.tsx`, `src/components/BolusCalculator.tsx`, `src/components/GlucoseHistory.tsx`, `src/app/glucose/page.tsx`, `src/components/GlucoseLogger.tsx`, `src/services/api.ts`.
  - **Pendientes**: Aplicar el diseño estricto a los demás módulos (como `FoodManager`). Integrar sistema de autenticación real.

## REGLA DE PERSISTENCIA (Bitácora de Sesión)
- Al finalizar una tarea o antes de cerrar el chat, te pediré: "Generá el Session Summary".
- Tu tarea es editar este mismo archivo (GEMINI.md) y añadir una entrada en la sección 'HISTORIAL DE SESIONES'.
- La entrada debe incluir: Fecha, Tarea realizada, Repositorios/Archivos afectados y cualquier Pendiente técnico.
- Mantén el formato técnico y minimalista, sin saludos.

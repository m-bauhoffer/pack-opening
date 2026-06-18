# Monster Pack Opening

Aplicación full-stack construida con Next.js, TypeScript y Supabase.

El proyecto permite a un usuario iniciar sesión con Google, comprar sobres de monstruos usando oro virtual, ver su colección con niveles/progreso y consultar el historial de aperturas.


## Tecnologías

- Next.js 16 App Router.
- React.
- TypeScript.
- Tailwind CSS.
- Supabase Auth (Google OAuth).
- Supabase Database (PostgreSQL).
- Supabase Row Level Security (RLS).
- Supabase Storage (imágenes de monstruos y fondos).
- Supabase RPC/Postgres functions.


## Funcionalidades

- Login con Google.
- Logout.
- Rutas privadas protegidas server-side.
- Dashboard con oro disponible y tienda de sobres.
- Compra de sobres mediante RPC segura.
- Apertura de sobres con obtención de monstruos.
- Colección de monstruos con filtros y ordenamiento.
- Filtros por nombre, rareza, nivel y tipo.
- Ordenamiento por rareza, nivel y poder.
- Historial de sobres abiertos con estadísticas.
- Oro total gastado.
- Imágenes de monstruos desde Supabase Storage.
- Fondo animado en la página home.
- Seguridad con RLS y hardening SQL.


## Rutas

Pública:
- `/` - Página de inicio con imagen de fondo y login.

Privadas:
- `/dashboard` - Oro disponible, tienda de sobres.
- `/collection` - Colección de monstruos con filtros.
- `/record` - Historial de aperturas y estadísticas.
- `/debug-security` - Depuración de seguridad (solo desarrollo).

Técnica:
- `/auth/callback` - Callback de autenticación.


## Instalación local

Instalar dependencias:

```bash
npm install
```

Crear `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

Ejecutar en desarrollo:

```bash
npm run dev
```

Abrir:

```text
http://localhost:3000
```


## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```


## Configuración de Supabase

El proyecto requiere:

- Proyecto Supabase activo.
- Google OAuth configurado en Supabase Auth.
- Tablas del juego creadas.
- RLS habilitado en todas las tablas.
- Políticas de lectura por usuario.
- RPC `open_pack` creada.
- Hardening aplicado para bloquear escrituras directas sensibles.
- Bucket `monster-images` para imágenes de monstruos y fondos.

Tablas:
- `profiles` - Perfil de usuario con oro.
- `monsters` - Catálogo de monstruos.
- `pack_types` - Tipos de sobres (common, premium).
- `packs` - Registro de sobres comprados.
- `pack_monsters` - Relación sobres-monstruos.
- `user_monsters` - Colección de monstruos del usuario.

RPC:
- `open_pack(pack_type_code text)` - Apertura segura de sobres.

Storage:
- Bucket: `monster-images`
- Imágenes de monstruos y fondos (ej: `bg-dragon.webp`)


## Variables de entorno

`NEXT_PUBLIC_SUPABASE_URL`

URL pública del proyecto Supabase.

`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Clave pública/publishable usada por el cliente Supabase.


## Arquitectura resumida

```text
Next.js App Router
  |
  | Server Components (datos)
  v
Supabase SSR Client
  |
  | cookies + auth.getUser()
  v
Supabase Auth + RLS
  |
  | RPC open_pack
  v
Postgres
```

Componentes clave:
- `src/app/(private)/layout.tsx` - Layout privado con navegación.
- `src/components/private-navigation.tsx` - Navegación con indicador de sección activa.
- `src/components/collection-page-client.tsx` - Página de colección con filtros interactivos.
- `src/app/lib/supabase/storage.ts` - URLs públicas de imágenes desde Storage.


## Seguridad

La seguridad no depende de ocultar botones.

Medidas principales:
- Rutas privadas protegidas server-side con `requireCurrentUser`.
- Sesión con cookies de Supabase.
- Middleware de Supabase.
- RLS en Supabase para aislamiento por usuario.
- RPC `open_pack` para escritura sensible.
- Cliente no envía `user_id`, rarezas ni monstruos obtenidos.
- Updates directos de oro bloqueados.
- Inserts/updates directos de colección e historial bloqueados.


## Despliegue en Vercel

1. Crear proyecto en Vercel.
2. Conectar repositorio.
3. Configurar variables de entorno:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
4. Configurar URLs de redirect en Supabase Auth.
5. Ejecutar deploy.


## Estado actual

MVP funcional:
- Autenticación con Google.
- Compra y apertura de sobres.
- Colección con filtros avanzados.
- Historial con estadísticas.
- Imágenes desde Supabase Storage.
- Fondo animado en home.
- Seguridad basica y hardening SQL.

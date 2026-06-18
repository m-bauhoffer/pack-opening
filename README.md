# Monster Pack Opening

Aplicacion full-stack construida con Next.js, TypeScript y Supabase.

El proyecto permite a un usuario iniciar sesion con Google, comprar sobres de monstruos usando oro virtual, ver su coleccion con niveles/progreso y consultar el historial de aperturas.

## Screenshots

Agregar capturas aqui:

```text
docs/screenshots/home.png
docs/screenshots/dashboard.png
docs/screenshots/collection.png
docs/screenshots/record.png
```

## Tecnologias

- Next.js App Router.
- React.
- TypeScript.
- Tailwind CSS.
- Supabase Auth.
- Supabase Database.
- Supabase Row Level Security.
- Supabase RPC/Postgres functions.
- Google OAuth.

## Funcionalidades

- Login con Google.
- Logout.
- Rutas privadas protegidas.
- Dashboard con oro disponible.
- Lista de sobres disponibles.
- Compra de sobres mediante RPC segura.
- Coleccion de monstruos.
- Filtros por nombre, rareza, nivel y tipo.
- Ordenamiento por rareza, nivel y poder.
- Historial de sobres abiertos.
- Oro total gastado.
- Seguridad con RLS.

## Rutas

Publica:
- `/`

Privadas:
- `/dashboard`
- `/collection`
- `/record`

Tecnica:
- `/auth/callback`

## Instalacion local

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

## Configuracion de Supabase

El proyecto requiere:

- Proyecto Supabase activo.
- Google OAuth configurado en Supabase Auth.
- Tablas del juego creadas.
- RLS habilitado.
- Politicas de lectura por usuario.
- RPC `open_pack` creada.
- Hardening aplicado para bloquear escrituras directas sensibles.

Tablas:
- `profiles`
- `monsters`
- `pack_types`
- `packs`
- `pack_monsters`
- `user_monsters`

RPC:
- `open_pack(pack_type_code text)`

## Variables de entorno

`NEXT_PUBLIC_SUPABASE_URL`

URL publica del proyecto Supabase.

`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Clave publica/publishable usada por el cliente Supabase.

## Arquitectura resumida

```text
Next.js App Router
  |
  | Server Components
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

## Seguridad

La seguridad no depende de ocultar botones.

Medidas principales:
- Rutas privadas protegidas server-side.
- Sesion con cookies.
- Middleware de Supabase.
- RLS en Supabase.
- RPC `open_pack` para escritura sensible.
- Cliente no envia `user_id`, rarezas ni monstruos obtenidos.
- Updates directos de oro bloqueados.
- Inserts/updates directos de coleccion e historial bloqueados.

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
- Autenticacion.
- Compra de sobres.
- Coleccion.
- Historial.
- Seguridad basica y hardening SQL.

Pendiente o futuro:
- Imagenes reales desde Supabase Storage.
- Tipos generados con Supabase CLI.
- SQL versionado como migrations.
- Tests automatizados.
- Mejoras visuales.

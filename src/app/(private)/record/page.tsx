export default function RecordPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black">Historial</h1>
        <p className="mt-2 max-w-2xl text-zinc-600">
          Pantalla privada para consultar sobres comprados, monstruos obtenidos,
          tipo de sobre y oro gastado en total.
        </p>
      </div>

      <div className="rounded-lg border border-dashed border-zinc-300 bg-white px-6 py-12 text-center">
        <h2 className="text-xl font-bold">Historial pendiente de implementar</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Esta ruta ya esta protegida por autenticacion. Las tablas y reglas de
          negocio se conectaran en una siguiente etapa.
        </p>
      </div>
    </div>
  );
}

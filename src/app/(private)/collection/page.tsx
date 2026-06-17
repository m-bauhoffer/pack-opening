export default function CollectionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black">Coleccion</h1>
        <p className="mt-2 max-w-2xl text-zinc-600">
          Pantalla privada para mostrar los monstruos obtenidos, su nivel actual
          y el progreso hacia el siguiente nivel.
        </p>
      </div>

      <div className="rounded-lg border border-dashed border-zinc-300 bg-white px-6 py-12 text-center">
        <h2 className="text-xl font-bold">Coleccion pendiente de implementar</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Esta ruta ya esta protegida por autenticacion. La carga de datos se
          agregara cuando se defina el schema correspondiente.
        </p>
      </div>
    </div>
  );
}

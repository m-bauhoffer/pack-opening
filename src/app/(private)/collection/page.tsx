import { getCollectionData } from "@/app/lib/collection";
import { CollectionFilters } from "@/components/collection-filters";

export default async function CollectionPage() {
  const { collection, error } = await getCollectionData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black">Coleccion</h1>
        <p className="mt-2 max-w-2xl text-zinc-600">
          Monstruos obtenidos, nivel actual y progreso hacia el siguiente nivel.
        </p>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          No se pudo cargar la coleccion: {error}
        </div>
      ) : null}

      {!error && collection.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-300 bg-white px-6 py-12 text-center">
          <h2 className="text-xl font-bold">Todavia no tenes monstruos</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Cuando abras sobres, tus monstruos apareceran en esta pantalla.
          </p>
        </div>
      ) : null}

      {collection.length > 0 ? (
        <CollectionFilters collection={collection} />
      ) : null}
    </div>
  );
}

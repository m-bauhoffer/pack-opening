import { getCollectionData } from "@/app/lib/collection";
import { CollectionPageClient } from "@/components/collection-page-client";

export default async function CollectionPage() {
  const { collection, error } = await getCollectionData();

  return <CollectionPageClient collection={collection} error={error} />;
}
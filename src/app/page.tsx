import { supabase } from "./lib/supabase/client";
import { LoginButton } from "@/components/login-button";

export default async function Home() {
  const { data, error } = await supabase
    .from("monsters")
    .select("*");

  console.log("Data:", data);
  console.log("Error:", error);

  return (
    <main>
      <LoginButton />
      <h1>
        Cartas
      </h1>

      {data?.map((card) => (
        <div key={card.id}>
          <h3>{card.name}</h3>
        </div>
      ))}

    </main>
  );
}

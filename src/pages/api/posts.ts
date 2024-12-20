import type Post from "@/interfaces/post";
import fetchApi from "@/lib/strapi";
import { client } from "@/utils/redis";
import type { APIContext } from "astro";

// Asegúrate de que Redis esté conectado antes de usarlo
if (!client.isOpen) {
  client
    .connect()
    .catch((err) => console.error("Error al conectar con Redis:", err));
}

export async function GET(context: APIContext): Promise<Response> {
  let allPosts: Post[] = [];

  try {
    // Intenta obtener los datos desde Redis
    const data = await client.get("allPosts");

    if (!data) {
      // Si no hay datos en Redis, consulta la API
      allPosts = await fetchApi<Post[]>({
        endpoint:
          "articles?fields[0]=title&fields[1]=description&fields[2]=pubDate&fields[3]=featured&fields[4]=slug&populate[cover][fields]=formats&populate[category][fields]=name,slug",
        wrappedByKey: "data",
        method: "GET",
        query: {
          "pagination[page]": 1,
          "pagination[pageSize]": 6,
          sort: "pubDate:desc",
        },
      });

      // Guarda los datos en Redis con expiración de 12 horas
      await client.set("allPosts", JSON.stringify(allPosts), {
        EX: 60 * 60 * 12, // 12 horas
      });

      return Response.json(allPosts, { status: 200 });
    }

    // Si hay datos en Redis, parsea y devuélvelos
    allPosts = JSON.parse(data);
    return Response.json(allPosts, { status: 200 });
  } catch (error) {
    console.error("Error al obtener los artículos:", error);
    return Response.json(
      { message: "Error interno al obtener los artículos." },
      { status: 500 },
    );
  }
}

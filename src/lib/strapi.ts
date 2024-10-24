interface Props {
  endpoint: string;
  query?: Record<string, string | number>;
  method: "GET" | "POST" | "PUT" | "DELETE";
  wrappedByKey?: string;
  wrappedByList?: boolean;
  body?: BodyInit | null;
}

/**
 * Fetches data from the Strapi API
 * @param endpoint - The endpoint to fetch from
 * @param query - The query parameters to add to the url
 * @param wrappedByKey - The key to unwrap the response from
 * @param wrappedByList - If the response is a list, unwrap it
 * @param method - The HTTP method for the fetch request
 * @param body - The body of the request (for POST, PUT methods)
 * @returns Parsed data from the API response
 */
export default async function fetchApi<T>({
  endpoint,
  method,
  query,
  wrappedByKey,
  wrappedByList,
  body,
}: Props): Promise<T> {
  // Remove the initial slash if present
  endpoint = endpoint.replace(/^\//, "");

  // Construct the URL with query parameters
  const url = new URL(`${import.meta.env.STRAPI_URL}/api/${endpoint}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString());
    });
  }

  try {
    // Prepare fetch options
    const fetchOptions: RequestInit = {
      method,
      headers: {
        Authorization: `Bearer ${import.meta.env.STRAPI_TOKEN}`,
        "Content-Type": "application/json",
      },
    };

    // Add body for POST and PUT requests
    if ((method === "POST" || method === "PUT") && body) {
      fetchOptions.body = JSON.stringify(body);
    }

    // Perform the fetch request
    const res = await fetch(url.toString(), fetchOptions);

    // Check if the request was successful
    if (!res.ok) {
      throw new Error(`HTTP Error ${res.status}: ${res.statusText}`);
    }

    // Parse the JSON response
    let data = await res.json();

    // Unwrap if wrapped by a key
    if (wrappedByKey && data[wrappedByKey] !== undefined) {
      data = data[wrappedByKey];
    }

    // Unwrap if it's a list and unwrapping is required
    if (wrappedByList && Array.isArray(data)) {
      data = data[0];
    }

    return data as T;
  } catch (error) {
    console.error("Error performing API request:", error);
    throw new Error(
      `Error fetching data from API: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

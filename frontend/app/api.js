const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function request(endpoint, method, body, cacheTag) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: method,
      headers:
        method === "POST"
          ? { "Content-Type": "application/json" }
          : method === "PUT"
            ? { "Content-Type": "application/json" }
            : {},
      body: body ? JSON.stringify(body) : undefined,
      next: { tags: cacheTag ? cacheTag : undefined },
    });
    // manejo de codigo 204 luego de un delete exitoso
    if (res.status === 204) {
      return {
        success: true,
        data: null
      };
    }
    if (res.ok) return await res.json();
    // errores del servidor (nivel aplicación)
    return {
      error: true,
      msg: `${res.status}: ${res.statusText}`,
    };
  } catch (e) {
    // errores de red
    return {
      error: true,
      msg: e,
      //msg: `${e.status}: ${e.statusText}`,
    };
  }
}

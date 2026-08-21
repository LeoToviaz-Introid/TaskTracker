import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function serverRequest(endpoint, method, body, cacheTag) {
  try {
    const token = (await cookies()).get("access_token")?.value;
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: method,
      headers: {
        ...(method === "POST" || method === "PUT" || method === "PATCH"
          ? { "Content-Type": "application/json" }
          : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      next: { tags: cacheTag ? [cacheTag] : undefined },
    });
    // ====================================================
    // manejo de codigo 204 luego de un delete exitoso
    if (res.status === 204) {
      return {
        success: true,
        data: null,
      };
    }
    // ====================================================
    // petición exitosa
    if (res.ok) return await res.json();
    // ====================================================
    // token inválido o expirado: redirigir
    if (res.status === 401 && endpoint !== "/login/") {
      redirect("/login");
    }
    // ====================================================
    // errores del servidor (nivel aplicación)
    return {
      error: true,
      msg: `${res.status}: ${res.statusText}`,
    };
  } catch (e) {
    // redirect() lanza una excepcion de next js, se relanza para no atraparla como error de red
    if (e?.digest?.startsWith("NEXT_REDIRECT")) throw e;
    // ====================================================
    // errores de red
    return {
      error: true,
      msg: e.message || e,
    };
  }
}

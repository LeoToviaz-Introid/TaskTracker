const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function request(endpoint, method, body) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: method,
      headers: {
        ...(method === "POST" || method === "PUT" || method === "PATCH"
          ? { "Content-Type": "application/json" }
          : {}),
        ...(_getAccessToken()
          ? { Authorization: `Bearer ${_getAccessToken()}` }
          : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
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
    // token inválido o expirado al intentar hacer una peticion a una vista
    // protegida (todas excepto login), se limpia la cookie y se regresa al login
    if (res.status === 401 && endpoint !== "/login/") {
      document.cookie = "access_token=; path=/; max-age=0";
      window.location.href = new URL("/login", window.location.origin).href;
      return {
        error: true,
        msg: "Sesión expirada, vuelve a iniciar sesión",
      };
    }
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
    };
  }
}
// obtiene el valor de la cookie "access_token"
function _getAccessToken() {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)access_token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

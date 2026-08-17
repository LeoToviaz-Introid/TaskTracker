/**
 * actions contiene server actions misceláneas.
 */
"use server";

import { revalidateTag } from "next/cache";

/**
 * refresca una etiqueta de caché en componentes cliente que no pueden importar
 * revalidateTag directamente.
 * @param {string} tag 
 */
export async function refreshTag(tag) {
  revalidateTag(tag);
}

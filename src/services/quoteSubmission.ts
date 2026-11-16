export interface QuoteSubmission {
  folio: string;
  [key: string]: unknown;
}
export async function submitQuote(
  payload: QuoteSubmission,
): Promise<{ simulated: boolean }> {
  // TODO: conectar un endpoint de propuestas que admita este esquema antes de activar envíos reales.
  const endpoint = import.meta.env.VITE_QUOTE_ENDPOINT;
  if (!endpoint) return { simulated: true };
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok)
    throw new Error("No se pudo enviar la propuesta. Inténtalo de nuevo.");
  return { simulated: false };
}

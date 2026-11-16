export const features = {
  // TODO: chatbot deshabilitado en producción — en pruebas.
  chatbot: { enabled: false, testMode: true },
  legacyQuoter: import.meta.env.VITE_LEGACY_QUOTER === "true",
};
export function chatbotEnabled() {
  let testing = false;
  if (features.chatbot.testMode) {
    try {
      if (new URLSearchParams(location.search).get("chatbot") === "test")
        sessionStorage.setItem("inversa.chatbot.test", "true");
      testing = sessionStorage.getItem("inversa.chatbot.test") === "true";
    } catch {
      testing = new URLSearchParams(location.search).get("chatbot") === "test";
    }
  }
  return (
    import.meta.env.DEV ||
    features.chatbot.enabled ||
    import.meta.env.VITE_CHATBOT_ENABLED === "true" ||
    testing
  );
}

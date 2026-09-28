// Service worker mínimo de CodeLearn.
// Sirve para que el navegador considere la web "instalable" como app.
// No guarda nada en caché: todo se sigue cargando siempre desde internet,
// así nunca se muestran versiones viejas de la web.

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
self.addEventListener("fetch", () => {
  // Sin respuesta propia: el navegador hace la petición normal a internet.
});

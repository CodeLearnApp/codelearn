# CodeLearn 🚀

> Describí en tu idioma → Aprendé el código → Copialo al instante

---

## 📁 Estructura del proyecto

```
codelearn/
├── public/
│   ├── icon.svg
│   ├── icon-192.png
│   └── icon-512.png
├── src/
│   ├── main.jsx       ← punto de entrada React
│   └── App.jsx        ← toda la app (acá editás los idiomas, estilos, etc)
├── index.html
├── package.json
├── vite.config.js     ← configuración + PWA
└── vercel.json
```

---

## 🛠 Cómo subir a Vercel (10 minutos, gratis)

### Paso 1 — Crear cuenta en GitHub
Entrá a **github.com** y creá una cuenta gratis si no tenés.

### Paso 2 — Subir el proyecto
1. En GitHub, hacé clic en **"New repository"**
2. Nombre: `codelearn`
3. Hacé clic en **"uploading an existing file"**
4. Arrastrá TODOS los archivos de esta carpeta (respetando la estructura)
5. Hacé clic en **"Commit changes"**

### Paso 3 — Deployar en Vercel
1. Entrá a **vercel.com** y creá cuenta (podés entrar con GitHub)
2. Hacé clic en **"Add New Project"**
3. Importá el repositorio `codelearn`
4. Vercel detecta Vite automáticamente
5. Hacé clic en **"Deploy"** ✅

En 2 minutos tenés tu URL tipo: `https://codelearn-tuusuario.vercel.app`

---

## 📱 Instalar en el celular como app

### En Android (Chrome):
1. Abrí la URL en Chrome
2. Tocá el menú (⋮) → **"Agregar a pantalla de inicio"**
3. Confirmá → ¡Aparece el ícono de CodeLearn en tu pantalla!

### En iPhone (Safari):
1. Abrí la URL en Safari
2. Tocá el botón compartir (□↑)
3. → **"Agregar a pantalla de inicio"**
4. Confirmá → ¡Instalada!

---

## ✏️ Cómo personalizar

### Agregar un idioma nuevo a la app
En `src/App.jsx`, buscá el objeto `UI_LANGS` al principio del archivo.
Copiá uno de los bloques existentes (por ejemplo `en`) y pegalo con un nuevo código:

```js
it: {
  flag: "🇮🇹", label: "Italiano",
  tagline: "Descrivi → Impara → Copia",
  // ... completá el resto igual que los otros
}
```

### Agregar un lenguaje de programación
Buscá el array `PROG_LANGS` y agregá una línea:
```js
{ id: "ruby", label: "Ruby", icon: "💎" },
```

---

## 🔑 Nota sobre la API Key

La app usa la API de Anthropic. En Claude.ai funciona automáticamente.
Si la corrés en tu propio servidor, necesitás agregar tu API key en `vite.config.js`:
```
VITE_ANTHROPIC_API_KEY=sk-ant-...
```
Y en `App.jsx` agregala al header del fetch:
```js
"x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
"anthropic-version": "2023-06-01",
```

---

Hecho con ❤️ y Claude AI

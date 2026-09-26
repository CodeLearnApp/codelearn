import { useState, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://xbzgajevunqawdxemyqt.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhiemdhamV2dW5xYXdkeGVteXF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4NzIxNTIsImV4cCI6MjEwNDQ0ODE1Mn0.8gi6FZoScxWB3HSrdYElzNN3vwUseIDly1OFFle4Sz0";
const PADDLE_CLIENT_TOKEN = "live_816261a82bc71161cd2de30da5b";
const PADDLE_PRODUCT_ID = "pri_01m2399cv4zp3yb31qp0z05mys";
const FREE_DAILY_LIMIT = 5;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const UI_LANGS = {
  es: {
    flag: "🇪🇸", label: "Español",
    tagline: "Describí → Aprendé → Copiá",
    intro: (lang) => `Describí en tu idioma qué querés que haga tu programa. Recibís el código listo para copiar + la explicación completa en <strong style="color:#7c6af7">${lang}</strong>.`,
    sectionLang: "Lenguaje a aprender",
    sectionInput: "¿Qué querés que haga tu programa?",
    inputHint: "— escribilo como si le explicaras a alguien",
    placeholder: 'Ej: "Quiero una función que reciba una lista de números y devuelva solo los pares, ordenados de mayor a menor"',
    ctrlHint: "Ctrl + Enter para generar",
    suggestedLabel: "Ejemplos para empezar:",
    nextStepsTitle: "¿Qué hago con este código?",
    step1Title: "ENTENDÉ EL CÓDIGO", step1Desc: "Leé la explicación línea por línea. No pases al siguiente paso hasta entender qué hace cada parte. Si no entendés algo, hacele una nueva consulta a CodeLearn.",
    step2Title: "ABRÍ UN EDITOR ONLINE GRATIS", step2Desc: "No necesitás instalar nada. Hacé clic en el botón de abajo para abrir un editor online con tu lenguaje listo para usar.", step2Link: "▶️ Abrir editor",
    step3Title: "PEGÁ EL CÓDIGO", step3Desc: "Copiá el código con el botón 📋 de arriba. Pegalo en el editor con Ctrl+V. El código ya está listo para ejecutarse.",
    step4Title: "EJECUTALO", step4Desc: "Buscá el botón ▶️ Run o Ejecutar. Mirá el resultado — ¿hace lo que esperabas? Si hay un error, leé el mensaje con calma, te dice qué falló.",
    step5Title: "EXPERIMENTÁ", step5Desc: "Cambiá un número, una palabra o un valor. Ejecutalo de nuevo y observá cómo cambia. Así aprenden los programadores de verdad.",
    step6Title: "PERSONALIZALO", step6Desc: "Modificá el código para que haga algo diferente. No tengas miedo de romperlo, siempre podés volver a generarlo.",
    step7Title: "COMPARTÍ LO QUE APRENDISTE", step7Desc: "Usá el botón 📤 para compartir con amigos o grupos de programación. Explicarle a otros consolida el conocimiento.",
    step8Title: "SEGUÍ APRENDIENDO", step8Desc: "Volvé a CodeLearn y hacé una nueva consulta. Cada consulta es una lección. Probá el mismo ejercicio en otro lenguaje y compará las diferencias.",
    generateBtn: (lang, icon) => `Generar en ${lang} ${icon}`,
    generating: "Generando...",
    codeTitle: (lang, icon) => `${icon} Código en ${lang}`,
    explainTitle: "¿Qué hace y por qué?",
    copy: "📋 Copiar",
    copied: "✅ Copiado",
    shareCode: "📤 Compartir código",
    shareExplanation: "📤 Compartir explicación",
    shared: "✅ Copiado para compartir",
    error: "Hubo un error generando el código. Intentá de nuevo.",
    footer: "Aprendé programando — generado con IA • CodeLearn",
    uiLangLabel: "Idioma de la app",
    loginTitle: "Iniciar sesión",
    loginEmail: "Email",
    loginPassword: "Contraseña",
    loginBtn: "Ingresar",
    registerBtn: "Registrarse",
    logoutBtn: "Cerrar sesión",
    freeLimit: (n) => `Consultas hoy: ${n}/${FREE_DAILY_LIMIT}`,
    limitReached: "Límite diario alcanzado. ¡Suscribite a Premium para consultas ilimitadas!",
    upgradeBtn: "🚀 Ir a Premium — $10/mes",
    premiumBadge: "⭐ Premium",
    freeBadge: "🆓 Free",
    switchToRegister: "¿No tenés cuenta? Registrate",
    switchToLogin: "¿Ya tenés cuenta? Ingresá",
    forgotPassword: "¿Olvidaste tu contraseña?",
    resetPassword: "Resetear contraseña",
    resetSent: "¡Te enviamos un email para resetear tu contraseña!",
    historyTitle: "📋 Historial de consultas",
    historyEmpty: "Todavía no hiciste ninguna consulta.",
    historyDelete: "🗑️",
    footerTerms: "Términos",
    footerPrivacy: "Privacidad",
    footerRefund: "Reembolsos",
    footerContact: "Contacto",
    newQuery: "🔄 Nueva consulta",
  },
  en: {
    flag: "🇬🇧", label: "English",
    tagline: "Describe → Learn → Copy",
    intro: (lang) => `Describe in your language what you want your program to do. Get the code ready to copy + a full explanation in <strong style="color:#7c6af7">${lang}</strong>.`,
    sectionLang: "Language to learn",
    sectionInput: "What should your program do?",
    inputHint: "— write it as if explaining to a friend",
    placeholder: 'E.g: "I want a function that takes a list of numbers and returns only the even ones, sorted descending"',
    ctrlHint: "Ctrl + Enter to generate",
    suggestedLabel: "Examples to get started:",
    nextStepsTitle: "What do I do with this code?",
    step1Title: "UNDERSTAND THE CODE", step1Desc: "Read the explanation line by line. Don't move to the next step until you understand what each part does. If you don't understand something, ask CodeLearn a new question.",
    step2Title: "OPEN A FREE ONLINE EDITOR", step2Desc: "No installation needed. Click the button below to open an online editor with your language ready to use.", step2Link: "▶️ Open editor",
    step3Title: "PASTE THE CODE", step3Desc: "Copy the code with the 📋 button above. Paste it in the editor with Ctrl+V. The code is ready to run.",
    step4Title: "RUN IT", step4Desc: "Find the ▶️ Run button in the editor. Look at the result — does it do what you expected? If there's an error, read the message carefully.",
    step5Title: "EXPERIMENT", step5Desc: "Change a number, a word or a value. Run it again and observe how the result changes. This is how real programmers learn.",
    step6Title: "CUSTOMIZE IT", step6Desc: "Modify the code to do something different. Don't be afraid to break it, you can always regenerate it.",
    step7Title: "SHARE WHAT YOU LEARNED", step7Desc: "Use the 📤 button to share with friends or programming groups. Teaching others consolidates knowledge.",
    step8Title: "KEEP LEARNING", step8Desc: "Come back to CodeLearn and make a new query. Each query is a lesson. Try the same exercise in another language and compare.",
    generateBtn: (lang, icon) => `Generate in ${lang} ${icon}`,
    generating: "Generating...",
    codeTitle: (lang, icon) => `${icon} Code in ${lang}`,
    explainTitle: "What does it do and why?",
    copy: "📋 Copy",
    copied: "✅ Copied",
    shareCode: "📤 Share code",
    shareExplanation: "📤 Share explanation",
    shared: "✅ Copied to share",
    error: "There was an error generating the code. Please try again.",
    footer: "Learn by coding — powered by AI • CodeLearn",
    uiLangLabel: "App language",
    loginTitle: "Sign in",
    loginEmail: "Email",
    loginPassword: "Password",
    loginBtn: "Sign in",
    registerBtn: "Register",
    logoutBtn: "Sign out",
    freeLimit: (n) => `Today's queries: ${n}/${FREE_DAILY_LIMIT}`,
    limitReached: "Daily limit reached. Subscribe to Premium for unlimited queries!",
    upgradeBtn: "🚀 Go Premium — $10/month",
    premiumBadge: "⭐ Premium",
    freeBadge: "🆓 Free",
    switchToRegister: "Don't have an account? Register",
    switchToLogin: "Already have an account? Sign in",
    forgotPassword: "Forgot your password?",
    resetPassword: "Reset password",
    resetSent: "We sent you an email to reset your password!",
    historyTitle: "📋 Query history",
    historyEmpty: "You haven't made any queries yet.",
    historyDelete: "🗑️",
    footerTerms: "Terms",
    footerPrivacy: "Privacy",
    footerRefund: "Refunds",
    footerContact: "Contact",
    newQuery: "🔄 New query",
  },
  pt: {
    flag: "🇧🇷", label: "Português",
    tagline: "Descreva → Aprenda → Copie",
    intro: (lang) => `Descreva no seu idioma o que você quer que o programa faça. Receba o código pronto para copiar + explicação completa em <strong style="color:#7c6af7">${lang}</strong>.`,
    sectionLang: "Linguagem para aprender",
    sectionInput: "O que você quer que o programa faça?",
    inputHint: "— escreva como se estivesse explicando para alguém",
    placeholder: 'Ex: "Quero uma função que receba uma lista de números e retorne só os pares, ordenados do maior para o menor"',
    ctrlHint: "Ctrl + Enter para gerar",
    suggestedLabel: "Exemplos para começar:",
    nextStepsTitle: "O que faço com este código?",
    step1Title: "ENTENDA O CÓDIGO", step1Desc: "Leia a explicação linha por linha. Não passe para o próximo passo até entender o que cada parte faz.",
    step2Title: "ABRA UM EDITOR ONLINE GRATUITO", step2Desc: "Sem instalação necessária. Clique no botão abaixo para abrir um editor online.", step2Link: "▶️ Abrir editor",
    step3Title: "COLE O CÓDIGO", step3Desc: "Copie o código com o botão 📋. Cole no editor com Ctrl+V.",
    step4Title: "EXECUTE", step4Desc: "Encontre o botão ▶️ Run. Veja o resultado — faz o que você esperava?",
    step5Title: "EXPERIMENTE", step5Desc: "Mude um número ou valor. Execute novamente e observe como o resultado muda.",
    step6Title: "PERSONALIZE", step6Desc: "Modifique o código para fazer algo diferente.",
    step7Title: "COMPARTILHE", step7Desc: "Use o botão 📤 para compartilhar com amigos.",
    step8Title: "CONTINUE APRENDENDO", step8Desc: "Volte ao CodeLearn e faça uma nova consulta. Cada consulta é uma lição.",
    generateBtn: (lang, icon) => `Gerar em ${lang} ${icon}`,
    generating: "Gerando...",
    codeTitle: (lang, icon) => `${icon} Código em ${lang}`,
    explainTitle: "O que faz e por quê?",
    copy: "📋 Copiar",
    copied: "✅ Copiado",
    shareCode: "📤 Compartilhar código",
    shareExplanation: "📤 Compartilhar explicação",
    shared: "✅ Copiado para compartilhar",
    error: "Houve um erro ao gerar o código. Tente novamente.",
    footer: "Aprenda programando — gerado com IA • CodeLearn",
    uiLangLabel: "Idioma do app",
    loginTitle: "Entrar",
    loginEmail: "Email",
    loginPassword: "Senha",
    loginBtn: "Entrar",
    registerBtn: "Registrar",
    logoutBtn: "Sair",
    freeLimit: (n) => `Consultas hoje: ${n}/${FREE_DAILY_LIMIT}`,
    limitReached: "Limite diário atingido. Assine o Premium para consultas ilimitadas!",
    upgradeBtn: "🚀 Ir para Premium — $10/mês",
    premiumBadge: "⭐ Premium",
    freeBadge: "🆓 Free",
    switchToRegister: "Não tem conta? Registre-se",
    switchToLogin: "Já tem conta? Entre",
    forgotPassword: "Esqueceu sua senha?",
    resetPassword: "Redefinir senha",
    resetSent: "Enviamos um email para redefinir sua senha!",
    historyTitle: "📋 Histórico de consultas",
    historyEmpty: "Você ainda não fez nenhuma consulta.",
    historyDelete: "🗑️",
    footerTerms: "Termos",
    footerPrivacy: "Privacidade",
    footerRefund: "Reembolsos",
    footerContact: "Contato",
    newQuery: "🔄 Nova consulta",
  },
  fr: {
    flag: "🇫🇷", label: "Français",
    tagline: "Décrivez → Apprenez → Copiez",
    intro: (lang) => `Décrivez dans votre langue ce que vous voulez que le programme fasse. Obtenez le code prêt à copier + une explication complète en <strong style="color:#7c6af7">${lang}</strong>.`,
    sectionLang: "Langage à apprendre",
    sectionInput: "Que doit faire votre programme ?",
    inputHint: "— écrivez-le comme si vous l'expliquiez à quelqu'un",
    placeholder: 'Ex : "Je veux une fonction qui reçoit une liste de nombres et retourne uniquement les pairs"',
    ctrlHint: "Ctrl + Entrée pour générer",
    suggestedLabel: "Exemples pour commencer:",
    nextStepsTitle: "Que faire avec ce code?",
    step1Title: "COMPRENDRE LE CODE", step1Desc: "Lisez l'explication ligne par ligne.",
    step2Title: "OUVRIR UN ÉDITEUR EN LIGNE", step2Desc: "Cliquez sur le bouton ci-dessous.", step2Link: "▶️ Ouvrir l'éditeur",
    step3Title: "COLLER LE CODE", step3Desc: "Copiez le code avec le bouton 📋 et collez-le avec Ctrl+V.",
    step4Title: "EXÉCUTER", step4Desc: "Trouvez le bouton ▶️ Run et regardez le résultat.",
    step5Title: "EXPÉRIMENTER", step5Desc: "Changez une valeur et observez le résultat.",
    step6Title: "PERSONNALISER", step6Desc: "Modifiez le code pour faire quelque chose de différent.",
    step7Title: "PARTAGER", step7Desc: "Utilisez le bouton 📤 pour partager.",
    step8Title: "CONTINUER À APPRENDRE", step8Desc: "Revenez sur CodeLearn pour une nouvelle requête.",
    generateBtn: (lang, icon) => `Générer en ${lang} ${icon}`,
    generating: "Génération...",
    codeTitle: (lang, icon) => `${icon} Code en ${lang}`,
    explainTitle: "Que fait-il et pourquoi ?",
    copy: "📋 Copier",
    copied: "✅ Copié",
    shareCode: "📤 Partager le code",
    shareExplanation: "📤 Partager l'explication",
    shared: "✅ Copié pour partager",
    error: "Une erreur s'est produite. Veuillez réessayer.",
    footer: "Apprenez en codant — généré par IA • CodeLearn",
    uiLangLabel: "Langue de l'app",
    loginTitle: "Se connecter",
    loginEmail: "Email",
    loginPassword: "Mot de passe",
    loginBtn: "Connexion",
    registerBtn: "S'inscrire",
    logoutBtn: "Déconnexion",
    freeLimit: (n) => `Requêtes aujourd'hui: ${n}/${FREE_DAILY_LIMIT}`,
    limitReached: "Limite quotidienne atteinte. Abonnez-vous au Premium !",
    upgradeBtn: "🚀 Passer au Premium — 10$/mois",
    premiumBadge: "⭐ Premium",
    freeBadge: "🆓 Free",
    switchToRegister: "Pas de compte ? S'inscrire",
    switchToLogin: "Déjà un compte ? Se connecter",
    forgotPassword: "Mot de passe oublié ?",
    resetPassword: "Réinitialiser le mot de passe",
    resetSent: "Nous vous avons envoyé un email pour réinitialiser votre mot de passe !",
    historyTitle: "📋 Historique des requêtes",
    historyEmpty: "Vous n'avez pas encore fait de requêtes.",
    historyDelete: "🗑️",
    footerTerms: "Conditions",
    footerPrivacy: "Confidentialité",
    footerRefund: "Remboursements",
    footerContact: "Contact",
    newQuery: "🔄 Nouvelle requête",
  },
  de: {
    flag: "🇩🇪", label: "Deutsch",
    tagline: "Beschreiben → Lernen → Kopieren",
    intro: (lang) => `Beschreiben Sie in Ihrer Sprache, was das Programm tun soll. Erhalten Sie den Code + eine vollständige Erklärung in <strong style="color:#7c6af7">${lang}</strong>.`,
    sectionLang: "Programmiersprache zum Lernen",
    sectionInput: "Was soll Ihr Programm tun?",
    inputHint: "— schreiben Sie es, als würden Sie es jemandem erklären",
    placeholder: 'Z.B.: "Ich möchte eine Funktion, die eine Zahlenliste nimmt und nur die geraden zurückgibt"',
    ctrlHint: "Strg + Eingabe zum Generieren",
    suggestedLabel: "Beispiele zum Einstieg:",
    nextStepsTitle: "Was mache ich mit diesem Code?",
    step1Title: "CODE VERSTEHEN", step1Desc: "Lesen Sie die Erklärung Zeile für Zeile.",
    step2Title: "ONLINE-EDITOR ÖFFNEN", step2Desc: "Klicken Sie auf die Schaltfläche unten.", step2Link: "▶️ Editor öffnen",
    step3Title: "CODE EINFÜGEN", step3Desc: "Kopieren Sie den Code mit 📋 und fügen Sie ihn mit Ctrl+V ein.",
    step4Title: "AUSFÜHREN", step4Desc: "Finden Sie die ▶️ Run-Schaltfläche und schauen Sie das Ergebnis an.",
    step5Title: "EXPERIMENTIEREN", step5Desc: "Ändern Sie einen Wert und beobachten Sie das Ergebnis.",
    step6Title: "ANPASSEN", step6Desc: "Ändern Sie den Code, damit er etwas anderes macht.",
    step7Title: "TEILEN", step7Desc: "Verwenden Sie die 📤-Schaltfläche zum Teilen.",
    step8Title: "WEITERLERNEN", step8Desc: "Kommen Sie zu CodeLearn zurück für eine neue Anfrage.",
    generateBtn: (lang, icon) => `In ${lang} generieren ${icon}`,
    generating: "Generiert...",
    codeTitle: (lang, icon) => `${icon} Code in ${lang}`,
    explainTitle: "Was macht es und warum?",
    copy: "📋 Kopieren",
    copied: "✅ Kopiert",
    shareCode: "📤 Code teilen",
    shareExplanation: "📤 Erklärung teilen",
    shared: "✅ Zum Teilen kopiert",
    error: "Beim Generieren ist ein Fehler aufgetreten. Bitte erneut versuchen.",
    footer: "Lerne durch Programmieren — KI-gestützt • CodeLearn",
    uiLangLabel: "App-Sprache",
    loginTitle: "Anmelden",
    loginEmail: "E-Mail",
    loginPassword: "Passwort",
    loginBtn: "Anmelden",
    registerBtn: "Registrieren",
    logoutBtn: "Abmelden",
    freeLimit: (n) => `Anfragen heute: ${n}/${FREE_DAILY_LIMIT}`,
    limitReached: "Tageslimit erreicht. Abonnieren Sie Premium für unbegrenzte Anfragen!",
    upgradeBtn: "🚀 Zu Premium — 10$/Monat",
    premiumBadge: "⭐ Premium",
    freeBadge: "🆓 Free",
    switchToRegister: "Kein Konto? Registrieren",
    switchToLogin: "Haben Sie ein Konto? Anmelden",
    forgotPassword: "Passwort vergessen?",
    resetPassword: "Passwort zurücksetzen",
    resetSent: "Wir haben Ihnen eine E-Mail zum Zurücksetzen des Passworts gesendet!",
    historyTitle: "📋 Anfragenverlauf",
    historyEmpty: "Sie haben noch keine Anfragen gestellt.",
    historyDelete: "🗑️",
    footerTerms: "Nutzungsbedingungen",
    footerPrivacy: "Datenschutz",
    footerRefund: "Rückerstattungen",
    footerContact: "Kontakt",
    newQuery: "🔄 Neue Anfrage",
  },
  zh: {
    flag: "🇨🇳", label: "中文",
    tagline: "描述 → 学习 → 复制",
    intro: (lang) => `用您的语言描述您希望程序做什么。获得可直接复制的代码 + 用 <strong style="color:#7c6af7">${lang}</strong> 写的完整解释。`,
    sectionLang: "要学习的编程语言",
    sectionInput: "您希望程序做什么？",
    inputHint: "— 像向别人解释一样描述",
    placeholder: '例："我想要一个函数，接收一个数字列表，只返回偶数，并按降序排列"',
    ctrlHint: "Ctrl + Enter 生成",
    suggestedLabel: "入门示例:",
    nextStepsTitle: "我该如何使用这段代码?",
    step1Title: "理解代码", step1Desc: "逐行阅读下面的解释。",
    step2Title: "打开免费在线编辑器", step2Desc: "点击下面的按钮打开在线编辑器。", step2Link: "▶️ 打开编辑器",
    step3Title: "粘贴代码", step3Desc: "用📋按钮复制代码，然后用Ctrl+V粘贴。",
    step4Title: "运行", step4Desc: "找到▶️运行按钮，查看结果。",
    step5Title: "实验", step5Desc: "改变一个值，再次运行，观察结果如何变化。",
    step6Title: "自定义", step6Desc: "修改代码使其做不同的事情。",
    step7Title: "分享", step7Desc: "使用📤按钮与朋友分享。",
    step8Title: "继续学习", step8Desc: "回到CodeLearn提出新问题。",
    generateBtn: (lang, icon) => `用 ${lang} 生成 ${icon}`,
    generating: "生成中...",
    codeTitle: (lang, icon) => `${icon} ${lang} 代码`,
    explainTitle: "它做什么？为什么这样写？",
    copy: "📋 复制",
    copied: "✅ 已复制",
    shareCode: "📤 分享代码",
    shareExplanation: "📤 分享解释",
    shared: "✅ 已复制分享",
    error: "生成代码时出错，请重试。",
    footer: "边编程边学习 — AI 驱动 • CodeLearn",
    uiLangLabel: "应用语言",
    loginTitle: "登录",
    loginEmail: "邮箱",
    loginPassword: "密码",
    loginBtn: "登录",
    registerBtn: "注册",
    logoutBtn: "退出",
    freeLimit: (n) => `今日查询: ${n}/${FREE_DAILY_LIMIT}`,
    limitReached: "已达到每日限制。订阅高级版以获得无限查询！",
    upgradeBtn: "🚀 升级到高级版 — $10/月",
    premiumBadge: "⭐ 高级版",
    freeBadge: "🆓 免费",
    switchToRegister: "没有账户？注册",
    switchToLogin: "已有账户？登录",
    forgotPassword: "忘记密码？",
    resetPassword: "重置密码",
    resetSent: "我们已向您发送了重置密码的邮件！",
    historyTitle: "📋 查询历史",
    historyEmpty: "您还没有进行任何查询。",
    historyDelete: "🗑️",
    footerTerms: "服务条款",
    footerPrivacy: "隐私政策",
    footerRefund: "退款政策",
    footerContact: "联系我们",
    newQuery: "🔄 新查询",
  },
};


const SUGGESTED_PROMPTS = [
  { text: "Quiero una función que ordene una lista de nombres alfabéticamente", lang: "python", icon: "🐍" },
  { text: "Quiero una calculadora que sume, reste, multiplique y divida", lang: "javascript", icon: "🟨" },
  { text: "Quiero una función que verifique si una palabra es palíndromo", lang: "python", icon: "🐍" },
  { text: "Quiero una función que cuente cuántas veces aparece una letra en un texto", lang: "typescript", icon: "🔷" },
  { text: "Quiero un programa que convierta grados Celsius a Fahrenheit", lang: "go", icon: "🐹" },
  { text: "Quiero una clase con atributos y métodos básicos", lang: "java", icon: "☕" },
  { text: "Quiero una función que calcule el factorial de un número", lang: "kotlin", icon: "🎯" },
  { text: "Quiero una función que encuentre el número mayor de una lista", lang: "swift", icon: "🍎" },
  { text: "Quiero una función que invierta una cadena de texto", lang: "rust", icon: "🦀" },
  { text: "Quiero una función que calcule la secuencia de Fibonacci", lang: "cpp", icon: "➕" },
];

// ─── MODO "CREAR APP" ───────────────────────────────────────────────
// Textos que reemplazan a los de UI_LANGS cuando el modo es "app".
// Todo lo que no está acá (login, historial, pasos, etc.) se reutiliza tal cual.
const APP_TEXTS = {
  es: {
    modeFunctions: "🧩 Crear funciones",
    modeApp: "📱 Crear app",
    intro: (lang) => `Describí en tu idioma la app que querés construir. Recibís el código completo de la app listo para copiar + la explicación de cómo está armada en <strong style="color:#7c6af7">${lang}</strong>.`,
    sectionInput: "¿Qué app querés crear?",
    inputHint: "— contá qué tiene que hacer y qué funciones querés que tenga",
    placeholder: 'Ej: "Quiero una app de lista de tareas donde pueda agregar, marcar como hechas y borrar tareas, y ver cuántas me quedan"',
    generateBtn: (lang, icon) => `Crear app en ${lang} ${icon}`,
    generating: "Creando app...",
    codeTitle: (lang, icon) => `${icon} App en ${lang}`,
    explainTitle: "¿Cómo está armada la app?",
    nextStepsTitle: "¿Qué hago con esta app?",
    error: "Hubo un error creando la app. Intentá de nuevo o describila un poco más simple.",
  },
  en: {
    modeFunctions: "🧩 Create functions",
    modeApp: "📱 Create app",
    intro: (lang) => `Describe in your language the app you want to build. Get the complete app code ready to copy + an explanation of how it's built in <strong style="color:#7c6af7">${lang}</strong>.`,
    sectionInput: "What app do you want to create?",
    inputHint: "— tell what it should do and which features you want",
    placeholder: 'E.g: "I want a to-do list app where I can add, complete and delete tasks, and see how many are left"',
    generateBtn: (lang, icon) => `Create app in ${lang} ${icon}`,
    generating: "Creating app...",
    codeTitle: (lang, icon) => `${icon} App in ${lang}`,
    explainTitle: "How is the app built?",
    nextStepsTitle: "What do I do with this app?",
    error: "There was an error creating the app. Try again or describe it a bit simpler.",
  },
  pt: {
    modeFunctions: "🧩 Criar funções",
    modeApp: "📱 Criar app",
    intro: (lang) => `Descreva no seu idioma o app que você quer construir. Receba o código completo do app pronto para copiar + a explicação de como ele é montado em <strong style="color:#7c6af7">${lang}</strong>.`,
    sectionInput: "Que app você quer criar?",
    inputHint: "— conte o que ele deve fazer e quais funções você quer",
    placeholder: 'Ex: "Quero um app de lista de tarefas onde eu possa adicionar, marcar como feitas e apagar tarefas, e ver quantas faltam"',
    generateBtn: (lang, icon) => `Criar app em ${lang} ${icon}`,
    generating: "Criando app...",
    codeTitle: (lang, icon) => `${icon} App em ${lang}`,
    explainTitle: "Como o app é montado?",
    nextStepsTitle: "O que faço com este app?",
    error: "Houve um erro ao criar o app. Tente novamente ou descreva de forma mais simples.",
  },
  fr: {
    modeFunctions: "🧩 Créer des fonctions",
    modeApp: "📱 Créer une app",
    intro: (lang) => `Décrivez dans votre langue l'app que vous voulez construire. Obtenez le code complet de l'app prêt à copier + une explication de sa structure en <strong style="color:#7c6af7">${lang}</strong>.`,
    sectionInput: "Quelle app voulez-vous créer ?",
    inputHint: "— dites ce qu'elle doit faire et quelles fonctionnalités vous voulez",
    placeholder: 'Ex : "Je veux une app de liste de tâches où je peux ajouter, cocher et supprimer des tâches, et voir combien il en reste"',
    generateBtn: (lang, icon) => `Créer l'app en ${lang} ${icon}`,
    generating: "Création de l'app...",
    codeTitle: (lang, icon) => `${icon} App en ${lang}`,
    explainTitle: "Comment l'app est-elle construite ?",
    nextStepsTitle: "Que faire avec cette app ?",
    error: "Une erreur s'est produite lors de la création de l'app. Réessayez ou décrivez-la plus simplement.",
  },
  de: {
    modeFunctions: "🧩 Funktionen erstellen",
    modeApp: "📱 App erstellen",
    intro: (lang) => `Beschreiben Sie in Ihrer Sprache die App, die Sie bauen möchten. Erhalten Sie den vollständigen App-Code + eine Erklärung ihres Aufbaus in <strong style="color:#7c6af7">${lang}</strong>.`,
    sectionInput: "Welche App möchten Sie erstellen?",
    inputHint: "— erzählen Sie, was sie tun soll und welche Funktionen sie haben soll",
    placeholder: 'Z.B.: "Ich möchte eine To-do-App, in der ich Aufgaben hinzufügen, abhaken und löschen kann und sehe, wie viele noch offen sind"',
    generateBtn: (lang, icon) => `App in ${lang} erstellen ${icon}`,
    generating: "App wird erstellt...",
    codeTitle: (lang, icon) => `${icon} App in ${lang}`,
    explainTitle: "Wie ist die App aufgebaut?",
    nextStepsTitle: "Was mache ich mit dieser App?",
    error: "Beim Erstellen der App ist ein Fehler aufgetreten. Bitte erneut versuchen oder einfacher beschreiben.",
  },
  zh: {
    modeFunctions: "🧩 创建函数",
    modeApp: "📱 创建应用",
    intro: (lang) => `用您的语言描述您想构建的应用。获得可直接复制的完整应用代码 + 用 <strong style="color:#7c6af7">${lang}</strong> 写的结构说明。`,
    sectionInput: "您想创建什么应用？",
    inputHint: "— 说明它要做什么以及您想要哪些功能",
    placeholder: '例："我想要一个待办事项应用，可以添加、完成和删除任务，并查看还剩多少任务"',
    generateBtn: (lang, icon) => `用 ${lang} 创建应用 ${icon}`,
    generating: "正在创建应用...",
    codeTitle: (lang, icon) => `${icon} ${lang} 应用`,
    explainTitle: "应用是如何构建的？",
    nextStepsTitle: "我该如何使用这个应用?",
    error: "创建应用时出错，请重试或描述得更简单一些。",
  },
};

const APP_SUGGESTED_PROMPTS = [
  { text: "Quiero una app de lista de tareas: agregar, completar, borrar y ver las tareas pendientes", lang: "python", icon: "🐍" },
  { text: "Quiero una app web de notas con HTML, CSS y JavaScript que guarde las notas en el navegador", lang: "javascript", icon: "🟨" },
  { text: "Quiero una app de gastos personales que registre ingresos y gastos y muestre el saldo por categoría", lang: "typescript", icon: "🔷" },
  { text: "Quiero un sistema de inventario de una tienda: agregar productos, actualizar stock y mostrar un reporte", lang: "rust", icon: "🦀" },
  { text: "Quiero un sistema de biblioteca: prestar y devolver libros y ver cuáles están disponibles", lang: "go", icon: "🐹" },
  { text: "Quiero una agenda de contactos: agregar, buscar, editar y eliminar contactos", lang: "java", icon: "☕" },
  { text: "Quiero una app de quiz con preguntas de opción múltiple que muestre el puntaje final", lang: "kotlin", icon: "🎯" },
  { text: "Quiero un juego de adivinar el número con intentos limitados y pistas de mayor o menor", lang: "swift", icon: "🍎" },
  { text: "Quiero una app de gestión de notas de alumnos que calcule promedios y muestre quién aprobó", lang: "c", icon: "⚙️" },
  { text: "Quiero un juego de ta-te-ti (tres en raya) para dos jugadores", lang: "cpp", icon: "➕" },
];


const NEXT_STEPS = {
  python: "https://replit.com/new/python3",
  javascript: "https://codepen.io/pen/",
  typescript: "https://www.typescriptlang.org/play",
  rust: "https://play.rust-lang.org/",
  go: "https://go.dev/play/",
  java: "https://replit.com/new/java",
  kotlin: "https://play.kotlinlang.org/",
  swift: "https://swiftfiddle.com/",
  c: "https://replit.com/new/c",
  cpp: "https://replit.com/new/cpp",
};

// Dónde se ejecuta cada app en el modo "Crear app"
const APP_EDITORS = {
  python: "https://replit.com/new/python3",
  javascript: "https://codepen.io/pen/",
  typescript: "https://replit.com/new/typescript",
  rust: "https://replit.com/new/rust",
  go: "https://replit.com/new/go",
  java: "https://replit.com/new/java",
  kotlin: "https://replit.com/new/kotlin",
  swift: "https://www.apple.com/swift/playgrounds/",
  c: "https://replit.com/new/c",
  cpp: "https://replit.com/new/cpp",
};


const PROG_LANGS = [
  { id: "python",     label: "Python",     icon: "🐍" },
  { id: "javascript", label: "JavaScript", icon: "🟨" },
  { id: "typescript", label: "TypeScript", icon: "🔷" },
  { id: "rust",       label: "Rust",       icon: "🦀" },
  { id: "go",         label: "Go",         icon: "🐹" },
  { id: "java",       label: "Java",       icon: "☕" },
  { id: "kotlin",     label: "Kotlin",     icon: "🎯" },
  { id: "swift",      label: "Swift",      icon: "🍎" },
  { id: "c",          label: "C",          icon: "⚙️" },
  { id: "cpp",        label: "C++",        icon: "➕" },
];

function useOrientation() {
  const [isLandscape, setIsLandscape] = useState(
    typeof window !== "undefined" ? window.innerWidth > window.innerHeight : false
  );
  useEffect(() => {
    const check = () => setIsLandscape(window.innerWidth > window.innerHeight);
    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);
    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
  }, []);
  return isLandscape;
}

// true en pantallas angostas (celular en vertical)
function useIsNarrow(maxWidth = 600) {
  const [isNarrow, setIsNarrow] = useState(
    typeof window !== "undefined" ? window.innerWidth <= maxWidth : false
  );
  useEffect(() => {
    const check = () => setIsNarrow(window.innerWidth <= maxWidth);
    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);
    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
  }, [maxWidth]);
  return isNarrow;
}

function CopyButton({ text, t }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} style={styles.copyBtn}>
      {copied ? t.copied : t.copy}
    </button>
  );
}

function ShareButton({ text, label, shared, style }) {
  const [sharing, setSharing] = useState(false);
  const share = async () => {
    const shareText = text + "\n\n— Generado con CodeLearn: codelearn.codes";
    if (navigator.share) {
      try { await navigator.share({ text: shareText }); } catch (e) {}
    } else {
      navigator.clipboard.writeText(shareText);
      setSharing(true);
      setTimeout(() => setSharing(false), 2000);
    }
  };
  return (
    <button onClick={share} style={{ ...styles.shareBtn, ...style }}>
      {sharing ? shared : label}
    </button>
  );
}


function SuggestedPrompts({ onSelect, setProgLang, t, prompts = SUGGESTED_PROMPTS }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={styles.suggestedWrap}>
      <button onClick={() => setOpen(o => !o)} style={styles.suggestedToggle}>
        <span>💡 {t.suggestedLabel || "Ejemplos para empezar"}</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={styles.suggestedList}>
          {prompts.map((p, i) => (
            <button
              key={i}
              onClick={() => {
                onSelect(p.text);
                setProgLang(p.lang);
                setOpen(false);
              }}
              style={styles.suggestedBtn}
            >
              <span>{p.icon}</span>
              <span>{p.text}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function NextSteps({ progLang, t, mode }) {
  const [open, setOpen] = useState(false);
  const editorUrl = (mode === "app" ? APP_EDITORS : NEXT_STEPS)[progLang] || "https://replit.com";
  const lang = progLang;

  const steps = [
    {
      n: "1️⃣",
      title: t.step1Title || "ENTENDÉ EL CÓDIGO",
      desc: t.step1Desc || "Leé la explicación línea por línea. No pases al siguiente paso hasta entender qué hace cada parte. Si no entendés algo, hacele una nueva consulta a CodeLearn."
    },
    {
      n: "2️⃣",
      title: t.step2Title || "ABRÍ UN EDITOR ONLINE GRATIS",
      desc: t.step2Desc || "No necesitás instalar nada. Hacé clic en el botón de abajo para abrir un editor online con tu lenguaje listo para usar.",
      link: editorUrl,
      linkLabel: t.step2Link || `▶️ Abrir editor para ${lang}`
    },
    {
      n: "3️⃣",
      title: t.step3Title || "PEGÁ EL CÓDIGO",
      desc: t.step3Desc || "Copiá el código con el botón 📋 de arriba. Pegalo en el editor con Ctrl+V (o Cmd+V en Mac). El código ya está listo para ejecutarse."
    },
    {
      n: "4️⃣",
      title: t.step4Title || "EJECUTALO",
      desc: t.step4Desc || "Buscá el botón ▶️ Run o Ejecutar en el editor. Mirá el resultado — ¿hace lo que esperabas? Si hay un error, leé el mensaje con calma, generalmente te dice qué falló."
    },
    {
      n: "5️⃣",
      title: t.step5Title || "EXPERIMENTÁ",
      desc: t.step5Desc || "Cambiá un número, una palabra o un valor dentro del código. Ejecutalo de nuevo y observá cómo cambia el resultado. Así es exactamente como aprenden los programadores de verdad."
    },
    {
      n: "6️⃣",
      title: t.step6Title || "PERSONALIZALO",
      desc: t.step6Desc || "Modificá el código para que haga algo diferente — agregá un parámetro nuevo, cambiá la lógica, combinalo con otra función. No tengas miedo de romperlo, siempre podés volver a generarlo."
    },
    {
      n: "7️⃣",
      title: t.step7Title || "COMPARTÍ LO QUE APRENDISTE",
      desc: t.step7Desc || "Usá el botón 📤 para compartir el código con amigos, compañeros o en grupos de programación. Explicarle a otros lo que aprendiste es la mejor forma de consolidar el conocimiento."
    },
    {
      n: "8️⃣",
      title: t.step8Title || "SEGUÍ APRENDIENDO CON CODELEARN",
      desc: t.step8Desc || "Volvé a CodeLearn y hacé una nueva consulta. Cada vez que describís algo nuevo aprendés un concepto diferente. Probá el mismo ejercicio en otro lenguaje y compará las diferencias. ¡Cada consulta es una lección!"
    },
    {
      n: "━━━",
      title: t.proFlowTitle || "FLUJO DE UN PROGRAMADOR REAL",
      desc: t.proFlowDesc || "¿Querés ir más allá? Estas son las herramientas que usan los programadores profesionales todos los días.",
      isDivider: true,
    },
    {
      n: "9️⃣",
      title: t.step9Title || "INSTALÁ VS CODE — EL EDITOR PROFESIONAL",
      desc: t.step9Desc || "VS Code es el editor de código más usado en el mundo. Es gratuito, potente y tiene miles de extensiones. Descargalo, abrí un archivo nuevo, pegá tu código y ejecutalo directamente desde ahí.",
      link: "https://code.visualstudio.com/download",
      linkLabel: t.step9Link || "⬇️ Descargar VS Code gratis",
    },
    {
      n: "🔟",
      title: t.step10Title || "GUARDÁ TU CÓDIGO EN GITHUB",
      desc: t.step10Desc || "GitHub es la plataforma donde los programadores guardan y comparten su código. Es como Google Drive pero para código. Creá una cuenta gratuita, subí tu código y tenelo disponible desde cualquier dispositivo. Es también tu portafolio como programador.",
      link: "https://github.com/signup",
      linkLabel: t.step10Link || "🐙 Crear cuenta en GitHub gratis",
    },
    {
      n: "1️⃣1️⃣",
      title: t.step11Title || "PUBLICÁ TU PROYECTO EN INTERNET — VERCEL",
      desc: t.step11Desc || "Vercel te permite publicar tu proyecto en internet en minutos, completamente gratis. Conectás tu repositorio de GitHub y Vercel hace todo automáticamente. En segundos tenés una URL real para compartir con cualquiera en el mundo.",
      link: "https://vercel.com/signup",
      linkLabel: t.step11Link || "🚀 Publicar en Vercel gratis",
    },
  ];

  return (
    <div style={styles.nextStepsWrap}>
      <button onClick={() => setOpen(o => !o)} style={styles.nextStepsToggle}>
        <span>📚 {t.nextStepsTitle || "¿Qué hago con este código?"}</span>
        <span style={{ fontSize: 16 }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={styles.nextStepsList}>
          {steps.map((s, i) => (
            s.isDivider ? (
              <div key={i} style={styles.nextStepDivider}>
                <div style={styles.nextStepDividerLine} />
                <span style={styles.nextStepDividerText}>{s.title}</span>
                <div style={styles.nextStepDividerLine} />
              </div>
            ) : (
              <div key={i} style={styles.nextStep}>
                <div style={styles.nextStepHeader}>
                  <span style={styles.nextStepN}>{s.n}</span>
                  <span style={styles.nextStepTitle}>{s.title}</span>
                </div>
                <p style={styles.nextStepDesc}>{s.desc}</p>
                {s.link && (
                  <a href={s.link} target="_blank" rel="noopener noreferrer" style={styles.nextStepLink}>
                    {s.linkLabel}
                  </a>
                )}
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}


function ExplanationBlock({ explanation }) {
  const lines = explanation.split("\n");
  const elements = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) { i++; continue; }
    if (line.startsWith("## ")) {
      elements.push(<h3 key={i} style={styles.expSubheading}>{line.replace("## ", "")}</h3>);
    } else if (line.startsWith("- ")) {
      const items = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(<li key={i} style={styles.expLi}>→ {lines[i].trim().replace("- ", "")}</li>);
        i++;
      }
      elements.push(<ul key={`ul-${i}`} style={styles.expUl}>{items}</ul>);
      continue;
    } else {
      elements.push(<p key={i} style={styles.expP}>{line}</p>);
    }
    i++;
  }
  return <div style={styles.expBody}>{elements}</div>;
}

function LangSwitcher({ uiLang, setUiLang, t, compact = false }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <button onClick={() => setOpen(o => !o)} style={{ ...styles.langSwitchBtn, ...(compact ? { padding: "7px 10px" } : {}) }}>
        {UI_LANGS[uiLang].flag}{compact ? "" : ` ${UI_LANGS[uiLang].label}`} ▾
      </button>
      {open && (
        <div style={styles.langDropdown}>
          <div style={styles.langDropdownLabel}>{t.uiLangLabel}</div>
          {Object.entries(UI_LANGS).map(([key, val]) => (
            <button
              key={key}
              onClick={() => { setUiLang(key); setOpen(false); }}
              style={{ ...styles.langDropdownItem, ...(uiLang === key ? styles.langDropdownItemActive : {}) }}
            >
              {val.flag} {val.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


function HistoryPanel({ history, setHistory, onSelect, setProgLang, setMode, t, onClose }) {
  const deleteEntry = (id) => {
    const updated = history.filter(h => h.id !== id);
    setHistory(updated);
    try { localStorage.setItem("cl_history", JSON.stringify(updated)); } catch {}
  };

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={{ ...styles.modal, maxWidth: 600, maxHeight: "80vh", display: "flex", flexDirection: "column" }} onClick={e => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <div style={styles.modalTitle}>{t.historyTitle}</div>
          <button onClick={onClose} style={styles.modalClose}>✕</button>
        </div>
        <div style={{ overflowY: "auto", flex: 1, padding: "12px" }}>
          {history.length === 0 ? (
            <p style={{ color: "#6b6880", fontSize: 13, textAlign: "center", padding: "20px" }}>{t.historyEmpty}</p>
          ) : history.map(h => (
            <div key={h.id} style={styles.historyItem}>
              <div style={styles.historyTop}>
                <span style={styles.historyLang}>{h.icon} {h.lang}</span>
                <span style={styles.historyMode}>{h.mode === "app" ? "📱 App" : "🧩"}</span>
                <span style={styles.historyDate}>{h.date}</span>
                <button onClick={() => deleteEntry(h.id)} style={styles.historyDelete}>{t.historyDelete}</button>
              </div>
              <div style={styles.historyInput}>{h.input}{h.input.length >= 80 ? "..." : ""}</div>
              <button
                onClick={() => {
                  setMode(h.mode === "app" ? "app" : "functions");
                  onSelect(h.input);
                  setProgLang(PROG_LANGS.find(l => l.label === h.lang)?.id || "python");
                  onClose();
                }}
                style={styles.historyUseBtn}
              >
                ↩ Usar de nuevo
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AuthModal({ t, onClose }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isForgot, setIsForgot] = useState(false);

  const handleSubmit = async () => {
    setLoading(true); setError(""); setSuccess("");
    try {
      if (isForgot) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: "https://codelearn.codes",
        });
        if (error) throw error;
        setSuccess(t.resetSent || "¡Email enviado! Revisá tu bandeja de entrada.");
      } else if (isRegister) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setSuccess("¡Cuenta creada! Revisá tu email para confirmar.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onClose();
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <div style={styles.modalTitle}>{isForgot ? (t.resetPassword || "Resetear contraseña") : isRegister ? t.registerBtn : t.loginTitle}</div>
          <button onClick={onClose} style={styles.modalClose}>✕</button>
        </div>
        <div style={{ padding: "20px" }}>
          <input
            type="email"
            placeholder={t.loginEmail}
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={styles.authInput}
          />
          {!isForgot && (
            <input
              type="password"
              placeholder={t.loginPassword}
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ ...styles.authInput, marginTop: 10 }}
              onKeyDown={e => { if (e.key === "Enter") handleSubmit(); }}
            />
          )}
          {error && <div style={styles.authError}>{error}</div>}
          {success && <div style={styles.authSuccess}>{success}</div>}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{ ...styles.generateBtn, width: "100%", marginTop: 16 }}
          >
            {loading ? "..." : (isRegister ? t.registerBtn : t.loginBtn)}
          </button>
          {!isForgot && (
            <button onClick={() => setIsRegister(r => !r)} style={styles.switchBtn}>
              {isRegister ? t.switchToLogin : t.switchToRegister}
            </button>
          )}
          {!isRegister && (
            <button onClick={() => { setIsForgot(f => !f); setError(""); setSuccess(""); }} style={{ ...styles.switchBtn, color: "#4e4b62", marginTop: 4 }}>
              {isForgot ? (t.switchToLogin || "Volver al login") : (t.forgotPassword || "¿Olvidaste tu contraseña?")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [uiLang, setUiLang]     = useState("es");
  const [mode, setMode]         = useState("functions"); // "functions" | "app"
  const [progLang, setProgLang] = useState("python");
  const [input, setInput]       = useState("");
  const [result, setResult]     = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [user, setUser]         = useState(null);
  const [userPlan, setUserPlan] = useState("free");
  const [dailyCount, setDailyCount] = useState(0);
  const [showAuth, setShowAuth] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [resetDone, setResetDone] = useState(false);
  const [resetError, setResetError] = useState("");
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cl_history") || "[]"); } catch { return []; }
  });
  const outputRef               = useRef(null);
  const isLandscape             = useOrientation();
  const isNarrow                = useIsNarrow();

  const isAppMode = mode === "app";
  const baseT = { ...UI_LANGS[uiLang], ...APP_TEXTS[uiLang] };
  const t = isAppMode ? baseT : { ...baseT, ...UI_LANGS[uiLang] };
  const selectedProgLang = PROG_LANGS.find(l => l.id === progLang);

  const switchMode = (m) => {
    if (m === mode) return;
    setMode(m);
    setResult(null);
    setInput("");
    setError(null);
  };
  const isPremium = userPlan === "premium";
  const limitReached = !isPremium && user && dailyCount >= FREE_DAILY_LIMIT;

  // Auth listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) loadUserData(session.user);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) loadUserData(session.user);
      if (event === "PASSWORD_RECOVERY") {
        setShowResetForm(true);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // Usuario actual accesible desde los eventos de Paddle
  const userRef = useRef(null);
  useEffect(() => { userRef.current = user; }, [user]);

// Load Paddle
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.onload = () => {
      window.Paddle.Initialize({
        token: PADDLE_CLIENT_TOKEN,
        // Premium lo activa el SERVIDOR cuando Paddle confirma el pago (webhook).
        // Acá solo volvemos a leer el plan unos segundos después del pago.
        eventCallback: (ev) => {
          if (ev?.name === "checkout.completed" && userRef.current) {
            [3000, 8000, 15000].forEach(ms => setTimeout(() => loadUserData(userRef.current), ms));
          }
        },
      });
    };
    document.head.appendChild(script);
  }, []);
   

  // Solo LEE el uso del usuario. Crear la fila, resetear el día y sumar consultas
  // lo hace el servidor (Edge Function "generate"), así nadie puede tocarlo desde el navegador.
  const loadUserData = async (u) => {
    const today = new Date().toISOString().split("T")[0];
    const { data: rows } = await supabase
      .from("user_usage")
      .select("plan, daily_count, last_reset")
      .eq("user_id", u.id);

    const list = rows || [];
    setUserPlan(list.some(r => r.plan === "premium") ? "premium" : "free");
    setDailyCount(
      list
        .filter(r => String(r.last_reset || "").slice(0, 10) === today)
        .reduce((max, r) => Math.max(max, r.daily_count || 0), 0)
    );
  };

  const handleUpgrade = () => {
    if (!window.Paddle) return;
    window.Paddle.Checkout.open({
      items: [{ priceId: PADDLE_PRODUCT_ID, quantity: 1 }],
      customer: { email: user?.email },
      // Así el webhook sabe a qué usuario de CodeLearn activarle Premium
      customData: { user_id: user?.id },
    });
  };

  const handleResetPassword = async () => {
    setResetError("");
    if (newPassword.length < 6) {
      setResetError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setResetError(error.message);
    } else {
      setResetDone(true);
      setShowResetForm(false);
      setNewPassword("");
    }
  };

  const generate = async () => {
    if (!input.trim()) return;
    if (!user) { setShowAuth(true); return; }
    if (limitReached) return;

    setLoading(true); setResult(null); setError(null);
    try {
      // La llamada a Claude ahora la hace el servidor (Supabase Edge Function "generate").
      // La clave de Anthropic ya NO está en el navegador.
      const { data, error: fnError } = await supabase.functions.invoke("generate", {
        body: { input, lang: selectedProgLang.label, uiLang: UI_LANGS[uiLang].label, mode },
      });
      if (fnError) {
        let info = {};
        try { info = await fnError.context.json(); } catch {}
        if (info.error === "limit_reached") {
          setDailyCount(info.dailyCount ?? FREE_DAILY_LIMIT);
          return;
        }
        throw fnError;
      }
      const parsed = { code: data.code, explanation: data.explanation };
      if (typeof data.dailyCount === "number") setDailyCount(data.dailyCount);
      setResult(parsed);
      const newEntry = {
        id: Date.now(),
        mode,
        lang: selectedProgLang.label,
        icon: selectedProgLang.icon,
        input: input.slice(0, 80),
        code: parsed.code,
        explanation: parsed.explanation,
        date: new Date().toLocaleDateString(),
      };
      const newHistory = [newEntry, ...history].slice(0, 20);
      setHistory(newHistory);
      try { localStorage.setItem("cl_history", JSON.stringify(newHistory)); } catch {}
      setTimeout(() => outputRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch { setError(t.error); }
    finally { setLoading(false); }
  };

  const landscapeLayout = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" };

  const renderInput = (landscape = false) => (
    <div>
      <div style={{ marginBottom: landscape ? 12 : 20 }}>
        <label style={{ ...styles.label, fontSize: landscape ? 11 : 12, marginBottom: landscape ? 8 : 10 }}>{t.sectionLang}</label>
        <div style={landscape ? styles.langGridLandscape : styles.langGrid}>
          {PROG_LANGS.map(l => (
            <button key={l.id} onClick={() => setProgLang(l.id)}
              style={{ ...(landscape ? styles.progLangBtnLandscape : styles.progLangBtn), ...(progLang === l.id ? styles.progLangBtnActive : {}) }}>
              <span>{l.icon}</span><span style={landscape ? { fontSize: 11 } : {}}>{l.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: landscape ? 10 : 20 }}>
        <label style={{ ...styles.label, fontSize: landscape ? 11 : 12, marginBottom: landscape ? 6 : 10 }}>
          {t.sectionInput}{!landscape && <span style={styles.labelHint}> {t.inputHint}</span>}
        </label>
        <textarea
          style={{ ...styles.textarea, fontSize: landscape ? 13 : 14 }}
          placeholder={t.placeholder}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && e.ctrlKey) generate(); }}
          rows={4}
        />
        {!landscape && (
          <div style={styles.inputFooter}>
            <span style={styles.hint}>{t.ctrlHint}</span>
          </div>
        )}
      {!input && (
  <SuggestedPrompts onSelect={setInput} setProgLang={setProgLang} t={t} landscape={landscape} prompts={isAppMode ? APP_SUGGESTED_PROMPTS : SUGGESTED_PROMPTS} />
)}
      </div>

      {/* Free limit bar */}
      {user && !isPremium && (
        <div style={styles.limitBar}>
          <span style={{ fontSize: 11, color: dailyCount >= FREE_DAILY_LIMIT ? "#f08080" : "#9691b8" }}>
            {t.freeLimit(dailyCount)}
          </span>
          <div style={styles.limitTrack}>
            <div style={{ ...styles.limitFill, width: `${Math.min((dailyCount / FREE_DAILY_LIMIT) * 100, 100)}%`, background: dailyCount >= FREE_DAILY_LIMIT ? "#f08080" : "#7c6af7" }} />
          </div>
        </div>
      )}

      {limitReached && (
        <div style={styles.limitReached}>
          <div style={{ fontSize: 13, color: "#f08080", marginBottom: 10 }}>{t.limitReached}</div>
          <button onClick={handleUpgrade} style={{ ...styles.generateBtn, width: "100%" }}>{t.upgradeBtn}</button>
        </div>
      )}

      {!limitReached && (
        <button onClick={generate} disabled={loading || !input.trim()}
          style={{ ...styles.generateBtn, width: landscape ? "100%" : "auto", ...(loading || !input.trim() ? styles.generateBtnDisabled : {}) }}>
          {loading ? <span style={styles.loadingInner}><span style={styles.spinner} />{t.generating}</span>
            : t.generateBtn(selectedProgLang.label, selectedProgLang.icon)}
        </button>
      )}

      {error && <div style={{ ...styles.error, marginTop: 10 }}>{error}</div>}
    </div>
  );

  const renderResult = () => result ? (
    <div style={{ display: "flex", flexDirection: "column", gap: isLandscape ? 12 : 16 }}>
      <button
        onClick={() => { setResult(null); setInput(""); setError(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        style={styles.newQueryBtn}
      >
        {t.newQuery || "🔄 Nueva consulta"}
      </button>
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div style={styles.cardTitle}>{t.codeTitle(selectedProgLang.label, selectedProgLang.icon)}</div>
          <div style={styles.btnGroup}>
            <CopyButton text={result.code} t={t} />
            <ShareButton text={result.code} label={t.shareCode} shared={t.shared} />
          </div>
        </div>
        <pre style={{ ...styles.codeBlock, ...(isLandscape ? { fontSize: 12, maxHeight: "30vh", overflowY: "auto" } : {}) }}>
          <code>{result.code}</code>
        </pre>
      </div>
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div style={styles.cardTitle}>📖 {t.explainTitle}</div>
          <div style={styles.btnGroup}>
            <span style={styles.badge}>{selectedProgLang.label}</span>
            <ShareButton text={result.explanation} label={t.shareExplanation} shared={t.shared} />
          </div>
        </div>
        <div style={isLandscape ? { maxHeight: "30vh", overflowY: "auto" } : {}}>
          <ExplanationBlock explanation={result.explanation} />
        </div>
      </div>
      <NextSteps progLang={progLang} t={t} mode={mode} />
    </div>
  ) : isLandscape ? (
    <div style={styles.emptyState}>
      <div style={styles.emptyIcon}>{"</>"}</div>
      <div style={styles.emptyText}>{t.tagline}</div>
    </div>
  ) : null;

  return (
    <div style={styles.root}>
      {showAuth && <AuthModal t={t} onClose={() => setShowAuth(false)} />}
      {showResetForm && (
        <div style={styles.modalOverlay}>
          <div style={{ ...styles.modal, maxWidth: 400 }}>
            <div style={styles.modalHeader}>
              <div style={styles.modalTitle}>🔑 Nueva contraseña</div>
            </div>
            <div style={{ padding: "20px" }}>
              <p style={{ fontSize: 13, color: "#b0accc", marginBottom: 16 }}>
                Ingresá tu nueva contraseña. Debe tener al menos 6 caracteres.
              </p>
              <input
                type="password"
                placeholder="Nueva contraseña"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                style={styles.authInput}
                onKeyDown={e => { if (e.key === "Enter") handleResetPassword(); }}
              />
              {resetError && <div style={styles.authError}>{resetError}</div>}
              {resetDone && <div style={styles.authSuccess}>✅ ¡Contraseña actualizada correctamente!</div>}
              <button
                onClick={handleResetPassword}
                style={{ ...styles.generateBtn, width: "100%", marginTop: 16 }}
              >
                Guardar nueva contraseña
              </button>
              <button
                onClick={() => setShowResetForm(false)}
                style={styles.switchBtn}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      {showHistory && <HistoryPanel history={history} setHistory={setHistory} onSelect={setInput} setProgLang={setProgLang} setMode={switchMode} t={t} onClose={() => setShowHistory(false)} />}

      <header style={{ ...styles.header, padding: isLandscape ? "0 16px" : "0 20px" }}>
        <div style={{
          ...styles.headerInner,
          padding: isLandscape ? "10px 0" : isNarrow ? "12px 0" : "16px 0",
          ...(isNarrow ? { flexWrap: "wrap", rowGap: 10 } : {}),
        }}>
          <div style={styles.logo}>
            <span style={{ ...styles.logoIcon, fontSize: isLandscape ? 20 : 26 }}>{"</>"}</span>
            {!isLandscape && <div><div style={styles.logoTitle}>CodeLearn</div><div style={styles.logoSub}>{t.tagline}</div></div>}
            {isLandscape && <div style={styles.logoTitle}>CodeLearn</div>}
          </div>
          {isNarrow && (
            <LangSwitcher compact uiLang={uiLang} setUiLang={(l) => { setUiLang(l); setResult(null); setError(null); }} t={t} />
          )}
          <div style={{
            display: "flex", alignItems: "center", gap: isNarrow ? 6 : 8,
            ...(isNarrow ? { width: "100%", flexWrap: "wrap", justifyContent: "flex-end" } : {}),
          }}>
            {user ? (
              <>
                <span style={{ ...styles.badge, fontSize: 11, whiteSpace: "nowrap" }}>{isPremium ? t.premiumBadge : t.freeBadge}</span>
                {!isPremium && <button onClick={handleUpgrade} style={{ ...styles.upgradeBtn, whiteSpace: "nowrap" }}>⭐ Premium</button>}
                <button onClick={() => setShowHistory(true)} style={styles.historyBtn}>📋</button>
                <button onClick={() => supabase.auth.signOut()} style={{ ...styles.logoutBtn, whiteSpace: "nowrap" }}>{t.logoutBtn}</button>
              </>
            ) : (
              <button onClick={() => setShowAuth(true)} style={{ ...styles.loginHeaderBtn, whiteSpace: "nowrap" }}>👤 {t.loginBtn}</button>
            )}
            {!isNarrow && (
              <LangSwitcher uiLang={uiLang} setUiLang={(l) => { setUiLang(l); setResult(null); setError(null); }} t={t} />
            )}
          </div>
        </div>
      </header>

      <main style={{ ...styles.main, padding: isLandscape ? "12px 16px" : "24px 20px" }}>
        {/* Selector de modo: Crear funciones / Crear app */}
        <div style={{ ...styles.modeSwitch, marginBottom: isLandscape ? 12 : 20 }}>
          {[
            { id: "functions", label: t.modeFunctions },
            { id: "app", label: t.modeApp },
          ].map(m => (
            <button
              key={m.id}
              onClick={() => switchMode(m.id)}
              style={{
                ...styles.modeBtn,
                padding: isLandscape ? "7px 12px" : "10px 12px",
                ...(mode === m.id ? styles.modeBtnActive : {}),
              }}
            >
              {m.label}
            </button>
          ))}
        </div>
        {isLandscape ? (
          <div style={landscapeLayout}>
            <div>{renderInput(true)}</div>
            <div ref={outputRef}>{renderResult()}</div>
          </div>
        ) : (
          <div>
            <div style={{ ...styles.intro, marginBottom: 20, padding: "14px 16px" }}>
              <p style={styles.introText} dangerouslySetInnerHTML={{ __html: t.intro(selectedProgLang.label) }} />
            </div>
            {renderInput(false)}
            <div ref={outputRef} style={{ marginTop: 16 }}>{renderResult()}</div>
          </div>
        )}
      </main>

      {!isLandscape && (
        <footer style={styles.footer}>
          <div>{t.footer}</div>
          <div style={styles.footerLinks}>
            <a href="/legal.html" target="_blank" style={styles.footerLink}>{t.footerTerms || "Términos"}</a>
            <span style={{ color: "#2a2440" }}>·</span>
            <a href="/legal.html#privacy" target="_blank" style={styles.footerLink}>{t.footerPrivacy || "Privacidad"}</a>
            <span style={{ color: "#2a2440" }}>·</span>
            <a href="/legal.html#refund" target="_blank" style={styles.footerLink}>{t.footerRefund || "Reembolsos"}</a>
            <span style={{ color: "#2a2440" }}>·</span>
            <a href="mailto:codelearn.app@gmail.com" style={styles.footerLink}>{t.footerContact || "Contacto"}</a>
          </div>
        </footer>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { background: #0f0f13; overflow-x: hidden; }
        @keyframes spin { to { transform: rotate(360deg); } }
        textarea:focus { outline: none; border-color: #7c6af7 !important; box-shadow: 0 0 0 3px rgba(124,106,247,0.15); }
        button:hover:not(:disabled) { opacity: 0.88; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #0f0f13; }
        ::-webkit-scrollbar-thumb { background: #3a3060; border-radius: 4px; }
      `}</style>
    </div>
  );
}

const styles = {
  root: { minHeight: "100vh", background: "#0f0f13", color: "#e8e6f0", fontFamily: "'Inter', sans-serif", display: "flex", flexDirection: "column" },
  header: { borderBottom: "1px solid #1e1c2a", background: "#0d0c11" },
  headerInner: { maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" },
  logo: { display: "flex", alignItems: "center", gap: 10 },
  logoIcon: { fontFamily: "'IBM Plex Mono', monospace", color: "#7c6af7", fontWeight: 700 },
  logoTitle: { fontSize: 18, fontWeight: 700, color: "#f0eeff", letterSpacing: -0.5 },
  logoSub: { fontSize: 10, color: "#6b6880", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: 0.5 },
  langSwitchBtn: { fontSize: 12, fontWeight: 600, color: "#c4beff", background: "#1e1a35", border: "1px solid #3a3060", borderRadius: 8, padding: "7px 12px", cursor: "pointer" },
  langDropdown: { position: "absolute", right: 0, top: "calc(100% + 8px)", background: "#1a1730", border: "1px solid #2a2440", borderRadius: 10, padding: "8px", zIndex: 100, minWidth: 150, boxShadow: "0 8px 32px rgba(0,0,0,0.5)" },
  langDropdownLabel: { fontSize: 10, fontWeight: 700, color: "#4e4b62", textTransform: "uppercase", letterSpacing: 1, padding: "4px 10px 8px" },
  langDropdownItem: { display: "block", width: "100%", textAlign: "left", padding: "7px 12px", borderRadius: 6, border: "none", background: "transparent", color: "#9691b8", fontSize: 13, cursor: "pointer" },
  langDropdownItemActive: { background: "#2a2440", color: "#c4beff", fontWeight: 600 },
  main: { flex: 1, maxWidth: 1200, margin: "0 auto", width: "100%" },
  intro: { background: "linear-gradient(135deg, #1a1630 0%, #12101c 100%)", borderRadius: 10, border: "1px solid #2a2440" },
  introText: { fontSize: 14, color: "#b0accc", lineHeight: 1.6 },
  label: { display: "block", fontSize: 12, fontWeight: 600, color: "#9691b8", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10 },
  labelHint: { fontWeight: 400, textTransform: "none", letterSpacing: 0, fontSize: 11, color: "#6b6880" },
  langGrid: { display: "flex", flexWrap: "wrap", gap: 6 },
  langGridLandscape: { display: "flex", flexWrap: "wrap", gap: 5 },
  progLangBtn: { display: "flex", alignItems: "center", gap: 5, padding: "7px 12px", borderRadius: 7, border: "1px solid #2a2440", background: "#16141f", cursor: "pointer", color: "#8e8aac", fontSize: 12, fontWeight: 500 },
  progLangBtnLandscape: { display: "flex", alignItems: "center", gap: 4, padding: "5px 9px", borderRadius: 6, border: "1px solid #2a2440", background: "#16141f", cursor: "pointer", color: "#8e8aac", fontSize: 11, fontWeight: 500 },
  progLangBtnActive: { border: "1px solid #7c6af7", background: "#1e1a35", color: "#c4beff" },
  textarea: { width: "100%", background: "#13111c", border: "1px solid #2a2440", borderRadius: 8, color: "#e8e6f0", fontSize: 14, fontFamily: "'Inter', sans-serif", lineHeight: 1.6, padding: "12px 14px", resize: "vertical" },
  inputFooter: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 },
  hint: { fontSize: 11, color: "#4e4b62", fontFamily: "'IBM Plex Mono', monospace" },
  generateBtn: { padding: "10px 20px", background: "linear-gradient(135deg, #7c6af7 0%, #5b4de0 100%)", border: "none", borderRadius: 8, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", letterSpacing: 0.2 },
  generateBtnDisabled: { opacity: 0.35, cursor: "not-allowed" },
  loadingInner: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8 },
  spinner: { width: 13, height: 13, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" },
  error: { padding: "12px 16px", background: "#1f0e0e", border: "1px solid #4a1515", borderRadius: 8, color: "#f08080", fontSize: 13 },
  card: { background: "#13111c", border: "1px solid #2a2440", borderRadius: 10, overflow: "hidden" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid #1e1c2a", background: "#0f0d18" },
  cardTitle: { fontSize: 13, fontWeight: 600, color: "#c4beff", display: "flex", alignItems: "center", gap: 6 },
  badge: { fontSize: 10, fontWeight: 600, color: "#7c6af7", background: "#1e1a35", border: "1px solid #3a3060", padding: "2px 8px", borderRadius: 20, fontFamily: "'IBM Plex Mono', monospace" },
  copyBtn: { fontSize: 11, fontWeight: 600, color: "#9691b8", background: "#1e1c2a", border: "1px solid #2a2440", borderRadius: 6, padding: "5px 10px", cursor: "pointer" },
  codeBlock: { padding: "16px", margin: 0, fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, lineHeight: 1.7, color: "#c8c2ff", overflowX: "auto", background: "transparent", whiteSpace: "pre-wrap", wordBreak: "break-word" },
  expBody: { padding: "16px" },
  expSubheading: { fontSize: 12, fontWeight: 700, color: "#7c6af7", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8, marginTop: 16 },
  expP: { fontSize: 13, color: "#b0accc", lineHeight: 1.7, marginBottom: 8 },
  expUl: { listStyle: "none", paddingLeft: 0, marginBottom: 8 },
  expLi: { fontSize: 13, color: "#b0accc", lineHeight: 1.65, paddingLeft: 4, marginBottom: 5 },
  footer: { textAlign: "center", padding: "16px", fontSize: 11, color: "#3a3750", borderTop: "1px solid #1a1830", fontFamily: "'IBM Plex Mono', monospace" },
  btnGroup: { display: "flex", alignItems: "center", gap: 6 },
  shareBtn: { fontSize: 11, fontWeight: 600, color: "#7c6af7", background: "#1e1a35", border: "1px solid #3a3060", borderRadius: 6, padding: "5px 10px", cursor: "pointer" },
  emptyState: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", minHeight: 200, opacity: 0.25 },
  emptyIcon: { fontSize: 48, fontFamily: "'IBM Plex Mono', monospace", color: "#7c6af7", marginBottom: 12 },
  emptyText: { fontSize: 13, color: "#9691b8", fontFamily: "'IBM Plex Mono', monospace" },
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { background: "#13111c", border: "1px solid #2a2440", borderRadius: 12, width: "90%", maxWidth: 400 },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid #1e1c2a" },
  modalTitle: { fontSize: 16, fontWeight: 700, color: "#f0eeff" },
  modalClose: { background: "none", border: "none", color: "#6b6880", fontSize: 18, cursor: "pointer" },
  authInput: { width: "100%", background: "#0f0d18", border: "1px solid #2a2440", borderRadius: 8, color: "#e8e6f0", fontSize: 14, padding: "10px 14px", fontFamily: "'Inter', sans-serif" },
  authError: { marginTop: 10, fontSize: 12, color: "#f08080" },
  authSuccess: { marginTop: 10, fontSize: 12, color: "#7c6af7" },
  switchBtn: { display: "block", width: "100%", marginTop: 12, background: "none", border: "none", color: "#7c6af7", fontSize: 12, cursor: "pointer", textAlign: "center" },
  limitBar: { marginBottom: 12, display: "flex", flexDirection: "column", gap: 6 },
  limitTrack: { height: 4, background: "#1e1c2a", borderRadius: 2, overflow: "hidden" },
  limitFill: { height: "100%", borderRadius: 2, transition: "width 0.3s" },
  limitReached: { padding: "14px 16px", background: "#1f0e0e", border: "1px solid #4a1515", borderRadius: 8, marginBottom: 12 },
  upgradeBtn: { fontSize: 11, fontWeight: 600, color: "#f0c040", background: "#2a2010", border: "1px solid #5a4010", borderRadius: 6, padding: "5px 10px", cursor: "pointer" },
  loginHeaderBtn: { fontSize: 12, fontWeight: 600, color: "#c4beff", background: "#1e1a35", border: "1px solid #3a3060", borderRadius: 8, padding: "7px 12px", cursor: "pointer" },
  logoutBtn: { fontSize: 11, fontWeight: 600, color: "#6b6880", background: "none", border: "1px solid #2a2440", borderRadius: 6, padding: "5px 10px", cursor: "pointer" },
  historyBtn: { fontSize: 14, background: "#1e1a35", border: "1px solid #3a3060", borderRadius: 6, padding: "5px 10px", cursor: "pointer" },
  historyItem: { background: "#0f0d18", border: "1px solid #2a2440", borderRadius: 8, padding: "12px", marginBottom: 8 },
  historyTop: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 },
  historyLang: { fontSize: 11, fontWeight: 600, color: "#7c6af7", background: "#1e1a35", border: "1px solid #3a3060", padding: "2px 8px", borderRadius: 20 },
  historyMode: { fontSize: 10, fontWeight: 600, color: "#9691b8", background: "#16141f", border: "1px solid #2a2440", padding: "2px 8px", borderRadius: 20 },
  historyDate: { fontSize: 11, color: "#4e4b62", marginLeft: "auto" },
  modeSwitch: { display: "flex", gap: 4, padding: 4, background: "#13111c", border: "1px solid #2a2440", borderRadius: 10 },
  modeBtn: { flex: 1, border: "none", borderRadius: 7, background: "transparent", color: "#8e8aac", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.15s" },
  modeBtnActive: { background: "linear-gradient(135deg, #7c6af7 0%, #5b4de0 100%)", color: "#fff" },
  historyDelete: { background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#4e4b62", padding: "2px 6px" },
  historyInput: { fontSize: 12, color: "#9691b8", lineHeight: 1.5, marginBottom: 8 },
  historyUseBtn: { fontSize: 11, fontWeight: 600, color: "#7c6af7", background: "none", border: "1px solid #3a3060", borderRadius: 6, padding: "4px 10px", cursor: "pointer" },
  footerLinks: { display: "flex", justifyContent: "center", gap: 12, marginTop: 8, flexWrap: "wrap" },
  footerLink: { fontSize: 11, color: "#4e4b62", textDecoration: "none" },
  suggestedWrap: { marginTop: 12, marginBottom: 4 },
  suggestedToggle: { width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "#13111c", border: "1px solid #2a2440", borderRadius: 8, cursor: "pointer", color: "#6b6880", fontSize: 12, fontWeight: 600, marginBottom: 0 },
  suggestedLabel: { fontSize: 11, color: "#4e4b62", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 },
  suggestedList: { display: "flex", flexDirection: "column", gap: 6 },
  suggestedBtn: { display: "flex", alignItems: "flex-start", gap: 8, padding: "8px 12px", background: "#13111c", border: "1px solid #2a2440", borderRadius: 8, cursor: "pointer", color: "#9691b8", fontSize: 12, textAlign: "left", lineHeight: 1.4, transition: "all 0.15s" },
  nextStepsWrap: { marginTop: 8 },
  nextStepsToggle: { width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "#13111c", border: "1px solid #2a2440", borderRadius: 10, cursor: "pointer", color: "#7c6af7", fontSize: 13, fontWeight: 600 },
  nextStepsList: { background: "#13111c", border: "1px solid #2a2440", borderTop: "none", borderRadius: "0 0 10px 10px", padding: "8px 0" },
  nextStep: { padding: "12px 16px", borderBottom: "1px solid #1a1830" },
  nextStepHeader: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 },
  nextStepN: { fontSize: 16 },
  nextStepTitle: { fontSize: 11, fontWeight: 700, color: "#7c6af7", textTransform: "uppercase", letterSpacing: 0.8 },
  nextStepDesc: { fontSize: 13, color: "#b0accc", lineHeight: 1.65, marginBottom: 6 },
  nextStepLink: { display: "inline-block", marginTop: 6, padding: "6px 14px", background: "linear-gradient(135deg, #7c6af7 0%, #5b4de0 100%)", borderRadius: 6, color: "#fff", fontSize: 12, fontWeight: 600, textDecoration: "none" },
  nextStepDivider: { display: "flex", alignItems: "center", gap: 10, padding: "16px 16px 8px" },
  nextStepDividerLine: { flex: 1, height: 1, background: "#2a2440" },
  nextStepDividerText: { fontSize: 10, fontWeight: 700, color: "#7c6af7", textTransform: "uppercase", letterSpacing: 1, whiteSpace: "nowrap" },
  newQueryBtn: { padding: "10px 20px", background: "#1e1a35", border: "1px solid #3a3060", borderRadius: 8, color: "#9691b8", fontSize: 13, fontWeight: 600, cursor: "pointer", textAlign: "center", width: "100%" },
};

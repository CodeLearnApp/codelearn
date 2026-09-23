import { useState, useRef } from "react";

// ─────────────────────────────────────────────
// 🌍 UI TRANSLATIONS — add a new language here
// ─────────────────────────────────────────────
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
    generateBtn: (lang, icon) => `Generar en ${lang} ${icon}`,
    generating: "Generando...",
    codeTitle: (lang, icon) => `${icon} Código en ${lang}`,
    explainTitle: "¿Qué hace y por qué?",
    copy: "📋 Copiar código",
    copied: "✅ Copiado",
    error: "Hubo un error generando el código. Intentá de nuevo.",
    footer: "Aprendé programando — generado con IA • CodeLearn",
    uiLangLabel: "Idioma de la app",
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
    generateBtn: (lang, icon) => `Generate in ${lang} ${icon}`,
    generating: "Generating...",
    codeTitle: (lang, icon) => `${icon} Code in ${lang}`,
    explainTitle: "What does it do and why?",
    copy: "📋 Copy code",
    copied: "✅ Copied",
    error: "There was an error generating the code. Please try again.",
    footer: "Learn by coding — powered by AI • CodeLearn",
    uiLangLabel: "App language",
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
    generateBtn: (lang, icon) => `Gerar em ${lang} ${icon}`,
    generating: "Gerando...",
    codeTitle: (lang, icon) => `${icon} Código em ${lang}`,
    explainTitle: "O que faz e por quê?",
    copy: "📋 Copiar código",
    copied: "✅ Copiado",
    error: "Houve um erro ao gerar o código. Tente novamente.",
    footer: "Aprenda programando — gerado com IA • CodeLearn",
    uiLangLabel: "Idioma do app",
  },
  fr: {
    flag: "🇫🇷", label: "Français",
    tagline: "Décrivez → Apprenez → Copiez",
    intro: (lang) => `Décrivez dans votre langue ce que vous voulez que le programme fasse. Obtenez le code prêt à copier + une explication complète en <strong style="color:#7c6af7">${lang}</strong>.`,
    sectionLang: "Langage à apprendre",
    sectionInput: "Que doit faire votre programme ?",
    inputHint: "— écrivez-le comme si vous l'expliquiez à quelqu'un",
    placeholder: 'Ex : "Je veux une fonction qui reçoit une liste de nombres et retourne uniquement les pairs, triés du plus grand au plus petit"',
    ctrlHint: "Ctrl + Entrée pour générer",
    generateBtn: (lang, icon) => `Générer en ${lang} ${icon}`,
    generating: "Génération...",
    codeTitle: (lang, icon) => `${icon} Code en ${lang}`,
    explainTitle: "Que fait-il et pourquoi ?",
    copy: "📋 Copier le code",
    copied: "✅ Copié",
    error: "Une erreur s'est produite. Veuillez réessayer.",
    footer: "Apprenez en codant — généré par IA • CodeLearn",
    uiLangLabel: "Langue de l'app",
  },
  de: {
    flag: "🇩🇪", label: "Deutsch",
    tagline: "Beschreiben → Lernen → Kopieren",
    intro: (lang) => `Beschreiben Sie in Ihrer Sprache, was das Programm tun soll. Erhalten Sie den Code zum Kopieren + eine vollständige Erklärung in <strong style="color:#7c6af7">${lang}</strong>.`,
    sectionLang: "Programmiersprache zum Lernen",
    sectionInput: "Was soll Ihr Programm tun?",
    inputHint: "— schreiben Sie es, als würden Sie es jemandem erklären",
    placeholder: 'Z.B.: "Ich möchte eine Funktion, die eine Zahlenliste nimmt und nur die geraden zurückgibt, absteigend sortiert"',
    ctrlHint: "Strg + Eingabe zum Generieren",
    generateBtn: (lang, icon) => `In ${lang} generieren ${icon}`,
    generating: "Generiert...",
    codeTitle: (lang, icon) => `${icon} Code in ${lang}`,
    explainTitle: "Was macht es und warum?",
    copy: "📋 Code kopieren",
    copied: "✅ Kopiert",
    error: "Beim Generieren ist ein Fehler aufgetreten. Bitte erneut versuchen.",
    footer: "Lerne durch Programmieren — KI-gestützt • CodeLearn",
    uiLangLabel: "App-Sprache",
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
    generateBtn: (lang, icon) => `用 ${lang} 生成 ${icon}`,
    generating: "生成中...",
    codeTitle: (lang, icon) => `${icon} ${lang} 代码`,
    explainTitle: "它做什么？为什么这样写？",
    copy: "📋 复制代码",
    copied: "✅ 已复制",
    error: "生成代码时出错，请重试。",
    footer: "边编程边学习 — AI 驱动 • CodeLearn",
    uiLangLabel: "应用语言",
  },
};

// ─────────────────────────────────────────────
// 💻 PROGRAMMING LANGUAGES
// ─────────────────────────────────────────────
const PROG_LANGS = [
  { id: "python", label: "Python", icon: "🐍" },
  { id: "javascript", label: "JavaScript", icon: "🟨" },
  { id: "typescript", label: "TypeScript", icon: "🔷" },
  { id: "rust", label: "Rust", icon: "🦀" },
  { id: "go", label: "Go", icon: "🐹" },
  { id: "java", label: "Java", icon: "☕" },
  { id: "kotlin", label: "Kotlin", icon: "🎯" },
  { id: "swift", label: "Swift", icon: "🍎" },
  { id: "c", label: "C", icon: "⚙️" },
  { id: "cpp", label: "C++", icon: "➕" },
];

// ─────────────────────────────────────────────
// Components
// ─────────────────────────────────────────────
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

function LangSwitcher({ uiLang, setUiLang, t }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(o => !o)} style={styles.langSwitchBtn}>
        {UI_LANGS[uiLang].flag} {UI_LANGS[uiLang].label} ▾
      </button>
      {open && (
        <div style={styles.langDropdown}>
          <div style={styles.langDropdownLabel}>{t.uiLangLabel}</div>
          {Object.entries(UI_LANGS).map(([key, val]) => (
            <button
              key={key}
              onClick={() => { setUiLang(key); setOpen(false); }}
              style={{
                ...styles.langDropdownItem,
                ...(uiLang === key ? styles.langDropdownItemActive : {}),
              }}
            >
              {val.flag} {val.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Main App
// ─────────────────────────────────────────────
export default function App() {
  const [uiLang, setUiLang] = useState("es");
  const [progLang, setProgLang] = useState("python");
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const outputRef = useRef(null);

  const t = UI_LANGS[uiLang];
  const selectedProgLang = PROG_LANGS.find(l => l.id === progLang);

  const generate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);

    const uiLangName = UI_LANGS[uiLang].label;
    const prompt = `The user wants to learn ${selectedProgLang.label} by programming. They described the following in natural language (their UI language is ${uiLangName}, so write ALL explanations in ${uiLangName}):

"${input}"

Your task:
1. Generate the code in ${selectedProgLang.label} that solves exactly what they asked.
2. Explain the code in a didactic way for someone learning ${selectedProgLang.label}. Write the explanation in ${uiLangName}.

Respond ONLY in this JSON format, no extra text, no markdown backticks:
{
  "code": "the code here, properly escaped for JSON",
  "explanation": "the explanation here in ${uiLangName}. Use ## for section subtitles (e.g. ## What does this code do?), and - for bullet points. Explain line by line or concept by concept, the why behind each decision, and what language concepts are used."
}`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await response.json();
      const raw = data.content.map(b => b.text || "").join("");
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
      setTimeout(() => outputRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch (e) {
      setError(t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.root}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>{"</>"}</span>
            <div>
              <div style={styles.logoTitle}>CodeLearn</div>
              <div style={styles.logoSub}>{t.tagline}</div>
            </div>
          </div>
          <LangSwitcher uiLang={uiLang} setUiLang={(l) => { setUiLang(l); setResult(null); setError(null); }} t={t} />
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.intro}>
          <p style={styles.introText} dangerouslySetInnerHTML={{ __html: t.intro(selectedProgLang.label) }} />
        </div>

        <div style={styles.section}>
          <label style={styles.label}>{t.sectionLang}</label>
          <div style={styles.langGrid}>
            {PROG_LANGS.map(l => (
              <button
                key={l.id}
                onClick={() => setProgLang(l.id)}
                style={{ ...styles.progLangBtn, ...(progLang === l.id ? styles.progLangBtnActive : {}) }}
              >
                <span>{l.icon}</span>
                <span>{l.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={styles.section}>
          <label style={styles.label}>
            {t.sectionInput}
            <span style={styles.labelHint}> {t.inputHint}</span>
          </label>
          <textarea
            style={styles.textarea}
            placeholder={t.placeholder}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && e.ctrlKey) generate(); }}
            rows={4}
          />
          <div style={styles.inputFooter}>
            <span style={styles.hint}>{t.ctrlHint}</span>
            <button
              onClick={generate}
              disabled={loading || !input.trim()}
              style={{ ...styles.generateBtn, ...(loading || !input.trim() ? styles.generateBtnDisabled : {}) }}
            >
              {loading ? (
                <span style={styles.loadingInner}>
                  <span style={styles.spinner} />
                  {t.generating}
                </span>
              ) : t.generateBtn(selectedProgLang.label, selectedProgLang.icon)}
            </button>
          </div>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {result && (
          <div ref={outputRef} style={styles.resultWrap}>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <div style={styles.cardTitle}>{t.codeTitle(selectedProgLang.label, selectedProgLang.icon)}</div>
                <CopyButton text={result.code} t={t} />
              </div>
              <pre style={styles.codeBlock}><code>{result.code}</code></pre>
            </div>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <div style={styles.cardTitle}>📖 {t.explainTitle}</div>
                <span style={styles.badge}>{selectedProgLang.label}</span>
              </div>
              <ExplanationBlock explanation={result.explanation} />
            </div>
          </div>
        )}
      </main>

      <footer style={styles.footer}>{t.footer}</footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0f0f13; }
        @keyframes spin { to { transform: rotate(360deg); } }
        textarea:focus { outline: none; border-color: #7c6af7 !important; box-shadow: 0 0 0 3px rgba(124,106,247,0.15); }
        button:hover:not(:disabled) { opacity: 0.88; }
      `}</style>
    </div>
  );
}

const styles = {
  root: { minHeight: "100vh", background: "#0f0f13", color: "#e8e6f0", fontFamily: "'Inter', sans-serif", display: "flex", flexDirection: "column" },
  header: { borderBottom: "1px solid #1e1c2a", background: "#0d0c11", padding: "0 24px" },
  headerInner: { maxWidth: 800, margin: "0 auto", padding: "16px 0", display: "flex", alignItems: "center", justifyContent: "space-between" },
  logo: { display: "flex", alignItems: "center", gap: 14 },
  logoIcon: { fontSize: 26, fontFamily: "'IBM Plex Mono', monospace", color: "#7c6af7", fontWeight: 700 },
  logoTitle: { fontSize: 20, fontWeight: 700, color: "#f0eeff", letterSpacing: -0.5 },
  logoSub: { fontSize: 11, color: "#6b6880", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: 0.5 },
  langSwitchBtn: { fontSize: 13, fontWeight: 600, color: "#c4beff", background: "#1e1a35", border: "1px solid #3a3060", borderRadius: 8, padding: "8px 14px", cursor: "pointer", transition: "opacity 0.15s" },
  langDropdown: { position: "absolute", right: 0, top: "calc(100% + 8px)", background: "#1a1730", border: "1px solid #2a2440", borderRadius: 10, padding: "8px", zIndex: 100, minWidth: 160, boxShadow: "0 8px 32px rgba(0,0,0,0.5)" },
  langDropdownLabel: { fontSize: 10, fontWeight: 700, color: "#4e4b62", textTransform: "uppercase", letterSpacing: 1, padding: "4px 10px 10px" },
  langDropdownItem: { display: "block", width: "100%", textAlign: "left", padding: "8px 12px", borderRadius: 6, border: "none", background: "transparent", color: "#9691b8", fontSize: 13, cursor: "pointer", transition: "all 0.1s" },
  langDropdownItemActive: { background: "#2a2440", color: "#c4beff", fontWeight: 600 },
  main: { flex: 1, maxWidth: 800, margin: "0 auto", padding: "40px 24px", width: "100%" },
  intro: { marginBottom: 36, padding: "18px 22px", background: "linear-gradient(135deg, #1a1630 0%, #12101c 100%)", borderRadius: 12, border: "1px solid #2a2440" },
  introText: { fontSize: 15, color: "#b0accc", lineHeight: 1.65 },
  section: { marginBottom: 28 },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#9691b8", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 12 },
  labelHint: { fontWeight: 400, textTransform: "none", letterSpacing: 0, fontSize: 12, color: "#6b6880" },
  langGrid: { display: "flex", flexWrap: "wrap", gap: 8 },
  progLangBtn: { display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, border: "1px solid #2a2440", background: "#16141f", cursor: "pointer", color: "#8e8aac", fontSize: 13, fontWeight: 500, transition: "all 0.15s" },
  progLangBtnActive: { border: "1px solid #7c6af7", background: "#1e1a35", color: "#c4beff" },
  textarea: { width: "100%", background: "#13111c", border: "1px solid #2a2440", borderRadius: 10, color: "#e8e6f0", fontSize: 15, fontFamily: "'Inter', sans-serif", lineHeight: 1.6, padding: "14px 16px", resize: "vertical", transition: "border-color 0.2s, box-shadow 0.2s" },
  inputFooter: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 },
  hint: { fontSize: 12, color: "#4e4b62", fontFamily: "'IBM Plex Mono', monospace" },
  generateBtn: { padding: "11px 24px", background: "linear-gradient(135deg, #7c6af7 0%, #5b4de0 100%)", border: "none", borderRadius: 8, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "opacity 0.15s", letterSpacing: 0.2 },
  generateBtnDisabled: { opacity: 0.35, cursor: "not-allowed" },
  loadingInner: { display: "flex", alignItems: "center", gap: 8 },
  spinner: { width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" },
  error: { padding: "14px 18px", background: "#1f0e0e", border: "1px solid #4a1515", borderRadius: 10, color: "#f08080", fontSize: 14, marginBottom: 20 },
  resultWrap: { display: "flex", flexDirection: "column", gap: 20, marginTop: 8 },
  card: { background: "#13111c", border: "1px solid #2a2440", borderRadius: 12, overflow: "hidden" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: "1px solid #1e1c2a", background: "#0f0d18" },
  cardTitle: { fontSize: 14, fontWeight: 600, color: "#c4beff", display: "flex", alignItems: "center", gap: 8 },
  badge: { fontSize: 11, fontWeight: 600, color: "#7c6af7", background: "#1e1a35", border: "1px solid #3a3060", padding: "3px 10px", borderRadius: 20, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: 0.5 },
  copyBtn: { fontSize: 12, fontWeight: 600, color: "#9691b8", background: "#1e1c2a", border: "1px solid #2a2440", borderRadius: 6, padding: "6px 12px", cursor: "pointer", transition: "opacity 0.15s" },
  codeBlock: { padding: "20px", margin: 0, fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, lineHeight: 1.75, color: "#c8c2ff", overflowX: "auto", background: "transparent", whiteSpace: "pre-wrap", wordBreak: "break-word" },
  expBody: { padding: "20px" },
  expSubheading: { fontSize: 13, fontWeight: 700, color: "#7c6af7", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10, marginTop: 20 },
  expP: { fontSize: 14, color: "#b0accc", lineHeight: 1.75, marginBottom: 10 },
  expUl: { listStyle: "none", paddingLeft: 0, marginBottom: 10 },
  expLi: { fontSize: 14, color: "#b0accc", lineHeight: 1.7, paddingLeft: 4, marginBottom: 6 },
  footer: { textAlign: "center", padding: "20px", fontSize: 12, color: "#3a3750", borderTop: "1px solid #1a1830", fontFamily: "'IBM Plex Mono', monospace" },
};

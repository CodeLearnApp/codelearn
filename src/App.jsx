import { useState, useRef, useEffect } from "react";

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
    copy: "📋 Copiar",
    copied: "✅ Copiado",
    shareCode: "📤 Compartir código",
    shareExplanation: "📤 Compartir explicación",
    shared: "✅ Copiado para compartir",
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
    copy: "📋 Copy",
    copied: "✅ Copied",
    shareCode: "📤 Share code",
    shareExplanation: "📤 Share explanation",
    shared: "✅ Copied to share",
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
    copy: "📋 Copiar",
    copied: "✅ Copiado",
    shareCode: "📤 Compartilhar código",
    shareExplanation: "📤 Compartilhar explicação",
    shared: "✅ Copiado para compartilhar",
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
    placeholder: 'Ex : "Je veux une fonction qui reçoit une liste de nombres et retourne uniquement les pairs"',
    ctrlHint: "Ctrl + Entrée pour générer",
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
    copy: "📋 复制",
    copied: "✅ 已复制",
    shareCode: "📤 分享代码",
    shareExplanation: "📤 分享解释",
    shared: "✅ 已复制分享",
    error: "生成代码时出错，请重试。",
    footer: "边编程边学习 — AI 驱动 • CodeLearn",
    uiLangLabel: "应用语言",
  },
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

// Hook para detectar orientación
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
      try {
        await navigator.share({ text: shareText });
      } catch (e) {}
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

function ShareButton({ text, label, shared }) {
  const [done, setDone] = useState(false);
  const share = async () => {
    const msg = text + "\n\n— Generado con CodeLearn: codelearn.codes";
    if (navigator.share) {
      try { await navigator.share({ text: msg }); } catch(e) {}
    } else {
      navigator.clipboard.writeText(msg);
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    }
  };
  return (
    <button onClick={share} style={styles.shareBtn}>
      {done ? shared : label}
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

export default function App() {
  const [uiLang, setUiLang]     = useState("es");
  const [progLang, setProgLang] = useState("python");
  const [input, setInput]       = useState("");
  const [result, setResult]     = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const outputRef               = useRef(null);
  const isLandscape             = useOrientation();

  const t = UI_LANGS[uiLang];
  const selectedProgLang = PROG_LANGS.find(l => l.id === progLang);

  const generate = async () => {
    if (!input.trim()) return;
    setLoading(true); setResult(null); setError(null);
    const prompt = `The user wants to learn ${selectedProgLang.label}. UI language is ${UI_LANGS[uiLang].label}, write ALL explanations in ${UI_LANGS[uiLang].label}.
They described: "${input}"
Respond ONLY in this JSON (no backticks):
{"code":"...","explanation":"... use ## for section titles and - for bullet points"}`;
    try {
      const res  = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({ model: "claude-haiku-4-5-20251001", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }),
      });
      const data   = await res.json();
      const raw    = data.content.map(b => b.text || "").join("");
      const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
      setResult(parsed);
      setTimeout(() => outputRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch { setError(t.error); }
    finally  { setLoading(false); }
  };

  // Layout landscape: panel izquierdo (input) + panel derecho (resultado)
  const landscapeLayout = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    alignItems: "start",
  };

  return (
    <div style={styles.root}>
      {/* HEADER — compacto en landscape */}
      <header style={{ ...styles.header, padding: isLandscape ? "0 16px" : "0 20px" }}>
        <div style={{ ...styles.headerInner, padding: isLandscape ? "10px 0" : "16px 0" }}>
          <div style={styles.logo}>
            <span style={{ ...styles.logoIcon, fontSize: isLandscape ? 20 : 26 }}>{"</>"}</span>
            {!isLandscape && (
              <div>
                <div style={styles.logoTitle}>CodeLearn</div>
                <div style={styles.logoSub}>{t.tagline}</div>
              </div>
            )}
            {isLandscape && <div style={styles.logoTitle}>CodeLearn</div>}
          </div>
          <LangSwitcher uiLang={uiLang} setUiLang={(l) => { setUiLang(l); setResult(null); setError(null); }} t={t} />
        </div>
      </header>

      <main style={{ ...styles.main, padding: isLandscape ? "12px 16px" : "24px 20px" }}>

        {/* LANDSCAPE: grilla 2 columnas */}
        {isLandscape ? (
          <div style={landscapeLayout}>

            {/* COLUMNA IZQUIERDA — input */}
            <div>
              {/* Selector de lenguajes — horizontal scroll en landscape */}
              <div style={{ marginBottom: 12 }}>
                <label style={{ ...styles.label, fontSize: 11, marginBottom: 8 }}>{t.sectionLang}</label>
                <div style={styles.langGridLandscape}>
                  {PROG_LANGS.map(l => (
                    <button
                      key={l.id}
                      onClick={() => setProgLang(l.id)}
                      style={{ ...styles.progLangBtnLandscape, ...(progLang === l.id ? styles.progLangBtnActive : {}) }}
                    >
                      <span>{l.icon}</span>
                      <span style={{ fontSize: 11 }}>{l.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Textarea */}
              <div style={{ marginBottom: 10 }}>
                <label style={{ ...styles.label, fontSize: 11, marginBottom: 6 }}>
                  {t.sectionInput}
                </label>
                <textarea
                  style={{ ...styles.textarea, fontSize: 13, rows: 3 }}
                  placeholder={t.placeholder}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && e.ctrlKey) generate(); }}
                  rows={4}
                />
              </div>

              {/* Botón generar */}
              <button
                onClick={generate}
                disabled={loading || !input.trim()}
                style={{ ...styles.generateBtn, width: "100%", ...(loading || !input.trim() ? styles.generateBtnDisabled : {}) }}
              >
                {loading ? (
                  <span style={styles.loadingInner}>
                    <span style={styles.spinner} />{t.generating}
                  </span>
                ) : t.generateBtn(selectedProgLang.label, selectedProgLang.icon)}
              </button>

              {error && <div style={{ ...styles.error, marginTop: 10 }}>{error}</div>}
            </div>

            {/* COLUMNA DERECHA — resultado */}
            <div ref={outputRef}>
              {result ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={styles.card}>
                    <div style={styles.cardHeader}>
                      <div style={styles.cardTitle}>{t.codeTitle(selectedProgLang.label, selectedProgLang.icon)}</div>
                      <div style={styles.btnGroup}>
                        <CopyButton text={result.code} t={t} />
                        <ShareButton text={result.code} label={t.shareCode} shared={t.shared} />
                      </div>
                    </div>
                    <pre style={{ ...styles.codeBlock, fontSize: 12, maxHeight: "30vh", overflowY: "auto" }}>
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
                    <div style={{ maxHeight: "30vh", overflowY: "auto" }}>
                      <ExplanationBlock explanation={result.explanation} />
                    </div>
                  </div>
                </div>
              ) : (
                <div style={styles.emptyState}>
                  <div style={styles.emptyIcon}>{"</>"}</div>
                  <div style={styles.emptyText}>{t.tagline}</div>
                </div>
              )}
            </div>
          </div>

        ) : (
          /* PORTRAIT: layout original en columna */
          <div>
            <div style={{ ...styles.intro, marginBottom: 20, padding: "14px 16px" }}>
              <p style={styles.introText} dangerouslySetInnerHTML={{ __html: t.intro(selectedProgLang.label) }} />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={styles.label}>{t.sectionLang}</label>
              <div style={styles.langGrid}>
                {PROG_LANGS.map(l => (
                  <button
                    key={l.id}
                    onClick={() => setProgLang(l.id)}
                    style={{ ...styles.progLangBtn, ...(progLang === l.id ? styles.progLangBtnActive : {}) }}
                  >
                    <span>{l.icon}</span><span>{l.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
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
                    <span style={styles.loadingInner}><span style={styles.spinner} />{t.generating}</span>
                  ) : t.generateBtn(selectedProgLang.label, selectedProgLang.icon)}
                </button>
              </div>
            </div>

            {error && <div style={styles.error}>{error}</div>}

            {result && (
              <div ref={outputRef} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
          </div>
        )}
      </main>

      {!isLandscape && <footer style={styles.footer}>{t.footer}</footer>}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0f0f13; }
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
  shareBtn: { fontSize: 11, fontWeight: 600, color: "#7c6af7", background: "#1e1a35", border: "1px solid #3a3060", borderRadius: 6, padding: "5px 10px", cursor: "pointer" },
  emptyState: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", minHeight: 200, opacity: 0.25 },
  emptyIcon: { fontSize: 48, fontFamily: "'IBM Plex Mono', monospace", color: "#7c6af7", marginBottom: 12 },
  emptyText: { fontSize: 13, color: "#9691b8", fontFamily: "'IBM Plex Mono', monospace" },
};

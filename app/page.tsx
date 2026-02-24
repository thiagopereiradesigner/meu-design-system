"use client";

import { useState } from "react";

const COMPONENTS = [
  {
    name: "Design Tokens",
    description: "Cores, tipografia, espaçamento e sombras do sistema",
    category: "Fundação",
    file: "design-tokens.html",
    preview: "tokens",
  },
  {
    name: "Iconografia",
    description: "Biblioteca de ícones SVG usados nos componentes",
    category: "Fundação",
    file: "icons-demo.html",
    preview: "icons",
  },
  {
    name: "Button",
    description: "Variantes Primary, Secondary, Outline, Ghost e Filter",
    category: "Formulário",
    file: "button-demo.html",
    preview: "button",
  },
  {
    name: "Input",
    description: "Campo de texto com label, helper text e estados",
    category: "Formulário",
    file: "input-demo.html",
    preview: "input",
  },
  {
    name: "Select",
    description: "Lista suspensa com busca e seleção única ou múltipla",
    category: "Formulário",
    file: "select-demo.html",
    preview: "select",
  },
  {
    name: "Checkbox",
    description: "Seleção múltipla com estados checked, indeterminate e disabled",
    category: "Formulário",
    file: "checkbox-demo.html",
    preview: "checkbox",
  },
  {
    name: "Radio",
    description: "Botões de seleção única para opções exclusivas",
    category: "Formulário",
    file: "radio-demo.html",
    preview: "radio",
  },
  {
    name: "Switch",
    description: "Toggle para alternar entre estados on/off",
    category: "Formulário",
    file: "switch-demo.html",
    preview: "switch",
  },
  {
    name: "Textarea",
    description: "Campo de texto multilinhas com redimensionamento",
    category: "Formulário",
    file: "textarea-demo.html",
    preview: "textarea",
  },
  {
    name: "Date Picker",
    description: "Seletor de data com calendário e seleção de intervalo",
    category: "Formulário",
    file: "datepicker-demo.html",
    preview: "datepicker",
  },
  {
    name: "Table",
    description: "Tabelas responsivas com sorting e paginação",
    category: "Dados",
    file: "table-demo.html",
    preview: "table",
  },
  {
    name: "Toast",
    description: "Notificações temporárias de feedback ao usuário",
    category: "Feedback",
    file: "toast-demo-updated.html",
    preview: "toast",
  },
  {
    name: "Tab",
    description: "Navegação entre seções com variantes linha e pílula",
    category: "Navegação",
    file: "tab-demo.html",
    preview: "tab",
  },
];

const CATEGORIES = ["Todos", "Formulário", "Dados", "Feedback", "Navegação", "Fundação"];

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  "Formulário": { bg: "#E6F4ED", text: "#005A1A" },
  "Dados":      { bg: "#EFF6FF", text: "#1E40AF" },
  "Feedback":   { bg: "#FFF7ED", text: "#92400E" },
  "Navegação":  { bg: "#F5F3FF", text: "#5B21B6" },
  "Fundação":   { bg: "#F3F3F3", text: "#333333" },
};

function ComponentPreview({ type }: { type: string }) {
  const green = "#04843B";
  const light = "#E6F4ED";
  const border = "#E0E0E0";
  const muted = "#656976";
  const disabled = "#C6C6C6";

  const previews: Record<string, React.ReactNode> = {
    tokens: (
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        {["#04843B","#067647","#E6F4ED","#1A1A1A","#C6C6C6"].map((c) => (
          <div key={c} style={{ width: 22, height: 22, borderRadius: 4, background: c, border: `1px solid ${border}`, flexShrink: 0 }} />
        ))}
      </div>
    ),
    icons: (
      <div style={{ display: "flex", gap: 10, color: green }}>
        {[
          "M12 5V19M5 12H19",
          "M3 6h18M7 12h10M10 18h4",
          "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
        ].map((d, i) => (
          <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={d} />
          </svg>
        ))}
      </div>
    ),
    button: (
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ padding: "6px 14px", borderRadius: 9999, background: green, color: "#fff", fontSize: 12, fontWeight: 500 }}>Salvar</div>
        <div style={{ padding: "6px 14px", borderRadius: 9999, background: light, color: green, fontSize: 12, fontWeight: 500 }}>Cancelar</div>
      </div>
    ),
    input: (
      <div style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
        <div style={{ fontSize: 11, fontWeight: 500, color: "#333" }}>Nome</div>
        <div style={{ border: `1px solid ${border}`, borderRadius: 6, padding: "6px 10px", fontSize: 11, color: muted, background: "#fff" }}>
          Digite seu nome...
        </div>
      </div>
    ),
    select: (
      <div style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
        <div style={{ fontSize: 11, fontWeight: 500, color: "#333" }}>Status</div>
        <div style={{ border: `1px solid ${border}`, borderRadius: 6, padding: "6px 10px", fontSize: 11, color: "#333", background: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Ativo</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={muted} strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </div>
    ),
    checkbox: (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[{ label: "Opção A", checked: true }, { label: "Opção B", checked: false }].map(({ label, checked }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 16, height: 16, borderRadius: 3, border: `1.5px solid ${checked ? green : border}`, background: checked ? green : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </div>
            <span style={{ fontSize: 12, color: "#333" }}>{label}</span>
          </div>
        ))}
      </div>
    ),
    radio: (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[{ label: "Opção A", selected: true }, { label: "Opção B", selected: false }].map(({ label, selected }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 16, height: 16, borderRadius: "50%", border: `1.5px solid ${selected ? green : border}`, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {selected && <div style={{ width: 8, height: 8, borderRadius: "50%", background: green }} />}
            </div>
            <span style={{ fontSize: 12, color: "#333" }}>{label}</span>
          </div>
        ))}
      </div>
    ),
    switch: (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[{ label: "Ativado", on: true }, { label: "Desativado", on: false }].map(({ label, on }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 18, borderRadius: 9999, background: on ? green : "#C6C6C6", position: "relative", flexShrink: 0 }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: on ? 16 : 2, transition: "left .2s", boxShadow: "0 1px 3px rgba(0,0,0,.2)" }} />
            </div>
            <span style={{ fontSize: 12, color: "#333" }}>{label}</span>
          </div>
        ))}
      </div>
    ),
    textarea: (
      <div style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
        <div style={{ fontSize: 11, fontWeight: 500, color: "#333" }}>Observações</div>
        <div style={{ border: `1px solid ${border}`, borderRadius: 6, padding: "6px 10px", fontSize: 11, color: muted, background: "#fff", height: 52, alignItems: "flex-start" }}>
          Digite aqui...
        </div>
      </div>
    ),
    datepicker: (
      <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
        <div style={{ fontSize: 11, fontWeight: 500, color: "#333" }}>Data</div>
        <div style={{ border: `1px solid ${border}`, borderRadius: 6, padding: "6px 10px", fontSize: 11, display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff" }}>
          <span style={{ color: muted }}>dd/mm/aaaa</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        </div>
        <div style={{ border: `1px solid ${border}`, borderRadius: 6, overflow: "hidden" }}>
          <div style={{ background: "#F9F9F9", padding: "3px 6px", fontSize: 9, fontWeight: 600, color: "#333", textAlign: "center", borderBottom: `1px solid ${border}` }}>Fevereiro 2026</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 1, padding: 4 }}>
            {["D","S","T","Q","Q","S","S"].map((d, i) => (
              <div key={i} style={{ textAlign: "center", fontSize: 8, color: disabled }}>{d}</div>
            ))}
            {[...Array(6)].map((_, i) => <div key={`e${i}`} />)}
            {[10,11,12,13].map((d) => (
              <div key={d} style={{ textAlign: "center", fontSize: 9, borderRadius: 3, background: light, color: "#005A1A" }}>{d}</div>
            ))}
            <div style={{ textAlign: "center", fontSize: 9, borderRadius: 3, background: green, color: "#fff", fontWeight: 600 }}>14</div>
            {[15,16,17].map((d) => (
              <div key={d} style={{ textAlign: "center", fontSize: 9, color: "#333" }}>{d}</div>
            ))}
          </div>
        </div>
      </div>
    ),
    table: (
      <div style={{ width: "100%", fontSize: 11, border: `1px solid ${border}`, borderRadius: 6, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 60px", background: "#F9F9F9", padding: "5px 8px", fontWeight: 600, color: "#333", borderBottom: `1px solid ${border}` }}>
          <span>Nome</span><span>Status</span><span style={{ textAlign: "right" }}>Ação</span>
        </div>
        {[{ name: "Maria S.", status: "Ativo" }, { name: "João P.", status: "Inativo" }].map((row) => (
          <div key={row.name} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 60px", padding: "5px 8px", color: muted, borderBottom: `1px solid ${border}` }}>
            <span>{row.name}</span>
            <span style={{ color: row.status === "Ativo" ? green : "#999" }}>{row.status}</span>
            <span style={{ textAlign: "right", color: green, fontWeight: 500 }}>Ver</span>
          </div>
        ))}
      </div>
    ),
    toast: (
      <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
        <div style={{ background: green, color: "#fff", borderRadius: 8, padding: "8px 12px", fontSize: 12, display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          Salvo com sucesso!
        </div>
        <div style={{ background: "#FEF3C7", color: "#92400E", borderRadius: 8, padding: "8px 12px", fontSize: 12, display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          Atenção necessária
        </div>
      </div>
    ),
    tab: (
      <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
        <div style={{ display: "flex", borderBottom: `1px solid ${border}` }}>
          {["Visão geral", "Config.", "Inativo"].map((t, i) => (
            <div key={t} style={{ padding: "5px 10px", fontSize: 11, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? green : i === 2 ? disabled : muted, borderBottom: i === 0 ? `2px solid ${green}` : "2px solid transparent", marginBottom: -1 }}>{t}</div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 3, background: "#F3F3F3", borderRadius: 9999, padding: 3, width: "fit-content" }}>
          {["Todos", "Ativos", "Inativos"].map((t, i) => (
            <div key={t} style={{ padding: "3px 10px", borderRadius: 9999, fontSize: 10, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? green : muted, background: i === 0 ? "#fff" : "transparent", boxShadow: i === 0 ? "0 1px 3px rgba(0,0,0,.1)" : "none" }}>{t}</div>
          ))}
        </div>
      </div>
    ),
  };

  return (
    <div style={{
      background: "#F9F9F9",
      borderRadius: "8px 8px 0 0",
      height: 140,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px 20px",
      borderBottom: `1px solid ${border}`,
    }}>
      {previews[type] ?? (
        <span style={{ fontSize: 11, color: muted }}>Preview</span>
      )}
    </div>
  );
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filtered = COMPONENTS.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "Todos" || c.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#FFFFFF", fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <header style={{
        background: "#FFFFFF",
        borderBottom: "1px solid #E0E0E0",
        padding: "0 40px",
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "#04843B", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
              </svg>
            </div>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#005A1A" }}>Portal Empresa</span>
            <span style={{ fontSize: 13, color: "#C6C6C6", marginLeft: 2 }}>/</span>
            <span style={{ fontSize: 13, color: "#656976" }}>Design System</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <a href="../demos/index.html" style={{ fontSize: 12, color: "#04843B", fontWeight: 500, textDecoration: "none", padding: "6px 12px", border: "1px solid #E6F4ED", borderRadius: 8, background: "#E6F4ED", transition: "all .15s" }}>
              Ver portal completo →
            </a>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 40px 80px" }}>
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", background: "#E6F4ED", borderRadius: 9999, fontSize: 12, fontWeight: 500, color: "#005A1A", marginBottom: 16 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#04843B" }} />
            v1.0 — WCAG AA
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: "#005A1A", marginBottom: 12, lineHeight: 1.2 }}>
            Portal Empresa<br />Design System
          </h1>
          <p style={{ fontSize: 16, color: "#656976", maxWidth: 480, margin: "0 auto 32px" }}>
            Biblioteca de componentes, tokens e diretrizes para construir produtos consistentes e acessíveis.
          </p>

          {/* Stats */}
          <div style={{ display: "inline-flex", gap: 1, background: "#E0E0E0", borderRadius: 12, overflow: "hidden" }}>
            {[
              { value: COMPONENTS.length, label: "componentes" },
              { value: "9+", label: "tokens" },
              { value: "AA", label: "WCAG" },
            ].map(({ value, label }) => (
              <div key={label} style={{ background: "#fff", padding: "14px 28px", textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#04843B" }}>{value}</div>
                <div style={{ fontSize: 11, color: "#656976", marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Search + Filters */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ position: "relative", marginBottom: 16 }}>
            <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#999", pointerEvents: "none" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              type="text"
              placeholder="Buscar componentes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                maxWidth: 400,
                padding: "10px 14px 10px 40px",
                border: "1px solid #E0E0E0",
                borderRadius: 10,
                fontSize: 14,
                fontFamily: "inherit",
                outline: "none",
                transition: "border-color .15s",
                color: "#1A1A1A",
              }}
              onFocus={(e) => { e.target.style.borderColor = "#04843B"; e.target.style.boxShadow = "0 0 0 3px rgba(4,132,59,0.1)"; }}
              onBlur={(e) => { e.target.style.borderColor = "#E0E0E0"; e.target.style.boxShadow = "none"; }}
            />
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 9999,
                  border: "1px solid",
                  borderColor: activeCategory === cat ? "#04843B" : "#E0E0E0",
                  background: activeCategory === cat ? "#E6F4ED" : "#fff",
                  color: activeCategory === cat ? "#005A1A" : "#656976",
                  fontSize: 13,
                  fontWeight: activeCategory === cat ? 600 : 400,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all .15s",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#999" }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: "0 auto 12px", display: "block" }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <p style={{ fontSize: 15 }}>Nenhum componente encontrado para &ldquo;{search}&rdquo;</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 24,
          }}>
            {filtered.map((comp) => {
              const catStyle = CATEGORY_COLORS[comp.category] ?? { bg: "#F3F3F3", text: "#333" };
              return (
                <a
                  key={comp.name}
                  href={`../demos/${comp.file}`}
                  style={{
                    display: "block",
                    border: "1px solid #E0E0E0",
                    borderRadius: 12,
                    overflow: "hidden",
                    textDecoration: "none",
                    background: "#fff",
                    transition: "box-shadow .15s, transform .15s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 24px rgba(4,132,59,0.12)";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "none";
                  }}
                >
                  <ComponentPreview type={comp.preview} />
                  <div style={{ padding: "16px 20px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: "#1A1A1A" }}>{comp.name}</span>
                      <span style={{
                        fontSize: 10,
                        fontWeight: 600,
                        padding: "2px 8px",
                        borderRadius: 9999,
                        background: catStyle.bg,
                        color: catStyle.text,
                        flexShrink: 0,
                        marginLeft: 8,
                      }}>
                        {comp.category}
                      </span>
                    </div>
                    <p style={{ fontSize: 13, color: "#656976", lineHeight: 1.5 }}>{comp.description}</p>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #E0E0E0", padding: "24px 40px", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "#999" }}>
          Portal Empresa Design System — {COMPONENTS.length} componentes · Tokens · WCAG AA
        </p>
      </footer>
    </div>
  );
}

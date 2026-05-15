# ✏️ Sketchnote Visualizer

Bikablo-Stil Sketchnote-Generator mit KI. Erstellt aus Textbeschreibungen visuelle Sketchnotes mit Strichmännchen, Szenen-Illustrationen und visuellen Metaphern.

## Features

- **Geführter Modus** – Schritt-für-Schritt-Wizard
- **Freier Modus** – KI erkennt Struktur, Stimmung und Szenen automatisch
- **Zwei Darstellungsstile** – Strukturiert (Kästchen) oder Freie Skizze (Story-Flow)
- **14 Bikablo-Szenen** – Berg, Zielscheibe, Brücke, Leuchtturm, Strichmännchen...
- **5 Stimmungs-Paletten** – Farben passen sich dem Inhalt an
- **Export** – SVG, PNG, Projekt-JSON (speichern & laden)

## Architektur

```
Browser (Vite + React)  →  Cloudflare Pages Function  →  Anthropic API
                              /api/generate
                              (API-Key serverseitig)
```

Der API-Key bleibt auf dem Server – er wird nie an den Browser gesendet.

---

## Deployment: GitHub + Cloudflare Pages

### 1. GitHub Repo vorbereiten

```bash
git add .
git commit -m "feat: Sketchnote Visualizer"
git push
```

### 2. Cloudflare Pages verbinden

1. Öffne [Cloudflare Dashboard → Pages](https://dash.cloudflare.com/?to=/:account/pages)
2. **Create a project** → **Connect to Git**
3. Wähle dein GitHub-Repository
4. Build-Einstellungen:
   - **Framework preset:** None
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. **Save and Deploy**

### 3. API-Key als Secret setzen

1. Im Cloudflare Dashboard → dein Pages-Projekt → **Settings** → **Environment variables**
2. **Add variable:**
   - Name: `ANTHROPIC_API_KEY`
   - Value: dein Key (`sk-ant-...`)
   - **Encrypt** aktivieren
3. Für **Production** und **Preview** setzen
4. Re-deploy auslösen

### 4. Fertig!

Jeder `git push` deployed automatisch. URL: `https://dein-projekt.pages.dev`

---

## Lokale Entwicklung

```bash
npm install

# Mit Cloudflare Functions lokal (empfohlen)
echo "ANTHROPIC_API_KEY=sk-ant-..." > .dev.vars
npx wrangler pages dev -- npm run dev
```

`.dev.vars` ist in `.gitignore` – wird nicht gepusht.

---

## Projektstruktur

```
├── index.html
├── src/
│   ├── main.jsx
│   └── App.jsx
├── functions/
│   └── api/
│       └── generate.js     # Cloudflare Function (API-Proxy)
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## Kosten

- **Cloudflare Pages:** Kostenlos (100.000 Requests/Monat)
- **Anthropic API:** Pay-per-use (~$0.003-0.015 pro Sketchnote)

## Lizenz

MIT

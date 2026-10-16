# OpenZirndorf – Demo-Seite für Messestände

Präsentationsseite für den Stand von OpenZirndorf e.V. (zuerst: Herbstmarkt Zirndorf, 18. Oktober 2026).
Reines HTML/CSS/JS ohne Build-Schritt. Schriften, Bilder und QR-Codes liegen lokal, die Seite selbst läuft also auch ohne Netz.
Nur die eingebetteten Apps brauchen Internet.

## Bereiche

| Hash | Inhalt |
|------|--------|
| `#start` | Projekte: alle Apps als Kacheln, darunter dezent der Ausblick (Hilfenavigator) |
| `#verein` | Präsentation über den Verein, läuft automatisch (10 Folien) |
| `#mitmachen` | Workshop-Interesse, Beitritt, Webseite, jeweils mit QR-Code |
| `#app/<id>` | App eingebettet, mit „Zurück zur Übersicht“ und QR-Code zum Mitnehmen |

`handzettel.html`: A4-Handzettel mit allen QR-Codes zum Ausdrucken.

## Am Stand

```bash
python3 -m http.server 8000      # dann http://localhost:8000
# oder einfach index.html per Doppelklick öffnen
```

- **F** oder Knopf oben rechts: Vollbild. In der Präsentation: ← → blättern, Leertaste pausiert.
- **Stand-Modus** (Standard): Nach 90 s ohne Berührung springt die Seite in die Präsentation.
  In einer geöffneten App wird nach 4 min erst „Noch da?“ gefragt. Eine angehaltene Präsentation läuft nach 45 s weiter.
  Abschalten mit `index.html?kiosk=0`.
- Ideenbörse und Workshop-Formular verbieten das Einbetten (CSP/X-Frame-Options). Sie öffnen sich im neuen Tab oder per QR-Code.

## Inhalte ändern

- Projekte, Texte und Folien stehen oben in `assets/app.js` (`APPS`, `OUTLOOK`, `SLIDES`).
- Mitmachen-Texte, Preise und Stammtisch-Termin: `index.html`, `handzettel.html` und die Folien in `assets/app.js`.
- Neue QR-Codes: mit dem npm-Paket `qrcode` als SVG nach `assets/qr/<id>.svg` erzeugen.
- Screenshots der Apps: `assets/shots/<id>.jpg` (390×780 px Handy-Ansicht, Faktor 1,5).

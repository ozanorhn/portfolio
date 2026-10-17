# Strapi → n8n → GitHub Actions → ALL-INKL

## Warum?

Das Angular-Portfolio lädt die Artikel aus `/blog/artikel.json`, nicht zur Laufzeit aus dem CMS. `npm run build:prod` muss nach einer Strapi-Veröffentlichung erneut laufen. Dieser Workflow baut aus Strapi die Artikel, aktualisiert SEO/Sitemap und erzeugt das statische HTML mit Chrome, bevor der FTP-Upload beginnt.

## 1. GitHub-Secrets einrichten

Im Repository `ozanorhn/portfolio` unter **Settings → Secrets and variables → Actions** folgende **Repository secrets** hinterlegen:

- `STRAPI_TOKEN`: Read-only Strapi-API-Token mit `find`-Berechtigung für `article`. Ein bereits genutzter lokal gespeicherter Token kann verwendet werden; **nie in GitHub-Dateien oder Chat kopieren**.
- `FTP_SERVER`: Der von ALL-INKL vorgegebene FTP-Hostname **ohne** `ftp://` oder `ftps://`.
- `FTP_USERNAME`: FTP-Benutzername (ggf. separater Deploy-Benutzer).
- `FTP_PASSWORD`: FTP-Passwort.
- `FTP_SERVER_DIR`: Exaktes **FTP-relatives Zielverzeichnis** der Website, mit abschließendem `/`. Vor dem Aktivieren über FileZilla oder KAS prüfen; **kein geratenes Verzeichnis** verwenden.

Die **Repository variable** `ENABLE_FTP_DEPLOY` zunächst **nicht** anlegen oder auf `false` setzen. Nur nach bestätigtem Zielverzeichnis und erfolgreichem Test auf `true` stellen.

## 2. Build ohne Upload testen

GitHub → **Actions → Strapi-Blog auf ALL-INKL veroeffentlichen → Run workflow**.
Eingabe `deploy = false` lassen. Das führt den Strapi-Abruf, die Generierung, Angular-Build und das Chrome-Prerendering aus, **ohne FTP-Zugriff oder Upload**.

Prüfen, ob das Protokoll die erwartete Artikelzahl einschließlich des neuen Artikels anzeigt. Falls `STRAPI_TOKEN` fehlt oder ein Artikel nicht geliefert wird, bricht der Build ab.

## 3. Upload kontrolliert einschalten

Erst wenn der korrekte FTPS-Hostname, Zertifikat und das Zielverzeichnis geprüft wurden, Repository variable `ENABLE_FTP_DEPLOY = true` setzen. Dann einmal manuell mit `deploy = true` auslösen und die öffentliche Blogliste verifizieren. Die Aktion verwendet explizites FTPS (Port 21, Zertifikatsprüfung strict); sollte das mit dem ALL-INKL-Konto nicht gehen, **nicht** unverschlüsseltes FTP erzwingen, sondern Hosting-Konfiguration klären.

Der Upload ist eine **Website-Synchronisation**, nicht nur ein einzelner Artikel. Bestehende nicht von dieser Pipeline erzeugte Dateien im Webroot daher vor der ersten Nutzung sichern und die Ausschlussmuster überprüfen. `.htaccess` und `.well-known` sind ausgenommen; `dangerous-clean-slate` bleibt deaktiviert.

## 4. Strapi-Veröffentlichung über n8n auslösen

In **Strapi → Settings → Webhooks** einen Webhook mit **nur** `entry.publish` und der URL des (separat einzurichtenden) n8n-Webhook-Workflows anlegen. Dort einen geheimen Header konfigurieren und den n8n-Webhook mit Header-Authentifizierung absichern. Im Workflow nur Payloads mit `model == "article"` oder `uid == "api::article.article"` annehmen; **nicht auf jeden Content-Type reagieren**.

Der n8n-Workflow ruft `POST https://api.github.com/repos/ozanorhn/portfolio/dispatches` mit Body `{"event_type":"strapi-blog-published"}` auf. Er braucht dafür eine im n8n-Credential-Store verwaltete, eng begrenzte GitHub-Authentifizierung mit Recht zum Auslösen dieses Ereignisses. Keinen GitHub-Token im Node-Code hinterlegen.

GitHub verarbeitet `repository_dispatch` nur, wenn die Workflow-Datei bereits auf `main` vorhanden ist. Nach Freigabe des ersten FTPS-Deployments kann die automatische Veröffentlichung über den Strapi-Webhook aktiviert werden.

## 5. Fehlerbehandlung

Bei API-Fehlern, fehlendem `STRAPI_TOKEN`, leerem Abruf oder fehlenden bisherigen Live-Artikeln bricht das vorhandene Skript `scripts/blog-daten.mjs` ab. Kein Upload darf in diesem Fall erfolgen. Die GitHub-Actions-Protokolle enthalten die genaue Fehlerstelle.

Hinweis: Es existiert **kein** automatisches Deployment allein durch den Strapi-Button „Publish“. Ohne eingerichteten Strapi-Webhook/n8n und freigeschalteten FTP-Upload muss der neue Build manuell ausgeführt werden.

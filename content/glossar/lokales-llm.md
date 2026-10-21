---
{
  "status": "veroeffentlicht",
  "begriff": "Lokales LLM",
  "h1": "Lokales LLM: Definition, Vorteile und Grenzen",
  "thema": "ki_grundlagen",
  "alternativeNamen": [
    "Local LLM",
    "Open-Source-LLM",
    "Open-Weight-Modell"
  ],
  "kurzdefinition": "Ein lokales LLM ist ein Sprachmodell, das auf eigener Hardware läuft, etwa auf einem Rechner im Büro oder einem eigenen Server, statt über die Cloud eines Anbieters.",
  "seoTitel": "Lokales LLM: Vorteile, Grenzen & Einsatz",
  "seoBeschreibung": "Was ist ein lokales LLM? Ein Sprachmodell auf eigener Hardware. Mit Funktionsweise, Vergleich zur Cloud, Quantisierung und Betriebshinweisen.",
  "erstveroeffentlicht": "2026-10-14T09:00:00Z",
  "aktualisiert": "2026-10-21T09:00:00Z",
  "steckbriefAussagen": [
    "Ein lokales LLM besteht aus heruntergeladenen Modellgewichten und einer Laufzeitumgebung, die Anfragen im eigenen Netz beantwortet.",
    "Bei lokalem Betrieb verlassen Prompts und Daten das eigene Netzwerk nicht.",
    "Quantisierung speichert Modellgewichte mit geringerer Genauigkeit und senkt so den Speicherbedarf.",
    "Open-Weight-Modelle veröffentlichen ihre Gewichte, sind aber nicht automatisch Open Source; die Lizenz entscheidet über die Nutzung.",
    "Auch lokale Modelle brauchen Zugriffsschutz, feste Ausgabeformate und Prüfungen gegen Prompt Injection."
  ],
  "steckbriefFakten": [
    {
      "label": "Standardadresse von Ollama",
      "wert": "127.0.0.1, Port 11434 (Ollama FAQ)"
    },
    {
      "label": "Standard-Kontextfenster in Ollama",
      "wert": "4.096 Tokens (Ollama FAQ, Stand: Oktober 2026)"
    }
  ],
  "verwandteBegriffe": [
    "llm",
    "token",
    "fine-tuning"
  ],
  "verwandteArtikel": [],
  "verwandteProjekte": [],
  "quellen": [
    {
      "titel": "Ollama auf GitHub",
      "url": "https://github.com/ollama/ollama",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "Ollama Docs: FAQ",
      "url": "https://docs.ollama.com/faq",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "Ollama Docs: Structured Outputs",
      "url": "https://docs.ollama.com/capabilities/structured-outputs",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "Hugging Face Transformers Docs: Quantization Overview",
      "url": "https://huggingface.co/docs/transformers/main/en/quantization/overview",
      "abgerufen": "2026-10-14"
    },
    {
      "titel": "Ollama Docs: Generate embeddings (/api/embed)",
      "url": "https://docs.ollama.com/api/embed",
      "abgerufen": "2026-10-14"
    }
  ],
  "faq": [
    {
      "frage": "Was ist ein lokales LLM?",
      "antwort": "Ein lokales LLM ist ein Sprachmodell, das auf eigener Hardware läuft, etwa auf einem Rechner im Büro oder einem eigenen Server, statt über die Cloud eines Anbieters. Die Daten verlassen dabei das eigene Netzwerk nicht. Dafür eignen sich vor allem frei verfügbare Modelle, sogenannte Open-Weight-Modelle."
    },
    {
      "frage": "Lohnt sich ein lokales LLM für Unternehmen?",
      "antwort": "Ein lokales LLM lohnt sich, wenn besonders sensible Daten verarbeitet werden oder Vorgaben die Nutzung von Cloud-Diensten ausschließen. Dem stehen Kosten für leistungsfähige Hardware, Wartung und meist eine geringere Qualität als bei den stärksten Cloud-Modellen gegenüber. Für viele Fälle reicht ein Cloud-Modell mit passendem Vertrag zur Auftragsverarbeitung und Serverstandort in der EU."
    },
    {
      "frage": "Welche Hardware braucht ein lokales LLM?",
      "antwort": "Entscheidend ist vor allem der Grafikspeicher, denn das Modell muss möglichst vollständig hineinpassen. Kleinere Modelle laufen bereits auf gut ausgestatteten Laptops oder Rechnern mit viel Arbeitsspeicher, große Modelle brauchen eine oder mehrere leistungsstarke Grafikkarten. Durch Quantisierung, also eine verkleinerte Darstellung der Modellgewichte, sinkt der Speicherbedarf auf Kosten etwas geringerer Qualität."
    }
  ]
}
---

## Beispiel aus der Praxis

Szenario zur Veranschaulichung: Ein Unternehmen möchte eingehende Lieferscheine automatisch auslesen, darf die Dokumente aber nicht an einen Cloud-Dienst schicken. Ein [n8n](/glossar/n8n/)-Workflow nimmt die Dokumente entgegen, wandelt sie in Text um und schickt ihn an ein lokales LLM, das auf einem Server im eigenen Netz mit Ollama läuft.

Ollama nimmt dafür über das Feld format ein JSON-Schema entgegen und erzwingt damit die Struktur der Antwort (Ollama-Dokumentation, Structured Outputs). Das Modell liefert also Lieferant, Datum und Positionen in festen Feldern, die der Workflow prüft und in das Warenwirtschaftssystem schreibt. Bei fehlenden Pflichtfeldern geht das Dokument an einen Menschen zur Kontrolle.

Der Unterschied zu einer Cloud-Lösung liegt nicht im Ablauf, sondern im Ort der Verarbeitung. Ollama hält dazu fest: „Ollama runs locally. We don't see your prompts or data when you run locally“ (Ollama FAQ). Der Preis dafür sind eigene Hardware, eigener Betrieb und die Aufgabe, ein Modell zu finden, das die Extraktion zuverlässig genug erledigt.

## Wie funktioniert ein lokales LLM?

Ein lokales [LLM](/glossar/llm/) besteht aus zwei Teilen: den Modellgewichten, also einer großen Datei mit den trainierten Parametern, und einer Laufzeitumgebung, die das Modell lädt und Anfragen beantwortet. Die Gewichte werden einmal heruntergeladen, danach läuft die Verarbeitung ohne Verbindung zum Modellanbieter.

Die Laufzeitumgebung stellt meist eine Programmierschnittstelle bereit, über die andere Anwendungen das Modell ansprechen. Ollama bietet dafür eine REST-API, etwa den Endpunkt /api/chat, und bindet standardmäßig an 127.0.0.1 auf Port 11434 (Ollama-Dokumentation; Ollama FAQ). Damit ist der Dienst zunächst nur auf dem eigenen Rechner erreichbar.

Werkzeuge wie n8n, Chat-Oberflächen oder eigene Skripte schicken ihre Anfragen dann an diese lokale Adresse statt an die API eines Cloud-Anbieters. Für die Anwendung sieht ein lokales Modell deshalb oft ähnlich aus wie ein Cloud-Modell.

## Lokales LLM vs. Cloud-LLM: Was ist der Unterschied?

| Merkmal | Lokales LLM | Cloud-LLM |
| --- | --- | --- |
| Ort der Verarbeitung | Eigene Hardware im eigenen Netz | Rechenzentrum des Anbieters |
| Datenfluss | Daten verlassen das Netz nicht | Daten gehen an den Anbieter, geregelt per Vertrag |
| Kosten | Hardware, Strom, Betrieb | Nutzungsabhängige Gebühren |
| Modellauswahl | Frei verfügbare Modelle | Auch die proprietären Modelle der Anbieter |
| Wartung | Updates, Monitoring und Ausfallsicherheit selbst | Übernimmt der Anbieter |
| Skalierung | Begrenzt durch eigene Hardware | Weitgehend durch den Anbieter abgedeckt |

Die Entscheidung ist selten grundsätzlich. Viele Architekturen kombinieren beides: sensible Schritte lokal, allgemeine Aufgaben über eine Cloud-API.

Was beim datenschutzkonformen Einsatz eines Cloud-Modells zu beachten ist, zeigt der Artikel [Claude DSGVO-konform einsetzen](/blog/claude-dsgvo-konform-unternehmen/).

## Was sind Open-Weight-Modelle?

Open-Weight-Modelle sind Sprachmodelle, deren trainierte Gewichte veröffentlicht werden. Man kann sie herunterladen und selbst betreiben. Ollama nennt auf seiner Projektseite unter anderem Modellfamilien wie Gemma, Qwen, DeepSeek und gpt-oss (Ollama auf GitHub, Stand: Oktober 2026).

Open-Weight ist nicht automatisch Open Source. Oft sind nur die Gewichte frei, nicht aber Trainingsdaten oder Trainingscode, und die Lizenzen unterscheiden sich. Vor dem Einsatz im Unternehmen lohnt deshalb ein Blick in die Lizenz des jeweiligen Modells, besonders bei kommerzieller Nutzung.

## Was ist Quantisierung bei lokalen LLMs?

Quantisierung speichert die Gewichte eines Modells mit geringerer Genauigkeit. Hugging Face beschreibt sie als Verfahren, das den Speicherbedarf beim Laden und Nutzen eines Modells senkt und dabei möglichst viel Genauigkeit erhalten soll (Hugging Face, Quantization Overview).

Statt mit 32-Bit-Gleitkommazahlen werden die Gewichte dann etwa mit 16 Bit oder als Ganzzahlen mit 8 oder 4 Bit gespeichert (Hugging Face, Quantization Overview). Dadurch passt ein Modell auf Hardware, die für die volle Genauigkeit zu klein wäre.

Für lokale Modelle ist das Format GGUF verbreitet, das aus dem Projekt llama.cpp stammt (Hugging Face, Quantization Overview). Wie stark die Qualität sinkt, hängt von Modell, Verfahren und Aufgabe ab und sollte mit eigenen Beispielen geprüft werden.

## Was muss man beim Betrieb eines lokalen LLM beachten?

Lokal heißt nicht automatisch sicher. Wird die Programmierschnittstelle über das eigene Netz freigegeben, braucht sie dieselben Schutzmaßnahmen wie jeder andere interne Dienst: Zugriffskontrolle, verschlüsselte Verbindungen und Protokollierung. Der Standard von Ollama, nur an 127.0.0.1 zu binden, schränkt den Zugriff zunächst auf den eigenen Rechner ein (Ollama FAQ).

Ein zweiter Punkt ist das Kontextfenster. Ollama nutzt laut eigener Dokumentation standardmäßig ein Kontextfenster von 4.096 Tokens, das sich über OLLAMA_CONTEXT_LENGTH oder den Parameter num_ctx erhöhen lässt (Ollama FAQ, Stand: Oktober 2026). Lange Dokumente werden sonst unbemerkt abgeschnitten.

Auch lokale Modelle sind anfällig für [Prompt Injection](/glossar/prompt-injection/) und können falsche Angaben erzeugen. [Guardrails](/glossar/guardrails/), feste Ausgabeformate über [Structured Output](/glossar/structured-output/) und eine Freigabe per [Human-in-the-Loop](/glossar/human-in-the-loop/) gelten deshalb genauso wie in der Cloud.

## Für welche Aufgaben eignet sich ein lokales LLM?

Gut geeignet sind klar abgegrenzte Aufgaben mit sensiblen Daten: Informationen aus Dokumenten extrahieren, Texte zusammenfassen, Anfragen nach festen Kategorien einordnen. Hier zählt ein zuverlässiges Format mehr als breites Weltwissen.

Auch für Embeddings ist der lokale Betrieb eine Option. Ollama bietet mit /api/embed einen Endpunkt, der aus Text Vektoren erzeugt (Ollama-Dokumentation). Damit lässt sich die Suche eines [RAG](/glossar/rag/)-Systems betreiben, ohne Dokumente an einen Cloud-Dienst zu schicken; mehr dazu unter [Embeddings](/glossar/embeddings/).

Weniger geeignet sind Aufgaben, bei denen die stärksten verfügbaren Modelle einen deutlichen Unterschied machen, etwa lange Agentenläufe mit vielen Tools. Ob ein lokales Modell reicht, zeigt am verlässlichsten ein Vergleich mit echten Beispielen aus dem eigenen Prozess.

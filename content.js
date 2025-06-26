let selectedLang = "fr-FR";

console.log("mistral_voice_v20250626");
function createMicButton() {
  const button = document.createElement("button");

  // Création du SVG proprement avec namespace
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "18");
  svg.setAttribute("height", "18");
  svg.setAttribute("viewBox", "0 0 18 18");
  svg.setAttribute("fill", "none");
  svg.setAttribute("xmlns", svgNS);
  svg.setAttribute("aria-label", "");

  // Ajoute les paths à la main
  const path1 = document.createElementNS(svgNS, "path");
  path1.setAttribute("d", "M11.165 4.41699C11.165 3.22048 10.1955 2.25018 8.99902 2.25C7.80241 2.25 6.83203 3.22038 6.83203 4.41699V8.16699C6.83221 9.36346 7.80252 10.333 8.99902 10.333C10.1954 10.3328 11.1649 9.36335 11.165 8.16699V4.41699ZM12.665 8.16699C12.6649 10.1918 11.0238 11.8328 8.99902 11.833C6.97409 11.833 5.33221 10.1919 5.33203 8.16699V4.41699C5.33203 2.39195 6.97398 0.75 8.99902 0.75C11.0239 0.750176 12.665 2.39206 12.665 4.41699V8.16699Z");
  path1.setAttribute("fill", "currentColor");

  const path2 = document.createElementNS(svgNS, "path");
  path2.setAttribute("d", "M14.8058 9.11426C14.4089 8.99623 13.9915 9.22244 13.8732 9.61914C13.2481 11.7194 11.3018 13.25 9.00011 13.25C6.69845 13.25 4.75214 11.7194 4.12706 9.61914C4.00876 9.22245 3.59126 8.99626 3.19444 9.11426C2.79744 9.23241 2.57141 9.65085 2.68956 10.0479C3.43005 12.5353 5.60114 14.4067 8.25011 14.707V15.75H6.91612C6.50191 15.75 6.16612 16.0858 6.16612 16.5C6.16612 16.9142 6.50191 17.25 6.91612 17.25H11.0831L11.1593 17.2461C11.5376 17.2078 11.8331 16.8884 11.8331 16.5C11.8331 16.1116 11.5376 15.7922 11.1593 15.7539L11.0831 15.75H9.75011V14.707C12.3991 14.4066 14.5702 12.5353 15.3107 10.0479C15.4288 9.65085 15.2028 9.23241 14.8058 9.11426Z");
  path2.setAttribute("fill", "currentColor");

  svg.appendChild(path1);
  svg.appendChild(path2);

  // Badge de langue
  const langBadge = document.createElement("span");
  langBadge.id = "lang-indicator";
  langBadge.textContent = selectedLang === "fr-FR" ? "🇫🇷" : "🇺🇸";
  langBadge.style.marginLeft = "6px";
  langBadge.style.fontSize = "12px";

  // Style du bouton
  Object.assign(button.style, {
    backgroundColor: "#222225",
    border: "none",
    borderRadius: "6px",
    padding: "6px 10px",
    cursor: "pointer",
    position: "absolute",
    right: "10px",
    top: "5px",
    zIndex: "1000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s",
    color: "white"
  });

  // Hover effect
  button.addEventListener("mouseenter", () => {
    button.style.backgroundColor = "#3a3a3d";
  });
  button.addEventListener("mouseleave", () => {
    if (!button.classList.contains("active")) {
      button.style.backgroundColor = "#222225";
    }
  });

  // Toggle langue au clic droit
  button.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    selectedLang = selectedLang === "fr-FR" ? "en-US" : "fr-FR";
    // chrome.storage.sync.set({ lang: selectedLang });
    langBadge.textContent = selectedLang === "fr-FR" ? "🇫🇷" : "🇺🇸";
  });

  button.appendChild(svg);
  button.appendChild(langBadge);
  return button;
}

function initSpeechToText(textarea) {
  textarea.dataset.speechInjected = "true";
  let recognition;
  let isListening = false;
  let previousTranscript = '';

  const micButton = createMicButton();

  micButton.onclick = () => {
    if (!recognition) {
      recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = selectedLang;

      recognition.onresult = (event) => {
        const fullTranscript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        const newPart = fullTranscript.replace(previousTranscript, '');
        previousTranscript = fullTranscript;

        if (newPart.trim()) {
          const punctuated = injectPunctuation(newPart);
          textarea.textContent += punctuated;
          textarea.dispatchEvent(new Event('input', { bubbles: true }));
        }
      };

      recognition.onerror = (e) => {
        console.error("Speech recognition error", e);
      };
    }

    if (isListening) {
      recognition.stop();
      micButton.classList.remove("active");
      micButton.style.backgroundColor = "#222225";
    } else {
      previousTranscript = '';
      recognition.start();
      micButton.classList.add("active");
      micButton.style.backgroundColor = "#3a3a3d";
    }
    isListening = !isListening;
  };

  const wrapper = textarea.closest("div.py-2") || textarea.parentNode;

  wrapper.appendChild(micButton);
}

function injectPunctuation(transcript) {
  if (selectedLang.startsWith("fr")) {
    return transcript
      .replace(/\bvirgule\b/gi, ",")
      .replace(/\bpoint d'interrogation\b/gi, "?")
      .replace(/\bpoint d’exclamation\b/gi, "!")
      .replace(/\bpoint\b/gi, ".")
      .replace(/\bdeux points\b/gi, ":")
      .replace(/\bentre guillemets\b/gi, "\"")
      .replace(/\bparenthèse ouvrante\b/gi, "(")
      .replace(/\bparenthèse fermante\b/gi, ")");
  } else if (selectedLang.startsWith("en")) {
    return transcript
      .replace(/\bcomma\b/gi, ",")
      .replace(/\bquestion mark\b/gi, "?")
      .replace(/\bexclamation point\b/gi, "!")
      .replace(/\bperiod\b/gi, ".")
      .replace(/\bcolon\b/gi, ":")
      .replace(/\bquote\b/gi, "\"")
      .replace(/\bopen parenthesis\b/gi, "(")
      .replace(/\bclose parenthesis\b/gi, ")");
  }

  // fallback (no punctuation applied)
  return transcript;
}


// Find the target textarea by placeholder
function findTargetTextarea() {
  const textarea = document.querySelector("div.ProseMirror");
  console.log(textarea);
  console.log("textarea");
  if (textarea) {
    initSpeechToText(textarea);
  }
}

const soundOnSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
  <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" stroke-width="2" fill="none"></path>
  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" stroke-width="2" fill="none"></path>
</svg>`;

const soundOffSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
  <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
  <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2"></line>
  <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2"></line>
</svg>`;

function speak(text, lang = "fr-FR", onEnd) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;
  if (onEnd) {
    utterance.onend = onEnd;
  }
  speechSynthesis.speak(utterance);
}

function addTTSButtonToMessage(messageContainer) {
  if (messageContainer.dataset.ttsInjected) return;

  const contentDiv = messageContainer.querySelector(".prose");
  const textToRead = contentDiv?.innerText?.trim();
  const actionBar = messageContainer.querySelector("div.flex.min-h-8");
  const likeButton = actionBar?.querySelector('button[aria-label="Like"]');

  if (!contentDiv || !textToRead || !actionBar || !likeButton) return;

  const button = document.createElement("button");
  button.innerHTML = soundOnSVG;
  button.title = "Lire à voix haute";
  Object.assign(button.style, {
    height: "32px",
    width: "32px",
    padding: "6px",
    fontSize: "16px",
    borderRadius: "6px",
    backgroundColor: "#222225",
    color: "white",
    cursor: "pointer",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s"
  });

  let isSpeaking = false;

  button.addEventListener("mouseenter", () => {
    button.style.backgroundColor = "#3a3a3d";
  });

  button.addEventListener("mouseleave", () => {
    button.style.backgroundColor = "#222225";
  });

  button.addEventListener("click", () => {
    if (isSpeaking || speechSynthesis.speaking) {
      speechSynthesis.cancel();
      button.innerHTML = soundOnSVG;
      isSpeaking = false;
    } else {
      button.innerHTML = soundOffSVG;
      isSpeaking = true;
      speak(textToRead, selectedLang, () => {
        button.innerHTML = soundOnSVG;
        isSpeaking = false;
      });
    }
  });
  likeButton.parentNode.insertBefore(button, likeButton);
  messageContainer.dataset.ttsInjected = "true";
}


// Wait for DOM to load
window.addEventListener("load", () => {
  setTimeout(findTargetTextarea, 2000);
});

let mutationTimeout;


const observer = new MutationObserver(() => {
  // Réinitialise le timer à chaque mutation
  clearTimeout(mutationTimeout);

  mutationTimeout = setTimeout(() => {
    // --- Injection du bouton micro ---
    const textarea =
      document.querySelector("div.ProseMirror") ||
      document.querySelector("textarea[name='message.text']");
    if (textarea && !textarea.dataset.speechInjected) {
      textarea.dataset.speechInjected = "true";
      initSpeechToText(textarea);
    }

    // --- Injection des boutons TTS sur chaque réponse ---
    const messageContainers = document.querySelectorAll("div.flex.min-w-0.flex-1.flex-col");
    messageContainers.forEach((container) => {
      addTTSButtonToMessage(container);
    });
  }, 300); // délai d'attente après mutation
});

// Observer le body pour voir quand le textarea revient
observer.observe(document.body, {
  childList: true,
  subtree: true
});

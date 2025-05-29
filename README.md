# 🎙️ Mistral Voice – Talk to Le Chat from Mistral AI

**Mistral Voice** is a lightweight Chrome extension that brings voice interaction to [Le Chat from Mistral AI](https://chat.mistral.ai). It enables you to **speak your prompts** and **listen to responses**, just like in ChatGPT's voice mode.

---

## ✨ Features

- 🎤 **Speech-to-text**: Use your voice to dictate prompts in French or English
- 🔊 **Text-to-speech**: Click to hear AI responses read aloud
- 🌐 **Language toggle**: Switch between French and English input/output
- ⚡ Seamless UI integration with Mistral’s web interface
- 🧠 Lightweight and private – everything runs in your browser

---

## 🧪 Beta Notice

> Mistral Voice is currently in **beta** and optimized for **French** and **English**.

---

## 🛠 Installation (Manual)

1. Clone or download this repository
2. Go to `chrome://extensions/` in your browser
3. Enable **Developer Mode**
4. Click **"Load unpacked"**
5. Select the folder containing this extension

---

## 📁 File Structure

mistral-voice/
├── content.js # Injects speech/tts logic into Mistral's page
└── manifest.json # Chrome extension manifest


---

## 🔐 Privacy

Mistral Voice does **not collect**, store, or transmit any personal data. All voice recognition and synthesis is handled locally via the browser.

---

## ⚙️ Permissions Used

| Permission     | Reason                                                                 |
|----------------|------------------------------------------------------------------------|
| `activeTab`    | To inject voice features into the Mistral Chat page                    |
| `scripting`    | To dynamically modify page content (microphone/sound buttons)          |
| `host_permissions` | To run only on https://chat.mistral.ai                             |

---

## 🤝 Contributing

Pull requests and suggestions are welcome. Feel free to open issues for bugs or feature requests.

---

## 💬 Credits

- Uses the **Web Speech API** for voice recognition and synthesis
- Inspired by ChatGPT’s voice mode
- Built with ❤️ for [Le Chat from Mistral AI](https://chat.mistral.ai)




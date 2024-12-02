# Mistral Finetuning Web App

Integrate Mistral's Finetuning API in Next.js + Chakra UI demo.

## Table of Contents

- [💻 Takehome](#-takehome)
- [🎨 Features](#-features)
- [⚙️ Setup](#️-setup)
- [🔮 Run the App](#-run-the-app)
- [🚀 Improvements](#potential-improvements)

## 💻 Takehome

```
Goal: Build a demo to showcase Mistral's finetuning API endpoints.

Requirements:
- User should be able to upload files
- User should be able to use/select training files for finetuning
- Should show list of active finetuning jobs (should poll for status every 5 seconds if job is active)
- Smooth UX + responsive
```

## 🎨 Features
- Mistral Upload/Finetune API
- Next.js / Chakra UI / React-icons
- Fully responsive UI (mobile, tablet, computer).

## ⚙️ Setup

1. Install dependencies

```
npm install
```

2. Environment variables

You can find your Mistral API key [here](https://console.mistral.ai/api-keys/)!

Create a ```.env.local``` file.

```
MISTRAL_API_KEY=your_mistral_api_key
```

## 🔮 Run the App

To start the application, run:

```
npm run dev
```

<img src="/assets/demo.png" />

<br />

<img src="/assets/upload.png" />

## Potential Improvements

1. Terminal-like CLI for immediate feedback from finetuning jobs
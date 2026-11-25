<!-- styled:v2 -->
<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1d1726,50:167dfe,100:9533fa&height=180&section=header&text=Cotton%20Care%20AI&fontSize=46&fontColor=ffffff&fontAlignY=36&desc=Next.js%20%E2%80%A2%20TypeScript%20%E2%80%A2%20Tailwind%20CSS&descAlignY=58&descSize=16&animation=fadeIn" width="100%" alt="Cotton Care AI" />

**Detect cotton leaf diseases from a photo, get treatment advice from AI, and buy the right pesticide in one app. This is the Next.js frontend; the image model runs in [Cotton-Care-AI-Backend](https://github.com/samiullah156-creator/Cotton-Care-AI-Backend).**

<p>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Genkit-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Genkit" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white" alt="Firebase" />
</p>

<p>
  <a href="#features">Features</a> ·
  <a href="#tech-stack">Tech stack</a> ·
  <a href="#project-structure">Project structure</a> ·
  <a href="#getting-started">Getting started</a>
</p>

</div>

---

## Features

- Upload a cotton leaf photo and get the predicted disease from the TensorFlow backend
- AI flows (Genkit + Gemini) that summarise the disease, suggest treatment options and give planting tips
- Smart-commerce section with pesticide recommendations and an admin product form
- Sign up, login and route guards for authenticated pages
- Accessible UI built with shadcn/ui and Radix primitives

## Tech stack

- Next.js (App Router), React, TypeScript
- Tailwind CSS, shadcn/ui, Radix UI
- Google Genkit with Gemini for the AI flows
- Flask + TensorFlow backend for image classification

## Project structure

```
src/
  ai/flows/        summarize-disease-info, suggest-treatment-options, generate-planting-tips
  app/             pages: home, login, signup, admin, splash
  components/      auth guards, admin product form, UI kit
```

## Getting started

```bash
npm install
# add your Gemini key for the AI flows
echo "GOOGLE_GENAI_API_KEY=your-key" > .env.local
npm run dev
```

---

<div align="center">

**Built by [Ch Muhammad Samiullah](https://github.com/samiullah156-creator)** · AI Automation Engineer and Full-Stack Developer at [Lexvaxa](https://lexvaxa.com)

<a href="https://github.com/samiullah156-creator"><img src="https://img.shields.io/badge/More%20projects-181717?style=for-the-badge&logo=github&logoColor=white" alt="More projects" /></a>
<a href="https://lexvaxa.com/contact"><img src="https://img.shields.io/badge/Work%20with%20me-167dfe?style=for-the-badge&logo=googlecalendar&logoColor=white" alt="Work with me" /></a>
<a href="https://www.linkedin.com/in/sami-lexvaxa/"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>

<sub>⭐ Star this repo if you found it useful</sub>

</div>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:9533fa,50:167dfe,100:1d1726&height=110&section=footer" width="100%" alt="" />

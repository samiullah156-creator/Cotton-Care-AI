# Cotton Care AI

Detect cotton leaf diseases from a photo, get treatment advice from AI, and buy the right pesticide in one app. This is the Next.js frontend; the image model runs in [Cotton-Care-AI-Backend](https://github.com/samiullah156-creator/Cotton-Care-AI-Backend).

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) ![Genkit](https://img.shields.io/badge/Genkit-4285F4?style=for-the-badge&logo=google&logoColor=white) ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)

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

## Author

**Ch Muhammad Samiullah**, AI Automation Engineer and Full-Stack Developer.
[GitHub](https://github.com/samiullah156-creator) · [Lexvaxa](https://lexvaxa.com)

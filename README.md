# Application Tracker

A modern, interactive dashboard to track internship and job applications with ease.  
Built with React and enhanced with AI-powered job description parsing.

---

## Features

### Application Board
- Track applications across stages:
  - Applied
  - Interview
  - Offer
  - Rejected
- Drag & drop between stages
- Inline editing for quick updates
- Delete and archive functionality

---

### Smart Paste (AI Feature)
- Paste any job description
- Automatically extracts:
  - Company
  - Role
  - Location
  - Source
- Powered by Groq API via secure backend

---

### Search & Filters
- Search by company or role
- Filter by application status

---

### Vault (Archive System)
- Archive old applications
- Restore anytime

---

### Insights Page
- Visual overview of your job search progress
- Helps track performance and motivation

---

### UI/UX
- Clean, responsive design
- Subtle animations and hover effects
- Dark mode support
- Sticky footer layout

---

## Tech Stack

- **Frontend:** React (Vite)
- **State Management:** Custom Hooks
- **Drag & Drop:** @dnd-kit
- **Backend:** Netlify Functions
- **AI Integration:** Groq API
- **Deployment:** Netlify

---

## Environment Variables

Create a variable in Netlify:

```env
GROQ_API_KEY=your_api_key_here

⚠️ Do NOT expose API keys in frontend code.

---

## Project Structure

application-tracker/
├── netlify/functions/   # Serverless backend
│   └── groq.js
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── ...
├── public/
├── package.json

---

## Getting Started (Local)

# Clone repo
git clone https://github.com/your-username/application-tracker.git

# Install dependencies
npm install

# Run dev server
npm run dev
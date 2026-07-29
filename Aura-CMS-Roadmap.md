# 🗺️ Architecture Roadmap: Dynamic Portfolio & Aura CMS

## 📋 Overview
Transitioning the portfolio from static front-end components to a fully dynamic Content Management System (Aura CMS) powered by MongoDB and Vercel Serverless Functions.

---

## 🛠️ Stage 1: Database Schema Design (Data Modeling)
Define the strict data structures in MongoDB to serve the UI efficiently without layout shifts.
* **Global Settings:** Name, Bio, Job Title, Social Links, and CV URL.
* **Projects Collection:** Title, Description, Stack/Tags, Repo Link, Live Link, Image URL.
* **Skills Collection:** Skill Name, Icon Identifier, Category, Proficiency/Importance Level (for Bento grid sizing).
* **Certificates & Timeline:** Title, Issuer, Date, Verification Status, Image URL.

## ⚡ Stage 2: Seamless Data Fetching (Frontend Integration)
Implement high-performance data retrieval to maintain 60fps animations.
* **Caching Strategy:** Utilize `SWR` or `React Query` to cache API responses.
* **State Management:** Ensure data is fetched silently in the background to prevent loading spinners from disrupting the 3D and Glassmorphism effects.
* **Refactoring:** Replace all hardcoded data in `Projects.jsx`, `Skills.jsx`, and `Hero.jsx` with the fetched variables.

## 🔐 Stage 3: Admin Panel (Aura CMS) Setup
Build the secure backend dashboard for content management.
* **Protected Routing:** Create a hidden route (e.g., `/aura-dashboard`).
* **Authentication:** Implement JWT (JSON Web Tokens) to secure API endpoints. Only the authenticated admin can mutate data.
* **CRUD Interface:** Develop clean forms for Create, Read, Update, and Delete operations for all collections.
* **Logic Porting:** Add the specific verification logic to move training items to certificates automatically.

## 🖼️ Stage 4: Media Management Pipeline
Establish a scalable way to handle images for projects and certificates.
* **Current Strategy:** Continue utilizing optimized Direct Links (e.g., Google Drive or Imgur).
* **Scale-up Option:** Integrate a Cloudinary upload widget within the Admin Panel to automatically host and optimize uploaded images, storing only the secure URL in MongoDB.
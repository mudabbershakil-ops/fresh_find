<div align="center">

![Cover Illustration](cover.jpg)

<h1 style="color: #2E7D32; font-size: 3.5em; margin-bottom: 0;">FreshFind</h1>
<h2 style="color: #4CAF50; margin-top: 0;"><i>Fresh All Along</i></h2>

<br>

<div style="background-color: #E8F5E9; padding: 20px; border: 2px solid #2E7D32; border-radius: 10px; width: 80%; margin: 0 auto;">
  <h2 style="color: #2E7D32; margin: 0;">Software Requirements Specification</h2>
  <h3 style="color: #1B5E20; margin: 0;">Version 1.0</h3>
</div>

<br><br>

**Project Name:** FreshFind<br>
**Theme:** eGreen Basket<br>
**Category:** Web Innovation Unleashed<br>
**Institution:** Aptech Computer Education

<br><br>

### 👥 Team Members

| Student ID | Name | Role |
|:---:|:---|:---|
| **1696207** | Burhan Hussain | Project Lead & Frontend Developer |
| **1696208** | Yousuf | UI/UX & Theme Designer |
| **1696209** | Mudabber | JavaScript & Dynamic Logic Specialist |
| **1696210** | Saad | QA & Testing Specialist |
| **1696211** | Saboor | Technical Documentation Specialist |

</div>

<hr>
<br>

# Table of Contents

1. [1.1 Background and Necessity for the Website](#11-background-and-necessity-for-the-website)
2. [1.2 Proposed Solution](#12-proposed-solution)
3. [1.3 Purpose of the Document](#13-purpose-of-the-document)
4. [1.4 Scope of Project](#14-scope-of-project)
5. [1.5 Constraints](#15-constraints)
6. [1.6 Functional Requirements](#16-functional-requirements)
7. [1.7 Non-Functional Requirements](#17-non-functional-requirements)
8. [1.8 Interface Requirements](#18-interface-requirements)
9. [1.9 Project Deliverables](#19-project-deliverables)
10. [11.0 Key Code Implementation](#section-11-key-code-implementation-snippets)

<hr>
<br>

## 1.1 Background and Necessity for the Website

Farmers markets play an important role in connecting communities with the growers who put fresh, seasonal food on their tables.

However, information on market locations and timings is scattered across flyers, community boards, social media, and word of mouth, with no single reliable source for residents in a community or neighbourhood. This makes it difficult for residents to plan visits around the market's actual operating day and hours, or to know in advance what product is likely to be available that week.

There is a clear requirement for a simple, accessible, browser-based tool that consolidates this information into one place, helping residents discover nearby markets and make the most of seasonal, local produce.

<hr>

## 1.2 Proposed Solution

The proposed solution is to develop a Website called **'FreshFind'** that helps residents discover nearby farmers markets. The Website will be designed as a Client-Side Single Page Application (SPA).

The Website should display market locations, operating days and hours, and the types of produce typically available at each market. The platform includes an **AI chatbot** to answer frequently asked queries from visitors.

The Website is built purely with HTML5, CSS3, JavaScript (ReactJS), and related frontend technologies with no backend server. All market and produce data is presented using pre-populated JSON/text files, and the chatbot runs on pre-scripted logic rather than a live external AI service. 

This basic architecture keeps the platform lightweight, fast, and easy to deploy while providing a responsive and accessible experience across desktops, tablets, and mobile devices.

<hr>

## 1.3 Purpose of the Document

The purpose of this document is to define the functional, non-functional, and technical requirements for the **FreshFind** Website, including its goals, scope, features, constraints, and user expectations.

This document describes the objectives and features of the Website, its user interfaces, the functions it is expected to perform, and the constraints under which it must operate. It is intended to serve as a reference for both stakeholders and developers involved in designing, building, and maintaining the Website.

### 1.3.1 Who Can Use this Document?
Stakeholders (Technical and Non-Technical people associated with the project) and Developers of this portal.

<hr>

## 1.4 Scope of Project

The **'FreshFind'** project is designed to be a responsive browser-based Website that helps residents discover farmers' markets near them, and plan visits around what is likely to be in season.

It includes a searchable and filterable market directory, individual market detail pages showing location, operating days/hours, and typical products, a general produce guide, and seasonal recommendations section. It also includes an AI chatbot to help visitors find answers to common queries.

The platform is fully responsive, ensuring compatibility across desktops, tablets, and mobile devices. It is suitable for residents planning market visits, community organizations promoting local farmers, and vendors looking to expand their digital footprint.

### Sample Site Map
**Landing Page – This Page includes the following sections:**
* **Core sections:** Find a Market, Market Directory, Produce Guide, Chatbot, Contact Us, About Us
  * Upon selecting a market from the directory, the respective market detail page should be displayed, showing its location, schedule, and typical produce.
* Additionally, features such as Search/Find a Market, Bookmarks, and the chatbot are cross-page which means they remain accessible from each page.

<hr>

## 1.5 Constraints

| Area | Constraint Description |
|:---|:---|
| **Data Storage** | The Website does not have any facility to store information on a backend server. Information is fetched from JSON files and users can view the same being displayed; however, information cannot be written to the files from within the portal. |
| **Chatbot AI** | The chatbot does not connect to a live external AI service or backend; it runs on a static, pre-scripted dataset and rule-based logic loaded from `faq.json`. |
| **Session State** | All user interactions (Bookmarks, Saved notes, User Session) are strictly stored in browser `localStorage`. |

<hr>

## 1.6 Functional Requirements

The portal is designed as a responsive Website with a set of pages and menus that represent the choice of activities to be performed. Pages, menus, and other visual elements are designed in a visually appealing manner with attractive fonts, colors, and animations.

> **Note:** For several of these options, information is retrieved from a pre-populated JSON file and displayed using ReactJS components, hooks, and context features.

### Menu and Web Page Functionality

#### 🏠 Home Page
* **Display Elements:** Platform logo, heading, and introductory text.
* **Quick Find:** A prominent 'Find a Market Near You' search/filter prompt (by area, day of week, or produce type).
* **Highlights:** A featured/rotating showcase of nearby or currently open markets and this week's seasonal picks.
* **Chatbot Launcher:** A floating chatbot icon accessible from the home page and all subsequent pages.

#### 📍 Market Directory
* **Functionality:** Displays a catalog of farmers markets loaded from JSON files.
* **Each market card includes:** Market name, area/location, operating days and hours, a short description, and a thumbnail image.
* **Filtering:** Filterable by area/neighborhood, day of the week, and produce type available.
* **Sorting:** Sortable alphabetically, by proximity, or by next open day.

#### 🏪 Market Detail Page
* **Location Details:** Address, area/neighborhood, and an embedded interactive Leaflet map showing the market location.
* **Schedule:** Operating days and hours, clearly displayed as a weekly schedule table.
* **Product Available:** A list or grid of items typically available at this market, with icons/images.

#### 🥬 Produce Guide
* **Functionality:** A browsable catalogue of product types, each with a description, typical season, and the markets where it can be found.
* **Filtering:** Filterable by product category (fruits, vegetables, herbs, dairy).
* **Data Source:** Loaded from a pre-populated JSON file linking produce items to markets and seasons.

#### 🤖 AI Chatbot
* **Functionality:** A floating chatbot widget available across the site that helps visitors find answers to common queries.
* **Data Source:** Chatbot responses are generated from a static, pre-scripted dataset of questions and answers; no live external AI service or backend is used.
* **Interaction:** Visitors can type a question or select from suggested quick reply prompts; the chatbot responds and links to the relevant market or produce page.

#### 🔖 Content Bookmarking System
* **Favorite markets and product guide entries**
* **Personal notes** attached to bookmarked content (session-persistent via localStorage)
* **Export bookmarks** as a formatted list
* **Share recommendations** via social links

#### 🌐 Additional User Interface Features
* **Contact Us:** Static contact information, with a map showing live location.
* **About Us:** Static information about the team and the platform mission.
* **Visitor Counter:** Simulated real-time visitor counter using JavaScript.
* **Real-Time Clock:** A real-time engine used to highlight markets open 'right now'.
* **Hover Effects:** Hover effects and animated transitions for an interactive feel.
* **Breadcrumb Navigation:** Breadcrumb navigation for better UX across directory and detail pages.
* **Dummy Login/Signup:** Non-functional login/signup buttons included for design continuity.

<hr>

## 1.7 Non-Functional Requirements

There are several non-functional requirements that are fulfilled by the Website. The Website is:

* **Safe to use:** The Website does not result in any malicious downloads or unnecessary file downloads.
* **Accessible:** The Website is usable by people with visual or motor impairments, through sufficient contrast, legible text, and semantic HTML structure.
* **User-friendly:** The Website is quick and intuitive to use, with a clear layout and logical navigation.
* **Operability:** The Website operates in a reliably efficient manner.
* **Performance:** The Website demonstrates a high value of performance through speed and throughput — it is fast to load, and page redirection is instantaneous (SPA).
* **Capacity:** The static architecture allows the Website to support a large number of concurrent users.
* **Availability:** The Website is available 24/7 with minimum downtime (deployable on high-availability static hosts like GitHub Pages or Netlify).
* **Compatibility:** The Website is compatible with all latest browsers (Chrome, Firefox, Safari, Edge).

<hr>

## 1.8 Interface Requirements

### Technology Stack & Hardware

**Hardware:**
* Intel Core i5/i7 Processor or higher
* 8 GB RAM or higher
* Color SVGA 
* 500 GB Hard Disk space
* Mouse & Keyboard

**Software:**
* **IDE:** Visual Studio Code
* **Frontend:** HTML5, CSS3, JavaScript (ES6+), ReactJS (v19), TailwindCSS (v4), and Lucide React Icons.
* **AI and Development Tools:** Figma AI, Canva Magic, Gemini, and ChatGPT for UI design inspiration, code assistance, image generation, and FAQ/content generation.
* **Data Store:** JSON files (`markets.json`, `produce.json`, `faq.json`) and `localStorage` for session data.

> **📌 Important Note Regarding AI Usage:** 
> AI-generated suggestions were used for guidance, learning, and improving productivity. However, the final solution demonstrates the team's own effort, logic, and implementation. All AI tools used (Gemini, ChatGPT, Canva) are acknowledged. The chatbot itself relies entirely on a custom JavaScript rule-based engine, not a live AI API, strictly adhering to competition rules.

<hr>

## 1.9 Project Deliverables

The FreshFind team has designed, built, and submitted the project along with this complete project report that includes:

* **Problem Definition** (Section 1.1)
* **Design Specifications** (Section 1.6 & 1.8)
* **Test Data Used** (JSON Datasets provided in `src/data/`)
* **Project Installation Instructions** (See below)
* **Source Code Zip File** (Containing the entire React/Vite project)
* **Demonstration Video** (.mp4 file demonstrating all functionalities)

### Project Installation Instructions (Mandatory)

1. **Extract the Source Code:** Unzip the provided project folder.
2. **Install Dependencies:** Open a terminal in the root folder and run:
   ```bash
   npm install
   ```
3. **Run the Application Locally:** Start the development server by running:
   ```bash
   npm run dev
   ```
4. **Access the Website:** Open your web browser and navigate to `http://localhost:5173`.
5. **Build for Production:** To generate a static production build, run:
   ```bash
   npm run build
   ```
   The output will be generated in the `dist/` directory, ready to be hosted on any static web server.

<hr>

<br><br>
<div align="center">
  <b>~~~ End of Document ~~~</b><br><br>
  © Aptech Limited | TechWiz 7
</div>

---
<br>

## SECTION 11: KEY CODE IMPLEMENTATION (SNIPPETS)

The following snippets highlight the core logic of FreshFind. They demonstrate the SPA routing, the dynamic state management, and the simulated real-time interactivity.

### 11.1 Main Application Architecture (`App.jsx`)
This snippet demonstrates the client-side routing and global context providers.

```jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SavedProvider } from './context/SavedContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FieldGuideChatbot from './components/FieldGuideChatbot';
import Home from './pages/Home';
import MarketsDirectory from './pages/MarketsDirectory';

var App = function() {
  return (
    <SavedProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-[#F7F5ED]">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/markets" element={<MarketsDirectory />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <FieldGuideChatbot />
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </SavedProvider>
  );
}

export default App;
```

### 11.2 Real-Time Visitor Simulation (`VisitorCounter.jsx`)
This component uses React hooks and `localStorage` to simulate an active user base, creating a sense of community engagement.

```jsx
import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

var STORAGE_KEY = 'freshfind_visitor_count';
var BASE_COUNT = 1842;

var VisitorCounter = function(props) {
  var variant = props.variant || 'ticker';
  
  const [cnt1, setCnt1] = useState(() => {
    var stored = localStorage.getItem(STORAGE_KEY);
    return stored ? parseInt(stored, 10) : BASE_COUNT;
  });

  useEffect(() => {
    var getTym = () => Math.floor(Math.random() * (30000 - 15000 + 1)) + 15000;
    let tmr;
    
    var doTick = () => {
      tmr = setTimeout(() => {
        setCnt1((prev) => {
          var val1 = prev + 1;
          localStorage.setItem(STORAGE_KEY, val1.toString());
          return val1;
        });
        doTick();
      }, getTym());
    };
    
    doTick();
    return () => clearTimeout(tmr);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <Users className="w-4 h-4 text-green-700" />
      <span className="font-bold">{cnt1.toLocaleString()}</span>
    </div>
  );
}

export default VisitorCounter;
```

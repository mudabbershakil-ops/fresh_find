================================================================================
                      🌿 FRESHFIND - TECHWIZ 7 🌿
           Local Farmers' Market Field Guide & Directory
                         "Fresh All Along"
================================================================================

Competition: TechWiz 7 - The World Tech Championship
Category   : Web Innovation Unleashed
Theme      : eGreen Basket
Platform   : Client-Side Single Page Application (SPA)
Version    : 1.0 (Final Submission)

--------------------------------------------------------------------------------
TEAM MEMBERS & ROLES
--------------------------------------------------------------------------------
1. Burhan Hussain (Student ID: 1696207) - Project Lead & Frontend Developer
2. Yousuf        (Student ID: 1696208) - UI/UX & Theme Designer
3. Mudabber      (Student ID: 1696209) - JavaScript & Dynamic Logic Specialist
4. Saad          (Student ID: 1696210) - QA & Testing Specialist
5. Saboor        (Student ID: 1696211) - Technical Documentation Specialist

================================================================================
1. PREREQUISITES & SYSTEM REQUIREMENTS
================================================================================
Before running the application, make sure you have the following installed:

1. Node.js (Version 18.0.0 or higher recommended)
   - Download from: https://nodejs.org/
   - Check version in terminal: node -v
2. npm (Version 9.0.0 or higher, comes bundled with Node.js)
   - Check version in terminal: npm -v
3. Modern Web Browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari)
4. Code Editor (Optional, recommended): Visual Studio Code

================================================================================
2. STEP-BY-STEP INSTRUCTIONS TO RUN THE PROJECT
================================================================================

----------------------------------------------------
STEP 1: Open Terminal / Command Prompt in Project Folder
----------------------------------------------------
- Open the "Fresh Find" folder.
- In the address bar at the top of File Explorer, type "cmd" or "powershell" 
  and press ENTER.
  OR
- Open VS Code, go to: File > Open Folder > Select "Fresh Find" folder, 
  and press (Ctrl + `) to open the integrated terminal.

----------------------------------------------------
STEP 2: Install Project Dependencies
----------------------------------------------------
Run the following command to download and install all required packages:

    npm install

(Note: If the 'node_modules' folder already exists, this step takes only a few
seconds. If downloading fresh, please wait 1 to 2 minutes.)

----------------------------------------------------
STEP 3: Start the Development Server
----------------------------------------------------
Execute the following command:

    npm run dev

Once the server compiles, you will see output similar to:

    VITE v6.4.3  ready in 350 ms

    ➜  Local:   http://localhost:5173/
    ➜  Network: use --host to expose

----------------------------------------------------
STEP 4: Open in Web Browser
----------------------------------------------------
- Hold Ctrl and click the link: http://localhost:5173/
  OR
- Manually open your web browser and type: http://localhost:5173/
- Press Enter. FreshFind will load instantly!

----------------------------------------------------
STEP 5: Stopping the Server
----------------------------------------------------
- To stop the local server at any time, go to the terminal window and 
  press: Ctrl + C
- Type 'y' and press Enter to confirm.

================================================================================
3. PRODUCTION BUILD & DEPLOYMENT PREVIEW (OPTIONAL)
================================================================================
If you want to test the optimized production build:

1. Create production bundle:
       npm run build

   (This compiles and minifies all assets into a clean 'dist' folder)

2. Preview the production build locally:
       npm run preview

3. Open the preview URL displayed in your terminal (usually http://localhost:4173).

================================================================================
4. KEY FEATURES & HIGHLIGHTS OF FRESHFIND
================================================================================
* 🗺️ Interactive Split-View Map:
  Explore farmers' markets pinned on an interactive Leaflet map synced with 
  market cards and schedules.

* 🥬 Seasonal Produce Matrix:
  Discover local seasonal fruits, vegetables, herbs, and dairy with origin 
  traceability, flavor profiles, and market availability dossiers.

* 🤖 Rule-Based Field Guide AI Chatbot:
  Floating virtual assistant powered by rule-based keyword matching that 
  accurately answers questions on operating hours, locations, and seasons.

* 🔍 Real-Time Global Search:
  Type-ahead live autocomplete search bar in the header querying both markets 
  and produce simultaneously.

* 👥 Simulated Live Visitor Counter:
  Realistic traffic counter simulating active community shoppers with 
  localStorage persistence and real-time auto-increment jitter.

* 🔖 Bookmarking & Personal Notes:
  Save favourite markets and produce with personal notes stored securely in 
  browser localStorage across sessions.

* 👤 Simulated Authentication:
  Sign in / Join community modal simulating patron guest sessions.

* 📱 100% Mobile & Tablet Responsive:
  Custom collapsible drawer, responsive grid layouts, and smooth animations.

================================================================================
5. PROJECT FOLDER STRUCTURE
================================================================================
Fresh Find/
│
├── README.txt                       <-- This instructions file
├── PROJECT_DOCUMENTATION.md         <-- Complete TechWiz 7 documentation report
├── FreshFind_Documentation.docx     <-- Word (.docx) documentation format
├── FreshFind_Documentation_With_Code.html <-- Styled HTML documentation format
│
├── index.html                       <-- Application HTML entry point
├── package.json                     <-- Dependencies & script commands
├── vite.config.js                   <-- Vite build configuration
│
├── public/                          <-- Static public assets (Favicon, SVGs)
│
└── src/                             <-- Application source code
    ├── main.jsx                     <-- React DOM root mount
    ├── App.jsx                      <-- Top-level routes & providers
    ├── index.css                    <-- Global styles & Tailwind design tokens
    │
    ├── components/                  <-- Reusable UI components
    │   ├── Navbar.jsx               <-- Sticky navigation with search & auth
    │   ├── Footer.jsx               <-- Footer with links & visitor counter
    │   ├── MarketMap.jsx            <-- Leaflet interactive map
    │   ├── FieldGuideChatbot.jsx    <-- Rule-based chatbot popup
    │   ├── GlobalSearch.jsx         <-- Real-time header search dropdown
    │   ├── VisitorCounter.jsx       <-- Animated visitor counter
    │   ├── AuthModal.jsx            <-- Simulated sign-in/up dialog
    │   ├── Toast.jsx                <-- Notification toast messages
    │   └── ScrollToTop.jsx          <-- Auto scroll to top on navigation
    │
    ├── context/                     <-- React Context State
    │   ├── SavedContext.jsx         <-- Bookmarked markets & produce
    │   └── AuthContext.jsx          <-- User session management
    │
    ├── data/                        <-- Static JSON data stores
    │   ├── markets.json             <-- Farmers' markets dataset
    │   ├── produce.json             <-- Seasonal produce dataset
    │   └── faq.json                 <-- Chatbot rules & FAQ intents
    │
    ├── pages/                       <-- Routed views
    │   ├── Home.jsx                 <-- Editorial landing page
    │   ├── MarketsDirectory.jsx     <-- Market catalog & map view
    │   ├── MarketDetail.jsx         <-- Detailed market profile
    │   ├── SeasonalProduce.jsx      <-- Produce encyclopaedia
    │   ├── SavedItems.jsx           <-- User bookmarks dashboard
    │   ├── About.jsx                <-- Mission & team information
    │   └── Contact.jsx              <-- Contact & feedback page
    │
    └── utils/
        └── marketSchedule.js        <-- Real-time open/closed status logic

================================================================================
6. TROUBLESHOOTING & COMMON QUESTIONS
================================================================================

Q1: PowerShell shows "running scripts is disabled on this system"?
A1: Run command prompt (cmd) instead of PowerShell, OR run:
    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
    and then run: npm run dev

Q2: Port 5173 is already in use?
A2: Vite will automatically offer the next available port (e.g., http://localhost:5174).
    Simply open the URL printed in your terminal.

Q3: Changes are not updating in browser?
A3: Vite has Hot Module Replacement (HMR). If it does not refresh automatically,
    do a hard refresh in your browser with (Ctrl + Shift + R) or (Ctrl + F5).

================================================================================
                            🌿 FRESHFIND 🌿
                     "Fresh All Along - Every Day"
================================================================================

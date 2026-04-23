# 💻 DevLog TIL — Coding TIL Board

A responsive blog platform where developers share what they learned today in React, CSS, Git, JavaScript, Blockchain, and tech generally.

Built with **React + Vite**, **React Router v6**, **Context API**, and **plain CSS**. No backend — all data is stored in `localStorage`.


## Getting Started
 
### 1. Clone the repository
 
```bash
git clone https://github.com/Alike001/devlog-til-blog.git
```

### 2. Enter the project folder
 
```bash
cd devlog-til
```
 
### 3. Install dependencies
 
```bash
npm install
```
 
### 4. Start the development server
 
```bash
npm run dev
```
 
### 5. Open the app
 
Go to `http://localhost:5173` in your browser. The app loads with 4 seed posts ready to browse.
 

## Project Structure

```
devlog-til/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Top navigation bar with mobile hamburger menu
│   │   ├── PostCard.jsx         # Single post preview card used in the feed
│   │   └── ProtectedRoute.jsx   # Redirects logged-out users to /login
│   ├── context/
│   │   └── AppContext.jsx       # Global state: auth and posts. History is
│   │                            # stored directly in localStorage (no state)
|   |── hooks/
│   │   └── useApp.js            # contains a custom hook to call AppContext.jsx 
│   ├── pages/
│   │   ├── Home.jsx             # Public feed with tag filter
│   │   ├── Login.jsx            # Login form
│   │   ├── Register.jsx         # Register form
│   │   ├── CreatePost.jsx       # Write and publish a new post (protected)
│   │   ├── EditPost.jsx         # Edit an existing post (protected)
│   │   ├── PostDetail.jsx       # Full post view + read history tracking
│   │   ├── Dashboard.jsx        # User's own posts with edit/delete (protected)
│   │   └── ReadHistory.jsx      # Posts the logged-in user has opened (protected)
|   |── utils/
│   │   └── storage.js           # contains constants and helpers used in AppContext.jsx
│   ├── App.jsx                 
│   ├── main.jsx               
│   └── index.css             
├── index.html
├── package.json
└── vite.config.js
```

## Features

- **Register & Login** — create an account and sign in with username and password
- **Auth persistence** — login survives page refresh via localStorage
- **Public feed** — all posts are visible to everyone, no account needed
- **Tag filter** — filter posts by CSS, JavaScript, React, Git, Blockchain, Tech
- **Create post** — write and publish a TIL post with a title, tag, and body
- **Edit post** — update your own posts (ownership enforced)
- **Delete post** — remove your own posts with a confirmation dialog
- **Post detail** — full post view with author avatar and formatted date
- **Read history** — every post you open is recorded and shown in order
- **Protected routes** — unauthenticated users are redirected to login
- **Responsive design** — mobile hamburger menu, stacked layout on small screens
- **Seed posts** — 4 example posts pre-loaded so the app is never empty on first launch

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI library |
| Vite | Development server and build tool |
| React Router v6 | Client-side routing (no page reloads) |
| Context API | Global state — auth and posts |
| localStorage | All data persistence (no backend needed) |
| Plain CSS | All styling — no frameworks or libraries |

## localStorage Keys

| Key | What it stores |
|---|---|
| `devlog_users` | Array of all registered users |
| `devlog_currentUser` | The currently logged-in user object |
| `devlog_posts` | Array of all blog posts |

## Auth Flow

1. User fills in the Register form
2. Account is saved to `devlog_users` in localStorage
3. User is automatically logged in — `currentUser` saved to `devlog_currentUser`
4. On every page refresh, `currentUser` is reloaded from localStorage (persistent login)
5. Logout clears `currentUser` from state and removes it from localStorage

## Page Routes

| Route | Page | Protected |
|---|---|---|
| `/` | Home — public feed | No |
| `/login` | Login form | No |
| `/register` | Register form | No |
| `/post/:id` | Full post view | No |
| `/create` | Create a post | Yes |
| `/edit/:id` | Edit a post | Yes |
| `/dashboard` | My posts |  Yes |
| `/history` | Read history | Yes |

## Demo Link- https://devlog-til-blog.vercel.app/

## Built By Ali Hammed
# Web3Bridge Cohort XIV Final Project Week.

## License

MIT
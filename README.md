# KINETIC // High-Performance Gym Interface

![Project Banner](public/mob-bg.jpg) 
*(Replace this path with a screenshot of your actual desktop hero section if available)*

**KINETIC** is a brutalist, futuristic landing page designed to embody high-performance training. Built with **Next.js 14**, it features a zero-latency custom cursor, complex GSAP animations, and a fully responsive "Cyber-Latch" navigation system.

## ⚡ Features

* **Hybrid Hero Architecture:** * **Desktop:** 3D Crystal artifact with video background and heavy post-processing.
    * **Mobile:** High-performance static imagery with cyber-scan overlays and HUD elements.
* **Tactical Navigation:** Custom "Aerogel" frosted glass mobile menu with magnetic pull and latch physics.
* **Physics-Based Cursor:** Custom WebGL-style cursor with velocity tilt and magnetic sticking.
* **GSAP & Framer Motion:** Heavy usage of `ScrollTrigger` for parallax effects and `AnimatePresence` for smooth UI transitions.
* **Brutalist Design System:** Monospaced typography, heavy contrast, neon accents (`#CCFF00`), and raw grid layouts.

## 🛠️ Tech Stack

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animation:** * [GSAP](https://gsap.com/) (ScrollTrigger)
    * [Framer Motion](https://www.framer.com/motion/) (Micro-interactions)
* **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/kinetic-gym.git](https://github.com/your-username/kinetic-gym.git)
    cd kinetic-gym
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the local server:**
    Visit `http://localhost:3000` to view the system.

## 📂 Project Structure

```bash
├── components/
│   ├── home/          # Section-specific components (Hero, Method, Membership)
│   ├── layout/        # Navbar, Footer
│   └── ui/            # Reusable primitives (Cursor, Magnetic Buttons, Marquee)
├── public/            # Static assets (video-bg.mp4, mob-bg.jpg)
└── app/               # Next.js App Router pages
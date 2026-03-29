<div align="center">

# ConversAI

### AI-powered voice agents for customer support — across every industry.

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](#)
[![Next.js](https://img.shields.io/badge/Next.js_14-000?logo=nextdotjs&logoColor=white)](#)
[![React](https://img.shields.io/badge/React_18-61DAFB?logo=react&logoColor=black)](#)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white)](#)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)](#)
[![Vercel](https://img.shields.io/badge/Vercel-000?logo=vercel&logoColor=white)](#)

---

</div>

## The idea

Customer support is expensive, inconsistent, and doesn't scale. You either hire more people or you make your existing customers wait longer. Neither is a good answer.

ConversAI was built around a simple question: what if every customer could talk to an AI agent that actually understands their problem, responds in under a second, speaks their language, and never takes a day off?

Not a chatbot. Not a phone tree. A real voice conversation — natural, fast, and personalized to the business it represents.

This repo is the marketing platform and demo experience for ConversAI. It showcases the product, handles lead capture, and provides industry-specific landing pages for different verticals we serve.

## What you're looking at

This is a Next.js application that serves as the public-facing website for ConversAI. It's designed to do three things well:

1. **Show, don't tell.** The hero section is an animated conversation between a user and an AI agent. Visitors see the product in action before they read a single line of copy. Messages appear sequentially with realistic timing — it feels like watching a real exchange unfold.

2. **Speak to specific industries.** Generic AI landing pages don't convert. We built dedicated pages for four verticals — restaurants, customer service, medical clinics, and private assistants — each with tailored services, workflows, case studies, and benefits. A restaurant owner sees reservation handling and order management. A clinic administrator sees appointment scheduling and patient records.

3. **Capture intent.** A Slack integration pipes demo requests directly into our team's channel in real time. No form submissions lost in an inbox. When someone wants to try ConversAI, we know within seconds.

## How the site works

The landing page is structured as a narrative scroll. Each section builds on the last:

**Hero** — An animated chat conversation plays out in real time. Six messages appear with staggered delays, showing a natural back-and-forth between a customer and the AI. The animation uses Framer Motion with spring physics for smooth, organic movement. When the conversation ends, a "Discover More" prompt bounces into view.

**Trusted By** — An infinite auto-scrolling carousel of client logos. Ten brands, duplicated for seamless looping, with gradient fades on the edges. Subtle scale effects on hover. The message: this isn't experimental — real companies use this.

**Functionalities** — Four core capabilities presented as 3D flip cards. Hover triggers a `rotateY(180deg)` transform with `preserve-3d` perspective — the card literally flips over to reveal details. Each card has its own color gradient (purple for voice, yellow for speed, green for analytics, blue for availability). It's one of those interactions that makes people pause and play with it.

**Use Cases** — A grid of four industry verticals, each linking to its dedicated page. Color-coded gradients (orange for restaurants, blue for customer service, purple for assistants, green for medical). Each card previews the key benefit and invites deeper exploration.

**Testimonials** — Three customer stories with photo overlays and quote formatting. On desktop, all three are visible. On mobile, it becomes a swipeable carousel with touch gesture support (via `react-swipeable`), navigation arrows, and dot indicators. Transitions use spring physics for that satisfying bounce.

**Advanced Features** — Four capability cards covering AI learning, multilingual support, end-to-end encryption, and human handoff. Gradient overlays, hover lifts, and staggered reveal animations.

**Try It Now** — The conversion section. Two-column layout with benefits on the left and a contact form on the right. Features a demo phone number for immediate testing. The form card uses glass-morphism (backdrop blur + transparency) over a grid-patterned gradient background.

**Call to Action** — Direct, no-nonsense CTA linking to the team's email. Primary color block, white text, one button.

## Industry pages

Each vertical gets its own dedicated page following a consistent but customized template:

| Page | Route | Focus |
|------|-------|-------|
| **Restaurants** | `/restaurants` | Reservations, order management, table optimization, voice ordering |
| **Customer Service** | `/customer-service` | 24/7 support, escalation flows, predictive analytics |
| **Medical Clinics** | `/medical-clinics` | Appointment scheduling, patient records, health information |
| **Private Assistant** | `/private-assistant` | Personal scheduling, task management, reminders |

Every page includes:
- Industry-specific hero with tailored messaging
- Six service cards with relevant icons
- Three-step "How It Works" flow
- Four benefit cards with checkmark indicators
- A real case study with metrics (e.g., "50% wait time reduction" for La Trattoria)
- Final CTA section

The structure is identical so visitors can compare verticals, but the content speaks directly to each audience's pain points.

## Architecture

```
conversai/
├── app/
│   ├── page.tsx                    # Main landing page
│   ├── layout.tsx                  # Root layout (navbar + footer)
│   ├── globals.css                 # Theme variables, custom utilities
│   ├── api/
│   │   └── slack/route.ts          # Lead capture → Slack webhook
│   ├── restaurants/page.tsx        # Restaurant vertical
│   ├── customer-service/page.tsx   # Customer service vertical
│   ├── medical-clinics/page.tsx    # Medical clinics vertical
│   └── private-assistant/page.tsx  # Private assistant vertical
│
├── components/
│   ├── hero.tsx                    # Animated chat conversation
│   ├── navbar.tsx                  # Smart-hide navigation bar
│   ├── footer.tsx                  # Site footer
│   ├── functionalities.tsx         # 3D flip feature cards
│   ├── testimonials.tsx            # Swipeable testimonial carousel
│   ├── try-it-now.tsx              # Demo CTA with glass-morphism form
│   ├── use-cases.tsx               # Industry vertical grid
│   ├── trusted-by.tsx              # Auto-scrolling logo carousel
│   ├── call-to-action.tsx          # Final CTA block
│   ├── advanced-features.tsx       # Advanced capability cards
│   └── ui/                         # Shadcn/ui primitives
│       ├── button.tsx              # CVA-based button variants
│       ├── card.tsx                # Card component family
│       └── input.tsx               # Styled input field
│
├── lib/
│   └── utils.ts                    # cn() helper (clsx + tailwind-merge)
│
└── public/
    └── clients/                    # Client logo assets
```

## The design

The visual approach is polished but not overdone. We wanted something that feels trustworthy enough for enterprise buyers while still being energetic enough to stand out.

**Color system** — Primary blue (`HSL 221.2° 83.2% 53.3%`) carries the brand. Feature cards use distinct gradient pairs so each capability has its own visual identity without competing. Dark mode is supported via CSS variables and class-based toggling.

**Animation philosophy** — Every animation earns its place. The hero chat teaches the product. The flip cards invite exploration. The testimonial carousel makes mobile usable. The staggered reveals create rhythm as you scroll. Nothing moves just because it can.

**Typography** — Inter as the primary typeface. Weight distribution is deliberate: 500 for body, 600 for headings, 700 for titles. Sizes scale aggressively from mobile (`text-2xl`) to desktop (`text-7xl`) for impact.

**Responsive strategy** — Mobile-first with Tailwind breakpoints. Testimonials collapse from a 3-column grid to a swipeable carousel. Industry grids go from 2x2 to stacked. Navigation adapts with a smart-hide behavior that tracks scroll direction — scroll down, it disappears; scroll up, it slides back in.

## Tech stack

| Layer | What | Why |
|-------|------|-----|
| **Framework** | Next.js 14 (App Router) | Server components, file-based routing, image optimization |
| **Language** | TypeScript 5 | Type safety across the entire codebase |
| **UI** | React 18 + Shadcn/ui | Radix primitives with CVA variants — accessible and customizable |
| **Styling** | Tailwind CSS 3.4 | Utility-first, responsive, dark mode support |
| **Animation** | Framer Motion 12 | Spring physics, staggered reveals, 3D transforms |
| **Gestures** | react-swipeable | Touch support for mobile carousel |
| **Icons** | Lucide React | Clean, consistent icon set |
| **Integration** | Slack Web API | Real-time lead notifications |

## Getting started

```bash
# Clone
git clone git@github.com:Cesarioo/conversai.git
cd conversai

# Install
npm install

# Set up environment
cp .env.example .env.local
# Add your Slack credentials:
#   SLACK_API_TOKEN=xoxb-your-token
#   SLACK_CHANNEL_ID=C0123456789

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Environment variables

| Variable | Purpose |
|----------|---------|
| `SLACK_API_TOKEN` | Slack Bot token for lead notifications |
| `SLACK_CHANNEL_ID` | Target channel for demo requests |

---

<div align="center">

Built by [Oscar Mairey](https://oscarmairey.com)

</div>

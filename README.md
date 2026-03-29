<div align="center">

# ConversAI

### AI voice agents that answer your phone, so you don't have to.

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](#)
[![Next.js](https://img.shields.io/badge/Next.js_14-000?logo=nextdotjs&logoColor=white)](#)
[![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=white)](#)
[![ElevenLabs](https://img.shields.io/badge/ElevenLabs-000?logo=data:image/svg+xml;base64,&logoColor=white)](#)
[![Twilio](https://img.shields.io/badge/Twilio-F22F46?logo=twilio&logoColor=white)](#)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)](#)

---

</div>

## The problem

Small businesses miss phone calls. Restaurants lose reservations because no one picked up during rush hour. Clinics miss appointment bookings because the receptionist was already on another line. Tradesmen lose leads because they're on a job site and can't answer.

The usual solutions are a voicemail nobody listens to, a call center that costs more than the business can afford, or a chatbot that frustrates everyone who uses it.

ConversAI takes a different approach: an AI voice agent that actually picks up the phone, has a real conversation, understands what the caller needs, and takes action — like confirming a restaurant reservation and texting both the customer and the restaurant owner.

Not a phone tree. Not "press 1 for sales." A natural voice conversation powered by ElevenLabs' ConvAI, with the knowledge of the business baked into every response.

## What's in this repo

This is a monorepo containing the two halves of ConversAI:

| App | What it is | Path |
|-----|-----------|------|
| **Landing** | Marketing website — product showcase, industry pages, lead capture | `apps/landing` |
| **Dashboard** | SaaS platform — agent config, call analytics, knowledge base, recordings | `apps/dashboard` |

The landing page tells the story. The dashboard runs the business.

## How the platform works

### Setting up an agent

A new user signs up, goes through onboarding, and picks from 9 industry templates — restaurant, hotel, medical clinic, spa, e-commerce, SaaS, tradesman, city hall, or pet grooming. Each template comes with a pre-written system prompt tuned for that industry's typical phone conversations.

Then they choose a voice. Four pre-trained voices are available (with audio preview in the settings), or they can use a custom voice clone. They set the greeting message — what the agent says when it picks up — and optionally upload their business knowledge via a text file or website URL.

Behind the scenes, this creates an ElevenLabs ConvAI agent with the selected voice, language, LLM (GPT-3.5-turbo by default), and knowledge base. The agent ID gets stored in Supabase, linked to the user's account.

### When a call comes in

The magic happens outside this codebase — ElevenLabs handles the voice call itself. Their agent picks up, plays the greeting, and has a natural conversation using the knowledge base to answer questions accurately. The entire call is recorded with a full transcript.

What this platform does is give the business owner visibility and control:

**Call History** — Every call shows up in a searchable table with timestamp, duration, message count, and success/failure status. Click any call to see the full transcript (agent and caller turns, timestamped) and listen to the recording via the built-in audio player.

**Analytics Dashboard** — Four key metrics at a glance: total calls, success rate, average duration, and total minutes. Below that, two visualizations:
- A **call heatmap** — a 7×24 grid showing call volume by day of week and hour. Instantly reveals peak times (red = busy, light = quiet).
- A **call trends graph** — line chart with toggleable timeframes (hourly, daily, weekly, monthly) showing volume over time.

**Agent Settings** — Full control over the agent's behavior without touching code:
- Agent name and greeting message
- Knowledge base (upload new files, add website URLs, edit existing content)
- Voice selection with audio previews
- Language setting
- LLM model, temperature, and max token limits

### Reservation handling

For restaurants (and similar booking-heavy businesses), ConversAI goes beyond answering questions. When the agent captures a reservation during a call — name, party size, date, time — it triggers an API call that:

1. Looks up the restaurant's notification phone number in Supabase
2. Fetches the caller's number from the most recent Twilio call
3. Sends an SMS to the customer: "Your reservation for X people at TIME on DATE has been confirmed"
4. Sends an SMS to the restaurant: "New reservation: NAME for X people at TIME on DATE. Customer number: XXX"

The restaurant owner gets notified in real time without ever having to pick up the phone.

## The landing page (`apps/landing`)

The marketing site is built to convert visitors across four different industries. It's not a generic "AI for everyone" page — each vertical gets its own dedicated route with tailored messaging.

The homepage opens with an animated chat conversation that plays out in real time — six messages appearing with staggered timing, showing a natural exchange between a customer and the AI agent. Below that: a scrolling logo carousel, 3D flip cards for core features, a swipeable testimonial carousel, and industry-specific use case cards.

Each industry page (restaurants, customer service, medical clinics, private assistant) follows a consistent template: hero, six service cards, three-step workflow, four benefit cards, a case study with real metrics, and a CTA.

Built with Next.js 14, Framer Motion for animations, react-swipeable for touch gestures, and a Slack integration for real-time lead capture.

## The dashboard (`apps/dashboard`)

This is where businesses manage their AI agent day-to-day. It's a full SaaS dashboard with:

- **Sidebar navigation** — Dashboard, Call History, Agent Settings, Live Support
- **Real-time data** — Conversations fetched from ElevenLabs API, cached in React context
- **Date filtering** — Today, this week, this month, this year, or custom range
- **Audio playback** — Stream call recordings directly from ElevenLabs with play/pause, seek, and volume controls
- **Transcript viewer** — Full conversation with role attribution (agent vs. caller)
- **Guided onboarding** — React Joyride tour on first visit, targeting each nav section
- **Live support** — Embedded Google Calendar for scheduling human follow-ups when the AI can't handle a case

The dashboard talks to 9 API routes that proxy to ElevenLabs, Twilio, and Supabase. All voice AI state lives in ElevenLabs — this app is the control plane.

## Architecture

```
conversai/
├── apps/
│   ├── landing/                        # Marketing website
│   │   ├── app/
│   │   │   ├── page.tsx                # Homepage with animated hero
│   │   │   ├── restaurants/            # Restaurant vertical
│   │   │   ├── customer-service/       # Customer service vertical
│   │   │   ├── medical-clinics/        # Medical clinics vertical
│   │   │   ├── private-assistant/      # Private assistant vertical
│   │   │   └── api/slack/              # Lead capture → Slack
│   │   └── components/                 # Hero, testimonials, features, CTA
│   │
│   └── dashboard/                      # SaaS platform
│       ├── app/
│       │   ├── dashboard/              # Analytics & stats
│       │   ├── call-history/           # Call log & transcripts
│       │   ├── agent-settings/         # Agent configuration
│       │   ├── live-support/           # Google Calendar embed
│       │   ├── onboarding/             # Setup wizard (9 templates)
│       │   ├── login/                  # Supabase auth
│       │   ├── api/
│       │   │   ├── agent/              # GET/PATCH agent config
│       │   │   ├── conversations/      # GET call list & details
│       │   │   ├── audio/              # GET call recordings
│       │   │   ├── knowledge-base/     # POST/PATCH KB files & URLs
│       │   │   └── reservation/        # POST → SMS via Twilio
│       │   └── components/
│       │       ├── AgentDashboard.tsx   # Stats, heatmap, graphs
│       │       ├── CallHistory.tsx      # Call table
│       │       ├── CallDetailsModal.tsx # Transcript + audio player
│       │       ├── AgentSettingsForm.tsx# Full agent config
│       │       ├── CallHeatmap.tsx      # 7×24 activity grid
│       │       ├── CallGraph.tsx        # Volume trends
│       │       └── AudioPlayer.tsx      # Call recording playback
│       ├── data/
│       │   └── promptBusiness.json     # 9 industry prompt templates
│       └── contexts/
│           └── ConversationsContext.tsx # Global state
│
└── README.md
```

## Tech stack

| Layer | What | Why |
|-------|------|-----|
| **Framework** | Next.js 14 (App Router) | Server components, API routes, both apps |
| **Language** | TypeScript 5 | Type safety everywhere |
| **Voice AI** | ElevenLabs ConvAI | Production voice agents with recording & transcripts |
| **SMS** | Twilio | Reservation confirmations to customers and businesses |
| **Auth & DB** | Supabase | Auth, user profiles, agent-to-user mapping |
| **UI** | Tailwind, shadcn/ui, Radix | Consistent, accessible component system |
| **Charts** | Recharts | Call trends, heatmaps, circular gauges |
| **Animation** | Framer Motion | Landing page transitions and interactions |
| **Onboarding** | React Joyride | Guided dashboard tour for new users |

## Business templates

The onboarding wizard includes pre-built system prompts for 9 industries:

| Template | Focus |
|----------|-------|
| Restaurant | Reservations, menu inquiries, dietary restrictions, hours |
| Hotel | Room availability, check-in/out, amenities, concierge |
| Tradesman | Service quotes, scheduling, emergency availability |
| Medical Clinic | Appointments, patient info, insurance, urgency triage |
| Spa & Wellness | Bookings, treatment info, packages, availability |
| City Hall | Public services, office hours, document requests |
| E-commerce | Order status, returns, product questions, shipping |
| SaaS | Technical support, account issues, feature questions |
| Pet Grooming | Appointments, services, pet requirements, pricing |

Each template is tuned for the conversation patterns typical of that industry — a restaurant agent handles table sizes and dietary restrictions differently than a medical clinic agent handles appointment urgency.

## Getting started

```bash
# Clone
git clone git@github.com:Cesarioo/conversai.git
cd conversai

# Landing page
cd apps/landing && npm install && npm run dev
# → http://localhost:3000

# Dashboard (separate terminal)
cd apps/dashboard && npm install && npm run dev
# → http://localhost:3001
```

## Environment variables

**Landing** (`apps/landing/.env.local`):
```env
SLACK_API_TOKEN=         # Slack bot token for lead notifications
SLACK_CHANNEL_ID=        # Target channel for demo requests
```

**Dashboard** (`apps/dashboard/.env.local`):
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=

# ElevenLabs
XI_API_KEY=              # ElevenLabs API key

# Twilio (for SMS reservations)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
```

---

<div align="center">

Built by [Oscar Mairey](https://oscarmairey.com)

</div>

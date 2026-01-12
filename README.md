# 🤖 AI Agent Superbot

A modern, intelligent AI assistant application built with React, TypeScript, and Supabase. Features a beautiful animated UI with chat capabilities and live database management.

## 🌐 Live Demo

**[superbot.rathorerajpal.live](https://superbot.rathorerajpal.live)**

## ✨ Features

- **💬 AI Chat Interface** - Interactive chat with an intelligent AI assistant
- **📊 Live Database Dashboard** - Real-time data visualization and management powered by Supabase
- **🎨 Modern UI/UX** - Beautiful gradient designs with smooth animations
- **⚡ Fast & Responsive** - Built with Vite for optimal performance
- **🔐 Secure** - Environment-based configuration with Supabase integration

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Database:** Supabase (PostgreSQL)
- **Animations:** Framer Motion
- **Icons:** Lucide React

## 📂 Project Structure

```
superbot-demo/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── SupabaseDashboard.tsx
│   │   └── ...
│   ├── pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── Index.tsx
│   │   └── Chat.tsx
│   ├── services/           # API & database services
│   │   └── supabaseService.ts
│   └── lib/                # Utilities
│       ├── supabase.ts
│       └── utils.ts
├── public/                 # Static assets
├── supabase-schema.sql    # Database schema
└── .env.example           # Environment variables template
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm installed ([install with nvm](https://github.com/nvm-sh/nvm))
- Supabase account and project ([create one](https://supabase.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rathore-Rajpal/Superbot-Demo.git
   cd Superbot-Demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

4. **Set up Supabase database**
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Copy and paste the contents of `supabase-schema.sql`
   - Run the SQL to create tables and sample data

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## 🗄️ Database Schema

The application uses the following main tables:

- **tasks** - Project tasks with status tracking
- **members** - Team member profiles
- **projects** - Project management data
- **leaves** - Leave requests and approvals
- **daily_tasks** - Daily task tracking

See `supabase-schema.sql` for complete schema and RLS policies.

## 🎯 Key Features Explained

### Chat Interface
- Clean, modern chat UI
- Powered by AI capabilities
- Real-time message handling

### Database Dashboard
- Live data from Supabase
- Statistics overview cards
- Tabbed interface for different data views
- Sortable tables with status badges
- Real-time updates

### UI/UX Highlights
- Animated gradient backgrounds
- Floating particles effect
- Smooth hover animations
- Responsive design
- Glass morphism effects

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous/public key | Yes |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👨‍💻 Author

**Rajpal Rathore**

- Portfolio: [rathorerajpal.live](https://www.rathorerajpal.live)
- GitHub: [@Rathore-Rajpal](https://github.com/Rathore-Rajpal)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) - Backend as a Service
- [shadcn/ui](https://ui.shadcn.com) - UI Components
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Framer Motion](https://www.framer.com/motion) - Animations

---

⭐ If you find this project useful, please consider giving it a star!

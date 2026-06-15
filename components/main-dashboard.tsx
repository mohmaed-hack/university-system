'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen, Calendar, Layers, MessageSquare,
  ChevronRight, GraduationCap, ShieldCheck, LogOut
} from 'lucide-react'
import { DarkModeToggle } from './dark-mode-toggle'
import { useApp } from '@/lib/app-context'
import { StudyPlanPage } from './pages/study-plan-page'
import { SchedulePage } from './pages/schedule-page'
import { SubjectsPage } from './pages/subjects-page'
import { SuggestionsPage } from './pages/suggestions-page'

type ActivePage = 'home' | 'study-plan' | 'schedule' | 'subjects' | 'suggestions'

const cards = [
  {
    id: 'study-plan' as const,
    titleAr: 'الخطة الدراسية',
    titleEn: 'Study Plan',
    year: '2026-2027م',
    icon: BookOpen,
    color: 'from-blue-500/10 to-blue-600/5',
    borderColor: 'hover:border-blue-400/50',
    iconColor: 'text-blue-500',
    ringColor: 'hover:ring-blue-400/20',
    desc: 'عرض المواد والترمات الدراسية',
  },
  {
    id: 'schedule' as const,
    titleAr: 'اختبارات السنة',
    titleEn: 'Exams Schedule',
    year: '2026-2027م',
    icon: Calendar,
    color: 'from-emerald-500/10 to-emerald-600/5',
    borderColor: 'hover:border-emerald-400/50',
    iconColor: 'text-emerald-500',
    ringColor: 'hover:ring-emerald-400/20',
    desc: 'جداول الاختبارات الفصلية',
  },
  {
    id: 'subjects' as const,
    titleAr: 'المواد والمحاضرات',
    titleEn: 'Course Materials',
    year: '2026-2027م',
    icon: Layers,
    color: 'from-purple-500/10 to-purple-600/5',
    borderColor: 'hover:border-purple-400/50',
    iconColor: 'text-purple-500',
    ringColor: 'hover:ring-purple-400/20',
    desc: 'المقررات الدراسية والمحاضرات',
  },
  {
    id: 'suggestions' as const,
    titleAr: 'الآراء والاقتراحات',
    titleEn: 'Opinions & Suggestions',
    year: '',
    icon: MessageSquare,
    color: 'from-orange-500/10 to-orange-600/5',
    borderColor: 'hover:border-orange-400/50',
    iconColor: 'text-orange-500',
    ringColor: 'hover:ring-orange-400/20',
    desc: 'شاركنا آراءك واقتراحاتك',
  },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function MainDashboard() {
  const { isAdmin, setIsAdmin } = useApp()
  const [activePage, setActivePage] = useState<ActivePage>('home')

  const handleLogout = () => {
    setIsAdmin(false)
    // Force a full reset back to welcome
    window.location.href = '/'
  }

  if (activePage !== 'home') {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader
          activePage={activePage}
          onBack={() => setActivePage('home')}
          isAdmin={isAdmin}
          onLogout={handleLogout}
        />
        <main className="max-w-5xl mx-auto px-4 py-6">
          {activePage === 'study-plan' && <StudyPlanPage />}
          {activePage === 'schedule' && <SchedulePage />}
          {activePage === 'subjects' && <SubjectsPage />}
          {activePage === 'suggestions' && <SuggestionsPage />}
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        activePage="home"
        onBack={() => {}}
        isAdmin={isAdmin}
        onLogout={handleLogout}
      />

      <main className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-8">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground p-8 shadow-lg"
        >
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/5 -translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-white/5 translate-x-1/3 translate-y-1/3" />
          <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-primary-foreground/60 text-sm font-semibold tracking-wider uppercase mb-2">
                العام الأكاديمي ٢٠٢٦ - ٢٠٢٧م
              </p>
              <h1 className="text-3xl sm:text-4xl font-black leading-tight text-balance">
                كل ما تحتاجه
                <span className="block text-2xl sm:text-3xl font-bold text-primary-foreground/80 mt-1">
                  في مكان واحد
                </span>
              </h1>
              <p className="mt-3 text-primary-foreground/70 text-sm leading-relaxed max-w-md">
                استعرض الخطط الدراسية، الجداول، المواد، وشارك آراءك — كل شيء بين يديك
              </p>
            </div>
            <div className="hidden sm:flex items-center justify-center size-24 rounded-2xl bg-white/10">
              <GraduationCap className="size-12 text-primary-foreground/80" strokeWidth={1.5} />
            </div>
          </div>
        </motion.div>

        {/* Admin badge */}
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold/10 border border-gold/30 w-fit"
          >
            <ShieldCheck className="size-4 text-gold" />
            <span className="text-sm font-semibold text-gold">وضع المشرف — Admin Mode</span>
          </motion.div>
        )}

        {/* Section label */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <p className="text-sm font-semibold text-muted-foreground px-2">الأقسام الرئيسية</p>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <motion.button
                key={card.id}
                variants={cardVariants}
                onClick={() => setActivePage(card.id)}
                className={`group relative flex flex-col gap-5 p-6 rounded-2xl border border-border bg-card text-right
                  cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl
                  focus:outline-none focus:ring-2 ring-offset-2 ring-offset-background
                  ${card.borderColor} ${card.ringColor}`}
              >
                <div className="flex items-start justify-between">
                  <div className={`flex items-center justify-center size-14 rounded-xl bg-gradient-to-br ${card.color}
                    transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className={`size-7 ${card.iconColor}`} strokeWidth={1.5} />
                  </div>
                  <ChevronRight className="size-5 text-muted-foreground/40 group-hover:text-muted-foreground
                    transition-all duration-300 group-hover:-translate-x-1 rotate-180" />
                </div>

                <div className="flex flex-col gap-1 text-start">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-xl font-bold text-foreground">{card.titleAr}</h3>
                    {card.year && (
                      <span className="text-xs font-medium text-muted-foreground">{card.year}</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">{card.titleEn}</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">{card.desc}</p>
                </div>

                {/* Bottom glow line */}
                <div className={`absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-current to-transparent
                  opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${card.iconColor}`} />
              </motion.button>
            )
          })}
        </motion.div>
      </main>
    </div>
  )
}

function DashboardHeader({
  activePage, onBack, isAdmin, onLogout,
}: {
  activePage: ActivePage
  onBack: () => void
  isAdmin: boolean
  onLogout: () => void
}) {
  const pageLabels: Record<ActivePage, string> = {
    home: 'الرئيسية',
    'study-plan': 'الخطة الدراسية',
    schedule: 'اختبارات السنة 2026-2027م',
    subjects: 'المواد الدراسية والمحاضرات',
    suggestions: 'الآراء والاقتراحات',
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo / Back */}
        <div className="flex items-center gap-3">
          {activePage !== 'home' ? (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground
                hover:text-foreground transition-colors duration-200 group"
            >
              <ChevronRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
              رجوع
            </button>
          ) : (
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center size-8 rounded-lg bg-primary">
                <GraduationCap className="size-4 text-primary-foreground" strokeWidth={2} />
              </div>
              <span className="font-black text-foreground text-sm hidden sm:block">بوابة الجامعة</span>
            </div>
          )}
        </div>

        {/* Page title */}
        <h2 className="font-bold text-foreground text-base">{pageLabels[activePage]}</h2>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <DarkModeToggle />
          {isAdmin && (
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold
                text-muted-foreground hover:text-destructive hover:bg-destructive/10
                border border-border hover:border-destructive/30 transition-all duration-200"
              title="تسجيل الخروج"
            >
              <LogOut className="size-3.5" />
              <span className="hidden sm:block">خروج</span>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

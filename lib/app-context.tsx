'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

// ── Types ─────────────────────────────────────────────────
export interface Subject {
  id: string
  nameEn: string
  nameAr: string
  /** Path relative to /public, e.g. /images/subjects/software-engineering.png */
  image: string
  doctor: string
}

export interface DaySchedule {
  id: string
  day: string
  dayAr: string
  subject: string
  subjectAr: string
  time: string
  room: string
  instructor: string
  instructorAr: string
}

export interface Suggestion {
  id: string
  name: string
  message: string
  type: 'suggestion' | 'opinion'
  date: string
  reply?: string
}

/**
 * A lecture inside a subject.
 * Add more items to the `lectures` array to show additional lectures.
 */
export interface Lecture {
  id: string
  title: string
  downloadUrl: string
}

export interface SubjectMaterial {
  id: string
  nameEn: string
  nameAr: string
  /** Path relative to /public, e.g. /images/subjects/software-engineering.png */
  image: string
  semester: 1 | 2
  /** URL to download the course book/textbook */
  bookUrl?: string
  /** Theoretical lectures */
  lecturesTheory: Lecture[]
  /** Practical lectures */
  lecturesPractical: Lecture[]
}

export interface AppData {
  semester1: Subject[]
  semester2: Subject[]
  schedule: DaySchedule[]
  subjectMaterials: SubjectMaterial[]
  suggestions: Suggestion[]
}

// ── Default Data ──────────────────────────────────────────
const DEFAULT_DOCTOR = 'الدكتورة ياسمين محمد'
const DEFAULT_LECTURE_URL =
  'https://drive.google.com/file/d/14Ed0rrA4vsoao5RMe01qbOTN7mypoTX9/view?usp=drivesdk'

const defaultData: AppData = {
  // ── Semester 1 subjects (Study Plan) ──
  semester1: [
    {
      id: 's1-1',
      nameEn: 'Software Engineering',
      nameAr: 'هندسة البرمجيات',
      image: '/images/subjects/software-engineering.png',
      doctor: DEFAULT_DOCTOR,
    },
    {
      id: 's1-2',
      nameEn: 'IT Project Management',
      nameAr: 'إدارة مشاريع تقنية المعلومات',
      image: '/images/subjects/it-project-management.png',
      doctor: DEFAULT_DOCTOR,
    },
    {
      id: 's1-3',
      nameEn: 'Business Intelligence',
      nameAr: 'ذكاء الأعمال',
      image: '/images/subjects/business-intelligence.png',
      doctor: DEFAULT_DOCTOR,
    },
    {
      id: 's1-4',
      nameEn: 'Developing Database Applications',
      nameAr: 'تطوير تطبيقات قواعد البيانات',
      image: '/images/subjects/developing-database-applications.png',
      doctor: DEFAULT_DOCTOR,
    },
    {
      id: 's1-5',
      nameEn: 'Information Technology Management',
      nameAr: 'إدارة تقنية المعلومات',
      image: '/images/subjects/it-management.png',
      doctor: DEFAULT_DOCTOR,
    },
    {
      id: 's1-6',
      nameEn: 'Cloud Computing and Web Services',
      nameAr: 'الحوسبة السحابية وخدمات الويب',
      image: '/images/subjects/cloud-computing.png',
      doctor: DEFAULT_DOCTOR,
    },
  ],

  // ── Semester 2 subjects (Study Plan) ──
  semester2: [
    {
      id: 's2-1',
      nameEn: 'Open Source Concepts & Programming',
      nameAr: 'مفاهيم البرمجة مفتوحة المصدر',
      image: '/images/subjects/open-source.png',
      doctor: DEFAULT_DOCTOR,
    },
    {
      id: 's2-2',
      nameEn: 'Research Methods',
      nameAr: 'مناهج البحث العلمي',
      image: '/images/subjects/research-methods.png',
      doctor: DEFAULT_DOCTOR,
    },
    {
      id: 's2-3',
      nameEn: 'Industrial Training',
      nameAr: 'التدريب الميداني',
      image: '/images/subjects/industrial-training.png',
      doctor: DEFAULT_DOCTOR,
    },
    {
      id: 's2-4',
      nameEn: 'Human Computer Interaction',
      nameAr: 'تفاعل الإنسان والحاسب',
      image: '/images/subjects/human-computer-interaction.png',
      doctor: DEFAULT_DOCTOR,
    },
    {
      id: 's2-5',
      nameEn: 'Enterprise Application Development',
      nameAr: 'تطوير تطبيقات المؤسسات',
      image: '/images/subjects/enterprise-app-development.png',
      doctor: DEFAULT_DOCTOR,
    },
  ],

  // ── Schedule (kept empty — exams page starts empty) ──
  schedule: [],

  // ── Subject Materials (Semester 1 only, Semester 2 = coming soon) ──
  subjectMaterials: [
    {
      id: 'sm-s1-1',
      nameEn: 'Software Engineering',
      nameAr: 'هندسة البرمجيات',
      image: '/images/subjects/software-engineering.png',
      semester: 1,
      bookUrl: 'https://drive.google.com/file/d/14Ed0rrA4vsoao5RMe01qbOTN7mypoTX9/view?usp=drivesdk',
      lecturesTheory: [
        { id: 'lt-1', title: 'المحاضرة الأولى', downloadUrl: DEFAULT_LECTURE_URL },
      ],
      lecturesPractical: [
        { id: 'lp-1', title: 'المحاضرة الأولى', downloadUrl: DEFAULT_LECTURE_URL },
      ],
    },
    {
      id: 'sm-s1-2',
      nameEn: 'IT Project Management',
      nameAr: 'إدارة مشاريع تقنية المعلومات',
      image: '/images/subjects/it-project-management.png',
      semester: 1,
      bookUrl: 'https://drive.google.com/file/d/14Ed0rrA4vsoao5RMe01qbOTN7mypoTX9/view?usp=drivesdk',
      lecturesTheory: [
        { id: 'lt-1', title: 'المحاضرة الأولى', downloadUrl: DEFAULT_LECTURE_URL },
      ],
      lecturesPractical: [
        { id: 'lp-1', title: 'المحاضرة الأولى', downloadUrl: DEFAULT_LECTURE_URL },
      ],
    },
    {
      id: 'sm-s1-3',
      nameEn: 'Business Intelligence',
      nameAr: 'ذكاء الأعمال',
      image: '/images/subjects/business-intelligence.png',
      semester: 1,
      bookUrl: 'https://drive.google.com/file/d/14Ed0rrA4vsoao5RMe01qbOTN7mypoTX9/view?usp=drivesdk',
      lecturesTheory: [
        { id: 'lt-1', title: 'المحاضرة الأولى', downloadUrl: DEFAULT_LECTURE_URL },
      ],
      lecturesPractical: [
        { id: 'lp-1', title: 'المحاضرة الأولى', downloadUrl: DEFAULT_LECTURE_URL },
      ],
    },
    {
      id: 'sm-s1-4',
      nameEn: 'Developing Database Applications',
      nameAr: 'تطوير تطبيقات قواعد البيانات',
      image: '/images/subjects/developing-database-applications.png',
      semester: 1,
      bookUrl: 'https://drive.google.com/file/d/14Ed0rrA4vsoao5RMe01qbOTN7mypoTX9/view?usp=drivesdk',
      lecturesTheory: [
        { id: 'lt-1', title: 'المحاضرة الأولى', downloadUrl: DEFAULT_LECTURE_URL },
      ],
      lecturesPractical: [
        { id: 'lp-1', title: 'المحاضرة الأولى', downloadUrl: DEFAULT_LECTURE_URL },
      ],
    },
    {
      id: 'sm-s1-5',
      nameEn: 'Information Technology Management',
      nameAr: 'إدارة تقنية المعلومات',
      image: '/images/subjects/it-management.png',
      semester: 1,
      bookUrl: 'https://drive.google.com/file/d/14Ed0rrA4vsoao5RMe01qbOTN7mypoTX9/view?usp=drivesdk',
      lecturesTheory: [
        { id: 'lt-1', title: 'المحاضرة الأولى', downloadUrl: DEFAULT_LECTURE_URL },
      ],
      lecturesPractical: [
        { id: 'lp-1', title: 'المحاضرة الأولى', downloadUrl: DEFAULT_LECTURE_URL },
      ],
    },
    {
      id: 'sm-s1-6',
      nameEn: 'Cloud Computing and Web Services',
      nameAr: 'الحوسبة السحابية وخدمات الويب',
      image: '/images/subjects/cloud-computing.png',
      semester: 1,
      bookUrl: 'https://drive.google.com/file/d/14Ed0rrA4vsoao5RMe01qbOTN7mypoTX9/view?usp=drivesdk',
      lecturesTheory: [
        { id: 'lt-1', title: 'المحاضرة الأولى', downloadUrl: DEFAULT_LECTURE_URL },
      ],
      lecturesPractical: [
        { id: 'lp-1', title: 'المحاضرة الأولى', downloadUrl: DEFAULT_LECTURE_URL },
      ],
    },
  ],

  suggestions: [],
}

// ── Context ───────────────────────────────────────────────
interface AppContextType {
  data: AppData
  isAdmin: boolean
  /** True while the initial data load is in progress. */
  isLoading: boolean
  /** True while a change is being committed to GitHub. */
  isSaving: boolean
  setIsAdmin: (v: boolean) => void
  /** Verifies the password on the server; returns true on success. */
  loginAdmin: (password: string) => Promise<boolean>
  /** Ends the admin session on the server. */
  logoutAdmin: () => Promise<void>
  updateSemester1: (subjects: Subject[]) => void
  updateSemester2: (subjects: Subject[]) => void
  updateSchedule: (schedule: DaySchedule[]) => void
  updateSubjectMaterials: (materials: SubjectMaterial[]) => void
  addSuggestion: (s: Omit<Suggestion, 'id' | 'date'>) => void
  addReply: (id: string, reply: string) => void
  deleteSuggestion: (id: string) => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AppData>(defaultData)
  const [isAdmin, setIsAdminState] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Load the canonical data (from GitHub via the API) and restore session.
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const [dataRes, sessionRes] = await Promise.all([
          fetch('/api/data', { cache: 'no-store' }),
          fetch('/api/admin/session', { cache: 'no-store' }),
        ])
        if (!cancelled && dataRes.ok) {
          const json = await dataRes.json()
          if (json?.data) setData(json.data as AppData)
        }
        if (!cancelled && sessionRes.ok) {
          const json = await sessionRes.json()
          setIsAdminState(Boolean(json?.isAdmin))
        }
      } catch {
        // Keep default data if the request fails.
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  /**
   * Optimistically updates local state, then commits the full data set
   * to GitHub through the API. On failure the previous state is restored.
   */
  const save = (next: AppData, message?: string) => {
    const previous = data
    setData(next)
    setIsSaving(true)
    ;(async () => {
      try {
        const res = await fetch('/api/data', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: next, message }),
        })
        if (!res.ok) {
          const err = await res.json().catch(() => ({}))
          console.log('[v0] Failed to save data:', err?.error)
          setData(previous)
        }
      } catch (e) {
        console.log('[v0] Error saving data:', e)
        setData(previous)
      } finally {
        setIsSaving(false)
      }
    })()
  }

  const setIsAdmin = (v: boolean) => setIsAdminState(v)

  const loginAdmin = async (password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        setIsAdminState(true)
        return true
      }
      return false
    } catch {
      return false
    }
  }

  const logoutAdmin = async (): Promise<void> => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
    } catch {}
    setIsAdminState(false)
  }

  return (
    <AppContext.Provider
      value={{
        data,
        isAdmin,
        isLoading,
        isSaving,
        setIsAdmin,
        loginAdmin,
        logoutAdmin,
        updateSemester1: (s) => save({ ...data, semester1: s }, 'chore(data): update semester 1 subjects'),
        updateSemester2: (s) => save({ ...data, semester2: s }, 'chore(data): update semester 2 subjects'),
        updateSchedule: (s) => save({ ...data, schedule: s }, 'chore(data): update schedule'),
        updateSubjectMaterials: (m) => save({ ...data, subjectMaterials: m }, 'chore(data): update subject materials'),
        addSuggestion: (s) => {
          const newS: Suggestion = {
            ...s,
            id: Date.now().toString(),
            date: new Date().toISOString().split('T')[0],
          }
          save({ ...data, suggestions: [...data.suggestions, newS] }, 'chore(data): add suggestion')
        },
        addReply: (id, reply) => {
          save(
            {
              ...data,
              suggestions: data.suggestions.map((s) =>
                s.id === id ? { ...s, reply } : s,
              ),
            },
            'chore(data): reply to suggestion',
          )
        },
        deleteSuggestion: (id) => {
          save(
            {
              ...data,
              suggestions: data.suggestions.filter((s) => s.id !== id),
            },
            'chore(data): delete suggestion',
          )
        },
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

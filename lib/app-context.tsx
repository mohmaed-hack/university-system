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
  setIsAdmin: (v: boolean) => void
  updateSemester1: (subjects: Subject[]) => void
  updateSemester2: (subjects: Subject[]) => void
  updateSchedule: (schedule: DaySchedule[]) => void
  updateSubjectMaterials: (materials: SubjectMaterial[]) => void
  addSuggestion: (s: Omit<Suggestion, 'id' | 'date'>) => void
  addReply: (id: string, reply: string) => void
  deleteSuggestion: (id: string) => void
}

const AppContext = createContext<AppContextType | null>(null)

const STORAGE_KEY = 'uni_portal_data_v2'
const ADMIN_KEY = 'uni_portal_admin'

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AppData>(defaultData)
  const [isAdmin, setIsAdminState] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setData(JSON.parse(saved))
      const adminSaved = sessionStorage.getItem(ADMIN_KEY)
      if (adminSaved === 'true') setIsAdminState(true)
    } catch {}
  }, [])

  const save = (d: AppData) => {
    setData(d)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)) } catch {}
  }

  const setIsAdmin = (v: boolean) => {
    setIsAdminState(v)
    try { sessionStorage.setItem(ADMIN_KEY, String(v)) } catch {}
  }

  return (
    <AppContext.Provider
      value={{
        data,
        isAdmin,
        setIsAdmin,
        updateSemester1: (s) => save({ ...data, semester1: s }),
        updateSemester2: (s) => save({ ...data, semester2: s }),
        updateSchedule: (s) => save({ ...data, schedule: s }),
        updateSubjectMaterials: (m) => save({ ...data, subjectMaterials: m }),
        addSuggestion: (s) => {
          const newS: Suggestion = {
            ...s,
            id: Date.now().toString(),
            date: new Date().toISOString().split('T')[0],
          }
          save({ ...data, suggestions: [...data.suggestions, newS] })
        },
        addReply: (id, reply) => {
          save({
            ...data,
            suggestions: data.suggestions.map((s) =>
              s.id === id ? { ...s, reply } : s,
            ),
          })
        },
        deleteSuggestion: (id) => {
          save({
            ...data,
            suggestions: data.suggestions.filter((s) => s.id !== id),
          })
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

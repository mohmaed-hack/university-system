'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Book, FlaskConical, ChevronDown, X, BookMarked } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { useApp, type SubjectMaterial, type Lecture } from '@/lib/app-context'
import { cn } from '@/lib/utils'

type Tab = 1 | 2
type LectureType = 'theory' | 'practical'
type SubPageState =
  | { kind: 'list' }
  | { kind: 'lectures'; subject: SubjectMaterial; type: LectureType }

export function SubjectsPage() {
  const { data } = useApp()
  const [activeTab, setActiveTab] = useState<Tab>(1)
  const [subPage, setSubPage] = useState<SubPageState>({ kind: 'list' })
  const [selectedSubject, setSelectedSubject] = useState<SubjectMaterial | null>(null)

  // Navigate to lectures sub-page
  const openLectures = (subject: SubjectMaterial, type: LectureType) => {
    setSelectedSubject(null)
    setSubPage({ kind: 'lectures', subject, type })
  }

  // Back to list (not home)
  const goBack = () => setSubPage({ kind: 'list' })

  // ── Lectures sub-page ──
  if (subPage.kind === 'lectures') {
    const { subject, type } = subPage
    const lectures =
      type === 'theory' ? subject.lecturesTheory : subject.lecturesPractical
    return (
      <LecturesPage
        subject={subject}
        type={type}
        lectures={lectures}
        onBack={goBack}
      />
    )
  }

  // ── Main list ──
  const semester1Materials = data.subjectMaterials.filter((s) => s.semester === 1)

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-black text-foreground">المواد الدراسية والمحاضرات</h2>
        <p className="text-muted-foreground text-sm">Course Materials — Academic Year 2026-2027</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {([1, 2] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 focus:outline-none',
              activeTab === tab
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-primary',
            )}
          >
            {tab === 1 ? 'الترم الأول' : 'الترم الثاني'}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === 1 ? (
          // ── Semester 1: subject cards ──
          <motion.div
            key="sem1"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {semester1Materials.map((subject, i) => (
              <motion.button
                key={subject.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setSelectedSubject(subject)}
                className="group text-start bg-card border border-border rounded-2xl overflow-hidden
                  hover:border-primary/40 hover:shadow-lg transition-all duration-300 focus:outline-none
                  focus:ring-2 focus:ring-primary/30"
              >
                {/* Image */}
                <div className="relative w-full aspect-video bg-muted overflow-hidden">
                  <Image
                    src={subject.image}
                    alt={subject.nameEn}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                {/* Name */}
                <div className="p-4">
                  <h3 className="font-bold text-foreground text-sm leading-snug line-clamp-2">
                    {subject.nameEn}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">{subject.nameAr}</p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          // ── Semester 2: coming soon ──
          <motion.div
            key="sem2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center justify-center py-24 gap-4 text-center"
          >
            <div className="flex items-center justify-center size-20 rounded-2xl bg-muted/60">
              <BookMarked className="size-10 text-muted-foreground/40" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-xl font-black text-foreground">
                قريباً... لا يوجد حالياً 🙃🤍
              </p>
              <p className="text-sm text-muted-foreground">
                سيتم إضافة محاضرات الترم الثاني قريباً
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subject Detail Modal */}
      <SubjectModal
        subject={selectedSubject}
        onClose={() => setSelectedSubject(null)}
        onOpenLectures={openLectures}
      />
    </div>
  )
}

// ── Subject Detail Modal ──────────────────────────────────
function SubjectModal({
  subject,
  onClose,
  onOpenLectures,
}: {
  subject: SubjectMaterial | null
  onClose: () => void
  onOpenLectures: (subject: SubjectMaterial, type: LectureType) => void
}) {
  const [showLectureChoice, setShowLectureChoice] = useState(false)

  if (!subject) return null

  return (
    <Dialog open={!!subject} onOpenChange={(o) => { if (!o) { onClose(); setShowLectureChoice(false) } }}>
      <DialogContent className="max-w-md w-full p-0 overflow-hidden rounded-2xl gap-0">
        <DialogTitle className="sr-only">{subject.nameEn}</DialogTitle>

        {/* Subject image */}
        <div className="relative w-full aspect-video bg-muted">
          <Image
            src={subject.image}
            alt={subject.nameEn}
            fill
            className="object-cover"
            sizes="448px"
          />
          {/* Close button */}
          <button
            onClick={() => { onClose(); setShowLectureChoice(false) }}
            className="absolute top-3 left-3 flex items-center justify-center size-8 rounded-full
              bg-black/40 text-white hover:bg-black/60 transition-colors backdrop-blur-sm"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-5">
          {/* Subject info */}
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-2 flex-wrap">
              <h3 className="text-xl font-black text-foreground" dir="ltr">
                {subject.nameEn}
              </h3>
              <span className="text-sm font-semibold text-muted-foreground">
                {subject.nameAr}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="font-semibold text-foreground">الدكتورة ياسمين محمد</span>
            </p>
          </div>

          {/* Book download button */}
          {subject.bookUrl && (
            <a
              href={subject.bookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl
                bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-sm
                border border-amber-400/20 hover:bg-amber-500/20 hover:border-amber-400/40
                transition-all duration-200"
            >
              <Book className="size-4" />
              تحميل الكتاب
            </a>
          )}

          {/* Lectures button */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setShowLectureChoice((v) => !v)}
              className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl
                bg-primary text-primary-foreground font-bold text-sm
                hover:opacity-90 active:scale-95 transition-all duration-200"
            >
              <span>المحاضرات</span>
              <ChevronDown
                className={cn(
                  'size-4 transition-transform duration-200',
                  showLectureChoice && 'rotate-180',
                )}
              />
            </button>

            <AnimatePresence>
              {showLectureChoice && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden flex flex-col gap-2"
                >
                  <button
                    onClick={() => onOpenLectures(subject, 'theory')}
                    className="flex items-center gap-3 w-full px-5 py-3.5 rounded-xl
                      bg-card border border-border hover:border-primary/40 hover:bg-primary/5
                      transition-all duration-200 text-right"
                  >
                    <div className="flex items-center justify-center size-8 rounded-lg bg-blue-500/10">
                      <Download className="size-4 text-blue-500" strokeWidth={1.5} />
                    </div>
                    <span className="font-semibold text-foreground text-sm">الجانب النظري</span>
                  </button>

                  <button
                    onClick={() => onOpenLectures(subject, 'practical')}
                    className="flex items-center gap-3 w-full px-5 py-3.5 rounded-xl
                      bg-card border border-border hover:border-primary/40 hover:bg-primary/5
                      transition-all duration-200 text-right"
                  >
                    <div className="flex items-center justify-center size-8 rounded-lg bg-emerald-500/10">
                      <FlaskConical className="size-4 text-emerald-500" strokeWidth={1.5} />
                    </div>
                    <span className="font-semibold text-foreground text-sm">الجانب العملي</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ── Lectures Page ─────────────────────────────────────────
function LecturesPage({
  subject,
  type,
  lectures,
  onBack,
}: {
  subject: SubjectMaterial
  type: LectureType
  lectures: Lecture[]
  onBack: () => void
}) {
  const isTheory = type === 'theory'
  const typeLabel = isTheory ? 'المحاضرات النظرية' : 'المحاضرات العملية'
  const typeIcon = isTheory ? (
    <Download className="size-5 text-blue-500" strokeWidth={1.5} />
  ) : (
    <FlaskConical className="size-5 text-emerald-500" strokeWidth={1.5} />
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Header with back button */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-black text-foreground">{typeLabel}</h2>
          <p className="text-sm text-muted-foreground" dir="ltr">
            {subject.nameEn} — {subject.nameAr}
          </p>
        </div>
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-card border border-border
            text-muted-foreground hover:text-foreground hover:border-primary/40
            transition-colors duration-200 text-sm font-semibold"
        >
          رجوع
        </button>
      </div>

      {/* Type badge */}
      <div
        className={cn(
          'flex items-center gap-2 px-4 py-2.5 rounded-xl w-fit',
          isTheory
            ? 'bg-blue-500/10 border border-blue-400/20'
            : 'bg-emerald-500/10 border border-emerald-400/20',
        )}
      >
        {typeIcon}
        <span
          className={cn(
            'text-sm font-semibold',
            isTheory ? 'text-blue-600 dark:text-blue-400' : 'text-emerald-600 dark:text-emerald-400',
          )}
        >
          {typeLabel}
        </span>
      </div>

      {/* Accordion list */}
      {lectures.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <div className="flex items-center justify-center size-16 rounded-2xl bg-muted/60">
            <Download className="size-8 text-muted-foreground/40" strokeWidth={1.5} />
          </div>
          <p className="text-base font-bold text-muted-foreground">
            لا توجد محاضرات متاحة حالياً
          </p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <Accordion type="single" collapsible className="divide-y divide-border">
            {lectures.map((lecture, idx) => (
              <AccordionItem key={lecture.id} value={lecture.id} className="border-none">
                <AccordionTrigger
                  className="px-5 py-4 text-sm font-bold text-foreground hover:no-underline
                    hover:bg-muted/30 transition-colors data-[state=open]:bg-muted/30"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={cn(
                        'flex items-center justify-center size-7 rounded-lg text-xs font-black shrink-0',
                        isTheory
                          ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                          : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
                      )}
                    >
                      {idx + 1}
                    </span>
                    {lecture.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-4 pt-0">
                  <a
                    href={lecture.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl
                      bg-primary text-primary-foreground text-sm font-bold
                      hover:opacity-90 active:scale-95 transition-all duration-200"
                  >
                    <Download className="size-4" />
                    تحميل المحاضرة
                  </a>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  )
}

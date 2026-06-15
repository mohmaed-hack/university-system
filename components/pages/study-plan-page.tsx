'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, GraduationCap } from 'lucide-react'
import { useApp, type Subject } from '@/lib/app-context'

type SemesterView = null | 1 | 2

export function StudyPlanPage() {
  const [semView, setSemView] = useState<SemesterView>(null)

  if (semView !== null) {
    return <SemesterDetail semester={semView} onBack={() => setSemView(null)} />
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-black text-foreground">الخطة الدراسية</h2>
        <p className="text-muted-foreground text-sm">Study Plan — Academic Year 2026-2027</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {([1, 2] as const).map((sem) => (
          <motion.button
            key={sem}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sem === 1 ? 0.1 : 0.2 }}
            onClick={() => setSemView(sem)}
            className="group relative flex flex-col gap-5 p-7 rounded-2xl border border-border bg-card
              cursor-pointer hover:scale-[1.02] hover:shadow-xl hover:border-primary/40
              transition-all duration-300 text-start focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center size-14 rounded-xl bg-primary/10
                group-hover:bg-primary/15 transition-colors duration-300">
                <BookOpen className="size-7 text-primary group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              </div>
              <div className="text-left">
                <span className="text-xs text-muted-foreground font-medium">Semester</span>
                <p className="text-3xl font-black text-primary">{sem}</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-black text-foreground">
                {sem === 1 ? 'الترم الأول' : 'الترم الثاني'}
              </h3>
              <p className="text-sm font-medium text-muted-foreground mt-0.5">
                {sem === 1 ? 'Semester One' : 'Semester Two'}
              </p>
              <p className="text-xs text-muted-foreground/70 mt-2">
                {sem === 1
                  ? 'الفصل الدراسي الأول — ٢٠٢٦م'
                  : 'الفصل الدراسي الثاني — ٢٠٢٧م'}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-primary/80 font-semibold
              opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>عرض المواد</span>
              <span>→</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

function SemesterDetail({
  semester,
  onBack,
}: {
  semester: 1 | 2
  onBack: () => void
}) {
  const { data, isAdmin, updateSemester1, updateSemester2 } = useApp()
  const subjects = semester === 1 ? data.semester1 : data.semester2
  const updateFn = semester === 1 ? updateSemester1 : updateSemester2

  const handleDelete = (id: string) => {
    updateFn(subjects.filter((s) => s.id !== id))
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-black text-foreground">
          {semester === 1
            ? 'الترم الأول — Semester One'
            : 'الترم الثاني — Semester Two'}
        </h2>
        <p className="text-muted-foreground text-sm">
          {subjects.length} {subjects.length === 1 ? 'مادة' : 'مواد'}
        </p>
      </div>

      {/* Cards grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
      >
        <AnimatePresence mode="popLayout">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              isAdmin={isAdmin}
              onDelete={handleDelete}
              onUpdate={(updated) =>
                updateFn(subjects.map((s) => (s.id === updated.id ? updated : s)))
              }
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Add new subject — admin only */}
      {isAdmin && (
        <AddSubjectForm
          onAdd={(s) => updateFn([...subjects, s])}
        />
      )}
    </div>
  )
}

// ── Subject Card ──────────────────────────────────────────
function SubjectCard({
  subject,
  isAdmin,
  onDelete,
  onUpdate,
}: {
  subject: Subject
  isAdmin: boolean
  onDelete: (id: string) => void
  onUpdate: (s: Subject) => void
}) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState<Subject>(subject)

  if (editing) {
    return (
      <motion.div
        layout
        className="bg-card border border-primary/40 rounded-2xl p-4 flex flex-col gap-3"
      >
        <p className="text-xs font-bold text-primary">تعديل المادة</p>
        <div className="flex flex-col gap-2">
          <label className="text-xs text-muted-foreground font-semibold">الاسم بالإنجليزية</label>
          <input
            dir="ltr"
            className="px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary/40"
            value={form.nameEn}
            onChange={(e) => setForm((f) => ({ ...f, nameEn: e.target.value }))}
          />
          <label className="text-xs text-muted-foreground font-semibold">الاسم بالعربية</label>
          <input
            className="px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary/40"
            value={form.nameAr}
            onChange={(e) => setForm((f) => ({ ...f, nameAr: e.target.value }))}
          />
          <label className="text-xs text-muted-foreground font-semibold">اسم الدكتور</label>
          <input
            className="px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary/40"
            value={form.doctor}
            onChange={(e) => setForm((f) => ({ ...f, doctor: e.target.value }))}
          />
          <label className="text-xs text-muted-foreground font-semibold">
            مسار الصورة{' '}
            <span className="text-muted-foreground/50 font-normal">
              (مثال: /images/subjects/my-subject.png)
            </span>
          </label>
          <input
            dir="ltr"
            className="px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary/40 font-mono"
            value={form.image}
            onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
          />
        </div>
        <div className="flex gap-2 mt-1">
          <button
            onClick={() => { onUpdate(form); setEditing(false) }}
            className="flex-1 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-opacity"
          >
            حفظ
          </button>
          <button
            onClick={() => { setForm(subject); setEditing(false) }}
            className="flex-1 py-2 rounded-xl border border-border text-muted-foreground text-xs font-medium hover:bg-muted/50 transition-colors"
          >
            إلغاء
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      className="group bg-card border border-border rounded-2xl overflow-hidden
        hover:border-primary/30 hover:shadow-lg transition-all duration-300"
    >
      {/* Subject image */}
      <div className="relative w-full aspect-video bg-muted overflow-hidden">
        <Image
          src={subject.image}
          alt={subject.nameEn}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-bold text-foreground text-sm leading-snug line-clamp-2">
          {subject.nameEn}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <GraduationCap className="size-3.5 shrink-0" strokeWidth={1.5} />
          <span>{subject.doctor}</span>
        </div>

        {/* Admin actions */}
        {isAdmin && (
          <div className="flex gap-2 mt-1 pt-2 border-t border-border/50">
            <button
              onClick={() => setEditing(true)}
              className="flex-1 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold
                hover:bg-primary/20 transition-colors"
            >
              تعديل
            </button>
            <button
              onClick={() => onDelete(subject.id)}
              className="flex-1 py-1.5 rounded-lg bg-destructive/10 text-destructive text-xs font-semibold
                hover:bg-destructive/20 transition-colors"
            >
              حذف
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ── Add Subject Form (admin) ──────────────────────────────
function AddSubjectForm({ onAdd }: { onAdd: (s: Subject) => void }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<Omit<Subject, 'id'>>({
    nameEn: '',
    nameAr: '',
    image: '/images/subjects/',
    doctor: 'الدكتورة ياسمين محمد',
  })

  const handleAdd = () => {
    if (!form.nameEn || !form.nameAr) return
    onAdd({ ...form, id: Date.now().toString() })
    setOpen(false)
    setForm({ nameEn: '', nameAr: '', image: '/images/subjects/', doctor: 'الدكتورة ياسمين محمد' })
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-3 rounded-xl border border-dashed border-border
          text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5
          transition-all duration-200 font-medium text-sm w-full justify-center"
      >
        + إضافة مادة جديدة
      </button>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-primary/30 rounded-2xl p-5 flex flex-col gap-4"
    >
      <h4 className="font-bold text-foreground">إضافة مادة جديدة</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-muted-foreground">الاسم بالإنجليزية</label>
          <input
            dir="ltr"
            className="px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary/40"
            value={form.nameEn}
            onChange={(e) => setForm((f) => ({ ...f, nameEn: e.target.value }))}
            placeholder="Course Name"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-muted-foreground">الاسم بالعربية</label>
          <input
            className="px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary/40"
            value={form.nameAr}
            onChange={(e) => setForm((f) => ({ ...f, nameAr: e.target.value }))}
            placeholder="اسم المادة"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-muted-foreground">اسم الدكتور</label>
          <input
            className="px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary/40"
            value={form.doctor}
            onChange={(e) => setForm((f) => ({ ...f, doctor: e.target.value }))}
            placeholder="الدكتورة ياسمين محمد"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-muted-foreground">
            مسار الصورة{' '}
            <span className="text-muted-foreground/50 font-normal text-[10px]">
              (/images/subjects/name.png)
            </span>
          </label>
          <input
            dir="ltr"
            className="px-3 py-2 rounded-lg border border-border bg-background text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary/40"
            value={form.image}
            onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
            placeholder="/images/subjects/name.png"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleAdd}
          className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity"
        >
          إضافة
        </button>
        <button
          onClick={() => setOpen(false)}
          className="flex-1 py-2.5 rounded-xl border border-border text-muted-foreground text-sm font-medium hover:bg-muted/50 transition-colors"
        >
          إلغاء
        </button>
      </div>
    </motion.div>
  )
}

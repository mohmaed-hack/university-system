'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ClipboardList } from 'lucide-react'
import { cn } from '@/lib/utils'

type Tab = 1 | 2

export function SchedulePage() {
  const [activeTab, setActiveTab] = useState<Tab>(1)

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-black text-foreground">اختبارات السنة 2026-2027م</h2>
        <p className="text-muted-foreground text-sm">Exams Schedule — Academic Year 2026-2027</p>
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
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col items-center justify-center py-24 gap-5 text-center"
        >
          <div className="flex items-center justify-center size-20 rounded-2xl bg-muted/60">
            <ClipboardList
              className="size-10 text-muted-foreground/40"
              strokeWidth={1.5}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="text-xl font-black text-foreground">لا يوجد حالياً</p>
            <p className="text-sm text-muted-foreground">
              {activeTab === 1
                ? 'لم يتم نشر جدول اختبارات الترم الأول بعد'
                : 'لم يتم نشر جدول اختبارات الترم الثاني بعد'}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

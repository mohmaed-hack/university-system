'use client'

import { motion } from 'framer-motion'
import { Mail, MessageCircle, ExternalLink } from 'lucide-react'

const CONTACT_EMAIL = 'mohmaedsaeedalli2021@gmail.com'
const CONTACT_WHATSAPP = '+967782136907'
// WhatsApp direct link — strip the leading + for the wa.me URL
const WHATSAPP_URL = `https://wa.me/967782136907`
const MAIL_URL = `mailto:${CONTACT_EMAIL}`

export function SuggestionsPage() {
  return (
    <div className="flex flex-col gap-8 max-w-xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-2 text-center"
      >
        <h2 className="text-3xl font-black text-foreground">الآراء والاقتراحات</h2>
        <p className="text-sm font-medium text-muted-foreground">
          Opinions &amp; Suggestions
        </p>
      </motion.div>

      {/* Welcome text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-card border border-border rounded-2xl p-6"
      >
        <p className="text-base text-foreground/80 leading-relaxed text-center">
          إذا كان لديك أي اقتراح أو ملاحظة أو فكرة تطوير أو واجهت أي مشكلة في الموقع،
          يمكنك التواصل مع مندوب الدفعة عبر وسائل التواصل التالية، وسيتم الرد عليك
          في أقرب وقت ممكن.
        </p>
      </motion.div>

      {/* Contact cards */}
      <div className="flex flex-col gap-4">
        {/* Email card */}
        <motion.a
          href={MAIL_URL}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="group flex items-center gap-5 p-5 bg-card border border-border rounded-2xl
            hover:border-primary/50 hover:shadow-lg hover:scale-[1.02]
            transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          {/* Icon */}
          <div className="flex items-center justify-center size-14 rounded-xl bg-primary/10
            group-hover:bg-primary/15 transition-colors duration-300 shrink-0">
            <Mail className="size-7 text-primary group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
              البريد الإلكتروني
            </p>
            <p
              className="text-base font-bold text-foreground break-all leading-tight group-hover:text-primary transition-colors"
              dir="ltr"
            >
              {CONTACT_EMAIL}
            </p>
          </div>

          {/* Arrow */}
          <ExternalLink
            className="size-4 text-muted-foreground/40 group-hover:text-primary shrink-0
              group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-all duration-200"
          />
        </motion.a>

        {/* WhatsApp card */}
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="group flex items-center gap-5 p-5 bg-card border border-border rounded-2xl
            hover:border-emerald-400/50 hover:shadow-lg hover:scale-[1.02]
            transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
        >
          {/* Icon */}
          <div className="flex items-center justify-center size-14 rounded-xl bg-emerald-500/10
            group-hover:bg-emerald-500/15 transition-colors duration-300 shrink-0">
            <MessageCircle
              className="size-7 text-emerald-500 group-hover:scale-110 transition-transform duration-300"
              strokeWidth={1.5}
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
              واتساب
            </p>
            <p
              className="text-base font-bold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
              dir="ltr"
            >
              {CONTACT_WHATSAPP}
            </p>
          </div>

          {/* Arrow */}
          <ExternalLink
            className="size-4 text-muted-foreground/40 group-hover:text-emerald-500 shrink-0
              group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-all duration-200"
          />
        </motion.a>
      </div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center text-xs text-muted-foreground/60 leading-relaxed"
      >
        جميع الرسائل تُقرأ ويُرد عليها في أقرب وقت ممكن
      </motion.p>
    </div>
  )
}

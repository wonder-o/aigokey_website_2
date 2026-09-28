import { computed } from 'vue'
import { toTraditionalText, useI18n } from '@/composables/useI18n'
import { applicationEmails, applicationMaterials, incentivePlans, type IncentivePlan } from '@/data/incentive-plans'
import { applicationMaterialsEn, incentivePlansEn } from '@/data/incentive-plans-en'

/** Same conversion the i18n copy uses, so plan data follows the language menu too. */
function localizeTraditional<T>(value: T): T {
  if (typeof value === 'string') return toTraditionalText(value) as T
  if (Array.isArray(value)) return value.map((item) => localizeTraditional(item)) as T
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, nested]) => [key, localizeTraditional(nested)])) as T
  }
  return value
}

/**
 * Language-aware access to the incentive program content.
 *
 * UI strings come from `useI18n` (which already derives 繁體中文), while the
 * program content lives in the data files and is switched here so the pages stay
 * in sync with the language menu in the header.
 */
export function useIncentivePlans() {
  const { lang, t } = useI18n()

  const plans = computed<IncentivePlan[]>(() =>
    lang.value === 'en' ? incentivePlansEn : lang.value === 'zh-TW' ? localizeTraditional(incentivePlans) : incentivePlans,
  )

  const materials = computed(() =>
    lang.value === 'en' ? applicationMaterialsEn : lang.value === 'zh-TW' ? localizeTraditional(applicationMaterials) : applicationMaterials,
  )

  const page = computed(() => t.value.incentivePlans)
  const detail = computed(() => t.value.incentivePlanDetail)

  function findPlan(slug: string) {
    return plans.value.find((item) => item.slug === slug)
  }

  function fillTemplate(template: string, plan: IncentivePlan) {
    return template.split('{title}').join(plan.title).split('{duration}').join(plan.duration)
  }

  /** Builds a mailto link whose subject and body follow the current language. */
  function mailto(plan: IncentivePlan, email: string = applicationEmails.join(',')) {
    const mail = t.value.incentivePlans.mail
    const subject = fillTemplate(mail.subject, plan)
    const body = mail.lines.map((line) => fillTemplate(line, plan)).join('\n')
    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return { lang, plans, materials, page, detail, findPlan, mailto, applicationEmails }
}

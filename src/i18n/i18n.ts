import { translations } from './translations'

export type Lang = 'ES' | 'EN'

export function t(key: string, lang: Lang): string {
  return (translations[lang] as Record<string, string>)?.[key] ?? key
}
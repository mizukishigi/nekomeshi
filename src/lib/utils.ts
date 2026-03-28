export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatDateTime(date: Date | string): string {
  return `${formatDate(date)} ${formatTime(date)}`
}

export function formatWeight(kg: number): string {
  return `${kg.toFixed(1)}kg`
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * ひらがな→カタカナ変換
 */
export function hiraganaToKatakana(str: string): string {
  return str.replace(/[\u3041-\u3096]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) + 0x60)
  )
}

/**
 * カタカナ→ひらがな変換
 */
export function katakanaToHiragana(str: string): string {
  return str.replace(/[\u30A1-\u30F6]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0x60)
  )
}

/**
 * 検索クエリをひらがな・カタカナ両方の検索条件に展開
 * スペース区切りでAND検索対応
 */
export function expandSearchQuery(query: string): string[] {
  const trimmed = query.trim()
  if (!trimmed) return []

  // 全角・半角スペースで分割
  const words = trimmed.split(/[\s\u3000]+/).filter(Boolean)

  // 各ワードのカタカナ版を生成
  return words.map((w) => hiraganaToKatakana(w))
}

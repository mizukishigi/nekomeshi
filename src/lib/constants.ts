export const AMOUNT_PRESETS = [25, 50, 80] as const

export const APPETITE_LABELS = [
  '全く食べない',
  '少し食べた',
  'まあまあ',
  'よく食べた',
  '完食!',
] as const

export const STOOL_LABELS = [
  'ゆるゆる',
  'やわらかめ',
  'ちょうどいい',
  'かため',
  'カチカチ',
] as const

export const FOOD_TYPE_LABELS = {
  dry: 'ドライ',
  wet: 'ウェット',
  treat: 'おやつ',
} as const

export const TARGET_AGE_LABELS = {
  kitten: '子猫',
  adult: '成猫',
  senior: 'シニア',
  all_ages: '全年齢',
} as const

export const SEX_LABELS = {
  male: 'オス',
  female: 'メス',
  unknown: '不明',
} as const

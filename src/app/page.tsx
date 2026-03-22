import type { Metadata } from 'next'
import Link from 'next/link'
import { CatEatingIcon, CatFoodIcon, PawIcon } from '@/components/ui/icons'

export const metadata: Metadata = {
  title: 'ねこ飯 — みんなの記録から、うちの子に合うごはんを探そう',
  description:
    '猫のごはん記録・フード検索アプリ。200種以上のキャットフードの評価をチェック。食欲や体調を記録して、うちの子に最適なフードを見つけよう。完全無料。',
  openGraph: {
    title: 'ねこ飯 — 猫のごはん記録・フード検索',
    description: 'みんなの記録から、うちの子に合うごはんを探そう',
    type: 'website',
    images: [
      {
        url: '/ogp-icon.png',
        width: 512,
        height: 512,
        alt: 'ねこ飯',
      },
    ],
  },
  twitter: {
    card: 'summary',
    images: ['/ogp-icon.png'],
  },
}

export default function LandingPage() {
  return (
    <div className="min-h-dvh bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-text-muted/10 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <span
            className="text-2xl font-bold text-primary"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            ねこ飯
          </span>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="flex items-center justify-center rounded-lg px-4 text-sm font-medium text-text-muted hover:text-text"
            >
              ログイン
            </Link>
            <Link
              href="/signup"
              className="flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-primary-light"
            >
              はじめる
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 pb-16 pt-12 text-center">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 flex justify-center text-primary">
            <CatEatingIcon size={160} />
          </div>
          <h1
            className="mb-4 text-5xl font-bold tracking-tight text-primary sm:text-6xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            ねこ飯
          </h1>
          <p className="mb-8 text-lg text-text-muted sm:text-xl">
            みんなの記録から、うちの子に合うごはんを探そう
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/explore"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-base font-bold text-white shadow-md hover:bg-primary-light sm:w-auto"
            >
              <CatFoodIcon size={20} className="text-white" />
              ごはんを探す
            </Link>
            <Link
              href="/signup"
              className="flex w-full items-center justify-center rounded-full border-2 border-primary px-8 py-3 text-base font-bold text-primary hover:bg-primary/5 sm:w-auto"
            >
              アカウント作成
            </Link>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="bg-surface px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2
            className="mb-3 text-center text-2xl font-bold text-text sm:text-3xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            こんなお悩みありませんか？
          </h2>
          <div className="mt-8 space-y-4">
            {[
              'キャットフードの種類が多すぎて、どれがうちの子に合うのかわからない',
              'フードを変えたら食べなくなった...前のフード何だっけ？',
              '「よく食べるフード」と「お腹の調子がいいフード」が違う気がする',
              '病院で「最近何を食べていますか？」と聞かれて、すぐ答えられない',
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3 rounded-2xl border border-text-muted/10 bg-background p-4">
                <span className="mt-0.5 shrink-0 text-primary font-bold">?</span>
                <p className="text-sm leading-relaxed text-text">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-base font-bold text-primary" style={{ fontFamily: 'var(--font-display)' }}>
            ねこ飯が、全部解決します。
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2
            className="mb-10 text-center text-2xl font-bold text-text sm:text-3xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            ねこ飯でできること
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-text-muted/10 bg-surface p-6 text-center h-full">
              <div className="mb-4 flex justify-center text-primary h-12 items-center">
                <CatFoodIcon size={48} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-text">ごはんを探す</h3>
              <p className="text-sm leading-relaxed text-text-muted">
                みんなの評価から、うちの子に合うフードが見つかる
              </p>
            </div>
            <div className="rounded-2xl border border-text-muted/10 bg-surface p-6 text-center h-full">
              <div className="mb-4 flex justify-center text-primary h-12 items-center">
                <PawIcon size={48} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-text">かんたん記録</h3>
              <p className="text-sm leading-relaxed text-text-muted">
                毎日のごはんをワンタップで記録。食欲や体調も
              </p>
            </div>
            <div className="rounded-2xl border border-text-muted/10 bg-surface p-6 text-center h-full">
              <div className="mb-4 flex justify-center text-primary h-12 items-center">
                <CatEatingIcon size={48} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-text">
                うちの子の傾向
              </h3>
              <p className="text-sm leading-relaxed text-text-muted">
                どのフードが合っているか、一目でわかる
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2
            className="mb-10 text-center text-2xl font-bold text-text sm:text-3xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            つかいかた
          </h2>
          <div className="flex flex-col gap-8">
            {[
              {
                step: '1',
                title: '猫を登録する',
                description:
                  '名前や猫種、年齢を登録。複数の猫も管理できます。',
              },
              {
                step: '2',
                title: 'ごはんを記録する',
                description:
                  '食べたフード・量・食欲・うんちの状態をかんたんに記録。',
              },
              {
                step: '3',
                title: '最適なフードを見つける',
                description:
                  'みんなのデータから、うちの子に合うフードがわかります。',
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text">{item.title}</h3>
                  <p className="mt-1 text-sm text-text-muted">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="bg-surface px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p
                className="text-3xl font-bold text-primary sm:text-4xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                200+
              </p>
              <p className="mt-1 text-xs text-text-muted sm:text-sm">
                キャットフード
              </p>
            </div>
            <div>
              <p
                className="text-3xl font-bold text-primary sm:text-4xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                12
              </p>
              <p className="mt-1 text-xs text-text-muted sm:text-sm">
                ブランド対応
              </p>
            </div>
            <div>
              <p
                className="text-3xl font-bold text-primary sm:text-4xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                無料
              </p>
              <p className="mt-1 text-xs text-text-muted sm:text-sm">
                完全無料で利用可能
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-4 py-16 text-center">
        <div className="mx-auto max-w-lg">
          <h2
            className="mb-4 text-2xl font-bold text-text sm:text-3xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            今すぐ始めよう
          </h2>
          <p className="mb-6 text-text-muted">
            愛猫のごはんを記録して、最適なフードを見つけましょう
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-base font-bold text-white shadow-md hover:bg-primary-light"
          >
            無料ではじめる
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-text-muted/10 bg-surface px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-6 text-sm text-text-muted">
            <Link href="/privacy" className="hover:text-text">
              プライバシーポリシー
            </Link>
            <Link href="/terms" className="hover:text-text">
              利用規約
            </Link>
            <a
              href="https://forms.gle/vmvnxkkaLQUEVdjZ8"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text"
            >
              お問い合わせ
            </a>
          </div>
          <p className="text-center text-xs text-text-muted">
            &copy; 2026 ねこ飯. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

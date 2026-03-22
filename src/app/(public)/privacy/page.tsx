import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'プライバシーポリシー | ねこ飯',
  description: 'ねこ飯のプライバシーポリシーについて',
}

export default function PrivacyPolicyPage() {
  return (
    <article>
      <h1
        className="mb-2 text-3xl font-bold text-text sm:text-4xl"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        プライバシーポリシー
      </h1>
      <p className="mb-10 text-sm text-text-muted">最終更新日: 2026年3月22日</p>

      <p className="mb-8 leading-relaxed text-text">
        ねこ飯（以下「本サービス」）は、ユーザーの個人情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。
      </p>

      <section className="mb-8">
        <h2
          className="mb-3 text-xl font-bold text-text"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          1. 個人情報の収集
        </h2>
        <p className="leading-relaxed text-text">
          本サービスでは、以下の情報を収集します。
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-text">
          <li>メールアドレス（アカウント作成時）</li>
          <li>猫のプロフィール情報（名前、猫種、年齢、体重など）</li>
          <li>給餌記録・評価データ（フード名、量、食欲、うんちの状態など）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2
          className="mb-3 text-xl font-bold text-text"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          2. 個人情報の利用目的
        </h2>
        <p className="leading-relaxed text-text">
          収集した個人情報は、以下の目的で利用します。
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-text">
          <li>サービスの提供・改善</li>
          <li>フード統計の集計（個人を特定しない形で公開）</li>
          <li>お問い合わせ対応</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2
          className="mb-3 text-xl font-bold text-text"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          3. 第三者への提供
        </h2>
        <p className="leading-relaxed text-text">
          本サービスは、ユーザーの個人情報を原則として第三者に提供しません。ただし、以下の場合を除きます。
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-text">
          <li>法令に基づく場合</li>
          <li>ユーザーの同意がある場合</li>
          <li>人の生命・身体・財産の保護のために必要な場合</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2
          className="mb-3 text-xl font-bold text-text"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          4. 外部サービスの利用
        </h2>
        <p className="leading-relaxed text-text">
          本サービスでは、以下の外部サービスを利用しています。各サービスのプライバシーポリシーについては、それぞれの提供元をご確認ください。
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-text">
          <li>Supabase（データベース・認証基盤）</li>
          <li>Google Analytics（アクセス解析）</li>
          <li>Google OAuth（ログイン認証）</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2
          className="mb-3 text-xl font-bold text-text"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          5. Cookie について
        </h2>
        <p className="leading-relaxed text-text">
          本サービスでは、セッション管理のためにCookieを使用します。また、Google
          Analyticsがアクセス解析のためにCookieを使用します。ブラウザの設定によりCookieを無効にすることが可能ですが、その場合、本サービスの一部機能がご利用いただけなくなる場合があります。
        </p>
      </section>

      <section className="mb-8">
        <h2
          className="mb-3 text-xl font-bold text-text"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          6. データの管理
        </h2>
        <p className="leading-relaxed text-text">
          ユーザーは、アカウントを削除することにより、本サービスに保存されたデータを削除することができます。アカウント削除後、関連するデータは速やかに削除されます。
        </p>
      </section>

      <section className="mb-8">
        <h2
          className="mb-3 text-xl font-bold text-text"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          7. 改定
        </h2>
        <p className="leading-relaxed text-text">
          本ポリシーは、必要に応じて予告なく変更する場合があります。変更後のプライバシーポリシーは、本ページに掲載した時点から効力を生じるものとします。
        </p>
      </section>

      <section className="mb-8">
        <h2
          className="mb-3 text-xl font-bold text-text"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          8. お問い合わせ
        </h2>
        <p className="leading-relaxed text-text">
          本ポリシーに関するお問い合わせは、以下よりお願いいたします。
        </p>
        <p className="mt-3">
          メール: <a href="mailto:nekomeshi.admin@gmail.com" className="font-medium text-primary hover:underline">nekomeshi.admin@gmail.com</a>
        </p>
        <p className="mt-2">
          <a
            href="https://forms.gle/vmvnxkkaLQUEVdjZ8"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline"
          >
            お問い合わせフォーム
          </a>
        </p>
      </section>
    </article>
  )
}

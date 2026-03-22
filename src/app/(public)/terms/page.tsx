import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '利用規約 | ねこ飯',
  description: 'ねこ飯の利用規約について',
}

export default function TermsOfServicePage() {
  return (
    <article>
      <h1
        className="mb-2 text-3xl font-bold text-text sm:text-4xl"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        利用規約
      </h1>
      <p className="mb-10 text-sm text-text-muted">最終更新日: 2026年3月22日</p>

      <p className="mb-8 leading-relaxed text-text">
        この利用規約（以下「本規約」）は、ねこ飯（以下「本サービス」）の利用条件を定めるものです。ユーザーの皆様には、本規約に同意のうえ、本サービスをご利用いただきます。
      </p>

      <section className="mb-8">
        <h2
          className="mb-3 text-xl font-bold text-text"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          1. サービスの概要
        </h2>
        <p className="leading-relaxed text-text">
          ねこ飯は、猫のごはん記録・フード検索サービスです。ユーザーは猫の給餌記録を登録し、他のユーザーの記録を参考にフードを選ぶことができます。
        </p>
      </section>

      <section className="mb-8">
        <h2
          className="mb-3 text-xl font-bold text-text"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          2. アカウント
        </h2>
        <p className="leading-relaxed text-text">
          ユーザーは、正確な情報を登録する義務があります。アカウントの管理責任はユーザーにあり、第三者による不正利用について本サービスは責任を負いません。アカウント情報に変更があった場合は、速やかに更新してください。
        </p>
      </section>

      <section className="mb-8">
        <h2
          className="mb-3 text-xl font-bold text-text"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          3. 禁止事項
        </h2>
        <p className="mb-3 leading-relaxed text-text">
          ユーザーは、以下の行為を行ってはなりません。
        </p>
        <ul className="list-disc space-y-1 pl-6 text-text">
          <li>虚偽の情報を登録する行為</li>
          <li>不正アクセスまたはそれを試みる行為</li>
          <li>他のユーザーへの迷惑行為、嫌がらせ</li>
          <li>本サービスの運営を妨害する行為</li>
          <li>商業目的での無断利用</li>
          <li>法令または公序良俗に反する行為</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2
          className="mb-3 text-xl font-bold text-text"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          4. 免責事項
        </h2>
        <ul className="list-disc space-y-2 pl-6 text-text">
          <li>
            本サービスに掲載されるフードの評価は、利用者の主観に基づくものであり、正確性を保証するものではありません。
          </li>
          <li>
            本サービスの情報は獣医師の診断や医学的助言に代わるものではありません。猫の健康に関する判断は、必ず獣医師にご相談ください。
          </li>
          <li>
            本サービスは、サーバーの障害、メンテナンス等により、予告なくサービスを中断または変更する場合があります。これによりユーザーに生じた損害について、本サービスは責任を負いません。
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2
          className="mb-3 text-xl font-bold text-text"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          5. 知的財産権
        </h2>
        <p className="leading-relaxed text-text">
          本サービスに関するコンテンツ（テキスト、画像、デザイン、ロゴ等）の著作権およびその他の知的財産権は、運営者に帰属します。ユーザーが投稿した記録データについては、統計情報として匿名化した形で利用する場合があります。
        </p>
      </section>

      <section className="mb-8">
        <h2
          className="mb-3 text-xl font-bold text-text"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          6. 規約の変更
        </h2>
        <p className="leading-relaxed text-text">
          本規約は、必要に応じて予告なく変更する場合があります。変更後の規約は、本ページに掲載した時点から効力を生じるものとします。変更後も本サービスを利用した場合、ユーザーは変更後の規約に同意したものとみなします。
        </p>
      </section>

      <section className="mb-8">
        <h2
          className="mb-3 text-xl font-bold text-text"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          7. 準拠法
        </h2>
        <p className="leading-relaxed text-text">
          本規約は日本法に基づいて解釈されます。
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
          本規約に関するお問い合わせは、以下よりお願いいたします。
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

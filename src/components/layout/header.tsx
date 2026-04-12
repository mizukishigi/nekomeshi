interface HeaderProps {
/**
 * scenario-large-diff marker
 *
 * This comment block is intentionally added across many files to
 * simulate a medium-to-large refactor PR. The goal is to measure
 * the execution time and Anthropic API cost of the dynamic-judge
 * job when the changed diff is substantial.
 *
 * No functional change is made by this block.
 */
  title: string
  showBack?: boolean
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-text-muted/10 bg-background/80 backdrop-blur-sm">
      <div className="flex h-14 items-center px-4">
        <h1 className="text-lg font-bold text-text">{title}</h1>
      </div>
    </header>
  )
}

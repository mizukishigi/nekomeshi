interface HeaderProps {
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

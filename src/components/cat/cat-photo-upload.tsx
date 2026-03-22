'use client'

import { createClient } from '@/lib/supabase/client'
import { useRef, useState } from 'react'

interface CatPhotoUploadProps {
  currentUrl?: string | null
  catId?: string
  onChange: (url: string) => void
}

export function CatPhotoUpload({ currentUrl, catId, onChange }: CatPhotoUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentUrl ?? null)
  const [isUploading, setIsUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Show preview immediately
    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)

    setIsUploading(true)
    try {
      const supabase = createClient()

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        console.error('Not authenticated')
        setPreviewUrl(currentUrl ?? null)
        return
      }

      const ext = file.name.split('.').pop() ?? 'jpg'
      const fileId = catId ?? crypto.randomUUID()
      const path = `${user.id}/${fileId}.${ext}`

      const { error } = await supabase.storage
        .from('cat-photos')
        .upload(path, file, { upsert: true })

      if (error) {
        console.error('Upload error:', error.message)
        setPreviewUrl(currentUrl ?? null)
        return
      }

      const { data: publicUrlData } = supabase.storage
        .from('cat-photos')
        .getPublicUrl(path)

      // Append timestamp to bust cache
      const publicUrl = `${publicUrlData.publicUrl}?t=${Date.now()}`
      setPreviewUrl(publicUrl)
      onChange(publicUrl)
    } catch (err) {
      console.error('Upload failed:', err)
      setPreviewUrl(currentUrl ?? null)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-dashed border-text-muted/30 hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
        disabled={isUploading}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="猫の写真"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-primary/10 text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </div>
        )}
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </div>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <span className="text-xs text-text-muted">
        {isUploading ? 'アップロード中...' : '写真を設定'}
      </span>
    </div>
  )
}

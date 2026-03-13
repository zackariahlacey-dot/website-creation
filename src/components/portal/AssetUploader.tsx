'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { FileUp, Loader2, CheckCircle2 } from 'lucide-react'

export function AssetUploader({ projectId, userId }: { projectId: string, userId: string }) {
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const supabase = createClient()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      setMessage(null)

      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('You must select a file to upload.')
      }

      const file = e.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${userId}/${projectId}/${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('project-assets')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      setMessage('Asset synchronized successfully.')
    } catch (error: any) {
      setMessage(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="relative">
      <label className={`flex items-center justify-center gap-2 py-4 bg-zinc-900 text-white rounded-2xl transition-all cursor-pointer hover:bg-zinc-800 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
        {uploading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <FileUp className="w-4 h-4" />
        )}
        <span className="text-sm font-medium">{uploading ? 'Synchronizing...' : 'Upload Asset'}</span>
        <input
          type="file"
          className="hidden"
          onChange={handleUpload}
          disabled={uploading}
        />
      </label>
      {message && (
        <p className="absolute -bottom-6 left-0 right-0 text-center text-[10px] font-bold text-violet-400 uppercase tracking-widest">
          {message}
        </p>
      )}
    </div>
  )
}

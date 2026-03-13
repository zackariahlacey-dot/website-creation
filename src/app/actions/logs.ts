'use server'

import { createAdminClient } from '@/utils/supabase/admin'

export async function logSystemEvent(level: 'info' | 'warning' | 'critical', event: string, details?: any) {
  const supabase = createAdminClient()
  
  await supabase.from('system_logs').insert({
    level,
    event,
    details
  })
}

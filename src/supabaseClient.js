import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://esmmmwruuznzzvcpijak.supabase.co"
const supabaseAnonKey = "sb_publishable_s5oGgP2UimHkg1NwYxa0vQ_QTSvo8uj"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
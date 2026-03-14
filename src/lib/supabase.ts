import { createClient } from '@supabase/supabase-js'

// 1. Your unique Supabase URL built using your project ID
const supabaseUrl = 'https://fxgqyccuoqhrlbmuzbqn.supabase.co'

// 2. Paste your anon key here inside the quotes!
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4Z3F5Y2N1b3FocmxibXV6YnFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0NzcxMDUsImV4cCI6MjA4OTA1MzEwNX0.2g8rR1V6M_FqauIg4E_FESRBz8SOVXd_-CW27wNrQ60'

// 3. This creates the actual client that Products.tsx is looking for
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

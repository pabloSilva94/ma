import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://btnselmzyklnfgqddykk.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0bnNlbG16eWtsbmZncWRkeWtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU4OTEzNzAsImV4cCI6MjAyMTQ2NzM3MH0.2qq_70GJh958FWHSS3qUCfcmCGqsdygJztpf6WlYXok"
export const supabase = createClient(supabaseUrl, supabaseKey);

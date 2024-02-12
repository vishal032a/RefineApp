import 'react-dotenv'
import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://smxdjiycovhzdnckxcay.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNteGRqaXljb3ZoemRuY2t4Y2F5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYwMTg5NDYsImV4cCI6MjAyMTU5NDk0Nn0.u6k0qtAmgA-18imb3SOZT6KCNOxhW8as6wB6sjPQqPM"

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

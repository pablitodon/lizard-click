import { createClient } from "@supabase/supabase-js";
// sb = 4nkfJ34FUwqti8pr
const SUPABASE_URL = "https://syylriflxackocttesjz.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5eWxyaWZseGFja29jdHRlc2p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMDI4MDMsImV4cCI6MjA1OTc3ODgwM30.JtCyM0YRXYj_f9gQuRW4PY1J2FlSy6hM_bhjpyJExpY";

const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
export default supabase;

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
"https://kqhpimjtfpbiqxqhhwik.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxaHBpbWp0ZnBiaXF4cWhod2lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4OTIzMTQsImV4cCI6MjA2NzQ2ODMxNH0.wOCHpI4dHbUuVqpkdr6i3F1nCwhJSR4acofkJRoLlr4"
);

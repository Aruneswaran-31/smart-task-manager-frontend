import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://swchfsosoanrwdzetsog.supabase.co";

const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3Y2hmc29zb2FucndkemV0c29nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExNDYyNDAsImV4cCI6MjA4NjcyMjI0MH0.VkiYVLyMheJB3SR8M1s63IQqcU4bZ4o2kkcJPb7D0Gc";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

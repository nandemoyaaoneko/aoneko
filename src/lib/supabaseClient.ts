/// <reference lib="dom" />

// Extend the global ImportMeta interface for Deno compiler
declare global {
  interface ImportMetaEnv {
    readonly VITE_SUPABASE_URL?: string;
    readonly VITE_SUPABASE_ANON_KEY?: string;
    readonly [key: string]: string | undefined;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.0";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ivbtpcxzyxrhevxoyqlh.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_XDbeCrXHYHfNidJ3hrAM-g_aWXiEwU9';

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
      },
    })
  : null;

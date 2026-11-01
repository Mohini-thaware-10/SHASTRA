import { createServerClient, type StandardRequestHeaders } from "@supabase/ssr";
import type { Database } from "../types/supabase";

export const supabaseServer = createServerClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookies: {
      get(name: string) {
        if (typeof document === "undefined") {
          return undefined;
        }
        const value = document.cookie
          .split("; ")
          .find((row) => row.startsWith(`${name}=`));
        return row ? row.split("=")[1] : undefined;
      },
      set(name: string, value: string, options: StandardRequestHeaders["headers"]) {
        if (typeof document === "undefined") {
          return;
        }
        document.cookie = `${name}=${value};path=/;max-age=${options.maxAge ?? 60 * 60 * 24 * 365}`;
      },
      remove(name: string, options: StandardRequestHeaders["headers"]) {
        if (typeof document === "undefined") {
          return;
        }
        document.cookie = `${name}=;path=/;max-age=0`;
      },
    },
  }
);
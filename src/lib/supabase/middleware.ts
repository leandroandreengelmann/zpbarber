import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/lib/database.types";

const PUBLIC_PATHS = ["/", "/auth/login", "/auth/callback", "/colors"];
const PROTECTED_PREFIXES = ["/admin", "/app"];

const isPublic = (path: string) => {
  if (PUBLIC_PATHS.includes(path)) return true;
  if (path.startsWith("/_next")) return true;
  if (path.startsWith("/favicon")) return true;
  if (path.startsWith("/api/public")) return true;
  if (path.startsWith("/auth/")) return true;
  if (PROTECTED_PREFIXES.some((p) => path === p || path.startsWith(p + "/"))) return false;
  return true;
};

export async function updateSession(request: NextRequest) {
  request.headers.set("x-pathname", request.nextUrl.pathname);
  let response = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  if (!user && !isPublic(path)) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("next", path);
    return NextResponse.redirect(url);
  }

  return response;
}

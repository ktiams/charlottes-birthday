const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const cronSecret = process.env.CRON_SECRET;

interface ApiRequest {
  method?: string;
  headers: {
    authorization?: string;
  };
}

interface ApiResponse {
  setHeader(name: string, value: string): void;
  status(statusCode: number): {
    json(body: unknown): void;
    end(): void;
  };
}

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.setHeader("Allow", "GET, HEAD");
    return response.status(405).json({ ok: false, error: "Method not allowed" });
  }

  if (cronSecret && request.headers.authorization !== `Bearer ${cronSecret}`) {
    return response.status(401).json({ ok: false, error: "Unauthorized" });
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    return response.status(500).json({ ok: false, error: "Missing Supabase environment variables" });
  }

  const healthUrl = new URL("/rest/v1/rsvps", supabaseUrl);
  healthUrl.searchParams.set("select", "id");
  healthUrl.searchParams.set("limit", "1");

  try {
    const supabaseResponse = await fetch(healthUrl, {
      method: "GET",
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
    });

    if (!supabaseResponse.ok) {
      const errorText = await supabaseResponse.text();
      return response.status(502).json({
        ok: false,
        status: supabaseResponse.status,
        error: errorText || supabaseResponse.statusText,
      });
    }

    if (request.method === "HEAD") {
      return response.status(204).end();
    }

    return response.status(200).json({
      ok: true,
      checkedAt: new Date().toISOString(),
    });
  } catch (error) {
    return response.status(502).json({
      ok: false,
      error: error instanceof Error ? error.message : "Unable to reach Supabase",
    });
  }
}

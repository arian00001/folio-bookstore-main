// Runtime bindings.
// On Cloudflare Workers the platform injects `env`; on other hosts (Vercel, Node)
// we fall back to `process.env`. Reading lazily keeps bindings per-request.
const source = () => ((globalThis as any).__env__ ?? (globalThis as any).env ?? (typeof process !== "undefined" ? process.env : {})) as Record<string, any>;

export const env = new Proxy({} as Record<string, any>, {
  get: (_target, key) => source()[key as string],
  has: (_target, key) => key in source(),
});

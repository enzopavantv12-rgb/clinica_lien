import { llmsResumo } from '@/lib/llms';

// Gerado no build a partir do content.ts; sai como out/llms.txt no export.
export const dynamic = 'force-static';

export function GET() {
  return new Response(llmsResumo(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

import { llmsCompleto } from '@/lib/llms';

// Gerado no build a partir do content.ts; sai como out/llms-full.txt no export.
export const dynamic = 'force-static';

export function GET() {
  return new Response(llmsCompleto(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

/**
 * Minimalist Type definitions mimicking serverless request/response boundaries.
 * This bypasses strict frontend tsconfig omissions without polluting global scopes.
 */
interface SafeApiRequest {
  method?: string;
  body?: {
    message?: string;
  };
}

interface SafeApiResponse {
  statusCode?: number;
  setHeader: (name: string, value: string) => void;
  end: (chunk: string) => void;
}

/**
 * Serverless API handler for secure Telegram message dispatch.
 * Fully optimized for Vercel environments using native body-parser pipelines.
 */
export default async function handler(req: SafeApiRequest, res: SafeApiResponse) {
  // 1. Enforce strict HTTP POST protocol security boundaries
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }

  // 2. Safely capture execution environmental arrays from global environment scope
  const executionEnv = (globalThis as unknown as { process?: { env?: Record<string, string> } }).process?.env || {};
  const botToken = executionEnv.TELEGRAM_BOT_TOKEN;
  const chatId = executionEnv.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Missing Telegram configuration environment variables');
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Internal gateway error: Misconfigured environment' }));
  }

  try {
    // 3. Extract payload properties directly from Vercel's auto-parsed body dictionary
    const orderMessage = req.body?.message;

    // Strict defensive validation check
    if (!orderMessage || typeof orderMessage !== 'string' || orderMessage.trim() === '') {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ error: 'Invalid or empty order payload' }));
    }

    // 4. Execute secure proxy transaction forward into Telegram Bot API gateways
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: orderMessage,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Telegram endpoint reject logs:', errorData);
      res.statusCode = 502;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ error: 'Telegram gateway rejected dispatch sequence' }));
    }

    // 5. Successful transmission status return loop
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ success: true }));

  } catch (err) {
    console.error('Checkout API failure runtime crash:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Internal gateway error' }));
  }
}
import type { IncomingMessage, ServerResponse } from 'http';

/**
 * Serverless API handler for secure Telegram message dispatch.
 * Implements strict defensive validation and secure environment context management.
 */
export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }

  try {
    let body = '';
    await new Promise<void>((resolve) => {
      req.on('data', (chunk) => { body += chunk; });
      req.on('end', () => { resolve(); });
    });

    // 1. Defensive Validation Guard
    let parsedData;
    try {
      parsedData = JSON.parse(body);
    } catch (e) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ error: "Invalid JSON payload" }));
    }

    if (!parsedData || typeof parsedData.message !== 'string' || parsedData.message.trim() === '') {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ error: "Invalid or empty order payload" }));
    }

    // 2. Secure Server-Side Context Verification
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Missing Telegram configuration environment variables');
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ error: 'Internal gateway error' }));
    }

    // 3. Secure Dispatch via Telegram Gateway
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: parsedData.message,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram API error:', errorData);
      throw new Error('Telegram gateway rejected dispatch');
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ success: true }));

  } catch (err) {
    console.error('Checkout API failure:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Internal gateway error' }));
  }
}

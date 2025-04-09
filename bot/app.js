import { Telegraf, Markup } from "telegraf";
import http from "http";

const token = process.env.TOKEN;
const webAppUrl = process.env.WEB_APP_URL;
const port = process.env.PORT || 3000;

const bot = new Telegraf(token);

// Обработчик команды /start
bot.command("start", (context) => {
  context.reply(
    "Welcome to the Lizzard Clicker! Press to start App",
    Markup.inlineKeyboard([
      Markup.button.webApp(
        "Open mini App",
        `${webAppUrl}?ref=${context.from.id}`
      ),
    ])
  );
});

// В production используем webhook
if (process.env.NODE_ENV === "production") {
  // Создаем HTTP сервер
  const server = http.createServer((req, res) => {
    // Health check endpoint
    if (req.url === "/" && req.method === "GET") {
      res.writeHead(200);
      return res.end("Bot is running");
    }

    // Обработка других запросов
    res.writeHead(404);
    res.end();
  });

  // Настраиваем вебхук
  bot.telegram.setWebhook(`${process.env.RENDER_EXTERNAL_URL}/webhook`);

  // Привязываем обработчик Telegraf к серверу
  bot.webhookCallback("/webhook")(server);

  // Запускаем сервер
  server.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
  });
} else {
  // В development используем polling
  bot.launch();
  console.log("Bot started in development mode (polling)");
}

// Обработка сигналов завершения
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

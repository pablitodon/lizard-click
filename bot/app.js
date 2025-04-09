import { Telegraf, Markup } from "telegraf";
import express from "express";

const token = process.env.TOKEN;
const webAppUrl = process.env.WEB_APP_URL;
const port = process.env.PORT || 3000;

const bot = new Telegraf(token);
const app = express();

// Middleware для парсинга JSON
app.use(express.json());

// Обработчик команды /start
bot.command("start", (ctx) => {
  ctx.reply(
    "Welcome to the Lizard Clicker! Press to start App",
    Markup.inlineKeyboard([
      Markup.button.webApp("Open mini App", `${webAppUrl}?ref=${ctx.from.id}`),
    ])
  );
});

// В production используем webhook
if (process.env.NODE_ENV === "production") {
  // Проверка работоспособности
  app.get("/", (req, res) => {
    res.status(200).send("Bot is running");
  });

  // Настраиваем вебхук
  bot.telegram.setWebhook(`${process.env.RENDER_EXTERNAL_URL}/webhook`);

  // Обработчик вебхука
  app.post("/webhook", (req, res) => {
    return bot.webhookCallback("/webhook")(req, res);
  });

  // Запускаем сервер
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
    console.log(`Webhook URL: ${process.env.RENDER_EXTERNAL_URL}/webhook`);
  });
} else {
  // В development используем polling
  bot.launch();
  console.log("Bot started in development mode (polling)");
}

// Обработка сигналов завершения
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

import { Telegraf, Markup } from "telegraf";
import { createServer } from "http";

const token = process.env.TOKEN;
const webAppUrl = process.env.WEB_APP_URL;
const PORT = 3000;

const bot = new Telegraf(token);

bot.command("start", (context) => {
  context.reply(
    "Welcome to the Lizzard Clicker!Press to start App",
    Markup.inlineKeyboard([
      Markup.button.webApp(
        "Open mini App",
        `${webAppUrl}?ref=${context.from.id}`
      ),
    ])
  );
});

bot.launch();

// Минимальный HTTP-сервер для Render
createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Bot is running");
}).listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  bot
    .launch()
    .then(() => console.log("Bot started"))
    .catch((err) => console.error("Bot launch failed:", err));
});

// Обработка завершения
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

import express from "express";
import { Telegraf, Markup } from "telegraf";

const token = process.env.TOKEN;
const webAppUrl = process.env.WEB_APP_URL;
const port = process.env.PORT || 3000;

const bot = new Telegraf(token);
const app = express();

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

app.use(bot.webhookCallback("/"));
bot.telegram.setWebhook(`${webAppUrl}`);

app.listen(port);

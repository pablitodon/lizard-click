import { Telegraf, Markup } from "telegraf";

const token = process.env.TOKEN;
const webAppUrl = process.env.WEB_APP_URL;

const bot = new Telegraf(token);

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

bot.launch();

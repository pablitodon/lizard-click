import { Telegraf, Markup } from "telegraf";

const token = "7900908085:AAGf_bRC9hL34acXbuKDBk1Yzifvd8PAgso";
const webAppUrl = "https://lizzard-clicker-2476c.web.app/";

const bot = new Telegraf(token);

bot.command("start", (context) => {
  context.reply(
    "Welcome to the Lizzard Clicker!Press to start App",
    Markup.inlineKeyboard([
      Markup.button.webApp(
        "Open mini App",
        `${webAppUrl}?ref=${context.payload}`
      ),
    ])
  );
});

bot.launch();

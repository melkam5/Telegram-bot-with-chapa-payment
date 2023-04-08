import { Bot } from "grammy";
require("dotenv/config");

const CHAPA_TOKEN = process.env.PROVIDER_TOKEN;
const BOT_TOKEN = process.env.BOT_TOKEN;

const bot = new Bot(BOT_TOKEN);

bot.command("start", async (ctx) => {
  await ctx.replyWithInvoice(
    "Test Product",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    `${ctx.message?.from.id}-${ctx.me.id}-${
      ctx.message?.message_id
    }-${new Date().toISOString()}`,
    CHAPA_TOKEN,
    "ETB",
    [{ label: "Test Product", amount: 100 * 100 }],
    {
      max_tip_amount: 100 * 100,
      suggested_tip_amounts: [5 * 100, 10 * 100, 25 * 100, 50 * 100],
      photo_url: "https://via.placeholder.com/300/09f/fff.png",
    }
  );
});

bot.on("pre_checkout_query", async (ctx) => {
  await ctx.answerPreCheckoutQuery(true, ctx.preCheckoutQuery.id);
});

bot.on(":successful_payment", async (ctx) => {
  await ctx.reply(
    `We've just received your payment ${
      ctx.message?.successful_payment.total_amount / 100
    } ${
      ctx.message?.successful_payment.currency
    } and wanted to say thank you for choosing our shop.`
  );
});

bot.start();

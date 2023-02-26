const TelegramBot = require('node-telegram-bot-api')
require('dotenv').config()
const token = process.env.TOKEN
const bot = new TelegramBot(token, {polling: true})
const {lotinga,kirillga} = require('./lotinkrill')

let lotinState=0
let krillState=0

bot.on('message', (message)=>{
    const chatId = message.chat.id
    const name = message.chat.first_name
    const username = message.chat.username
    if(message.text=='/start'){
        bot.sendMessage(chatId, `Assalomu Alaykum✋ botimizga🤖 xush kelibsiz! <b>${name}</b> \nBu bot vazifasini bilish uchun /info ni bosing! \nUshbu bot🤖 @akmaloviich1👤 tomonidan yaratildi`,{
            parse_mode:"HTML"
        })
    }
    else if(message.text=='/info'){
        bot.sendMessage(chatId, `Ushbu bot sizga lotin mantlarni krill, krill matnlarni lotin mantga o'girib beradi\n/lotin - lotin matnni krill matnga o'girib beradi\n/krill - krill matnni lotinga matnga o'girib beradi`)
    }
    else if(message.text=='/krill'){
        bot.sendMessage(chatId, 'Krill matn yuboring lotinga o`girib beramiz')
        krillState=1
    }
    else if(message.text=='/lotin'){
        bot.sendMessage(chatId, 'Lotin matn yuboring krillga o`girib beramiz')
        lotinState=1
    }
    else if(krillState==1){
        let krillText = message.text
        let krillConvertortext = lotinga(krillText)
        bot.sendMessage(chatId, krillConvertortext)
    }
    else if(lotinState==1){
        let lotinText = message.text
        let lotinConvertortext = kirillga(lotinText)
        bot.sendMessage(chatId, lotinConvertortext)
    }
})
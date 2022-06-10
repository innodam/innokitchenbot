const TelegramBot = require('node-telegram-bot-api')
const config = require('./config')
const helper = require('./helper')
const keyboard = require('./keyboard')
const kb = require('./keyboard-buttons')
const mysql = require('mysql')

const conn = mysql.createConnection(config)

helper.logStart()


const bot = new TelegramBot(config.TOKEN, {
    polling: true
})

bot.on('message', msg => {
    console.log('Working', msg.from.first_name)

    const chatId = helper.getChatId(msg)

    switch (msg.text){

        //Выбираем ТК готовых блюд
        case kb.home.tk_main:
            bot.sendMessage(chatId, 'Выберите категорию', {
                reply_markup: {keyboard: keyboard.tk_dish}
            })
            break

        //Выбираем ТК заготовок
        case kb.home.tk_zag:
            bot.sendMessage(chatId, 'Выберите категорию:', {
                reply_markup: {keyboard: keyboard.tk_pre}
            })
        break

        //Работаем с табелем
        case kb.home.tabel:
            break
        
        //Возврат на главное меню
        case kb.back:
            bot.sendMessage(chatId, 'Главное меню', {
                reply_markup: {keyboard: keyboard.home}
            })
        break

        //Выбираем поставщика
        case kb.home.req:
            bot.sendMessage(chatId, 'Выберите поставщика', {
                reply_markup: {keyboard: keyboard.req}
            })
            break

        //Выводим список Зельгроса
        case kb.req.zelgros:
            var str= "";
            conn.query("SELECT name FROM ingredients WHERE provider = 'Зельгрос'", function (err, result, fields) {
                if (err) throw err;
                
                for(let i=0; i < result.length; i++){
                    str += result[i].name + '\n'
                }
                bot.sendMessage(chatId, `${str}`)
            })
            break

        //Выводим список Овощников
        case kb.req.veg:
            var str= "";
            conn.query("SELECT name FROM ingredients WHERE provider = 'Овощи'", function (err, result, fields) {
                if (err) throw err;
                
                for(let i=0; i < result.length; i++){
                    str += result[i].name + '\n'
                }
                bot.sendMessage(chatId, `${str}`)
            })
            break

        //Выводим список Метро
        case kb.req.metro:
            var str= "";
            conn.query("SELECT name FROM ingredients WHERE provider = 'Метро' OR provider2 = 'Метро'", function (err, result, fields) {
                if (err) throw err;
                
                for(let i=0; i < result.length; i++){
                    str += result[i].name + '\n'
                }
                bot.sendMessage(chatId, `${str}`)
            })
            break

        //Выводим список Гурман
        case kb.req.gurman:
            var str= "";
            conn.query("SELECT name FROM ingredients WHERE provider = 'Гурман' OR provider2 = 'Гурман'", function (err, result, fields) {
                if (err) throw err;
                
                for(let i=0; i < result.length; i++){
                    str += result[i].name + '\n'
                }
                bot.sendMessage(chatId, `${str}`)
            })
            break
    }
})

bot.onText(/\/start/, msg => {

    const text = `Добро пожаловать, ${msg.from.first_name}\nВыбери команду для начала работы:`

    bot.sendMessage(helper.getChatId(msg), text, {
        reply_markup: {
            keyboard: keyboard.home
        }
    })

})
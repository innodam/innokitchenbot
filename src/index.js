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
    const chatId = helper.getChatId(msg)
    const userName = helper.getUsername(msg)

    console.log('Working', userName)

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

        //Выводим Табель
        case kb.home.tabel:
            if (userName == 'dambas' || userName == 'Marat_Zakirov' || userName == 'x3atynx' || userName == 'johnny_la_bams'){
                console.log('Доступ разрешен')
                const max  = 16;
                var  table = '';
                var sum = 0;
                        
                function get_line(txt, num, max) {
                    var spaces = max - (num.length + txt.length);
                    return txt + ' '.repeat(spaces) + num + '\n';
                }
                function get_line2(txt, num, gsm, max) {
                    var spaces = max - (num.length + txt.length + gsm.length);
                    var halfsp = spaces / 2;
                    return txt + ' '.repeat(halfsp) + num + ' '.repeat(halfsp) + gsm + '\n';
                }
                if (userName == 'dambas'){
                    conn.query("SELECT date, Дамир FROM tabel", function (err, result, fields) {
                        if (err) throw err;
                        
                        table += get_line('Дата', 'Часы', max);
                        for (let i=0; i<result.length; i++){
                            table += get_line(`${result[i].date}`, `${result[i].Дамир}`, max);
                            sum += result[i].Дамир
                        }
                        table += get_line('Итого часов:', `${sum}`, max);
                        bot.sendMessage(chatId, `<pre>${table}</pre>`, {parse_mode: 'HTML'})
                    })
                } else if (userName == 'Marat_Zakirov'){
                    conn.query("SELECT date, Марат, Марат_Гсм FROM tabel", function (err, result, fields) {
                        if (err) throw err;

                        table += get_line2('Дата', 'Часы', 'Гсм', max);
                        for(let i=0; i < result.length; i++){
                            table += get_line2(`${result[i].date}`, `${result[i].Марат}`, `${result[i].Марат_Гсм}`, max);
                            sum += result[i].Марат
                        }
                        table += get_line('Итого часов:', `${sum}`, max);
                        bot.sendMessage(chatId, `<pre>${table}</pre>`, {parse_mode: 'HTML'})
                    })
                } else if (userName == 'x3atynx'){
                    conn.query("SELECT date, Олег, Олег_Гсм FROM tabel", function (err, result, fields) {
                        if (err) throw err;

                        table += get_line2('Дата', 'Часы', 'Гсм', max);
                        for(let i=0; i < result.length; i++){
                            table += get_line2(`${result[i].date}`, `${result[i].Олег}`, `${result[i].Олег_Гсм}`, max);
                            sum += result[i].Олег
                        }
                        table += get_line('Итого часов:', `${sum}`, max);
                        bot.sendMessage(chatId, `<pre>${table}</pre>`, {parse_mode: 'HTML'})
                    })
                } else if (userName == 'johnny_la_bams'){
                    conn.query("SELECT date, Женя FROM tabel", function (err, result, fields) {
                        if (err) throw err;
                        
                        table += get_line('Дата', 'Часы', max);
                        for (let i=0; i<result.length; i++){
                            table += get_line(`${result[i].date}`, `${result[i].Женя}`, max);
                            sum += result[i].Женя
                        }
                        table += get_line('Итого часов:', `${sum}`, max);
                        bot.sendMessage(chatId, `<pre>${table}</pre>`, {parse_mode: 'HTML'})
                    })
            }else {
                bot.sendMessage(chatId, 'Нет доступа')
            }
            break
        }
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
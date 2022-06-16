module.exports = {
    dambas: conn.query("SELECT * FROM dambas", function (err, result, fields) {
        if (err) throw err;
        
        table += get_line('Дата', 'Часы', max);
        for (let i=0; i<result.length; i++){
            table += get_line(`${result[i].ID}`, `${result[i].hours}`, max);
            sum += result[i].hours
        }
        table += get_line('Итого часов:', `${sum}`, max);
        bot.sendMessage(chatId, `<pre>${table}</pre>`, {parse_mode: 'HTML'})
})
}
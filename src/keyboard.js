const kb = require('./keyboard-buttons')

module.exports = {
    home: [
        [kb.home.tk_main, kb.home.tk_zag],
        [kb.home.req, kb.home.tasks],
        [kb.home.tabel]
    ],
    tk_pre: [
        [kb.tk_pre.meat, kb.tk_pre.hot],
        [kb.tk_pre.sauce, kb.tk_pre.snack],
        [kb.back]
    ],
    tk_dish: [
        [kb.tk_dish.burger, kb.tk_dish.hot],
        [kb.tk_dish.snack, kb.tk_dish.salad],
        [kb.back]
    ],
    req: [
        [kb.req.zelgros, kb.req.metro],
        [kb.req.gurman, kb.req.veg],
        [kb.req.hoz],
        [kb.back]
    ]
}
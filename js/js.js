let month_menu = {
    months: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
    dateNow: new Date(),
    dateMonth: new Date().getMonth(),
    domMonth: document.querySelector('.month-menu > .month'),
    domYear: document.querySelector('.month-menu > .year'),
}

function changeDate(e) {
    let np = e.target.dataset.np;

    function setMonth(a) {
        month_menu.domMonth.innerHTML = month_menu.months[a]
        month_menu.domYear.innerHTML = month_menu.dateNow.getFullYear()
    }
    if (np == "n") {
        month_menu.dateNow.setMonth(month_menu.dateMonth += 1)
        setMonth(month_menu.dateNow.getMonth())
        if (month_menu.dateMonth > 11) month_menu.dateMonth = 0;
    } else if (np == "p") {
        month_menu.dateNow.setMonth(month_menu.dateMonth -= 1)
        setMonth(month_menu.dateNow.getMonth())
        if (month_menu.dateMonth < 0) month_menu.dateMonth = 11;
    }

}
month_menu.domMonth.innerHTML = month_menu.months[month_menu.dateMonth]
let month_menu = {
    months: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
    dateNow: new Date(),
    initDate: {},
    domMonth: document.querySelector('.month-menu > .month'),
    domYear: document.querySelector('.month-menu > .year'),
    domTable: document.querySelectorAll('table td'),
}

function init(e) {
    e && e.stopPropagation()
    month_menu.dateMonth = new Date().getMonth();
    month_menu.domMonth.innerHTML = month_menu.months[month_menu.dateMonth]
    month_menu.domYear.innerHTML = month_menu.initDate.y = month_menu.dateNow.getFullYear()
    month_menu.initDate.m = month_menu.dateMonth;
    month_menu.initDate.d = month_menu.dateNow.getDate()
    setMonthTable(month_menu.dateNow.getFullYear(), month_menu.dateMonth)
}

function changeDate(e) {
    let np = e.target.dataset.np;

    function setMonth(a) {
        month_menu.domMonth.innerHTML = month_menu.months[a]
        month_menu.domYear.innerHTML = month_menu.dateNow.getFullYear()
    }

    function setMonthDate() {
        let year = month_menu.dateNow.getFullYear()
        let month = month_menu.dateNow.getMonth();
        setMonth(month)
        setMonthTable(year, month)
    }
    if (np == "n") {
        month_menu.dateNow.setMonth(month_menu.dateMonth += 1)
        // setMonth(month_menu.dateNow.getMonth())
        setMonthDate()
        if (month_menu.dateMonth > 11) month_menu.dateMonth = 0;
    } else if (np == "p") {
        month_menu.dateNow.setMonth(month_menu.dateMonth -= 1)
        // setMonth(month_menu.dateNow.getMonth())
        setMonthDate()
        if (month_menu.dateMonth < 0) month_menu.dateMonth = 11;
    }

}

function setMonthTable(y, m) {

    function getMonthDate(d) {
        return new Date(y, m, d)
    }

    function getToday() {
        let ob = month_menu.initDate;
        if (ob.y == y && ob.m == m) return ob.d
    }
    if (!getToday()) {
        month_menu.initDate.domDate && month_menu.initDate.domDate.classList.remove("bg")
    }
    let weekBegin = 7 - Math.abs(getMonthDate(1).getDay() - 7);
    weekBegin = weekBegin > 0 ? weekBegin - 1 : 6;
    let next = 1;
    for (let i = weekBegin; i < month_menu.domTable.length; i++) {
        let el = month_menu.domTable[i].querySelector(".week-day");
        let d = getMonthDate(next++).getDate();
        if (d == getToday()) {
            month_menu.initDate.domDate = month_menu.domTable[i];
            month_menu.initDate.domDate.classList.add("bg")
        }
        el.innerHTML = d;
    }
    let prev = 0;
    for (let i = weekBegin - 1; i >= 0; i--) {
        let el = month_menu.domTable[i].querySelector(".week-day");
        el.innerHTML = getMonthDate(prev--).getDate()
    }

}

init()
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
    document.body.addEventListener("click", ttDel)
}

function setMonthDate() {
    function setMonth(a) {
        month_menu.domMonth.innerHTML = month_menu.months[a]
        month_menu.domYear.innerHTML = month_menu.dateNow.getFullYear()
    }
    let year = month_menu.dateNow.getFullYear()
    let month = month_menu.dateNow.getMonth();
    setMonth(month)
    setMonthTable(year, month)
}

function changeDate(e) {
    let np = e.target.dataset.np;
    if (np == "n") {
        month_menu.dateNow.setMonth(month_menu.dateMonth += 1)
        setMonthDate()
        if (month_menu.dateMonth > 11) month_menu.dateMonth = 0;
    } else if (np == "p") {
        month_menu.dateNow.setMonth(month_menu.dateMonth -= 1)
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

    function setDataDay(ob) {
        let m = ob.getMonth();
        m++;
        m = (m > 9) ? m : "0" + m;
        let d = ob.getDate();
        let y = ob.getFullYear();
        return "" + y + "-" + m + "-" + d;

    }

    function setWeekDayInfo(i, np) {
        let el = month_menu.domTable[i].querySelector(".week-day");
        let elInfo = month_menu.domTable[i].querySelector(".week-day-info");
        let obDate = getMonthDate(np)
        let d = obDate.getDate();
        if (d == getToday()) {
            month_menu.initDate.domDate = month_menu.domTable[i];
            month_menu.initDate.domDate.classList.add("bg")
        }
        el.innerHTML = d;
        elInfo.innerHTML = "";
        elInfo.parentElement.style.backgroundColor = "";
        el.nextElementSibling.dataset.day = setDataDay(obDate);
    }
    if (!getToday()) {
        month_menu.initDate.domDate && month_menu.initDate.domDate.classList.remove("bg")
    }
    let weekBegin = 7 - Math.abs(getMonthDate(1).getDay() - 7);
    weekBegin = weekBegin > 0 ? weekBegin - 1 : 6;
    let next = 1;
    for (let i = weekBegin; i < month_menu.domTable.length; i++) {
        setWeekDayInfo(i, next++)
    }
    let prev = 0;
    for (let i = weekBegin - 1; i >= 0; i--) {
        setWeekDayInfo(i, prev--)
    }
    setDateInfo()

}

function setDateInfo() {
    function setInfo(ob, el) {
        let h = document.createElement('div');
        let d = document.createElement('div');
        h.classList.add("headDateInfo")
        d.classList.add("discriptDateInfo")
        h.innerHTML = ob.header;
        d.innerHTML = ob.people;
        el.append(h)
        el.append(d)
    }

    let tableDate = month_menu.initDate.y + "-" + month_menu.initDate.m;
    let keys = Object.keys(localStorage);
    let el = document.getElementsByTagName("table")[0].querySelectorAll(".week-day-info");
    for (let key of keys) {
        let ob = JSON.parse(localStorage.getItem(key));
        for (let i = 0; i < el.length; i++) {
            if (el[i].dataset.day == key) {
                el[i].parentElement.style.backgroundColor = "rgb(228, 241, 249)";
                setInfo(ob, el[i])
            }

        }

    }
    // localStorage.clear()
}

function update() {
    setMonthDate()
}

function ttDel(e) {
    let et = e.target;
    let tt = et.closest(".tooltip");
    if (toolTip.tt && toolTip.tt != tt && toolTip.turnTarget != et) toolTip.delete()
}

init()
const month_menu = {
    months: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
    domMonth: document.querySelector('.month-menu > .month'),
    domYear: document.querySelector('.month-menu > .year'),
    domTable: document.querySelectorAll('table td'),
}
const mainTime = {
    dateNow: new Date(),
    Month: "",
    initDate: {},
}

function init(e) {
    function ttDel(e) {
        let et = e.target;
        let tt = et.closest(".tooltip");
        if (toolTip.tt && toolTip.tt != tt && toolTip.turnTarget != et) toolTip.delete()
    }
    e && e.stopPropagation()
    mainTime.Month = new Date().getMonth();

    mainTime.initDate.y = new Date().getFullYear();
    mainTime.initDate.m = mainTime.Month;
    mainTime.initDate.d = mainTime.dateNow.getDate();

    month_menu.domMonth.innerHTML = month_menu.months[mainTime.Month]
    month_menu.domYear.innerHTML = mainTime.initDate.y;

    setMonthTable(mainTime.initDate.y, mainTime.Month)
    document.body.addEventListener("click", ttDel)
}

function setMonthDate() {
    let year = mainTime.dateNow.getFullYear()
    let month = mainTime.dateNow.getMonth();
    month_menu.domMonth.innerHTML = month_menu.months[month]
    month_menu.domYear.innerHTML = mainTime.dateNow.getFullYear()
    setMonthTable(year, month)
}

function changeDate(e) {
    let np = e.target.dataset.np;
    if (np == "n") {
        mainTime.dateNow.setMonth(mainTime.Month += 1)
        setMonthDate()
        if (mainTime.Month > 11) mainTime.Month = 0;
    } else if (np == "p") {
        mainTime.dateNow.setMonth(mainTime.Month -= 1)
        setMonthDate()
        if (mainTime.Month < 0) mainTime.Month = 11;
    }

}

function setDataDay(ob) {
    let m = ob.getMonth();
    m++;
    m = (m > 9) ? m : "0" + m;
    let d = ob.getDate();
    let y = ob.getFullYear();
    return "" + y + "-" + m + "-" + d;

}

function setMonthTable(y, m) {

    function getMonthDate(d) {
        return new Date(y, m, d)
    }

    function getToday() {
        let ob = mainTime.initDate;
        if (ob.y == y && ob.m == m) return ob.d
    }



    function setWeekDayInfo(i, np) {
        let el = month_menu.domTable[i].querySelector(".week-day");
        let elInfo = month_menu.domTable[i].querySelector(".week-day-info");
        let obDate = getMonthDate(np)
        let d = obDate.getDate();
        if (d == getToday()) {
            mainTime.initDate.domDate = month_menu.domTable[i];
            mainTime.initDate.domDate.classList.add("bg")
        }
        el.innerHTML = d;
        elInfo.innerHTML = "";
        elInfo.parentElement.style.backgroundColor = "";
        el.nextElementSibling.dataset.day = setDataDay(obDate);
    }
    if (!getToday()) {
        mainTime.initDate.domDate && mainTime.initDate.domDate.classList.remove("bg")
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
}

function update() {
    setMonthDate()
}



init()
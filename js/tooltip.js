let coordsToolTip = {
    scrollHeight: Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    ),
    setStyleArrow(el, st) {
        el.classList.add(st)
    },
    leftTop(el, coords) {
        el.style.left = coords.x + coords.width + 25 + "px";
        el.style.top = coords.y - 40 + pageYOffset + "px";
    },
    leftBottom(el, coords) {
        el.style.left = coords.x + coords.width + 20 + "px";
        el.style.top = coords.y - 170 + pageYOffset + "px";
    },
    rTop(el, coords) {
        el.style.left = coords.x - 370 + "px";
    },
    btnTop(el, coords) {
        el.style.left = coords.x + "px";
        el.style.top = coords.y + 50 + pageYOffset + "px";
    }
}
const toolTip = {
    turnTarget: "",
    tt: "",
    toolData: {
        header: "",
        date: "",
        people: "",
        discription: "",
        autoDate: ""
    },
    delete() {
        toolTip.tt.remove();
        toolTip.turnTarget = "";
        toolTip.tt = "";
    },
    save(e) {
        let et = e.target;
        let tt = et.closest(".inter").querySelectorAll("[data-inp]")
        for (let i = 0; i < tt.length; i++) {
            toolTip.toolData[tt[i].dataset.inp] = tt[i].value;
        }

        function isObFull(ob) {
            for (let i in ob) {
                if (ob[i] && i != "autoDate") return true;
            }
        }
        toolTip.toolData.autoDate = toolTip.turnTarget.dataset.day;
        if (isObFull(toolTip.toolData)) {
            localStorage.setItem(toolTip.turnTarget.dataset.day, JSON.stringify(toolTip.toolData))
        }
    },
    crFunc: {
        crElems(el, c, i) {
            el = document.createElement(el);
            if (c) el.classList.add(c);
            if (i) el.innerHTML = i;
            return el;
        },
        crInput(n, t) {
            n.forEach(i => {
                let el = document.createElement("input");
                if (typeof i == "object") {
                    el.dataset.inp = i.ob;
                    el.placeholder = i.i;
                    if (i.v) el.value = i.v;
                } else {
                    el.placeholder = i;
                }
                t.append(el)
            });
        },
        crBtns(n, t) {
            n.forEach(i => {
                let el = document.createElement("button");
                if (typeof i == "object") {
                    el.innerHTML = i.i;
                    i.c.forEach(f => {
                        el.addEventListener("click", f)
                    });
                } else {
                    el.innerHTML = i;
                }
                t.append(el)
            });
        },
        crDel() {
            let del = document.createElement("div");
            del.classList.add("delToolTip")
            del.onclick = toolTip.delete;
            return del;
        },
        crText(ob) {
            let text = document.createElement("textarea");
            text.placeholder = "Описание";
            text.dataset.inp = "discription";
            if (ob && ob.discription) text.value = ob.discription;
            return text;
        },
        crSearchItem(ob) {
            function setDate(ob) {
                let days = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"]
                let date = new Date(ob).getDate()
                let day = new Date(ob).getDay();
                return date + " " + days[day];
            }
            let item = this.crElems("div", "searchItem");
            let inter = this.crElems("div", "searchItem__Inter")
            let h = this.crElems("div", "", ob.header);
            let d = this.crElems("small", "", ob.date ? ob.date : setDate(ob.autoDate));
            let gradi = this.crElems("div", "gradi")
            inter.append(gradi)
            item.dataset.date = ob.autoDate;
            inter.append(h)
            inter.append(d)
            item.append(inter)
            return item;
        }
    },
    createToolTip(f) {
        let tooltip = this.crFunc.crElems("div", "tooltip")
        let inter = this.crFunc.crElems("div", "inter")
        f(inter)
        tooltip.append(inter)
        document.body.append(tooltip)
        return tooltip
    },
    setCalendar(e) {
        let et = e.target.closest(".week-day-info");
        if (!toolTip.tt && toolTip.turnTarget != et) {
            e.stopPropagation()
            if (et.className == "week-day-info") {
                function CalToolTip(inter, date) {
                    ob = JSON.parse(localStorage.getItem(date));

                    toolTip.crFunc.crInput([{
                        i: "Событие",
                        ob: "header",
                        v: ob && ob.header
                    }, {
                        i: "День, месяц, год",
                        ob: "date",
                        v: ob && ob.date
                    }, {
                        i: "Имена участников",
                        ob: "people",
                        v: ob && ob.people
                    }], inter)
                    inter.append(toolTip.crFunc.crDel())
                    inter.append(toolTip.crFunc.crText(ob))
                    toolTip.crFunc.crBtns([{
                        i: "Готово",
                        c: [toolTip.save, toolTip.delete]
                    }, {
                        i: "Удалить",
                        c: [(e) => {
                            localStorage.removeItem(toolTip.turnTarget.dataset.day)
                        }, toolTip.delete]
                    }], inter)
                }
                toolTip.turnTarget = et;
                let coords = toolTip.turnTarget.getBoundingClientRect()
                toolTip.tt = toolTip.createToolTip((inter) => {
                    CalToolTip(inter, et.dataset.day)
                });
                if ((coords.bottom + pageYOffset) < 900) {
                    coordsToolTip.setStyleArrow(toolTip.tt, "arrowLeft1")
                    coordsToolTip.leftTop(toolTip.tt, coords)
                } else {
                    coordsToolTip.setStyleArrow(toolTip.tt, "arrowLeft2")
                    coordsToolTip.leftBottom(toolTip.tt, coords);
                }
                if ((coords.right + pageXOffset) > 900) {
                    coordsToolTip.setStyleArrow(toolTip.tt, "arrowRight1")
                    coordsToolTip.rTop(toolTip.tt, coords)
                    if ((coords.bottom + pageYOffset) > 900) {
                        coordsToolTip.setStyleArrow(toolTip.tt, "arrowRight2")
                    }
                }
            }
        }
    },
    setAddButton(e) {
        let et = e.target;
        if (!toolTip.tt && toolTip.turnTarget != et) {
            e.stopPropagation()
            et.dataset.day = mainTime.setDataDay(new Date);
            if (et.id == "addBtn") {
                function AddButtonToolTip(inter) {
                    toolTip.crFunc.crInput([{
                        i: "Событие",
                        ob: "header"
                    }], inter)
                    inter.append(toolTip.crFunc.crDel())
                    toolTip.crFunc.crBtns([{
                        i: "Создать",
                        c: [
                            toolTip.save, toolTip.delete
                        ]
                    }], inter)
                }
                toolTip.turnTarget = et;
                let coords = toolTip.turnTarget.getBoundingClientRect()
                toolTip.tt = toolTip.createToolTip(AddButtonToolTip);
                coordsToolTip.setStyleArrow(toolTip.tt, "arrowTop1")
                coordsToolTip.btnTop(toolTip.tt, coords);
            }
        }
    },
    setSearch(e) {
        function search(data) {
            function getData(ob) {
                for (let i in ob) {
                    if (ob[i].match(new RegExp("^" + data, "i")))
                        return true;
                }
            }
            let tt = toolTip.tt.querySelector(".inter");
            tt.innerHTML = "";
            let keys = Object.keys(localStorage);
            for (let key of keys) {
                let ob = JSON.parse(localStorage.getItem(key))
                if (getData(ob)) {
                    tt.append(toolTip.crFunc.crSearchItem(JSON.parse(localStorage.getItem(key))))

                }
            }
        }
        let et = e.target;
        if (!toolTip.tt && toolTip.turnTarget != et) {
            e.stopPropagation()
            if (et.id == "srch") {
                function SearchToolTip(inter) {
                    inter.style.padding = "5px 0";
                    inter.style.paddingLeft = "5px";
                    inter.addEventListener("click", (e) => {
                        let et = e.target.closest(".searchItem")
                        month_menu.dateNow = new Date(et.dataset.date)
                        setMonthDate()
                    })
                    inter.addEventListener("click", toolTip.delete)
                    let keys = Object.keys(localStorage);
                    let num = 0;
                    for (let key of keys) {
                        num++
                        if (num < 20)
                            inter.append(toolTip.crFunc.crSearchItem(JSON.parse(localStorage.getItem(key))))
                    }
                }
                toolTip.turnTarget = et;
                let coords = toolTip.turnTarget.getBoundingClientRect()
                toolTip.tt = toolTip.createToolTip(SearchToolTip);
                et.oninput = function () {
                    search(et.value)
                }
                coordsToolTip.setStyleArrow(toolTip.tt, "arrowTop1")
                coordsToolTip.btnTop(toolTip.tt, coords);
            }
        }
    }
}
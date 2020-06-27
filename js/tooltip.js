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
        discription: ""
    },
    crFunc: {
        crInput(n, t) {
            n.forEach(i => {
                let el = document.createElement("input");
                if (typeof i == "object") {
                    el.dataset.inp = i.ob;
                    el.placeholder = i.i;
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
                    el.addEventListener("click", i.c)
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
        crText() {
            let text = document.createElement("textarea");
            text.placeholder = "Описание";
            text.dataset.inp = "discription";
            return text;
        },
        crSearchItem(ob) {
            console.log(ob);
            let item = document.createElement('div');
            let inter = document.createElement('div');
            let h = document.createElement('div');
            let d = document.createElement('small');
            let gradi = document.createElement('div');
            gradi.classList.add("gradi")
            inter.append(gradi)
            item.classList.add("searchItem")
            inter.classList.add("searchItem__Inter")
            h.innerHTML = ob.header;
            d.innerHTML = ob.date;
            inter.append(h)
            inter.append(d)
            item.append(inter)
            return item;
        }
    },
    createCalToolTip() {

        let tooltip = document.createElement("div");
        let inter = document.createElement("div");
        tooltip.classList.add("tooltip")
        inter.classList.add("inter")

        toolTip.crFunc.crInput(["Событие", "День, месяц, год", "Имена участников"], inter)
        inter.append(toolTip.crFunc.crDel())
        inter.append(toolTip.crFunc.crText())
        toolTip.crFunc.crBtns(["Готово", "Удалить"], inter)
        tooltip.append(inter)
        document.body.append(tooltip)
        return tooltip
    },
    createAddButtonToolTip() {
        let tooltip = document.createElement("div");
        let inter = document.createElement("div");
        tooltip.classList.add("tooltip")
        inter.classList.add("inter")
        toolTip.crFunc.crInput(["Событие"], inter)
        inter.append(toolTip.crFunc.crDel())
        toolTip.crFunc.crBtns(["Создать"], inter)
        tooltip.append(inter)
        document.body.append(tooltip)
        return tooltip
    },
    createSearchToolTip() {
        let tooltip = document.createElement("div");
        let inter = document.createElement("div");
        tooltip.classList.add("tooltip")
        inter.classList.add("inter")
        inter.style.padding = "5px 0";
        inter.style.paddingLeft = "5px";
        inter.addEventListener("click", toolTip.delete)
        for (let i = 0; i < 20; i++) {

            inter.append(toolTip.crFunc.crSearchItem())
        }
        tooltip.append(inter)
        document.body.append(tooltip)
        return tooltip
    },
    delete() {
        toolTip.tt.remove();
        toolTip.turnTarget = "";
        toolTip.tt = "";
    },
    setCalendar(e) {
        let et = e.target;
        if (!toolTip.tt && toolTip.turnTarget != et) {

            if (et.className == "week-day-info") {
                toolTip.turnTarget = et;
                let coords = toolTip.turnTarget.getBoundingClientRect()
                toolTip.tt = toolTip.createCalToolTip();
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

            if (et.id == "addBtn") {
                toolTip.turnTarget = et;
                let coords = toolTip.turnTarget.getBoundingClientRect()
                toolTip.tt = toolTip.createAddButtonToolTip();
                coordsToolTip.setStyleArrow(toolTip.tt, "arrowTop1")
                coordsToolTip.btnTop(toolTip.tt, coords);
            }
        }
    },
    setSearch(e) {
        let et = e.target;
        if (!toolTip.tt && toolTip.turnTarget != et) {

            if (et.id == "srch") {
                toolTip.turnTarget = et;
                let coords = toolTip.turnTarget.getBoundingClientRect()
                toolTip.tt = toolTip.createSearchToolTip();
                coordsToolTip.setStyleArrow(toolTip.tt, "arrowTop1")
                coordsToolTip.btnTop(toolTip.tt, coords);
            }
        }
    }
}
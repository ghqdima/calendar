let coordsToolTip = {
    scrollHeight: Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    ),
    setTopStyleTriangle(el, st) {
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
    }
}
const toolTip = {
    turnTarget: "",
    tt: "",
    create() {
        function crInput(n, t) {
            n.forEach(i => {
                let el = document.createElement("input");
                el.placeholder = i;
                t.append(el)
            });
        }

        function crBtns(n, t) {
            n.forEach(i => {
                let el = document.createElement("button");
                if (i == "Готово") el.onclick = toolTip.delete;
                el.innerHTML = i;
                t.append(el)
            });
        }

        let tooltip = document.createElement("div");
        let text = document.createElement("textarea");
        let del = document.createElement("div");
        del.classList.add("delToolTip")
        del.onclick = toolTip.delete;
        text.placeholder = "Описание";

        crInput(["Событие", "День, месяц, год", "Имена участников"], tooltip)
        tooltip.append(del)
        tooltip.append(text)
        crBtns(["Готово", "Удалить"], tooltip)
        tooltip.classList.add("tooltip")
        document.body.append(tooltip)
        return tooltip
    },
    delete() {
        toolTip.tt.remove();
        toolTip.turnTarget = "";
        toolTip.tt = "";
    },
    set(e) {
        let et = e.target;
        if (!toolTip.tt && toolTip.turnTarget != et) {

            if (et.className == "week-day-info") {
                toolTip.turnTarget = et;
                let coords = toolTip.turnTarget.getBoundingClientRect()
                toolTip.tt = toolTip.create();
                if ((coords.bottom + pageYOffset) < 900) {
                    coordsToolTip.leftTop(toolTip.tt, coords)
                } else {
                    coordsToolTip.setTopStyleTriangle(toolTip.tt, "triangleBottomLeft")
                    coordsToolTip.leftBottom(toolTip.tt, coords);
                }
                if ((coords.right + pageXOffset) > 900) {
                    coordsToolTip.setTopStyleTriangle(toolTip.tt, "triangleTopRight")
                    coordsToolTip.rTop(toolTip.tt, coords)
                    if ((coords.bottom + pageYOffset) > 900) {
                        coordsToolTip.setTopStyleTriangle(toolTip.tt, "triangleBottomRight")
                    }
                }
            }


        }
    }
}
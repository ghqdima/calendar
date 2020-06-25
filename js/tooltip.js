function setToolTip(e) {

    let et = e.target;
    // e.stopPropagation()
    if (!setToolTip.tooltip && setToolTip.target != et) {

        if (et.className == "week-day-info") {
            setToolTip.target = et;
            let coords = setToolTip.target.getBoundingClientRect()
            setToolTip.tooltip = createToolTip();
            if ((coords.bottom + pageYOffset) < 900)
                coordsToolTip.leftTop(setToolTip.tooltip, coords)
            else
                coordsToolTip.leftBottom(setToolTip.tooltip, coords);
            if ((coords.right + pageXOffset) > 900)
                coordsToolTip.rTop(setToolTip.tooltip, coords)
        }


    }
}

function delToolTip() {
    var e = setToolTip.tooltip;
    e.remove();
    setToolTip.target = "";
    setToolTip.tooltip = "";
}

function createToolTip() {
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
            if (i == "Готово") el.onclick = delToolTip;
            el.innerHTML = i;
            t.append(el)
        });
    }
    let tooltip = document.createElement("div");
    let text = document.createElement("textarea");
    text.placeholder = "Описание";

    crInput([1, 2, 3], tooltip)
    tooltip.append(text)
    crBtns(["Готово", "Удалить"], tooltip)
    tooltip.classList.add("tooltip")
    document.body.append(tooltip)
    return tooltip
}
let coordsToolTip = {
    scrollHeight: Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    ),
    leftTop(el, coords) {
        el.style.left = coords.x + coords.width + 20 + "px";
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

setToolTip.target = "";
setToolTip.tooltip = "";
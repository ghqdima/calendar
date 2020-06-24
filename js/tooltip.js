function setToolTip(e) {

    let et = e.target;
    // e.stopPropagation()
    if (!setToolTip.tooltip && setToolTip.target != et) {

        if (et.className == "week-day-info") {
            setToolTip.target = et;
            let coords = setToolTip.target.getBoundingClientRect()
            setToolTip.tooltip = createToolTip(coords);
        }


    }
}

function delToolTip() {
    var e = setToolTip.tooltip;
    e.remove();
    setToolTip.target = "";
    setToolTip.tooltip = "";
}

function createToolTip(coords) {
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
    tooltip.classList.add("tooltip")
    tooltip.style.left = coords.x + coords.width + 10 + "px";
    tooltip.style.top = coords.y - 10 + "px";
    // tooltip.addEventListener('click', delToolTip);
    crInput([1, 2, 3], tooltip)
    document.body.append(tooltip)
    tooltip.append(text)
    crBtns(["Готово", "Удалить"], tooltip)
    return tooltip
}
setToolTip.target = "";
setToolTip.tooltip = "";
const toolTipOb = {
    target: "",
    tooltip: ""
}

function setToolTip(e) {
    let et = e.target;
    e.stopPropagation()
    if (toolTipOb.target != et) {
        if (toolTipOb.tooltip) {
            toolTipOb.tooltip.remove()
            if (toolTipOb.target) toolTipOb.target = "";
        }
        if (et.className == "week-day-info") {
            toolTipOb.target = et;
            let tooltip = document.createElement("div");
            tooltip.classList.add("tooltip")
            document.body.append(tooltip)
            toolTipOb.tooltip = tooltip;
            document.addEventListener('click', function (event) {
                var e = toolTipOb.tooltip;
                if (!e.contains(event.target)) e.remove()
            });
        }


    }
}
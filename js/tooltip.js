function setToolTip(e) {
    let et = e.target;
    e.stopPropagation()
    if (setToolTip.target != et) {
        if (setToolTip.tooltip) {
            setToolTip.tooltip.remove()
            if (setToolTip.target) setToolTip.target = "";
        }
        if (et.className == "week-day-info") {
            setToolTip.target = et;
            let tooltip = document.createElement("div");
            tooltip.classList.add("tooltip")
            document.body.append(tooltip)
            setToolTip.tooltip = tooltip;
            document.addEventListener('click', function (event) {
                var e = setToolTip.tooltip;
                if (!e.contains(event.target)) e.remove()
            });
        }


    }
}
setToolTip.target = "";
setToolTip.tooltip = "";
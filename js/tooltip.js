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
            let coords = setToolTip.target.getBoundingClientRect()
            console.log(coords);
            let tooltip = document.createElement("div");
            tooltip.classList.add("tooltip")
            tooltip.style.left = coords.x + coords.width + 10 + "px";
            tooltip.style.top = coords.y - 10 + "px";
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
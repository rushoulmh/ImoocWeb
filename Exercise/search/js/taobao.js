(function(){
    var tab = eleUtil.getEleByClass("m-tab")[0],
        li = tab.getElementsByTagName("li");
    eventUtil.addEvent(tab, "mouseenter", function(){
        this.className += " z-hover";
    });
    eventUtil.addEvent(tab, "mouseleave", function(){
        tab.className = tab.className.replace(/\s*z-hover/g, "");
    });
    eventUtil.addEvent(li[0], "mouseenter", function(){
        if(this.className.indexOf("z-sel") < 0){
            li[1].className = "";
            this.className = "z-sel";
        }
    });
    eventUtil.addEvent(li[0], "click", function(){
        tab.className = tab.className.replace(/\s*z-hover/g, "");
    });
    eventUtil.addEvent(li[1], "mouseenter", function(){
        if(this.className.indexOf("z-sel") < 0){
            li[0].className = "";
            this.className = "z-sel";
        }
    });
    eventUtil.addEvent(li[1], "click", function(){
        tab.className = tab.className.replace(/\s*z-hover/g, "");
    });
})()
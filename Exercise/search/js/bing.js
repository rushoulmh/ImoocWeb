(function(){
    var sch = eleUtil.getEleByClass("m-sch")[0],
        txt = eleUtil.getEleByClass("u-txt", sch)[0];

    eventUtil.addEvent(txt, "keyup", function(){
        var sug = eleUtil.getEleByClass("m-suggest")[0];
        /*ajax.get("http://api.bing.com/qsonhs.aspx?q=" + txt.val(),function(data){
            var d = data.AS.Results[0].Suggests,
                html = "";
            for(var i = 0; i<d.length; i++){
                html += "<li>" + d[i].Txt + "</li>";
            }
            sug.innerHTML = html;*/
            sug.style.display = "block";
            sug.style.position = "absolute";
            sug.style.top = (sch.offsetTop + sch.offsetHeight + 1) + "px";
            sug.style.left = (sch.offsetLeft + txt.offsetLeft) + "px";
            sug.style.width = document.getElementById("frm").offsetWidth + "px";
        // });
    });

    eventUtil.delegate("li", "click", function(){
        var keyword = this.innerHTML;
        location.href = "http://cn.bing.com/search?q=" + keyword;
    });
})()
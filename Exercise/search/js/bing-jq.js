$(document).ready(function(){
    var doc = $(document),
        txt = $(".u-txt"),
        sug = $(".m-suggest");
        
    txt.on("keyup", function(){
        var sch = $(".m-sch");
        // 发送请求
        // 本文件未放在api.bing.com域下，需要跨域才能实现
        /*$.get("http://api.bing.com/qsonhs.aspx?q=" + txt.val(), function(data){
            var d = data.AS.Results[0].Suggests,
                html = "";
            jQuery.each(d, function(i, val){
                html += "<li>" + val.Txt + "</li>";
            });
            sug.html(html);
        }, "json");*/
        /*$.ajax({
            type: "GET",
            url: "http://api.bing.com/qsonhs.aspx",
            data: {q: txt.val()},
            dataType: "json",
            success: function(d){
                var arr = d.list;
                jQuery.each(arr, function(i, val){
                    html += "<li>" + val + "</li>";
                });
                sug.html(html);
            }
        });*/
        // 设置智能提示
        sug.show().css({
            position: "absolute",
            top: sch.position().top + sch.height() + 1,
            left: sch.position().left + txt.position().left,
            width: $("#frm").width()
        });
    });

    // 点击页面其他位置时，隐藏智能提示框
    /*txt.on("blur", function(){
        sug.hide();
    });*/
    doc.on("click", function(){
        sug.hide();
    });

    // 事件代理：给多个li添加方法
    /*sug.on("click", "li", function(){
        location.href = "http://cn.bing.com/search?q=" + $(this).text();
    });*/
    doc.on("click", "li", function(){
        var keyword = $(this).text();
        location.href = "http://cn.bing.com/search?q=" + keyword;
    });
})
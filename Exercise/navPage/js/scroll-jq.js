$(document).ready(function() {
    $(window).scroll(function() {
        var nav = $("#nav"),
            items = $("#main").find(".m-item"),
            top = $(document).scrollTop(), // 滚动条位置
            curA = nav.find(".z-cur"),
            curId = ""; // 滚动条所在位置的item.id
        // 判断滚动到哪个item
        items.each(function() {
            var i = $(this),
                y = i.offset().top; // 每个item的顶部位置
            if(top > y - 300) {
                curId = "#" + i.attr("id");
            } else {
                return false;
            }
        });
        // 给相应的链接添加z-cur样式，并移除其他链接的z-cur样式
        if(curId && curA.attr("href") != curId) {
            curA.removeClass("z-cur");
            nav.find("a[href='" + curId + "']").addClass("z-cur");
        }
    });
})
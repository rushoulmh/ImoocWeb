$(window).on("load", function(){
    waterfall();

    // 假设后台传入了json数据
    var json = {
        "images": [{"src": "10.jpg"}, {"src": "12.jpg"}, {"src": "13.jpg"}, {"src": "14.jpg"}]
    };
    // 滚动式加载数据块
    // 这里有个bug：会不停地重复加载数据块
    $(window).on("scroll", function(){
        if(isNeedScroll){
            $.each(json.images, function(key, val){
                var box = $("<div>").addClass("g-box").appendTo($("#container")),
                    pic = $("<div>").addClass("m-pic").appendTo(box);
                $("<img>").attr("src", "imgs/" + $(val).attr("src")).appendTo(pic); // 注意把JS原生对象val转换为JQ对象
            });
            waterfall();
        }
    });
});

/**
 * 瀑布流效果
 */
function waterfall(){
    var parent = $("#container"),
        boxs = parent.find(".g-box"),
        boxW = boxs.eq(0).outerWidth(), // 各个数据块的宽度
        col = Math.floor($(window).width() / boxW), // 计算页面每行可容纳的数据块数量
        hs = []; // 存储列高
    parent.width(boxW * col).css("margin", "0 auto"); // 设置父元素的宽度，并水平居中
    boxs.each(function(idx, val){
        // var bx = boxs.eq(idx),
        var bx = $(val), // 注意这里需要把DOM对象val转换为JQ对象
            bxH = bx.outerHeight(), // 获取box的高度
            minH = 0, // hs中的最小值
            minHIdx = 0; // hs中最小值的索引
        if(idx < col){
            hs[idx] = bxH; // 存储第一行各数据块的高度
        } else{
            minH = Math.min.apply(null, hs);
            minHIdx = $.inArray(minH, hs);
            bx.css({
                "position": "absolute",
                "top": minH + "px",
                "left": (minHIdx * boxW) + "px"
            });
            hs[minHIdx] += bxH; // 更新列高
        }
    });
}

/**
 * 判断是否触发watefall函数
 * @description 本例中触发条件为最后一个数据块的高度露出一半时，该条件可自定义
 * @return {Boolean} true表示触发
 */
function isNeedScroll(){
    var lastBox = $("#container > .g-box").last(),
        lastBoxH = lastBox.offset().top + Math.floor(lastBox.outerHeight() / 2), // 最后一个数据块露出一半高度
        sTop = $(document).scrollTop(), // 获取被卷去的高度
        winH = $(window).height(); // 获取视窗高度
    return (lastBoxH < sTop + winH);
}
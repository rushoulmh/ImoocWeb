/**
 * 封装getElementsByClassName方法
 * @param  {String} cls     类名
 * @param  {Object} oParent 父节点
 * @return {Array}          元素数组
 */
function getEleByClass(cls, oParent) {
    if(!oParent) oParent = document;
    var result = new Array(),
        eles = null;

    if(oParent.getElementsByClassName) {
        return oParent.getElementsByClassName(cls);
    } else {
        eles = oParent.getElementsByTagName("*");
        for(var i=0; i<eles.length; i++) {
            if(eles[i].className.indexOf(cls) != -1){
                result.push(eles[i]);
            }
        }
        return result;
    }
}

/**
 * 判断是否含有该类名
 * @param  {String}   cls 类名
 * @param  {Element}  ele 目标元素
 * @return {Boolean}      true表示含有
 */
function hasClass(cls, ele) {
    return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

/**
 * 添加类名
 * @param  {String}   cls 类名
 * @param  {Element}  ele 目标元素
 */
function addClass(cls, ele) {
    if(hasClass(cls, ele)) return;
    ele.className += " " + cls;
}

/**
 * 移除类名
 * @param  {String}   cls 类名
 * @param  {Element}  ele 目标元素
 */
function removeClass(cls, ele) {
    if(!hasClass(cls, ele)) return;
    var rgx = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    ele.className = ele.className.replace(rgx, ""); // 将符合条件的类名替换为空（即移除）
}

window.onload = function() {
    window.onscroll = function() {
        var top = document.documentElement.scrollTop || document.body.scrollTop,
            items = getEleByClass("m-item", document.getElementById("main")),
            lnks = nav.getElementsByTagName("a"),
            curId = "";

        // 判断滚动到哪个item
        for(var i=0; i<items.length; i++) {
            var itm = items[i],
                y = itm.offsetTop;
            if(top > y - 200) {
                curId = itm.id;
            } else {
                break;
            }
        }
        // 给相应链接添加z-cur样式，并移除其他链接的z-cur样式
        if(curId) {
            for(var j=0; j<lnks.length; j++) {
                var a = lnks[j],
                    href = a.href.split("#");
                if(href[href.length-1] != curId) {
                    removeClass("z-cur", a);
                } else{
                    addClass("z-cur", a);
                }
            }
        }
    };    
}
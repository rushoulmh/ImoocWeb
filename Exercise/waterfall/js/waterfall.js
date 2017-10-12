window.onload = function(){
    var parentId = "container",
        boxCls = "g-box";
    waterfall(parentId, boxCls);

    // 假设后台传入了json数据
    var json = {
        "images": [{"src": "11.jpg"}, {"src": "12.jpg"}, {"src": "13.jpg"}, {"src": "14.jpg"}]
    };
    // 滚动式加载数据块
    // 这里有个bug：会不停地重复加载数据块
    window.onscroll = function(){
        if(isNeedScroll(parentId, boxCls)){
            var parent = document.getElementById(parentId);
            for(var i=0; i<json.images.length; i++){
                var box = document.createElement("div"),
                    pic = document.createElement("div"),
                    img = document.createElement("img");
                box.className = "g-box";
                pic.className = "m-pic";
                img.src = "imgs/" + json.images[i].src;
                parent.appendChild(box);
                box.appendChild(pic);
                pic.appendChild(img);
            }
            // 新创建的节点需要手动激活waterfall功能
            waterfall(parentId, boxCls);
        }
    };
}

/**
 * 瀑布流效果
 * @param  {String} parentId 父元素ID
 * @param  {String} boxId    当前元素ID
 */
function waterfall(parentId, boxCls){
    var parent = document.getElementById(parentId), // 获取父元素
        boxs = getEleByClass(boxCls, parent), // 获取数据块
        boxW = boxs[0].offsetWidth, // 获取单个数据块的宽度（数据块等宽）
        winW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        col = Math.floor(winW / boxW), // 计算页面上每行能容纳的数据块数目
        hs = []; // 存放每列的所有数据块的高度和
    
    parent.style.cssText = "width:" + (boxW * col) + "px;margin:0 auto;"; // 设置父元素的宽度
    for(var i=0; i<boxs.length; i++){
        var bx = boxs[i],
            minH = 0, // hs中的最小值
            minHIdx = 0; // hs中最小值的索引
        if(i < col){
            hs[i] = bx.offsetHeight; // 存放第一行的数据块的高度
        } else{
            minH = Math.min.apply(null, hs);
            minHIdx = getIndex(hs, minH);
            if(minHIdx < 0){
                alert("Cannot find value");
                return;
            }
            bx.style.position = "absolute"; // 设置box为绝对定位
            bx.style.top = minH + "px"; // box的top应是当列上一个数据块的高度
            bx.style.left = boxs[minHIdx].offsetLeft + "px"; // box的left应是第idx个数据块的left
            // bx.style.left = boxW * idx + "px"; // 由于等宽，可以这样计算
            hs[minHIdx] = minH + bx.offsetHeight; // 添加数据块后更新列高
        }
    }
}

/**
 * 判断是否触发watefall函数
 * @description 本例中触发条件为最后一个数据块的高度露出一半时，该条件可自定义
 * @param  {String}  parentId 父元素ID
 * @param  {String}  boxCls   box元素
 * @return {Boolean}          true表示触发
 */
function isNeedScroll(parentId, boxCls){
    var parent = document.getElementById(parentId),
        boxs = getEleByClass(boxCls),
        lastBox = boxs[boxs.length - 1],
        lastBoxH = lastBox.offsetTop + Math.floor(lastBox.offsetHeight / 2), // 最后一个数据块露出一半高度
        sTop = document.documentElement.scrollTop || document.body.scrollTop,
        winH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    return lastBoxH < sTop + winH; // 到达指定高度后返回true
}

/**
 * 封装getElementsByClassName
 * @param  {String}  clsName 类名
 * @param  {Element} parent  父节点
 * @return {Array}           查询到的元素
 */
function getEleByClass(clsName, parent){
    if(arguments.length < 1){
        alert("Please input the classname");
        return null;
    }
    if(!parent) parent = document;

    var eles = null, el = null, result = new Array();
    if(parent.getElementsByClassName){
        result = parent.getElementsByClassName(clsName);
    } else{
        eles = parent.getElementsByTagName("*");
        for(var i=0; i<eles.length; i++){
            el = eles[i];
            if(el.className.indexOf(clsName) >= 0){
                result.push(el);
            }
        }
    }

    return result;
}

/**
 * 获取索引值
 * @param  {Array}  arr 要检索的数组
 * @param  {[type]} val 要检索的值
 * @return {Number}     索引值
 */
function getIndex(arr, val){
    for(var i=0; i<arr.length; i++){
        if(arr[i] === val) return i;
    }
    return -1; // 如果未检索到，返回-1
}
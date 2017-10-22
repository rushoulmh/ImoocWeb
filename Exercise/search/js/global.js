// JSON方法
if(!window.JSON){
    window.JSON = {
        // JSON.parse兼容
        parse: function(sJson){
            return eval("(" + sJson + ")");
        },
        // JSON.stringify兼容
        stringify: function(val){
            var res = "", temp, i;
            switch(Object.prototype.toString.call(val).slice(8, -1)){
                // 原始类型
                case "String":
                case "Number":
                case "Boolean":
                case "Null":
                    res = "" + val; // 转换为字符串
                    break;
                case "Undefined":
                // 内置对象类型
                case "Function":
                    res = undefined;
                    break;
                case "Date":
                    res = "" + (val.toJSON ? val.toJSON() : val.toString());
                    break;
                case "Array":
                    res += "[";
                    for(i=0; i<val.length; i++){
                        temp = (val[i] instanceof Object ? this.stringify(val[i]) : val[i]);
                        res += (temp === undefined ? null : temp) + ",";
                    }
                    res = res.replace(/,$/, "]");
                    break;
                case "Object":
                    res += "{";
                    for(i in val){
                        if(val.hasOwnProperty(i)){
                            temp = (val[i] instanceof Object ? this.stringify(val[i]) : val[i]);
                            if(temp !== undefined){
                                res += "\"" + i + "\"" + temp + ",";
                            }
                        }
                    }
                    res = res.replace(/,$/, "}");
                    break;
                // 其他数据类型
                default:
                    res = "{}";
            }
        }
    };
}

// DOM操作
var eleUtil = {
    // getElementsByClassName兼容
    getEleByClass: function(cls, oParent){
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
    },
    // 获取元素至浏览器左边的距离
    getEleLeft: function(ele){
        var offLeft = ele.offsetLeft,
            cur = ele.offsetParent;

        while(cur !== null){
            offLeft += cur.offsetLeft;
            cur = cur.offsetParent;
        }
        return offLeft;
    },
    // 获取元素至浏览器顶端的距离
    getEleTop: function(ele){
        var offTop = ele.offsetTop,
            cur = ele.offsetParent;

        while(cur !== null){
            offTop += cur.offsetTop;
            cur = cur.offsetParent;
        }
        return offTop;
    }
};

// 事件方法
var eventUtil = {
    // 注册事件
    addEvent: function(ele, type, fn, isCapture){
        if(ele.addEventListener){
            ele.addEventListener(type, fn, !!isCapture);
        } else if(ele.attachEvent){
            ele.attachEvent("on" + type, fn);
        } else{
            ele["on"+type] = fn;
        }
    },
    // 注销事件
    delEvent: function(ele, type, fn, isCapture){
        if(ele.removeEventListener){
            ele.removeEventListener(type, fn, !!isCapture);
        } else if(ele.detachEvent){
            ele.detachEvent("on" + type, fn);
        } else{
            ele["on"+type] = null;
        }
    },
    // 事件代理
    delegate: function(target, type, fn){
        this.addEvent(document, type, function(e){
            if(e.target.nodeName == target.toUpperCase()){
                fn.call(e.target);
            }
        });
    },
    // 获取事件对象
    getEvent: function(e){
        return e || window.event;
    },
    // 获取事件类型
    getType: function(e){
        e = this.getEvent(e);
        return e.type; 
    },
    // 获取事件目标
    getTarget: function(e){
        e = this.getEvent(e);
        return e.target || e.srcElement;
    },
    // 阻止默认行为
    preventDefault: function(e){
        e = this.getEvent(e);
        if(e.preventDefault){
            e.preventDefault();
        } else{
            e.returnValue = false;
        }
    },
    // 阻止冒泡
    stopPropagation: function(e){
        e = this.getEvent(e);
        if(e.stopPropagation){
            e.stopPropagation();
        } else{
            e.cancelBupple = true;
        }
    }
};

// Ajax方法和属性
var ajax = {
    // 获取XHR对象
    getXHR: function(){
        var xhr = null;
        if(window.XMLHttpRequest){
            xhr = new XMLHttpRequest();
        } else if(window.ActiveXObject){
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return xhr;
    },
    // 参数序列化
    serialize: function(data){
        if(!data) return "";
        var d = [], key, val;
        for(key in data){
            if(!data.hasOwnProperty(key) || (typeof data[key] === "function")) continue;
            val = data[key].toString();
            key = encodeURIComponent(key);
            val = encodeURIComponent(val);
            d.push(key + "=" + val);
        }
        return d.join("&");
    },
    // get请求
    get: function(url, params, fn){
        var xhr = this.getXHR();
        if(!xhr || typeof fn !== "function") return false;
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 && xhr.status === 200){
                fn(xhr.responseText);
                // fn(JSON.parse(xhr.responseText));
            }
        }
        params = this.serialize(params);
        if(params) url += "?" + params;
        xhr.open("GET", url, true);
        xhr.send(null);
    },
    // post请求
    post: function(url, params, fn){
        var xhr = this.getXHR();
        if(!xhr || typeof fn !== "function") return false;
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                var status = xhr.status;
                if((status >=200 && status < 300) || status === 304){
                    fn(xhr.responseText);
                }                
            }
        }
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(this.serialize(params));
    },
    // 读取Cookie
    getCookie: function(key){
        var arr = document.cookie.split(";"),
            arr2 = [];
        for(var i=0; i<arr.length; i++){
            arr2 = arr[i].split("=");
            if(arr2[0] == key) return arr2[1];
        }
        return "";
    }
};
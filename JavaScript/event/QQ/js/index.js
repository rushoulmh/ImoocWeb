/**
 * 封装getElementsByClassName方法
 * @param  {String} clsName 类名
 * @param  {Object} oParent 父节点
 * @return {Array}          元素数组
 */
function getEleByClass(clsName, oParent){
	if(!oParent) oParent = document;
	var result = new Array(),
		eles = null;

	if(oParent.getElementsByClassName){
		return oParent.getElementsByClassName(clsName);
	} else{
		eles = oParent.getElementsByTagName("*");
		for(var i=0; i<eles.length; i++){
			if(eles[i].className.indexOf(clsName) != -1){
				result.push(eles[i]);
			}
		}
		return result;
	}
}

/**
 * 封装stopPropagation事件
 * @param  {Event} e 事件
 */
function stopPropagation(e){
	if(e.stopPropagation){
		e.stopPropagation();
	} else{
		e.cancelBubble = true;
	}
}

window.onload = function(){
	var oPnl = document.getElementById("pnl"),
		oLogo = getEleByClass("u-logo", oPnl)[0],
		oClose = getEleByClass("u-icn-close", oPnl)[0],
		oState = document.getElementById("state"),
		stateTxt = getEleByClass("state-txt", oState)[0],
		stateShow = getEleByClass("state-show", oState)[0],
		ul = oState.getElementsByTagName("ul")[0],
		lis = ul.getElementsByTagName("li");
	// 拖曳
	oLogo.onmousedown = drag;
	// 关闭
	oClose.onclick = function(){
		oPnl.style.display = "none";
	};
	// 切换状态
	oState.onclick = function(e){
		e = e || window.event;
		stopPropagation(e);
		ul.style.display = "block";
	};
	// 鼠标滑过、离开和点击状态列表时
	for(var i=0; i<lis.length; i++){
		lis[i].onmouseover = function(){
			this.style.backgroundColor = "#567";
		};
		lis[i].onmouseout = function(){
			this.style.backgroundColor = "#fff";
		};
		lis[i].onclick = function(e){
			e = e || window.event;
			stopPropagation(e);
			ul.style.display = "none";
			stateTxt.innerHTML = this.getElementsByTagName("span")[0].innerHTML;
			stateShow.className = "state-show " + this.getElementsByTagName("i")[0].className;
		};
	}
	// 点击状态列表以外的地方时
	document.onclick = function(){
		ul.style.display = "none";
	};
}

/**
 * 鼠标拖拽
 * @param  {Event} e 鼠标事件
 */
function drag(e){
	e = e || window.event;
	var oPnl = document.getElementById("pnl"),
		x = e.clientX - oPnl.offsetLeft,
		y = e.clientY - oPnl.offsetTop;
	// 移动
	document.onmousemove = function(e){
		e = e || window.event;
		move(e, x, y);
	};
	// 释放鼠标
	document.onmouseup = function(){
		document.onmousemove = null;
		document.onmouseup = null;
	};
}

/**
 * 面板移动
 * @param  {Event} e     事件
 * @param  {Number} posX 鼠标相对于面板的X坐标
 * @param  {Number} posY 鼠标相对于面板的Y坐标
 */
function move(e, posX, posY){
	var oPnl = document.getElementById("pnl"),
		l = e.clientX - posX,
		t = e.clientY - posY,
		winW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
		winH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
		maxW = winW - oPnl.offsetWidth - 10,
		maxH = winH - oPnl.offsetHeight;
	// 移动超出窗口时，使其限制在窗口内
	if(l < 0){
		l = 0;
	} else if(l > maxW){
		l = maxW;
	}
	if(t < 0){
		t = 10;
	} else if(t > maxH){
		t = maxH;
	}
	oPnl.style.left = l + "px";
	oPnl.style.top = t + "px";
}
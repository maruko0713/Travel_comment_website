//全局变量
var oIndex = document.getElementById("index");
var oWelcome = document.getElementById("welcome");
var oMask = document.getElementById("mask");
var oNews = document.getElementById("news");
var oVideoInfo = document.getElementById("videoInfo");
var oOver = document.getElementById("over");
//工具函数
function bind(obj,ev,fn) {
	if(obj.addEventListener) {
		obj.addEventListener(ev,fn);
	} else {
		obj.attachEvent(ev,fn);
	}
}
function addClass(obj,sClass) {
	if(!obj.className) {
		obj.className = sClass;
		return ;
	} 
	var aClass = obj.className.split(" ");
	for(var i=0;i<aClass.length;i++) {
		if(aClass[i]==sClass){
			return ;
		}
	}
	obj.className += " " + sClass;
} 
function removeClass(obj,sClass) {
	if(!obj.className) {
		return ;
	}
	var aClass = obj.className.split(" ");
	for(var i=0;i<aClass.length;i++) {
		if(aClass[i]==sClass){
			aClass.splice(i,1);
			obj.className = aClass.join(" ");
			return ;
		}
	}
}
function getByClass(obj,sClass){
	var all = obj.getElementsByTagName("*");
	var result = [];
	for(var i=0;i<all.length;i++) {
		aClass = all[i].className.split(" ");
		for(var j=0;j<aClass.length;j++) {
			if(aClass[j] == sClass){
				result.push(all[i]);
			}
		}
	}
	return result;
}
function fnInfo(obj, str) {
	obj.innerHTML = str;
	obj.style.opacity = 1;
	obj.style.WebkitTransform = "scale(1)";
	obj.style.MozTransform = "scale(1)";
	obj.style.OTransform = "scale(1)";
	obj.style.MsTransform = "scale(1)";
	obj.style.transform = "scale(1)";
	setTimeout(function(){
		obj.style.WebkitTransform = "scale(0)";
		obj.style.WebkitTransform = "scale(0)";
	    obj.style.MozTransform = "scale(0)";
	    obj.style.OTransform = "scale(0)";
	    obj.style.MsTransform = "scale(0)";
	    obj.style.transform = "scale(0)";
	},1000);
}
// 页面内容设置
function fnLoad() {
	bind(oWelcome,"transitionend",end);
	setTimeout(function(){
		oWelcome.style.opacity = 0;
	},5000);
	function end() {
	    removeClass(oWelcome,"pageShow");
	    fnIndex();
	}
}
function fnIndex() {
	var oIndexBtn = document.getElementById("indexBtn"),
	    oScore = document.getElementById("score"),
	    aScore = getByClass(oScore,"stars"),
	    oIndexTags = document.getElementById("indexTags"),
	    aTags = indexTags.getElementsByTagName("label"),
	    oInfo  = getByClass(oIndex,"hint")[0],
	    oPic = getByClass(oIndex,"pic-list")[0].getElementsByTagName("ul")[0],
	    oPicInfo = getByClass(oIndex,"info")[0],
	    aA = oIndex.getElementsByTagName("nav")[0].getElementsByTagName("a"),
	    aImg = oIndex.getElementsByTagName("img"),
	    timer,
	    iNow=1,
	    width = document.documentElement.clientWidth,
	    iX=0,
	    iStartX=0,
	    iEndX=0,
	    iDis,
	    onTag;
	addClass(oIndex,"pageShow");
	autoPlay();
	// 让图片运动起来
	function moveChange() {
		oPicInfo.innerHTML = aImg[iNow].alt;
		for(var i=0;i<aImg.length;i++) {
			removeClass(aA[i],"active");
		}
		addClass(aA[iNow],"active");
		iX = -iNow*width;
		oPic.style.transition="0.5s";
		oPic.style.WebkitTransform=oPic.style.transform = "translateX(" + iX + "px)"; 
	}
	function tabStart(event) {
		clearInterval(timer);
		event = event || window.event;
		iStartX = event.changedTouches[0].pageX;
		iX2 = iX;
		oPic.style.transition="none";
		console.log(iStartX);
	}
	function tabMove(event) {
		event = event || window.event;
		iEndX =  event.changedTouches[0].pageX;
		iDis = iEndX - iStartX;
		console.log(iEndX);
		iX = iX2 + iDis;
		console.log(iX);
		if(iX<-(aImg.length-1)*width) {
			iX = -(aImg.length-1)*width;
		} else if (iX>0) {
			iX = 0;
		}
		oPic.style.Webkitransform = "translateX(" + iX + "px)";
		oPic.style.Moztransform = "translateX(" + iX + "px)";
		oPic.style.Otransform = "translateX(" + iX + "px)";
		oPic.style.Mstransform = "translateX(" + iX + "px)";
		oPic.style.transform = "translateX(" + iX + "px)";
	}
	function tabEnd(event) {
		iNow = -Math.round(iX / width);
		if(iNow>aImg.length-1) {
			iNow = aImg.length-1;
		} else if (iNow < 0) {
			iNow = 0;
		}
		moveChange();
		autoPlay();
	}
	// 给图片列表添加事件
	bind(oPic,"touchstart",tabStart);
	bind(oPic,"touchend",tabEnd);
	bind(oPic,"touchmove",tabMove);
	function autoPlay() {
		timer = setInterval(function(){
			iNow++;
			if(iNow==aImg.length) {
				iNow = 0;
			}
			moveChange();
		},2000);
	}
	// 给评分的小星星添加点击事件
	for(var i=0;i<aScore.length;i++) {
		fnStar(aScore[i]);
	}
	function fnStar(score) {
		var aStars = score.getElementsByTagName("span");
		for(var i=0;i<aStars.length;i++) {
			aStars[i].index = i;
		}
		bind(score,"touchend",function(event) {
			if(event.target.index!== undefined) {
				var oInput = score.getElementsByTagName("input")[0];
				for(var i=0;i<aStars.length;i++) {
					removeClass(aStars[i],"active");
				}
				for(i=0;i<=event.target.index;i++) {
					addClass(aStars[i],"active");
					oInput.value = event.target.index + 1;
				}
			}
			return false;
		});
	}
	// 给标签添加点击事件
	 bind(oIndexTags,"touchend",function(event){
		if(event.target.tagName == "SPAN"){
    		if(!event.target.previousElementSibling.checked){
    			addClass(event.target.parentNode,"active");
    			event.target.previousElementSibling.on = true;
    		} else {
    			removeClass(event.target.parentNode,"active");
    			event.target.previousElementSibling.on = false;
    		}
    	} else if (event.target.tagName == "LABEL"){
    		if(!event.target.children[0].checked){
    			addClass(event.target,"active");
    			event.target.children[0].on = true;
    		} else {
    			removeClass(event.target,"active");
    			event.target.children[0].on = false;
    		}
    	}
    	return false;
    });
	function fnScore() {
		for(var i = 0 ;i<aScore.length;i++) {
			var inputValue = aScore[i].getElementsByTagName("input")[0].value;
			if(inputValue === 0) {
				return false;
			}
		}
		return true;
	}
	function fnTags() {
		for(var i=0;i<aTags.length;i++) {
			var checked = aTags[i].getElementsByTagName("input")[0].on;
			if(checked) {
				return true;
			}
		}
		return false;
	}
    bind(oIndexBtn,"touchend",function() {
    	// if()
    	
    	// 验证checkbox可以顺利输出
    	// for(var i=0;i<aTags.length;i++){
    	// 	var oInput = aTags[i].getElementsByTagName("input")[0];
    	// 	if(oInput.checked){
    	// 		console.log(oInput.value);
    	// 	}
    	// }
    	var onScore = fnScore();
    	var onTags = fnTags();
    	if(onScore&&onTags){
    		fnIndexOut();
    	} else if(onScore) {
    		fnInfo(oInfo,"给景区添加标签^_^");
    	} else {
    		fnInfo(oInfo,"给景区评分^_^");
    	} 
    	
    });

}
function fnIndexOut() {
	addClass(oNews,"pageShow");
	addClass(oMask,"pageShow");
	fnNews();
    oIndex.style.WebkitFilter="blur(5px)";
    oIndex.style.MozFilter="blur(5px)";
    oIndex.style.OFilter="blur(5px)";
    oIndex.style.MsFilter="blur(5px)";
    oIndex.style.filter="blur(5px)";
    oNews.style.transition="0.5s";
    oNews.style.WebkitTransition="0.5s";
    oNews.style.MozTransition="0.5s";
    oNews.style.MsTransition="0.5s";
    oNews.style.OTransition="0.5s";
    setTimeout(function(){
    	oMask.style.opacity=1;
    },14);
    setTimeout(function(){
    	removeClass(oIndex,"pageShow");
	    oIndex.style.WebkitFilter="blur(0px)";
        oIndex.style.MozFilter="blur(0px)";
        oIndex.style.OFilter="blur(0px)";
        oIndex.style.MsFilter="blur(0px)";
        oIndex.style.filter="blur(0px)";
	    oNews.style.opacity=1;
	    removeClass(oMask,"pageShow");
	},3000);
}
function fnNews(){
	var aInput = oNews.getElementsByTagName("input");
	var oInfo = getByClass(oNews,"hint")[0];
	aInput[0].onchange = function() {
		if(this.files[0].type.split("/")[0] == "video") {
			fnNewsOut();
		} else{
			fnInfo(oInfo,"请上传视频");
		}
	};
	aInput[1].onchange = function() {
		if(this.files[0].type.split("/")[0] == "image") {
			fnNewsOut();
		} else{
			fnInfo(oInfo,"请上传图片");
		}
	};
}
function fnNewsOut() {
	oNews.style.cssText = "";
	addClass(oVideoInfo,"pageShow");
	removeClass(oNews,"pageShow");
	fnVideoInfo();
}

function fnVideoInfo() {
    var aTags = oVideoInfo.getElementsByTagName("label");
    var oBtn = document.getElementById("infoBtn");
    var oInfo = getByClass(oVideoInfo,"hint")[0];
    var oInfoLabels = document.getElementById("infoLabels");
    function fnTag() {
    	for(var i=0;i<aTags.length;i++) {
    		var checked = aTags[i].getElementsByTagName("input")[0].on;
    		if(checked) {
    			return true;
    		}
    	}
    	return false;
    }
    bind(oInfoLabels,"touchend",function(event){
    	console.log(event.target.tagName);
		if(event.target.tagName == "SPAN"){
    		if(!event.target.previousElementSibling.checked){
    			addClass(event.target.parentNode,"active");
    			event.target.previousElementSibling.on = true;
    		} else {
    			removeClass(event.target.parentNode,"active");
    			event.target.previousElementSibling.on = false;
    		}
    	} else if (event.target.tagName == "LABEL"){
    		if(!event.target.children[0].checked){
    			addClass(event.target,"active");
    			event.target.children[0].on = true;
    		} else {
    			removeClass(event.target,"active");
    			event.target.children[0].on = false;
    		}
    	}
    	if(fnTag()) {
    		addClass(oBtn,"submit");
    	} else {
    		removeClass(oBtn,"submit");
    	}
    	return false;
    });
    bind(oBtn,"touchend",function() {
    	fnOver();
    });
}
function fnOver() {
	var oBtn = oOver.getElementsByTagName("input")[0];
	removeClass(oVideoInfo,"pageShow");
	addClass(oOver,"pageShow");
	bind(oBtn,"touchend",function() {
		removeClass(oOver,"pageShow");
		addClass(oIndex,"pageShow");
	});
}
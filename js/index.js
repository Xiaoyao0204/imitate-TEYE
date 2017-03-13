var page1 = document.getElementById("page1");

var rightBottom = document.getElementById("rightBottom");
var rightBottomA = rightBottom.getElementsByTagName("a")[0];

var goTop = document.getElementById("goTop");
var goTopSpans = goTop.getElementsByTagName("span");

var bookPageBtn = document.getElementById("bookPageBtn");
var bookPageBtnSpans = bookPageBtn.getElementsByTagName("span");

var pageSpeed = document.getElementById("pageSpeed");
var pageSpeedLis = pageSpeed.getElementsByClassName("pages");
var pageSpeedMove = pageSpeed.getElementsByClassName("pageSpeed-move")[0];
var pageSpeedMouseIco = pageSpeed.getElementsByClassName("mouseIco")[0];
var pageSpeedMouseIcoSpan = pageSpeedMouseIco.getElementsByTagName("span")[0];

var downLoadPDF = document.getElementById("leftBottom");
var downLoadPDFImg = downLoadPDF.getElementsByTagName("img")[0];

var text1 = document.getElementsByClassName("text1")[0];

var eye = document.getElementById("eye");
var eyes = eye.getElementsByTagName("div");//左眼和右眼
var leftEye = document.getElementById("left-eye");//左眼
var rightEye = document.getElementById("right-eye");//右眼

var teyeHead = document.getElementById("teyeHead");//隐藏的上半身图片
var teyeFoot = document.getElementById("teyeFoot");//隐藏的下半身图片

var texts = document.getElementById("texts");
var textsLis = texts.getElementsByTagName("li");

var imgLodingBox = document.getElementById("imgLodingBox");//缓存图片
var img360 = document.getElementById("img360");

var pageNum = 0; //当前页数
var windowW = null; //获取可视区的宽度
var windowH = null; //获取可视区的高度
var windowProportionW = null;//屏幕宽度比例
var windowProportionH = null;//屏幕高度比例
var ifScroll = true; //是否可以滚动
var svgNum = 0;
var clearIfscroll = null;

var svg1 = document.getElementById("svg1");
var path1 = document.getElementById("path1");
//第六页相关内容
var page6text = document.getElementById("page6text");//第六页文字
var radiusImg = document.getElementById("radius-img");//第六页360度提示图片
//第六页4个A标签
var page6As = document.getElementById("page6-a");//总的大盒子
var page6As2 = page6As.getElementsByTagName("a");//四个a标签
var page6ALt = page6As.getElementsByClassName("page6-a-lt")[0];
var page6ALb = page6As.getElementsByClassName("page6-a-lb")[0];
var page6ARt = page6As.getElementsByClassName("page6-a-rt")[0];
var page6ARb = page6As.getElementsByClassName("page6-a-rb")[0];
//第七页相关
var page7text = document.getElementById("page7text");//第七页文字
var page7As = document.getElementById("page7-a");//大盒子
var page7AsLi = page7As.getElementsByTagName("li");
var page7AsLv1 = page7As.getElementsByClassName("page7-Lv1")[0];//就一个
var page7AsLv2 = page7As.getElementsByClassName("page7-Lv2");
var page7AsLv3 = page7As.getElementsByClassName("page7-Lv3")[0];//就一个
var page7AsLv4 = page7As.getElementsByClassName("page7-Lv4");
var page7AsLv5 = page7As.getElementsByClassName("page7-Lv5");
var page7AsLv6 = page7As.getElementsByClassName("page7-Lv6");
//-------第八页--------------------------
var page8 = document.getElementById("page8");
var page8text = document.getElementById("page8Text");//第八页文字
//第八页列表
var page8List = page8.getElementsByClassName("page8List")[0];
var page8Lis = page8List.getElementsByClassName("page8Lis");//改的是每个下面的span
//男女
var teyes = document.getElementById("teyes");
//男
var man = teyes.getElementsByClassName("teye-man")[0];
var manHead = man.getElementsByClassName("man-head")[0];
var manFoot = man.getElementsByClassName("man-foot")[0];
var manEyes = man.getElementsByClassName("man-eyes")[0];
var manLEye = man.getElementsByClassName("man-leftEye")[0];
var manREye = man.getElementsByClassName("man-rightEye")[0];
//女
var woman = teyes.getElementsByClassName("teye-woman")[0];
var womanHead = woman.getElementsByClassName("woman-head")[0];
var womanFoot = woman.getElementsByClassName("woman-foot")[0];
var womanEyes = woman.getElementsByClassName("woman-eyes")[0];
var womanLEye = woman.getElementsByClassName("woman-leftEye")[0];
var womanREye = woman.getElementsByClassName("woman-rightEye")[0];

var genderTab = false;//性别切换开关,false代表无法切换


//第九页
var page9 = document.getElementById("page9");
//var manis
//测试元素
//var ceshi = document.getElementById("ceshiLi");
//每一页的状态
var isNum6 = false;//当前是第六页
var isNum7 = false;//当前是第七页

//---------------------适配第一页的高度---------------------------------
window.onresize = page1H;
page1H();

function page1H() {
	windowH = document.documentElement.clientHeight;
	windowW = document.documentElement.clientWidth;
	console.log(windowW,windowH);
	page1.style.height = windowH + "px";
	document.body.style.height = windowH + "px";
	page7As.style.height = windowH + "px";
	windowProportionW = windowW / 1920;
	windowProportionH = windowH / 974;
	page8.style.height = windowH + "px";
	page9.style.height = windowH + "px";
}
//------------------添加滚轮事件--------------------------------------------
//适配谷歌
document.addEventListener("mousewheel", function(ev) {
		console.log(ev.wheelDelta); //向下滚动-150
		roller(ev);
	})
//适配火狐
document.addEventListener("DOMMouseScroll", function(ev) { //firefox
	console.log(ev.detail); //向下滚动3
	roller(ev);
	if(pageNum === 0){
		setTimeout(function(){
			ifScroll = false;
		},500)
	}
	if(pageNum != 0){
	}

})

function roller(ev) { //获取滚轮事件
	if(!ifScroll) {
		return;
	}

	clearIfscroll = setTimeout(function() {
		ifScroll = true;
	}, 1500)//多长时间可以继续切屏

	if(ev.wheelDelta < 0 || ev.detail > 0) { //滚轮向下
		pageNum++;
		ifScroll = false;
	}
	if(ev.wheelDelta > 0 || ev.detail < 0) { //滚轮向上
		if(pageNum === 0){
			ifScroll = true;
			return;
		}

		pageNum--;
		ifScroll = false;
		if(pageNum < 0) {
			pageNum = 0;
		}
	}
	console.log(pageNum);
	pageTab();
}

function pageTab() { //根据当前页数渲染不同的效果
	
	//第一页-----------------
	if(pageNum === 0){//首页
		page1.style.top = 0 + "px";
		goTop.style.right = (document.documentElement.clientWidth/2+goTop.offsetWidth/2) + "px";
		for(var i = 0; i < goTopSpans.length; i++) {
			goTopSpans[i].style.background = "#fff";
			bookPageBtnSpans[i].style.background = "#fff";
			if(i === 1) {
				goTopSpans[i].style.top = "8px";
			}
		}
		for(var i = 0; i < pageSpeedLis.length; i++) {
			pageSpeedLis[i].style.background = "#fff";
		}
		setTimeout(function(){
			text1.style.opacity = 1;
		},1200)
		pageSpeedMove.style.top = 0 + "px";
		pageSpeedMove.style.background = "#5dc1e9";
		pageSpeedMove.style.borderColor = "#fff";
		downLoadPDFImg.src = "imgs/leftBottom.png";
		
		rightBottom.getElementsByTagName("a")[0].style.backgroundPosition = "0 -613px";
		setTimeout(function(){
			rightBottom.getElementsByTagName("a")[0].style.backgroundPosition = "0 -613px";
		},1200)
		
		setTimeout(function(){
			rightBottomA.style.opacity = 1;
			rightBottomA.style.backgroundPosition = "0 -658px";
			path1.setAttribute("d", "");
			path1.style.strokeDasharray = '0,3179.42';
			svgNum = 0;

		},1500)

	}
	
	
	//第一页-----------------
	if(pageNum === 1) { //第一页

		goTop.style.right = 12 + "px";
		for(var i = 0; i < goTopSpans.length; i++) {
			goTopSpans[i].style.background = "#935a24";
			bookPageBtnSpans[i].style.background = "#935a24";
			if(i === 1) {
				goTopSpans[i].style.top = "25px";
			}
		}
		for(var i = 0; i < pageSpeedLis.length; i++) {
			pageSpeedLis[i].style.background = "#935a24";
		}
		page1.style.top = -windowH - 50 + "px";
		text1.style.opacity = 0;
		pageSpeedMove.style.top = "9px";
		pageSpeedMove.style.background = "#fff";
		pageSpeedMove.style.borderColor = "#935a24";
		downLoadPDFImg.src = "imgs/leftBottom2.png";
		rightBottomA.style.backgroundPosition = "0 -613px";
		
		timer1 = setInterval(function() {
			if(svgNum >= 3279.42) {
				clearInterval(timer1);
				path1.style.strokeDasharray = '3179.42,3179.42';
			}
			svgNum += 35.01;
			path1.style.strokeDasharray = svgNum + ',3179.42';

		}, 16)
		path1.setAttribute("d", "M786.996,841H6.001c-2.762,0-5-2.238-5-4.996V5.998c0-2.76,2.238-4.998,5-4.998H800c2.762,0,5,2.238,5,4.998v830.006c0,2.76-2.238,4.996-5,4.996H786.996");
		//第一页要显示的是第0个文字，并且需要让第一个在下面准备
		textsLis[1].style.top = 40+"px";
		textsLis[1].style.opacity = 0;
		setTimeout(function(){
			textsLis[0].style.top = 0;
			textsLis[0].style.opacity = 1;
		},300)
		//眼睛
		leftEye.style.transform = "rotate(0deg)";
		rightEye.style.transform = "rotate(0deg)";
		
		//要显示的top值：0，在上面的：-40，在下面的：40
	}
	
	
	//第二页-----------------
	if(pageNum === 2) {
		//第二页要显示的是第1个li，并且需要让第2个在下面准备，第0个在上面准备
		textsLis[0].style.top = -40+"px";
		textsLis[0].style.opacity = 0;
		setTimeout(function(){
			textsLis[1].style.top = 0;
			textsLis[1].style.opacity = 1;
		},300);
		textsLis[2].style.top = 40+"px";
		textsLis[2].style.opacity = 0;
		
		//眼睛
		
		leftEye.style.transform = "rotate(90deg)";
		rightEye.style.transform = "rotate(-90deg)";
		
		//右侧进度
		pageSpeedMove.style.top = "16px";
	}
	
	
	//第三页-----------------
	if(pageNum === 3) {
		//第3页要显示的是第2个li，并且需要让第1个在下面准备，第3个在上面准备
		textsLis[1].style.top = -40+"px";
		textsLis[1].style.opacity = 0;
		setTimeout(function(){
			textsLis[2].style.top = 0;
			textsLis[2].style.opacity = 1;
		},300);
		textsLis[3].style.top = 40+"px";
		textsLis[3].style.opacity = 0;
		
		//眼睛
		leftEye.style.transform = "rotate(0deg)";
		rightEye.style.transform = "rotate(-90deg)";
		
		//右侧进度
		pageSpeedMove.style.top = "24px";
	}
	
	
	//第四页-----------------
	if(pageNum === 4) {
		//第4页要显示的是第3个li，并且需要让第4个在下面准备，第2个在上面准备
		textsLis[2].style.top = -40+"px";
		textsLis[2].style.opacity = 0;
		setTimeout(function(){
			textsLis[3].style.top = 0;
			textsLis[3].style.opacity = 1;
		},300);
		textsLis[4].style.top = 40+"px";
		textsLis[4].style.opacity = 0;
		
		//眼睛
		leftEye.style.transform = "rotate(25deg)";
		rightEye.style.transform = "rotate(-205deg)";
		
		//右侧进度
		pageSpeedMove.style.top = "32px";
	}
	
	
	//第五页-----------------
	if(pageNum === 5) {
		if(isNum6 === true){
			img360.style.transition = "0.3s 0.4s";
			teyeHead.style.transition = "0.2s 0.2s";
			teyeFoot.style.transition = "0.2s 0.3s，0.1s 0.3s opacity";
			eye.style.transition = "1.5s 0.4s,0.3s 0.4s opacity";
			
			teyeHead.style.opacity = 1;
			teyeFoot.style.opacity = 1;
			img360.style.opacity = "0";
			eye.style.opacity = "1";
			page6As.style.display = "none";
			page6As.style.opacity = "0";
			
			page6text.style.opacity = 0;//第六页文字
			radiusImg.style.transition = "0.4s 0.4s";
			radiusImg.style.opacity = 0;
			setTimeout(function(){
				
				svg1.style.transition = "1.5s 0.4s";
				
				
				
				svg1.style.width = "810px";
				svg1.style.height = "613px";
				svg1.style.top = "360px";
				svg1.style.marginLeft = "-405px";
				svg1.style.opacity = 1;
				
				
				
				eye.style.width = "810px";
				eye.style.height = "613px";
				eye.style.top = "360px";
				eye.style.marginLeft = "-405px";
				
				
				leftEye.style.transformOrigin = "center center";
				rightEye.style.transformOrigin = "center center";
				
				leftEye.style.width = "23%";
				leftEye.style.height = "4.8%";
				leftEye.style.margin = "37.5% 5% 0 19.5%";
				
				rightEye.style.width = "23%";
				rightEye.style.height = "4.8%";
				rightEye.style.margin = "37.5% 19.5% 0 5%";
				
				teyeHead.style.transition = "1.5s 0.4s";
				teyeFoot.style.transition = "1.5s 0.4s,0.6s 0.3s opacity";
				
				teyeHead.style.opacity = 0;
				teyeFoot.style.opacity = 0;
				
				teyeHead.style.width = "1100px";
				teyeHead.style.height = "900px";
				teyeHead.style.top = "252px";
				teyeHead.style.marginLeft = "-550px";
				
				teyeFoot.style.width = "812px";
				teyeFoot.style.height = "694px";
				teyeFoot.style.top = '383px';
				teyeFoot.style.marginLeft = "-407px";
			},500)
			
			
			setTimeout(function(){
				img360.style.display = "none";
				img360.style.opacity = "1";
			},600)
			
			setTimeout(function(){
				console.log("123");
				isNum6 = false;
				//第5页要显示的是第4个li，这是最后一个，第3个在上面准备
				textsLis[3].style.top = -40+"px";
				textsLis[3].style.opacity = 0;
				setTimeout(function(){
					textsLis[4].style.top = 0;
					textsLis[4].style.opacity = 1;
				},300);
				
				//眼睛
				leftEye.style.transform = "rotate(-25deg)";
				rightEye.style.transform = "rotate(-155deg)";
				
				//右侧进度
				pageSpeedMove.style.top = "40px";
			},700)
		}else{
			console.log("123");
			//第5页要显示的是第4个li，这是最后一个，第3个在上面准备
			textsLis[3].style.top = -40+"px";
			textsLis[3].style.opacity = 0;
			setTimeout(function(){
				textsLis[4].style.top = 0;
				textsLis[4].style.opacity = 1;
			},300);
			
			//眼睛
			leftEye.style.transform = "rotate(-25deg)";
			rightEye.style.transform = "rotate(-155deg)";
			
			//右侧进度
			pageSpeedMove.style.top = "40px";
		}
		
		
		
		
	}
	
	
	
	
	
	//第六页-----------------
	if(pageNum === 6) {
		isNum6 = true;
		
		if(isNum7){
			page7text.style.transition = "0.3s 0.3s";
			page7text.style.opacity = 0;
			page6text.style.transition = "1.5s 0.3s";
			page7As.style.transform = "scale(0)";
			img360.style.opacity = 1;
			isNum7 = false;
		}
		
		//第5页要把第4个文字扔上去
		textsLis[4].style.top = -40+"px";
		textsLis[4].style.opacity = 0;
		
		//眼睛
		eye.style.width = "460px";
		eye.style.top = "180px";
		eye.style.marginLeft = "-230px";
		
		page6As.style.display = "block";
		
		
		
		leftEye.style.transformOrigin = "30% center";
		rightEye.style.transformOrigin = "30% center";
		setTimeout(function(){
			leftEye.style.transform = "rotate(90deg)";
			leftEye.style.width = "96px";
			leftEye.style.height = "14px";
			leftEye.style.margin = "27.5% 5% 0 24.5%";
			
			rightEye.style.transform = "rotate(-270deg)";
			rightEye.style.width = "96px";
			rightEye.style.height = "14px";
			rightEye.style.margin = "28% 19.5% 0 5%";
			
			
		},0);
		
		//右侧进度
		pageSpeedMove.style.top = "48px";
		
		//元素svg1的bottom值和left和宽度值改变
		svg1.style.width = "440px";
		svg1.style.top = "154px";
		svg1.style.marginLeft = "-233px";
		svg1.style.opacity = 0;
		
		//隐藏的头部图片跟随显现出来（透明度改变）同时改变
		teyeHead.style.transition = "1.3s 0.4s,opacity 0.4s 0.4s";
		teyeHead.style.opacity = 1;
		teyeHead.style.width = "600px";
		teyeHead.style.height = "675px";
		teyeHead.style.top = "77px";
		teyeHead.style.marginLeft = "-311px";
		
		teyeFoot.style.transition = "1.3s 0.4s,opacity 1.4s 0.4s";
		teyeFoot.style.opacity = 1;
		teyeFoot.style.width = "440px";
		teyeFoot.style.height = "484px";
		teyeFoot.style.top = '210px';
		teyeFoot.style.marginLeft = "-231px";
		
		page6text.style.opacity = 1;//第六页文字
		radiusImg.style.transition = "1s 0.9s";
		radiusImg.style.opacity = 1;
		setTimeout(function(){
			eye.style.transition = "0.7s 0.1s";
			svg1.style.transition = "0.7s 0.1s";
			teyeHead.style.transition = "0.7s 0.1s";
			teyeFoot.style.transition = "0.7s 0.1s,0.1s 0.4s opacity";
			eye.style.opacity = 0;
			svg1.style.opacity = 0;
			teyeHead.style.opacity = 0;
			teyeFoot.style.opacity = 0;
			
			page6As.style.opacity = 1;
		},1600)
		setTimeout(function(){
			img360.style.display = "block";
		},1700)
	}
	//----------------第七页-----------------------------------------------------
	if(pageNum === 7){
		isNum7 = true;
		radiusImg.style.transition = "0.4s";
		page6text.style.transition = "0.4s";
		radiusImg.style.opacity = 0;
		page6text.style.opacity = 0;
		page6As.style.opacity = 0;
		
		page7text.style.transition = "1.5s 1.2s";
		page7text.style.opacity = 1;
//		page7As.style.opacity = 1;
		teyeHead.style.transition = "1s 0.4s,0.5s 0.3s opacity";
		teyeFoot.style.transition = "1s 0.4s,0.3s 0.4s opacity";
		eye.style.transition = "1s 0.4s,0.5s 0.3s opacity";
		teyeHead.style.opacity = 1;
		teyeFoot.style.opacity = 1;
		eye.style.opacity = 1;
		
		setTimeout(function(){
			img360.style.opacity = 0;
		},600);
		setTimeout(function(){
			img360.style.display = "none";
		},650);
		setTimeout(function(){
			teyeHead.style.transition = "1.5s 0.4s,0.5s 0.3s opacity";
			teyeFoot.style.transition = "1.5s 0.4s,0.3s 0.4s opacity";
			eye.style.transition = "1.5s 0.4s";
			teyeHead.style.top = "-800px";
			eye.style.top = "-800px";
			teyeFoot.style.top = "1100px";
			
			page7As.style.transform = "scale(1)";
		},700);
	}
	//-----------------第八页-------------------------------------
	if(pageNum === 8){
		genderTab = false;
		page7As.style.transform = "scale(0)";
		page7text.style.transition = "1.5s";
		page7text.style.opacity = 0;
		setTimeout(function(){
			page8.style.display = "block";
		},1500);
		setTimeout(function(){
			page8List.style.opacity = 1;
			page8.style.opacity = 1;
			page8text.style.opacity = 1;
			
			manHead.style.top = "0";
			manFoot.style.top = "0";
			womanHead.style.top = "0";
			womanFoot.style.top = "0";
		},1550)
		setTimeout(function(){
			man.style.left = "350px";
			man.style.transform = "translate3d(0px, 0px, 0px)";
			woman.style.right = "300px";
			woman.style.transform = "translate3d(0px, 0px, -50px)";
			woman.style.opacity = "0.5";
			genderTab = true;
		},3000)
	}
	
}

//第七页的鼠标移动效果

document.addEventListener("mousemove",page7AsPosi);
function page7AsPosi(ev){
	//1920 974
	page7AsPosi2(ev,page7AsLv1,100,100);
	
	for (var i = 0; i < page7AsLv2.length; i++) {
		page7AsPosi2(ev,page7AsLv2[i],40,30);
	}
	
	page7AsPosi2(ev,page7AsLv3,20,20);
	for (var i = 0; i < page7AsLv4.length; i++) {
		page7AsPosi2(ev,page7AsLv4[i],11,12);
	}
	for (var i = 0; i < page7AsLv5.length; i++) {
		page7AsPosi2(ev,page7AsLv5[i],5,9);
	}
	for (var i = 0; i < page7AsLv6.length; i++) {
		page7AsPosi2(ev,page7AsLv6[i],15,15);
	}
}
function page7AsPosi2(ev,el,speedX,speedY){
	var posiX = Number(el.dataset.positionX) * windowProportionW - 50;
	var posiY = Number(el.dataset.positionY) * windowProportionH - 50;
	el.style.left = -ev.clientX / speedX + posiX + "px";
	el.style.top = -ev.clientY / speedY + posiY + "px";
}


//-----------------------非滚轮切换事件--------------------------------------------------
//右侧鼠标图标上下移动
function mouseIcoMoveUp() {
	pageSpeedMouseIco.style.bottom = 6 + 'px';
	pageSpeedMouseIcoSpan.style.top = 3 + 'px';
	setTimeout(function() {
		mouseIcoMoveBottom();
	}, 700)
}

function mouseIcoMoveBottom() {
	pageSpeedMouseIco.style.bottom = 0;
	pageSpeedMouseIcoSpan.style.top = 6 + 'px';
	setTimeout(function() {
		mouseIcoMoveUp();
	}, 700)
}
mouseIcoMoveUp();

//页面加载进来右眼转一下
setTimeout(function(){
	rightEye.style.transform = "rotate(90deg)";
},1000);
setTimeout(function(){
	rightEye.style.transform = "rotate(0deg)";
},1500);
setTimeout(function(){
	for (var i = 0; i < eyes.length; i++) {
		eyes[i].style.transition = "1.5s 0.4s";//上来右眼转完后眼睛的过度时间
	}
},1700)
//右下角图标
//rightBottom.onmouseover = function(){
//	
//}
//缓存360度旋转图片
var imgLoding = "";
for (var i = 7434; i < 7506; i++) {
	imgLoding += "<img src='img/IMG_"+ i +".jpg' />";
}
imgLodingBox.innerHTML = imgLoding;


//360度旋转图片部分
var isDown360 = false;//判断是否按下
var img360Num = 0;
var disX = null;
var disX3 = null;
var disX2 = null;
var img360Arr = [];
var str = null;
for (var i = 7434; i < 7506; i++) {
	img360Arr.push("img/IMG_"+ i +".jpg");
}
str = img360Arr[0];



img360.addEventListener("mousedown",function(ev){
	disX = ev.clientX;
	disX2 = ev.clientX;
	disX3 = ev.clientX;
	isDown360 = true;
	document.body.style.cursor = "url(imgs/mouse-down.cur),move";
	img360.style.cursor = "url(imgs/mouse-down.cur),move";
	console.log("156651");
	ev.preventDefault();
});
document.addEventListener("mousemove",function(ev){
	if(!isDown360 || Math.abs(ev.clientX - disX) < 10){
		return;
	}
	//document.cursor = "url(imgs/mouse-down.cur),move";
	//img360.style.cursor = "url(imgs/mouse-down.cur),move";
	disX = ev.clientX;
	if((disX3 - ev.clientX) > 0){
		img360Num--;
		disX3 = ev.clientX;
		if(img360Num < 0){
			img360Num = img360Arr.length-1;
		}
		str = img360Arr[img360Num];
	}
	if((disX3 - ev.clientX) < 0){
		img360Num++;
		disX3 = ev.clientX;
		if(img360Num > img360Arr.length-1){
			img360Num = 0;
		}
		str = img360Arr[img360Num];
	}
	img360.src = str;
});
document.addEventListener("mouseup",function(ev){
	isDown360 = false;
	document.body.style.cursor = "default";
//	document.cursor = "url(imgs/mouse-up.cur),move";
	img360.style.cursor = "url(imgs/mouse-up.cur),move";
});

//第六个四个a标签的移入移出
//左上
page6ALt.onmouseover = function(){
	if(isDown360){
		this.style.cursor = "url(imgs/mouse-down.cur),move";
		return;
	}
	this.getElementsByTagName("span")[0].style.transform = "scale(1)";
	this.getElementsByTagName("i")[0].style.left = "133px";
}
page6ALt.onmouseout = function(){
	this.getElementsByTagName("span")[0].style.transform = "scale(0)";
	this.getElementsByTagName("i")[0].style.left = "33px";
}
//左下
page6ALb.onmouseover = function(){
	if(isDown360){
		this.style.cursor = "url(imgs/mouse-down.cur),move";
		return;
	}
	this.getElementsByTagName("span")[0].style.transform = "scale(1)";
	this.getElementsByTagName("i")[0].style.left = "133px";
}
page6ALb.onmouseout = function(){
	this.getElementsByTagName("span")[0].style.transform = "scale(0)";
	this.getElementsByTagName("i")[0].style.left = "33px";
}
//右上
page6ARt.onmouseover = function(){
	if(isDown360){
		this.style.cursor = "url(imgs/mouse-down.cur),move";
		return;
	}
	this.getElementsByTagName("span")[0].style.transform = "scale(1)";
	this.getElementsByTagName("i")[0].style.left = "14px";
}
page6ARt.onmouseout = function(){
	this.getElementsByTagName("span")[0].style.transform = "scale(0)";
	this.getElementsByTagName("i")[0].style.left = "114px";
}
//右下
page6ARb.onmouseover = function(){
	if(isDown360){
		this.style.cursor = "url(imgs/mouse-down.cur),move";
		return;
	}
	this.getElementsByTagName("span")[0].style.transform = "scale(1)";
	this.getElementsByTagName("i")[0].style.left = "15px";
}
page6ARb.onmouseout = function(){
	this.getElementsByTagName("span")[0].style.transform = "scale(0)";
	this.getElementsByTagName("i")[0].style.left = "114px";
}
for (var i = 0; i < page6As2.length; i++) {
	page6As2[i].onmouseup = function(){
		this.style.cursor = "pointer";
	}
}

//第七页a标签的移入移出效果
for (var i = 0; i < page7AsLi.length; i++) {
	page7AsLi[i].onmouseover = function(){
		this.getElementsByTagName("a")[0].style.display = "none";
		this.getElementsByTagName("a")[1].style.display = "block";
	}
	page7AsLi[i].onmouseout = function(){
		this.getElementsByTagName("a")[0].style.display = "block";
		this.getElementsByTagName("a")[1].style.display = "none";
	}
}

//---男在前

//man.addEventListener("mousemove",manGo);
//man.addEventListener("mouseout",manOut);
//woman.addEventListener("mousemove",womanGo);
//woman.addEventListener("mouseout",womanOut);

function womanOut(ev){
	if(ev.clientX > man.getBoundingClientRect().left && ev.clientX < (man.getBoundingClientRect().right) && ev.clientY > man.getBoundingClientRect().top && ev.clientY < man.getBoundingClientRect().bottom){
		
		woman.removeEventListener("mouseout",womanOut);
		woman.removeEventListener("mousemove",womanGo);
		man.removeEventListener("mouseout",manOut);
		man.removeEventListener("mousemove",manGo);
		setTimeout(function(){
			woman.addEventListener("mouseout",womanOut);
			woman.addEventListener("mousemove",womanGo);
			man.removeEventListener("mouseout",manOut);
			man.removeEventListener("mousemove",manGo);
		},700)
		manGo();
	}
}
function manOut(ev){
	
	if(ev.clientX > (woman.getBoundingClientRect().left) && ev.clientX < woman.getBoundingClientRect().right && ev.clientY > woman.getBoundingClientRect().top && ev.clientY < woman.getBoundingClientRect().bottom){
		
		womanGo();
		woman.removeEventListener("mouseout",womanOut);
		woman.removeEventListener("mousemove",womanGo);
		man.removeEventListener("mouseout",manOut);
		man.removeEventListener("mousemove",manGo);
		setTimeout(function(){
			woman.addEventListener("mouseout",womanOut);
			woman.addEventListener("mousemove",womanGo);
			man.removeEventListener("mouseout",manOut);
			man.removeEventListener("mousemove",manGo);
		},700)
	}
	
}
function manGo(){
	console.log("男");
	
	setTimeout(function(){
		woman.style.zIndex = "1";
		man.style.zIndex = "2";
	},350);
	man.style.animation = "man1 0.7s linear";
	man.style.animationFillMode = "forwards";
	woman.style.animation = "woman1 0.7s linear";
	woman.style.animationFillMode = "forwards";
	
		woman.removeEventListener("mouseout",womanOut);
		woman.removeEventListener("mousemove",womanGo);
		man.removeEventListener("mouseout",manOut);
		man.removeEventListener("mousemove",manGo);
		setTimeout(function(){
			woman.addEventListener("mouseout",womanOut);
			woman.addEventListener("mousemove",womanGo);
			man.removeEventListener("mouseout",manOut);
			man.removeEventListener("mousemove",manGo);
		},700)
}
function womanGo(){
	setTimeout(function(){
		woman.style.zIndex = "2";
		man.style.zIndex = "1";
	},300);
	console.log("女");
	man.style.animation = "man2 0.7s linear";
	man.style.animationFillMode = "forwards";
	woman.style.animation = "woman2 0.7s linear";
	woman.style.animationFillMode = "forwards";
	
	woman.removeEventListener("mouseout",womanOut);
	woman.removeEventListener("mousemove",womanGo);
	man.removeEventListener("mouseout",manOut);
	man.removeEventListener("mousemove",manGo);
	setTimeout(function(){
		woman.addEventListener("mouseout",womanOut);
		woman.addEventListener("mousemove",womanGo);
		man.removeEventListener("mouseout",manOut);
		man.removeEventListener("mousemove",manGo);
	},700)
}
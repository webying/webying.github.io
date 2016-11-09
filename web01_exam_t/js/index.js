//将子项隐藏
$(".baseUI>li>ul").slideUp(300);
$(".baseUI>li>a").off("click");//避免重複綁定
//给父项绑定事件
$(".baseUI>li>a").on("click",function(){
	$(".baseUI>li>ul").slideUp(300);
	$(this).next().slideDown(300);
});

//模拟点击事件
$(".baseUI>li>a").eq(0).trigger("click");
//模拟点击“全部题目”
// $(".baseUI>li>ul>li>a").eq(0).trigger("click");

//点击某个子项时，有高亮
$(".baseUI>li>ul>li").on("mouseover",function(){
	$(this).addClass("current");
});
$(".baseUI>li>ul>li").on("mouseout",function(){
	$(this).removeClass("current");
});

var l=$(".xianshi");
console.log(l);
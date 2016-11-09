$(function(){

    var body=$("body")[0];
    var jindown=$(".jin-down")[0];
    body.onclick=function(e){
        var ev=e||window.event;
        var mu=ev.srcElement||ev.target;
        if(mu.className=="jinzi"||mu.className=="jintu"){
            jindown.style.display="block";
        }else{
            jindown.style.display="none";
        }
    }
//
    var rigtwo=$(".rigtwo")[0];
    var todowna=$(".todowna")[0];
    var todownb=$(".todownb")[0];
    rigtwo.onmouseover=function(){
        todowna.style.display="block";
        todownb.style.display="block";
    }
    rigtwo.onmouseout=function(){
        todowna.style.display="none";
        todownb.style.display="none";
    }
//
    var rigone=$(".rigone")[0];
    var todownc=$(".todownc")[0];
    var todownd=$(".todownd")[0];
    rigone.onmouseover=function(){
        todownc.style.display="block";
        todownd.style.display="block";
    }
    rigone.onmouseout=function(){
        todownc.style.display="none";
        todownd.style.display="none";
    }
//导航右    
    var seimg=$(".seimg");
        for(var i=0;i<seimg.length;i++){
            seimg[i].nub=i;
            seimg[i].onmouseover=function(){
            this.style.width="36px";
            this.style.marginTop="10px";
            this.style.marginLeft="28px";
        }
            seimg[i].onmouseout=function(){
            this.style.width="32px";
            this.style.marginTop="12px";
            this.style.marginLeft="30px";
        }      
    }
//banner
    var imgs=$("img",$(".lun")[0]);
    var lis=$("li",$(".lis")[0]);
    var box=$(".banner")[0];
    var left=$(".left",box)[0];
    var right=$(".right",box)[0];
    var t=setInterval(move,3500);
    var index=0; //当前图片
    var next=0;  //下个图片
    var width=parseInt(getStyle(imgs[0],"width"));
    var flag=true; //开关
    //图片自动轮播
    function move(){
        if(!flag){
            return;
        }
        flag=false;
        next=index+1; //下一张图下标比当前图片多一
        if(next>=imgs.length){  //如果下一张大于等于所有图片长度
            next=0;  //下一张下标变为0
        }
        for(var i=0;i<imgs.length;i++){  //小圆点循环
            lis[index].style.background="#dfdfdf"; //
            lis[next].style.background="#e40077";
        }           
        imgs[next].style.left=width+"px"; //将下一张图片固定在图片框的右边
        animate(imgs[index],{left:-width},800);//当前图片移动到图片框的左边
        animate(imgs[next],{left:0},800,function(){flag=true});//下一张图移动到图片框里
        index=next;  //                                    
    }
    //鼠标移入移出事件
    box.onmouseover=function(){
        clearInterval(t);      //移入将停止时间进程
        left.style.display="block"; //左右小框显示
        right.style.display="block";
    }
    box.onmouseout=function(){
        t=setInterval(move,3500);   //移出鼠标时将继续轮播
        left.style.display="none";
        right.style.display="none";  //左右小框不显示
    }
    //左右点击事件
    right.onclick=function(){
        move();
    }
    left.onclick=function(){    
        if(!flag){
            return;
        }
        flag=false;
        next=index-1;
        if(next<0){
            next=imgs.length-1;
        }
        for(var i=0;i<imgs.length;i++){
            lis[index].style.background="#dfdfdf"; //在下一个变前先变为没有背景
            lis[next].style.background="#e40077"; 
        } 
        imgs[next].style.left=-width+"px";
        animate(imgs[index],{left:width},800);
        animate(imgs[next],{left:0},800,function(){flag=true});
        index=next;
    }
    //小圆点点击事件
    for(var i=0;i<lis.length;i++){
        lis[i].now=i;  //将下标i给属性now
        lis[i].onclick=function(){
            if(this.now>index){  //当点击的下标大于当前下标时
                if(!flag){
                    return;
                }   
                flag=false;
                imgs[this.now].style.left=width+"px";   //下一张图片在图框右边
                animate(imgs[index],{left:-width},800);  //当前图片移动到框左边
                animate(imgs[this.now],{left:0},800,function(){flag=true});   //下一张图片移动到框内
            }else if(this.now<index){  //小于时将向右移动
                if(!flag){
                    return;
                }   
                flag=false;
                imgs[this.now].style.left=-width+"px";  //下一张图在框左边
                animate(imgs[index],{left:width},800);  //当前图移到框右边
                animate(imgs[this.now],{left:0},800,function(){flag=true});  //下一张移到框内
            }
            for(var i=0;i<lis.length;i++){
                lis[index].style.background="#dfdfdf"; 
                lis[this.now].style.background="#e40077";
            }
            index=this.now;
            next=this.now;
        }
    }
//轮播
    var scrren=$(".scrren")[0];
    var banner=$("ul",scrren)[0];
    var li=$("li",banner);
    var sleft=$(".sleft")[0];
    var sright=$(".sright")[0];
    var swidth=parseInt(getStyle(li[0],"width"));
    var st=setInterval(dong,2500);
    var fla=true;
    function dong(){
        if(!fla){
            return;
        }
        fla=false;
        animate(banner,{left:-swidth},1000,function(){  
        //将整个放图片的大框向左移动
            var first=getFirstKid(banner);//获取第一张图片
            banner.appendChild(first); //将第一张图片放到最后
            banner.style.left="0px";  //同时将大框移回来
            fla=true;
        })
    }
    scrren.onmouseover=function(){
        clearInterval(st);    //结束时间进程
        sleft.style.display="block";
        sright.style.display="block";
    }
    scrren.onmouseout=function(){
        st=setInterval(dong,2500);  //
        sleft.style.display="block";
        sright.style.display="block"
    }
    sright.onclick=function(){
        dong();
    }
    sleft.onclick=function(){
        if(!fla){
            return;
        }
        fla=false;
        var first=getFirstKid(banner);
        var last=getLastKid(banner);
        insertBefore(last,first);
        banner.style.left=-swidth+"px";
        animate(banner,{left:0},1000,function(){fla=true})
    }

//图片动态效果
    var pic=$(".g4-pic");
    for(var i=0;i<pic.length;i++){
        pic[i].nub1=i;
        pic[i].onmouseover=function(){
            animate(this,{marginRight:10},200);
        }
        pic[i].onmouseout=function(){
            animate(this,{marginRight:0},200);
        }    
    }
//输入
    var b1=$(".body1-left2")[0];
    var valuea=b1.value;
    b1.onfocus=function(){
       this.value="";
    }
    b1.onblur=function(){
        if(this.value==""){
            this.value=valuea;
        }
    }
    var b2=$(".text")[0];
    var value=b2.value;
    b2.onfocus=function(){
       this.value="";
    }
    b2.onblur=function(){
        if(this.value==""){
            this.value=value
        }
    }
//咨询动态效果
    var di=$(".k")[0];
    var ki=$("img",di);
    for(var j=0;j<ki.length;j++){
        ki[j].nub2=j;
        ki[j].onmouseover=function(){
            animate(this,{marginRight:40},200);
        }
        ki[j].onmouseout=function(){
            animate(this,{marginRight:0},400);
        }    
    }
//导航
    var span=$(".down");
    var down=$(".top-li");
    for(var j=0;j<down.length;j++){
        span[j].nub3=j;
        span[j].onmouseover=function(){
            $("a",this)[0].style.color="#3186FA";
            this.style.background="#f5f7fa";
            down[this.nub3].style.display="block";                                    
            down[this.nub3].style.zIndex="30";                                    
        }    
        span[j].onmouseout=function(){
            $("a",this)[0].style.color="#666";
            this.style.background="#e4e4e4";
            down[this.nub3].style.display="none";
            down[this.nub3].style.zIndex="10";
        }               
    }
//公告
    var ggbox=$(".body7")[0];
    var ggul=$("ul",ggbox);
    var leftli=$(".lileft")[0];
    var rightli=$(".liright")[0];
    var tg=setInterval(huan,1500);
    var gz=0;
    function huan(a){
        a=a||"r";
        if(a=="r"){
            gz++;
            if(gz>=ggul.length){
                gz=0;
            }
        }
        if(a=="l"){
            gz--;
            if(gz<0){
                gz=ggul.length-1;
            }
        }
        for(var i=0;i<ggul.length;i++){
            ggul[i].style.display="none";
        }
        ggul[gz].style.display="block";
    }
    ggbox.onmouseover=function(){
        clearInterval(tg);
    }
    ggbox.onmouseout=function(){
        tg=setInterval(huan,1500)
    }
    leftli.onclick=function(){
        huan("l");
    }
    rightli.onclick=function(){
        huan("r");
    }
    var bodys=$(".body");
    var sheight=document.documentElement.clientHeight;
    for(var i=0;i<bodys.length;i++){
        bodys[i].h=bodys[i].offsetTop;
    }
    window.onscroll=function(){
        var obj=document.body.scrollTop?document.body:document.documentElement;
        var scrollTop=obj.scrollTop;
        for(var i=0;i<bodys.length;i++){
            if(scrollTop>=bodys[i].h-sheight+200){
                var bimgs=$("img",bodys[i]);
                for(var j=0;j<bimgs.length;j++){
                    var aa=bimgs[j].getAttribute("aa");
                    bimgs[j].src=aa;
                }
            }
        }
    }
})
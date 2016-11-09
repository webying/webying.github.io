//获取类名的兼容性函数
//classname要获取的类名
//obj获取对象下的类名
function getclass(classname,obj){
	obj=obj||document;  //初始化对象
	if(obj.getElementsByClassName){   //识别getElementsByClassName时 
		return obj.getElementsByClassName(classname);
	}else{                            //不识别时
		var arr=[];
		var objs=obj.getElementsByTagName('*');//获取所有标签名的类名
		for(var i=0;i<objs.length;i++){
            var flag=checkClass(objs[i],classname)
			if(flag){
				arr.push(objs[i]);
			}
		}
		return arr;
	}
}
//检查
function checkClass(obj,classname){
    var str=obj.className;   //将多个类名赋给str(obj.className是字符串)
    var arr=str.split(" ");   //将类名以数组的形式保存
    for(var i=0;i<arr.length;i++){
    	if(arr[i]==classname){  //用户输入的类名是否与保存的相等
    		return true;
    	}
    }
    return false;
}
//获取文字的兼容性
//obj 是要获取的值
//val 是要设置的值
    function text(obj,val){
        if(val==undefined){   //判断是否设置值
        	if(obj.innerText){//若浏览器有innerText返回
        		return obj.innerText;
        	}else{  //若浏览器没有innerText返回textContent
        		return obj.textContent;
        	}
        }else{//设置值时
        	if(obj.innerText){
        		obj.innerText=val;//将值赋给obj
        	}else{
        		obj.textContent=val;
        	}
        }
    }
//获取行内外样式兼容函数
//arrt 所获取的属性值的属性
//obj 所获取的属性值的对象
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,null)[attr];
	}
}
//获取标签、类名、ID
//selector 选择器
//obj 对象
function $(selector,obj){
    if(typeof(selector)=="string"){
        obj=obj||document;    //初始化对象
        selector=selector.replace(/^\s*|\s*$/g,"");  //去掉字符串中的所有空格
        if(selector.charAt(0)=="."){    //当第一个字符为“.”
            return getclass(selector.substr(1),obj);
        }else if(selector.charAt(0)=="#"){    //当第一个字符为“#”
            return document.getElementById(selector.substr(1));
        }else if(/^[a-z][a-z0-6]{0,10}$/.test(selector)){    //当是标签时
            return obj.getElementsByTagName(selector);
        }else if(/^<[a-z][a-z0-6]{0,10}>$/.test(selector)){  //创建标签
            return document.createElement(selector.slice(1,-1));
        }
    }else if(typeof(selector)=="function"){
        window.onload=function(){
            selector();//匿名函数
        }
    }        
}
//获取子节点集合
//obj 要获取子节点的父节点
//type 要不要获取文本节点和元素节点
function getChilds(obj,type){
    type=type||"no";   //初始化type
    var childs=obj.childNodes;   //将获取的子节点群赋给childs
    var arr=[];
    for(var i=0;i<childs.length;i++){
        if(type=="no"){          //如果不获取文本节点和元素节点
            if(childs[i].nodeType==1){   //当遇到元素节点
                arr.push(childs[i]);     //将元素节点加到数组中
            }
        }else if(type=="yes"){    //如果获取文本节点或元素节点
            if(childs[i].nodeType==1||childs[i].nodeType==3&&childs[i].nodeValue.replace(/^\s*|\s*$/g,"")){
                arr.push(childs[i]);
            }
        }       
    }
    return arr;    //返回arr
}
//获取子节点的第一个
//obj  要获取子节点的父节点
//type 要不要获取文本节点和注释节点 
function getFirstKid(obj,type){
    type=type||"no";  //初始化
    if(type=="no"){
        return getChilds(obj)[0];    //返回子节点的第一个元素节点
    }else if(type=="yes"){
        return getChilds(obj,"yes")[0];
    }
}
//获得任一孩子
//obj  要获取子节点的父节点
//n 表示要获得的哪一个兄弟
//type 要不要获取文本节点和注释节点
function getNubKid(obj,n,type){
    type=type||"no";
    if(type=="no"){
        return getChilds(obj)[n-1];    
    }else if(type=="yes"){
        return getChilds(obj,"yes")[n-1];
    }
}
//获取子节点的最后一个
//obj  要获取子节点的父节点
//type 要不要获取文本节点和注释节点
function getLastKid(obj,type){
    type=type||"no";    //初始化
    if(type=="no"){
        return getChilds(obj)[getChilds(obj).length-1];    //返回子节点的最后一个元素节点
    }else if(type=="yes"){
        return getChilds(obj,"yes")[getChilds(obj,"yes").length-1];
    }
}
//获得下一个兄弟节点的引用
//obj 要获取的下一个兄弟节点的兄弟
//type 是否要获得文本节点和注释节点
function getNext(obj,type){
    type=type||"no";  //初始化type
    var next=obj.nextSibling; //获得下一个兄弟节点
    if(next==null){      //如果下一个兄弟节点为null返回false
        return false;
    }
    if(type=="no"){    //如果不要获取文本节点和注释节点
        while(next.nodeType==3||next.nodeType==8){ //当遇到文本节点和注释节点
            next=next.nextSibling;   //再找它的下一个兄弟节点
            if(next==null){     //如果为null则返回false
                return false;
            }
        }
        return next;
    }else if(type=="yes"){   //如果要获取文本节点
        //可以找到不是空的文本
        while(next.nodeType==8||next.nodeType==3&&!next.nodeValue.replace(/^\s*|\s*$/g,"")){
            //当有注释节点或空的文本节点时
            next=next.nextSibling;   //继续找它的下一个兄弟
            if(next==null){  //如果为空则返回false
                return false;
            }
        }
        return next;
    }
}
//获得上一个兄弟节点的引用
//obj 要获取的上一个兄弟节点的兄弟
//type 是否要获得文本节点和注释节点
function getPre(obj,type){
    type=type||"no";    //初始化type
    var previous=obj.previousSibling;  //获得上一个兄弟节点
    if(previous==null){    //如果节点为空返回false
        return false;
    }
    if(type=="no"){  //不获取文本节点和注释节点时
       while(previous.nodeType==3||previous.nodeType==8){//当有文本节点和注释节点
            previous=previous.previousSibling;  //一直找它的前一个兄弟
            if(previous==null){  //如果为空时返回false
                return false;
            }
       }
       return previous; 
    }else if(type=="yes"){  //要获取不是空字符的文本节点
        while(previous.nodeType==8||previous.nodeType==3&&!previous.nodeValue.replace(/^\s*|\s*$/g,"")){
            previous=previous.previousSibling;
            if(previous==null){
                return false;
            }
       }
       return previous;
    }
}
//插入到某个对象之前
//obj 要加入的对象
//objbefore 要加入之前的对象
function insertBefore(obj,objbefore){
    var parent=objbefore.parentNode;  //之前的对象的父节点
    parent.insertBefore(obj,objbefore);
}
//插入到某个对象之后
//obj 要加入的对象
//objafter 要加入之后的对象
//type 要不要文本节点
function insertAfter(obj,objafter,type){
    type=type||"no";             //初始化type
    var parent=objafter.parentNode;    //获取到到要加入的父节点
    var next;
    if(type=="no"){
        next=getNext(objafter);   //获得objafter的下一个兄弟
        if(!next){                //如果没有兄弟
            parent.appendChild(obj);   //则将兄弟加入到最后
        }else{                         //如果有兄弟
            insertBefore(obj,next);    //插入到兄弟之前
        }
    }else if(type=="yes"){           //如果要插入到文本节点之后
        next=getNext(objafter,"yes"); //找到objafter的包括文本兄弟
        if(!next){                   
            parent.appendChild(obj);
        }else{
            insertBefore(obj,next);  //插入到找到的兄弟之前
        }
    } 
}
//添加多个事件
function getEvent(obj,type,fun){
    if(obj.attachEvent){
        obj.attachEvent(obj,"on"+type,fun);
    }else{
        obj.addEventListener(obj,type,fun);
    }
}
//删除多个事件
function removeEvent(obj,type,fun){
    if(obj.attachEvent){
        obj.detachEvent(obj,"on"+type,fun);
    }else{
        obj.removeEventListener(obj,type,fun);
    }
}
//鼠标滚动函数
//obj 要执行的对象
//downfun 鼠标向下滚动的函数
//upfun 鼠标向上滚动的函数
function mousewheel(obj,downfun,upfun){
    if(obj.attachEvent){
        obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
    }else if(obj.addEventListener){
        obj.addEventListener("mousewheel",scrollFn,false);
            //chrome,safari -webkitdocument.
        addEventListener("DOMMouseScroll",scrollFn,false);
            //firefox -moz-
    }
    function scrollFn(e){
        var ev=e||window.event;
        //清除浏览器的默认事件
        if(ev.preventDefault){
            ev.preventDefault();
        }else{
            ev.returnValue=false;
        }
        //将鼠标滚动的数字给nub
        var nub=ev.wheelDelta||ev.detail;
        if(nub==-120||nub==3){//如果向下滚动
            downfun.call(obj);//obj调用函数
        }else if(nub==120||nub==-3){//如果向上滚动
            upfun.call(obj);//obj调用函数
        }
    }
}
// hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }

function setCookie(jian,val,time){
    if(time=undefined){
        document.cookie=jian+"="+val;
    }else{
        var now=new Date();
        now.setTime(now.getTime()+time*1000);
        document.cookie=jian+"="+val+";expires="+now.toGMTString();
    }
}
function getCookie(val){
    var cookies=document.cookie;
    var str=cookies.split("; ");
    for(var i=0;i<str.length;i++){
        if(str[i].split("=")[0]==val){
            return str[i].split("=")[1];
        }
    }
    return false;
}
function delCookie(val){
    var now=new Date();
    now.setTime(now.getTime()-1);
    document.cookie=val+"=000;expires="+now.toGMTString();
}
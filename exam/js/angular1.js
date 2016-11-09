//核心模块
var app=angular.module("APP.subject",['ng','ngRoute','APP.paper']);
//全部题目控制器
app.controller("model1",function($scope,showData,$location){
		$(".chose a").live("click",function(){
			$(this).addClass("active3");
			$(this).siblings().removeClass("active3");
		});
		var getInfo=function(data){
			$scope.types=data;
		};
		var getInfo2=function(data){
			$scope.departments=data;
		};
		var getInfo3=function(data){
			$scope.topics=data;
		};
		var getInfo4=function(data){
			$scope.levels=data;
		};
		var getInfo5=function(data){
			data.forEach(function(infos){
				var answer=[];
				//为每个选项添加A B C D
				if(infos.subjectType.id!=3){
					infos.choices.forEach(function(i,index){
						i.no=showData.convertIndexToNo(index);
					})
				};
				// 当为单选题或为复选题时，修改answer
				if(infos.subjectType.id!=3){
					infos.choices.forEach(function(i){
						if(i.correct){
							answer.push(i.no);
						}
					});
				}else{
					infos.choices.forEach(function(i){
						
							answer.push(i.contentText);
						
					});
				}
				//正确答案给出
				infos.answer=answer.toString();
			});
			$scope.infos=data;

		};
		$scope.types=showData.getAllSubjectType(getInfo);
		$scope.departments=showData.getAllDepartment(getInfo2);
		$scope.topics=showData.getAllTopic(getInfo3);
		$scope.levels=showData.getAllSubjectLevel(getInfo4);
		$scope.infos=showData.getAllInfo(getInfo5);

		$scope.service=showData;
		$scope.obj={};
		$scope.showInfo=function(a,b){
			if(a=="type"){
				$scope.obj.subjectType={
					id:b
				}
			}else if(a=="depart"){
				$scope.obj.department={
					id:b
				}
			}else if(a=="level"){
				$scope.obj.subjectLevel={
					id:b
				}
			}else if(a=="topic"){
				$scope.obj.topic={
					id:b
				}
			}
		};
		//$scope.obj={subjectType:{id:1},department:{id:2}};
		$scope.getInfo=function(){
		  showData.getAllInfo(function(data){
		  		$scope.infos=data;
		  });
		};

		$scope.search=function(){
			var m=showData.getAllInfo(getInfo5);
			console.log(m);
		};
		

		$scope.t="单选题";
		$scope.service=showData;
		/*$scope.tigan="";
		$scope.jiexi="";
		$scope.a="";
		$scope.b="";
		$scope.c="";*/
		$scope.objTM={

				
			};
		console.log($scope.objTM);
		/*var fn=function(data){
				console.log(data);
		}*/
		
		//添加页面绑定对象
		$scope.subject={
			typeId:1,
			levelId:1,
			departmentId:1,
			topicId:1,
			stem:"",
			answer:"",//简答题答案
			analysis:"",
			choiceContent:[],
			choiceCorrect:[false,false,false,false]
		};

		//前台点击保存按钮触发此方法
		$scope.submit = function(){
			showData.saveInfo($scope.subject,function(data){
				alert(data);
			});
			//重置作用域中绑定的表单默认值
			var subject={
				typeId:1,
				levelId:1,
				departmentId:1,
				topicId:1,
				stem:"",
				answer:"",//简答题答案
				analysis:"",
				choiceContent:[],
				choiceCorrect:[false,false,false,false]
			};
			angular.copy(subject,$scope.subject);

		};
		$scope.saveAndClose=function(){
			showData.saveInfo($scope.subject,function(data){
				alert(data);
			});
			//跳转到列表页面
			$location.path("/model1");
		};

	});

	//删除题目
	app.controller("delCtroller",function($scope,showData,$routeParams,$location){
		var flag=confirm("确认删除吗？");
		if(flag){
			var id=$routeParams.id;
			showData.delInfo(id,function(data){
				alert(data);
			})
			$location.path("/model1");

		}else{
			$location.path("/model1");
		}
		
		
	});
	//审核的控制器
	app.controller("checkController",function(showData,$routeParams,$location){
		showData.checkInfo($routeParams.id,$routeParams.state,function(data){
			alert(data);
			//跳转
			$location.path("/model1");
		})
	});
		//服务
	app.factory("showData",function($http,$location,$httpParamSerializer){
		return{
			//将index转为ABCD 
			convertIndexToNo:function(index){
				return index==0?'A':(index==1?'B':(index==2?'C':(index==3?'D':'E')));
			},
			getAllSubjectType:function(getInfo){
				var types;
				$http.get("data/getAllSubjectType.json").success(function(data){
					types=data;
					getInfo(types);
				});
				return types;
			},
			getAllDepartment:function(getInfo2){
				var departments;
				$http.get("data/getAllDepartmentes.json").success(function(data){
					departments=data;
					getInfo2(departments);
				});
				return departments;
			},
			getAllTopic:function(getInfo3){
				var topics;
				$http.get("data/getAllTopics.json").success(function(data){
					topics=data;
					getInfo3(topics);
				});
				return topics;
			},
			getAllSubjectLevel:function(getInfo4){
				var levels;
				$http.get("data/getAllSubjectLevel.json").success(function(data){
					levels=data;
					getInfo4(levels);
				});
				return levels;
			},
			getAllInfo:function(getInfo5){
				var infos;
				$http.get("data/getAllSubjects.json").success(function(data){
					infos=data;
					getInfo5(infos);
				});
				return infos;
			},
			addInfo:function(){
				$location.path("/model3");
			},
			saveInfo:function(params,handler){
				//处理数据
				var obj={};
				for(var key in params){
					var val=params[key];
					switch(key) {
						case "typeId":
							obj["subject.subjectType.id"]=val;
							break;
						case "levelId":
							obj["subject.subjectlevel.id"]=val;
							break;
						case "departmentId":
							obj["subject.department.id"]=val;
							break;
						case "topicId":
							obj["subject.topic.id"]=val;
							break;
						case "stem":
							obj["subject.stem"]=val;
							break;
						case "analysis":
							obj["subject.analysis"]=val;
							break;
						case "answer":
							obj["subject.answer"]=val;
							break;
						case "choiceContent":
							obj["choiceContent"]=val;
							break;
						case "choiceCorrect":
							obj["choiceCorrect"]=val;
							break;
					}
				}
				//对obj对象进行表单格式的序列化(默认json)
				obj=$httpParamSerializer(obj);
				$http.post("http://172.16.0.5:7777/test/exam/manager/saveSubject.action",obj,{
					headers:{
						"Content-Type":"application/x-www-form-urlencoded"
					}
				}).success(function(data){
					handler(data);
				});
			},
			delInfo:function(id,handler){
				$http.get("http://172.16.0.5:7777/test/exam/manager/delSubject.action",{
					params:{
						'subject.id':id
					}
				}).success(function(data){
					handler(data);
				});
			},
			checkInfo:function(id,state,handler){
				$http.get("http://172.16.0.5:7777/test/exam/manager/checkSubject.action",{
					params:{
						'subject.id':id,
						'subject.checkState':state
					}
				}).success(function(data){
					handler(data);
				});
			}
		};
	});
		// 路由配置信息
	app.config(function($routeProvider){
		$routeProvider.when("/model1",{
			templateUrl:"tpls/manage1_1.html",
			controller:"model1"
		}).when("/model3",{
			templateUrl:"tpls/manage1_3.html",
			controller:"model1"
		}).when("/model4/id/:id",{
			templateUrl:"tpls/manage1_1.html",
			controller:"delCtroller"
		}).when("/SubjectCheck/id/:id/state/:state",{
			templateUrl:"tpls/manage1_1.html",
			controller:"checkController"
		}).when("/paperList",{
			templateUrl:"tpls/paperManager.html",
			controller:"paperListController"
		}).when("/paperAdd/id/:id/stem/:stem/type/:type/topic/:topic/level/:level",{
			templateUrl:"tpls/paperAdd.html",
			controller:"paperAddController"
		}).when("/paperSubjectList",{
			templateUrl:"tpls/subjectList.html",
			controller:"model1"
		}).otherwise({
			redirectTo:"/"
		})
	});
	app.filter("selectTopics",function(){
		//第一个参数：要过滤的内容，第二个参数：冒号后面第一个参数
		return function(input,id){
			// console.log(input,id);
			//Array.prototype.filter进行过滤
			if(input){
				// 如果input定义了的话
				var result=input.filter(function(item){
					return item.department.id==id;
				});
				//将过滤后的内容返回
				return result;
			}
			
		};
	});
	app.directive("selectOption",function(){
		return {
			restrict:"A",
			link:function(scope,element){
				element.on("change",function(){
					//明确参与的是单选按钮还是多选按钮
					var type=$(this).attr("type");
					var val=$(this).val();
					//判断复选框是否选中
					var isCheck=$(this).prop("checked");
					//设置值
					if(type=="radio"){
						//重置
						scope.subject.choiceCorrect=[false,false,false,false];
						for(var i=0;i<4;i++){
							if(i==val){
								scope.subject.choiceCorrect[i]=true;
							}
						}
					}else if(type=="checkbox"){
						for(var i=0;i<4;i++){
							if(i==val){
								scope.subject.choiceCorrect[i]=true;
							}
						}
					}
					//强制消化
					scope.$digest()
				});
			}
			/*compile:function(){
				//编译
				return function link(){
					//链接
				};
			},
			controller:function(){
				//控制，产生scope
			}*/
		}
	});


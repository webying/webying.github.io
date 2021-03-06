/*****试卷模块****/
// App.paper代表APP的子模块
angular.module("APP.paper",["ng","APP.subject"])
	//试卷查询控制器
	.controller("paperListController",["$scope",function($scope){

	}])
	//试卷添加控制器
	.controller("paperAddController",["$scope","showData","$routeParams","paperModel","paperService"
		,function($scope,showData,$routeParams,paperModel,paperService){
		showData.getAllDepartment(function(data){
			//将全部方向绑定到作用域的departments
			$scope.departments=data;
		});
		// alert($routeParams.id);
		var subjectId=$routeParams.id;
		if(subjectId!=0){
			//将要添加的题目的id添加到数组中
			paperModel.addSubjectId(subjectId);
			//$routeParams是由参数组成的新的对象
			paperModel.addSubject(angular.copy($routeParams));
		}
		//双向绑定的模板
		$scope.model=paperModel.model;

		//保存试题
		$scope.savePaper=function(){
			paperService.savePaper($scope.model,function(data){
				alert(data);
			})
		}
	}])
	//试卷删除控制器
	.controller("paperDelController",["$scope",function($scope){

	}])
	.factory("paperService",function($httpParamSerializer,$http){
		return {
			savePaper:function(param,handler){
				
				var obj={};
				for(var key in param){
					var val=param[key];
					switch(key){
						case"departmentId":
							obj['paper.department.id']=val;
							break;
							case"title":
							obj['paper.title']=val;
							break;
							case"desc":
							obj['paper.description']=val;
							break;
							case"at":
							obj['paper.answerQuestionTime']=val;
							break;
							case"total":
							obj['paper.totalPoints']=val;
							break;
							case"scores":
							obj['paper.scores']=val;
							break;
							case"subjectIds":
							obj['paper.subjectIds']=val;
							break;
							
					}
				}
				//序列化提交
				obj=$httpParamSerializer(obj);
				$http.post("http://172.16.0.5:7777/test/exam/manager/saveSubject.action",obj,{
					headers:{
						"Content-Type":"application/x-www-form-urlencoded"
					}
				}).success(function(data){
					handler(data);
				});
			}
		}
	})
	.factory("paperModel",function(){
		return {
			//模板，单例
			model:{
				departmentId:1,	//方向id
				title:"",		//试卷标题
				desc:"",		//试卷描述
				at:0,			//答题时间
				total:0,		//总分
				scores:[],		//每个题目的分数
				subjectIds:[],	//每个题目的id
				subjects:[]
			},
			addSubjectId:function(id){
				this.model.subjectIds.push(id);	
			},
			addSubject:function(subject){
				this.model.subjects.push(subject);
			}
		};
	})
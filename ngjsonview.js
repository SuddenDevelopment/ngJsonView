// https://plnkr.co/edit/kBoDTXmm2XbxXjpDA4M9?p=preview
angular.module("ngjsonview", ['suddenutils']).directive('ngjsoncollection',['$sce', function(){
	'use strict';
	return {
		transclude: false
		,restrict:'E'
		,scope:{ d:'=',o:"=" }
		,templateUrl: "./templates/ngjsonview-template.htm"
		,controller:function($scope,_,$sce){
			
			
			var fnPretty = function(objData){
			    if (typeof objData != 'string') { var strOut = JSON.stringify(objData, undefined, 2); }
			    strOut = strOut.replace(/&/g, '&amp;')
			    	.replace(/</g, '&lt;')
			    	.replace(/>/g, '&gt;');
			    return strOut.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
			        var cls = 'number';
			        if (/^"/.test(match)) {
			            if (/:$/.test(match)) { cls = 'key';} 
			            else { cls = 'string'; }
			        } else if (/true|false/.test(match)) { cls = 'boolean';} 
			          else if (/null/.test(match)) {cls = 'null'; }
			        return '<span class="' + cls + '">' + match + '</span>';
			    });
			};

			var fnConvertCollection = function(arrJson){
				$scope.arrData=[];
				_.for(arrJson,function(v,k){
					//TODO verify if it already exists in its converted form in the DOM
					$scope.arrData.unshift($sce.trustAsHtml(fnPretty(v)));
				});
			}
			
			$scope.$watchCollection('d',fnConvertCollection);

		}
	};
	
}]);

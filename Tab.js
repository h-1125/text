function tab(op_ul,opc_ul,op_lis,opc_lis,op_is,op_back,op_add,cn){
	var tit_ul=getDom(op_ul)[0], //标题
		con_ul=getDom(opc_ul)[0],//内容
		tit_lis=getDom(op_lis),//标题 li
		con_lis=getDom(opc_lis),//内容 li
		box_lis=getDom(op_is),//×
		back_div=getDom(op_back)[0],
		add_div=getDom(op_add)[0],
		arr=[];

	
		
		//点亮功能
		tit_ul.onclick=function(e){
			
			if(e.target.nodeName=='LI'){
				var i=getIndex(e.target);
				console.log(i);
				for(let j=0;j<tit_lis.length;j++){
					if(j==i){
						if(!hasClassName(tit_lis[i],cn)){
							addClassName(tit_lis[i],cn);
						}
						con_lis[i].style.display='block';
					}else{
						removeClassName(tit_lis[j],cn);
						con_lis[j].style.display='none';
					}
				}
			}else if(e.target.className=='box'){//关闭功能
				var i=getIndex(e.target.parentNode);
				var li=e.target.parentNode;
				arr.push(i);//尾部追加
				addClassName(li,'hide');
				addClassName(con_lis[i],'hide');
				if(hasClassName(tit_lis[i],cn)){
					for(let j=0;j<tit_lis.length;j++){
						if(!hasClassName(tit_lis[j],'hide')){
							addClassName(tit_lis[j],cn);
							con_lis[j].style.display='block';
							break;
						}
					}
				}
			}
		}
		//撤销功能 
		back_div.onclick=function(){//撤销删除的元素
			let i=arr.pop();//删除尾部 返回删除的值
			removeClassName(tit_lis[i],'hide');
			removeClassName(con_lis[i],'hide');
			for(let j=0;j<tit_lis.length;j++){
				if(j==i){
					addClassName(tit_lis[i],'on');
					con_lis[i].style.display='block';
				}else{
					removeClassName(tit_lis[j],'on');
					con_lis[j].style.display='none';
				}
			}
		}
		// 新建功能
		add_div.onclick=function(){
			var tit_dom=document.createElement('li');//<li></li>
			tit_dom.innerHTML="新的标题<div class='box'>×</div>";//<li>新的标题<div class='box'>×</div></li>
			var con_dom=document.createElement('li');//<li></li>
			con_dom.innerHTML="新的标题";
			tit_ul.appendChild(tit_dom);
			con_ul.appendChild(con_dom);
			tit_lis=getDom(op_lis);//更新标题 li
			con_lis=getDom(opc_lis);//更新内容 li
			box_lis=getDom(op_is);//更新×
		}
	
}

//获取元素
function getDom(dom){     
	return document.querySelectorAll(dom);
}
//判断
function hasClassName(dom,cn){//判断有没有cn这个值
	var str=dom.className;
	var arr=str.split(' ')//用空格分割成数组
	var brr=[],flag=false;
	arr.forEach(//.forEach不能返回ture,false
		function(value,index){
			if(value==cn){
			 flag=true; 
			}
			
		})
	return flag;
}
//移除
function removeClassName(dom,cn){
	var str=dom.className;
	var arr=str.split(' '),brr=[];
	arr.forEach(
		function(value,index){
			if(value!=cn){
				brr.push(value);//尾部追加
			}
		})
	dom.className=brr.join(' ');
}
//添加
function addClassName(dom,cn){
	var temp='';
	if(dom.className){
		temp=' ';
	}
	dom.className=dom.className+temp+cn;
}

function getIndex(dom){
	var i = 0,that = dom;
	// 1.判断当前节点是否有前一个元素兄弟节点，如果有+1
	// 2.判断这个兄弟节点之前，是否再有一个元素兄弟节点，如果有+1
	while(that.previousElementSibling) {
		i++;
		that = that.previousElementSibling
	}
	return i;
}

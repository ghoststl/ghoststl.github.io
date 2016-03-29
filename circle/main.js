	window.onload = function(){
		//var arr = [1,3,5,7,9,11,9,7,5,3,1];
		var s = '基米·莱科宁（英文：Kimi·Raikkonen），1979年10月17日出生于艾斯堡，芬兰车手。2001年，莱科宁加入索伯车队成为F1车手。2002年，他转会迈凯轮车队。2007年，莱科宁加入法拉利车队并于当年获得F1车手年度总冠军。2010年，他离开F1，加入雪铁龙车队参加世界汽车拉力锦标赛（WRC）。2011年，莱科宁组织了属于自己的车队ICE1Racing；同年11月29日，他宣布加盟莲花F1车队，2012赛季重返F1。2014年，莱科宁重回法拉利车队。';
		var oSence = document.getElementsByClassName('sence')[0];
		var oBox = oSence.getElementsByClassName('box')[0];
		var oUl = oBox.getElementsByTagName('ul')[0];
		var aLi = oUl.getElementsByTagName('li');
		var oTable = document.getElementsByClassName('table')[0];
		var aA = oTable.getElementsByTagName('a');
		var oItem = document.getElementsByClassName('item')[0];
		var oP = oItem.getElementsByTagName('p')[0];
		var oClose = oItem.getElementsByTagName('a')[0];
		var aBtn = document.getElementsByClassName('btn')[0].getElementsByTagName('button');
		var oText = document.getElementsByClassName('text')[0];
		var oTextarea = oText.getElementsByTagName('textarea')[0];
		var oClose2 = oText.getElementsByTagName('a')[0];
		var aBtn2 = oText.getElementsByTagName('button');

		var num = 0;
		var layer = 0;
		var wordNum = -1;
		var circleArr = [];
		var coneArr = [];
		var coneNum = 0;
		var liNum = 0;
		var columnH = 0;
		var columnNum = 0;
		var graph = 0;
		var iTimer = 0;
		var theta = 0;
		var phi = 0;
		var r = 150;
		var angleX = 0;
		var angleY = 0;

		//修复bug
		var onOff = true;
		var onOff2 = false;

		star();
		function star(){
			num = 0;
			layer = 0;
			wordNum = -1;
			circleArr = [];
			coneArr = [];
			coneNum = 0;
			liNum = 0;
			columnH = 0;
			columnNum = 0;
			graph = 0;
			oP.innerHTML = s;
			for (var i = 4; i < 13; i++) {
				num = i * i + (i+1) * (i+1);
				if( num >= s.length ){
					layer = (i-2)*2+1;
					break;
				}
				layer = (i-2)*2+1;
			}

			for (var i = 0; i < layer; i++) {
				if( i < (layer+1)/2 ){
					wordNum+=2;
				}
				else{
					wordNum-=2;
				}
				circleArr.push(wordNum);
			}
			theta = Math.PI/(circleArr.length - 1);
			phi = 0;
			num = 0;
			//圆
			for (var i = 0; i < circleArr.length; i++) {
				phi = 2*Math.PI/circleArr[i];
				for (var j = 0; j < circleArr[i]; j++) {
					var li = document.createElement('li');
					li.innerHTML = s[num];
					num++;
					drawCircle(li,theta,phi,i,j);
					oUl.appendChild(li);
				}
			}

			for (var i = 0; i < aLi.length; i++) {
				aLi[i].style.transform = 'translate3D(' + aLi[i].circleX + 'px,' + aLi[i].circleY + 'px,' + aLi[i].circleZ + 'px) rotateY('+aLi[i].circlePhi+'rad) rotateX('+aLi[i].circleTheta+'rad)';
			}
			//圆锥
			for (var i = 0; i < aLi.length; i++) {
				coneNum += 2*i-1;
				if( coneNum >aLi.length ){
					coneNum -=2*i -1;
					break;
				}
				coneArr.push(2*i-1);
			}

			for (var i = 0; i < coneArr.length; i++) {
				phi = 2*Math.PI/coneArr[i];
				for (var j = 0; j < coneArr[i]; j++) {
					drawCone(aLi[liNum],phi,i,j);
					liNum++;
				}
			}

			/*for (var i = 0; i < aLi.length; i++) {
				aLi[i].style.display = 'none';
			}
			for (var i = 0; i < coneNum; i++) {
				aLi[i].style.display = 'block';
				aLi[i].style.transform = 'translate3D(' + aLi[i].coneX + 'px,' + aLi[i].coneY + 'px,' + aLi[i].coneZ + 'px) rotateY('+aLi[i].conePhi+'rad) rotateX('+aLi[i].coneTheta+'rad)';
			}*/
			//圆柱
			columnH = Math.floor( aLi.length/(circleArr.length-2) );
			columnNum = (circleArr.length-2) * columnH;
			liNum = 0;
			for (var i = 0; i < circleArr.length-1; i++) {
				phi = 2*Math.PI/columnH;
				for (var j = 0; j < columnH; j++) {
					drawColumn(aLi[liNum],phi,i,j);
					drawColumn2(aLi[liNum],phi,i,j);
					liNum++;
				}
			}

			/*for (var i = 0; i < columnNum; i++) {
				aLi[i].style.display = 'block';
				aLi[i].style.transform = 'translate3D(' + aLi[i].columnX2 + 'px,' + aLi[i].columnY2 + 'px,' + aLi[i].columnZ2 + 'px) rotateY('+aLi[i].columnPhi2+'rad)';
			}*/
			//旋转
		}
		

		aA[0].onclick =function(){
			if(onOff2){
				return
			}
			clearTimeout(iTimer)
			aA[graph].className = '';
			graph = 0;
			aA[graph].className = 'active';
			if(!onOff){
				onOff = true;
				aBtn[0].className = '';
				oItem.style.transform = 'rotateX(-180deg)';
				oItem.style.opacity = 0;
				setTimeout(function(){
					changeCircle();
					oItem.style.transform = 'rotateX(0deg) scale(2)';
					oItem.style.display = 'none';
				},550)
			}
			else{
				startChange();
				iTimer = setTimeout(function(){
					changeCircle();
				},1010)
			}
		}

		aA[1].onclick =function(){
			if(onOff2){
				return
			}
			clearTimeout(iTimer)
			aA[graph].className = '';
			graph = 1;
			aA[graph].className = 'active';
			if(!onOff){
				onOff = true;
				aBtn[0].className = '';
				oItem.style.transform = 'rotateX(-180deg)';
				oItem.style.opacity = 0;
				setTimeout(function(){
					changeCone();
					oItem.style.transform = 'rotateX(0deg) scale(2)';
					oItem.style.display = 'none';
				},550)
			}
			else{
				startChange();
				iTimer = setTimeout(function(){
					changeCone();
				},1050)
			}
		}
		aA[2].onclick =function(){
			if(onOff2){
				return
			}
			clearTimeout(iTimer)
			aA[graph].className = '';
			graph = 2;
			aA[graph].className = 'active';
			if(!onOff){
				onOff = true;
				aBtn[0].className = '';
				oItem.style.transform = 'rotateX(-180deg)';
				oItem.style.opacity = 0;
				setTimeout(function(){
					changeColumn();
					oItem.style.transform = 'rotateX(0deg) scale(2)';
					oItem.style.display = 'none';
				},550)
			}
			else{
				startChange();
				iTimer = setTimeout(function(){
					changeColumn();
				},1050)
			}
		}	
		aA[3].onclick =function(){
			if(onOff2){
				return
			}
			clearTimeout(iTimer)
			aA[graph].className = '';
			graph = 3;
			aA[graph].className = 'active';
			if(!onOff){
				onOff = true;
				aBtn[0].className = '';
				oItem.style.transform = 'rotateX(-180deg)';
				oItem.style.opacity = 0;
				setTimeout(function(){
					changeColumn2();
					oItem.style.transform = 'rotateX(0deg) scale(2)';
					oItem.style.display = 'none';
				},550)
			}
			else{
				startChange();
				iTimer = setTimeout(function(){
					changeColumn2();
				},1050)
			}
		}			

		oSence.onmousedown = function(ev){
			clearInterval(iTimer2)
			var e = ev || event;
			var clickX = e.clientX;
			var clickY = e.clientY;
			var disX = 0;
			var disY = 0;
			document.onmousemove = function(ev){
				var e = ev ||event;
				disX = e.clientX - clickX;
				disY = e.clientY - clickY;
				oBox.style.transform = 'rotateX('+(angleX - disY)+'deg) rotateY('+(angleY + disX)+'deg)'
			}
			document.onmouseup = function(){
				document.onmousemove = document.onmouseup = null;
				angleX = angleX - disY;
				angleY = angleY + disX;
				if( disY == 0 && disX == 0 ){
					disX = 300;
				}
				iTimer2 = setInterval(function(){
					angleX -= disY/100;
					angleY += disX/100;
					oBox.style.transform = 'rotateX('+angleX+'deg) rotateY('+angleY+'deg)'
				},60)
			}
		}

		aBtn[0].onclick = function(){
			if(!onOff){
				return
			}
			onOff = false;
			this.className = 'active';
			startChange();
			oItem.style.display = 'block';
			setTimeout(function(){
				oItem.style.opacity = 1;
				oItem.style.transform = 'scale(1)';
			},1030)
		}

		oClose.onclick = function(){
			onOff = true;
			aBtn[0].className = '';
			oItem.style.transform = 'rotateX(-180deg)';
			oItem.style.opacity = 0;
			setTimeout(function(){
				switch(graph){
					case 0:
					changeCircle();
					break;
					case 1:
					changeCone();
					break;
					case 2:
					changeColumn();
					break;
					case 3:
					changeColumn2();
					break;
				};
				oItem.style.transform = 'rotateX(0deg) scale(2)';
				oItem.style.display = 'none';
			},550)
		}

		aBtn[1].onclick = function(){
			if(!onOff){
				return
			}
			onOff = false;
			onOff2 = true;
			aBtn[0].className = '';
			this.className = 'active';
			oText.style.display = 'block';
			setTimeout(function(){
				oText.style.transform = 'scale(1)';
				oText.style.opacity = 1;
			},12)
		}

		aBtn2[0].onclick = function(){
			s = oTextarea.value;
			if( s.length < 50 || s.length > 350 ){
				alert('您输入的文字不得小于50或者大于350个');
			}
			else{
				onOff2 = false;
				oTextarea.value = '';
				aBtn[1].className = '';
				for (var i = 0; i < aA.length; i++) {
					aA[i].className = '';
				}
				aA[0].className = 'active';
				oUl.innerHTML = '';
				star();
				oText.style.transform = 'scale(0.5)';
				oText.style.opacity = 0;
				setTimeout(function(){
					oText.style.display = 'none';
				},60)
			}
		}
		aBtn2[1].onclick = function(){
			oTextarea.value = '';
		}
		oClose2.onclick = function(){
			aBtn[1].className = '';
			onOff = true;
			onOff2 = false;
			oTextarea.value = '';
			oText.style.transform = 'scale(0.5)';
			oText.style.opacity = 0;
			setTimeout(function(){
				oText.style.display = 'none';
			},60)
		}
		
		var iTimer2 = setInterval(function(){
			angleY++;
			oBox.style.transform = 'rotateY('+angleY+'deg)';
		},60)

		function drawCircle(obj,theta,phi,i,j){
			obj.circleX = r*Math.sin(theta*i)*Math.sin(phi*j)+200;
			obj.circleY = -r*Math.cos(theta*i)+200;
			obj.circleZ = r*Math.sin(theta*i)*Math.cos(phi*j);
			obj.circleTheta = theta * (circleArr.length - i) - Math.PI/2;
			obj.circlePhi = phi * j;
			obj.bigCircleX = (r+2000)*Math.sin(theta*i)*Math.sin(phi*j)+200;
			obj.bigCircleY = -(r+2000)*Math.cos(theta*i)+200;
			obj.bigCircleZ = (r+2000)*Math.sin(theta*i)*Math.cos(phi*j);
			obj.maxX = obj.bigCircleX;
			obj.maxY = obj.bigCircleY;
			obj.maxZ = obj.bigCircleZ;
			obj.maxTheta = obj.circleTheta;
			obj.maxPhi = obj.circlePhi;
		}

		function drawCone(obj,phi,i,j){
			obj.coneX = (2*r/coneArr.length)*i*Math.tan(Math.PI/6)*Math.sin(phi*j)+200;
			obj.coneY = (2*r/coneArr.length)*i+50;
			obj.coneZ = (2*r/coneArr.length)*i*Math.tan(Math.PI/6)*Math.cos(phi*j);
			obj.coneTheta = Math.PI/6;
			obj.conePhi = phi*j;
			obj.bigConeX = (2*(r+2000)/coneArr.length)*i*Math.tan(Math.PI/6)*Math.sin(phi*j)+200;
			obj.bigConeY = (2*(r+2000)/coneArr.length)*i+50-2000;
			obj.bigConeZ = (2*(r+2000)/coneArr.length)*i*Math.tan(Math.PI/6)*Math.cos(phi*j);
		}

		function drawColumn(obj,phi,i,j){
			obj.columnX = r/1.5*Math.sin(phi*j)+200;
			obj.columnY = (2*r/(circleArr.length-2))*i+50;
			obj.columnZ = r/1.5*Math.cos(phi*j);
			obj.columnPhi = phi*j;
			obj.bigColumnX = (r+2000)/1.5*Math.sin(phi*j)+200;
			obj.bigColumnY = (2*(r+2000)/(circleArr.length-2))*i+50-2000;
			obj.bigColumnZ = (r+2000)/1.5*Math.cos(phi*j);
		}
		function drawColumn2(obj,phi,i,j){
			obj.columnX2 = r/1.5*Math.sin(phi*j+i*8*Math.PI/180)+200;
			obj.columnY2 = (2*r/(circleArr.length-2))*i+50;
			obj.columnZ2 = r/1.5*Math.cos(phi*j+i*8*Math.PI/180);
			obj.columnPhi2 = phi*j+i*8*Math.PI/180;
			obj.bigColumnX2 = (r+2000)/1.5*Math.sin(phi*j+i*8*Math.PI/180)+200;
			obj.bigColumnY2 = (2*(r+2000)/(circleArr.length-2))*i+50-2000;
			obj.bigColumnZ2 = (r+2000)/1.5*Math.cos(phi*j+i*8*Math.PI/180);
		}

		function startChange(){
			for (var i = 0; i < aLi.length; i++) {
				aLi[i].className = 'all';
				aLi[i].style.transform = 'translate3D(' + aLi[i].maxX + 'px,' + aLi[i].maxY + 'px,' + aLi[i].maxZ + 'px) rotateY('+aLi[i].maxPhi+'rad) rotateX('+aLi[i].maxTheta+'rad)';
				aLi[i].style.opacity = 0;
			}
		}
		function changeCircle(){
			for (var i = 0; i < aLi.length; i++) {
				aLi[i].className = '';
				aLi[i].maxX = aLi[i].bigCircleX;
				aLi[i].maxY = aLi[i].bigCircleY;
				aLi[i].maxZ = aLi[i].bigCircleZ;
				aLi[i].maxTheta = aLi[i].circleTheta;
				aLi[i].maxPhi = aLi[i].circlePhi;
				aLi[i].style.transform = 'translate3D(' + aLi[i].maxX + 'px,' + aLi[i].maxY + 'px,' + aLi[i].maxZ + 'px) rotateY('+aLi[i].maxPhi+'rad) rotateX('+aLi[i].maxTheta+'rad)';
			}
			setTimeout(function(){
				for (var i = 0; i < aLi.length; i++) {
					aLi[i].className = 'one';
					aLi[i].style.opacity = 1;
					aLi[i].style.transform = 'translate3D(' + aLi[i].circleX + 'px,' + aLi[i].circleY + 'px,' + aLi[i].circleZ + 'px) rotateY('+aLi[i].circlePhi+'rad) rotateX('+aLi[i].circleTheta+'rad)';
				}
			},50)
		}
		function changeCone(){
			for (var i = 0; i <= coneNum; i++) {
				aLi[i].className = '';
				aLi[i].maxX = aLi[i].bigConeX;
				aLi[i].maxY = aLi[i].bigConeY;
				aLi[i].maxZ = aLi[i].bigConeZ;
				aLi[i].maxTheta = aLi[i].coneTheta;
				aLi[i].maxPhi = aLi[i].conePhi;
				aLi[i].style.transform = 'translate3D(' + aLi[i].maxX + 'px,' + aLi[i].maxY + 'px,' + aLi[i].maxZ + 'px) rotateY('+aLi[i].maxPhi+'rad) rotateX('+aLi[i].maxTheta+'rad)';
			}
			setTimeout(function(){
				for (var i = 0; i <= coneNum; i++) {
					aLi[i].className = 'one';
					aLi[i].style.opacity = 1;
					aLi[i].style.transform = 'translate3D(' + aLi[i].coneX + 'px,' + aLi[i].coneY + 'px,' + aLi[i].coneZ + 'px) rotateY('+aLi[i].conePhi+'rad) rotateX('+aLi[i].coneTheta+'rad)';
				}
			},50)
		}

		function changeColumn(){
			for (var i = 0; i < columnNum; i++) {
				aLi[i].className = '';
				aLi[i].maxX = aLi[i].bigColumnX;
				aLi[i].maxY = aLi[i].bigColumnY;
				aLi[i].maxZ = aLi[i].bigColumnZ;
				aLi[i].maxTheta = 0;
				aLi[i].maxPhi = aLi[i].columnPhi;
				aLi[i].style.transform = 'translate3D(' + aLi[i].maxX + 'px,' + aLi[i].maxY + 'px,' + aLi[i].maxZ + 'px) rotateY('+aLi[i].maxPhi+'rad) rotateX('+aLi[i].maxTheta+'rad)';

			}
			setTimeout(function(){
				for (var i = 0; i < columnNum; i++) {
					aLi[i].className = 'one';
					aLi[i].style.opacity = 1;
					aLi[i].style.transform = 'translate3D(' + aLi[i].columnX + 'px,' + aLi[i].columnY + 'px,' + aLi[i].columnZ + 'px) rotateY('+aLi[i].columnPhi+'rad) ';
				}
			},50)
		}

		function changeColumn2(){
			for (var i = 0; i < columnNum; i++) {
				aLi[i].className = '';
				aLi[i].maxX = aLi[i].bigColumnX2;
				aLi[i].maxY = aLi[i].bigColumnY2;
				aLi[i].maxZ = aLi[i].bigColumnZ2;
				aLi[i].maxTheta = 0;
				aLi[i].maxPhi = aLi[i].columnPhi2;
				aLi[i].style.transform = 'translate3D(' + aLi[i].maxX + 'px,' + aLi[i].maxY + 'px,' + aLi[i].maxZ + 'px) rotateY('+aLi[i].maxPhi+'rad) rotateX('+aLi[i].maxTheta+'rad)';
			}
			setTimeout(function(){
				for (var i = 0; i < columnNum; i++) {
					aLi[i].className = 'one';
					aLi[i].style.opacity = 1;
					aLi[i].style.transform = 'translate3D(' + aLi[i].columnX2 + 'px,' + aLi[i].columnY2 + 'px,' + aLi[i].columnZ2 + 'px) rotateY('+aLi[i].columnPhi2+'rad) ';
				}
			},50)
		}

	}
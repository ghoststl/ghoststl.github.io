window.onload = function(){
	var oC = document.getElementById('c1');
	var oGC = oC.getContext('2d');

	var yImg = new Image();

	yImg.src = 'person.png';

	yImg.onload = function(){

		setInterval(function(){

			oGC.clearRect(0,0,oC.width,oC.height);

			oGC.beginPath();
			oGC.arc(300,200,200,-90*Math.PI/180,180*Math.PI/180,false);
			oGC.stroke();

			oGC.beginPath();
			oGC.arc(250,200,150,180*Math.PI/180,360*Math.PI/180,false);
			oGC.stroke()

			oGC.beginPath();
			oGC.arc(400,200,20,0*Math.PI/180,360*Math.PI/180,false);
			oGC.stroke()

			for (var i = 0; i < ball.length; i++) {
				oGC.beginPath();
				oGC.moveTo(ball[i].x,ball[i].y);
				oGC.arc(ball[i].x,ball[i].y,20,0*Math.PI/180,360*Math.PI/180,false);
				oGC.fill();
			}

			oGC.save();
			oGC.translate(300,200);
			oGC.rotate(iRotate);
			oGC.translate(-40,-40);
			oGC.drawImage(yImg,0,0);
			oGC.restore();

			for (var i = 0; i < bullet.length; i++) {
				oGC.save();
				oGC.fillStyle = '#558abb';
				oGC.beginPath();
				oGC.moveTo(bullet[i].x,bullet[i].y);
				oGC.arc(bullet[i].x,bullet[i].y,20,0*Math.PI/180,360*Math.PI/180,false);
				oGC.fill();
				oGC.restore();
			};

			oGC.save();
			oGC.font = '60px impact';
			oGC.textBaseline = 'top';
			oGC.fillStyle = '#63397b';
			oGC.shadowOffsetX = 5;
			oGC.shadowOffsetY = 5;
			oGC.shadowColor = '#63397b';
			oGC.shadowBlur = 5;
			var w = oGC.measureText('比较low的游戏').width;
			var h = 60;
			oGC.fillText('比较low的游戏', (oC.width - w)/2 , 450 );
			oGC.restore();

		},1000/60);

		setInterval(function(){
			for (var i = 0; i < ball.length; i++) {
				ball[i].num++;

				if( ball[i].num == 270 ){
					ball[i].r = 150;
					ball[i].startX = 250;
					ball[i].startY = 50;
				}

				if( ball[i].num == 450 ){
					alert('游戏结束');
					window.location.reload();
				}

				ball[i].x = Math.sin( ball[i].num*Math.PI/180 ) * ball[i].r + ball[i].startX;
				ball[i].y = ball[i].r - Math.cos( ball[i].num*Math.PI/180 ) * ball[i].r + ball[i].startY;
			}

			for (var i = 0; i < bullet.length; i++) {
				bullet[i].x += bullet[i].sX;
				bullet[i].y += bullet[i].sY;
			}

			for (var i = 0; i < bullet.length; i++) {
				for (var j = 0; j < ball.length; j++) {
					if( collision(bullet[i].x,bullet[i].y,ball[j].x,ball[j].y) ){
						bullet.splice(i,1);
						ball.splice(j,1);
						break;
					}
				}
			}

		},30)

		var ball = [];

		setInterval(function(){
			ball.push({
				x:300,
				y:0,
				r:200,
				num:0,
				startX : 300,
				startY : 0
			})
		},360);

		var iRotate = 0;

		oC.onmousemove = function(ev){
			var ev = ev || event;

			var x = ev.clientX - oC.offsetWidth;
			var y = ev.clientY - oC.offsetTop;

			var a = x - 300;
			var b = y - 200;

			var c = Math.sqrt(a*a+b*b);

			if(a>0 && b>0){
				iRotate = Math.asin(b/c) + 90*Math.PI/180;
			}
			else if(a>0){
				iRotate = Math.asin(a/c);
			}
			
			if(a<0 && b>0){
				iRotate = -(Math.asin(b/c) + 90*Math.PI/180);
			}
			else if(a<0){
				iRotate = Math.asin(a/c);
			}
		};

		var bullet = [];
		oC.onmousedown = function(ev){
			var ev = ev || event;

			var x = ev.clientX - oC.offsetWidth;
			var y = ev.clientY - oC.offsetTop;

			var a = x - 300;
			var b = y - 200;

			var c = Math.sqrt(a*a+b*b);

			var speed = 5; //子弹的速度

			var sX = speed * a / c;
			var sY = speed * b / c;

			bullet.push({
				x: 300,
				y: 200,
				sX: sX,
				sY: sY
 			})
		} 
	}

	function collision(x1,y1,x2,y2){
		var a = x1 - x2;
		var b = y1 - y2;

		var c = Math.sqrt(a*a+b*b);

		if( c <40 ){
			return true;
		}
		else{
			return false;
		}
	}

};
    //
    // Queue (FIFO)
    //

    function Queue() {
	    this.__a = new Array();
    }

    Queue.prototype.enqueue = function(o) {
	    this.__a.push(o);
    }

    Queue.prototype.dequeue = function() {
	    if( this.__a.length > 0 ) {
		    return this.__a.shift();
	    }
	    return null;
    }

    Queue.prototype.size = function() {
	    return this.__a.length;
    } 

    Queue.prototype.toString = function() {
    	return '[' + this.__a.join(',') + ']';
    }


var grid_step = 10;


function num(x, y){
  return x * grid_step + y;
}


function Point(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  /*
    this.equals = function (p) {
      return (this.x == p.x && this.y == this.y);
    }


    this.print = function(){
      console.log(this.x);
      console.log(this.y);
    }

    this.inc = function () {
      this.x++;
      this.y++;
    }
    */
}



function Pair(x, y) {
    this._x = x;
    this._y = y;

    this.x = function(){
      return this._x;
    }
    
    this.y = function(){
      return this._y;
    }
    this.equals = function (p) {
      return (this._x == p.x && this._y == p.y);
    }

    this.print = function(){
      console.log(this._x);
      console.log(this._y);
    }

    this.inc = function () {
      this._x++;
      this._y++;
    }
}

function sleep(waitMsec) {
    var startMsec = new Date();

    // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
    while (new Date() - startMsec < waitMsec);
}


/*
      for (let i = 0; i < 10; i++) {
          // 直方体を作成
          const geometry = new THREE.SphereGeometry(30, 30, 30);
          const mesh = new THREE.Mesh(geometry, material);

          // 配置座標を計算
          const radian = (i / 10) * Math.PI * 2;
          mesh.position.set(
            200 * Math.cos(radian), // X座標
            30, // Y座標
            200 * Math.sin(radian) // Z座標
          );

          // グループに追加する
          //group.add(mesh);
        }
*/

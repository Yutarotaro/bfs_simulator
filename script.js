// ページの読み込みを待つ
      window.addEventListener('load', init);

      const dx = [1,-1, 0, 0];
      const dy = [0, 0, 1, -1];


      const Obj = class{
        constructor(geometry, material, scene){
          this._mesh = new THREE.Mesh(geometry, material);
          scene.add(this._mesh);
          this._mesh.rotation.set(Math.PI / 2 , 0, 0);
        }

        get mesh(){
          return this._mesh;
        }

        pos(p){
          this._mesh.position.x = p.x;
          this._mesh.position.y = p.y;
          this._mesh.position.z = p.z;
        }

        moveTo(){
            for(let i = 0;i < 100;++i){
                this._mesh.position.x += 1; 
            }
        }
      }

      function init() {
        // サイズを指定
        const width = window.outerWidth;
        const height = window.outerHeight;

        // レンダラーを作成
        const canvasElement = document.querySelector('#myCanvas');
        const renderer = new THREE.WebGLRenderer({
          canvas: canvasElement,
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);

        // シーンを作成
        const scene = new THREE.Scene();

        // カメラを作成
        const camera = new THREE.PerspectiveCamera(45, width / height);
        var rate = 1.2;
        camera.position.set(-250 * rate, 500 * rate, 1000 * rate);
        //camera.lookAt(new THREE.Vector3(0, 0, 0));

        // カメラコントローラーを作成
        const controls = new THREE.OrbitControls(camera, canvasElement);

        // 滑らかにカメラコントローラーを制御する
        controls.enableDamping = true;
        controls.dampingFactor = 0.2;

        // 地面を作成
        var grid_size = 1000;
        var grid_step = 10;
        scene.add(new THREE.GridHelper(grid_size, grid_step));
        scene.add(new THREE.AxesHelper(grid_size / 2));


        const normal_material = new THREE.MeshNormalMaterial();

        const box_size = grid_size / grid_step;
        const agent_geometry = new THREE.BoxGeometry(box_size, box_size, box_size);
        const agent = new Obj(agent_geometry, normal_material, scene);
        agent.pos(new Point(-(grid_size - box_size)/2, box_size /2 , (grid_size - box_size)/2));



        const basic_material = new THREE.MeshBasicMaterial({color: 0xff0000});
        const obstacle_geometry = new THREE.BoxGeometry(box_size, box_size, box_size / 2);

        const pl = new Array(5);

        for(let i = 0; i < 5;++i){
          pl[i] = new Obj(obstacle_geometry, basic_material, scene);
          pl[i].pos(new Point(-100 * (i + 1/2), 25,-250));
        }

        /*

        var map = new Array(grid_step);
        for(let y = 0; y < grid_step; y++) {
          map[y] = new Array(grid_step).fill(0);
        }

        var start = Pair(0,0);
        var goal = Pair(grid_step - 1,grid_step - 1);

        const obstacle_mesh = new THREE.Mesh(obstacle_geometry, basic_material);
        obstacle_mesh.rotation.set(Math.PI / 2 , 0, 0);
        obstacle_mesh.position.set(-(grid_size - box_size)/2, box_size/4, (grid_size - box_size)/2);
        obstacle_mesh.position.x += box_size;

        scene.add(obstacle_mesh);

        */
        const GL = new Obj(obstacle_geometry, new THREE.MeshBasicMaterial({color: 0x0000ff}), scene);
        GL.pos(new Point((grid_size - box_size)/2, box_size / 4 , -(grid_size - box_size)/2));


        var q = new Queue();

        
        var dx = 0.03;
        let i = 5;
        var j = 0;

        tick();

        var flag = 1;

        // 毎フレーム時に実行されるループイベントです
        function tick() {
          i -= dx;
          j += 0.02;

          if(Math.abs(i - 0.5) > 4.52){
            dx *= -1.;
          }
          agent.pos(new Point(-box_size * (i - 0.5) , box_size / 2 , (grid_size - box_size)/2));

        
//          agent.moveTo();
          

          // カメラコントローラーを更新
          controls.update();
          // レンダリング
          renderer.render(scene, camera);
          requestAnimationFrame(tick);
        }

}


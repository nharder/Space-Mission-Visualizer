var renderer;
var camera;
var scene;

var drawArray = new Array();

function setUpScene() {					
	renderer = new THREE.CanvasRenderer({ alpha: true });
	renderer.setSize( window.innerWidth, window.innerHeight );
	
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 2100000 );
	camera.position.z = 15000;
	
	controls = new THREE.OrbitControls( camera );
	controls.addEventListener( 'change', render );
	
	scene = new THREE.Scene();
	
	var geometry = new THREE.SphereGeometry( 6350, 32, 32 );
	// var material  = new THREE.MeshBasicMaterial( { color: 0x0000ff })
	var material = new THREE.MeshBasicMaterial({ overdraw : true} );
	material.map = THREE.ImageUtils.loadTexture('img/textures/world2048.jpg');
	
	material.map.wrapS = THREE.RepeatWrapping; // This causes globe not to load
	material.map.offset.x = 180 / ( 2 * Math.PI ); // causes globe not to load
	
	material.specular  = new THREE.Color('blue');
	mesh = new THREE.Mesh( geometry, material );
	scene.add(mesh);
	
	var material = new THREE.LineBasicMaterial({color:0xff0000, opacity:1});
	var ellipse = new THREE.EllipseCurve(0, 0, 7000, 8000, 0, 2.0 * Math.PI, false);
	var ellipsePath = new THREE.CurvePath();
	ellipsePath.add(ellipse);
	var ellipseGeometry = ellipsePath.createPointsGeometry(100);
	ellipseGeometry.computeTangents();
	var line = new THREE.Line(ellipseGeometry, material);
	// scene.add(line);
	
	// var geometry  = new THREE.SphereGeometry(2000000, 32, 32);
	// var material  = new THREE.MeshBasicMaterial({overdraw : true});
	// material.map   = THREE.ImageUtils.loadTexture('img/textures/milkyway2048.jpg');
	// material.side  = THREE.BackSide;
	// var mesh  = new THREE.Mesh(geometry, material);
	// scene.add(mesh);
	
	document.body.appendChild( renderer.domElement );
}

function drawAxes() {
	var length = 10000;
	var axes = new THREE.Object3D();
	axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), 0xFF0000, false ) );
	axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), 0xFF0000, false ) );
	axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), 0xFF0000, false ) );
	scene.add(axes);
}

function drawModel() {
	$.each(model, function(index,value) {
		if(value.updated != null && value.updated == true)	
			if(drawArray[value.id] == undefined){
				var geometry = new THREE.SphereGeometry(100, 32, 32);
				var material = new THREE.MeshBasicMaterial( { color: 0xff0000} );
				material.specular  = new THREE.Color('red');
				var mesh = new THREE.Mesh( geometry, material );
				mesh.position.set(value.position[0],value.position[1], value.position[2]);
				scene.add(mesh);
				
				annotation = drawLabel(value.displayName,mesh.position);
				drawArray[value.id] = {geometry : geometry, material : material, mesh : mesh, annotation : annotation};
			} else{
				drawArray[value.id].mesh.position.set(value.position[0],value.position[1], value.position[2]);
				updateLabel( drawArray[value.id].annotation, drawArray[value.id].mesh.position);
			}
			
			value.updated = false;
		});
}

function drawLabel(text, position3d) {
	var div = document.createElement('div');
	div.className = 'annotation';
	div.style.position = 'absolute';
	//text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
	div.innerHTML = text;
	div.style.top = Math.max(Math.min(world3dToCanvas2d(position3d).y,window.innerHeight - 100), 100 ) + 'px';
	div.style.left = Math.max(Math.min(world3dToCanvas2d(position3d).x,window.innerWidth - 100), 100) + 'px';
	
	div.onclick = function(){
		moveCameraTo(position3d);
	};
	
	document.body.appendChild(div);
	return div;
}

function updateLabel( annotation, position3d){
	
	if(world3dToCanvas2d(position3d).y > window.innerHeight - 50 || world3dToCanvas2d(position3d).y < 50){ $(annotation).hide(); return; }
	if(world3dToCanvas2d(position3d).x > window.innerWidth - 50 || world3dToCanvas2d(position3d).x < 50) { $(annotation).hide(); return; }
	
	annotation.style.top = world3dToCanvas2d(position3d).y;
	annotation.style.left = world3dToCanvas2d(position3d).x;
	
	$(annotation).show();
	
	annotation.onclick = function(){
		moveCameraTo(position3d);
	};
	
	return annotation;
}

function world3dToCanvas2d( position ) {
		var projector = new THREE.Projector();
		var vector = projector.projectVector(position.clone(), camera);
		vector.x = (vector.x + 1)/2 * window.innerWidth;
		vector.y = -(vector.y - 1)/2 * window.innerHeight;
		return vector;
}

function moveCameraTo(position){
	var tween = new TWEEN.Tween(camera.position).to({
	    x: position.x,
	    y: position.y,
	    z: 1
	}).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
	    camera.lookAt(camera.target);
	}).onComplete(function () {
	    camera.lookAt(position);
	}).start();
	
	var tween = new TWEEN.Tween(camera.target).to({
	    x: position.x,
	    y: position.y,
	    z: 0
	}).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
	}).onComplete(function () {
	    camera.lookAt(position);
	}).start();
}

function lighting() {
	// add subtle blue ambient lighting
	var ambientLight = new THREE.AmbientLight(0x000044);
	scene.add(ambientLight);
	
	// directional lighting
	var directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set(1, 1, 1).normalize();
	scene.add(directionalLight);
}

function render() {
	renderer.render( scene, camera );
}
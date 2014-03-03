window.addEventListener('DOMContentLoaded', function(){ 

	var cube = function () {
		var clickableElement = document.getElementById('cube-click-box'),
				cubeBox 				 = document.getElementById('cube-1'),
				cubePlanes 			 = cubeBox.children,
				translateZ 			 = '200px',
				currentXRotation = 0,
				currentYRotation = 0,
				previousX 			 = 0,
				previousY 			 = 0,
				distanceX 			 = 0,
				distanceY 			 = 0,
				cubeInterval;
			

	// Start Function Variables
		var initialize = function () {
			clickableElement.addEventListener('mousedown', onMouseDown);
			clickableElement.addEventListener('mouseup', onMouseUp);

			// cubeBox.addEventListener('mouseover', onCubeHover);
		},

		onMouseDown = function () {
			previousX = event.clientX;
			previousY = event.clientY;

			distanceX = 0;
			distanceY = 0;
			
			clickableElement.addEventListener('mousemove', onMouseMove);
			clearInterval(cubeInterval);
			cubeInterval = undefined;
		},

		onCubeHover = function () {
			// rotate the cube in a random direction
		},

		onMouseMove = function (event) {
			var currentX  = event.clientX,
					currentY  = event.clientY,
					movementX = (currentX - previousX)
					movementY = (currentY - previousY)
					x = currentXRotation + movementX,
					y = currentYRotation + movementY;

			currentXRotation = x;
			currentYRotation = y;

			x =  x/4  // divide by X to slow down the movement 
			y = -y/4	// else the movement is too fast for small mouse movements
								// -y is required to make box follow the mouse movement
			
			// console.log(movementX, movementY);
			// console.log('mousemove: ', currentXRotation, currentYRotation);
			
			rotateCube(x, y); // make actual DOM movement

			distanceX = currentX - previousX; // this is setup to track momentum for the onMouseUp momentum
			distanceY = currentY - previousY;

			previousX = currentX;
			previousY = currentY;
		},

		rotateCube = function (x, y) { 
			//mouse movement along the X axis rotates the cube along it's Y axis
			rotateX  = 'rotateX(' + y + 'deg)';
			rotateY  = 'rotateY(' + x + 'deg)';
			
			// console.log (rotateX, rotateY);
			cubeBox.style.webkitTransform = rotateX + rotateY;
		},

		calculateVelocity = function (event) { // this function sets the global values of distanceX & distanceY

		},

		onMouseUp = function (event) {

			if (distanceX || distanceY) { // no mouse movement = no movement physics
				 calculateMovementPhysics(event); 
			} 										  

			removeListeners();
		},
		/*  (x, y) rotation Axis
		.           Y
		.						|
		.   (+, -)  |  (+, +)
		.           |      
		.   -------------------X 
		.			      |
		.		(-, -)  |  (-, +)
		.			      |
		*/
		calculateMovementPhysics = function (event) {
				var	movementX = distanceX * 10, // higher number == more movement
						movementY = distanceY * 10,
						movementDistanceX,
						movementDistanceY,
						stepX = 0,
						stepY = 0;

				var enableMomentum = function () {
					stepX = Math.round(movementX / 30, 0), // ??
					stepY = Math.round(movementY / 30, 0);

					x = currentXRotation + stepX;
					y = currentYRotation + stepY;

					rotateCube(x/4, -y/4); // Make the actual movement

					currentXRotation = x;
					currentYRotation = y;
					
					movementX -= stepX;
					movementY -= stepY;

					// if there is no more step movement then stop the function
					if (stepX == 0 && stepY == 0) {
						clearInterval(cubeInterval);

						distanceX = 0; // if .05 distance is left we'll get rid of it.
						distanceY = 0;
						cubeInterval = undefined;
					} else {
						if (!cubeInterval) cubeInterval = setInterval(enableMomentum, 50);	
					}
				};

				enableMomentum();

		},

		removeListeners = function () {
			clickableElement.removeEventListener('mousemove', onMouseMove)
		};

	initialize();	
	}; // end cube()

	cube();
});






















/* 
"matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 200, 1)"

"matrix3d(1, 0, 0, 0, 		= Rotation
					0, 1, 0, 0, 		= Scale
					0, 0, 1, 0, 		= Translation
					0, 0, 200, 1)"  = 

*/

/* Rotate Cube Counter Clockwise 90deg on Y Axis  */ /*

.cube-1:hover .front  { -webkit-transform: rotateY( 90deg  ) 									  translateZ( 200px ); }
.cube-1:hover .back   { -webkit-transform: rotateX( 180deg ) rotateY( -90deg )  translateZ( 200px ); }
.cube-1:hover .top    { -webkit-transform: rotateX( 90deg  ) rotateZ( -90deg )  translateZ( 200px ); }
.cube-1:hover .bottom { -webkit-transform: rotateX( -90deg ) rotateZ( 90deg  )  translateZ( 200px ); }
.cube-1:hover .left   { -webkit-transform: rotateY( 0deg   ) 									  translateZ( 200px ); }
.cube-1:hover .right  { -webkit-transform: rotateY( 180deg ) 									  translateZ( 200px ); }

*/
var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");
		var width = canvas.width;
		var height = canvas.height;

		var snake = [{x: 8, y: 8}];
		var apple = {x: 10, y: 10};
		var direction = "right";
		var score = 0;

		// Handle arrow key input
		document.addEventListener("keydown", function(event) {
			if (event.keyCode === 37 && direction !== "right") {
				direction = "left";
			} else if (event.keyCode === 38 && direction !== "down") {
				direction = "up";
			} else if (event.keyCode === 39 && direction !== "left") {
				direction = "right";
			} else if (event.keyCode === 40 && direction !== "up") {
				direction = "down";
			}
		});

		// Main game loop
		function gameLoop() {
			// Move the snake
			var head = {x: snake[0].x, y: snake[0].y};
			if (direction === "left") {
				head.x--;
			} else if (direction === "up") {
				head.y--;
			} else if (direction === "right") {
				head.x++;
			} else if (direction === "down") {
				head.y++;
			}
			snake.unshift(head);

			// Check for collision with walls
			if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) {
				return endGame();
			}

			// Check for collision with snake body
			for (var i = 1; i < snake.length; i++) {
				if (head.x === snake[i].x && head.y === snake[i].y) {
					return endGame();
				}
			}

			// Check for collision with apple
			if (head.x === apple.x && head.y === apple.y) {
				score++;
				document.getElementById("score").innerHTML = "Score: " + score;
				apple = spawnApple();
			} else {
				snake.pop();
			}

			// Clear the canvas and draw game objects
			ctx.clearRect(0, 0, width, height);
			ctx.fillStyle = "red";
			ctx.fillRect(apple.x * 10, apple.y * 10, 10, 10);
			ctx.fillStyle = "green";
			for (var i = 0; i < snake.length; i++) {
				ctx.fillRect(snake[i].x * 10, snake[i].y * 10, 10, 10);
			}

			// Schedule the next frame
			setTimeout(gameLoop, 100);
		}

		// Utility function to spawn a new apple
		function spawnApple() {
			var x = Math.floor(Math.random() * width / 10);
			var y = Math.floor(Math.random() * height / 10);
			for (var i = 0; i < snake.length; i++) {
				if (x === snake[i].x && y === snake[i].y)
return spawnApple();
			}
			return {x: x, y: y};
		}

		// Utility function to end the game
		function endGame() {
			alert("Game over!");
			document.location.reload();
		}

		// Start the game loop
		gameLoop();

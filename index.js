window.onload = function () {
  // Drawing Stuff
  var canvas = document.getElementById('canvas')
  var ctx    = canvas.getContext('2d')
  var width  = canvas.width = window.innerWidth
  var height = canvas.height = window.innerHeight

  // Timing Stuff
  var deltaTime   = 0
  var lastTimeMs  = 0
  var timeStep    = 1000/60
  var physicsStep = 1 / timeStep

  // Enteties
  var particles = []
  fillArray(width/2, height/2, getRandomColor())

  // Engine MainLoop
  // Dont read this function, it just call update and draw
  // multiple times per second
  function main(now) {
    deltaTime += now - lastTimeMs
    lastTimeMs = now
    while(deltaTime >= timeStep) {
      update(physicsStep)
      deltaTime -= timeStep
    }
    draw(ctx)
    requestAnimationFrame(main)
  }

  // this is where game logic happens
  // this is used to update game entities, like their
  // position, velocity, forces, etc...
  function update(dt) {
    // loop through all game entities and update them
    // they have to implement a 'update' method
    for(var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i]

      // decrease the particle radius to simulate a fireworks particle
      p.radius -= 0.05;

      // if its radius is less than 0, they it must die
      // thus, remove it from particles array to increase CPU performance
      if (p.radius <= 0) {
        particles.splice(i, 1)
        continue
      }

      p.update(dt)
    }
  }


  // this is used to draw game entities on the screen
  function draw(ctx) {
    // first clear, what was drawn on the canvas in the last framw
    // try to comment out these two lines and see what happens
    // to understand what it really do
    ctx.fillStyle = 'rgba(221, 221, 221, 0.2)'
    ctx.fillRect(0, 0, width, height)

    // loop throught all game entities and draw them
    // they must implement a 'draw' function
    for(var i = particles.length - 1; i >= 0; i--) {
      particles[i].draw(ctx)
    }
  }

  // start the loop
  // this is like calling the main function like main()
  requestAnimationFrame(main)

  // used to fill particles array with 50 random particles
  function fillArray(x, y, color) {
    for(var i = 0; i < 50; i++) {
      var p = new Particle(
        x, // position.x
        y, // position.y
        Math.random() * 7 + 5, // circle radius (random number between 5 & 12)
        Math.random() * 50 + 50, // speed (random number between 50 & 100)
        Math.random() * Math.PI * 2, // direction (angle) (random number between 0 & 2 * PI)
        color
      )
      p.acceleration.y = 1 // gravity
      particles.push(p)
    }
  }

  // returns random color
  function getRandomColor() {
    return 'rgb(' +
      Math.floor(Math.random()*256) +
      ',' +
      Math.floor(Math.random()*256) +
      ',' +
      Math.floor(Math.random()*256) +
      ')'
  }

  // listen to mouse clicks, and when it clicks fill the particles array
  // with 50 more particles in the posistion of the click
  document.body.addEventListener('mousedown', function (e) {
    fillArray(e.clientX, e.clientY, getRandomColor())
  })
}
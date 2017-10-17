// Partcle class
// x = position.x
// y = position.y
// speed = the length of the velocity vector
// direction = the angle of the velocity vector
// color = the color of this particle
var Particle = function (x, y, radius, speed, direction, color) {
  this.position = new Vector(x, y)

  this.velocity = new Vector(0, 0)
  this.velocity.setLength(speed)
  this.velocity.setAngle(direction)

  this.acceleration = new Vector()

  this.radius = radius || 10
  this.color = color || '#000000'
}

Particle.prototype.update = function (dt) {
  // add postion to velocity
  this.position.x += this.velocity.x * dt
  this.position.y += this.velocity.y * dt

  // add velocity to acceleration
  this.velocity.x += this.acceleration.x
  this.velocity.y += this.acceleration.y
}

// draw a circle on the screen
Particle.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color
  ctx.beginPath()
    ctx.arc(
      this.position.x, // circle center x
      this.position.y, // circle center y
      this.radius,     // circle radius
      0,               // begin from angle 0
      Math.PI * 2,     // to angle 360
      true             // never mind this
    )
  ctx.closePath()
  ctx.fill()
}
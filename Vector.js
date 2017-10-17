// the most important class in any physics simulation
var Vector = function (x, y) {
  this.x = x || 0
  this.y = y || 0
}

// return the distnace from this vector to another one
Vector.prototype.distanceTo = function (v2) {
  var dx = this.x - v2.x
  var dy = this.y - v2.y
  return Math.sqrt(dx * dx + dy * dy)
}

// returns vector's magnitude
Vector.prototype.getLength = function () {
  return Math.sqrt(this.x * this.x + this.y * this.y)
}

// sets vector's magnitude
Vector.prototype.setLength = function (length) {
  var angle = this.getAngle()
  this.x = Math.cos(angle) * length
  this.y = Math.sin(angle) * length
}

// return the angle from this vector to another one
Vector.prototype.angleTo = function (v2) {
  var dx = v2.x - this.x
  var dy = v2.y - this.y
  return Math.atan2(dy, dx)
}

// return this vector angle
Vector.prototype.getAngle = function () {
  return Math.atan2(this.y, this.x)
}

// sets the angle of this vector
Vector.prototype.setAngle = function (angle) {
  var length = this.getLength()
  this.x = Math.cos(angle) * length
  this.y = Math.sin(angle) * length
}

// returns the unit vector of this vector
Vector.prototype.normalize = function () {
  var length = this.getLength()
  return new Vector(
    this.x / length,
    this.y / length
  )
}
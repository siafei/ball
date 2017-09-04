class Ball extends Base {
    constructor(paddle) {
        super(paddle)
        this.on_event = {
        	k:'move',
        }
        this.image.name = 'ball'
    }
    move() {
        // log('move')
        if (this.image.x < 0 || this.image.x > 400) {
            this.image.speedX = -this.image.speedX
        }
        if (this.image.y < 0 || this.image.y > 300) {
            this.image.speedY = -this.image.speedY
        }
        // move
        this.image.x += this.image.speedX
        this.image.y += this.image.speedY
    }
    fire() {
    	if (this.fire) {
    		this.fire = false
    	}else{
    		this.fire = ture
    	}
    }
	reboundY() {
        this.image.speedY *= -1
    }
    reboundX() {
        this.image.speedX *= -1
    }
    hasPoint (x, y) {
        var xIn = x >= this.image.x && x <= this.image.x + this.image.w
        var yIn = y >= this.image.y && y <= this.image.y + this.image.h
        return xIn && yIn
    }
    update() {
    	log(this.image)
    }
}
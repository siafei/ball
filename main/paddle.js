class Paddle extends Base {
    constructor(paddle) {
        super(paddle)
        this.event = {
        	d:'moveRight',
        	a:'moveLeft',
        }
        this.image.name = 'paddle'
    }

    moveLeft() {
    	this.move(this.image.x - this.image.speed)
    }

    moveRight() {
    	this.move(this.image.x + this.image.speed)
    }

    move(x) {
        this.image.x = x
        if (this.image.x < 0) {
            this.image.x = 0
        }
        if (this.image.x > 400 - this.image.w) {
            this.image.x = 400 - this.image.w
        }
    }

    aInb(x, x1, x2) {
        return x >= x1 && x <= x2
    }
    collide(ball) {
        if (this.aInb(this.image.x, ball.x, ball.x + ball.w) || this.aInb(ball.x, this.image.x, this.image.x + this.image.w)) {
            if (this.aInb(this.image.y, ball.y, ball.y + ball.h) || this.aInb(ball.y, this.image.y, this.image.y + this.image.h)) {
                return true
            }
        }
        return false
    }
}
class Block extends Base {
    constructor(paddle) {
        super(paddle)
        this.image.name = 'block'
    }

	reboundY() {
        this.image.speedY *= -1
    }
    reboundX() {
        this.image.speedX *= -1
    }
    aInb(x, x1, x2) {
        return x >= x1 && x <= x2
    }
    collide(ball) {
        if (this.aInb(this.image.x, ball.x, ball.x + ball.w) || this.aInb(ball.x, this.image.x, this.image.x + this.image.w)) {
            if (this.aInb(this.image.y, ball.y, ball.y + ball.h) || this.aInb(ball.y, this.image.y, this.image.y + this.image.h)) {
                this.kill()
                return true
            }
        }
        return false
    }
}
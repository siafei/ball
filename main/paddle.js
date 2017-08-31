class Paddle extends Base {
    constructor(paddle) {
        super(paddle)
        this.paddle = paddle
        this.paddle.x = 100
        this.paddle.y = 250
        this.paddle.speed = 15
        this.event = {
        	d:this.moveRight,
        	a:this.moveLeft,
        }
    }

    moveLeft() {
    	this.move(this.paddle.x - this.paddle.speed)
    }

    moveRight(paddle) {
    	this.move(this.paddle.x + this.paddle.speed)
    }

    move(x) {
        this.paddle.x = x
        if (this.paddle.x < 0) {
            this.paddle.x = 0
        }
        if (this.paddle.x > 400 - this.paddle.w) {
            this.paddle.x = 400 - this.paddle.w
        }
    }

    aInb(x, x1, x2) {
        return x >= x1 && x <= x2
    }
    collide(ball) {
        if (this.aInb(this.paddle.x, ball.ball.x, ball.ball.x + ball.ball.w) || this.aInb(ball.ball.x, this.paddle.x, this.paddle.x + this.paddle.w)) {
            if (this.aInb(this.paddle.y, ball.ball.y, ball.ball.y + ball.ball.h) || this.aInb(ball.ball.y, this.paddle.y, this.paddle.y + this.paddle.h)) {
                return true
            }
        }
        return false
    }
}
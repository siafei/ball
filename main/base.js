class Base {
    constructor(image) {
        this.image = image
    }
    static new(image) {
        var i = new this(image)
        return i
    }
    kill() {
        if (this.image.alive > 0) {
            this.image.alive = this.image.alive - 1
        }
    }
    move() {
    }
    update() {

    }


}
var loadLevel = function(game, n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var block = {
            'x' : p[0],
            'y' : p[1],
            'alive':p[2],
        }
        var b = Block.new(block)
        blocks.push(b)
    }
    game.registerBlock(blocks)
}


var enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    window.paused = false
    var g = game
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            blocks = loadLevel(game, Number(k))
        }
    })
    g.canvas.addEventListener('mousedown', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        // 检查是否点中了 balls
        if (g.image_class.ball.hasPoint(x, y)) {
            // 设置拖拽状态
            g.enableDrag = true
        }
    })
    g.canvas.addEventListener('mousemove', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        if (g.enableDrag) {
            g.image_class.ball.image.x = x
            g.image_class.ball.image.y = y
        }
    })
    g.canvas.addEventListener('mouseup', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        g.enableDrag = false
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}

var __main = function() {
    var game = GuaGame.instance(config)
    var paddle = Paddle.new(game.config.paddle)
    var ball = Ball.new(game.config.ball)
    game.registerImg('paddle',{'paddle':paddle})
    game.registerImg('ball',{'ball':ball})
    loadLevel(game,2)
    game.init()
    enableDebugMode(game, true)
}

__main()

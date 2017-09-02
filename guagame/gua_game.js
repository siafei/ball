// 瓜
class GuaGame {
    constructor(config) {
        this.config = config
        window.fps = config.fps
        this.images = config.images
        //
        this.scene = null
        this.actions = {}
        this.on_action = {}
        this.keydowns = {}
        this.image_class = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        // events
        // this.loadImage()
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }
    registerImg(name,imageClass) {
        this.image_class = Object.assign(this.image_class,imageClass);
        this.registerAction(name,imageClass[name].event)
        this.registerOnAction(name,imageClass[name].on_event)
    }
    addEvent(g) {
        window.addEventListener('keydown', event => {
            if (g.actions[event.key]!== undefined) {
                g.keydowns[event.key] = true
            }else if(g.on_action[event.key] !== undefined) {
                if (g.keydowns[event.key]) {
                    g.keydowns[event.key] = false
                }else{
                    g.keydowns[event.key] = true
                }
            }
        })
        window.addEventListener('keyup', function(event){
            if (g.actions[event.key]!==undefined) {
                g.keydowns[event.key] = false
            }
        })
    }
    loadImage() {
        var loads = []
        // 预先载入所有图片
        var names = Object.keys(this.images)
        for (var i in names) {
            let name = names[i]
            var path = this.images[name]
            let img = new Image()
            img.src = path
            this.config[names[i]].image = img
            let g = this
            img.onload = function() {
                // 存入 g.images 中
                g.images[name] = img
                // 所有图片都成功载入之后, 调用 run
                loads.push(1)
                // log('load images', loads.length, names.length)
                if (loads.length == names.length) {
                    // log('load images', g.images)
                    g.__start()
                }
            }
        }
    }
    drawImage(img) {
        this.context.drawImage(img.image, img.x, img.y)
    }
    // update
    update() {

    }
    // draw
    draw() {
        for (let i in this.image_class) {
            this.drawImage(this.image_class[i].image)
        }
    }
    //
    registerAction(classname,event) {
        for(var i in event){
            this.actions[i] = {'classname':classname,'method':event[i]}
        }
    }
    registerOnAction(classname,onevent) {
        for (var i in onevent) {
            this.on_action[i] = {'classname':classname,'method':onevent[i]}
            this.keydowns[i] = false
        }
    }
    runloop() {
        // events
        var actions = Object.keys(this.actions)
        for (let i = 0; i < actions.length; i++) {
            var key = actions[i]
            if(this.keydowns[key]) {
                var mhd = this.actions[key]
                // 如果按键被按下, 调用注册的 action
                this.image_class[mhd['classname']][mhd['method']]()
                // this.actions[key]()
            }
        }
        var on_action = Object.keys(this.on_action)
        for (let i = 0; i < on_action.length; i++) {
            var key = on_action[i]
            if(this.keydowns[key]) {
                var mhd = this.on_action[key]
                // 如果按键被按下, 调用注册的 action
                this.image_class[mhd['classname']][mhd['method']]()
                // this.actions[key]()
            }
        }
        // update
        this.update()
        // clear
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        // draw
        this.draw()
        // next run loop
        var g = this
        setTimeout(function(){
            g.runloop()
        }, 1000/window.fps)
    }
    __start() {
        var g = this
        this.addEvent(g)
        this.draw()
        this.runloop()
    }

    init() {
        this.loadImage()
    }
}

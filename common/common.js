function closeWindow() {
    try {
        window.document.title = "closeWindow";
        android.closeWebView();
    } catch (e) {

    }
}

/*
 * 按钮
 * params: states, [normalImage,selectedImage,disabledImage] ,按钮三种状态资源路径
 * params: callback, 回调
 * params: target
 */
var Button = cc.Sprite.extend({
    enabled: true,
    ctor: function (states, callback, target) {
        this.states = states;
        this._super(states[0]);
        if(!this.states[1]) this.states[1] = this.states[0];
        if(!this.states[2]) this.states[2] = this.states[0];

        var self = this;
        addEvent([
            function () {
                if(!self.enabled) return;
                self.setStates("selected");                
            },
            function () {},
            function () {
                if(!self.enabled) return;
                self.setStates("normal");
                callback.call(target, self);
            }
        ], this);
    },
    setStates: function (state) {
        switch(state) {
            case "normal":
                this.setTexture(this.states[0]);
                break;
            case "selected":
                this.setTexture(this.states[1]);
                break;
            case "disable":
                this.setTexture(this.states[2])
                break;
            default: console.error("unkonwn state: " + state);
        }
    }
});


/*
 * 文本框
 * params: text, 显示文字
 * params: size, 大小
 * params: font, 字体
 * params: color, 颜色
 */
var TextField = cc.LabelTTF.extend({
    ctor: function (text, size, font, color) {
        size = size || 22;
        font = font || "comic Sans Ms";
        color = color || cc.color(0, 0, 0);
        var fontDef = new cc.FontDefinition();
        fontDef.fontName = font;
        fontDef.fontSize = size;
        fontDef.fillStyle = color;
        this._super(text, fontDef);
    },
    getWidth: function () {
        return this.getContentSize().width;
    },
    getHeight: function () {
        return this.getContentSize().height;
    }
});


/*
 * 序列帧动画
 * params: plist资源文件
 * params: delay, 单位为秒
 * params: restOrigFrame, 动画播放结束是否恢复第一帧, 默认为false
 */
var Animation = cc.Animate.extend({
    ctor: function (plistUrl, delay, restOrigFrame) {
        var frames = [], //序列帧
            frameConfigCache = cc.spriteFrameCache._frameConfigCache, //cocos2d-js 帧缓存
            delay = delay || 0.1;

        if (!plistUrl) {
            console.error("plist file can not be none.");
            return;
        }

        if (isNaN(delay)) {
            console.error("delay value must be a number.");
            return;
        }

        if (!frameConfigCache[plistUrl] || !frameConfigCache[plistUrl].frames) {
            console.error("plist file: " + plistUrl + "not found.");
            return;
        }

        var frameNames = [];
        for (var name in frameConfigCache[plistUrl].frames) {
            frameNames.push(name);
        }

        var reg = /\d/g;
        frameNames.sort(function(a, b){
            return a.match(reg).join("") - b.match(reg).join("");
        });

        for(var i=0;i<frameNames.length;i++){
            frames.push(cc.spriteFrameCache.getSpriteFrame(frameNames[i]));
        }

        this.animation = new cc.Animation(frames);
        this.animation.setDelayPerUnit(delay);
        this.animation.setRestoreOriginalFrame(restOrigFrame || false);

        this._super(this.animation);
    }
});

/*
 * 序列帧动画2
 * params: animationImages, 序列帧资源数组
 * params: delay, 单位为秒
 * params: restOrigFrame, 动画播放结束是否恢复第一帧, 默认为false
 */
var AnimationFrames = cc.Animate.extend({
    ctor: function (animationImages, delay, restOrigFrame) {
        delay = delay || 0.1;

        this.animation = new cc.Animation();
        this.animation.setDelayPerUnit(delay);
        this.animation.setRestoreOriginalFrame(restOrigFrame || false);

        for (var i = 0; i < animationImages.length; i++) {
            this.animation.addSpriteFrameWithFile(animationImages[i]);
        }

        this._super(this.animation);
    }
});


/*
 * 播放音效
 * params: url, 资源路径
 * params: isRepeat, 是否重复播放
 */
function playEffect(url, isRepeat) {
    isRepeat == isRepeat === undefined ? false : isRepeat;
    cc.audioEngine.stopAllEffects();
    return cc.audioEngine.playEffect(url, isRepeat);
}

/*
 * 播放音乐
 * params: url, 资源路径
 * params: isRepeat, 是否重复播放
 */
function playSound(url, isRepeat) {
    isRepeat == isRepeat === undefined ? true : isRepeat;
    if (!cc.audioEngine.isMusicPlaying()) {
        cc.audioEngine.stopMusic();
        return cc.audioEngine.playMusic(url, true);
    }
    return null;
}

function stopAllEffects() {
    cc.audioEngine.stopAllEffects();
    if(window.__currentAudio) window.__currentAudio.stop();
    //bug to fix
    if(window.__currentAudioAction) {
        var target = window.__currentAudioAction.getOriginalTarget();
        var element = cc.director.getActionManager()._hashTargets[target.__instanceId];
        if(element) {
            target.stopAction(window.__currentAudioAction);
        }
    }
    
}

/*
 * 播放声音(回调)
 * params: url, 资源路径
 * params: callback, 回调方法
 * params: target, target
 */
function playAudio(url, callback, target) {
    var audio,
        startTime,
        deltaTime,
        timeAction,
        duration = 0;
    audio = cc.loader.cache[url];
    if(!audio){
        startTime = new Date;
        cc.loader.load(url, function (err, data) {
            audio = cc.loader.cache[url];
            window.__currentAudio = audio;
            
            if(duration = audio._AUDIO_TYPE === "WEBAUDIO") {
                audio.play();
                deltaTime = new Date - startTime;
                duration = audio._buffer.duration;
                duration -= deltaTime/1000;
                timeAction = target.runAction(cc.sequence(cc.delayTime(duration), new cc.CallFunc(function () {
                    target.stopAction(timeAction);
                    callback.call(target, audio);
                }, target)));
                window.__currentAudioAction = timeAction;
            }else{
                audio._element.currentTime = 0.01;
                audio.play();
                audio._element.addEventListener('durationchange', function () {
                    deltaTime = new Date - startTime;
                    duration = audio._element.duration;
                    duration -= deltaTime/1000;
                    timeAction = target.runAction(cc.sequence(cc.delayTime(duration), new cc.CallFunc(function () {
                        target.stopAction(timeAction);
                        callback.call(target, audio);
                    }, target)));
                    window.__currentAudioAction = timeAction;
                });
            }
        })
    }else {
        window.__currentAudio = audio;
        if(duration = audio._AUDIO_TYPE === "WEBAUDIO") {
            audio.play();
            duration = audio._buffer.duration;
            timeAction = target.runAction(cc.sequence(cc.delayTime(duration), new cc.CallFunc(function () {
                target.stopAction(timeAction);
                callback.call(target, audio);
            }, target)));
            window.__currentAudioAction = timeAction;
        }else {
            audio._element.currentTime = 0.01;
            audio.play();
            startTime = new Date;
            audio._element.addEventListener('durationchange', function () {
                deltaTime = new Date - startTime;
                duration = audio._element.duration;
                duration -= deltaTime/1000;
                timeAction = target.runAction(cc.sequence(cc.delayTime(duration), new cc.CallFunc(function () {
                    target.stopAction(timeAction);
                    callback.call(target, audio);
                }, target)));
                window.__currentAudioAction = timeAction;
            });
        }
    }

}

/*
 * 渲染场景
 * params: scene, scene name
 */
function runScene(scene) {
    cc.director.runScene(scene);
};


function convertObjectToArray(obj) {
    var arr = [];
    for (var p in obj) {
        if (Object.prototype.toString.call(obj[p]) == '[object Array]') {
            arr = arr.concat(convertObjectToArray(obj[p]));
        } else if (typeof obj[p] == 'object' && Object.prototype.toString.call(obj[p]) == '[object Object]') {
            arr = arr.concat(convertObjectToArray(obj[p]));
        } else if (typeof obj[p] == 'string' || Object.prototype.toString.call(obj[p]) == '[object String]') {
            arr.push(obj[p]);
        } else if (typeof obj[p] == 'number' || Object.prototype.toString.call(obj[p]) == '[object Number]') {
            arr.push(obj[p]);
        } else {
            console.error("error format data object. please check {" + p + ":: " + obj[p] + "}.");
            break;
        }
    }

    return arr;
}

/*
 * 添加touch事件
 * */
function addEvent(funcList, obj, isSwallowTouches) {
    var beganFunc, movedFunc, endedFunc;

    if (cc.isArray(funcList)) {
        beganFunc = funcList[0];
        movedFunc = funcList[1];
        endedFunc = funcList[2];
    } else if (cc.isFunction(funcList)) {
        endedFunc = funcList;
    }

    var touchListener = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: isSwallowTouches || true,
        onTouchBegan: function (touch, event) {
            var pos = touch.getLocation();
            var target = event.getCurrentTarget();

            if (target.visible && cc.rectContainsPoint(target.getBoundingBoxToWorld(), pos)) {
                if (cc.isFunction(beganFunc)) {
                    var result = beganFunc(pos, target);
                    if (result != undefined) {
                        return result;
                    }
                }
                
                return true;
            }
            return false;
        },
        onTouchMoved: function (touch, event) {
            if (cc.isFunction(movedFunc))
                movedFunc(touch, event.getCurrentTarget());

        },
        onTouchEnded: function (touch, event) {
            if (cc.isFunction(endedFunc))
                endedFunc(touch.getLocation(), event.getCurrentTarget());
        }
    });

    cc.eventManager.addListener(touchListener, obj);
}

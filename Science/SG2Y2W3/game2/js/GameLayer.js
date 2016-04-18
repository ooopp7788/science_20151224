;(function () {
	var GameLayer = ScienceGameBaseLayer.extend({
		objects: [],
		ctor: function () {
			this._super();
		},
		onEnter: function () {
			this._super();

			this.initUI({
	            bg: resGame.bg_png,
	            title: resGame.title_last_png
	        });

	        this.initGameIntro({
	            title: resGame.title_png,
	            titleSound: resGame.title_mp3, 
	            introSound: resGame.intro_mp3,
	            delayTime: 9000,
	            callback: function () {

	            }
	        });

	        this.objects = [];
	        this.initGame();
		},
		onRefreshCallback: function () {
			this._super();
			this.initGame();
		},
		initGame: function () {
			this.initGameData();
			this.initObjects();
		},
		initGameData: function () {
			var allRightObjects = [
				{
					img: resGame.pic1_png,
					value: 1
				},
				{
					img: resGame.pic3_png,
					value: 1
				},
				{
					img: resGame.pic5_png,
					value: 1
				}
			];

			var allWrongObjects = [
				{
					img: resGame.pic2_png,
					value: 0
				},
				{
					img: resGame.pic4_png,
					value: 0
				},
				{
					img: resGame.pic6_png,
					value: 0
				}
			];

			allWrongObjects.splice(Math.floor(Math.random()*allWrongObjects.length), 1);

			this.allObjects = allRightObjects.splice(Math.floor(Math.random()*allRightObjects.length), 1).concat(allWrongObjects);

			this.allObjects.sort(function(){
				return Math.random() > .5;
			});
		},
		initObjects: function () {
			this.clearObject();

			if(!this.basket) {
				this.basket = new Basket();
				this.addChild(this.basket);
			}else{
				this.basket.randomType();
			}
			this.basket.setPosition(1000, 350);

			var positions = [
				[200, 203],
				[450, 503],
				[700, 203]
			];
			for(var i=0;i<this.allObjects.length;i++){
				var object = new GameObject(this.allObjects[i], this);
				this.addChild(object);
				object.setInitPosition(positions[i][0], positions[i][1]);

				this.objects.push(object);
			}

			
		},
		clearObject: function () {
			for(var i=0;i<this.objects.length;i++){
				this.objects[i].removeFromParent(true);
			}
			this.objects.length = 0;
		},
		checkCollision: function (obj, pos) {
			var rect1 = obj.getBoundingBoxToWorld();
			var rect2 = this.basket.getBoundingBoxToWorld();
			console.log("check", rect1, rect2, cc.rectContainsRect(rect1, rect2));
			// if(cc.rectContainsRect(rect1, rect2)){
			if(cc.rectContainsPoint(rect2, pos)){
				if(obj.getValue() == 1) {
					obj.visible = false;
					this.basket.fly();
					this.playRightSound();
				}else{
					obj.reset();
					this.playWrongSound();
				}
			}else{
				obj.reset();
			}
			
		}
	});

	var Basket = cc.Sprite.extend({
		ctor: function () {
			this.basketTypes = [
				resGame.basket1_png,
				resGame.basket2_png,
				resGame.basket3_png
			];
			this._super(this.basketTypes[Math.floor(Math.random()*this.basketTypes.length)]);
		},
		randomType: function () {
			this.initWithFile(this.basketTypes[Math.floor(Math.random()*this.basketTypes.length)]);
			this.opacity = 255;
		},
		fly: function () {
			this.runAction(cc.spawn(
                cc.moveTo(.5, cc.p(1000, 550)),
                cc.fadeOut(.5)
            ));
		}
	});

	var GameObject = cc.Sprite.extend({
		data: null,
		targetLayer: null,
		initX: 0,
		initY: 0,
		ctor: function (data, targetLayer) {
			this.data = data;
			this.targetLayer = targetLayer;
			this._super(data.img);

			var self = this;
			addEvent([
				function(pos, target){

				},
				function(touch, target){
	                var delta = touch.getDelta();
					self.x += delta.x;
					self.y += delta.y;
				},
				function(pos, target){
					self.targetLayer.checkCollision(target, pos);
				}
			], this);
		},
		setInitPosition: function (x, y) {
			this.initX = x;
			this.initY = y;
			this.setPosition(x, y);
		},
		reset: function () {
			this.setPosition(this.initX, this.initY);
		},
		getValue: function () {
			return this.data.value;
		}
	});

	var GameScene = BaseScene.extend({
		run: function(){
			var layer = new GameLayer();
	        this.addChild(layer);
	        runScene(this);
		}
	});

	window.GameLayer = GameLayer;
	window.GameScene = GameScene;
})();
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
	            delayTime: 6000,
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
					imgs: [resGame.pic1_png, resGame.pic1_selected_png],
					value: 1
				},
				{
					imgs: [resGame.pic2_png, resGame.pic2_selected_png],
					value: 1
				},
				{
					imgs: [resGame.pic3_png, resGame.pic3_selected_png],
					value: 1
				},
				{
					imgs: [resGame.pic4_png, resGame.pic4_selected_png],
					value: 1
				}
			];

			var allWrongObjects = [
				{
					imgs: [resGame.pic5_png, resGame.pic5_selected_png],
					value: 0
				},
				{
					imgs: [resGame.pic6_png, resGame.pic6_selected_png],
					value: 0
				},
				{
					imgs: [resGame.pic7_png, resGame.pic7_selected_png],
					value: 0
				}
			];

			allRightObjects.splice(Math.floor(Math.random()*allRightObjects.length), 1);
			allWrongObjects.splice(Math.floor(Math.random()*allWrongObjects.length), 1);

			this.allObjects = allRightObjects.concat(allWrongObjects);

			this.allObjects.sort(function(){
				return Math.random() > .5;
			});

		},
		initObjects: function () {
			this.clearObject();

			var positions = [
				[350, 170],
				[650, 170],
				[1000, 170],
				[470, 470],
				[830, 470],
			];
			for(var i=0;i<this.allObjects.length;i++){
				var object = new GameObject(this.allObjects[i], this.selectObject, this);
				this.addChild(object);
				object.setPosition(positions[i][0], positions[i][1]);

				this.objects.push(object);
			}
		},
		clearObject: function () {
			for(var i=0;i<this.objects.length;i++){
				this.objects[i].removeFromParent(true);
			}
			this.objects.length = 0;
		},
		selectObject: function (obj) {
			if(obj.getValue() == 1) {
				this.playRightSound();
				obj.setSelectStatus(true);
			}else{
				this.playWrongSound();
				obj.wrong();
			}
		}
	});

	var GameObject = cc.Sprite.extend({
		data: null,
		isSelected: false,
		ctor: function (data, callback, target) {
			this.data = data;
			this._super(data.imgs[0]);

			var self = this;
			addEvent(function(){
				if(self.isSelected) return;
				callback.call(target, self);
			},this);
		},
		setSelectStatus: function (bool) {
			this.isSelected = bool;
			this.setTexture(this.data.imgs[bool == true ? 1 : 0]);
		},
		getValue: function () {
			return this.data.value;
		},
		wrong: function () {
			var x = this.x;
			var y = this.y;
			var moveLeft = cc.moveTo(.2, cc.p(x - 20, y));
			var moveRight = cc.moveTo(.2, cc.p(x + 20, y));
			var moveBack = cc.moveTo(.1, cc.p(x, y));
			this.runAction(cc.sequence(moveLeft, moveRight, moveBack));
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
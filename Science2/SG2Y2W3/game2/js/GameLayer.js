;(function () {
	var GameLayer = ScienceGameBaseLayer.extend({
			objects: [],
			ctor: function () {
				this._super();
			},
			onEnter: function () {
				this._super();

				this.initUI({
					bg: resGame.bg_png
				});
				this.initGameIntro({
					title: resGame.title_png,
					titleSound: resGame.title_mp3,
					introSound: resGame.intro_mp3,
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
				cc.spriteFrameCache.addSpriteFrames(resGame.bee_plist);
				cc.spriteFrameCache.addSpriteFrames(resGame.zb_plist);
				var mapObjects = [
					{
						imgs: [resGame.map0_png],
						value: 0
					},
					{
						imgs: [resGame.map1_png],
						value: 1
					}
				];
				var beeObjects = [
					{
						imgs: [ "#beefly2.png", "#bee2.png","#beefly1.png", "#bee1.png"],
						value: 0
					}
				];
				var allRoadObjects = [
					{
						imgs: ["#time1.png", "12.png"],
						value: 1
					},
					{
						imgs: ["#time2.png", "22.png"],
						value: 2
					},
					{
						imgs: ["#time3.png", "32.png"],
						value: 3
					},
					{
						imgs: ["#time4.png", "42.png"],
						value: 4
					},
					{
						imgs: ["#time5.png", "52.png"],
						value: 5
					},
					{
						imgs: ["#time6.png", "62.png"],
						value: 6
					},
					{
						imgs: ["#time7.png", "72.png"],
						value: 7
					},
					{
						imgs: ["#time8.png", "82.png"],
						value: 8
					},
					{
						imgs: ["#time9.png", "92.png"],
						value: 9
					}, {
						imgs: ["#time10.png", "102.png"],
						value: 10
					},
					{
						imgs: ["#time11.png", "112.png"],
						value: 11
					},
					{
						imgs: ["#time12.png", "122.png"],
						value: 12
					},
					{
						imgs: ["#time13.png", "time13.png"],
						value: 13
					}
				];
				mapObjects.splice(Math.floor(Math.random() * mapObjects.length), 1);
				this.allObjects = mapObjects.concat(allRoadObjects);
				this.beesObjects = beeObjects;
			},
			initObjects: function () {
				this.clearObject();
				this.index = 1;
				var positions1 = [
					[640, 360],
					[321, 515],
					[433, 515],
					[377, 413],
					[493, 413],
					[610, 419],
					[730, 423],
					[795, 320],
					[740, 220],
					[620, 215],
					[500, 210],
					[560, 115],
					[680, 120],
					[800, 127]
				];
				var positions2 = [
					[640, 280],
					[345, 182],
					[295, 80],
					[405, 80],
					[465, 181],
					[576, 181],
					[520, 80],
					[635, 80],
					[690, 182],
					[809, 185],
					[750, 280],
					[700, 382],
					[642, 480],
					[585, 590]
				];
				var beeObject = new GameObject(this.beesObjects[0], this.selectObject, this);
				this.bee = beeObject;
				this.addChild(beeObject, 100);
				if(this.allObjects[0].value == 1)beeObject.setPosition(221, 515);
				else{beeObject.setPosition(230, 185)}
				beeObject.isSelected = true;
				this.onActionRight(beeObject);
				this.objects.push(beeObject);
				for (var i = 0; i < this.allObjects.length; i++) {
					var object = new GameObject(this.allObjects[i], this.selectObject, this);
					this.addChild(object);
					if(this.allObjects[0].value == 1)object.setPosition(positions1[i][0], positions1[i][1]);
					else{object.setPosition(positions2[i][0], positions2[i][1]);}
					object.setScale(0.8, 0.8);
					this.objects.push(object);
					if (i == 13){
						object.setScale(0.7, 0.7);
						object.isSelected = true;
						this.endPoint = object.getPosition();
					}
				}
			},
			clearObject: function () {
				for (var i = 0; i < this.objects.length; i++) {
					this.objects[i].removeFromParent(true);
				}
				this.objects.length = 0;
			},
			selectObject: function (obj) {
				if (obj.getValue() == this.index) {
					obj.setSelectStatus(true);
					var act = cc.moveTo(0.3, obj.getPosition());
					if(this.bee.getPositionX()>obj.getPositionX())this.onActionLeft(this.bee);
					else{this.onActionRight(this.bee)}
					this.objects[0].runAction(cc.sequence(cc.DelayTime.create(0.3), act));

					if (this.index == 12) {
						this.objects[0].runAction(cc.sequence(
							cc.DelayTime.create(0.8),
							cc.moveTo(0.3, this.endPoint)
						));
						this.scheduleOnce(function(){this.onEncourageCallback();},1.3);
					}
					else {
						this.playRightSound();
						if (this.index < 13)this.index++;
						else {
							this.index = 1
						}
					}
				} else {
					this.playWrongSound();
				}
			},
			onActionRight: function (obj) {
				if (this.isPlayingL = true) {
					obj.stopAllActions();
					this.isPlayingL = false;
				}
				var animation = new cc.Animation();
				for (var i = 0; i < 2; i++) {
					var frameName = obj.data.imgs[i].slice(1, obj.data.imgs[i].length);
					var spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName);
					animation.addSpriteFrame(spriteFrame);
				}
				animation.setDelayPerUnit(0.4);
				animation.setRestoreOriginalFrame(true);
				var action = cc.animate(animation);
				obj.runAction(cc.repeatForever(action));
					this.isPlayingR = true;
			},
			onActionLeft: function (obj) {
				if (this.isPlayingR = true){
					obj.stopAllActions();
					this.isPlayingR = false;
				}
				var animation = new cc.Animation();
				for (var i = 2; i < 4; i++) {
					var frameName = obj.data.imgs[i].slice(1, obj.data.imgs[i].length);
					var spriteFrame = cc.spriteFrameCache.getSpriteFrame(frameName);
					animation.addSpriteFrame(spriteFrame);
				}
				animation.setDelayPerUnit(0.4);
				animation.setRestoreOriginalFrame(true);
				var action = cc.animate(animation);
				obj.runAction(cc.repeatForever(action));
				this.isPlayingL = true;
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
			this.setSpriteFrame(this.data.imgs[1]);
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
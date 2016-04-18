;(function () {
	var GameLayer = ScienceGameBaseLayer.extend({
			objects: [],
			ctor: function () {
				this._super();
			},
			onEnter: function () {
				this._super();

				this.initUI({
					bg: resGame.bg1_png
				});
				this.initGameIntro({
					title: resGame.title_png,
					titleSound: resGame.title_mp3,
					introSound: resGame.intro_mp3,
					delayTime: 10000,
					callback: function () {
						playEffect(resGame.word_mp3[this.gender+this.rightval-1]);
					}
				});
				this.objects = [];
				this.initGame();
			},
			onRefreshCallback: function () {
				var bgObjects = [
					{
						imgs: [resGame.bg1_png]
					},
					{
						imgs: [resGame.bg2_png]
					},
					{
						imgs: [resGame.bg3_png]
					}
				];
				this.initUI({
					bg: bgObjects[Math.floor(Math.random()*bgObjects.length)].imgs[0]
				});
				this._super();
				this.initGame();
				playEffect(resGame.word_mp3[this.gender+this.rightval-1]);
			},
			initGame: function () {
				this.initGameData();
				this.initObjects();
			},
			initGameData: function () {
				var wordObjects = [
					{
						imgs: [resGame.word1_png],
						value: 1
					},
					{
						imgs: [resGame.word2_png],
						value: 2
					},
					{
						imgs: [resGame.word3_png],
						value: 3
					}
				];
				var personObjects = [
					{
						imgs: [resGame.person1_png],
						gender:0
					},
					{
						imgs: [resGame.person2_png],
						gender:0
					},
					{
						imgs: [resGame.person3_png],
						gender:0
					},
					{
						imgs: [resGame.person4_png],
						gender:3
					},
					{
						imgs: [resGame.person5_png],
						gender:3
					},
					{
						imgs: [resGame.person6_png],
						gender:3
					}
				];
				var s1Objects = [
					{
						imgs: [resGame.s1_1_png],
						value: 1
					},
					{
						imgs: [resGame.s1_2_png],
						value: 1
					},
					{
						imgs: [resGame.s1_3_png],
						value: 1
					},
					{
						imgs: [resGame.s1_4_png],
						value: 1
					},
					{
						imgs: [resGame.s1_5_png],
						value: 1
					},
					{
						imgs: [resGame.s1_6_png],
						value: 1
					},
					{
						imgs: [resGame.s1_7_png],
						value: 1
					},
					{
						imgs: [resGame.s1_8_png],
						value: 1
					},
					{
						imgs: [resGame.s1_9_png],
						value: 1
					},
					{
						imgs: [resGame.s1_10_png],
						value: 1
					},
					{
						imgs: [resGame.s1_11_png],
						value: 1
					}
				];
				var s2Objects = [
					{
						imgs: [resGame.s2_1_png],
						value: 2
					},
					{
						imgs: [resGame.s2_2_png],
						value: 2
					},
					{
						imgs: [resGame.s2_3_png],
						value: 2
					},
					{
						imgs: [resGame.s2_4_png],
						value: 2
					},
					{
						imgs: [resGame.s2_5_png],
						value: 2
					},
					{
						imgs: [resGame.s2_6_png],
						value: 2
					},
					{
						imgs: [resGame.s2_7_png],
						value: 2
					},
					{
						imgs: [resGame.s2_8_png],
						value: 2
					}
				];
				var s3Objects = [
					{
						imgs: [resGame.s3_1_png],
						value: 3
					},
					{
						imgs: [resGame.s3_2_png],
						value: 3
					},
					{
						imgs: [resGame.s3_3_png],
						value: 3
					},
					{
						imgs: [resGame.s3_4_png],
						value: 3
					},
					{
						imgs: [resGame.s3_5_png],
						value: 3
					},
					{
						imgs: [resGame.s3_6_png],
						value: 3
					},
					{
						imgs: [resGame.s3_7_png],
						value: 3
					}
				];

				this.wordObj = wordObjects[Math.floor(Math.random()*wordObjects.length)];
				this.personObj = personObjects[Math.floor(Math.random()*personObjects.length)];
				this.s1Obj = s1Objects[Math.floor(Math.random()*s1Objects.length)];
				this.s2Obj = s2Objects[Math.floor(Math.random()*s2Objects.length)];
				this.s3Obj = s3Objects[Math.floor(Math.random()*s3Objects.length)];
				this.obj = [];
				this.obj.push(this.wordObj);
				this.obj.push(this.personObj);
				this.obj.push(this.s1Obj);
				this.obj.push(this.s2Obj);
				this.obj.push(this.s3Obj);
			},
			initObjects: function () {
				this.clearObject();
				var positions = [
					[450, 600],
					[640, 420],
					[350, 100],
					[650, 100],
					[950, 100]
				];
				this.rightval = this.wordObj.value;
				this.gender = this.personObj.gender;
				for (var i = 0; i < this.obj.length; i++) {
					var object = new GameObject(this.obj[i], this.selectObject, this);
					this.addChild(object);
					this.objects.push(object);
					object.setPosition(positions[i][0], positions[i][1]);
				}
				this.objects[0].setSelectStatus(true);
				this.objects[1].setSelectStatus(true);

			},
			clearObject: function () {
				for (var i = 0; i < this.objects.length; i++) {
					this.objects[i].removeFromParent(true);
				}
				this.objects.length = 0;
			},
			selectObject: function (obj) {
				if (obj.getValue() == this.rightval) {
					obj.setSelectStatus(true);
					playEffect(resGame.right_mp3[this.gender+this.rightval-1])
				} else {
					playEffect(resGame.wrong_mp3[this.gender]);
					obj.wrong()
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
;(function () {
	var DiscoveryLayer = DiscoveryBaseLayer.extend({
		ctor: function () {
			this._super();
		},
		onEnter: function () {
			this._super();

			var config = {
				title: resDiscovery.title_png,
				video: {
					keyPoints: [
	                    {
	                        value: 10,
	                        layer: new Layer1()
	                    },
	                    {
	                        value: 50,
	                        layer: new Layer2()
	                    },
	                    {
	                        value: 100,
	                        layer: new Layer3()
	                    },
	                    {
	                        value: 120,
	                        layer: null,
	                        pause: false
	                    },
	                    {
	                        value: 140,
	                        layer: new Layer3()
	                    },
	                    {
	                        value: 160,
	                        layer: null,
	                        pause: false
	                    },
	                    {
	                        value: 180,
	                        layer: new Layer3()
	                    }
	                ],
	                mediaUrl: resDiscoveryOther.video_mp4
				}
			};

			this.initConfig(config);


		},
		onCloseCallback: function () {
			this._super();
			cacheConfig = [
				true, true, true, true
			];
		},
		onRefreshCallback: function () {
			this._super();
			cacheConfig = [
				true, true, true, true
			];
		},
		prevPage: function () {
			this._super();
			this.gotoAndPlay(0);
		},
		nextPage: function () {
			this._super();
			this.gotoAndPlay(130);
		}
	});

	var Layer1 = DiscoveryPopupLayer.extend({
		texts: [],
		animals: [],
		initContent: function () {
			this._super();

			this.initData();

			this.initObjects();

		},
		refresh: function () {
			this._super();
			
			this.initContent();
		},
		initData: function () {
			var allAnimals = [
				{
					name: '猴子',
					type: 'monkey'
				},
				{
					name: '兔子',
					type: 'rabbit'
				},
				{
					name: '小猪',
					type: 'pig'
				},
				{
					name: '刺猬',
					type: 'hedgepig'
				},
				{
					name: '大象',
					type: 'elephant'
				},
				{
					name: '狐狸',
					type: 'fox'
				},
				{
					name: '老鼠',
					type: 'mouse'
				}
			];

			this.currentAnimals = [];

			var animalNum = 4;

			while(this.currentAnimals.length<=animalNum){
				this.currentAnimals.push(allAnimals.splice(Math.floor(Math.random()*allAnimals.length), 1)[0]);
			}
		},
		initObjects: function () {
			for(var m=0;m<this.texts.length;m++){
				this.texts[m].removeFromParent(true);
			}
			this.texts.length = 0;

			for(var n=0;n<this.animals.length;n++){
				this.animals[n].removeFromParent(true);
			}
			this.animals.length = 0;

			this.texts = [];
			this.animals = [];

			for(var i=0;i<this.currentAnimals.length;i++){
				var animal = new Animal(this.currentAnimals[i].type, this);
				this.addChild(animal);

				animal.anchorY = 0;
				animal.setInitPosition(700 + i * 110, 40);

				this.animals.push(animal);

				var text = new TextField(this.currentAnimals[i].name, 40);
				this.addChild(text);
				this.texts.push(text);
				text.animalType = this.currentAnimals[i].type;
				text.setPosition(200 + i * 200, 650);
			}

			if(!this.introText) {
				this.introText = new TextField("将小动物拖到对应的名字上", 35);
				this.addChild(this.introText);
				this.introText.setPosition(250, cc.winSize.height - 30);
			}

			if(!this.tipText) {
				this.tipText = new TextField("↑\n戳\n我", 35);
				this.addChild(this.tipText);
				this.tipText.setPosition(cc.winSize.width - 136, 580);
			}
		},
		match: function (target) {
			var isMatch = false;
			var targetRect = target.getBoundingBox();
			var tempRect;
			var matchObj;
			for(var i=0;i<this.texts.length;i++){
				tempRect = this.texts[i].getBoundingBox();
				if(cc.rectContainsRect(targetRect, tempRect) && target.getType() == this.texts[i].animalType){
					isMatch = true;
					matchObj = this.texts[i];
					break;
				}
			}
			if(isMatch) {
				target.matched(matchObj);
				this.checkIsComplete();
			}else{
				target.back();
			}
		},
		checkIsComplete: function () {
			var isComplete = true;
			for(var i=0;i<this.animals.length;i++){
				if(!this.animals[i].isMatched) {
					isComplete = false;
					break;
				}
			}
			if(isComplete){
				alert("all is complete. well done.");
				this.close();
			}
		}
	});

	var Layer2 = DiscoveryPopupLayer.extend({
		prints: [],
		initContent: function () {
			this._super();

			var winSize = cc.winSize;
			this.initData();
			this.initObjects();

		},
		initData: function(){
			var allPrints = ["1","2","3","4","5","6"];
			this.selectPrint = allPrints.splice(Math.floor(Math.random()*allPrints.length), 1)[0];
			this.wrongPrints = [];
			this.wrongPrints.push(allPrints.splice(Math.floor(Math.random()*allPrints.length), 1)[0]);
			this.wrongPrints.push(allPrints.splice(Math.floor(Math.random()*allPrints.length), 1)[0]);

			this.allColorPrints = {
				"1": resDiscovery.food1_png,
				"2": resDiscovery.food2_png,
				"3": resDiscovery.food3_png,
				"4": resDiscovery.food4_png,
				"5": resDiscovery.food5_png,
				"6": resDiscovery.food6_png
			}

		},
		initObjects: function () {
			if(!this.selectColorPrint) {
				this.selectColorPrint = new cc.Sprite(this.allColorPrints[this.selectPrint]);
				this.addChild(this.selectColorPrint);
				this.selectColorPrint.setPosition(200, 450);
			}else{
				this.selectColorPrint.initWithFile(this.allColorPrints[this.selectPrint]);
				this.selectColorPrint.setPosition(200, 450);
			}

			if(!this.introText){
				this.introText = new TextField("请选择正确的指纹", 40);
				this.addChild(this.introText);
				this.introText.setPosition(250, cc.winSize.height - 50);
			}

			if(!this.tipText) {
				this.tipText = new TextField("↑\n戳\n我", 35);
				this.addChild(this.tipText);
				this.tipText.setPosition(cc.winSize.width - 136, 580);
			}

			for(var j=0;j<this.prints.length;j++){
				this.prints[j].removeFromParent(true);
			}

			var objects = [];
			objects.push(this.selectPrint);
			objects.push(this.wrongPrints[0]);
			objects.push(this.wrongPrints[1]);
			objects.sort(function () {
				return Math.random() > .5;
			});
			for(var i=0;i<objects.length;i++){
				var fingerPrint = new FingerPrint(objects[i], this.selectFingerPrint, this);
				this.addChild(fingerPrint);
				fingerPrint.setPosition(600 + i * 200, 450);
				this.prints.push(fingerPrint);
			}

		},
		selectFingerPrint: function (print) {
			if(print.printId == this.selectPrint) {
				alert("门开了, 正在播放开门动画...");
				this.close();
			}else {
				alert("错误");
			}
		},
		refresh: function () {
			this.initContent();
		}
	});

	var cacheConfig = [
		true, true, true, true
	];

	var Layer3 = DiscoveryPopupLayer.extend({
		initContent: function () {
			this._super();
			if(this.checkIsComplete()){
				alert("all complete! well done.");
				this.close();
				return;
			}

			var dolls = [
				resDiscovery.doll1_png,
				resDiscovery.doll2_png,
				resDiscovery.doll3_png,
				resDiscovery.doll4_png
			];

			this.dolls = [];

			this.keys = [120, 160, 170, 150];

			for(var i=0;i<dolls.length;i++){
				var doll = new Doll(dolls[i], this.selectDoll, this);
				this.addChild(doll);
				doll.setPosition(400 + i* 150, 0);
				this.dolls.push(doll);

				doll.runAction(cc.sequence(cc.delayTime(i*.1), cc.moveTo(.2, cc.p(400 + i* 150, 200))));
			}

		},
		selectDoll: function (doll) {
			var idx = this.dolls.indexOf(doll);
			// console.log("skip",idx, cacheConfig[idx]);
			if(!cacheConfig[idx]) return;
			this.close();
			for(var i=0;i<this.dolls.length;i++){
				this.dolls[i].removeFromParent(true);
			}
			cacheConfig[idx] = false;
			this.skipTo(this.keys[idx]);
		},
		checkIsComplete: function () {
			var isComplete = true;
			for(var i=0;i<cacheConfig.length;i++){
				if(cacheConfig[i]) {
					isComplete = false;
					break;
				}
			}
			return isComplete;
		}
	});

	var Animal = cc.Sprite.extend({
		_type: null,
		isMatched: false,
		initX: 0,
		initY: 0,
		targetLayer: null,
		ctor: function (type, targetLayer) {
			this.textures = {
				"monkey": resDiscovery.animal1_png,
				"rabbit": resDiscovery.animal2_png,
				"pig": resDiscovery.animal3_png,
				"hedgepig": resDiscovery.animal4_png,
				"elephant": resDiscovery.animal5_png,
				"fox": resDiscovery.animal6_png,
				"mouse": resDiscovery.animal7_png
			};
			this._type = type;
			this.targetLayer = targetLayer;
			this._super(this.textures[type]);

			this.addEventListeners();
		},
		getType: function (){
			return this._type;
		},
		setInitPosition: function (x, y) {
			this.initX = x;
			this.initY = y;
			this.setPosition(x, y);
		},
		back: function () {
			this.setPosition(this.initX, this.initY);
		},
		matched: function (obj) {
			this.isMatched = true;
			this.setPosition(obj.x, obj.y - 350);
		},
		addEventListeners: function () {
			var touchListener = cc.EventListener.create({
		        event: cc.EventListener.TOUCH_ONE_BY_ONE,
		        onTouchBegan: function (touch, event) {
		            var pos = touch.getLocation();
		            var target = event.getCurrentTarget();

		            if (target.visible && cc.rectContainsPoint(target.getBoundingBoxToWorld(), pos)) {
		            	if(target.isMatched) return false;

		            	event.stopPropagation();
		                return true;
		            }
		            return false;
		        },
		        onTouchMoved: function (touch, event) {
		        	var target = event.getCurrentTarget();
	                var delta = touch.getDelta();
	                target.x += delta.x;
	                target.y += delta.y;
		        },
		        onTouchEnded: function (touch, event) {
		        	var pos = touch.getLocation();
		            var target = event.getCurrentTarget();
		            target.targetLayer.match(target);
		        }
		    });

		    cc.eventManager.addListener(touchListener, this);
		}
	});

	var FingerPrint = cc.Sprite.extend({
		printId: null,
		ctor: function (printId, callback, target) {
			var types = {
				"1": resDiscovery.food1_1_png,
				"2": resDiscovery.food2_1_png,
				"3": resDiscovery.food3_1_png,
				"4": resDiscovery.food4_1_png,
				"5": resDiscovery.food5_1_png,
				"6": resDiscovery.food6_1_png
			};
			this.printId = printId;
			this._super(types[printId]);

			var self = this;
			addEvent(function(){
				callback.call(target, self);
			}, this);
		}
	});

	var Doll = cc.Sprite.extend({
		ctor: function (texture, callback, target) {
			this._super(texture);

			var self = this;
			addEvent(function () {
				callback.call(target, self);
			}, this);
		}
	});

	var DiscoveryScene = BaseScene.extend({
		run: function(){
			var layer = new DiscoveryLayer();
	        this.addChild(layer);
	        runScene(this);
		}
	});

	window.DiscoveryLayer = DiscoveryLayer;
	window.DiscoveryScene = DiscoveryScene;
})();
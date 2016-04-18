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
	                        value: 23.8,
	                        layer: new Layer1()
	                    },
	                    {
	                        value: 31,
							layer: new Layer2()
	                    },
	                    {
	                        value: 38,
							layer: new Layer3()
	                    },
	                    {
	                        value: 48.9,
							layer: new Layer4()
	                    },
						{
							value: 54.5,
							layer: new Layer5()
						},
						{
							value: 58.3,
							layer: new Layer6()
						}
	                ],
	                mediaUrl: resDiscoveryOther.video_mp4
				}
			};

			this.initConfig(config);
			this.prevBtn.visible = !1;
			this.nextBtn.visible = !1;

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
		}
	});

	var Layer1 = DiscoveryPopupLayer.extend({
		objects: [],
		initContent: function () {
			this._super();

			this.initData();
			this.setRefreshButtonVisible(false);
			this.targetLayer.hideNavButton();
			this.initObjects(0);

		},
		refresh: function () {
			this._super();
			
			this.initContent();
		},
		initData: function () {
			var allObjects = [
				{
					imgs: [resDiscovery.pic1_selected_png],
					value: 1
				},
				{
					imgs: [resDiscovery.pic2_selected_png],
					value: 1
				},
				{
					imgs: [resDiscovery.pic3_selected_png],
					value: 1
				},
				{
					imgs: [resDiscovery.pic4_selected_png],
					value: 1
				},
				{
					imgs: [resDiscovery.pic5_selected_png],
					value: 1
				}
			];

			this.allObjs = allObjects;
		},
		initObjects: function (i) {
			this.clearObject();

			var positions = [
				[50, 540],
				[170, 540],
				[50, 370],
				[170, 370],
				[100, 180]
			];

			var object = new GameObject(this.allObjs[i], this.selectObject, this);
			this.addChild(object);
			object.setPosition(positions[i][0], positions[i][1]);

			this.objects.push(object);
		},
		clearObject: function () {
			for(var i=0;i<this.objects.length;i++){
				this.objects[i].removeFromParent(true);
			}
			this.objects.length = 0;
		},
		selectObject: function (obj) {
			obj.setSelectStatus(true);
			this.targetLayer.resumePlay();
		}

	});

	var Layer2 = Layer1.extend({
		objects: [],
		initContent: function () {
			this._super();

			this.initObjects(1);
		}
	});
	var Layer3 = Layer1.extend({
		objects: [],
		initContent: function () {
			this._super();

			this.initObjects(2);
		}
	});
	var Layer4 = Layer1.extend({
		objects: [],
		initContent: function () {
			this._super();

			this.initObjects(3);
		}
	});
	var Layer5 = Layer1.extend({
		objects: [],
		initContent: function () {
			this._super();

			this.initObjects(4);
		}
	});
	var Layer6 = DiscoveryPopupLayer.extend({
		objects: [],
		number: "",
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
			var allObjects = [
				{
					imgs: [resDiscovery.num_png],
					value: 1
				},
				{
					imgs: [resDiscovery.num_png],
					value: 2
				},
				{
					imgs: [resDiscovery.num_png],
					value: 3
				},
				{
					imgs: [resDiscovery.num_png],
					value: 4
				},
				{
					imgs: [resDiscovery.num_png],
					value: 5
				},
				{
					imgs: [resDiscovery.num_png],
					value: 6
				},
				{
					imgs: [resDiscovery.num_png],
					value: 7
				},
				{
					imgs: [resDiscovery.num_png],
					value: 8
				},
				{
					imgs: [resDiscovery.num_png],
					value: 9
				},
				{
					imgs: [resDiscovery.num_png],
					value: 0
				},
				{
					imgs: [resDiscovery.submit_png],
					value: 10
				},
				{
					imgs: [resDiscovery.delete_png],
					value: 11
				}
			];

			this.allObjs = allObjects;
		},
		initObjects: function (i) {
			this.clearObject();
			this.number = [];
			var positions = [
				[440, 402],
				[525, 402],
				[610, 402],
				[440, 360],
				[525, 360],
				[610, 360],
				[440, 311],
				[525, 311],
				[610, 311],
				[525, 266],
				[525, 194],
				[600, 130]
			];
			for(var i=0;i<this.allObjs.length;i++){
				var object = new GameObject(this.allObjs[i], this.selectObject, this);
				object.setScale(1.1,1.2);
				this.addChild(object);
				object.setPosition(positions[i][0], positions[i][1]);
				this.objects.push(object);
			}
			this.tipText = new TextField("", 50);
			this.tipText.setFontFillColor(cc.color.WHITE);
			this.tipText.setPosition(cc.p(525,550));
			this.addChild(this.tipText);
			this.objects.push(this.tipText);
		},
		clearObject: function () {
			for(var i=0;i<this.objects.length;i++){
				this.objects[i].removeFromParent(true);
			}
			this.objects.length = 0;
		},
		selectObject: function (obj) {
			if(obj.getValue() ==11) {
				this.number = this.number.slice(0,this.number.length-1);
				this.tipText.setString(this.number);
			}
			if(obj.getValue() ==10) {
				if(this.number=="120"){
					this.clearObject();
					this.targetLayer.resumePlay();
				}
				if(this.number!="120"){
				playEffect(resDiscoveryOther.effect_mp3);
				}
			}
			if(obj.getValue() !=10 &&obj.getValue() !=11) {
				this.number += obj.getValue();
				this.tipText.setString(this.number);
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
;(function () {
	function t(t, e, s, o, r) {
		if (Math.abs(t.x - s.x) < r && Math.abs(t.y - s.y) < r)return !0;
		if (Math.abs(e.x - o.x) < r && Math.abs(e.y - o.y) < r)return !0;
		var i = (t.x - s.x) * (e.y - s.y) - (t.y - s.y) * (e.x - s.x), n = (t.x - o.x) * (e.y - o.y) - (t.y - o.y) * (e.x - o.x);
		if (i * n >= 0)return !1;
		var a = (s.x - t.x) * (o.y - t.y) - (s.y - t.y) * (o.x - t.x), h = a + i - n;
		return a * h >= 0 ? !1 : !0
	}

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
			this.objects1 = [];
			this.objects2 = [];
			this.WriteObjects =[];
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
			cc.spriteFrameCache.addSpriteFrames(resGame.sucai_plist);
			cc.spriteFrameCache.addSpriteFrames(resGame.erdongwu_plist);
			cc.spriteFrameCache.addSpriteFrames(resGame.xiayiye_plist);
			var allBlankObjects = [
				{
					imgs: ["#k01.png"],
					audios: 0
				},
				{
					imgs: ["#k02.png"],
					audios: 0
				},
				{
					imgs: ["#k03.png"],
					audios: 0
				},
				{
					imgs: ["#k04.png"],
					audios: 0
				},
				{
					imgs: ["#k05.png"],
					audios: 0
				},
				{
					imgs: ["#k06.png"],
					audios: 0
				},
				{
					imgs: ["#k07.png"],
					audios: 0
				},
				{
					imgs: ["#k08.png"],
					audios: 0
				}
			];

			var allCarObjects = [
				{
					imgs: ["#w01.png"],
					audios: resGame.xiaoji_mp3
				},
				{
					imgs: ["#w02.png"],
					audios: resGame.xiaogou_mp3
				},
				{
					imgs: ["#w03.png"],
					audios: resGame.xiaozhu_mp3
				},
				{
					imgs: ["#w04.png"],
					audios: resGame.xiaomao_mp3
				},
				{
					imgs: ["#w05.png"],
					audios: resGame.xiaoyang_mp3
				},
				{
					imgs: ["#w06.png"],
					audios: resGame.houzi_mp3
				},
				{
					imgs: ["#w07.png"],
					audios: resGame.tuzi_mp3
				},
				{
					imgs: ["#w08.png"],
					audios: resGame.laoshu_mp3
				}
			];


			var xiayiye = [
				{
					imgs: ["#xiayiye.png", "xiayiye2.png"],
					audios: 1
				}
			];

			var othersObjects = [
				{
					imgs: ["#bi.png"],
					audios: 2
				},
				{
					imgs: ["#ca.png"],
					audios: 3
				}
			];

			var allDragObjects = [
				{
					imgs: ["#dongwu0001.png"],
				},
				{
					imgs: ["#dongwu0002.png"],
				},
				{
					imgs: ["#dongwu0003.png"],
				},
				{
					imgs: ["#dongwu0004.png"],
				},
				{
					imgs: ["#dongwu0005.png"],
				},
				{
					imgs: ["#dongwu0006.png"],
				},
				{
					imgs: ["#dongwu0007.png"],
				},
				{
					imgs: ["#dongwu0008.png"],
				}
			];
			var positions = [
				[70, 215],
				[230, 215],
				[395, 215],
				[560, 215],
				[725, 215],
				[885, 215],
				[1045, 215],
				[1200, 215]
			];
			positions.sort(function(){
				return Math.random() > .5;
			});
			this.carObjects = allCarObjects;
			this.blankObjects = allBlankObjects;
			this.othersObject = othersObjects;
			this.dragObjects = allDragObjects;
			this.nextPageObject = xiayiye;
			this.position = positions;
		},
		initObjects: function () {
			this.clearObject(this.objects);
			this.clearObject(this.objects1);
			this.clearObject(this.objects2);
			var positions1 = [
				[580,60],
				[800, 60]
			];
			var positions = this.position;
			var nextPage = new GameObject(this.nextPageObject[0],this.selectObject,this);
			var prePage = new GameObject(this.nextPageObject[0],this.selectObject,this);
			this.addChild(nextPage);
			this.nextPage = nextPage;
			prePage._rotationX = (180);
			this.prePage = prePage;
			prePage.setSelectStatus(true);
			this.addChild(prePage);
			nextPage.setPosition(1180, 60);
			prePage.setPosition(1100, 60);
			for(var i=0;i<this.carObjects.length;i++){
				var object = new GameObject(this.carObjects[i], this.selectObject, this);
				this.addChild(object,100);
				object.setPosition(positions[i][0], positions[i][1]);
				this.objects.push(object);
				this.objects1.push(object);
			}
			for(var k=0;k<this.blankObjects.length;k++){
				var object1 = new GameObject(this.blankObjects[k],this.selectObject, this);
				this.addChild(object1);
				object1.setPosition(positions[k][0], positions[k][1]+120);
				this.objects.push(object1);
				this.objects1.push(object1);
			}
			for(var j=0;j<this.blankObjects.length;j++){
				var wObject = new WriteObject();
				wObject.init();
				this.addChild(wObject);
				wObject.setPosition(positions[j][0]-50, positions[j][1]+90);
				this.objects.push(wObject);
				this.WriteObjects.push(wObject);
				this.objects1.push(wObject);
			}
			for(var n=0;n<this.othersObject.length;n++){
				var others = new GameObject(this.othersObject[n], this.selectObject, this);
				this.addChild(others);
				others.setPosition(positions1[n][0], positions1[n][1]);
				this.objects.push(others);
				this.objects1.push(others);
			}
			this.prePage.setSelectStatus(true);
			for(var m=0;m<this.dragObjects.length;m++){
				var object2 = new DargObject(this.dragObjects[m],m,this.dragObjects);
				this.addChild(object2);
				object2.visible = false;
				object2.setPosition(positions[m][0],positions[m][1]);
				this.objects.push(object2);
				this.objects2.push(object2);
			}
		},

		clearObject: function (arr) {
			for(var i=0;i<arr.length;i++){
				arr[i].removeFromParent(true);
			}
			arr.length = 0;
		},
		gotoPage2: function (){
			for(var i=0;i<this.objects1.length;i++){
				this.objects1[i].visible = false;
			}
			for(var i=0;i<this.objects2.length;i++){
				this.objects2[i].visible = true;
			}
		},
		gotoPage1: function (){
			for(var i=0;i<this.objects2.length;i++){
				this.objects2[i].visible = false;
			}
			for(var i=0;i<this.objects1.length;i++){
				this.objects1[i].visible = true;
			}
		},
		selectObject: function (obj) {
			if(obj.getAudio() == 1){

				if(obj._rotationX == 0) {
					this.gotoPage2();
					obj.setSelectStatus(true);
					this.prePage.setSelectStatus(false);
				}
				else{
					this.gotoPage1();
					obj.setSelectStatus(true);
					this.nextPage.setSelectStatus(false);
				}
			}
			else if(obj.getAudio() == 2) {
				for(var i=0; i<this.WriteObjects.length; i++){
					this.WriteObjects[i].setBrushState();
				}
			}
			else if(obj.getAudio() == 3) {
				for(var i=0; i<this.WriteObjects.length; i++){
					this.WriteObjects[i].setEraserState();
				}
			}
			else {
				cc.audioEngine.stopAllEffects();
				playEffect(obj.getAudio());
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
			if(this.data.audios == 0)return;
			addEvent(function(){
				if(self.isSelected) return;
				callback.call(target, self);
			},this);
		},
		setSelectStatus: function (bool) {
			this.isSelected = bool;
			this.setSpriteFrame(bool?this.data.imgs[1]:this.data.imgs[0].slice(1,12));
		},
		getAudio: function () {
			return this.data.audios;
		}
	});

	var DargObject = cc.Sprite.extend({
		ctor: function(data){
			this.data = data;
			this._super(data.imgs[0]);

			this.addEventListeners();
		},
		addEventListeners: function () {
			var touchListener = cc.EventListener.create({
				event: cc.EventListener.TOUCH_ONE_BY_ONE,
				onTouchBegan: function (touch, event) {
					var pos = touch.getLocation();
					var target = event.getCurrentTarget();
					if (cc.rectContainsPoint(target.getBoundingBoxToWorld(), pos)) {
						event.stopPropagation();
						return true;
					}
					return false;
				},
				onTouchMoved: function (touch, event) {
					var target = event.getCurrentTarget();
					var delta = touch.getDelta();
					if(target.visible) {
						target.x += delta.x;
						target.y += delta.y;
					}
				},
				onTouchEnded: function (touch, event) {
					var pos = touch.getLocation();
					var target = event.getCurrentTarget();
				}
			});

			cc.eventManager.addListener(touchListener, this);
		}
	});

	var WriteObject = cc.Sprite.extend({
		_state_Brush: "brush",
		_state_Eraser: "eraser",
		state: null,
		strokes: [],
		options: {
			width: 100,
			height: 60,
			backgroundColor: "#FFFFFF",
			brushColor: "#ff0000",
			lineWidth: 3,
			isOpacity: !1,
			eraserWidth: 4
		},
		ctor: function (t) {
			cc.extend(this.options, t), this.state = this._state_Brush, this._super(), this.init()
		},
		init: function () {
			this.layer = new cc.LayerColor(cc.color(this.options.backgroundColor), this.options.width, this.options.height), this.addChild(this.layer), this.options.isOpacity && (this.layer.opacity = 0), this.drawNode = new cc.DrawNode, this.addChild(this.drawNode), this.drawNode.setDrawColor(cc.color(this.options.brushColor)), this.drawNode.setLineWidth(this.options.lineWidth), this.eraserNode = new cc.DrawNode, this.addChild(this.eraserNode), this.eraserNode.setDrawColor(cc.color(0, 0, 0, 0)), this.addEvent_layer()
		},
		addEvent_layer: function () {
			var t = this, e = cc.EventListener.create({
				event: cc.EventListener.TOUCH_ONE_BY_ONE,
				swallowTouches: !1,
				onTouchBegan: function (e, s) {
					var o = e.getLocation(), r = s.getCurrentTarget();
					return t.visible && cc.rectContainsPoint(r.getBoundingBoxToWorld(), o) ? (t.beganPos = r.convertToNodeSpace(o), t.strokes.push([]), !0) : !1
				},
				onTouchMoved: function (e, s) {
					var o = e.getLocation();
					!0 && t.brushMoved(o, s.getCurrentTarget())
				},
				onTouchEnded: function (e, s) {
					var o = t.strokes[t.strokes.length - 1];
					0 == o.length ? t.strokes.pop() : t.addToContentList(o)
				}
			});
			cc.eventManager.addListener(e, t.layer)
		},
		brushMoved: function (t, e) {
			if (this.beganPos)if (cc.rectContainsPoint(e.getBoundingBoxToWorld(), t))switch (this.state) {
				case this._state_Brush:
					this.endedPos = e.convertToNodeSpace(t), this.drawNode.drawSegment(this.beganPos, this.endedPos), this.beganPos = this.endedPos, this.strokes[this.strokes.length - 1].push(this.drawNode._buffer[this.drawNode._buffer.length - 1]);
					break;
				case this._state_Eraser:
					this.endedPos = e.convertToNodeSpace(t), this.eraserNode.drawSegment(this.beganPos, this.endedPos), this.beganPos = this.endedPos, this.eraseDrawNode()
			} else this.beganPos = null
		},
		eraseDrawNode: function () {
			var e = this;
			this.eraserNode._buffer.forEach(function (s, o) {
				e.drawNode._buffer.forEach(function (o, r) {
					t(s.verts[0], s.verts[1], o.verts[0], o.verts[1], e.options.eraserWidth) && e.drawNode._buffer.splice(r, 1)
				}), e.eraserNode._buffer.splice(o, 1)
			})
		},
		addToContentList: function (t) {
		},
		setBrushState: function () {
			this.state = this._state_Brush
		},
		setEraserState: function () {
			this.state = this._state_Eraser
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
;(function () {
	var WikiLayer = WikiBaseLayer.extend({
		_introLayer : null,
		ctor: function () {
			this._super();
			this._introLayer = new cc.Layer;
			this.addChild(this._introLayer,3e3);
		},
		onEnter: function () {
			this._super();

			var config = {
				title: resWiki.title_last_png,
				bg: resWiki.bg_png,
				objects: [
					{
						img: resWiki.dragon1_png,
						audio: resWikiOther.dragon1_mp3,
						position: [580, 360],
						items: [
							{
								img: resWiki.dragon1_1_png,
								audio: resWikiOther.dragon1_mp3
							},
							{
								img: resWiki.dragon1_2_png,
								//audio: resWikiOther.dragon1_2_mp3
							},
							{
								img: resWiki.dragon1_3_png,
								//audio: resWikiOther.dragon1_3_mp3
							},
							{
								img: resWiki.dragon1_4_png,
								//audio: resWikiOther.dragon1_4_mp3
							},
							{
								img: resWiki.dragon1_5_png,
								//audio: resWikiOther.dragon1_5_mp3
							},
							{
								img: resWiki.dragon1_6_png,
								//audio: resWikiOther.dragon1_6_mp3
							},
							{
								img: resWiki.dragon1_7_png,
								//audio: resWikiOther.dragon1_5_mp3
							},
							{
								img: resWiki.dragon1_8_png,
								//audio: resWikiOther.dragon1_6_mp3
							}
						]
					},
					{
						img: resWiki.dragon2_png,
						audio: resWikiOther.dragon2_mp3,
						position: [760, 140],
						items: [
							{
								img: resWiki.dragon2_2_png,
								audio: resWikiOther.dragon2_mp3
							}
						]
					},
					{
						img: resWiki.dragon3_png,
						audio: resWikiOther.dragon3_mp3,
						position: [785, 350],
						items: [
							{
								img: resWiki.dragon3_1_png,
								audio: resWikiOther.dragon3_mp3
							},
							{
								img: resWiki.dragon3_2_png,
								//audio: resWikiOther.dragon3_mp3
							},
							{
								img: resWiki.dragon3_3_png,
								//audio: resWikiOther.dragon3_3_mp3
							},
							{
								img: resWiki.dragon3_4_png,
								//audio: resWikiOther.dragon3_4_mp3
							}
						]
					},
					{
						img: resWiki.dragon4_png,
						audio: resWikiOther.dragon4_mp3,
						position: [705, 200],
						items: [
							{
								img: resWiki.dragon4_1_png,
								audio: resWikiOther.dragon4_mp3
							},
							{
								img: resWiki.dragon4_2_png,
								//audio: resWikiOther.dragon3_mp3
							},
							{
								img: resWiki.dragon4_3_png,
								//audio: resWikiOther.dragon3_3_mp3
							},
							{
								img: resWiki.dragon4_4_png,
								//audio: resWikiOther.dragon3_4_mp3
							},
							{
								img: resWiki.dragon4_5_png,
								//audio: resWikiOther.dragon4_mp3
							}
						]
					},
					{
						img: resWiki.dragon5_png,
						audio: resWikiOther.dragon5_mp3,
						position: [800, 250],
						items: [
							{
								img: resWiki.dragon5_2_png,
								audio: resWikiOther.dragon5_mp3
							},
							{
								img: resWiki.dragon5_3_png,
								//audio: resWikiOther.dragon5_3_mp3
							}
						]
					},
					{
						img: resWiki.dragon6_png,
						audio: resWikiOther.dragon6_mp3,
						position: [1150, 350],
						items: [
							{
								img: resWiki.dragon6_2_png,
								audio: resWikiOther.dragon6_mp3
							},
							{
								img: resWiki.dragon6_3_png,
								//audio: resWiki.dragon6_3_mp3
							},
							{
								img: resWiki.dragon6_4_png,
								//audio: resWiki.dragon6_4_mp3
							},
							{
								img: resWiki.dragon6_5_png,
								//audio: resWiki.dragon6_5_mp3
							}
						]
					}
				]
			};
			this.initConfig(config);
			this.initGameIntro({
				title: resWiki.title_png,
				titleSound: resWikiOther.title_mp3,
				introSound: resWikiOther.intro_mp3,
				titleDuration : 3000,
				delayTime: 10000,
				callback: function () {
					var objects = this.getObjects();
					for(var i=0;i<objects.length;i++) {
						var action = cc.repeatForever(cc.sequence(cc.fadeTo(1, 150), cc.fadeTo(.5, 255)));
						objects[i].runAction(action);
					}
				}
			});

		},
		initGameIntro: function (t) {
			var e = new i(t, this);
			this._introLayer.addChild(e)
		},
		enableWikiLayer: function () {
			this._maskLayer && (this._maskLayer.setVisible(!1), this._maskLayer.x = 1e4);
			var t = this.getNavButtonByTag("refresh");
			t && t.setEnabled(!0);
			var e = this.getNavButtonByTag("encourage");
			e && e.setEnabled(!0)
		},
		disableWikiLayer: function () {
			this._maskLayer ? (this._maskLayer.setVisible(!0), this._maskLayer.x = 0) : (this._maskLayer = new n, this.addChild(this._maskLayer, this._MASK_LAYER_ZORDER), this._maskLayer.x = 0, this._maskLayer.y = 0);
			var t = this.getNavButtonByTag("refresh");
			t && t.setEnabled(!1);
			var e = this.getNavButtonByTag("encourage");
			e && e.setEnabled(!1)
		}
	});

	var i = cc.Layer.extend({
		_targetLayer: null, ctor: function (t, e) {
			this._super();
			var i = cc.winSize;
			this.defaultSettings = t, this._targetLayer = e, this._targetLayer.disableWikiLayer(), this.bg = new cc.LayerColor(cc.color(255, 255, 255, 190)), this.addChild(this.bg), this.title = new cc.Sprite(this.defaultSettings.title), this.addChild(this.title), this.title.x = .5 * i.width, this.title.y = .5 * i.height, this.title.setScale(.1), this.callback = this.defaultSettings.callback, this.delayTime = this.defaultSettings.delayTime || 1e3, this.titleDuration = this.defaultSettings.titleDuration || 2e3, this.titleDuration = this.titleDuration / 1e3;
			var n = this, a = cc.sequence(cc.scaleTo(.3, 1, 1), cc.delayTime(this.titleDuration), cc.callFunc(n.endIntro, n));
			this.title.runAction(a), this.defaultSettings.titleSound && playEffect(this.defaultSettings.titleSound)
		}, endIntro: function () {
			var t = this;
			if (t.title.setVisible(!1), t.bg.setVisible(!1), !this.defaultSettings.introSound)return void this.playAudioEnd();
			playEffect(this.defaultSettings.introSound);
			var e;
			e = this.delayTime / 1e3, this.title.runAction(cc.sequence(cc.delayTime(e), new cc.CallFunc(this.playAudioEnd, this)))
		}, playAudioEnd: function () {
			this._targetLayer.enableWikiLayer(), this.removeFromParent(!0), this.callback && this.callback.call(this._targetLayer)
		}
	});

	var n = cc.LayerColor.extend({
		isEnabled: !1, ctor: function () {
			this._super(cc.color(255, 255, 255, 0)), this.addEventListeners()
		}, addEventListeners: function () {
			var t = cc.EventListener.create({
				event: cc.EventListener.TOUCH_ONE_BY_ONE, onTouchBegan: function (t, e) {
					var i = t.getLocation(), n = e.getCurrentTarget();
					return n.visible && cc.rectContainsPoint(n.getBoundingBoxToWorld(), i) ? n.isEnabled ? !1 : (e.stopPropagation(), !0) : !1
				}
			});
			cc.eventManager.addListener(t.clone(), this)
		}, disable: function () {
			this.isEnabled = !1
		}
	});

	var WikiScene = BaseScene.extend({
		run: function(){
			var layer = new WikiLayer();
	        this.addChild(layer);
	        runScene(this);
		}
	});

	window.WikiLayer = WikiLayer;
	window.WikiScene = WikiScene;
})();
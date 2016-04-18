'use strict';

;(function () {
	window.onload = function () {
		cc.game.onStart = function(){
			cc.view.setDesignResolutionSize(CCG.STAGE.WIDTH, CCG.STAGE.HEIGHT, cc.ResolutionPolicy.SHOW_ALL);
			cc.view.resizeWithBrowserSize(true);

			cc._loaderImage = CCG.LOADING_IMAGE;
	        var loaderScene = new cc.LoaderScene();
	        loaderScene.init();
	        loaderScene._label.setColor(cc.color(254, 154, 1));
	        loaderScene._label.setFontSize(20);
		    loaderScene._label.zIndex = 11;
		    loaderScene._label.y += 50;
		    cc.loaderScene = loaderScene;

	        cc.LoaderScene.preload([], function(){
	        	var debug = new DebugScene();
        		debug.run();
	        	
			}, this);
		}
		cc.game.run("gameCanvas");
	}
})();

var DebugScene = cc.Scene.extend({
	ctor: function () {
		this._super();
	},
	run: function () {
		var layer = new DebugLayer();
		this.addChild(layer);
		runScene(this);
	}
});

var DebugLayer = cc.Layer.extend({
	ctor: function () {
		this._super();

		var winSize = cc.winSize;
		var menuFontSize = 40;
		var lineSpace = 80;

		this._itemMenu = new cc.Menu();

		for(var i=0;i<appMenus.length;i++){
			var label = new cc.LabelTTF(appMenus[i].title, "Arial", menuFontSize);
            var menuItem = new cc.MenuItemLabel(label, this.onMenuCallback, this);
            this._itemMenu.addChild(menuItem, i + 10000);
            menuItem.x = winSize.width / 2;
	        menuItem.y = (winSize.height - (i + 1) * lineSpace);
		}

		this.addChild(this._itemMenu);
		this._itemMenu.x = 0;
		this._itemMenu.y = 0;

	},
	onMenuCallback: function (sender) {
		var idx = sender.getLocalZOrder() - 10000;
		var testCase = appMenus[idx];
		window.location = testCase.url;
	}
});

var appMenus = [
	{
		title: '情景动画',
		url: '../story/'
	},
	{
		title: '实验室',
		url: '../experiment/'
	},
	{
		title: '你知道吗',
		url: '../wiki/'
	},
	{
		title: '超级链接',
		url: '../link/'
	},
	{
		title: '生活大发现',
		url: '../discovery/'
	},
	{
		title: '游戏1',
		url: '../game1/'
	},
	{
		title: '游戏2',
		url: '../game2/'
	},
	{
		title: '智力闯关',
		url: '../quiz/'
	}
];
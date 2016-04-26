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

	        cc.LoaderScene.preload(base_resources, function(){
	        	var scene = new QuizHomeScene();
        		scene.run();
	        	
			}, this);
		}
		cc.game.run("gameCanvas");
	}
})();

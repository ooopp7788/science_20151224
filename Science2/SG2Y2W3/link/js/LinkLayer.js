;(function () {
	var LinkLayer = LinkBaseLayer.extend({
		ctor: function () {
			this._super();
		},
		onEnter: function () {
			this._super();

			var config = {
				title: resLink.title_png,
				video: {
					keyPoints: [
	                    /*{
	                        value: 10,
	                        func: function () {
		                    },
		                    pause: false,
		                    visible: true,
		                    showPauseImg:false
	                    }*/
	                ],
	                mediaUrl: resLinkVideo.video_mp4
				},
			};

			this.initConfig(config);

		}
	});

	var LinkScene = BaseScene.extend({
		run: function(){
			var layer = new LinkLayer();
	        this.addChild(layer);
	        runScene(this);
		}
	});

	window.LinkLayer = LinkLayer;
	window.LinkScene = LinkScene;
})();
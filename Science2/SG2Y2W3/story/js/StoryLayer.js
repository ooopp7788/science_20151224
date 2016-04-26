;(function () {
	var StoryLayer = StoryBaseLayer.extend({
		ctor: function () {
			this._super();
		},
		onEnter: function () {
			this._super();

			var config = {
				title: resStory.title_png,
				video: {
					keyPoints: [
	                    {
	                        value: 24,
	                        func: function () {
		                    },
		                    pause: false,
		                    visible: true,
		                    showPauseImg:false
	                    }
	                ],
	                mediaUrl: resStoryOther.video_mp4
				},
				steps: {
					keyPoints: [
						{
							value: 24
						}
					]
				}
			};

			this.initConfig(config);

		}
	});

	var StoryScene = BaseScene.extend({
		run: function(){
			var layer = new StoryLayer();
	        this.addChild(layer);
	        runScene(this);
		}
	});

	window.StoryLayer = StoryLayer;
	window.StoryScene = StoryScene;
})();
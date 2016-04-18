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
	                        value: 30,
	                        func: function () {
		                    },
		                    pause: false,
		                    visible: true,
		                    showPauseImg:false
	                    },
	                    {
	                        value: 60,
	                        func: function () {
		                    },
		                    pause: false,
		                    visible: true,
		                    showPauseImg:false
	                    },
	                    {
	                        value: 90,
	                        func: function () {
		                    },
		                    pause: false,
		                    visible: true,
		                    showPauseImg:false
	                    },
	                    {
	                        value: 120,
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
							value: 30
						},
						{
							value: 60
						},
						{
							value: 90
						},
						{
							value: 120
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
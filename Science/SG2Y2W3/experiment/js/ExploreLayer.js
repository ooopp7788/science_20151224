;(function () {
	var ExploreLayer = ExploreBaseLayer.extend({
		ctor: function () {
			this._super();
		},
		onEnter: function () {
			this._super();

			var config = {
				steps: [
					{
						resource: convertObjectToArray(resStep),
						scene: function () {
							return new StepScene();
						}
					},
					{
						resource: convertObjectToArray(resRecord),
						scene: function () {
							return new RecordScene();
						}
					},
					{
						resource: convertObjectToArray(resExplore),
						scene: function () {
							return new ExploreScene();
						}
					},
					{
						resource: convertObjectToArray(resFeel),
						scene: function () {
							return new FeelScene();
						}
					}
				],
				ui: {
					
				}
			};

			this.initConfig(config);

			var exploreConfig = {
				objects: [
					{
						objects: [
							resExplore.star1_png,
							resExplore.star2_png,
							resExplore.star3_png
						],
						audio: resExplore.step1_mp3,
						position: [
							[220, 380],
							[600, 400],
							[1000, 400]
						],
						scales: [
							resExplore.pic1_png,
							resExplore.pic2_png,
							resExplore.pic3_png
						]
					},
					{
						objects: [
							resExplore.star4_png,
							resExplore.star5_png
						],
						audio: resExplore.step2_mp3,
						position: [
							[420,400],
							[920,400]
						],
						scales: [
							resExplore.pic1_png,
							resExplore.pic2_png
						]
					}
				],
				video: resExplore.explore_mp4
			};

			this.initExplore(exploreConfig);
		},
		onCloseCallback: function () {
			if(this.isShow) {
				this.closeScale();
			}else{
				this._super();

				var scene = new ExperimentScene();
	    		scene.run();
			}
		}
	});

	var ExploreScene = BaseScene.extend({
		run: function(){
			var layer = new ExploreLayer();
	        this.addChild(layer);
	        runScene(this);
		}
	});

	window.ExploreLayer = ExploreLayer;
	window.ExploreScene = ExploreScene;

})();
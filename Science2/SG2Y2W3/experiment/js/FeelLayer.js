;(function () {
	var FeelLayer = FeelBaseLayer.extend({
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

			var feels = {
				mediaUrl: resFeel.feel_mp4
			};

			this.initFeels(feels);

		},
		onCloseCallback: function () {
			this._super();

			var scene = new ExperimentScene();
			scene.run();
		}
	});

	var FeelScene = BaseScene.extend({
		run: function(){
			var layer = new FeelLayer();
			this.addChild(layer);
			runScene(this);
		}
	});

	window.FeelLayer = FeelLayer;
	window.FeelScene = FeelScene;

})();
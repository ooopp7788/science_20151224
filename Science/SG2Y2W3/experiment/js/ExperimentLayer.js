;(function () {
	var ExperimentLayer = ExperimentHomeBaseLayer.extend({
		ctor: function () {
			this._super();
		},
		onEnter: function () {
			this._super();

			var config = [
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
			];

			this.initConfig(config);

		}
	});

	var ExperimentScene = BaseScene.extend({
		run: function(){
			var layer = new ExperimentLayer();
	        this.addChild(layer);
	        runScene(this);
		}
	});

	window.ExperimentLayer = ExperimentLayer;
	window.ExperimentScene = ExperimentScene;
})();
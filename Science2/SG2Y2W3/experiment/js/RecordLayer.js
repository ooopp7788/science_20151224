;(function () {
	var RecordLayer = RecordBaseLayer.extend({
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

			this.initRecordBrush({
				img: resRecord.table_png,
				audio: resRecord.intro_mp3
			});
		},
		onCloseCallback: function () {
			this._super();

			var scene = new ExperimentScene();
    		scene.run();
		}
	});

	var RecordScene = BaseScene.extend({
		run: function(){
			var layer = new RecordLayer();
	        this.addChild(layer);
	        runScene(this);
		}
	});

	window.RecordLayer = RecordLayer;
	window.RecordScene = RecordScene;

})();
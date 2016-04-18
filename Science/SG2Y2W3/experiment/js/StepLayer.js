;(function () {
	var StepLayer = StepBaseLayer.extend({
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

			var stepConfig = {
				objects: [
					{
						image: resStep.object1_png,
						audio: resStep.object1_mp3,
						position: [300, 450]
					},
					{
						image: resStep.object2_png,
						audio: resStep.object2_mp3,
						position: [500, 450]
					},
					{
						image: resStep.object3_png,
						audio: resStep.object3_mp3,
						position: [700, 450]
					},
					{
						image: resStep.object4_png,
						audio: resStep.object4_mp3,
						position: [900, 450]
					}
				],
				steps: [
					{
						thumb: resStep.step1_png,
						frames: resStep.frames_step1,
						delayPerUnit: .2,
						audio: resStep.step1_mp3,
						duration: 5,
						position: [300, 150]
					},
					{
						thumb: resStep.step2_png,
						frames: resStep.frames_step2,
						delayPerUnit: .2,
						audio: resStep.step2_mp3,
						duration: 5,
						position: [620, 150]
					},
					{
						thumb: resStep.step3_png,
						frames: resStep.frames_step3,
						delayPerUnit: .2,
						audio: resStep.step3_mp3,
						duration: 8,
						position: [940, 150]
					}
				]
			};

			this.initStepScene(stepConfig);// 如果是纯静态图片的，重写initStepScene方法
		},
		onCloseCallback: function () {
			this._super();
			if(this.isPlaying) {
				this.closeAnimation();
			}else{
				var scene = new ExperimentScene();
	    		scene.run();
			}
		}
	});

	var StepScene = BaseScene.extend({
		run: function(){
			var layer = new StepLayer();
	        this.addChild(layer);
	        runScene(this);
		}
	});

	window.StepLayer = StepLayer;
	window.StepScene = StepScene;

})();
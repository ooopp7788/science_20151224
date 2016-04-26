;(function () {
	var QuizLayer = QuizBaseLayer.extend({
		ctor: function () {
			this._super();
		},
		onEnter: function () {
			this._super();

			var woodLinePoints = [
				{
					x: 270,
					y: 580
				},
				{
					x: 270,
					y: 590
				},
				{
					x: 400,
					y: 535
				}
			];

			var flowerLinePoints = [
				{
					x: 400,
					y: 535
				},
				{
					x: 235,
					y: 475
				},
				{
					x: 330,
					y: 340
				},
				{
					x: 215,
					y: 260
				}
			];

			var roadLinePoints = [
				{
					x: 215,
					y: 260
				},
				{
					x: 290,
					y: 110
				}
			];

			var keyLinePoints = [
				{
					x: 290,
					y: 140
				},
				{
					x: 495,
					y: 160
				},
				{
					x: 700,
					y: 290
				},
				{
					x: 810,
					y: 215
				},
				{
					x: 740,
					y: 145
				}
			];

			var dollarLinePoints = [
				{
					x: 740,
					y: 145
				},
				{
					x: 920,
					y: 135
				},
				{
					x: 1000,
					y: 225
				},
				{
					x: 1110,
					y: 210
				},
				{
					x: 1175,
					y: 210
				}
			];

			var doorLinePoints = [
				{
					x: 1175,
					y: 210
				},
				{
					x: 1110,
					y: 210
				},
				{
					x: 1000,
					y: 225
				},
				{
					x: 925,
					y: 350
				},
				{
					x: 880,
					y: 415
				},
				{
					x: 816,
					y: 432
				},
				{
					x: 730,
					y: 450
				}
			];

			var boxLinePoints = [
				{
					x: 730,
					y: 470
				},
				{
					x: 675,
					y: 480
				},
				{
					x: 810,
					y: 550
				}
			];

			var collectionsConfig = [
				{
					type: 'collection',
					resolve: '',
					name: 'flower',
					imgs: [resQuiz.flower_blank_png, resQuiz.flower_collect_png]
				},
				{
					type: 'collection',
					name: 'key',
					resolve: 'door',
					imgs: [resQuiz.key_blank_png, resQuiz.key_collect_png]
				},
				{
					type: 'collection',
					name: 'dollar',
					resolve: '',
					imgs: [resQuiz.dollar_blank_png, resQuiz.dollar_collect_png]
				},
				{
					type: 'collection',
					name: 'wood',
					resolve: 'road',
					imgs: [resQuiz.wood_blank_png, resQuiz.wood_collect_png]
				}
			];

			var mapConfig = {
				ui: {
					bg: resQuiz.map_bg_png,
					missionPoint: resQuiz.point_png,
					collection: {
						img: resQuiz.bag_png,
						bg: resQuiz.bag_bg_png
					}
				},
				missions: [
					{
						type: 'point',
						name: 'wood',
						position: [455, 575],
						imgs: [resQuiz.house_wood_png],
						object: resQuiz.wood_png,
						linePoints: woodLinePoints,
						mission: {
							bonus: 'wood',
							bg: resQuiz.question1_bg_png,
							question: {
								audio: resQuizAudio.q1_mp3
							},
							options: [
								{
									imgs: [resQuiz.question1_option1_png, resQuiz.question1_option1_png],
									position: [350, 300],
									audio: '',
									value: 1
								},
								{
									imgs: [resQuiz.question1_option2_png, resQuiz.question1_option2_png],
									position: [650, 300],
									audio: '',
									value: 0
								},
								{
									imgs: [resQuiz.question1_option3_png, resQuiz.question1_option3_png],
									position: [950, 300],
									audio: '',
									value: 0
								}
							]
						}
					},
					{
						type: 'point',
						name: 'flower',
						position: [335, 295],
						imgs: [resQuiz.house_flower_png],
						object: resQuiz.flower_png,
						linePoints: flowerLinePoints,
						mission: {
							bonus: 'flower',
							bg: resQuiz.question2_bg_png,
							question: {
								audio: resQuizAudio.q2_mp3
							},
							options: [
								{
									imgs: [resQuiz.question2_option1_png, resQuiz.question2_option1_png],
									position: [650, 285],
									audio: '',
									value: 1
								},
								{
									imgs: [resQuiz.question2_option2_png, resQuiz.question2_option2_png],
									position: [950, 285],
									audio: '',
									value: 0
								}
							]
						}
					},

					{
						type: 'obstacle',
						name: 'road',
						position: [420, 160],
						imgs: [resQuiz.road_broken_png, resQuiz.road_filled_png],
						animation: '',
						linePoints: roadLinePoints
					},

					{
						type: 'point',
						name: 'key',
						position: [650, 190],
						imgs: [resQuiz.house_key_png],
						object: resQuiz.key_png,
						linePoints: keyLinePoints,
						mission: {
							bonus: 'key',
							bg: resQuiz.question3_bg_png,
							question: {
								audio: resQuizAudio.q3_mp3
							},
							options: [
								{
									imgs: [resQuiz.question3_option1_png, resQuiz.question3_option1_png],
									position: [350, 300],
									audio: '',
									value: 0
								},
								{
									imgs: [resQuiz.question3_option2_png, resQuiz.question3_option2_png],
									position: [630, 300],
									audio: '',
									value: 0
								},
								{
									imgs: [resQuiz.question3_option3_png, resQuiz.question3_option3_png],
									position: [900, 300],
									audio: '',
									value: 1
								}
							]
						}
					},
					{
						type: 'point',
						name: 'dollar',
						position: [1090, 290],
						imgs: [resQuiz.house_dollar_png],
						object: resQuiz.dollar_png,
						linePoints: dollarLinePoints,
						zIndex: this.ROLE_ZORDER - 1,
						mission: {
							bonus: 'dollar',
							bg: resQuiz.question4_bg_png,
							question: {
								audio: resQuizAudio.q4_mp3
							},
							options: [
								{
									imgs: [resQuiz.question2_option1_png, resQuiz.question2_option1_png],
									position: [650, 285],
									audio: '',
									value: 1
								},
								{
									imgs: [resQuiz.question2_option2_png, resQuiz.question2_option2_png],
									position: [950, 285],
									audio: '',
									value: 0
								}
							]
						}
					},

					{
						type: 'obstacle',
						name: 'door',
						position: [670, 560],
						imgs: [resQuiz.window_close_png, resQuiz.window_open_png],
						animation: '',
						linePoints: doorLinePoints
					},

					{
						type: 'destination',
						name: 'box',
						position: [890, 615],
						imgs: [resQuiz.box_png],
						animation: resQuiz.box_frames,
						linePoints: boxLinePoints
					}
				],
				collections: collectionsConfig
			};

			this.initConfig(mapConfig);
		}
	});



	var QuizHomeScene = BaseScene.extend({
		run: function(){
			var layer = new QuizLayer();
			this.addChild(layer);
			runScene(this);
		}
	});

	window.QuizLayer = QuizLayer;
	window.QuizHomeScene = QuizHomeScene;
})();
;(function () {
	var WikiLayer = WikiBaseLayer.extend({
		ctor: function () {
			this._super();
		},
		onEnter: function () {
			this._super();

			var config = {
				title: resWiki.title_png,
				bg: resWiki.bg_png,
				objects: [
					{
						img: resWiki.dragon1_png,
						audio: resWikiOther.dragon1_mp3,
						position: [380, 430],
						// zIndex: 1, 
						// scale: 1,
						items: [
							{
								img: resWiki.dragon1_png,
								audio: resWikiOther.dragon1_mp3,
							},
							{
								img: resWiki.dragon1_2_png,
								audio: resWikiOther.dragon1_2_mp3,
							},
							{
								img: resWiki.dragon1_3_png,
								// audio: resWikiOther.dragon1_3_mp3,
							}
						]
					},
					{
						img: resWiki.dragon2_png,
						audio: resWikiOther.dragon2_mp3,
						position: [780, 430],
						items: [
							{
								img: resWiki.dragon2_png,
								audio: resWikiOther.dragon2_mp3,
							},
							{
								img: resWiki.dragon2_2_png,
								audio: resWikiOther.dragon2_2_mp3,
							}
						]
					},
					{
						img: resWiki.dragon3_png,
						audio: resWikiOther.dragon3_mp3,
						position: [380, 200],
						items: [
							{
								img: resWiki.dragon3_png,
								audio: resWikiOther.dragon3_mp3,
							}
						]
					},
					{
						img: resWiki.dragon4_png,
						audio: resWikiOther.dragon4_mp3,
						position: [780, 200],
						items: [
							{
								img: resWiki.dragon4_png,
								// audio: resWikiOther.dragon4_mp3,
							},
							{
								img: resWiki.dragon4_2_png,
								audio: resWikiOther.dragon4_2_mp3,
							}
						]
					}
				]
			};

			this.initConfig(config);

			// playEffect(resWikiOther.dragon1_mp3);
			/*playAudio(resWikiOther.dragon1_mp3, function () {
				this.initConfig(config);
			}, this);*/
			
			var objects = this.getObjects();
			for(var i=0;i<objects.length;i++){
				var action = cc.repeatForever(cc.sequence(cc.fadeTo(1, 150), cc.fadeTo(.5, 255)));
				objects[i].runAction(action);
			}
		}
	});

	

	var WikiScene = BaseScene.extend({
		run: function(){
			var layer = new WikiLayer();
	        this.addChild(layer);
	        runScene(this);
		}
	});

	window.WikiLayer = WikiLayer;
	window.WikiScene = WikiScene;
})();
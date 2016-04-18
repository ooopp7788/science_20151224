!function(){var e=ScienceBaseLayer.extend({ctor:function(){this._super()},onEnter:function(){this._super(),this.initUI({title:m.title_home_png,bg:m.bg_png,nav:{refresh:!1,encourage:!1}})},onCloseCallback:function(){this._super(),this.videoPlayer&&this.videoPlayer.onClosed()},initConfig:function(e){this.defaultConfig=[{img:m.text_step_png,resource:[]},{img:m.text_record_png,resource:[]},{img:m.text_explore_png,resource:[]},{img:m.text_feel_png,resource:[]}];for(var n=0;n<e.length;n++)this.defaultConfig[n].scene=e[n].scene,this.defaultConfig[n].resource=this.defaultConfig[n].resource.concat(e[n].resource||[]);this.renderHomeScene()},renderHomeScene:function(){cc.spriteFrameCache.addSpriteFrames(m.tv_plist,m.tv_png);var e=new cc.Sprite(m.home_frames[0]);this.addChild(e),e.setPosition(.5*cc.winSize.width-120,.5*cc.winSize.height+20);var n=new AnimationFrames(m.home_frames,.1);e.runAction(cc.repeatForever(n));var t=new cc.Sprite("#dianshi0001.png");this.addChild(t),t.setPosition(1150,130);var i=new Animation(m.tv_plist,.1);t.runAction(cc.repeatForever(i));for(var s=[[205,210],[497,325],[780,530],[1120,180]],o=0;o<this.defaultConfig.length;o++){var r=new Button([this.defaultConfig[o].img],this.onMenuCallback,this);this.addChild(r),r.menuIndex=o,r.setPosition(s[o][0],s[o][1])}},onMenuCallback:function(e){var n=this.defaultConfig[e.menuIndex],t=n.resource||[];cc.LoaderScene.preload(t,function(){var e=n.scene();e&&e.run()},this)}}),n=ScienceBaseLayer.extend({_STEP_BUTTON_LAYER_ZORDER:99,ctor:function(){this._super()},onEnter:function(){this._super()},onCloseCallback:function(){this._super(),this.videoPlayer&&this.videoPlayer.onClosed()},initConfig:function(e){var n={nav:{encourage:!1}};cc.extend(n,e),this.initUI(n),this.steps=e.steps},initStepButtons:function(e){var n={tpl:{step:[m.nav_step_normal_png,m.nav_step_selected_png],record:[m.nav_record_normal_png,m.nav_record_selected_png],explore:[m.nav_explore_normal_png,m.nav_explore_selected_png],feel:[m.nav_feel_normal_png,m.nav_feel_selected_png]},step:"step"};cc.extend(n,e||{}),this._stepButtonLayer=new cc.Layer,this.addChild(this._stepButtonLayer,this._STEP_BUTTON_LAYER_ZORDER);var t=new Button(n.tpl.step,this.onStepCallback,this);t.tag="step",this._stepButtonLayer.addChild(t,4),t.setPosition(1225,700),t.anchorY=1;var i=new Button(n.tpl.record,this.onStepCallback,this);i.tag="record",this._stepButtonLayer.addChild(i,3),i.setPosition(1238,700),i.anchorY=1;var s=new Button(n.tpl.explore,this.onStepCallback,this);s.tag="explore",this._stepButtonLayer.addChild(s,2),s.setPosition(1225,630),s.anchorY=1;var o=new Button(n.tpl.feel,this.onStepCallback,this);o.tag="feel",this._stepButtonLayer.addChild(o,1),o.setPosition(1240,570),o.anchorY=1,this._stepButtonLayer.getChildByTag(n.step).setStates("selected")},onStepCallback:function(e){stopAllEffects(),this.videoPlayer&&this.videoPlayer.onClosed();var n=["step","record","explore","feel"],t=n.indexOf(e.tag),i=this.steps[t],s=i.resource||[];cc.LoaderScene.preload(s,function(){var e=i.scene();e&&e.run()},this)}}),t=n.extend({objects:[],thumbs:[],isPlaying:!1,playAnimation:null,ctor:function(){this._super()},onEnter:function(){this._super(),this.initTitle(m.title_step_png),this.initStepButtons({step:"step"})},onCloseCallback:function(){stopAllEffects()},initStepScene:function(e){this.stepConfig=e,this.initBg(m.bg_step_png),e.audio&&playEffect(e.audio),this.initObjects(),this.initStepThumbs()},initObjects:function(){for(var e=this.stepConfig.objects,n=0;n<e.length;n++){var t=new i(e[n],this.onViewObject,this);this.addChild(t),this.objects.push(t),t.setPosition(300+200*n,450),e[n].position&&t.setPosition(e[n].position[0],e[n].position[1])}},initStepThumbs:function(){for(var e=this.stepConfig.steps,n=0;n<e.length;n++){var t=new s(e[n],this.onViewStepAnimation,this);this.addChild(t),this.thumbs.push(t),t.setPosition(300+320*n,150),e[n].position&&t.setPosition(e[n].position[0],e[n].position[1])}},onViewObject:function(e){for(var n=0;n<this.objects.length;n++)e!=this.objects[n]?this.objects[n].stop():this.objects[n].play()},onViewStepAnimation:function(e){var n=this.thumbs.indexOf(e);this.playStepAnimation(e.data,n)},playStepAnimation:function(e,n){var t=e.frames;this.isPlaying=!0,e.audio&&playEffect(e.audio);var i=new cc.Sprite(t[0]);this.addChild(i,60),i.setPosition(.5*cc.winSize.width,.5*cc.winSize.height);var s=new AnimationFrames(t,e.delayPerUnit||.2);i.runAction(s),this.playAnimation=i,addEvent(function(){},i)},closeAnimation:function(){this.isPlaying=!1,this.playAnimation.removeFromParent(!0),this.playAnimation=null}}),i=cc.Sprite.extend({isSelected:!1,ctor:function(e,n,t){this.data=e,this._super(e.image);var i=this;addEvent(function(){i.isSelected||n.call(t,i)},this)},play:function(){this.data.audio&&playEffect(this.data.audio);var e=cc.scaleTo(.4,1.3,1.3),n=cc.scaleTo(.3,1,1),t=this;t.isSelected=!0,this.runAction(cc.sequence(e,cc.delayTime(.3),n,cc.callFunc(function(){t.isSelected=!1},this)))},stop:function(){this.isSelected=!1,this.scale=1,this.stopAllActions()}}),s=cc.Sprite.extend({data:null,ctor:function(e,n,t){this.data=e,this._super(e.thumb);var i=this;addEvent(function(){n.call(t,i)},this)}}),o=n.extend({recordOpt:null,ctor:function(){this._super()},onEnter:function(){this._super(),this.initTitle(m.title_record_png),this.initStepButtons({step:"record"})},onCloseCallback:function(){stopAllEffects()},initRecordBrush:function(e){this.recordOpt=e,this.initBg(m.bg_record_png);var n=new cc.Sprite(e.img);this.addChild(n),n.setPosition(.5*cc.winSize.width+20,.5*cc.winSize.height),this.brush=new BrushLayer({width:800,height:520,brushColor:"#AA0000",isOpacity:!0}),this.addChild(this.brush),this.brush.setPosition(225,85);var t=new cc.Sprite(m.brush_bg_png);this.addChild(t),t.anchorX=0,t.setPosition(-5,350),this.pencil=new cc.Sprite(m.brush_pencil_active_png),this.pencil.isUn=!1,this.addChild(this.pencil),this.pencil.setPosition(50,400),this.eraser=new cc.Sprite(m.brush_eraser_normal_png),this.eraser.isUn=!0,this.addChild(this.eraser),this.eraser.setPosition(50,300);var i=this;addEvent(function(){i.pencil.isUn&&(i.pencil.isUn=!1,i.eraser.isUn=!0,i.pencil.setTexture(m.brush_pencil_active_png),i.eraser.setTexture(m.brush_eraser_normal_png),i.brush.setBrushState())},this.pencil),addEvent(function(){i.eraser.isUn&&(i.eraser.isUn=!1,i.pencil.isUn=!0,i.eraser.setTexture(m.brush_eraser_active_png),i.pencil.setTexture(m.brush_pencil_normal_png),i.brush.setEraserState())},this.eraser),this.recordOpt.audio&&playEffect(this.recordOpt.audio)},onRefreshCallback:function(){this._super(),this.brush.drawClear(),this.pencil.isUn=!1,this.eraser.isUn=!0,this.pencil.setTexture(m.brush_pencil_active_png),this.eraser.setTexture(m.brush_eraser_normal_png),this.brush.setBrushState(),this.recordOpt.audio&&playEffect(this.recordOpt.audio)}}),r=n.extend({exploreConfig:null,nums:[],stars:[],isShow:!1,ctor:function(){this._super()},onEnter:function(){this._super()},onCloseCallback:function(){stopAllEffects(),this.videoPlayer&&this.videoPlayer.onClosed()},closeScale:function(){this.isShow&&(this.isShow=!1,this.scaleSprite&&this.scaleSprite.setVisible(!1))},onRefreshCallback:function(){this._super(),this.initStep(0),this.selectStepNum(this.nums[0])},initExplore:function(e){this.exploreConfig=e,this.initTitle(m.title_explore_png),this.exploreConfig.video?this.initPlayer():this.initExploreScene()},initPlayer:function(){this.videoPlayer=new p(this.exploreConfig.video,this),this.addChild(this.videoPlayer),this.skipBtn=new Button([m.button_skip_normal_png,m.button_skip_normal_png],this.skipVideo,this),this.addChild(this.skipBtn),this.skipBtn.setPosition(1150,50)},skipVideo:function(){this.videoPlayer.onClosed(),this.videoPlayer.onEnded()},initExploreScene:function(){this.skipBtn&&this.skipBtn.setVisible(!1),this.initBg(m.bg_explore_png),this.initStepButtons({step:"explore"});var e=new cc.Sprite(m.bg_expore_front_png);this.addChild(e,60),e.anchorX=0,e.anchorY=1,e.setPosition(0,cc.winSize.height),this.initStepNums(),this.initStep(0),this.scaleSprite=new cc.Sprite,this.addChild(this.scaleSprite,100),this.scaleSprite.setPosition(.5*cc.winSize.width,.5*cc.winSize.height)},initStep:function(e){var n=this.exploreConfig.objects[e].objects,t=this.exploreConfig.objects[e].audio,i=this.exploreConfig.objects[e].position,s=this.exploreConfig.objects[e].scales;t&&playEffect(t);for(var o=0;o<this.stars.length;o++)this.stars[o].removeFromParent(!0);this.stars.length=0;for(var r=this,c=0;c<n.length;c++){var a=new cc.Sprite(n[c]);this.addChild(a),this.stars.push(a),i[c]?a.setPosition(i[c][0],i[c][1]):a.setPosition(260+400*c,400),function(e,n){addEvent(function(){r.isShow=!0,r.scaleSprite.setVisible(!0),r.scaleSprite.setTexture(s[e])},n)}(c,a)}},initStepNums:function(){if(!(this.exploreConfig.objects.length<=1)){this.nums=[];for(var e=0;e<this.exploreConfig.objects.length;e++){var n=new c(e,this.selectStepNum,this);this.addChild(n),n.setPosition(1030+60*e,35),0==e&&n.setStates(!0),this.nums.push(n)}}},selectStepNum:function(e){for(var n=0;n<this.nums.length;n++)e!=this.nums[n]?this.nums[n].setStates(!1):(this.nums[n].setStates(!0),this.initStep(n))}}),c=cc.Sprite.extend({num:0,isSelected:!1,ctor:function(e,n,t){this.numImgs=[[m.number1_normal_png,m.number1_selected_png],[m.number2_normal_png,m.number2_selected_png],[m.number3_normal_png,m.number3_selected_png],[m.number4_normal_png,m.number4_selected_png],[m.number5_normal_png,m.number5_selected_png]],this.num=e,this._super(this.numImgs[e][0]);var i=this;addEvent(function(){i.isSelected||t.isShow||n.call(t,i)},this)},setStates:function(e){this.isSelected=e,e?this.setTexture(this.numImgs[this.num][1]):this.setTexture(this.numImgs[this.num][0])}}),a=n.extend({ctor:function(){this._super()},onEnter:function(){this._super(),this.initTitle(m.title_feel_png),this.initStepButtons({step:"feel"})},onCloseCallback:function(){stopAllEffects(),this.videoPlayer&&this.videoPlayer.onClosed()},onRefreshCallback:function(){this._super()},initFeels:function(e){this.videoPlayer=new cc.progressBar0(e.mediaUrl),this.addChild(this.videoPlayer)},selectOption:function(e){for(var n=0;n<this.options.length;n++)this.options[n].stop();e.play()}}),p=(cc.Sprite.extend({ctor:function(e,n,t){this.data=e,cc.spriteFrameCache.addSpriteFrames(e.frames),this._super(e.image),this.animation=new Animation(e.frames,.05);var i=this;addEvent(function(){n.call(t,i)},this)},play:function(){this.runAction(this.animation),this.data.audio&&playEffect(this.data.audio)},stop:function(){this.stopAllActions(),stopAllEffects()}}),cc.progressBar0.extend({ctor:function(e,n){this._super(e),this.targetLayer=n},onEnded:function(){this.setVisible(!1),this.targetLayer.initExploreScene()}})),m={bg_png:"../../../common/res/science/experiment/bg.png",text_step_png:"../../../common/res/science/experiment/text_step.png",text_record_png:"../../../common/res/science/experiment/text_record.png",text_explore_png:"../../../common/res/science/experiment/text_explore.png",text_feel_png:"../../../common/res/science/experiment/text_feel.png",title_home_png:"../../../common/res/science/experiment/title_home.png",title_step_png:"../../../common/res/science/experiment/title_step.png",title_record_png:"../../../common/res/science/experiment/title_record.png",title_explore_png:"../../../common/res/science/experiment/title_explore.png",title_feel_png:"../../../common/res/science/experiment/title_feel.png",bg_step_png:"../../../common/res/science/experiment/bg_step.png",bg_record_png:"../../../common/res/science/experiment/bg_record.png",bg_explore_png:"../../../common/res/science/experiment/bg_explore.png",bg_expore_front_png:"../../../common/res/science/experiment/bg_explore2.png",bg_feel_png:"../../../common/res/science/experiment/bg_feel.png",button_skip_normal_png:"../../../common/res/science/experiment/button_skip_normal.png",number1_normal_png:"../../../common/res/science/number1_normal.png",number1_selected_png:"../../../common/res/science/number1_selected.png",number2_normal_png:"../../../common/res/science/number2_normal.png",number2_selected_png:"../../../common/res/science/number2_selected.png",number3_normal_png:"../../../common/res/science/number3_normal.png",number3_selected_png:"../../../common/res/science/number3_selected.png",number4_normal_png:"../../../common/res/science/number4_normal.png",number4_selected_png:"../../../common/res/science/number4_selected.png",number5_normal_png:"../../../common/res/science/number5_normal.png",number5_selected_png:"../../../common/res/science/number5_selected.png",home_frames:["../../../common/res/science/experiment/frames/shiguan1.png","../../../common/res/science/experiment/frames/shiguan2.png","../../../common/res/science/experiment/frames/shiguan3.png","../../../common/res/science/experiment/frames/shiguan4.png","../../../common/res/science/experiment/frames/shiguan5.png","../../../common/res/science/experiment/frames/shiguan6.png","../../../common/res/science/experiment/frames/shiguan7.png","../../../common/res/science/experiment/frames/shiguan8.png","../../../common/res/science/experiment/frames/shiguan9.png","../../../common/res/science/experiment/frames/shiguan10.png","../../../common/res/science/experiment/frames/shiguan11.png","../../../common/res/science/experiment/frames/shiguan12.png","../../../common/res/science/experiment/frames/shiguan13.png","../../../common/res/science/experiment/frames/shiguan14.png","../../../common/res/science/experiment/frames/shiguan15.png","../../../common/res/science/experiment/frames/shiguan16.png","../../../common/res/science/experiment/frames/shiguan17.png","../../../common/res/science/experiment/frames/shiguan18.png","../../../common/res/science/experiment/frames/shiguan19.png","../../../common/res/science/experiment/frames/shiguan20.png","../../../common/res/science/experiment/frames/shiguan21.png","../../../common/res/science/experiment/frames/shiguan22.png","../../../common/res/science/experiment/frames/shiguan23.png","../../../common/res/science/experiment/frames/shiguan24.png","../../../common/res/science/experiment/frames/shiguan25.png","../../../common/res/science/experiment/frames/shiguan26.png","../../../common/res/science/experiment/frames/shiguan27.png","../../../common/res/science/experiment/frames/shiguan28.png","../../../common/res/science/experiment/frames/shiguan29.png","../../../common/res/science/experiment/frames/shiguan30.png","../../../common/res/science/experiment/frames/shiguan31.png","../../../common/res/science/experiment/frames/shiguan32.png","../../../common/res/science/experiment/frames/shiguan33.png","../../../common/res/science/experiment/frames/shiguan34.png","../../../common/res/science/experiment/frames/shiguan35.png","../../../common/res/science/experiment/frames/shiguan36.png","../../../common/res/science/experiment/frames/shiguan37.png","../../../common/res/science/experiment/frames/shiguan38.png","../../../common/res/science/experiment/frames/shiguan39.png"],tv_plist:"../../../common/res/science/experiment/dianshi.plist",tv_png:"../../../common/res/science/experiment/dianshi.png",brush_bg_png:"../../../common/res/science/drawboard_button_bg.png",brush_pencil_normal_png:"../../../common/res/science/button_pencil_normal.png",brush_pencil_active_png:"../../../common/res/science/button_pencil_active.png",brush_eraser_normal_png:"../../../common/res/science/button_eraser_normal.png",brush_eraser_active_png:"../../../common/res/science/button_eraser_active.png",nav_step_normal_png:"../../../common/res/science/nav/button_step_normal.png",nav_step_selected_png:"../../../common/res/science/nav/button_step_selected.png",nav_record_normal_png:"../../../common/res/science/nav/button_record_normal.png",nav_record_selected_png:"../../../common/res/science/nav/button_record_selected.png",nav_explore_normal_png:"../../../common/res/science/nav/button_explore_normal.png",nav_explore_selected_png:"../../../common/res/science/nav/button_explore_selected.png",nav_feel_normal_png:"../../../common/res/science/nav/button_feel_normal.png",nav_feel_selected_png:"../../../common/res/science/nav/button_feel_selected.png"},h=BaseScene.extend({run:function(){var n=new e;this.addChild(n),runScene(this)}});addModuleResourceByName(m),addModuleResourceByName(pbRes),window.baseExperimentRes=m,window.ExperimentBaseScene=h,window.ExperimentHomeBaseLayer=e,window.StepBaseLayer=t,window.RecordBaseLayer=o,window.ExploreBaseLayer=r,window.FeelBaseLayer=a}();
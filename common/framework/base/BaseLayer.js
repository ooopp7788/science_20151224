!function(){var t={_BG_LAYER_ZORDER:0,_FRONT_LAYER_ZORDER:2e3,_bgLayer:null,_frontUILayer:null,_TITLE_ZORDER:0,_NAVBUTTONS_ZORDER:100,_NAV_BG_ZORDER:10,_defaultSetting:{nav:{refresh:!0,close:!0,encourage:!0,tpl:null,bg:null}},ctor:function(){this._super(),this._bgLayer=new cc.Layer,this.addChild(this._bgLayer,this._BG_LAYER_ZORDER),this._frontUILayer=new cc.Layer,this.addChild(this._frontUILayer,this._FRONT_LAYER_ZORDER)},initNavButtons:function(t){var e=this._defaultSetting.nav,n=cc.winSize;if(t)for(var i in t)e[i]=t[i];var a={refresh:[navRes.button_refresh_normal_png,navRes.button_refresh_pressed_png],close:[navRes.button_close_normal_png,navRes.button_close_pressed_png],encourage:[navRes.button_encourage_normal_png,navRes.button_encourage_pressed_png]};if(e.bg){var r=new cc.Sprite(e.bg);r.tag="navBg",this._frontUILayer.addChild(r,this._NAV_BG_ZORDER),r.attr({anchorX:1,anchorY:1}),r.x=n.width,r.y=n.height}if(e.tpl&&(e.tpl.refresh&&e.tpl.refresh.length>0&&(a.refresh=e.tpl.refresh),e.tpl.close&&e.tpl.close.length>0&&(a.close=e.tpl.close),e.tpl.encourage&&e.tpl.encourage.length>0&&(a.encourage=e.tpl.encourage)),this._navMenuLayer=new cc.Menu,this._navMenuLayer.x=0,this._navMenuLayer.y=0,e.refresh){var s=new cc.MenuItemImage(a.refresh[0],a.refresh[1],this.onRefreshCallback,this);s.x=n.width-136,s.y=n.height-35,s.tag="refresh",this._navMenuLayer.addChild(s)}if(e.close){var h=new cc.MenuItemImage(a.close[0],a.close[1],this.onCloseCallback,this);h.x=n.width-50,h.y=n.height-35,h.tag="close",this._navMenuLayer.addChild(h)}if(e.encourage){var o=new cc.MenuItemImage(a.encourage[0],a.encourage[1],this.onEncourageCallback,this);o.x=n.width-50,o.y=n.height-118,o.tag="encourage",this._navMenuLayer.addChild(o)}this._frontUILayer.addChild(this._navMenuLayer,this._NAVBUTTONS_ZORDER)},addNavButton:function(t){if(t&&(!t||t.states)){var e=cc.winSize,n={states:null,position:{x:e.width,y:e.height},callback:null};cc.extend(n,t);var i=new cc.MenuItemImage(n.states[0],n.states[1],n.callback,this);this._navMenuLayer.addChild(i)}},getNavButtonByTag:function(t){var e=this._navMenuLayer.getChildByTag(t);return e},hideUI:function(){this._frontUILayer.setVisible(!1)},showUI:function(){this._frontUILayer.setVisible(!0)},initBg:function(t){if(t){var t=new cc.Sprite(t);t.tag="bg",this._bgLayer.addChild(t),t.attr({anchorX:0,anchorY:0})}},getBg:function(){return this._bgLayer?this._bgLayer.getChildByTag("bg"):null},initTitle:function(t){var e=cc.winSize,n={texture:null,position:{x:0,y:e.height}};cc.isString(t)?n.texture=t:cc.isObject(t)&&cc.extend(n,t),n.texture&&(this.title=new cc.Sprite(n.texture),this._frontUILayer.addChild(this.title,this._TITLE_ZORDER),this.title.attr({anchorX:0,anchorY:1}),this.title.x=n.position.x,this.title.y=n.position.y)},getTitle:function(){var t="";return"title"in this?t=this.title:("_title"in this||this._title)&&(t=this._title),t},changeTitle:function(t,e,n){var i=cc.winSize,a=this.getTitle();a&&(a.initWithFile(t),this.title.attr({anchorX:0,anchorY:1}),a.x=e||0,a.y=n||i.height)},initLogo:function(){var t=(cc.winSize,new cc.Sprite(res.logo_png));t.tag="logo",this._frontUILayer.addChild(t),t.attr({anchorX:0,anchorY:0,x:45,y:15})},hideLogo:function(){var t=this._frontUILayer.getChildByTag("logo");t.setVisible(!1)},showLogo:function(){var t=this._frontUILayer.getChildByTag("logo");t.setVisible(!0)},initUI:function(t){t=t||{},this.initBg(t.bg),this.initLogo(),this.initTitle(t.title),this.initNavButtons(t.nav)},onEnter:function(){this._super()},onRefreshCallback:function(){},onCloseCallback:function(){},onEncourageCallback:function(){}},e=cc.Layer.extend(t),n=cc.Scene.extend({ctor:function(){this._super()},onExit:function(){this._super(),this.removeAllChildren(!0),cc.spriteFrameCache.removeSpriteFrames(),cc.textureCache.removeAllTextures()},run:function(){}});window.BaseLayer=e,window.BaseScene=n}();
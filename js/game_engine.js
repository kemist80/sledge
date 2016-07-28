/* 
 * 
 * Kemist's Game Engine library
 * 
 * @version 1.0.0
 */

var Kemist = Kemist || {};

/**
 * Adds all missing properties from second obj to first obj
 */ 
Kemist.extend = function(first, second){
  for (var prop in second){
    first[prop] = second[prop];
  }
};  

/**
 * Event prevent default action
 */
Kemist.preventDefault = function(e){
  if (e.preventDefault){
    e.preventDefault();
  }else{
    e.returnValue = false;
  }
};

/**
 * Attach event handler to an element
 */
Kemist.attach = function(element, type, fn){
  if (element.addEventListener){
    element.addEventListener(type, fn, false);
  }else if(element.attachEvent){
    element.attachEvent('on' + type, fn);
  }
};

/**
 * Detach event handler to an element
 */
Kemist.detach = function(element, type, fn){
  if (element.removeEventListener){
    element.removeEventListener(type, fn, false);
  }else if(element.attachEvent){
    element.detachEvent('on' + type, fn);
  }
};

/**
 * Shuffles an array
 * 
 * @param {Array}
 * 
 * @returns {Array}
 */
Kemist.shuffle = function(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

/**
 * Gets a random integer in given range
 * 
 * @param {int} min
 * @param {int} max
 * 
 * @returns {int}
 */
Kemist.getRandomInt = function(min,max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
};



/**
 * 
 * Input
 * 
 * @version 1.0.0
 */
Kemist.Input = {
  
  pressedKeys: {},
  /**
   * Set key status
   * 
   * @param {Object} event
   * @param {bool} status
   */
  setKey: function (event, status) {
    var code = event.keyCode;
    var key;

    switch (code) {
      case 32:
        key = 'SPACE';
        break;
      case 37:
        key = 'LEFT';
        break;
      case 38:
        key = 'UP';
        break;
      case 39:
        key = 'RIGHT';
        break;
      case 40:
        key = 'DOWN';
        break;
      default:
        // Convert ASCII codes to letters
        key = String.fromCharCode(code);
    }
    Kemist.Input.pressedKeys[key] = status;
  },
  /**
   * Gets key status
   * 
   * @param {string} key
   * 
   * @returns {bool}
   */
  isDown: function(key){
    return Kemist.Input.pressedKeys[key.toUpperCase()];
  }
};

Kemist.attach(document,'keydown',function(e) {
  Kemist.Input.setKey(e, true);
});

Kemist.attach(document,'keyup',function(e) {
  Kemist.Input.setKey(e, false);
});

Kemist.attach(window,'blur',function(e) {
  Kemist.Input.pressedKeys = {};
});




/**
 * 
 * Resources
 * 
 * @version 1.0.0
 */
Kemist.Resources={
  
  cache : {},
  readyCallbacks: [],
  progressCallbacks: [],
  count: 0,
  index: 0,
  
  /**
   * Loads a resource/resources
   * 
   * @param {string|Array} urlOrArr
   */
  load: function(urlOrArr){
    if (urlOrArr instanceof Array) {
      Kemist.Resources.index = 0;
      Kemist.Resources.count = urlOrArr.length;
      urlOrArr.forEach(function (url) {
        Kemist.Resources._load(url);
      });
    } else {
      Kemist.Resources._load(urlOrArr);
    }
  },

  /**
   * Loads a resource
   * 
   * @param {string} url
   */
  _load: function(url) {
    if (Kemist.Resources.cache[url]) {
      Kemist.Resources.index++;
      Kemist.Resources.progressCallbacks.forEach(function (func) {
        func(Kemist.Resources.index, Kemist.Resources.count);
      });
      return Kemist.Resources.cache[url];
    } else {
      var img = new Image();
      img.onload = function () {
        Kemist.Resources.cache[url] = img;
        Kemist.Resources.index++;
        Kemist.Resources.progressCallbacks.forEach(function (func) {
          func(Kemist.Resources.index, Kemist.Resources.count);
        });
        if (Kemist.Resources.isReady()) {
          Kemist.Resources.readyCallbacks.forEach(function (func) {
            func();
          });
        }
      };
      Kemist.Resources.cache[url] = false;
      img.src = url;
    }
  },

  /**
   * Gets a resource
   * 
   * @param {string} url
   */
  get: function(url) {
    return Kemist.Resources.cache[url];
  },

  /**
   * Detects if all resources are load
   * 
   * @returns {Boolean}
   */
  isReady: function() {
    var ready = true;
    for (var k in Kemist.Resources.cache) {
      if (Kemist.Resources.cache.hasOwnProperty(k) &&
              !Kemist.Resources.cache[k]) {
        ready = false;
      }
    }
    return ready;
  },

  /**
   * Adds a callback function occurs when resources are loaded
   * 
   * @param {type} func
   */
  onReady: function(func) {
    Kemist.Resources.readyCallbacks.push(func);
  },
  
  /**
   * Adds a callback function occurs when resources are being loaded
   * 
   * @param {type} func
   */  
  onProgress: function(func) {
    Kemist.Resources.progressCallbacks.push(func);
  }
  
};


    


/**
 * 
 * Sprite
 * 
 * @version 1.0.0
 * 
 * @param {string} url 
 * @param {Array} pos 
 * @param {Array} size 
 * @param {int} speed 
 * @param {Array} frames 
 * @param {string} dir 
 * @param {bool} once 
 */
Kemist.Sprite = function(url, pos, size, speed, frames, dir, once){
  this.pos = pos;
  this.size = size;
  this.speed = typeof speed === 'number' ? speed : 0;
  this.frames = frames;
  this._index = 0;
  this.url = url;
  this.dir = dir || 'horizontal';
  this.once = once;
};

Kemist.Sprite.prototype = {
  
  /**
   * Updates a sprite frame
   * 
   * @param {float} dt
   */
  update: function (dt) {
    this._index += this.speed * dt;
  },
  
  /**
   * Renders sprite
   * 
   * @param {2Dcontext} ctx
   */
  render: function (ctx) {
    var frame;

    if (this.speed > 0) {
      var max = this.frames.length;
      var idx = Math.floor(this._index);
      frame = this.frames[idx % max];

      if (this.once && idx >= max) {
        this.done = true;
        frame = this.frames[this.frames.length - 1];
      }
    }
    else if (!this.done) {
      frame = 0;
    }

    var x = this.pos[0];
    var y = this.pos[1];

    if (this.dir == 'vertical') {
      y += frame * this.size[1];
    }
    else {
      x += frame * this.size[0];
    }
    ctx.drawImage(Kemist.Resources.get(this.url),
            x, y,
            this.size[0], this.size[1],
            0, 0,
            this.size[0], this.size[1]);
  },
  
  /**
   * Checks if sprite collided to another
   * 
   * @param {Sprite} sprite
   * 
   * @returns {bool}
   */
  collide: function(sprite){
    return Kemist.boxCollides(this.pos,this.size,sprite.pos,sprite.size);
  }
};


/**
 * Cookie object
 * 
 * @version 1.0.0
 */
Kemist.Cookie = {
    /**
     * Sets a cookie value
     */
    set: function ( name, value, expires, path, domain, secure ){
            // set time, it's in milliseconds
            var today = new Date();
            today.setTime( today.getTime() );

            if ( expires ){
              // Expiry in minutes
              expires = expires * 1000 * 60;
            }
            var expires_date = new Date( today.getTime() + (expires) );

            document.cookie = name + "=" +escape( value ) +
            ( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
            ( ( path ) ? ";path=" + path : "" ) +
            ( ( domain ) ? ";domain=" + domain : "" ) +
            ( ( secure ) ? ";secure" : "" );

          },
          
    /**
     * Gets a cookie value
     * Call without argument if you need all cookies as an object
     */         
    get: function (name){
      var a_all_cookies = document.cookie.split( ';' );
      var a_temp_cookie = '';
      var cookie_name = '';
      var cookie_value = '';
      var get_all = (name == null);
      var all = {};

      for ( var i = 0; i < a_all_cookies.length; i++ ){
        a_temp_cookie = a_all_cookies[i].split( '=' );
        cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

        if ( cookie_name == name || get_all){
          if ( a_temp_cookie.length > 1 ){
            cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
          }

          if (!get_all){
            return cookie_value;
            break;
          }else{
            all[cookie_name] = cookie_value;
          }
        }
        a_temp_cookie = null;
        cookie_name = '';
      }

      if (get_all){
        return all;
      }
      return null;
    },
    
    /**
     * Deletes a cookie
     */
    unset: function( name, path, domain ) {
      if ( this.get( name ) ){
          document.cookie = name + "=" +
        ( ( path ) ? ";path=" + path : "") +
        ( ( domain ) ? ";domain=" + domain : "" ) +
        ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
      }
    }
};


// A cross-browser requestAnimationFrame
// See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
var requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(callback) {
            window.setTimeout(callback, 1000 / 60);
          };
})();


Kemist.collides = function(x, y, r, b, x2, y2, r2, b2) {
  return !(r <= x2 || x > r2 ||
          b <= y2 || y > b2);
};

Kemist.boxCollides = function(pos, size, pos2, size2) {
  return Kemist.collides(pos[0], pos[1],
          pos[0] + size[0], pos[1] + size[1],
          pos2[0], pos2[1],
          pos2[0] + size2[0], pos2[1] + size2[1]);
};


/**
 * 
 * Audio
 * 
 * @version 1.0.0
 */

Kemist.Audio = {
  muted: false,
  polyphony: 2,
  resources: [],
  
  add: function(sounds){    
    for (var i=0;i<sounds.length;i++){
      var obj={};
      obj.polyphony=(typeof sounds[i].polyphony !== 'undefined' ? sounds[i].polyphony : true);  
      obj.volume=(typeof sounds[i].volume !== 'undefined' ? sounds[i].volume : 1);  
      var voices=(obj.polyphony ? Kemist.Audio.polyphony : 1);
      for (var j=0;j<voices;j++){
        var sound=new Audio();
        sound.src=sounds[i].url;
        sound.load();
        obj[j]=sound;
      }
      obj.last=0;      
      obj.loop=(typeof sounds[i].loop !== 'undefined' ? sounds[i].loop : false);
      obj.url=sounds[i].url;
      Kemist.Audio.resources[sounds[i].name]=obj;
    }
  },
  
  play: function(name, volume){
    if (Kemist.Audio.muted || typeof(Kemist.Audio.resources[name]) == 'undefined'){
      return null;
    }
    Kemist.Audio.resources[name].last+=(Kemist.Audio.resources[name].polyphony ? 1 : 0);
    var voice=(Kemist.Audio.resources[name].last > (Kemist.Audio.polyphony-1) ? 0 : Kemist.Audio.resources[name].last);
    
    Kemist.Audio.resources[name][voice].src=Kemist.Audio.resources[name].url;
    if (typeof volume !== 'undefined'){
      Kemist.Audio.resources[name][voice].volume=volume;  
    }else{
      Kemist.Audio.resources[name][voice].volume=1; 
    }
    Kemist.Audio.resources[name][voice].loop=Kemist.Audio.resources[name].loop;  
    Kemist.Audio.resources[name][voice].play();
    Kemist.Audio.resources[name].last=voice;
    Kemist.Audio.resources[name].volume=volume;
    return voice;
  },
  
  pause: function(name){
    if (typeof(Kemist.Audio.resources[name]) == 'undefined'){
      return null;
    }
    Kemist.Audio.resources[name][Kemist.Audio.resources[name].last].pause();
  },
  
  resume: function(name){
    if (typeof(Kemist.Audio.resources[name]) == 'undefined'){
      return null;
    }
    Kemist.Audio.resources[name][Kemist.Audio.resources[name].last].volume=Kemist.Audio.resources[name].volume;
    Kemist.Audio.resources[name][Kemist.Audio.resources[name].last].play();
  }
};



Kemist.Entity = function(pos, sprite, params){
  this.pos = pos;
  this.sprite = sprite;
  this.params = params || {};
};

Kemist.Entity.prototype = {
  
  collidesTo: function(entity){
    return Kemist.boxCollides(this.pos,this.sprite.size,entity.pos,entity.sprite.size);
  }
};



/**
 * 
 * Game Engine
 * 
 * @version 1.0.0
 */

Kemist.GameEngine = function(o){
  this._options={
    canvas: document.createElement("canvas"),
    width: 1024,
    height: 768,
    doubleBuffering: false,
    lives: 3,
    onInit: function(){},
    onUpdate: function(){},
    onRender: function(){},
    onGameOver: function(){},
    startingLevel: 1
  };
  Kemist.extend(this._options, o);
  
  this.level=1; 
  this.lives=this._options.lives;
  this.score=0;
  this.lastTime=0;
  this.gameTime=0;
  this.isGameOver=false;
  this.isPaused=false;
  this.stopped=false;
  this.animFrameRequested=false;
  this.ctx=null;
  
};

Kemist.GameEngine.prototype = {
  
  run: function(){
    this.init();    
    this.stopped=false;
    if (!this.animFrameRequested){
      this.animFrameRequested=true;
      this.loop();
    }
  },
  
  init: function(){
    if (this._options.doubleBuffering){
      this.realCanvas = this._options.canvas;
      this.realCtx = this.realCanvas.getContext("2d");
      this.realCanvas.width=this._options.width;
      this.realCanvas.height=this._options.height;
      
      this._options.canvas = document.createElement("canvas");  
      this.ctx = this._options.canvas.getContext("2d");  
      this._options.canvas.width=this._options.width;
      this._options.canvas.height=this._options.height;
      
    }else{
      this.ctx = this._options.canvas.getContext("2d");
      this._options.canvas.width=this._options.width;
      this._options.canvas.height=this._options.height;
    }
    var self=this;
    
    Kemist.attach(window,'blur',function(e){
      self.isPaused=true;
    });
    
    Kemist.attach(window,'focus',function(e){
      self.isPaused=false;
    });

    this.lastTime = Date.now();
    this._options.onInit(this);
  },
  
  loop: function(){    
    var self=this;
    var now = Date.now();
    var dt = (now - self.lastTime) / 1000.0;
    
    if (!self.stopped){
      self.update(dt);
      self.render();

      self.lastTime = now;
    }
    
    requestAnimFrame(function(){
      self.loop();
    });  
  },
  
  update: function(dt){
    this.gameTime += dt;
    this._options.onUpdate(dt);             
  },
  
  render: function(){
    this.ctx.fillStyle = 'white';
    this.ctx.save();
    this.ctx.translate(0,0);
    this.ctx.fillRect(0, 0, this._options.canvas.width, this._options.canvas.height);
    this.ctx.restore();    
    
    this._options.onRender(this);

    if (this._options.doubleBuffering){
      this.realCtx.drawImage(this._options.canvas, 0, 0);
    }
  },
  
  renderEntities: function(list) {
    for (var i = 0; i < list.length; i++) {
      this.renderEntity(list[i]);
    }    
  },
  
  renderEntity: function(entity) {
    this.ctx.save();
    this.ctx.translate(entity.pos[0], entity.pos[1]);
    entity.sprite.render(this.ctx);
    this.ctx.restore();    
  },
  
  die: function(){
    this.lives--;
    if (this.lives==0){
      this.isGameOver=true;
      this._options.onGameOver(this);
    }
  },
  
  reset: function(){
    this.lives=this._options.lives;
    this.score=0;
    this.isGameOver=false;
    this.level=this._options.startingLevel;      
  },
  
  stop: function(){
    this.stopped=true;
  }
  
};


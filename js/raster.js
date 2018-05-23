/**
 * Raster Xmas Game
 * 
 * @version 1.0.6
 * @author Kemist
 */

var Raster = Raster || {};

Raster.screen='start';
Raster.character='jani';

Raster.pausing=0;
Raster.gameSpeed=4;
Raster.playerSpeed=300;
Raster.distance=0;
Raster.trailCounter=0;
Raster.dieCounter=0;
Raster.boundThreshold=100;
Raster.boundTrialThreshold=5000;

Raster.leftAnimationPlaying=false;
Raster.rightAnimationPlaying=false;
Raster.lastDir=null;
Raster.died=false;
Raster.finishing=false;
Raster.finishApproach=false;
Raster.finishPlayed=false;
Raster.isPaused=false;
Raster.screenHandlerCalled=false;
Raster.chooseAnimFinished=false;
Raster.animFrameRequested=false;
Raster.touchLeft=false;
Raster.touchRight=false;

Raster.skipReady=false;
Raster.skipIntro=false;
Raster.debug=false;
Raster.immortal=false;
Raster.startingLevel=1;

Raster.player=null;

Raster.highScores=[];
Raster.highScoreReached=false;
Raster.switchScreenTimer=null;
Raster.highScoreTimeLine=null;
Raster.loader=null;

Raster.game = null;

Raster.characters=['jani','peti','zoli','simi','huni','tomi','laci'];

Raster.imageResources=[  
  // Start
    'images/bg.jpg','images/snow.png','images/snow2.png','images/snow3.png','images/start_trees_left.png',
    'images/start_trees_right.png','images/raster.png','images/snowman.png','images/logo.png','images/start.png',
    'images/sound_on.png','images/sound_off.png',
    
  // Choose
    'images/bg_choose.jpg','images/choose.png','images/logo_small.png','images/jani.png','images/peti.png',
    'images/zoli.png','images/simi.png','images/tomi.png','images/huni.png','images/laci.png',
    
  // Game
    'images/score_bg.png','images/lives_bg.png','images/life.png','images/death.png','images/jani_head.png','images/peti_head.png',
    'images/zoli_head.png','images/simi_head.png','images/tomi_head.png','images/huni_head.png','images/laci_head.png',
    'images/jani_player.png','images/gift1.png','images/gift2.png','images/gift3.png','images/gift4.png','images/gift5.png',
    'images/gift6.png','images/gift7.png','images/ready.png','images/steady.png','images/go.png','images/stone.png','images/stone2.png',
    'images/tree1.png','images/tree2.png','images/trail.png','images/snowman2.png','images/start_flag.png','images/raster2.png',
    'images/jani_sprite.png','images/tree3.png','images/finish_flag.png','images/explosion2.png','images/score100.png',
    'images/score200.png','images/score300.png','images/score400.png','images/score500.png','images/score600.png','images/score700.png',
    'images/game_over.png','images/end_score.png','images/zoli_player.png','images/huni_player.png','images/simi_player.png',
    'images/peti_player.png','images/tomi_player.png','images/laci_player.png','images/huni_sprite.png','images/laci_sprite.png',
    'images/peti_sprite.png','images/simi_sprite.png','images/tomi_sprite.png','images/zoli_sprite.png',

  // Highscore
    'images/highscore_table.png','images/highscore_table.png','images/hs_left.png','images/hs_right.png',
    'images/highscore_title.png','images/rank1.png','images/rank2.png','images/highscore_title.png','images/highscore_title.png',
    'images/hs_zoli.png','images/hs_jani.png','images/hs_peti.png','images/hs_laci.png','images/hs_tomi.png','images/hs_huni.png',
    'images/hs_simi.png'
  ]
;

Raster.soundResources=[
  {name:'explosion', url:'sounds/explosion.mp3'},
  {name:'finish', url:'sounds/finish.mp3'},
  {name:'game_over', url:'sounds/game_over.mp3'},
  {name:'gift', url:'sounds/gift2.mp3'},
  {name:'go', url:'sounds/go.mp3'},
  {name:'heart', url:'sounds/heart.mp3'},
  {name:'ready', url:'sounds/ready.mp3'},
  {name:'steady', url:'sounds/steady.mp3'},
//  {name:'music', url:'sounds/green_day_basket_case.mp3', loop: true, polyphony: false, volume: 0.2}
  {name:'music', url:'sounds/jingle_bell_rock.mp3', loop: true, polyphony: false, volume: 0.2}
];

Raster.trees = {
  '1': {
    img: 'images/tree1.png',
    size: [160, 225]
  },
  '2': {
    img: 'images/tree2.png',
    size: [148, 234]
  }
};

Raster.stones = {
  '1': {
    img: 'images/stone.png',
    size: [107, 47]
  },
  '2': {
    img: 'images/stone2.png',
    size: [95, 39]
  }
};

Raster.gifts = {
  '1': {
    img: 'images/gift1.png',
    size: [83, 80],
    score: 100
  },
  '2': {
    img: 'images/gift2.png',
    size: [88, 65],
    score: 200
  },
  '3': {
    img: 'images/gift3.png',
    size: [95, 89],
    score: 300
  },
  '4': {
    img: 'images/gift4.png',
    size: [83, 74],
    score: 400
  },
  '5': {
    img: 'images/gift5.png',
    size: [90, 85],
    score: 500
  },
  '6': {
    img: 'images/gift6.png',
    size: [83, 81],
    score: 600
  },
  '7': {
    img: 'images/gift7.png',
    size: [83, 75],
    score: 700
  }
};

Raster.levelDistances=[0,10000,12000,14000,16000,18000,20000,24000,28000,32000,36000,
                      40000,50000,60000,70000,80000,90000,100000,110000,120000,130000,
                      140000,150000,160000,170000,180000,190000,1100000,1110000,1120000,1130000];

Raster.background_objects=[];
Raster.gift_objects=[];
Raster.explosions=[];
Raster.trails=[];
Raster.stone_objects=[];
Raster.heart_objects=[];
Raster.finish=null;


/**
 * Draws active screen content
 */
Raster.handleScreen = function(){
  if (Raster.screenHandlerCalled==true){
    return;
  }
  Raster.log('Screen handler called for '+Raster.screen);
  Raster.screenHandlerCalled=true;
  
  switch (Raster.screen){
    case 'start':
      TweenLite.set([$("#start-trees-left, #start-trees-right, #start-snowman")], {transformPerspective:500});
  
      var tl1  = new TimelineMax({repeat:0});
      tl1.add( TweenLite.fromTo('#screen-start .hill-back', 1, {autoAlpha: 0, y:'100%'},{display: 'block',autoAlpha:1, y:'0%', ease:"Expo.easeInOut"}),'start' );
      tl1.add( TweenLite.fromTo("#start-trees-left", 1.5, {rotationX:90}, {display: 'block',rotationX:0, skewX:-2, transformOrigin:"50% bottom", ease:Elastic.easeOut, immediateRender:true}),'trees');
      tl1.add( TweenLite.fromTo("#start-trees-right", 2, {rotationX:90}, {display: 'block',rotationX:0, skewX:2, transformOrigin:"50% bottom", ease:Elastic.easeOut, immediateRender:true}),'trees+=0.5');
      tl1.add( TweenLite.fromTo("#start-snowman", 1.5, {rotationX:90}, {display: 'block',rotationX:0, skewX:-2, transformOrigin:"50% bottom", ease:Elastic.easeOut, immediateRender:true}),'trees+=1');
      tl1.add( TweenLite.fromTo('#start-raster', 1, {autoAlpha: 0, scale:0},{scale: 1, autoAlpha: 1, display: 'block', ease:"Expo.easeIn"}),'trees' );
      tl1.add( TweenLite.fromTo("#start-logo", 0.7,{rotation:'-360', scale: 0}, {display: 'block',rotation:0, scale: 1, ease:'Expo.easeOut', immediateRender:true}),'trees+=1.5');
      tl1.add( TweenLite.fromTo("#start-button", 0.5,{rotation:360, scale: 0},{rotation: 0, scale: 1, display: 'block', ease:'Expo.easeOut', immediateRender:true}),'trees+=1.7');
      
      var tl2  = new TimelineMax({repeat:-1, yoyo:true,delay: 3});
      tl2.add( TweenLite.to('#start-button', 0.3, { scale: 0.95}),'start' );
      
      var tl3  = new TimelineMax({repeat:0, delay: 0});
      tl3.add( TweenLite.fromTo('#screen-start .falling-snow', 5, { autoAlpha: 0},{display: 'block', autoAlpha: 1, ease:"Expo.easeInOut"}),'start' );
            
      if (Raster.switchScreenTimer==null){
        Raster.switchScreenTimer = setTimeout(Raster.initSwitchScreenTimer,10000);
      }
      break;
      
    case 'choose':    
      Raster.clearSwitchScreenTimer();
      Kemist.shuffle(Raster.characters);
      for (var i=0;i<=Raster.characters.length;i++){
        $('#screen-choose .character.pos'+i).attr('id',Raster.characters[i]);
      }
      var tl4  = new TimelineMax({repeat:0});
      tl4.add(TweenLite.fromTo('#choose-logo', 1, {autoAlpha: 0, rotation: 180, scale: 0},{display: 'block', autoAlpha: 1, rotation: 0, scale: 1, ease:"Expo.easeInOut"}),'choose' );
      tl4.add(TweenMax.staggerFromTo('#screen-choose .character', 1.5, {autoAlpha: 0, scale: 0}, {display: 'block',autoAlpha:1, scale: 0.9, ease:"Elastic.easeOut"}, 0.2, function(){ $('#screen-choose .character').addClass('loaded');}),'choose+=0.3');
      tl4.add(TweenLite.fromTo("#choose-button", 0.5,{rotation:360, scale: 0},{display: 'block', rotation: 0, scale: 1, ease:'Expo.easeOut', immediateRender:true}),'choose+=2');
      tl4.eventCallback("onComplete", function(){Raster.chooseAnimFinished=true;}, []);
      
      var tl5  = new TimelineMax({repeat:-1, yoyo:true,delay: 3});
      tl5.add( TweenLite.to('#choose-button', 0.3, { scale: 0.95}),'choose' );
            
      break;
      
    case 'game':
      Raster.clearSwitchScreenTimer();
      $('#lives-box #head').addClass(Raster.character).attr('title',Raster.character.toUpperCase());
      Raster.resetGame();
      Raster.game.run();
      
      var tl6  = new TimelineMax({repeat:0});
      tl6.add(TweenLite.fromTo('#lives-box', 1, {autoAlpha: 0, x: '+100%'},{display: 'block', autoAlpha: 1, x:'0%', ease:"Expo.easeInOut"}),'game' );
      tl6.add(TweenLite.fromTo('#score-box', 1, {autoAlpha: 0, x: '-100%'},{display: 'block', autoAlpha: 1, x:'0%', ease:"Expo.easeInOut"}),'game' );
      tl6.add(TweenLite.fromTo('#guide', 1, {autoAlpha: 0, scale: 0},{display: 'block', autoAlpha: 1, scale:1, ease:"Expo.easeInOut"}),'game+=0.5' );
      tl6.add(TweenLite.fromTo('#level-box', 1, {autoAlpha: 0, scale: 0},{display: 'block', autoAlpha: 1, scale:1, ease:"Expo.easeInOut"}),'game+=0.5' );
      tl6.add(TweenLite.fromTo('.touch', 1, {autoAlpha: 0},{display: 'block', autoAlpha: 0.8, ease:"Expo.easeInOut"}),'game+=1' );
      tl6.add(TweenLite.fromTo('.touch', 1, {autoAlpha: 0.8},{autoAlpha: 0, ease:"Expo.easeInOut"}),'game+=3' );
      
      break;
      
    case 'highscore':
      TweenLite.set([$("#highscore-left, #highscore-right")], {transformPerspective:500});
      var tl10  = new TimelineMax({repeat:0});
      tl10.add( TweenLite.fromTo('#screen-highscore .hill-back', 1, {autoAlpha: 0, y:'100%'},{display: 'block',autoAlpha:1, y:'0%', ease:"Expo.easeInOut"}),'highscore' );
      tl10.add( TweenLite.fromTo("#highscore-left", 1.5, {rotationX:90}, {display: 'block',rotationX:0, transformOrigin:"50% bottom", ease:Elastic.easeOut, immediateRender:true}),'back');
      tl10.add( TweenLite.fromTo("#highscore-right", 2, {rotationX:90}, {display: 'block',rotationX:0, transformOrigin:"50% bottom", ease:Elastic.easeOut, immediateRender:true}),'back+=0.5');
      tl10.add(TweenLite.fromTo('#highscore-table', 1.5, {autoAlpha: 0, y: '-100%'},{display: 'block', autoAlpha: 1, y:'0%', ease:"Elastic.easeInOut"}),'back+=0.5' );
      tl10.add( TweenLite.fromTo("#highscore-logo", 0.5,{rotation:'-360'}, {display: 'block',rotation:0, ease:'Expo.easeOut', immediateRender:true}),'back+=1.4');
      tl10.add( TweenLite.fromTo("#highscore-title", 0.5,{rotation:360, scale: 0},{rotation: 0, scale: 1, display: 'block', ease:'Expo.easeOut', immediateRender:true}),'back+=1.4');

      var tl11  = new TimelineMax({repeat:0, delay: 0});
      tl11.add( TweenLite.fromTo('#screen-highscore .falling-snow', 5, { autoAlpha: 0},{display: 'block', autoAlpha: 1, ease:"Expo.easeInOut"}),'start' );

      if (Raster.switchScreenTimer==null){
        Raster.switchScreenTimer = setTimeout(Raster.initSwitchScreenTimer,10000);
      }
      Raster.getHighScores(function(){
        Raster.drawHighScores();
      });
      break;
  }
};


/**
 * Switch to screen
 * 
 * @param {String} screen
 */
Raster.switchScreen = function(screen){
  Raster.screenHandlerCalled=false;
  Raster.screen=screen; 
  
  switch (screen){
    case 'start':
      $('#screen-start .hill-back, #start-trees-left, #start-trees-right, #start-snowman, #start-raster, #start-logo, #start-button, #screen-start .falling-snow').hide();
      break;
    case 'choose':
      $('#choose-logo, #choose-button, #screen-choose .character').hide();
      $('#screen-choose .character').removeAttr('id').removeClass('loaded');
      Raster.chooseAnimFinished=false;
      break;
    case 'game':
      $('#lives-box, #score-box, #level-box, #ready, #steady, #go, #game-over, #end-score, .touch').hide();
      $('#lives-box #head').removeAttr('title').removeClass();
      Raster.resetGame();
      break;
    case 'highscore':
      $('#screen-highscore .hill-back, #highscore-left, #highscore-right, #highscore-table, #highscore-logo, #highscore-title, #screen-highscore .falling-snow').hide();
      break;
  }
  $('.screen.active').fadeOut(300,function(){
    $(this).removeClass('active');
    $('#screen-'+screen).fadeIn(300,function(){
      $(this).addClass('active');    
      if (!Raster.screenHandlerCalled){
        Raster.handleScreen();
      }
    });
    
  });  
};


/**
 * Initializes screen switcher timer
 */
Raster.initSwitchScreenTimer = function(){
  if (!Raster.isPaused){  
    if (Raster.screen=='start'){
      Raster.switchScreen('highscore');
    }else if (Raster.screen=='highscore' && !Raster.highScoreReached){
      Raster.switchScreen('start');
    }
  }
  Raster.switchScreenTimer = setTimeout(Raster.initSwitchScreenTimer,10000);
};


/**
 * Clears screen switcher timer
 */
Raster.clearSwitchScreenTimer = function(){
  clearTimeout(Raster.switchScreenTimer);
  Raster.switchScreenTimer=null;
};


/**
 * Logs debug info to console
 * 
 * @param string message
 */
Raster.log = function(message){
  if (Raster.debug){
    console.log('RASTER: '+message);
  }
};


/**
 * Draws lives box
 */
Raster.drawLives = function(){
  $('#lives-box .life').removeClass('death');
  for (var i=3-Raster.game.lives;i>=0;i--){
    $('#lives-box #life'+i).addClass('death');
  }
};


/**
 * Draws score box
 */
Raster.drawScore = function(){
  $('#score-box #score').html(Raster.game.score);
};


/**
 * Draws level box
 */
Raster.drawLevel = function(){
  $('#level-box #level').html(Raster.game.level);
};


/**
 * Resets game parameters
 */
Raster.resetGame = function(){
  if (Raster.game === null){
    Raster.game = new Kemist.GameEngine({
      canvas: document.getElementById("game-stage"),
      width: 1024,
      height: 768,
      doubleBuffering: false,
      lives: 3,
      onInit: Raster.startLevel,
      onUpdate: Raster.update,
      onRender: Raster.renderGame,
      onGameOver: Raster.gameOver,
      startingLevel: Raster.startingLevel
    });
  }
  
  Raster.game.reset();
  
  Raster.highScoreReached=false;
  Raster.isPaused=false; 
  Raster.gameSpeed=4;
  Raster.playerSpeed=300;
  Raster.died=false;
};


/**
 * Generates background elements
 */
Raster.generateLandscape = function(){  
  for (var i=0;i<9;i++){
    // left side
    Raster.createTree([Kemist.getRandomInt(-70,120),i*120-Kemist.getRandomInt(0,20)]);    
    // right side
    Raster.createTree([Kemist.getRandomInt(763,950),i*120-Kemist.getRandomInt(0,20)]);
  }
  
  // Snowman 
  Raster.background_objects.push(
          new Kemist.Entity(
            [Kemist.getRandomInt(763,1000),i*100-Kemist.getRandomInt(0,20)],
            new Kemist.Sprite('images/tree3.png',[0,0],[220,312]),
            {type:'snowman'}
          )
  );
  
  // Start flag
  Raster.background_objects.push(
          new Kemist.Entity(
            [200,200],
            new Kemist.Sprite('images/start_flag.png',[0,0],[88,124]),
            {type:'start'}
          )
  );
  
  // Raster Studio
  Raster.background_objects.push(
          new Kemist.Entity(
            [300,0],
            new Kemist.Sprite('images/raster2.png',[0,0],[414,217]),
            {type:'raster'}
          )
  );
};


/**
 * Creates a random tree object
 * 
 * @param {Array} pos
 */
Raster.createTree = function(pos){
  Raster.createRandomObject(pos,'tree','background_objects');
};


/**
 * Creates a random stone object
 * 
 * @param {Array} pos
 */
Raster.createStone = function(pos){
  Raster.createRandomObject(pos,'stone');
};


/**
 * Creates a random gift object
 * 
 * @param {Array} pos
 */
Raster.createGift = function(pos){
  Raster.createRandomObject(pos,'gift');
};


/**
 * Creates a random object
 * 
 * @param {Array} pos
 * @param {string} type
 * @param {Array} items
 */
Raster.createRandomObject = function(pos, type, container){
  var items=Raster[type+'s'];
  var index=Kemist.getRandomInt(1,Object.keys(items).length);
  var item=items[index];
  
  var obj=new Kemist.Entity(
    pos,
    new Kemist.Sprite(item.img,[0,0],[item.size[0],item.size[1]]),
    {type:type}
  );
  
  if (typeof container === 'undefined'){
    Raster[type+'_objects'].push(obj);
  }else{
    Raster[container].push(obj);
  }  
};



/**
 * Clears all objects from screen
 */
Raster.clearObjects = function(){
  Raster.background_objects=[];
  Raster.gift_objects=[];
  Raster.explosions=[];
  Raster.trails=[];
  Raster.stone_objects=[];
  Raster.heart_objects=[];
};


/**
 * Starts a level
 */
Raster.startLevel = function(){  
  Raster.clearObjects();
  Raster.generateLandscape();  
  Raster.drawLevel();  
  Raster.drawLives();  
  Raster.drawScore();  
    
  Raster.gameSpeed=Math.round(Raster.game.level*0.7)+4;
  Raster.playerSpeed=Math.round(Raster.gameSpeed*75);
  Raster.distance=0;
  Raster.finish=null;
  Raster.finishing=false;  
  Raster.finishApproach=false;
  Raster.finishPlayed=false;
  
  Raster.log('Level '+Raster.game.level+' started, gameSpeed:'+Raster.gameSpeed+', playerSpeed:'+Raster.playerSpeed);
   
  Raster.player = new Kemist.Entity(
    [470, 200],
    new Kemist.Sprite('images/'+Raster.character+'_player.png', [0, 0], [87, 105]),
    {type:'player'}
  );
  

  if (!Raster.skipReady){    
    Raster.pausing=210;
    var tl7  = new TimelineMax({repeat:0, delay: 1});
    tl7.add(TweenLite.fromTo('#ready', 1, {autoAlpha: 0, scale: 0}, {display: 'block',autoAlpha:1, scale: 1, ease:"Elastic.easeOut",onStart: function(){Raster.playSound('ready',0.5);}}),'ready' );
    tl7.add(TweenLite.fromTo('#ready', 1, {autoAlpha: 1, y:'0%'},{autoAlpha: 0, y: '-50%', ease:"Expo.easeOut"}) );
    tl7.add(TweenLite.fromTo('#steady', 1, {autoAlpha: 0, scale: 0}, {display: 'block',autoAlpha:1, scale: 1, ease:"Elastic.easeOut",onStart: function(){Raster.playSound('steady',0.5);}}),'-=0.8' );
    tl7.add(TweenLite.fromTo('#steady', 1, {autoAlpha: 1, y:'0%'},{autoAlpha: 0, y: '-50%', ease:"Expo.easeOut"}) );
    tl7.add(TweenLite.fromTo('#go', 1, {autoAlpha: 0, scale: 0}, {display: 'block',autoAlpha:1, scale: 1, ease:"Elastic.easeOut",onStart: function(){Raster.playSound('go',0.5);}}),'-=0.8' );
    tl7.add(TweenLite.fromTo('#go', 1, {autoAlpha: 1, y:'0%'},{autoAlpha: 0, y: '-50%', ease:"Expo.easeOut"}) );
  }
};


/**
 * Player died
 */
Raster.die = function(){
  Raster.playSound('explosion',0.5);
  Raster.game.die();
  Raster.drawLives();
  Raster.died=true;
  if (!Raster.game.isGameOver){
    Raster.pausing=50;    
    Raster.dieCounter=250;
  }

  Raster.explosions.push(new Kemist.Entity(
    [Raster.player.pos[0]+0,Raster.player.pos[1]+0],
    new Kemist.Sprite('images/explosion2.png',
                           [22, 0],
                           [103, 103],
                           16,
                           [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                           null,
                           true),
      {type:'explosion'}
  ));
  Raster.player.pos=[-200,-200];
};


/**
 * Game is over
 */
Raster.gameOver = function(){
  var tl8  = new TimelineMax({repeat:0, delay: 1});
  tl8.add(TweenLite.fromTo('#game-over', 1, {autoAlpha: 0, scale: 0, rotation: '360deg'}, {display: 'block',autoAlpha:1, scale: 1, rotation: 0, ease:"Elastic.easeOut",onStart: function(){Raster.playSound('game_over');}}),'game_over' );
  tl8.add(TweenLite.fromTo('#end-score', 1, {autoAlpha: 0, scale: 0},{display: 'block', autoAlpha: 1, scale: 1, ease:"Expo.easeOut"}),'game_over+=1' );

  $('#end-score-nr').html(Raster.game.score);

  var tl9  = new TimelineMax({repeat:6, yoyo:true,delay: 3, onComplete: function(){Raster.game.stop(); Raster.switchScreen('highscore');}});
  tl9.add( TweenLite.fromTo('#end-score', 0.3, {scale: 1},{ scale: 0.95}),'game-over' );
};


/**
 * Updates game objects
 * 
 * @param {Number} dt
 * 
 */
Raster.update = function(dt){   
  if (!Raster.game.isGameOver){
    Raster.handleInput(dt);    
  }
  
  Raster.updateEntities(dt);              
};


/**
 * Handles keyboard input
 * 
 * @param {Number} dt
 * 
 */
Raster.handleInput = function(dt) {
  if (Raster.pausing>0 || Raster.finishing===true){
    return;
  }
  
  var move_speed=0;
  
  if (Kemist.Input.isDown('LEFT') || Kemist.Input.isDown('a') || Raster.touchLeft) {
    move_speed=(Raster.touchLeft ? Math.round(Raster.playerSpeed * dt/2): Math.round(Raster.playerSpeed * dt));
    Raster.player.pos[0] -= move_speed;  
    if (!Raster.leftAnimationPlaying && Raster.lastDir!='left'){
      Raster.player.sprite=new Kemist.Sprite('images/'+Raster.character+'_sprite.png',
                           [0, 105],
                           [94, 105],
                           16,
                           [0, 1, 2, 3],
                           null,
                           true);
      Raster.leftAnimationPlaying=true;
      Raster.lastDir='left';
      Raster.log(Raster.lastDir+' arrow pressed');      
    }
    
  }else if (Kemist.Input.isDown('RIGHT') || Kemist.Input.isDown('d') || Raster.touchRight) {
    move_speed=(Raster.touchRight ? Math.round(Raster.playerSpeed * dt/2): Math.round(Raster.playerSpeed * dt));
    Raster.player.pos[0] += move_speed;
    if (!Raster.rightAnimationPlaying && Raster.lastDir!='right'){
      Raster.player.sprite=new Kemist.Sprite('images/'+Raster.character+'_sprite.png',
                           [0, 0],
                           [94, 105],
                           16,
                           [0, 1, 2, 3],
                           null,
                           true);
      Raster.rightAnimationPlaying=true;
      Raster.lastDir='right';
      Raster.log(Raster.lastDir+' arrow pressed');     
    }
  }else{
    if (Raster.lastDir){
      Raster.log(Raster.lastDir+' arrow released');
      Raster.lastDir=null;
    }
    Raster.player.sprite=new Kemist.Sprite('images/'+Raster.character+'_player.png', [0, 0], [87, 105]);
    Raster.leftAnimationPlaying=false;
    Raster.rightAnimationPlaying=false;
  }

  if (Raster.player.pos[0] < 0) {
    Raster.player.pos[0] = 0;
  }

  if (Raster.player.pos[0] > Raster.game._options.canvas.width - Raster.player.sprite.size[0] + 10) {
    Raster.player.pos[0] = Raster.game._options.canvas.width - Raster.player.sprite.size[0] + 10;
  }
    
};


/**
 * Updates game entities
 * 
 * @param {Number} dt
 */
Raster.updateEntities = function(dt) {   
  if (Raster.isPaused){
    return;
  }
  
  Raster.distance+=Raster.gameSpeed;    
  Raster.finishApproach=(Raster.levelDistances[Raster.game.level]-Raster.distance < 2000);
  Raster.finishing=(Raster.levelDistances[Raster.game.level]-Raster.distance < 500);
  
  // Update all the explosion animations
  for (var i = 0; i < Raster.explosions.length; i++) {
    Raster.explosions[i].sprite.update(dt);

    if (Raster.explosions[i].sprite.done) {
      Raster.explosions.splice(i, 1);
      i--;
    }
  }
  
  //Create trails
  if (!Raster.pausing){
    Raster.trailCounter+=Raster.gameSpeed;  
    if (Raster.trailCounter>=8){
      Raster.trailCounter=0;
      Raster.trails.push(new Kemist.Entity(
        [Raster.player.pos[0],Raster.player.pos[1]+Math.round(Raster.player.sprite.size[1]/2)],
        new Kemist.Sprite('images/trail.png',[0,0],[96,45]),
        {type: 'trail'}
      ));
    }
  }
  
  if (Raster.game.isGameOver){
    return;
  }
  
  // Move trails
  if (!Raster.pausing && !Raster.finishing && !Raster.died){
    for(var i=0; i<Raster.trails.length; i++) {
      var obj=Raster.trails[i];
      obj.pos[1]-=Raster.gameSpeed;
      if (obj.pos[1] < (obj.sprite.size[1]*-1)) {
        Raster.trails.splice(i, 1);
        i--;
        continue;
      }
    } 
  }
  
  // Handle pausing
  if (Raster.pausing>0){
    Raster.pausing--;
    if (Raster.pausing==0 && Raster.died){
      Raster.player.pos=[470, 200]; 
      Raster.died=false;
    }
    return;
  }  
  
  
  // Immortal for few seconds after respawn
  if (Raster.dieCounter>0){
    Raster.dieCounter-=5;
    if (Raster.dieCounter % 50 < 20){
      Raster.player.pos[1]=-200;
    }else{
      Raster.player.pos[1]=200;
    }
  }else if(!Raster.finishing){
    Raster.player.pos[1]=200;
  }
    
  
  // Animate turning left/right
  if (Raster.leftAnimationPlaying){
    Raster.player.sprite.update(dt);
    if (Raster.player.sprite.done){
      Raster.leftAnimationPlaying=false;
    }
    Raster.rightAnimationPlaying=false;
  }else if (Raster.rightAnimationPlaying){
    Raster.player.sprite.update(dt);
    if (Raster.player.sprite.done){
      Raster.rightAnimationPlaying=false;
    }
    Raster.leftAnimationPlaying=false;
  }
        
        
  // Move background objects
  if (!Raster.finishing){
    for(var i=0; i<Raster.background_objects.length; i++) {
      var obj=Raster.background_objects[i];
      obj.pos[1]-=Raster.gameSpeed;
      if (obj.pos[1] < (obj.sprite.size[1]*-1)) {
        Raster.background_objects.splice(i, 1);
        i--;
        if (obj.params.type=='tree'){
          var x,y;
          x=(obj.pos[0]<120 ? Kemist.getRandomInt(-70,120) : Kemist.getRandomInt(763,950));
          y=800+Kemist.getRandomInt(0,100);          
          Raster.createTree([x,y]);

        }else if(obj.params.type=='snowman'){
            Raster.background_objects.push(new Kemist.Entity(
              [Kemist.getRandomInt(700,900),850],
              new Kemist.Sprite('images/tree3.png',[0,0],[220,312]),
              {type: 'snowman'}
            ));
        }
        continue;
      }
      // Check background object collisions
      if (!Raster.immortal 
          &&
          (obj.params.type=='tree' || obj.params.type=='snowman')
          &&
          Raster.dieCounter<1
          &&
          !Raster.died
          &&
          Kemist.boxCollides([obj.pos[0]+obj.sprite.size[0]/3,obj.pos[1]+obj.sprite.size[1]/3],[obj.sprite.size[0]/2,obj.sprite.size[1]/2],Raster.player.pos,Raster.player.sprite.size)
        ){
        Raster.log('Collision to a '+obj.type);
        Raster.die();
      }
    }  
  }
    
  
  // Create stones
  if (!Raster.finishApproach && Raster.stone_objects.length < Math.min(Math.round((Raster.game.level *1.05)+0.3),4)){
    Raster.createStone(Raster.getConflictlessCoordinates('stone'));
  }
  
  // Move stones
  if (!Raster.finishing){
    for(var i=0; i<Raster.stone_objects.length; i++) {
      var obj=Raster.stone_objects[i];
      obj.pos[1]-=Raster.gameSpeed;
      if (obj.pos[1] < (obj.sprite.size[1]*-1)) {
        Raster.stone_objects.splice(i, 1);
        i--;
        continue;
      }
      // Check stone collision
      if (Raster.dieCounter<1
          &&
          !Raster.immortal 
          &&
          !Raster.died
          &&
          Kemist.boxCollides([obj.pos[0]+obj.sprite.size[0]/3,obj.pos[1]+obj.sprite.size[1]/3],
                      [obj.sprite.size[0]/2,obj.sprite.size[1]/2],
                      [Raster.player.pos[0],Raster.player.pos[1]+Raster.player.sprite.size[1]],
                      [Raster.player.sprite.size[0],1])
        ){
        Raster.log('Collision to a stone');
        Raster.die();
      }
    }
  }
  
  // Create gifts
  if (!Raster.finishApproach && Raster.gift_objects.length < 4){
    Raster.createGift(Raster.getConflictlessCoordinates('gift'));
  }
  
  // Move Gifts
  for(var i=0; i<Raster.gift_objects.length; i++) {
    var obj=Raster.gift_objects[i];
    if (Raster.finishing && !obj.scored){
      continue;
    }
    obj.pos[1]-=obj.scored ? Math.round(Raster.gameSpeed*1.5) : Raster.gameSpeed;
    if (obj.pos[1] < (obj.sprite.size[1]*-1)) {
      Raster.gift_objects.splice(i, 1);
      i--;
      continue;
    }
    // Check gift taking
    if (Raster.dieCounter<1
        &&
        obj.scored!=true
        &&
        !Raster.died
        &&
        obj.collidesTo(Raster.player)
      ){
      var points=0, gift;
      for (var index in Raster.gifts) { 
        gift = Raster.gifts[index]; 
        if (gift.img===obj.sprite.url){
          points=gift.score;
          break;
        }
      }
      Raster.game.score+=points;
      Raster.playSound('gift',0.5);
      Raster.drawScore();
      Raster.log('Collision to a gift, scored '+points+'.');
      obj.scored=true;
      obj.sprite=new Kemist.Sprite('images/score'+points.toString()+'.png',[0,0],[49,29]);
    }
  }
  
  
  // Create extra lives
  if (!Raster.finishApproach && Raster.game.lives  < 3 && Raster.heart_objects.length < 1 && Kemist.getRandomInt(1,400)==1){
    Raster.heart_objects.push(new Kemist.Entity(
      Raster.getConflictlessCoordinates('extra life'),
      new Kemist.Sprite('images/life.png',[0,0],[29,23]),
      {type:'extra_life'}
    ));
  }
  
  // Move extra lives
  if (!Raster.finishing){    
    for(var i=0; i<Raster.heart_objects.length; i++) {
      var obj=Raster.heart_objects[i];
      obj.pos[1]-=Raster.gameSpeed*1.2;
      if (obj.pos[1] < (obj.sprite.size[1]*-1)) {
        Raster.heart_objects.splice(i, 1);
        i--;
        continue;
      }
      // Check extra life taking
      if (Raster.dieCounter<1
          &&
          !Raster.died
          &&
          obj.collidesTo(Raster.player)
          &&
          Raster.game.lives < 3
        ){
        Raster.playSound('heart');
        Raster.game.lives++;
        Raster.drawLives();
        Raster.log('Collision to an extra life.');
        Raster.heart_objects.splice(i, 1);
        i--;
        continue;
      }
    }
  }
  
  // Finish approaching, create finish flag
  if (Raster.finishApproach && Raster.finish==null){
    Raster.finish=new Kemist.Entity(
      [190,1600],
      new Kemist.Sprite('images/finish_flag.png',[0,0],[653,491])
    );     
  }
  // Move finish flag
  if (!Raster.finishing && Raster.finishApproach && Raster.finish != null){
    Raster.finish.pos[1]-=Raster.gameSpeed;
    if (Raster.levelDistances[Raster.game.level]-Raster.distance < 1100 && !Raster.finishPlayed){
      Raster.playSound('finish');
      Raster.finishPlayed=true;
    }
  }
  // Move player out through finish
  if (Raster.finishing){        
    Raster.player.sprite=new Kemist.Sprite('images/'+Raster.character+'_player.png', [0, 0], [87, 105]);
    Raster.player.pos[1]+=Raster.gameSpeed;
    if (Raster.player.pos[1] > 1200){
      Raster.game.level++;
      Raster.startLevel();
    }
  }
  
  if (Raster.debug){
    $('#debug').html('Distance: '+Raster.distance+'/'+Raster.levelDistances[Raster.game.level]+', stones: '+Raster.stone_objects.length+', gifts:'+Raster.gift_objects.length+', background objects: '+Raster.background_objects.length);    
  }
};


/**
 * Check object bounding conflicts to a set of elements
 * 
 * @param {int} x
 * @param {int} y
 * @param {Array} size
 * @param {Array} elements
 * 
 * @returns {Boolean}
 */
Raster.checkConflicts = function(x,y,size,elements){
  var same=false;
  for (var i=0; i<elements.length; i++) {    
    if (Kemist.boxCollides([x-Raster.boundThreshold,y-Raster.boundThreshold],
                    [size[0]+Raster.boundThreshold,size[1]+Raster.boundThreshold],
                    [elements[i].pos[0]-Raster.boundThreshold,elements[i].pos[1]-Raster.boundThreshold],
                    [elements[i].sprite.size[0]+Raster.boundThreshold,elements[i].sprite.size[1]+Raster.boundThreshold])){
      same=true;
      break;
    }
  }
  return same;
};


/**
 * Gets coordinates without conflicts any gift/stone
 * 
 * @param {string} type
 * 
 * @returns {Array}
 */
Raster.getConflictlessCoordinates = function(type){
  var same_stone=true;
  var same_gift=true;
  var x,y, ct=0;
  x=Kemist.getRandomInt(200,700);
  y=Kemist.getRandomInt(800,1600);
  while (same_stone || same_gift){      
    if (ct > Raster.boundTrialThreshold){
      break;
    }      
    same_stone=Raster.checkConflicts(x,y,[107,47],Raster.stone_objects);
    same_gift=Raster.checkConflicts(x,y,[95,89],Raster.gift_objects);
    ct++; 
    if (same_stone || same_gift){
      x=Kemist.getRandomInt(200,700);
      y=Kemist.getRandomInt(800,1600);
      same_stone=same_gift=true;
      Raster.log('Generating '+type+' conflicts:'+ct);
    }                  
  }
  return [x,y];
};


/**
 * Renders game elements
 */
Raster.renderGame = function() {   
    Raster.game.renderEntities(Raster.stone_objects);
    Raster.game.renderEntities(Raster.trails); 
    // Render the player if the game isn't over
    if(!Raster.game.isGameOver) {      
      Raster.game.renderEntity(Raster.player);      
    }     
            
    Raster.game.renderEntities(Raster.gift_objects); 
    Raster.game.renderEntities(Raster.heart_objects); 
    Raster.game.renderEntities(Raster.background_objects);                   
    Raster.game.renderEntities(Raster.explosions);    
        
    if (Raster.finish!=null){
      Raster.game.renderEntity(Raster.finish); 
    }
};



/**
 * Gets high scores
 */
Raster.getHighScores = function(callback){
    $.ajax({
      type: 'GET',
      url: 'https://rasterstudio.hu/api/xmas_scores',
      data: '',
      dataType: 'json',
      cache: false,
      crossDomain: true,
      async: true,
      contentType: 'application/x-www-form-urlencoded',
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        if (XMLHttpRequest.responseText){
          console.log(errorThrown+"\n"+XMLHttpRequest.responseText);
        }
      },      
      success: function(data, textStatus, XMLHttpRequest){
        Raster.highScores=data;
        callback();
      }
      
  });
};


/**
 * Store new high score
 */
Raster.storeHighScore = function(name){
  var now=new Date();
  var year=now.getYear()+1900;
  var month=now.getMonth()+1;
  var day=now.getDate();
  var timeStamp=year+''+(month < 10 ? '0'+month : month)+''+(day < 10 ? '0'+day : day);
  var raw_hash=CryptoJS.MD5(timeStamp+'|RaStErXmAs|'+Raster.game.level+'|'+Raster.game.score);
  var hash=raw_hash.toString(CryptoJS.enc.Hex);
  
    $.ajax({
      type: 'POST',
      url: 'https://rasterstudio.hu/api/xmas_highscore',
      data: 'hash='+escape(hash)+'&name='+name+'&score='+Raster.game.score+'&level='+Raster.game.level+'&character='+escape(Raster.character),
      dataType: 'json',
      cache: false,
      crossDomain: true,
      async: true,
      contentType: 'application/x-www-form-urlencoded',
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        if (XMLHttpRequest.responseText){
          console.log(errorThrown+"\n"+XMLHttpRequest.responseText);
        }
      },      
      success: function(data, textStatus, XMLHttpRequest){
        Raster.getHighScores(function(){
          if (Raster.highScoreTimeLine!=null){
            Raster.highScoreTimeLine.clear();
          }
          Raster.highScoreReached=false;
          Raster.game.score=0;
          Raster.drawHighScores();
        });
      }
      
  });
};


/**
 * Draws highscore box
 */
Raster.drawHighScores = function(){
  var row;
  var rank=1;
  var score=(Raster.game ? Raster.game.score : 0);
  $('#rank1, #rank2, #rank3, #rank4').removeClass('reached');
  for (var i=0;i<Raster.highScores.length;i++){
    if (rank>4){
      break;
    }
    if (!Raster.highScoreReached && score > Raster.highScores[i].score){
      Raster.highScoreReached=true;
      row=$('<div class="player-name"><input type="text" id="new-player-name" /></div><div class="score '+Raster.character+'">'+score+'</div>');
      $('#hs'+rank).html('').append(row);
      $('#rank'+rank).addClass('reached');
      rank++;
    }
    row=$('<div class="player-name">'+Raster.highScores[i].name+'</div><div class="score '+Raster.highScores[i].character+'" title="'+Raster.highScores[i].character.toUpperCase()+'">'+Raster.highScores[i].score+'</div>');
    $('#hs'+rank).html('').append(row);
    rank++;
  }
  
  if (Raster.highScores.length==0){
    Raster.highScoreReached=true;
    row=$('<div class="player-name"><input type="text" id="new-player-name" /></div><div class="score '+Raster.character+'">'+score+'</div>');
    $('#hs'+rank).html('').append(row);
    $('#rank'+rank).addClass('reached');
  }
  
  if (Raster.highScoreReached){
    Raster.highScoreTimeLine  = new TimelineMax({repeat:-1, yoyo:true,delay: 0});
    Raster.highScoreTimeLine.add( TweenLite.fromTo('#highscore-table .reached', 0.3, {scale: 1},{ scale: 1.2}));
    setTimeout(function(){$('#new-player-name').focus();},4000);
    $('#new-player-name').keypress(function(event){
       if ( event.which == 13 ) {        
        Raster.storeHighScore($(this).val());
      }
    });      
    
  }
};




/**
 * Plays specified sound
 * 
 * @param {string} filename
 */
Raster.playSound = function(name, volume){
  var voice=Kemist.Audio.play(name,volume);
  if (voice!==null){
    Raster.log(name+ ' sound played on voice '+voice);
  }
};



/**
 * Progress loading
 * 
 * @param {int} progress
 * @param {int} count
 */
Raster.loadingProgress = function(progress,count){
  Raster.loader.show();
  var percent=Math.round(progress/count*100);
  Raster.loader.attr('value',percent).html('Loading '+percent+'%');
  if (progress===count){
    Raster.loader.hide();
  }
};



$(document).ready(function(){  
  
  if (Raster.skipIntro){
    Raster.screen='game';    
  }
  
  Raster.loader = $("progress");
  Kemist.Resources.onProgress(Raster.loadingProgress);
  Kemist.Resources.onReady(Raster.handleScreen);
  Kemist.Resources.load(Raster.imageResources); 
  
  $('#screen-'+Raster.screen).fadeIn(300,function(){
    $(this).addClass('active');            
  });
  
  // Start button
  $('#start-button').click(function(){
    Raster.switchScreen('choose');
  });
  
  // Choose character
  $('#screen-choose .character').click(function(){
    if (Raster.chooseAnimFinished){
      Raster.character=$(this).attr('id');
      Raster.log('Chosen character: '+Raster.character);
      Raster.switchScreen('game');
    }
  });
  
  // Mute/Unmute
  $('#sound').click(function(){
    $(this).toggleClass('muted');
    Kemist.Audio.muted= Kemist.Audio.muted ? false : true;
    Kemist.Cookie.set('xmas_game_muted',Kemist.Audio.muted,1440,'/');
    if (Kemist.Audio.muted){      
      Kemist.Audio.pause('music');
    }else{
      Kemist.Audio.resume('music');
    }
  });
  
  // Touch left
  $('#touch_left').bind('touchstart mousedown',function(e){
    Raster.touchLeft=true;
    e.preventDefault();
  }).bind('touchend mouseup',function(){
    Raster.touchLeft=false;
  });
  
  // Touch right
  $('#touch_right').bind('touchstart mousedown',function(e){
    Raster.touchRight=true;
    e.preventDefault();
  }).bind('touchend mouseup',function(){
    Raster.touchRight=false;
  });
  
  if (Kemist.Cookie.get('xmas_game_muted')=='true'){
    Kemist.Audio.muted=true;
    $('#sound').addClass('muted');
  }else{
    Kemist.Audio.muted=false;
  }
  
  Kemist.Audio.polyphony=2;
  Kemist.Audio.add(Raster.soundResources);
  Kemist.Audio.play('music',0.4);
  
});


$(window).blur(function(){
  Raster.isPaused=true;
});
$(window).focus(function(){
  Raster.isPaused=false;
});

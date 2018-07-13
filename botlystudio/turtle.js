/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview General javaScript for Arduino app with material design.
 */
'use strict';

goog.provide('Turtle');


Turtle.HEIGHT = 400;
Turtle.WIDTH = 400;

/**
 * PID of animation task currently executing.
 * @type !Array.<number>
 */
Turtle.pidList = [];

Turtle.pause = 10;

Turtle.visible = true;

/**
 * Arduino interpreter for executing program.
 * @type Interpreter
 */
Turtle.interpreter = null;


/** Initialize function for Turtle */
Turtle.init = function() {

  var visualization = document.getElementById('visualization');


  Turtle.ctxDisplay = document.getElementById('display').getContext('2d');
  Turtle.ctxScratch = document.getElementById('scratch').getContext('2d');
  Turtle.resizeCanvas();
  Turtle.reset();


  BotlyStudio.bindClick_('button_execute', Turtle.runButtonClick);
  BotlyStudio.bindClick_('button_reset', Turtle.resetButtonClick);

  setTimeout(Turtle.importInterpreter, 1);
  // Lazy-load the syntax-highlighting.
  
  var sliderSvg = document.getElementById('slider');
  Turtle.speedSlider = new Slider(10, 35, 130, sliderSvg);
};


Turtle.resizeCanvas = function(){
  if(document.getElementById('content_code').offsetWidth != 0)
    document.getElementById('display').style.width = document.getElementById('content_code').offsetWidth + 'px';
  else{
	document.getElementById('display').style.width = document.getElementsByClassName('collapsible-header')[1].offsetWidth + 'px';
  }
}



/**
 * Load the JavaScript interperter.
 */
Turtle.importInterpreter = function() {
  //<script type="text/javascript"
  //  src="third-party/JS-Interpreter/compiled.js"></script>
  // var script = document.createElement('script');
  // script.setAttribute('type', 'text/javascript');
  // script.setAttribute('src', 'JS-Interpreter/compiled.js');
  // document.head.appendChild(script);
};


/**
 * Reset the turtle to the start position, clear the display, and kill any
 * pending tasks.
 */
Turtle.reset = function() {
  // Starting location and heading of the turtle.
  Turtle.x = Turtle.WIDTH / 2;
  Turtle.y = Turtle.HEIGHT / 2;
  Turtle.heading = 0;
  Turtle.penDownValue = true;
  Turtle.visible = true;

  // Clear the canvas.
  Turtle.ctxScratch.canvas.width = Turtle.ctxScratch.canvas.width;
  Turtle.ctxScratch.strokeStyle = '#525252';
  Turtle.ctxScratch.fillStyle = '#525252';
  Turtle.ctxScratch.lineWidth = 3;
  Turtle.ctxScratch.lineCap = 'round';
  Turtle.ctxScratch.font = 'normal 18pt Arial';
  Turtle.display();

  // Kill all tasks.
  for (var i = 0; i < Turtle.pidList.length; i++) {
    window.clearTimeout(Turtle.pidList[i]);
  }
  Turtle.pidList.length = 0;
  Turtle.interpreter = null;
};

/**
 * Copy the scratch canvas to the display canvas. Add a turtle marker.
 */
Turtle.display = function() {
  // Clear the display with black.
  Turtle.ctxDisplay.beginPath();
  Turtle.ctxDisplay.rect(0, 0,
      Turtle.ctxDisplay.canvas.width, Turtle.ctxDisplay.canvas.height);
  Turtle.ctxDisplay.fillStyle = '#F2F2F2';
  Turtle.ctxDisplay.fill();

  // Draw the user layer.
  Turtle.ctxDisplay.globalCompositeOperation = 'source-over';
  Turtle.ctxDisplay.drawImage(Turtle.ctxScratch.canvas, 0, 0);

  // Draw the turtle.
  if (Turtle.visible) {
    // Make the turtle the colour of the pen.
    // Turtle.ctxDisplay.strokeStyle = Turtle.ctxScratch.strokeStyle;
    // Turtle.ctxDisplay.fillStyle = Turtle.ctxScratch.fillStyle;
    Turtle.ctxDisplay.strokeStyle = '#EA7D00';
    Turtle.ctxDisplay.fillStyle = '#EA7D00';

    // Draw the turtle body.
    var radius = Turtle.ctxScratch.lineWidth / 2 + 10;
    Turtle.ctxDisplay.beginPath();
    Turtle.ctxDisplay.arc(Turtle.x, Turtle.y, radius, 0, 2 * Math.PI, false);
    Turtle.ctxDisplay.lineWidth = 3;
    Turtle.ctxDisplay.stroke();

    // Draw the turtle head.
    var WIDTH = 0.3;
    var HEAD_TIP = 10;
    var ARROW_TIP = 4;
    var BEND = 6;
    var radians = 2 * Math.PI * Turtle.heading / 360;
    var tipX = Turtle.x + (radius + HEAD_TIP) * Math.sin(radians);
    var tipY = Turtle.y - (radius + HEAD_TIP) * Math.cos(radians);
    radians -= WIDTH;
    var leftX = Turtle.x + (radius + ARROW_TIP) * Math.sin(radians);
    var leftY = Turtle.y - (radius + ARROW_TIP) * Math.cos(radians);
    radians += WIDTH / 2;
    var leftControlX = Turtle.x + (radius + BEND) * Math.sin(radians);
    var leftControlY = Turtle.y - (radius + BEND) * Math.cos(radians);
    radians += WIDTH;
    var rightControlX = Turtle.x + (radius + BEND) * Math.sin(radians);
    var rightControlY = Turtle.y - (radius + BEND) * Math.cos(radians);
    radians += WIDTH / 2;
    var rightX = Turtle.x + (radius + ARROW_TIP) * Math.sin(radians);
    var rightY = Turtle.y - (radius + ARROW_TIP) * Math.cos(radians);
    Turtle.ctxDisplay.beginPath();
    Turtle.ctxDisplay.moveTo(tipX, tipY);
    Turtle.ctxDisplay.lineTo(leftX, leftY);
    Turtle.ctxDisplay.bezierCurveTo(leftControlX, leftControlY,
        rightControlX, rightControlY, rightX, rightY);
    Turtle.ctxDisplay.closePath();
    Turtle.ctxDisplay.fill();
  }
};


/**
 * Click the run button.  Start the program.
 * @param {!Event} e Mouse or touch event.
 */
Turtle.runButtonClick = function(e) {
  /*if (Turtle.eventSpam(e)) {
    return;
  }
  */
  Turtle.execute();
};

/**
 * Click the reset button.  Reset the Turtle.
 * @param {!Event} e Mouse or touch event.
 */
Turtle.resetButtonClick = function(e) {
  /*if (Turtle.eventSpam(e)) {
    return;
  }
  */
  Turtle.reset();
};


/**
 * Inject the Turtle API into a JavaScript interpreter.
 * @param {!Interpreter} interpreter The JS Interpreter.
 * @param {!Interpreter.Object} scope Global scope.
 */
Turtle.initInterpreter = function(interpreter, scope) {
  // API
  var wrapper;
  wrapper = function(distance) {
    Turtle.move(distance);
  };
  interpreter.setProperty(scope, 'Avancer',
      interpreter.createNativeFunction(wrapper));
  wrapper = function(distance) {
    Turtle.move(-distance);
  };
  interpreter.setProperty(scope, 'Reculer',
      interpreter.createNativeFunction(wrapper));

  wrapper = function(angle) {
    Turtle.turn(angle);
  };
  interpreter.setProperty(scope, 'droite',
      interpreter.createNativeFunction(wrapper));
  wrapper = function(angle) {
    Turtle.turn(-angle);
  };
  interpreter.setProperty(scope, 'gauche',
      interpreter.createNativeFunction(wrapper));

  wrapper = function() {
    Turtle.penDown(false);
  };
  interpreter.setProperty(scope, 'Lever',
      interpreter.createNativeFunction(wrapper));
  wrapper = function() {
    Turtle.penDown(true);
  };
  interpreter.setProperty(scope, 'Descendre',
      interpreter.createNativeFunction(wrapper));

    wrapper = function(angle, distance, ) {
    Turtle.turnGo(angle,distance);
  };
  interpreter.setProperty(scope, 'turnGo',
      interpreter.createNativeFunction(wrapper));

  wrapper = function(width) {
    Turtle.penWidth(width);
  };
  interpreter.setProperty(scope, 'penWidth',
      interpreter.createNativeFunction(wrapper));

  wrapper = function(colour) {
    Turtle.penColour(colour);
  };
  interpreter.setProperty(scope, 'penColour',
      interpreter.createNativeFunction(wrapper));

  wrapper = function() {
    Turtle.isVisible(false);
  };
  interpreter.setProperty(scope, 'hideTurtle',
      interpreter.createNativeFunction(wrapper));
  wrapper = function(id) {
    Turtle.isVisible(true);
  };
  interpreter.setProperty(scope, 'showTurtle',
      interpreter.createNativeFunction(wrapper));

  wrapper = function(text) {
    Turtle.drawPrint(text);
  };
  interpreter.setProperty(scope, 'print',
      interpreter.createNativeFunction(wrapper));

  wrapper = function(font, size, style) {
    Turtle.drawFont(font, size, style);
  };
  interpreter.setProperty(scope, 'font',
      interpreter.createNativeFunction(wrapper));

    wrapper = function() {
    console.log("Not implemented");
  };
  interpreter.setProperty(scope, 'none',
      interpreter.createNativeFunction(wrapper));
};


/**
 * Execute the user's code.  Heaven help us...
 */
Turtle.execute = function() {
  if (!('Interpreter' in window)) {
    // Interpreter lazy loads and hasn't arrived yet.  Try again later.
    setTimeout(Turtle.execute, 250);
    return;
  }

  Turtle.reset();
  Blockly.selected && Blockly.selected.unselect();
  var code = BotlyStudio.generateJavaScript();
  Turtle.interpreter = new Interpreter(code, Turtle.initInterpreter);
  Turtle.pidList.push(setTimeout(Turtle.executeChunk_, 100));
};

Turtle.map = function(x, in_min, in_max, out_min, out_max)
{
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};


/**
 * Execute a bite-sized chunk of the user's code.
 * @private
 */
Turtle.executeChunk_ = function() {
  // All tasks should be complete now.  Clean up the PID list.
  Turtle.pidList.length = 0;
	var stepSpeed = Turtle.speedSlider.getValue();
	Turtle.pause = Turtle.map(stepSpeed, 0, 1, 20, 0) + 1;
  var go;
  do {
    try {
      go = Turtle.interpreter.step();
    } catch (e) {
      // User error, terminate in shame.
      alert(e);
      go = false;
    }
    if (go && Turtle.pause) {
      // The last executed command requested a pause.
      go = false;
      Turtle.pidList.push(
          setTimeout(Turtle.executeChunk_, Turtle.pause));
    }
  } while (go);
  // Wrap up if complete.
  if (!Turtle.pause) {
    BotlyStudio.workspace.highlightBlock(null);
    // Image complete; allow the user to submit this image to Reddit.
    Turtle.canSubmit = true;
  }
};



/**
 * Highlight a block and pause.
 * @param {string=} id ID of block.
 */
Turtle.animate = function(id) {
  Turtle.display();
  if (id) {
    BotlyStudio.workspace.highlightBlock(null);
    // Scale the speed non-linearly, to give better precision at the fast end.
    var stepSpeed = 1000 * Math.pow(1 - Turtle.speedSlider.getValue(), 2);
    Turtle.pause = Math.max(1, stepSpeed);
  }
};


/**
 * Move the turtle forward or backward.
 * @param {number} distance Pixels to move.
 * @param {string=} id ID of block.
 */
Turtle.move = function(distance, id) {
  if (Turtle.penDownValue) {
    Turtle.ctxScratch.beginPath();
    Turtle.ctxScratch.moveTo(Turtle.x, Turtle.y);
  }
  if (distance) {
    Turtle.x += distance * Math.sin(2 * Math.PI * Turtle.heading / 360);
    Turtle.y -= distance * Math.cos(2 * Math.PI * Turtle.heading / 360);
    var bump = 0;
  } else {
    // WebKit (unlike Gecko) draws nothing for a zero-length line.
    var bump = 0.1;
  }
  if (Turtle.penDownValue) {
    Turtle.ctxScratch.lineTo(Turtle.x, Turtle.y + bump);
    Turtle.ctxScratch.stroke();
  }
  Turtle.animate(id);
};



/**
 * Turn the turtle left or right.
 * @param {number} angle Degrees to turn clockwise.
 * @param {string=} id ID of block.
 */
Turtle.turn = function(angle, id) {
  Turtle.heading += angle;
  Turtle.heading %= 360;
  if (Turtle.heading < 0) {
    Turtle.heading += 360;
  }
  Turtle.animate(id);
};


Turtle.turnGo = function(angle,distance, id){
	Turtle.turn(angle);
	Turtle.move(distance);
}

/**
 * Lift or lower the pen.
 * @param {boolean} down True if down, false if up.
 * @param {string=} id ID of block.
 */
Turtle.penDown = function(down, id) {
  Turtle.penDownValue = down;
  Turtle.animate(id);
};

/**
 * Change the thickness of lines.
 * @param {number} width New thickness in pixels.
 * @param {string=} id ID of block.
 */
Turtle.penWidth = function(width, id) {
  Turtle.ctxScratch.lineWidth = width;
  Turtle.animate(id);
};

/**
 * Change the colour of the pen.
 * @param {string} colour Hexadecimal #rrggbb colour string.
 * @param {string=} id ID of block.
 */
Turtle.penColour = function(colour, id) {
  Turtle.ctxScratch.strokeStyle = colour;
  Turtle.ctxScratch.fillStyle = colour;
  Turtle.animate(id);
};

/**
 * Make the turtle visible or invisible.
 * @param {boolean} visible True if visible, false if invisible.
 * @param {string=} id ID of block.
 */
Turtle.isVisible = function(visible, id) {
  Turtle.visible = visible;
  Turtle.animate(id);
};

/**
 * Print some text.
 * @param {string} text Text to print.
 * @param {string=} id ID of block.
 */
Turtle.drawPrint = function(text, id) {
  Turtle.ctxScratch.save();
  Turtle.ctxScratch.translate(Turtle.x, Turtle.y);
  Turtle.ctxScratch.rotate(2 * Math.PI * (Turtle.heading - 90) / 360);
  Turtle.ctxScratch.fillText(text, 0, 0);
  Turtle.ctxScratch.restore();
  Turtle.animate(id);
};

/**
 * Change the typeface of printed text.
 * @param {string} font Font name (e.g. 'Arial').
 * @param {number} size Font size (e.g. 18).
 * @param {string} style Font style (e.g. 'italic').
 * @param {string=} id ID of block.
 */
Turtle.drawFont = function(font, size, style, id) {
  Turtle.ctxScratch.font = style + ' ' + size + 'pt ' + font;
  Turtle.animate(id);
};



/**
 * Determine if this event is unwanted.
 * @param {!Event} e Mouse or touch event.
 * @return {boolean} True if spam.
 */
Turtle.eventSpam = function(e) {
  // Touch screens can generate 'touchend' followed shortly thereafter by
  // 'click'.  For now, just look for this very specific combination.
  // Some devices have both mice and touch, but assume the two won't occur
  // within two seconds of each other.
  var touchMouseTime = 2000;
  if (e.type == 'click' &&
      Turtle.eventSpam.previousType_ == 'touchend' &&
      Turtle.eventSpam.previousDate_ + touchMouseTime > Date.now()) {
    e.preventDefault();
    e.stopPropagation();
    return true;
  }
  // Users double-click or double-tap accidentally.
  var doubleClickTime = 400;
  if (Turtle.eventSpam.previousType_ == e.type &&
      Turtle.eventSpam.previousDate_ + doubleClickTime > Date.now()) {
    e.preventDefault();
    e.stopPropagation();
    return true;
  }
  Turtle.eventSpam.previousType_ = e.type;
  Turtle.eventSpam.previousDate_ = Date.now();
  return false;
};

Turtle.eventSpam.previousType_ = null;
Turtle.eventSpam.previousDate_ = 0;

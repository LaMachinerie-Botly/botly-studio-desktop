






/**
 * Reset the turtle to the start position, clear the display, and kill any
 * pending tasks.
 */
Turtle.reset = function () {
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
    Turtle.ctxScratch.lineWidth = 10;
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
  Turtle.display = function () {
    // Clear the display with white.
    if (Turtle.zoomSlider != null) Turtle.scale = Turtle.map(Turtle.zoomSlider.getValue(), 0, 1, 0.1, 1);
    if (Turtle.background == null) {
      Turtle.ctx.beginPath();
      Turtle.ctx.rect(0, 0,
        Turtle.ctx.canvas.width, Turtle.ctx.canvas.height);
      Turtle.ctx.fillStyle = '#F2F2F2';
      Turtle.ctx.fill();
    } else Turtle.setBackGround(Turtle.background)
  
  
  
    // Draw the user layer.
    Turtle.ctx.globalCompositeOperation = 'source-over';
    Turtle.ctx.drawImage(Turtle.ctxScratch.canvas, 0, 0);
  
    if (Turtle.showGrid) {
      if (Turtle.scale <= 0.4) drawGrid(Turtle.ctx, Turtle.WIDTH, Turtle.HEIGHT, 1000 * Turtle.scale, 1, null);
      else if (Turtle.scale <= 0.6) drawGrid(Turtle.ctx, Turtle.WIDTH, Turtle.HEIGHT, 400 * Turtle.scale, 1, 200 * Turtle.scale);
      else drawGrid(Turtle.ctx, Turtle.WIDTH, Turtle.HEIGHT, 100 * Turtle.scale, 1, 20 * Turtle.scale);
    }
  
    // Draw the turtle.
    if (Turtle.visible) {
      // Make the turtle the colour of the pen.
      // Turtle.ctx.strokeStyle = Turtle.ctx.strokeStyle;
      // Turtle.ctx.fillStyle = Turtle.ctx.fillStyle;
      Turtle.ctx.strokeStyle = '#EA7D00';
      Turtle.ctx.fillStyle = '#EA7D00';
  
  
      var radians = 2 * Math.PI * Turtle.heading / 360;
      radians += Math.PI / 2;
  
  
      // Draw the turtle body.
      var Radius = /*Turtle.ctxScratch.lineWidth / 2*/ + 30;
      Turtle.ctx.beginPath();
      Turtle.ctx.arc(Turtle.x, Turtle.y, Radius * Turtle.scale, 0, 2 * Math.PI, false);
      Turtle.ctx.lineWidth = 8 * Turtle.scale;
      Turtle.ctx.stroke();
  
  
      // Draw the turtle head.
  
      Turtle.ctx.beginPath();
      radius = 130 * Turtle.scale;
      arrowTipX = Turtle.x + radius * Math.cos(radians);
      arrowTipY = Turtle.y - radius * Math.sin(radians);
      arrowHeight = 20 * Turtle.scale;
      arrowWidth = 25 * Turtle.scale;
  
      Ax = Turtle.x + (radius - arrowHeight) * Math.cos(radians) + (arrowWidth / 2) * Math.sin(radians);
      Ay = Turtle.y - (radius - arrowHeight) * Math.sin(radians) + (arrowWidth / 2) * Math.cos(radians);
  
      Turtle.ctx.moveTo(arrowTipX, arrowTipY);
      Turtle.ctx.lineTo(Ax, Ay);
  
      Bx = Turtle.x + (radius - arrowHeight) * Math.cos(radians) - (arrowWidth / 2) * Math.sin(radians);
      By = Turtle.y - (radius - arrowHeight) * Math.sin(radians) - (arrowWidth / 2) * Math.cos(radians);
  
      Turtle.ctx.lineTo(Bx, By);
  
      Turtle.ctx.closePath();
      Turtle.ctx.stroke();
      Turtle.ctx.fill();
  
  
      var wheelRadius = 80 / 2 * Turtle.scale
      var wheelTrack = 300 / 2 * Turtle.scale;
  
      radians += Math.PI / 2;
      Turtle.ctx.beginPath();
      Turtle.ctx.lineWidth = 15 * Turtle.scale;
      Turtle.ctx.lineCap = 'round';
  
      Ax = Turtle.x + (wheelTrack) * Math.cos(radians) + (wheelRadius / 2) * Math.sin(radians);
      Ay = Turtle.y - (wheelTrack) * Math.sin(radians) + (wheelRadius / 2) * Math.cos(radians);
  
      Turtle.ctx.moveTo(Ax, Ay);
  
      Bx = Turtle.x + (wheelTrack) * Math.cos(radians) - (wheelRadius / 2) * Math.sin(radians);
      By = Turtle.y - (wheelTrack) * Math.sin(radians) - (wheelRadius / 2) * Math.cos(radians);
  
      Turtle.ctx.lineTo(Bx, By);
      Turtle.ctx.stroke();
  
      radians += Math.PI;
      Turtle.ctx.beginPath();
      Turtle.ctx.lineWidth = 15 * Turtle.scale;
      Turtle.ctx.lineCap = 'round';
  
      Ax = Turtle.x + (wheelTrack) * Math.cos(radians) + (wheelRadius / 2) * Math.sin(radians);
      Ay = Turtle.y - (wheelTrack) * Math.sin(radians) + (wheelRadius / 2) * Math.cos(radians);
  
      Turtle.ctx.moveTo(Ax, Ay);
  
      Bx = Turtle.x + (wheelTrack) * Math.cos(radians) - (wheelRadius / 2) * Math.sin(radians);
      By = Turtle.y - (wheelTrack) * Math.sin(radians) - (wheelRadius / 2) * Math.cos(radians);
  
      Turtle.ctx.lineTo(Bx, By);
      Turtle.ctx.stroke();
  
      //radians = Math.PI/12;
      var Rwidth = 400 * Turtle.scale, Rheight = 180 * Turtle.scale;
      roundRect(Turtle.ctx, radians, Turtle.x, Turtle.y, Rwidth, Rheight, 20 * Turtle.scale, false);
    }
  };
  
  
  function roundRect(ctx, radians, x, y, width, height, radius, fill, stroke) {
  
    if (typeof stroke == 'undefined') {
      stroke = true;
    }
    if (typeof radius === 'undefined') {
      radius = 5;
    }
    if (typeof radius === 'number') {
      radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
      var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
      for (var side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }
  
    ctx.beginPath();
    ctx.moveTo(x, y);
  
    ctx.rotate(radians);
  
    x -= width / 2;
    y -= height / 2;
  
    ctx.moveTo(0, 0);
  
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
      ctx.fill();
    }
    if (stroke) {
      ctx.stroke();
    }
    ctx.rotate(-radians);
  }
  
  var drawGrid = function (ctx, w, h, step, strokeWeight, subGrid) {
    ctx.beginPath();
    for (var x = w / 2; x <= w; x += step) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }
    for (var x = w / 2; x >= 0; x -= step) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }
  
    // set the color of the line
    ctx.strokeStyle = 'rgb(20,20,20)';
    ctx.lineWidth = strokeWeight;
    // the stroke will actually paint the current path 
    ctx.stroke();
    // for the sake of the example 2nd path
    ctx.beginPath();
    for (var y = h / 2; y <= h; y += step) {
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }
  
    for (var y = h / 2; y >= 0; y -= step) {
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }
    // set the color of the line
    ctx.strokeStyle = 'rgb(20,20,20)';
    // just for fun
    ctx.lineWidth = strokeWeight;
    // for your original question - you need to stroke only once
    ctx.stroke();
  
    ctx.beginPath();
  
    ctx.strokeStyle = 'rgb(255,50,50)';
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
  
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
  
    // just for fun
    ctx.lineWidth = strokeWeight;
    // for your original question - you need to stroke only once
    ctx.stroke();
  
  
  
    if (subGrid != null) {
      drawGrid(ctx, w, h, subGrid, 0.3, null);
    }
  };
  
  
  
  /**
   * Inject the Turtle API into a JavaScript interpreter.
   * @param {!Interpreter} interpreter The JS Interpreter.
   * @param {!Interpreter.Object} scope Global scope.
   */
  Turtle.initInterpreter = function (interpreter, scope) {
    // API
    var wrapper;
    wrapper = function (distance) {
      Turtle.move(distance * Turtle.scale);
    };
    interpreter.setProperty(scope, 'Avancer',
      interpreter.createNativeFunction(wrapper));
    wrapper = function (distance) {
      Turtle.move(-distance * Turtle.scale);
    };
    interpreter.setProperty(scope, 'Reculer',
      interpreter.createNativeFunction(wrapper));
  
    wrapper = function (angle) {
      Turtle.turn(angle);
    };
    interpreter.setProperty(scope, 'droite',
      interpreter.createNativeFunction(wrapper));
    wrapper = function (angle) {
      Turtle.turn(-angle);
    };
    interpreter.setProperty(scope, 'gauche',
      interpreter.createNativeFunction(wrapper));
  
    wrapper = function () {
      Turtle.penDown(false);
    };
    interpreter.setProperty(scope, 'Lever',
      interpreter.createNativeFunction(wrapper));
    wrapper = function () {
      Turtle.penDown(true);
    };
    interpreter.setProperty(scope, 'Descendre',
      interpreter.createNativeFunction(wrapper));
  
    wrapper = function (angle, distance) {
      Turtle.turnGo(angle, distance * Turtle.scale);
    };
    interpreter.setProperty(scope, 'turnGo',
      interpreter.createNativeFunction(wrapper));
  
    wrapper = function (width) {
      Turtle.penWidth(width * Turtle.scale);
    };
    interpreter.setProperty(scope, 'penWidth',
      interpreter.createNativeFunction(wrapper));
  
    wrapper = function (colour) {
      Turtle.penColour(colour);
    };
    interpreter.setProperty(scope, 'penColour',
      interpreter.createNativeFunction(wrapper));
  
    wrapper = function () {
      Turtle.isVisible(false);
    };
    interpreter.setProperty(scope, 'hideTurtle',
      interpreter.createNativeFunction(wrapper));
    wrapper = function (id) {
      Turtle.isVisible(true);
    };
    interpreter.setProperty(scope, 'showTurtle',
      interpreter.createNativeFunction(wrapper));
  
    wrapper = function (text) {
      Turtle.drawPrint(text);
    };
    interpreter.setProperty(scope, 'print',
      interpreter.createNativeFunction(wrapper));
  
    wrapper = function (font, size, style) {
      Turtle.drawFont(font, size * Turtle.scale, style);
    };
    interpreter.setProperty(scope, 'font',
      interpreter.createNativeFunction(wrapper));
  
    wrapper = function () {
      console.log("Not implemented");
    };
    interpreter.setProperty(scope, 'none',
      interpreter.createNativeFunction(wrapper));
  };
  
  
  Turtle.map = function (x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  };
  
  
  /**
   * Execute a bite-sized chunk of the user's code.
   * @private
   */
  Turtle.executeChunk_ = function () {
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
  Turtle.animate = function (id) {
    Turtle.display();
    if (id) {
      BotlyStudio.workspace.highlightBlock(id);
    }
    // Scale the speed non-linearly, to give better precision at the fast end.
    var stepSpeed = 1000 * Math.pow(1 - Turtle.speedSlider.getValue(), 2);
    Turtle.pause = Math.max(1, stepSpeed);
  };
  
  
  /**
   * Move the turtle forward or backward.
   * @param {number} distance Pixels to move.
   * @param {string=} id ID of block.
   */
  Turtle.move = function (distance, id) {
    if (Turtle.penDownValue) {
      Turtle.ctxScratch.beginPath();
      Turtle.ctxScratch.moveTo(Turtle.x, Turtle.y);
    }
    if (distance) {
      distance *= Turtle.distCoef;
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
  Turtle.turn = function (angle, id) {
    Turtle.heading += angle;
    Turtle.heading %= 360;
    if (Turtle.heading < 0) {
      Turtle.heading += 360;
    }
    Turtle.animate(id);
  };
  
  
  Turtle.turnGo = function (angle, distance, id) {
    Turtle.turn(angle);
    Turtle.move(distance);
  }
  
  /**
   * Lift or lower the pen.
   * @param {boolean} down True if down, false if up.
   * @param {string=} id ID of block.
   */
  Turtle.penDown = function (down, id) {
    Turtle.penDownValue = down;
    Turtle.animate(id);
  };
  
  /**
   * Change the thickness of lines.
   * @param {number} width New thickness in pixels.
   * @param {string=} id ID of block.
   */
  Turtle.penWidth = function (width, id) {
    Turtle.ctxScratch.lineWidth = width;
    Turtle.animate(id);
  };
  
  /**
   * Change the colour of the pen.
   * @param {string} colour Hexadecimal #rrggbb colour string.
   * @param {string=} id ID of block.
   */
  Turtle.penColour = function (colour, id) {
    Turtle.ctxScratch.strokeStyle = colour;
    Turtle.ctxScratch.fillStyle = colour;
    Turtle.animate(id);
  };
  
  /**
   * Make the turtle visible or invisible.
   * @param {boolean} visible True if visible, false if invisible.
   * @param {string=} id ID of block.
   */
  Turtle.isVisible = function (visible, id) {
    Turtle.visible = visible;
    Turtle.animate(id);
  };
  
  /**
   * Print some text.
   * @param {string} text Text to print.
   * @param {string=} id ID of block.
   */
  Turtle.drawPrint = function (text, id) {
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
  Turtle.drawFont = function (font, size, style, id) {
    Turtle.ctxScratch.font = style + ' ' + size + 'pt ' + font;
    Turtle.animate(id);
  };
  
  
  
  /**
   * Determine if this event is unwanted.
   * @param {!Event} e Mouse or touch event.
   * @return {boolean} True if spam.
   */
  Turtle.eventSpam = function (e) {
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
  
goog.provide('Turtle');

var Turtle = Turtle || {};

Turtle.html =
  "  <div style='position: absolute; width: 100%; height: 70px; right: +30px; top: 60px'> " +
  "    <div id='plugin_buttons_wrapper' class='fixed-action-btn horizontal direction-left' style='position: absolute; display: inline-block; height: 100%; right: 45px; top: 15px; z-index: 12;'> " +
  "      <a id='button_plugin_run' class='waves-effect waves-light waves-circle btn-floating btn-large z-depth-1-half arduino_orange'> " +
  "        <i style='font-size: 2.4rem !important;' class='large material-icons left'>play_arrow</i> " +
  "      </a> " +
  "      <ul> " +
  "        <li><a id='button_plugin_clear' class='waves-effect waves-light waves-circle btn-floating z-depth-1-half arduino_red'><i " +
  "            class='material-icons'>delete</i></a></li> " +
  "        <li><a id='button_plugin_save' class='waves-effect waves-light waves-circle btn-floating z-depth-1-half arduino_yellow'><i " +
  "            class='material-icons'>image</i></a></li> " +
  "      </ul> " +
  "    </div>" + 
  "  </div>" + 
  "  <div id='visualization' class='content content_height_transition playground_panel_large' wrap='soft'>" +
  "    <div class='scrollbar' id='style-10'>" +
  "      <canvas id='display' width='400' height='400'></canvas>" +
  "      <canvas id='scratch' width='400' height='400' hidden></canvas>" +
  "      <svg id='speed_slider' xmlns='http://www.w3.org/2000/svg' xmlns:svg='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'" +
  "        version='1.1' width='150' height='50' class='slider2'>" +
  "        <!-- Slow icon. -->" +
  "        <clipPath id='slowClipPath'>" +
  "          <rect width='26' height='12' x='5' y='14'></rect>" +
  "        </clipPath>" +
  "        <image xlink:href='botlystudio/plugins/turtle/icons.png' height='42' width='84' x='-21' y='-10' clip-path='url(#slowClipPath)'></image>" +
  "        <!-- Fast icon. -->" +
  "        <clipPath id='fastClipPath'>" +
  "         <rect width='26' height='16' x='120' y='10'></rect>" +
  "        </clipPath>" +
  "        <image xlink:href='botlystudio/plugins/turtle/icons.png' height='42' width='84' x='120' y='-11' clip-path='url(#fastClipPath)'></image>" +
  "      </svg>" +
  /*"      <svg id='zoom_slider' xmlns='http://www.w3.org/2000/svg' xmlns:svg='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'" +
  "        version='1.1' width='150' height='50' class='slider2'>" +
  "        <!-- Slow icon. -->" +
  "        <clipPath id='slowClipPath'>" +
  "          <rect width='26' height='12' x='5' y='14'></rect>" +
  "          <image src='botlystudio/plugins/turtle/icons2.svg' height='42' width='84' x='120' y='-11' clip-path='url(#slowClipPath)'></image>" +
  "        </clipPath>" +
  "       <!-- Fast icon. -->" +
  "        <clipPath id='fastClipPath'>" +
  "          <rect width='26' height='16' x='120' y='10'></rect>" +
  "          <image src='botlystudio/plugins/turtle/icons2.png' height='42' width='84' x='120' y='-11' clip-path='url(#fastClipPath)'></image>" +
  "        </clipPath>" +
  "       </svg>" +*/
  "     </div>" +
  "   </div>";

Turtle.css =
  "#content_display {" +
  "  resize: none;" +
  "  outline: none;" +
  "  border: none;" +
  "  position: relative;" +
  "  min-height: 300px;" +
  "  overflow: auto;" +
  "  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);" +
  "  -moz-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);" +
  "  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);" +
  "}" +
  ".content_display_large {" +
  "  height: 100%;" +
  "  /*padding-bottom: 98%;*/" +
  "  overflow: auto;" +
  "  min-height: 300px;" +
  "  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);" +
  "  -moz-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);" +
  "  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);" +
  "}" +
  ".content_display_small {" +
  "  height: 100%;" +
  "  /*padding-bottom: 98%;*/" +
  "  overflow: auto;" +
  "  min-height: 300px;" +
  "  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);" +
  "  -moz-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);" +
  "  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);" +
  "}" +
  "#display {" +
  "  position: relative;" +
  "  width: 80%;" +
  "  height: auto;" +
  "  margin-left: 10%;" +
  "  margin-top: 10%;" +
  "  border-width: 1px;" +
  "  border-color: black;" +
  "  border-style: inset;" +
  "}" +
  ".scrollbar {" +
  "  float: left;" +
  "  height: 100%;" +
  "  width: 99.5%;" +
  "  background: #ffffff;" +
  "  overflow-y: auto;" +
  "  overflow-x: hidden;" +
  "}" +
  "#style-10::-webkit-scrollbar {" +
  "  width: 11px;" +
  "  background-color: rgb(255, 255, 255);" +
  "}" +
  "/**  STYLE 10 */" +
  "#style-10::-webkit-scrollbar-thumb {" +
  "  position: relative;" +
  "  border-radius: 11px;" +
  "  background: #f47a4298;" +
  "  transform: translate(-50%);" +
  "}";


Turtle.interpreter = null;
Turtle.canvas = null;
Turtle.ctx = null;
Turtle.ctxScratch = null
Turtle.pidList = [];
Turtle.pause = 10;
Turtle.background = null;
Turtle.visible = true;
Turtle.penDownValue = true;

Turtle.speedSlider = null;
//Turtle.zoomSlider = null;

Turtle.HEIGHT = 400;
Turtle.WIDTH = 400;

Turtle.scale = 1;
Turtle.distCoef = 20;

Turtle.showGrid = false;


/** Initialize function for Turtle */
Turtle.init = function () {
  PluginManager.injectHtml(Turtle.html);
  PluginManager.injectCss(Turtle.css)

  Turtle.ctxScratch = document.getElementById("scratch").getContext('2d');

  Turtle.canvas = document.getElementById("display");
  Turtle.ctx = Turtle.canvas.getContext('2d');

  BotlyStudio.bindClick_('button_plugin_run', function () {
    Turtle.execute();
  });
  BotlyStudio.bindClick_('button_plugin_save', function () {
    Turtle.saveCanvas();
  });
  BotlyStudio.bindClick_('button_plugin_clear', function () {
    Turtle.reset();
  });


  document.getElementById('ide_output_collapsible_header').addEventListener(
    'click', function () {
      Turtle.toggleConsole();
    });

  var head = document.getElementsByTagName('head')[0];
  var plugin = document.createElement('script');
  plugin.src = 'botlystudio/plugins/turtle/slider.js';
  plugin.onload = function () {
    var sliderSvg = document.getElementById('speed_slider');
    Turtle.speedSlider = new Slider(10, 35, 130, sliderSvg);
    /*var sliderSvg = document.getElementById('zoom_slider');
    Turtle.zoomSlider = new Slider(10, 35, 130, sliderSvg, Turtle.display);*/
    Turtle.reset();
  }
  head.appendChild(plugin);
};

BotlyStudio.changeToolbox = function () {
  if (BotlyStudio.DIFFICULTY == 1) {
    BotlyStudio.TOOLBOX_XML =
      '<xml>' +
      '  <sep></sep>' +
      '  <category id="botly" name="Botly">' +
      '    <block type="botly_deplacement">' +
      '		<value name="VALUE">' +
      '       	<shadow type="math_number">' +
      '          		<field name="NUM">10</field>' +
      '        	</shadow>' +
      '		</value>' +
      '    </block>' +
      '    <block type="botly_rotation">' +
      '		<value name="angle">' +
      '       	<shadow type="math_number">' +
      '          		<field name="NUM">90</field>' +
      '        	</shadow>' +
      '		</value>' +
      '    </block>' +
      '    <block type="botly_crayon"></block>' +
      '  </category>' +
      '  <sep></sep>' +
      '  <category id="catLoops" name="Loops">' +
      '    <block type="controls_repeat_ext">' +
      '      <value name="TIMES">' +
      '        <block type="math_number">' +
      '          <field name="NUM">5</field>' +
      '        </block>' +
      '      </value>' +
      '    </block>' +
      '  </category>' +
      '  <sep></sep>' +
      '  <category id="catMath" name="Math">' +
      '    <block type="math_number"></block>' +
      '  </category>' +
      '  <sep></sep>' +
      '  <category id="catTime" name="Time">' +
      '    <block type="infinite_loop"></block>' +
      '  </category>' +
      '  <sep></sep>' +
      '</xml>';
  }
  if (BotlyStudio.DIFFICULTY == 2) {
    BotlyStudio.TOOLBOX_XML =
      '<xml>' +
      '  <sep></sep>' +
      '  <category id="botly" name="Botly">' +
      '    <block type="botly_forward">' +
      '      <value name="VALUE">' +
      '        <shadow type="math_number">' +
      '          <field name="NUM">10</field>' +
      '        </shadow>' +
      '      </value>' +
      '    </block>' +
      '    <block type="botly_backward">' +
      '      <value name="VALUE">' +
      '        <shadow type="math_number">' +
      '          <field name="NUM">10</field>' +
      '        </shadow>' +
      '      </value>' +
      '    </block>' +
      '    <block type="botly_right">' +
      '      <value name="VALUE">' +
      '        <shadow type="math_number">' +
      '          <field name="NUM">90</field>' +
      '        </shadow>' +
      '      </value>' +
      '    </block>' +
      '    <block type="botly_left">' +
      '      <value name="VALUE">' +
      '        <shadow type="math_number">' +
      '          <field name="NUM">90</field>' +
      '        </shadow>' +
      '      </value>' +
      '    </block>' +
      '    <block type="botly_crayon"></block>' +
      '  </category>' + '  <sep></sep>' +
      '  <category id="catLoops" name="Loops">' +
      '    <block type="controls_repeat_ext">' +
      '      <value name="TIMES">' +
      '        <block type="math_number">' +
      '          <field name="NUM">5</field>' +
      '        </block>' +
      '      </value>' +
      '    </block>' +
      '    <block type="controls_for">' +
      '      <value name="FROM">' +
      '        <block type="math_number">' +
      '          <field name="NUM">1</field>' +
      '        </block>' +
      '      </value>' +
      '      <value name="TO">' +
      '        <block type="math_number">' +
      '          <field name="NUM">10</field>' +
      '        </block>' +
      '      </value>' +
      '      <value name="BY">' +
      '        <block type="math_number">' +
      '          <field name="NUM">1</field>' +
      '        </block>' +
      '      </value>' +
      '    </block>' +
      '  </category>' +
      '  <sep></sep>' +
      '  <category id="catMath" name="Math">' +
      '    <block type="math_number"></block>' +
      '    <block type="math_random_int">' +
      '      <value name="FROM">' +
      '        <block type="math_number">' +
      '          <field name="NUM">1</field>' +
      '        </block>' +
      '      </value>' +
      '      <value name="TO">' +
      '        <block type="math_number">' +
      '          <field name="NUM">100</field>' +
      '        </block>' +
      '      </value>' +
      '    </block>' +
      '  </category>' +
      '  <sep></sep>' +
      '  <category id="catVariables" name="Variables">' +
      '    <block type="variables_get"></block>' +
      '    <block type="variables_set"></block>' +
      '  </category>' +
      '  <sep></sep>' +
      '  <category id="catFunctions" name="Functions" custom="PROCEDURE"></category>' +
      '  <sep></sep>' +
      '  <category id="catTime" name="Time">' +
      '    <block type="infinite_loop"></block>' +
      '</xml>';
  }
  if (BotlyStudio.DIFFICULTY == 3) {
    BotlyStudio.TOOLBOX_XML =
      '<xml>' +
      '  <sep></sep>' +
      '  <category id="botly" name="Botly">' +
      '    <block type="botly_forward">' +
      '      <value name="VALUE">' +
      '        <shadow type="math_number">' +
      '          <field name="NUM">10</field>' +
      '        </shadow>' +
      '      </value>' +
      '    </block>' +
      '    <block type="botly_backward">' +
      '      <value name="VALUE">' +
      '        <shadow type="math_number">' +
      '          <field name="NUM">10</field>' +
      '        </shadow>' +
      '      </value>' +
      '    </block>' +
      '    <block type="botly_deplacement">' +
      '		<value name="VALUE">' +
      '       	<shadow type="math_number">' +
      '          		<field name="NUM">10</field>' +
      '        	</shadow>' +
      '		</value>' +
      '    </block>' +
      '    <block type="botly_rotation">' +
      '		<value name="angle">' +
      '       	<shadow type="math_number">' +
      '          		<field name="NUM">90</field>' +
      '        	</shadow>' +
      '		</value>' +
      '    </block>' +
      '    <block type="botly_right">' +
      '      <value name="angle">' +
      '        <shadow type="math_number">' +
      '          <field name="NUM">10</field>' +
      '        </shadow>' +
      '      </value>' +
      '    </block>' +
      '    <block type="botly_left">' +
      '      <value name="angle">' +
      '        <shadow type="math_number">' +
      '          <field name="NUM">10</field>' +
      '        </shadow>' +
      '      </value>' +
      '    </block>' +
      '    <block type="botly_stop"></block>' +
      '    <block type="botly_turn_go"></block>' +
      '    <block type="botly_crayon"></block>' +
      '    <block type="botly_polygone"></block>' +
      '    <block type="botly_cercle"></block>' +
      '    <block type="botly_ligne"></block>' +
      '    <block type="botly_contact"></block>' +
      '    <block type="botly_lever_crayon"></block>' +
      '    <block type="botly_descendre_crayon"></block>' +
      '  </category>' +
      '  <sep></sep>' +
      '  <category id="catLogic" name="Logic">' +
      '    <block type="controls_if"></block>' +
      '    <block type="logic_compare"></block>' +
      '    <block type="logic_operation"></block>' +
      '    <block type="logic_negate"></block>' +
      '    <block type="logic_boolean"></block>' +
      '    <block type="logic_null"></block>' +
      '    <block type="logic_ternary"></block>' +
      '  </category>' +
      '  <sep></sep>' +
      '  <category id="catLoops" name="Loops">' +
      '    <block type="controls_repeat_ext">' +
      '      <value name="TIMES">' +
      '        <block type="math_number">' +
      '          <field name="NUM">5</field>' +
      '        </block>' +
      '      </value>' +
      '    </block>' +
      '    <block type="controls_whileUntil"></block>' +
      '    <block type="controls_for">' +
      '      <value name="FROM">' +
      '        <block type="math_number">' +
      '          <field name="NUM">1</field>' +
      '        </block>' +
      '      </value>' +
      '      <value name="TO">' +
      '        <block type="math_number">' +
      '          <field name="NUM">10</field>' +
      '        </block>' +
      '      </value>' +
      '      <value name="BY">' +
      '        <block type="math_number">' +
      '          <field name="NUM">1</field>' +
      '        </block>' +
      '      </value>' +
      '    </block>' +
      '    <block type="controls_flow_statements"></block>' +
      '  </category>' +
      '  <sep></sep>' +
      '  <category id="catMath" name="Math">' +
      '    <block type="math_number"></block>' +
      '    <block type="math_arithmetic"></block>' +
      '    <block type="math_single"></block>' +
      '    <block type="math_trig"></block>' +
      '    <block type="math_constant"></block>' +
      '    <block type="math_number_property"></block>' +
      '    <block type="math_change">' +
      '      <value name="DELTA">' +
      '        <block type="math_number">' +
      '          <field name="NUM">1</field>' +
      '        </block>' +
      '      </value>' +
      '    </block>' +
      '    <block type="math_round"></block>' +
      '    <block type="math_modulo"></block>' +
      '    <block type="math_constrain">' +
      '      <value name="LOW">' +
      '        <block type="math_number">' +
      '          <field name="NUM">1</field>' +
      '        </block>' +
      '      </value>' +
      '      <value name="HIGH">' +
      '        <block type="math_number">' +
      '          <field name="NUM">100</field>' +
      '        </block>' +
      '      </value>' +
      '    </block>' +
      '    <block type="math_random_int">' +
      '      <value name="FROM">' +
      '        <block type="math_number">' +
      '          <field name="NUM">1</field>' +
      '        </block>' +
      '      </value>' +
      '      <value name="TO">' +
      '        <block type="math_number">' +
      '          <field name="NUM">100</field>' +
      '        </block>' +
      '      </value>' +
      '    </block>' +
      '    <block type="math_random_float"></block>' +
      '    <block type="base_map"></block>' +
      '  </category>' +
      '  <sep></sep>' +
      '  <category id="catVariables" name="Variables">' +
      '    <block type="variables_get"></block>' +
      '    <block type="variables_set"></block>' +
      '    <block type="variables_set">' +
      '      <value name="VALUE">' +
      '        <block type="variables_set_type"></block>' +
      '      </value>' +
      '    </block>' +
      '    <block type="variables_set_type"></block>' +
      '  </category>' +
      '  <sep></sep>' +
      '  <category id="catFunctions" name="Functions" custom="PROCEDURE"></category>' +
      '  <sep></sep>' +
      '  <category id="catTime" name="Time">' +
      '    <block type="time_delay">' +
      '      <value name="DELAY_TIME_MILI">' +
      '        <block type="math_number">' +
      '          <field name="NUM">1000</field>' +
      '        </block>' +
      '      </value>' +
      '    </block>' +
      '    <block type="time_delaymicros">' +
      '      <value name="DELAY_TIME_MICRO">' +
      '        <block type="math_number">' +
      '          <field name="NUM">100</field>' +
      '        </block>' +
      '      </value>' +
      '    </block>' +
      '    <block type="time_millis"></block>' +
      '    <block type="time_micros"></block>' +
      '    <block type="infinite_loop"></block>' +
      '  </category>' +
      '  <sep></sep>' +
      '</xml>';
  }
  if (BotlyStudio.DIFFICULTY == 4) {
    BotlyStudio.TOOLBOX_XML =
      '<xml>' +
      '  <sep></sep>' +
      '  <category id="botly" name="Botly">' +
      '    <block type="botly_forward">' +
      '      <value name="VALUE">' +
      '        <shadow type="math_number">' +
      '          <field name="NUM">10</field>' +
      '        </shadow>' +
      '      </value>' +
      '    </block>' +
      '    <block type="botly_backward">' +
      '      <value name="VALUE">' +
      '        <shadow type="math_number">' +
      '          <field name="NUM">10</field>' +
      '        </shadow>' +
      '      </value>' +
      '    </block>' +
      '    <block type="botly_deplacement">' +
      '		<value name="VALUE">' +
      '       	<shadow type="math_number">' +
      '          		<field name="NUM">10</field>' +
      '        	</shadow>' +
      '		</value>' +
      '    </block>' +
      '    <block type="botly_rotation">' +
      '		<value name="angle">' +
      '       	<shadow type="math_number">' +
      '          		<field name="NUM">90</field>' +
      '        	</shadow>' +
      '		</value>' +
      '    </block>' +
      '    <block type="botly_right">' +
      '      <value name="angle">' +
      '        <shadow type="math_number">' +
      '          <field name="NUM">10</field>' +
      '        </shadow>' +
      '      </value>' +
      '    </block>' +
      '    <block type="botly_left">' +
      '      <value name="angle">' +
      '        <shadow type="math_number">' +
      '          <field name="NUM">10</field>' +
      '        </shadow>' +
      '      </value>' +
      '    </block>' +
      '    <block type="botly_stop"></block>' +
      '    <block type="botly_turn_go"></block>' +
      '    <block type="botly_crayon"></block>' +
      '    <block type="botly_polygone"></block>' +
      '    <block type="botly_cercle"></block>' +
      '    <block type="botly_ligne"></block>' +
      '    <block type="botly_contact"></block>' +
      '    <block type="botly_lever_crayon"></block>' +
      '    <block type="botly_descendre_crayon"></block>' +
      '  </category>' +
      '  <sep></sep>' +
      '  <category id="catLogic" name="Logic">' +
      '    <block type="controls_if"></block>' +
      '    <block type="logic_compare"></block>' +
      '    <block type="logic_operation"></block>' +
      '    <block type="logic_negate"></block>' +
      '    <block type="logic_boolean"></block>' +
      '    <block type="logic_null"></block>' +
      '    <block type="logic_ternary"></block>' +
      '  </category>' +
      '  <sep></sep>' +
      '  <category id="catLoops" name="Loops">' +
      '    <block type="controls_repeat_ext">' +
      '      <value name="TIMES">' +
      '        <block type="math_number">' +
      '          <field name="NUM">5</field>' +
      '        </block>' +
      '      </value>' +
      '    </block>' +
      '    <block type="controls_whileUntil"></block>' +
      '    <block type="controls_for">' +
      '      <value name="FROM">' +
      '        <block type="math_number">' +
      '          <field name="NUM">1</field>' +
      '        </block>' +
      '      </value>' +
      '      <value name="TO">' +
      '        <block type="math_number">' +
      '          <field name="NUM">10</field>' +
      '        </block>' +
      '      </value>' +
      '      <value name="BY">' +
      '        <block type="math_number">' +
      '          <field name="NUM">1</field>' +
      '        </block>' +
      '      </value>' +
      '    </block>' +
      '    <block type="controls_flow_statements"></block>' +
      '  </category>' +
      '  <sep></sep>' +
      '  <category id="catMath" name="Math">' +
      '    <block type="math_number"></block>' +
      '    <block type="math_arithmetic"></block>' +
      '    <block type="math_single"></block>' +
      '    <block type="math_trig"></block>' +
      '    <block type="math_constant"></block>' +
      '    <block type="math_number_property"></block>' +
      '    <block type="math_change">' +
      '      <value name="DELTA">' +
      '        <block type="math_number">' +
      '          <field name="NUM">1</field>' +
      '        </block>' +
      '      </value>' +
      '    </block>' +
      '    <block type="math_round"></block>' +
      '    <block type="math_modulo"></block>' +
      '    <block type="math_constrain">' +
      '      <value name="LOW">' +
      '        <block type="math_number">' +
      '          <field name="NUM">1</field>' +
      '        </block>' +
      '      </value>' +
      '      <value name="HIGH">' +
      '        <block type="math_number">' +
      '          <field name="NUM">100</field>' +
      '        </block>' +
      '      </value>' +
      '    </block>' +
      '    <block type="math_random_int">' +
      '      <value name="FROM">' +
      '        <block type="math_number">' +
      '          <field name="NUM">1</field>' +
      '        </block>' +
      '      </value>' +
      '      <value name="TO">' +
      '        <block type="math_number">' +
      '          <field name="NUM">100</field>' +
      '        </block>' +
      '      </value>' +
      '    </block>' +
      '    <block type="math_random_float"></block>' +
      '    <block type="base_map"></block>' +
      '  </category>' +
      '  <sep></sep>' +
      '  <category id="catVariables" name="Variables">' +
      '    <block type="variables_get"></block>' +
      '    <block type="variables_set"></block>' +
      '    <block type="variables_set">' +
      '      <value name="VALUE">' +
      '        <block type="variables_set_type"></block>' +
      '      </value>' +
      '    </block>' +
      '    <block type="variables_set_type"></block>' +
      '  </category>' +
      '  <sep></sep>' +
      '  <category id="catFunctions" name="Functions" custom="PROCEDURE"></category>' +
      '  <sep></sep>' +
      '  <category id="catTime" name="Time">' +
      '    <block type="time_delay">' +
      '      <value name="DELAY_TIME_MILI">' +
      '        <block type="math_number">' +
      '          <field name="NUM">1000</field>' +
      '        </block>' +
      '      </value>' +
      '    </block>' +
      '    <block type="time_delaymicros">' +
      '      <value name="DELAY_TIME_MICRO">' +
      '        <block type="math_number">' +
      '          <field name="NUM">100</field>' +
      '        </block>' +
      '      </value>' +
      '    </block>' +
      '    <block type="time_millis"></block>' +
      '    <block type="time_micros"></block>' +
      '    <block type="infinite_loop"></block>' +
      '  </category>' +
      '</xml>';
  }
};



Turtle.toggleConsole = function () {
  var outputHeader = document.getElementById('console_header');
  var visualization = document.getElementById('visualization');
  // Blockly doesn't resize with CSS3 transitions enabled, so do it manually
  var timerId = setInterval(function () {
    window.dispatchEvent(new Event('resize'));
  }, 15);
  setTimeout(function () {
    clearInterval(timerId);
  }, 400);

  if (!outputHeader.className.match('active')) {
    visualization.className = 'content height_transition playground_panel_small';
  } else {
    visualization.className = 'content height_transition playground_panel_large';
  }

  // If the height transition CSS is left then blockly does not resize
  setTimeout(function () {
    visualization.className = visualization.className.replace('height_transition', '');
  }, 400);
}

Turtle.saveCanvas = function () {
  var canvas = document.getElementById("display");
  var img = canvas.toDataURL("image/png");
  var filename = document.getElementById("sketch_name").value;

  var pom = document.createElement('a');
  pom.setAttribute('href', img);
  pom.setAttribute('download', filename);

  if (document.createEvent) {
    var event = document.createEvent('MouseEvents');
    event.initEvent('click', true, true);
    pom.dispatchEvent(event);
  }
  else {
    pom.click();
  }
}

Turtle.setBackGround = function (path) {
  var canvasStyle = document.getElementById("display").style;
  canvasStyle.background = "#ffffff";

  Turtle.ctx.fillStyle = '#F2F2F2';
  Turtle.ctx.fill();
  Turtle.ctx.clearRect(0, 0, Turtle.canvas.width, Turtle.canvas.height);
  Turtle.sprites = [];


  var ctx = Turtle.ctx;
  var background = new Image();
  background.src = path;

  // Make sure the image is loaded first otherwise nothing will draw.
  background.onload = function () {
    ctx.drawImage(background, 0, 0);
  }
};


Turtle.execute = function () {
  if (!('Interpreter' in window)) {
    // Interpreter lazy loads and hasn't arrived yet.  Try again later.
    setTimeout(Turtle.execute, 250);
    return;
  }
  var code = BotlyStudio.generateJavaScript();
  Turtle.interpreter = new Interpreter(code, Turtle.initInterpreter);
  Turtle.pidList.push(setTimeout(Turtle.executeChunk_, 100));
  Turtle.reset();
}


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
  Turtle.ctx.beginPath();
  Turtle.ctx.rect(0, 0,
      Turtle.ctx.canvas.width, Turtle.ctx.canvas.height);
  Turtle.ctx.fillStyle = '#F2F2F2';
  Turtle.ctx.fill();

  // Draw the user layer.
  Turtle.ctx.globalCompositeOperation = 'source-over';
  Turtle.ctx.drawImage(Turtle.ctxScratch.canvas, 0, 0);

  // Draw the turtle.
  if (Turtle.visible) {
    // Make the turtle the colour of the pen.
    // Turtle.ctx.strokeStyle = Turtle.ctxScratch.strokeStyle;
    // Turtle.ctx.fillStyle = Turtle.ctxScratch.fillStyle;
    Turtle.ctx.strokeStyle = '#EA7D00';
    Turtle.ctx.fillStyle = '#EA7D00';

    // Draw the turtle body.
    var radius = Turtle.ctxScratch.lineWidth / 2 + 10;
    Turtle.ctx.beginPath();
    Turtle.ctx.arc(Turtle.x, Turtle.y, radius, 0, 2 * Math.PI, false);
    Turtle.ctx.lineWidth = 3;
    Turtle.ctx.stroke();

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
    Turtle.ctx.beginPath();
    Turtle.ctx.moveTo(tipX, tipY);
    Turtle.ctx.lineTo(leftX, leftY);
    Turtle.ctx.bezierCurveTo(leftControlX, leftControlY,
        rightControlX, rightControlY, rightX, rightY);
    Turtle.ctx.closePath();
    Turtle.ctx.fill();
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





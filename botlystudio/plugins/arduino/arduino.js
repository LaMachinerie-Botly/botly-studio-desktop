goog.provide(' Arduino');

var  Arduino =  Arduino || {};

 Arduino.html =
  "  <div id='visualization' class='content content_height_transition content_display_large' wrap='soft'>" +
  "    <div class='scrollbar' id='style-10'>" +
  "      <canvas id='display' width='1000' height='1000'></canvas>" +
  "      <canvas id='scratch' width='1000' height='1000' hidden></canvas>" +
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
  "      <svg id='zoom_slider' xmlns='http://www.w3.org/2000/svg' xmlns:svg='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'" +
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
  "       </svg>" +
  "     </div>" +
  "   </div>";



 Arduino.css =
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
  "  height: -moz-calc(100vh - 190px);     /* Firefox  */" +
  "  height: -webkit-calc(100vh - 190px);  /* WebKit   */" +
  "  height: -o-calc(100vh - 190px);       /* Opera    */" +
  "  height: calc(100vh - 190px);          /* Standard */" +
  "  /*padding-bottom: 98%;*/" +
  "  overflow: auto;" +
  "  min-height: 300px;" +
  "  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);" +
  "  -moz-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);" +
  "  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);" +
  "}" +
  ".content_display_small {" +
  "  height: -moz-calc(100vh - 350px);     /* Firefox  */" +
  "  height: -webkit-calc(100vh - 350px);  /* WebKit   */" +
  "  height: -o-calc(100vh - 350px);       /* Opera    */" +
  "  height: calc(100vh - 350px);          /* Standard */" +
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


 Arduino.interpreter = null;
 Arduino.canvas = null;
 Arduino.ctx = null;
 Arduino.ctxScratch = null
 Arduino.pidList = [];
 Arduino.pause = 10;
 Arduino.background = null;
 Arduino.visible = true;
 Arduino.penDownValue = true;

 Arduino.speedSlider = null;
 Arduino.zoomSlider = null;

 Arduino.HEIGHT = 1000;
 Arduino.WIDTH = 1000;

 Arduino.scale = 1;
 Arduino.distCoef = 20;

 Arduino.showGrid = false;


/** Initialize function for  Arduino */
 Arduino.init = function () {
  PluginManager.injectHtml( Arduino.html);
  PluginManager.injectCss( Arduino.css)

   Arduino.ctxScratch = document.getElementById("scratch").getContext('2d');

   Arduino.canvas = document.getElementById("display");
   Arduino.ctx =  Arduino.canvas.getContext('2d');

  BotlyStudio.ideButtonLargeAction = function () {
     Arduino.execute();
  }
  BotlyStudio.ideButtonMiddleAction = function () {
     Arduino.reset();
  }
  BotlyStudio.ideButtonLeftAction = function () {
     Arduino.saveCanvas();
  }


  var head = document.getElementsByTagName('head')[0];
  var plugin = document.createElement('script');
  plugin.src = 'botlystudio/plugins/turtle/slider.js';
  plugin.onload = function () {
    var sliderSvg = document.getElementById('speed_slider');
     Arduino.speedSlider = new Slider(10, 35, 130, sliderSvg);
    var sliderSvg = document.getElementById('zoom_slider');
     Arduino.zoomSlider = new Slider(10, 35, 130, sliderSvg,  Arduino.display);
     Arduino.reset();
  }
  head.appendChild(plugin);
};

BotlyStudio.changeToolbox = function(){
  if(BotlyStudio.DIFFICULTY == 1){
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
	if(BotlyStudio.DIFFICULTY == 2){
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
		'  </category>' +		'  <sep></sep>' +
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
	if(BotlyStudio.DIFFICULTY == 3){
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
	if(BotlyStudio.DIFFICULTY == 4){
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


 Arduino.saveCanvas = function () {
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

 Arduino.setBackGround = function (path) {
  var canvasStyle = document.getElementById("display").style;
  canvasStyle.background = "#ffffff";

   Arduino.ctx.fillStyle = '#F2F2F2';
   Arduino.ctx.fill();
   Arduino.ctx.clearRect(0, 0,  Arduino.canvas.width,  Arduino.canvas.height);
   Arduino.sprites = [];


  var ctx =  Arduino.ctx;
  var background = new Image();
  background.src = path;

  // Make sure the image is loaded first otherwise nothing will draw.
  background.onload = function () {
    ctx.drawImage(background, 0, 0);
  }
};


 Arduino.execute = function () {
  if (!('Interpreter' in window)) {
    // Interpreter lazy loads and hasn't arrived yet.  Try again later.
    setTimeout( Arduino.execute, 250);
    return;
  }
  var code = BotlyStudio.generateJavaScript();
   Arduino.interpreter = new Interpreter(code,  Arduino.initInterpreter);
   Arduino.pidList.push(setTimeout( Arduino.executeChunk_, 100));
   Arduino.reset();
}


/**
 * Reset the turtle to the start position, clear the display, and kill any
 * pending tasks.
 */
 Arduino.reset = function () {
  // Starting location and heading of the turtle.
   Arduino.x =  Arduino.WIDTH / 2;
   Arduino.y =  Arduino.HEIGHT / 2;
   Arduino.heading = 0;
   Arduino.penDownValue = true;
   Arduino.visible = true;

  // Clear the canvas.
   Arduino.ctxScratch.canvas.width =  Arduino.ctxScratch.canvas.width;
   Arduino.ctxScratch.strokeStyle = '#525252';
   Arduino.ctxScratch.fillStyle = '#525252';
   Arduino.ctxScratch.lineWidth = 10;
   Arduino.ctxScratch.lineCap = 'round';
   Arduino.ctxScratch.font = 'normal 18pt Arial';
   Arduino.display();

  // Kill all tasks.
  for (var i = 0; i <  Arduino.pidList.length; i++) {
    window.clearTimeout( Arduino.pidList[i]);
  }
   Arduino.pidList.length = 0;
   Arduino.interpreter = null;
};

/**
 * Copy the scratch canvas to the display canvas. Add a turtle marker.
 */
 Arduino.display = function () {
  // Clear the display with white.
  if ( Arduino.zoomSlider != null)  Arduino.scale =  Arduino.map( Arduino.zoomSlider.getValue(), 0, 1, 0.1, 1);
  if ( Arduino.background == null) {
     Arduino.ctx.beginPath();
     Arduino.ctx.rect(0, 0,
       Arduino.ctx.canvas.width,  Arduino.ctx.canvas.height);
     Arduino.ctx.fillStyle = '#F2F2F2';
     Arduino.ctx.fill();
  } else  Arduino.setBackGround( Arduino.background)



  // Draw the user layer.
   Arduino.ctx.globalCompositeOperation = 'source-over';
   Arduino.ctx.drawImage( Arduino.ctxScratch.canvas, 0, 0);

  if ( Arduino.showGrid) {
    if ( Arduino.scale <= 0.4) drawGrid( Arduino.ctx,  Arduino.WIDTH,  Arduino.HEIGHT, 1000 *  Arduino.scale, 1, null);
    else if ( Arduino.scale <= 0.6) drawGrid( Arduino.ctx,  Arduino.WIDTH,  Arduino.HEIGHT, 400 *  Arduino.scale, 1, 200 *  Arduino.scale);
    else drawGrid( Arduino.ctx,  Arduino.WIDTH,  Arduino.HEIGHT, 100 *  Arduino.scale, 1, 20 *  Arduino.scale);
  }

  // Draw the turtle.
  if ( Arduino.visible) {
    // Make the turtle the colour of the pen.
    //  Arduino.ctx.strokeStyle =  Arduino.ctx.strokeStyle;
    //  Arduino.ctx.fillStyle =  Arduino.ctx.fillStyle;
     Arduino.ctx.strokeStyle = '#EA7D00';
     Arduino.ctx.fillStyle = '#EA7D00';


    var radians = 2 * Math.PI *  Arduino.heading / 360;
    radians += Math.PI / 2;


    // Draw the turtle body.
    var Radius = /* Arduino.ctxScratch.lineWidth / 2*/ + 30;
     Arduino.ctx.beginPath();
     Arduino.ctx.arc( Arduino.x,  Arduino.y, Radius *  Arduino.scale, 0, 2 * Math.PI, false);
     Arduino.ctx.lineWidth = 8 *  Arduino.scale;
     Arduino.ctx.stroke();


    // Draw the turtle head.

     Arduino.ctx.beginPath();
    radius = 130 *  Arduino.scale;
    arrowTipX =  Arduino.x + radius * Math.cos(radians);
    arrowTipY =  Arduino.y - radius * Math.sin(radians);
    arrowHeight = 20 *  Arduino.scale;
    arrowWidth = 25 *  Arduino.scale;

    Ax =  Arduino.x + (radius - arrowHeight) * Math.cos(radians) + (arrowWidth / 2) * Math.sin(radians);
    Ay =  Arduino.y - (radius - arrowHeight) * Math.sin(radians) + (arrowWidth / 2) * Math.cos(radians);

     Arduino.ctx.moveTo(arrowTipX, arrowTipY);
     Arduino.ctx.lineTo(Ax, Ay);

    Bx =  Arduino.x + (radius - arrowHeight) * Math.cos(radians) - (arrowWidth / 2) * Math.sin(radians);
    By =  Arduino.y - (radius - arrowHeight) * Math.sin(radians) - (arrowWidth / 2) * Math.cos(radians);

     Arduino.ctx.lineTo(Bx, By);

     Arduino.ctx.closePath();
     Arduino.ctx.stroke();
     Arduino.ctx.fill();


    var wheelRadius = 80 / 2 *  Arduino.scale
    var wheelTrack = 300 / 2 *  Arduino.scale;

    radians += Math.PI / 2;
     Arduino.ctx.beginPath();
     Arduino.ctx.lineWidth = 15 *  Arduino.scale;
     Arduino.ctx.lineCap = 'round';

    Ax =  Arduino.x + (wheelTrack) * Math.cos(radians) + (wheelRadius / 2) * Math.sin(radians);
    Ay =  Arduino.y - (wheelTrack) * Math.sin(radians) + (wheelRadius / 2) * Math.cos(radians);

     Arduino.ctx.moveTo(Ax, Ay);

    Bx =  Arduino.x + (wheelTrack) * Math.cos(radians) - (wheelRadius / 2) * Math.sin(radians);
    By =  Arduino.y - (wheelTrack) * Math.sin(radians) - (wheelRadius / 2) * Math.cos(radians);

     Arduino.ctx.lineTo(Bx, By);
     Arduino.ctx.stroke();

    radians += Math.PI;
     Arduino.ctx.beginPath();
     Arduino.ctx.lineWidth = 15 *  Arduino.scale;
     Arduino.ctx.lineCap = 'round';

    Ax =  Arduino.x + (wheelTrack) * Math.cos(radians) + (wheelRadius / 2) * Math.sin(radians);
    Ay =  Arduino.y - (wheelTrack) * Math.sin(radians) + (wheelRadius / 2) * Math.cos(radians);

     Arduino.ctx.moveTo(Ax, Ay);

    Bx =  Arduino.x + (wheelTrack) * Math.cos(radians) - (wheelRadius / 2) * Math.sin(radians);
    By =  Arduino.y - (wheelTrack) * Math.sin(radians) - (wheelRadius / 2) * Math.cos(radians);

     Arduino.ctx.lineTo(Bx, By);
     Arduino.ctx.stroke();

    //radians = Math.PI/12;
    var Rwidth = 400 *  Arduino.scale, Rheight = 180 *  Arduino.scale;
    roundRect( Arduino.ctx, radians,  Arduino.x,  Arduino.y, Rwidth, Rheight, 20 *  Arduino.scale, false);
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
 * Inject the  Arduino API into a JavaScript interpreter.
 * @param {!Interpreter} interpreter The JS Interpreter.
 * @param {!Interpreter.Object} scope Global scope.
 */
 Arduino.initInterpreter = function (interpreter, scope) {
  // API
  var wrapper;
  wrapper = function (distance) {
     Arduino.move(distance *  Arduino.scale);
  };
  interpreter.setProperty(scope, 'Avancer',
    interpreter.createNativeFunction(wrapper));
  wrapper = function (distance) {
     Arduino.move(-distance *  Arduino.scale);
  };
  interpreter.setProperty(scope, 'Reculer',
    interpreter.createNativeFunction(wrapper));

  wrapper = function (angle) {
     Arduino.turn(angle);
  };
  interpreter.setProperty(scope, 'droite',
    interpreter.createNativeFunction(wrapper));
  wrapper = function (angle) {
     Arduino.turn(-angle);
  };
  interpreter.setProperty(scope, 'gauche',
    interpreter.createNativeFunction(wrapper));

  wrapper = function () {
     Arduino.penDown(false);
  };
  interpreter.setProperty(scope, 'Lever',
    interpreter.createNativeFunction(wrapper));
  wrapper = function () {
     Arduino.penDown(true);
  };
  interpreter.setProperty(scope, 'Descendre',
    interpreter.createNativeFunction(wrapper));

  wrapper = function (angle, distance) {
     Arduino.turnGo(angle, distance *  Arduino.scale);
  };
  interpreter.setProperty(scope, 'turnGo',
    interpreter.createNativeFunction(wrapper));

  wrapper = function (width) {
     Arduino.penWidth(width *  Arduino.scale);
  };
  interpreter.setProperty(scope, 'penWidth',
    interpreter.createNativeFunction(wrapper));

  wrapper = function (colour) {
     Arduino.penColour(colour);
  };
  interpreter.setProperty(scope, 'penColour',
    interpreter.createNativeFunction(wrapper));

  wrapper = function () {
     Arduino.isVisible(false);
  };
  interpreter.setProperty(scope, 'hide Arduino',
    interpreter.createNativeFunction(wrapper));
  wrapper = function (id) {
     Arduino.isVisible(true);
  };
  interpreter.setProperty(scope, 'show Arduino',
    interpreter.createNativeFunction(wrapper));

  wrapper = function (text) {
     Arduino.drawPrint(text);
  };
  interpreter.setProperty(scope, 'print',
    interpreter.createNativeFunction(wrapper));

  wrapper = function (font, size, style) {
     Arduino.drawFont(font, size *  Arduino.scale, style);
  };
  interpreter.setProperty(scope, 'font',
    interpreter.createNativeFunction(wrapper));

  wrapper = function () {
    console.log("Not implemented");
  };
  interpreter.setProperty(scope, 'none',
    interpreter.createNativeFunction(wrapper));
};


 Arduino.map = function (x, in_min, in_max, out_min, out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};


/**
 * Execute a bite-sized chunk of the user's code.
 * @private
 */
 Arduino.executeChunk_ = function () {
  // All tasks should be complete now.  Clean up the PID list.
   Arduino.pidList.length = 0;
  var stepSpeed =  Arduino.speedSlider.getValue();
   Arduino.pause =  Arduino.map(stepSpeed, 0, 1, 20, 0) + 1;
  var go;
  do {
    try {
      go =  Arduino.interpreter.step();
    } catch (e) {
      // User error, terminate in shame.
      alert(e);
      go = false;
    }
    if (go &&  Arduino.pause) {
      // The last executed command requested a pause.
      go = false;
       Arduino.pidList.push(
        setTimeout( Arduino.executeChunk_,  Arduino.pause));
    }
  } while (go);
  // Wrap up if complete.
  if (! Arduino.pause) {
    BotlyStudio.workspace.highlightBlock(null);
    // Image complete; allow the user to submit this image to Reddit.
     Arduino.canSubmit = true;
  }
};



/**
 * Highlight a block and pause.
 * @param {string=} id ID of block.
 */
 Arduino.animate = function (id) {
   Arduino.display();
  if (id) {
    BotlyStudio.workspace.highlightBlock(id);
  }
  // Scale the speed non-linearly, to give better precision at the fast end.
  var stepSpeed = 1000 * Math.pow(1 -  Arduino.speedSlider.getValue(), 2);
   Arduino.pause = Math.max(1, stepSpeed);
};


/**
 * Move the turtle forward or backward.
 * @param {number} distance Pixels to move.
 * @param {string=} id ID of block.
 */
 Arduino.move = function (distance, id) {
  if ( Arduino.penDownValue) {
     Arduino.ctxScratch.beginPath();
     Arduino.ctxScratch.moveTo( Arduino.x,  Arduino.y);
  }
  if (distance) {
    distance *=  Arduino.distCoef;
     Arduino.x += distance * Math.sin(2 * Math.PI *  Arduino.heading / 360);
     Arduino.y -= distance * Math.cos(2 * Math.PI *  Arduino.heading / 360);
    var bump = 0;
  } else {
    // WebKit (unlike Gecko) draws nothing for a zero-length line.
    var bump = 0.1;
  }
  if ( Arduino.penDownValue) {
     Arduino.ctxScratch.lineTo( Arduino.x,  Arduino.y + bump);
     Arduino.ctxScratch.stroke();
  }
   Arduino.animate(id);
};



/**
 * Turn the turtle left or right.
 * @param {number} angle Degrees to turn clockwise.
 * @param {string=} id ID of block.
 */
 Arduino.turn = function (angle, id) {
   Arduino.heading += angle;
   Arduino.heading %= 360;
  if ( Arduino.heading < 0) {
     Arduino.heading += 360;
  }
   Arduino.animate(id);
};


 Arduino.turnGo = function (angle, distance, id) {
   Arduino.turn(angle);
   Arduino.move(distance);
}

/**
 * Lift or lower the pen.
 * @param {boolean} down True if down, false if up.
 * @param {string=} id ID of block.
 */
 Arduino.penDown = function (down, id) {
   Arduino.penDownValue = down;
   Arduino.animate(id);
};

/**
 * Change the thickness of lines.
 * @param {number} width New thickness in pixels.
 * @param {string=} id ID of block.
 */
 Arduino.penWidth = function (width, id) {
   Arduino.ctxScratch.lineWidth = width;
   Arduino.animate(id);
};

/**
 * Change the colour of the pen.
 * @param {string} colour Hexadecimal #rrggbb colour string.
 * @param {string=} id ID of block.
 */
 Arduino.penColour = function (colour, id) {
   Arduino.ctxScratch.strokeStyle = colour;
   Arduino.ctxScratch.fillStyle = colour;
   Arduino.animate(id);
};

/**
 * Make the turtle visible or invisible.
 * @param {boolean} visible True if visible, false if invisible.
 * @param {string=} id ID of block.
 */
 Arduino.isVisible = function (visible, id) {
   Arduino.visible = visible;
   Arduino.animate(id);
};

/**
 * Print some text.
 * @param {string} text Text to print.
 * @param {string=} id ID of block.
 */
 Arduino.drawPrint = function (text, id) {
   Arduino.ctxScratch.save();
   Arduino.ctxScratch.translate( Arduino.x,  Arduino.y);
   Arduino.ctxScratch.rotate(2 * Math.PI * ( Arduino.heading - 90) / 360);
   Arduino.ctxScratch.fillText(text, 0, 0);
   Arduino.ctxScratch.restore();
   Arduino.animate(id);
};

/**
 * Change the typeface of printed text.
 * @param {string} font Font name (e.g. 'Arial').
 * @param {number} size Font size (e.g. 18).
 * @param {string} style Font style (e.g. 'italic').
 * @param {string=} id ID of block.
 */
 Arduino.drawFont = function (font, size, style, id) {
   Arduino.ctxScratch.font = style + ' ' + size + 'pt ' + font;
   Arduino.animate(id);
};



/**
 * Determine if this event is unwanted.
 * @param {!Event} e Mouse or touch event.
 * @return {boolean} True if spam.
 */
 Arduino.eventSpam = function (e) {
  // Touch screens can generate 'touchend' followed shortly thereafter by
  // 'click'.  For now, just look for this very specific combination.
  // Some devices have both mice and touch, but assume the two won't occur
  // within two seconds of each other.
  var touchMouseTime = 2000;
  if (e.type == 'click' &&
     Arduino.eventSpam.previousType_ == 'touchend' &&
     Arduino.eventSpam.previousDate_ + touchMouseTime > Date.now()) {
    e.preventDefault();
    e.stopPropagation();
    return true;
  }
  // Users double-click or double-tap accidentally.
  var doubleClickTime = 400;
  if ( Arduino.eventSpam.previousType_ == e.type &&
     Arduino.eventSpam.previousDate_ + doubleClickTime > Date.now()) {
    e.preventDefault();
    e.stopPropagation();
    return true;
  }
   Arduino.eventSpam.previousType_ = e.type;
   Arduino.eventSpam.previousDate_ = Date.now();
  return false;
};

 Arduino.eventSpam.previousType_ = null;
 Arduino.eventSpam.previousDate_ = 0;

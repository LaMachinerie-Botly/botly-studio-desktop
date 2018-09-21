/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview XML toolbox embedded into a JavaScript text string.
 */
'use strict';

/** Create a namespace for the application. */
var BotlyStudio = BotlyStudio || {};
BotlyStudio.TOOLBOX_XML = null;

BotlyStudio.changeToolbox = function(){
	if(BotlyStudio.DIFFICULTY == 1){
		BotlyStudio.TOOLBOX_XML =
		'<xml>' +
		'  <sep></sep>' +
		'  <category id="catBotly" name="Botly">' +
		// '    <block type="botly_forward">' +
		// '      <value name="VALUE">' +
		// '        <shadow type="math_number">' +
		// '          <field name="NUM">10</field>' +
		// '        </shadow>' +
		// '      </value>' +
		// '    </block>' +
		// '    <block type="botly_backward">' +
		// '      <value name="VALUE">' +
		// '        <shadow type="math_number">' +
		// '          <field name="NUM">10</field>' +
		// '        </shadow>' +
		// '      </value>' +
		// '    </block>' +
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
		// '    <block type="botly_right">' +
		// '      <value name="VALUE">' +
		// '        <shadow type="math_number">' +
		// '          <field name="NUM">90</field>' +
		// '        </shadow>' +
		// '      </value>' +
		// '    </block>' +
		// '    <block type="botly_left">' +
		// '      <value name="VALUE">' +
		// '        <shadow type="math_number">' +
		// '          <field name="NUM">90</field>' +
		// '        </shadow>' +
		// '      </value>' +
		// '    </block>' +
		// '    <block type="botly_stop"></block>' +
		//'    <block type="botly_turn_go"></block>' +
		'    <block type="botly_crayon"></block>' +
		// '    <block type="botly_polygone"></block>' +
		// '    <block type="botly_cercle"></block>' +
		// '    <block type="botly_ligne"></block>' +
		// '    <block type="botly_contact"></block>' +
		// '    <block type="botly_lever_crayon"></block>' +
		// '    <block type="botly_descendre_crayon"></block>' +
		'  </category>' +
		'  <sep></sep>' +
		// '  <category id="catLogic" name="Logic">' +
		// '    <block type="controls_if"></block>' +
		// '    <block type="logic_compare"></block>' +
		// '    <block type="logic_operation"></block>' +
		// '    <block type="logic_negate"></block>' +
		// '    <block type="logic_boolean"></block>' +
		// '    <block type="logic_null"></block>' +
		// '    <block type="logic_ternary"></block>' +
		// '  </category>' +
		//'  <sep></sep>' +
		'  <category id="catLoops" name="Loops">' +
		'    <block type="controls_repeat_ext">' +
		'      <value name="TIMES">' +
		'        <block type="math_number">' +
		'          <field name="NUM">5</field>' +
		'        </block>' +
		'      </value>' +
		'    </block>' +
		// '    <block type="controls_whileUntil"></block>' +
		// '    <block type="controls_for">' +
		// '      <value name="FROM">' +
		// '        <block type="math_number">' +
		// '          <field name="NUM">1</field>' +
		// '        </block>' +
		// '      </value>' +
		// '      <value name="TO">' +
		// '        <block type="math_number">' +
		// '          <field name="NUM">10</field>' +
		// '        </block>' +
		// '      </value>' +
		// '      <value name="BY">' +
		// '        <block type="math_number">' +
		// '          <field name="NUM">1</field>' +
		// '        </block>' +
		// '      </value>' +
		// '    </block>' +
		// '    <block type="controls_flow_statements"></block>' +
		'  </category>' +
		'  <sep></sep>' +
		'  <category id="catMath" name="Math">' +
		'    <block type="math_number"></block>' +
		// '    <block type="math_arithmetic"></block>' +
		// '    <block type="math_single"></block>' +
		// '    <block type="math_trig"></block>' +
		// '    <block type="math_constant"></block>' +
		// '    <block type="math_number_property"></block>' +
		// '    <block type="math_change">' +
		// '      <value name="DELTA">' +
		// '        <block type="math_number">' +
		// '          <field name="NUM">1</field>' +
		// '        </block>' +
		// '      </value>' +
		// '    </block>' +
		// '    <block type="math_round"></block>' +
		// '    <block type="math_modulo"></block>' +
		// '    <block type="math_constrain">' +
		// '      <value name="LOW">' +
		// '        <block type="math_number">' +
		// '          <field name="NUM">1</field>' +
		// '        </block>' +
		// '      </value>' +
		// '      <value name="HIGH">' +
		// '        <block type="math_number">' +
		// '          <field name="NUM">100</field>' +
		// '        </block>' +
		// '      </value>' +
		// '    </block>' +
		// '    <block type="math_random_int">' +
		// '      <value name="FROM">' +
		// '        <block type="math_number">' +
		// '          <field name="NUM">1</field>' +
		// '        </block>' +
		// '      </value>' +
		// '      <value name="TO">' +
		// '        <block type="math_number">' +
		// '          <field name="NUM">100</field>' +
		// '        </block>' +
		// '      </value>' +
		// '    </block>' +
		// '    <block type="math_random_float"></block>' +
		// '    <block type="base_map"></block>' +
		'  </category>' +
		'  <sep></sep>' +
		//'  <category id="catText" name="Text">' +
		//'    <block type="text"></block>' +
		//'    <block type="text_join"></block>' +
		//'    <block type="text_append">' +
		//'      <value name="TEXT">' +
		//'        <block type="text"></block>' +
		//'      </value>' +
		//'    </block>' +
		//'    <block type="text_length"></block>' +
		//'    <block type="text_isEmpty"></block>' +
		//'    <!--block type="text_trim"></block Need to update block -->' +
		//'    <!--block type="text_print"></block Part of the serial comms -->' +
		//'  </category>' +
		//'  <sep></sep>' +
		// '  <category id="catVariables" name="Variables">' +
		// '    <block type="variables_get"></block>' +
		// '    <block type="variables_set"></block>' +
		// '    <block type="variables_set">' +
		// '      <value name="VALUE">' +
		// '        <block type="variables_set_type"></block>' +
		// '      </value>' +
		// '    </block>' +
		// '    <block type="variables_set_type"></block>' +
		// '  </category>' +
		// '  <sep></sep>' +
		// '  <category id="catFunctions" name="Functions" custom="PROCEDURE"></category>' +
		// '  <sep></sep>' +
		// // '  <category id="catInputOutput" name="Input/Output">' +
		// '    <block type="io_digitalwrite">' +
		// '      <value name="STATE">' +
		// '        <block type="io_highlow"></block>' +
		// '      </value>' +
		// '    </block>' +
		// '    <block type="io_digitalread"></block>' +
		// '    <block type="io_builtin_led">' +
		// '      <value name="STATE">' +
		// '        <block type="io_highlow"></block>' +
		// '      </value>' +
		// '    </block>' +
		// '    <block type="io_analogwrite"></block>' +
		// '    <block type="io_analogread"></block>' +
		// '    <block type="io_highlow"></block>' +
		// '    <block type="io_pulsein">' +
		// '      <value name="PULSETYPE">' +
		// '        <shadow type="io_highlow"></shadow>' +
		// '      </value>' +
		// '    </block>' +
		// '    <block type="io_pulsetimeout">' +
		// '      <value name="PULSETYPE">' +
		// '        <shadow type="io_highlow"></shadow>' +
		// '      </value>' +
		// '      <value name="TIMEOUT">' +
		// '        <block type="math_number"></block>' +
		// '      </value>'+
		// '    </block>' +
		// '  </category>' +
		// '  <sep></sep>' +
		'  <category id="catTime" name="Time">' +
		// '    <block type="time_delay">' +
		// '      <value name="DELAY_TIME_MILI">' +
		// '        <block type="math_number">' +
		// '          <field name="NUM">1000</field>' +
		// '        </block>' +
		// '      </value>' +
		// '    </block>' +
		// '    <block type="time_delaymicros">' +
		// '      <value name="DELAY_TIME_MICRO">' +
		// '        <block type="math_number">' +
		// '          <field name="NUM">100</field>' +
		// '        </block>' +
		// '      </value>' +
		// '    </block>' +
		// '    <block type="time_millis"></block>' +
		// '    <block type="time_micros"></block>' +
		'    <block type="infinite_loop"></block>' +
		'  </category>' +
		'  <sep></sep>' +
		'</xml>';
	}
	if(BotlyStudio.DIFFICULTY == 2){
		BotlyStudio.TOOLBOX_XML =
		'<xml>' +
		'  <sep></sep>' +
		'  <category id="catBotly" name="Botly">' +
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
		// '    <block type="botly_deplacement">' +
		// '		<value name="VALUE">' +
		// '       	<shadow type="math_number">' +
		// '          		<field name="NUM">90</field>' +
		// '        	</shadow>' +
		// '		</value>' +
		// '    </block>' +
		// '    <block type="botly_rotation">' +
		// '		<value name="angle">' +
		// '       	<shadow type="math_number">' +
		// '          		<field name="NUM">90</field>' +
		// '        	</shadow>' +
		// '		</value>' +
		// '    </block>' +
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
		// '    <block type="botly_stop"></block>' +
		// '    <block type="botly_turn_go"></block>' +
		'    <block type="botly_crayon"></block>' +
		// '    <block type="botly_polygone"></block>' +
		// '    <block type="botly_cercle"></block>' +
		// '    <block type="botly_ligne"></block>' +
		// '    <block type="botly_contact"></block>' +
		// '    <block type="botly_lever_crayon"></block>' +
		// '    <block type="botly_descendre_crayon"></block>' +
		'  </category>' +		'  <sep></sep>' +
		// '  <category id="catLogic" name="Logic">' +
		// '    <block type="controls_if"></block>' +
		// '    <block type="logic_compare"></block>' +
		// '    <block type="logic_operation"></block>' +
		// '    <block type="logic_negate"></block>' +
		// '    <block type="logic_boolean"></block>' +
		// '    <block type="logic_null"></block>' +
		// '    <block type="logic_ternary"></block>' +
		// '  </category>' +
		// '  <sep></sep>' +
		'  <category id="catLoops" name="Loops">' +
		'    <block type="controls_repeat_ext">' +
		'      <value name="TIMES">' +
		'        <block type="math_number">' +
		'          <field name="NUM">5</field>' +
		'        </block>' +
		'      </value>' +
		'    </block>' +
		// '    <block type="controls_whileUntil"></block>' +
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
		// '    <block type="controls_flow_statements"></block>' +
		'  </category>' +
		'  <sep></sep>' +
		'  <category id="catMath" name="Math">' +
		'    <block type="math_number"></block>' +
		// '    <block type="math_arithmetic"></block>' +
		// '    <block type="math_single"></block>' +
		// '    <block type="math_trig"></block>' +
		// '    <block type="math_constant"></block>' +
		// '    <block type="math_number_property"></block>' +
		// '    <block type="math_change">' +
		// '      <value name="DELTA">' +
		// '        <block type="math_number">' +
		// '          <field name="NUM">1</field>' +
		// '        </block>' +
		// '      </value>' +
		// '    </block>' +
		// '    <block type="math_round"></block>' +
		// '    <block type="math_modulo"></block>' +
		// '    <block type="math_constrain">' +
		// '      <value name="LOW">' +
		// '        <block type="math_number">' +
		// '          <field name="NUM">1</field>' +
		// '        </block>' +
		// '      </value>' +
		// '      <value name="HIGH">' +
		// '        <block type="math_number">' +
		// '          <field name="NUM">100</field>' +
		// '        </block>' +
		// '      </value>' +
		// '    </block>' +
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
		// '    <block type="math_random_float"></block>' +
		// '    <block type="base_map"></block>' +
		'  </category>' +
		'  <sep></sep>' +
		//'  <category id="catText" name="Text">' +
		//'    <block type="text"></block>' +
		//'    <block type="text_join"></block>' +
		//'    <block type="text_append">' +
		//'      <value name="TEXT">' +
		//'        <block type="text"></block>' +
		//'      </value>' +
		//'    </block>' +
		//'    <block type="text_length"></block>' +
		//'    <block type="text_isEmpty"></block>' +
		//'    <!--block type="text_trim"></block Need to update block -->' +
		//'    <!--block type="text_print"></block Part of the serial comms -->' +
		//'  </category>' +
		//'  <sep></sep>' +
		'  <category id="catVariables" name="Variables">' +
		'    <block type="variables_get"></block>' +
		'    <block type="variables_set"></block>' +
		// '    <block type="variables_set">' +
		// '      <value name="VALUE">' +
		// '        <block type="variables_set_type"></block>' +
		// '      </value>' +
		// '    </block>' +
		// '    <block type="variables_set_type"></block>' +
		'  </category>' +
		'  <sep></sep>' +
		'  <category id="catFunctions" name="Functions" custom="PROCEDURE"></category>' +
		'  <sep></sep>' +
		// '  <category id="catInputOutput" name="Input/Output">' +
		// '    <block type="io_digitalwrite">' +
		// '      <value name="STATE">' +
		// '        <block type="io_highlow"></block>' +
		// '      </value>' +
		// '    </block>' +
		// '    <block type="io_digitalread"></block>' +
		// '    <block type="io_builtin_led">' +
		// '      <value name="STATE">' +
		// '        <block type="io_highlow"></block>' +
		// '      </value>' +
		// '    </block>' +
		// '    <block type="io_analogwrite"></block>' +
		// '    <block type="io_analogread"></block>' +
		// '    <block type="io_highlow"></block>' +
		// '    <block type="io_pulsein">' +
		// '      <value name="PULSETYPE">' +
		// '        <shadow type="io_highlow"></shadow>' +
		// '      </value>' +
		// '    </block>' +
		// '    <block type="io_pulsetimeout">' +
		// '      <value name="PULSETYPE">' +
		// '        <shadow type="io_highlow"></shadow>' +
		// '      </value>' +
		// '      <value name="TIMEOUT">' +
		// '        <block type="math_number"></block>' +
		// '      </value>'+
		// '    </block>' +
		// '  </category>' +
		// '  <sep></sep>' +
		'  <category id="catTime" name="Time">' +
		// '    <block type="time_delay">' +
		// '      <value name="DELAY_TIME_MILI">' +
		// '        <block type="math_number">' +
		// '          <field name="NUM">1000</field>' +
		// '        </block>' +
		// '      </value>' +
		// '    </block>' +
		// '    <block type="time_delaymicros">' +
		// '      <value name="DELAY_TIME_MICRO">' +
		// '        <block type="math_number">' +
		// '          <field name="NUM">100</field>' +
		// '        </block>' +
		// '      </value>' +
		// '    </block>' +
		// '    <block type="time_millis"></block>' +
		// '    <block type="time_micros"></block>' +
		'    <block type="infinite_loop"></block>' +
		'</xml>';
	}
	if(BotlyStudio.DIFFICULTY == 3){
		BotlyStudio.TOOLBOX_XML =
		'<xml>' +
		'  <sep></sep>' +
		'  <category id="catBotly" name="Botly">' +
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
		//'  <category id="catText" name="Text">' +
		//'    <block type="text"></block>' +
		//'    <block type="text_join"></block>' +
		//'    <block type="text_append">' +
		//'      <value name="TEXT">' +
		//'        <block type="text"></block>' +
		//'      </value>' +
		//'    </block>' +
		//'    <block type="text_length"></block>' +
		//'    <block type="text_isEmpty"></block>' +
		//'    <!--block type="text_trim"></block Need to update block -->' +
		//'    <!--block type="text_print"></block Part of the serial comms -->' +
		//'  </category>' +
		//'  <sep></sep>' +
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
		// '  <category id="catInputOutput" name="Input/Output">' +
		// '    <block type="io_digitalwrite">' +
		// '      <value name="STATE">' +
		// '        <block type="io_highlow"></block>' +
		// '      </value>' +
		// '    </block>' +
		// '    <block type="io_digitalread"></block>' +
		// '    <block type="io_builtin_led">' +
		// '      <value name="STATE">' +
		// '        <block type="io_highlow"></block>' +
		// '      </value>' +
		// '    </block>' +
		// '    <block type="io_analogwrite"></block>' +
		// '    <block type="io_analogread"></block>' +
		// '    <block type="io_highlow"></block>' +
		// '    <block type="io_pulsein">' +
		// '      <value name="PULSETYPE">' +
		// '        <shadow type="io_highlow"></shadow>' +
		// '      </value>' +
		// '    </block>' +
		// '    <block type="io_pulsetimeout">' +
		// '      <value name="PULSETYPE">' +
		// '        <shadow type="io_highlow"></shadow>' +
		// '      </value>' +
		// '      <value name="TIMEOUT">' +
		// '        <block type="math_number"></block>' +
		// '      </value>'+
		// '    </block>' +
		// '  </category>' +
		// '  <sep></sep>' +
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
		'  <category id="catBotly" name="Botly">' +
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
		//'  <category id="catText" name="Text">' +
		//'    <block type="text"></block>' +
		//'    <block type="text_join"></block>' +
		//'    <block type="text_append">' +
		//'      <value name="TEXT">' +
		//'        <block type="text"></block>' +
		//'      </value>' +
		//'    </block>' +
		//'    <block type="text_length"></block>' +
		//'    <block type="text_isEmpty"></block>' +
		//'    <!--block type="text_trim"></block Need to update block -->' +
		//'    <!--block type="text_print"></block Part of the serial comms -->' +
		//'  </category>' +
		//'  <sep></sep>' +
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
		// '  <category id="catInputOutput" name="Input/Output">' +
		// '    <block type="io_digitalwrite">' +
		// '      <value name="STATE">' +
		// '        <block type="io_highlow"></block>' +
		// '      </value>' +
		// '    </block>' +
		// '    <block type="io_digitalread"></block>' +
		// '    <block type="io_builtin_led">' +
		// '      <value name="STATE">' +
		// '        <block type="io_highlow"></block>' +
		// '      </value>' +
		// '    </block>' +
		// '    <block type="io_analogwrite"></block>' +
		// '    <block type="io_analogread"></block>' +
		// '    <block type="io_highlow"></block>' +
		// '    <block type="io_pulsein">' +
		// '      <value name="PULSETYPE">' +
		// '        <shadow type="io_highlow"></shadow>' +
		// '      </value>' +
		// '    </block>' +
		// '    <block type="io_pulsetimeout">' +
		// '      <value name="PULSETYPE">' +
		// '        <shadow type="io_highlow"></shadow>' +
		// '      </value>' +
		// '      <value name="TIMEOUT">' +
		// '        <block type="math_number"></block>' +
		// '      </value>'+
		// '    </block>' +
		// '  </category>' +
		// '  <sep></sep>' +
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

}

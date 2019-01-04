//WORK IN PROGRESS
//This is the DEV API file
//TODO implements dev function

var PluginManager = PluginManager || {};
PluginManager.plDesigntoggle = [];

PluginManager.import = function () {
    var head = document.getElementsByTagName('head')[0];
        plugins = [];
        //Turtle plugin
        
        plugins[0] = document.createElement('script');
        plugins[0].src = 'botlystudio/plugins/turtle/turtle.js';
        plugins[0].onload = function(){
            Turtle.init();
            PluginManager.plDesigntoggle[0] = function(){Turtle.toggleConsole();};
        };
		
        
    for (i = 0; i < plugins.length; i++) head.appendChild(plugins[0]);
    if (plugins.length == 0) {
        codeElement = document.getElementById("code_dialog")
        codeElement.className = "content playground_panel_large";
        codeElement.id = "code";
        document.getElementById("playground").insertBefore(codeElement, document.getElementById("console"));
        PluginManager.plDesigntoggle[0] = function() {PluginManager.defaultToggle();};
    }
    
};


PluginManager.injectHtml = function (HtmlStr) {
    var row = document.getElementById("playground");
    row.insertAdjacentHTML('afterbegin', HtmlStr);
}


PluginManager.injectCss = function (CssStr) {
    var css = document.createElement('style');
    css.type = 'text/css';
    if (css.styleSheet) css.styleSheet.cssText = CssStr; // Support for IE
    else css.appendChild(document.createTextNode(CssStr)); // Support for the rest
    document.getElementsByTagName("head")[0].appendChild(css);
}

PluginManager.contentHeightToggle = function(){
    for(i = 0; i < PluginManager.plDesigntoggle.length; i++){
        PluginManager.plDesigntoggle[i]();
    }
}

PluginManager.defaultToggle = function(){
    var outputHeader = document.getElementById('console_header');
    var arduino = document.getElementById('code');

    // Blockly doesn't resize with CSS3 transitions enabled, so do it manually
    var timerId = setInterval(function () {
      window.dispatchEvent(new Event('resize'));
    }, 15);
    setTimeout(function () {
      clearInterval(timerId);
    }, 400);
  
    if (!outputHeader.className.match('active')) {
      //blocks.className = 'content height_transition blocks_panel_small';
      arduino.className = 'content height_transition playground_panel_small';
    } else {
      //blocks.className = 'content height_transition blocks_panel_large';
      arduino.className = 'content height_transition playground_panel_large';
    }
    // If the height transition CSS is left then blockly does not resize
    setTimeout(function () {
      //blocks.className = blocks.className.replace('height_transition', '');
      arduino.className = arduino.className.replace('height_transition', '');
    }, 400);
}
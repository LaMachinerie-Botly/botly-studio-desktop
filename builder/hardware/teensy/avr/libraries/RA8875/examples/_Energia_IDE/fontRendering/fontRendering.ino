/*
Preliminary font rendering engine *ALPHA* test
*/

#include <SPI.h>
#include <RA8875.h>
#include "fonts/Square_Pixel7__14.h"//
#include "fonts/Imagine_FontFixed__15.h"
/* 
Check the font folder inside the library if you want to test other fonts
*/


#define RA8875_RESET 9//any pin or 255 to disable it!

#if defined(NEEDS_SET_MODULE)//Energia, this case is for stellaris/tiva
RA8875 tft = RA8875(3);//select SPI module 3
/*
for module 3 (stellaris)
SCLK:  PD_0
MOSI:  PD_3
MISO:  PD_2
SS:    PD_1
*/
#endif


void setup() 
{
  //Serial.begin(38400);
  //long unsigned debug_start = millis ();
  //while (!Serial && ((millis () - debug_start) <= 5000)) ;
  //Serial.println("RA8875 start");

  tft.begin(RA8875_800x480);
  
  /*
  x,y,text,color,scale,font
  */

  tft.gPrint(30,30,"Hello world!",RA8875_WHITE,1,&Imagine_FontFixed__15);
}

void loop() 
{

}
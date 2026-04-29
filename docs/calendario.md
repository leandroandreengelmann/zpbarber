/* Calendar */

box-sizing: border-box;

position: relative;
width: 1719px;
height: 2899px;

border: 1px dashed #9747FF;
border-radius: 5px;


/* Type=Month view, Breakpoint=Desktop */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

position: absolute;
width: 1280px;
height: 912px;
left: 16px;
top: 16px;

background: #FFFFFF;
border: 1px solid #E9EAEB;
/* Shadows/shadow-xs

Shadows allow you to add depth and realism to designs by positioning elements on a z-axis.
*/
box-shadow: 0px 1px 2px rgba(10, 13, 18, 0.05);
border-radius: 12px;


/* _Calendar header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 20px;
isolation: isolate;

width: 1280px;
height: 96px;

background: #FFFFFF;
border-bottom: 1px solid #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 1;


/* Content */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 20px 24px;
gap: 16px;

width: 1280px;
height: 96px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* Date and text */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 717px;
height: 56px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Calendar date icon */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 0px;

width: 64px;
height: 56px;

background: #FFFFFF;
border: 1px solid #E9EAEB;
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Month wrapper */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 4px 8px 2px;

width: 64px;
height: 24px;

background: #FAFAFA;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Month */

width: 25px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 1px 8px 3px;

width: 64px;
height: 32px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Date */

width: 22px;
height: 28px;

/* Text lg/Bold */
font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 28px;
/* identical to box height, or 156% */

color: #6941C6;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and supporting text */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 641px;
height: 50px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Text and badge */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 8px;

width: 182px;
height: 28px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text */

width: 121px;
height: 28px;

/* Text lg/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 28px;
/* identical to box height, or 156% */

color: #181D27;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Badge */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 2px 6px;

width: 53px;
height: 22px;

background: #FFFFFF;
border: 1px solid #D5D7DA;
/* Shadows/shadow-xs

Shadows allow you to add depth and realism to designs by positioning elements on a z-axis.
*/
box-shadow: 0px 1px 2px rgba(10, 13, 18, 0.05);
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Text */

width: 41px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: center;

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Supporting text */

width: 641px;
height: 20px;

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #535862;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Actions */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 12px;

width: 499px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Buttons/Button */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 10px;

width: 40px;
height: 40px;

border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* placeholder

<p>placeholder, circle</p>
*/

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 8.33%;
right: 8.33%;
top: 8.33%;
bottom: 8.33%;

border: 1.66667px solid #A4A7AE;


/* Button group */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 162px;
height: 40px;

border: 1px solid #D5D7DA;
/* Shadows/shadow-xs-skeuomorphic

Used to create a subtle skeuomorphic effect in components such as buttons and tabs.

This can be removed or replaced with shadow-xs if you prefer a flat style.
*/
box-shadow: inset 0px 0px 0px 1px rgba(10, 13, 18, 0.18), inset 0px -2px 0px rgba(10, 13, 18, 0.05);
filter: drop-shadow(0px 1px 2px rgba(10, 13, 18, 0.05));
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 8;


/* arrow-left

arrow, left
*/

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 20.83%;
right: 20.83%;
top: 20.83%;
bottom: 20.83%;

border: 1.66667px solid #A4A7AE;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 16px;
gap: 6px;

width: 74px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
z-index: 7;


/* Text */

width: 42px;
height: 20px;

/* Text sm/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;
z-index: 6;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;
z-index: 5;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 0;
z-index: 4;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 5;
flex-grow: 0;
z-index: 3;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 6;
flex-grow: 0;
z-index: 2;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 7;
flex-grow: 0;
z-index: 1;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 8;
flex-grow: 0;
z-index: 0;


/* arrow-right

arrow, right
*/

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 20.83%;
right: 20.83%;
top: 20.83%;
bottom: 20.83%;

border: 1.66667px solid #A4A7AE;


/* _Calendar view dropdown */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 135px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Dropdown */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 135px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Buttons/Button */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 10px 14px;
gap: 4px;

width: 135px;
height: 40px;

background: #FFFFFF;
border: 1px solid #D5D7DA;
/* Shadows/shadow-xs-skeuomorphic

Used to create a subtle skeuomorphic effect in components such as buttons and tabs.

This can be removed or replaced with shadow-xs if you prefer a flat style.
*/
box-shadow: 0px 1px 2px rgba(10, 13, 18, 0.05), inset 0px 0px 0px 1px rgba(10, 13, 18, 0.18), inset 0px -2px 0px rgba(10, 13, 18, 0.05);
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* placeholder

<p>placeholder, circle</p>
*/

display: none;
width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text padding */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px 2px;

width: 83px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Text */

width: 79px;
height: 20px;

/* Text sm/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* chevron-down

chevron, down, dropdown
*/

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Icon */

position: absolute;
left: 25%;
right: 25%;
top: 37.5%;
bottom: 37.5%;

border: 1.66667px solid #A4A7AE;


/* Button */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 10px 14px;
gap: 4px;

width: 126px;
height: 40px;

background: #7F56D9;
/* Shadows/shadow-xs-skeuomorphic

Used to create a subtle skeuomorphic effect in components such as buttons and tabs.

This can be removed or replaced with shadow-xs if you prefer a flat style.
*/
box-shadow: 0px 1px 2px rgba(10, 13, 18, 0.05), inset 0px 0px 0px 1px rgba(10, 13, 18, 0.18), inset 0px -2px 0px rgba(10, 13, 18, 0.05);
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* plus

plus, add, addition, calculate, mathematics
*/

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 20.83%;
right: 20.83%;
top: 20.83%;
bottom: 20.83%;

border: 1.66667px solid #D6BBFB;


/* Text padding */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px 2px;

width: 74px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Text */

width: 70px;
height: 20px;

/* Text sm/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #FFFFFF;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* placeholder

<p>placeholder, circle</p>
*/

display: none;
width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Main */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 1280px;
height: 816px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 1;
z-index: 0;


/* Content */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;

width: 1280px;
height: 816px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;


/* Column */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 182.86px;
height: 816px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 34px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Text */

width: 26px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

display: none;
width: 6px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FDFDFD;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 16px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 86px;

opacity: 0.6;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #FAFAFA;
border: 1px solid #E9EAEB;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 100.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 48px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #535862;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #F9F5FF;
border: 1px solid #E9D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 96.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #6941C6;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 52px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #7F56D9;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 100.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #3538CD;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 48px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #444CE7;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

width: 166.86px;
height: 18px;

opacity: 0.6;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Text */

width: 150.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 8px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 56px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #FAFAFA;
border: 1px solid #E9EAEB;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 100.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 48px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #535862;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #EFF8FF;
border: 1px solid #B2DDFF;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 96.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #175CD3;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 52px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #1570EF;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

display: none;
width: 160px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 14px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 56px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #FAFAFA;
border: 1px solid #E9EAEB;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 100.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 48px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #535862;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #FDF2FA;
border: 1px solid #FCCEEE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 97.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #C11574;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 51px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #DD2590;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

display: none;
width: 160px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 16px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 56px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #FAFAFA;
border: 1px solid #E9EAEB;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 100.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 48px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #535862;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #EFF8FF;
border: 1px solid #B2DDFF;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 102.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #175CD3;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 46px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #1570EF;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

display: none;
width: 160px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 15px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 26px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #FAFAFA;
border: 1px solid #E9EAEB;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 100.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 48px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #535862;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #F9F5FF;
border: 1px solid #E9D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

display: none;
width: 160px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Column */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 182.86px;
height: 816px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 1;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 34px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Text */

width: 28px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

display: none;
width: 6px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FDFDFD;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 14px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 26px;

opacity: 0.6;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #EFF8FF;
border: 1px solid #B2DDFF;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 94.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #175CD3;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 54px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #1570EF;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #F9F5FF;
border: 1px solid #E9D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

display: none;
width: 160px;
height: 18px;

opacity: 0.6;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 8px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 56px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #FDF2FA;
border: 1px solid #FCCEEE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 94.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #C11574;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 54px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #DD2590;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #F9F5FF;
border: 1px solid #E9D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 100.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #6941C6;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 48px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #7F56D9;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

display: none;
width: 160px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 14px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 86px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #FAFAFA;
border: 1px solid #E9EAEB;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #F9F5FF;
border: 1px solid #E9D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

display: none;
width: 160px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 14px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 86px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #FEF6EE;
border: 1px solid #F9DBAF;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 96.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #B93815;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 52px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #E04F16;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #F9F5FF;
border: 1px solid #E9D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 102.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #6941C6;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 46px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #7F56D9;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #EDFCF2;
border: 1px solid #AAF0C4;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #16B364;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 138.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 89.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #087443;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 47px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #099250;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

display: none;
width: 160px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 16px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 56px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 96.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #3538CD;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 52px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #444CE7;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #F9F5FF;
border: 1px solid #E9D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 94.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #6941C6;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 54px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #7F56D9;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

display: none;
width: 160px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Column */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 182.86px;
height: 816px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 1;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 34px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Text */

width: 26px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

display: none;
width: 6px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 6px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 86px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #FAFAFA;
border: 1px solid #E9EAEB;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #F9F5FF;
border: 1px solid #E9D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

display: none;
width: 160px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 8px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 86px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #EFF8FF;
border: 1px solid #B2DDFF;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 100.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #175CD3;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 48px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #1570EF;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 94.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #3538CD;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 54px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #444CE7;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 102.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #3538CD;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 46px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #444CE7;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

width: 166.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Text */

width: 150.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 14px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 26px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #EFF8FF;
border: 1px solid #B2DDFF;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 99.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #175CD3;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 49px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #1570EF;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #F9F5FF;
border: 1px solid #E9D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

display: none;
width: 160px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

background: #FAFAFA;
border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 24px;
height: 18px;
left: calc(50% - 24px/2);
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: center;

color: #414651;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 56px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #EFF8FF;
border: 1px solid #B2DDFF;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 100.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #175CD3;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 48px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #1570EF;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 100.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #3538CD;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 48px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #444CE7;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

display: none;
width: 160px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 16px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 26px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #EFF8FF;
border: 1px solid #B2DDFF;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 99.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #175CD3;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 49px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #1570EF;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #F9F5FF;
border: 1px solid #E9D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

display: none;
width: 160px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Column */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 182.86px;
height: 816px;


/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 1;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 34px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Text */

width: 23px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

display: none;
width: 6px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 8px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 86px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #FDF2FA;
border: 1px solid #FCCEEE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 94.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #C11574;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 54px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #DD2590;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #FAFAFA;
border: 1px solid #E9EAEB;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 100.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 48px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #535862;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #EDFCF2;
border: 1px solid #AAF0C4;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #16B364;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 138.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 88.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #087443;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 48px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #099250;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

display: none;
width: 160px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 8px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 26px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #EDFCF2;
border: 1px solid #AAF0C4;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #16B364;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 138.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 83.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #087443;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 53px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #099250;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #F9F5FF;
border: 1px solid #E9D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

display: none;
width: 160px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

background: #FAFAFA;
border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 24px;
height: 18px;
left: calc(50% - 24px/2);
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: center;

color: #414651;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 56px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #FDF2FA;
border: 1px solid #FCCEEE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 94.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #C11574;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 54px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #DD2590;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #FAFAFA;
border: 1px solid #E9EAEB;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 100.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 48px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #535862;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

display: none;
width: 160px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 16px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 26px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #FDF2FA;
border: 1px solid #FCCEEE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 94.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #C11574;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 54px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #DD2590;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #F9F5FF;
border: 1px solid #E9D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

display: none;
width: 160px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

background: #FAFAFA;
border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 24px;
height: 18px;
left: calc(50% - 24px/2);
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: center;

color: #414651;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 56px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #FAFAFA;
border: 1px solid #E9EAEB;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 100.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 48px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #535862;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #FDF2FA;
border: 1px solid #FCCEEE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 100.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #C11574;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 48px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #DD2590;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

display: none;
width: 160px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Column */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 182.86px;
height: 816px;


/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 1;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 34px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Text */

width: 15px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

display: none;
width: 6px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 8px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 26px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #FAFAFA;
border: 1px solid #E9EAEB;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 100.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 48px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #535862;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #F9F5FF;
border: 1px solid #E9D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

display: none;
width: 160px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

background: #7F56D9;
border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 24px;
height: 18px;
left: calc(50% - 24px/2);
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: center;

color: #FFFFFF;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 86px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #FAFAFA;
border: 1px solid #E9EAEB;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 100.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 48px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #535862;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #F9F5FF;
border: 1px solid #E9D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 94.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #6941C6;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 54px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #7F56D9;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 102.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #3538CD;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 46px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #444CE7;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

display: none;
width: 160px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 13px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 86px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #FAFAFA;
border: 1px solid #E9EAEB;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 100.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 48px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #535862;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #F9F5FF;
border: 1px solid #E9D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 99.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #6941C6;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 49px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #7F56D9;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 100.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #3538CD;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 48px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #444CE7;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

width: 166.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Text */

width: 150.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 16px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 86px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #FAFAFA;
border: 1px solid #E9EAEB;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 100.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 48px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #535862;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #FEFBE8;
border: 1px solid #FEEE95;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 102.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #A15C07;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 46px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #CA8504;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 100.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #3538CD;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 48px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #444CE7;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

width: 166.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Text */

width: 150.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 14px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 26px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #FAFAFA;
border: 1px solid #E9EAEB;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 150.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 100.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 48px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #535862;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #F9F5FF;
border: 1px solid #E9D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

display: none;
width: 160px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Column */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 182.86px;
height: 816px;


/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 1;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 34px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Text */

width: 20px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

display: none;
width: 6px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 8px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 26px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #FEF6EE;
border: 1px solid #F9DBAF;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #EF6820;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 138.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 82.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #B93815;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 54px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #E04F16;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #F9F5FF;
border: 1px solid #E9D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

display: none;
width: 160px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 12px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 26px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #FEF6EE;
border: 1px solid #F9DBAF;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #EF6820;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 138.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 84.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #B93815;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 52px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #E04F16;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #F9F5FF;
border: 1px solid #E9D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

display: none;
width: 160px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 14px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 26px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #EDFCF2;
border: 1px solid #AAF0C4;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #16B364;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 138.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 89.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #087443;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 47px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #099250;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #F9F5FF;
border: 1px solid #E9D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

display: none;
width: 160px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 16px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 86px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #FAFAFA;
border: 1px solid #E9EAEB;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #F9F5FF;
border: 1px solid #E9D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

display: none;
width: 160px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FDFDFD;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 6px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 86px;

opacity: 0.6;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #FAFAFA;
border: 1px solid #E9EAEB;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #F9F5FF;
border: 1px solid #E9D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

display: none;
width: 160px;
height: 18px;

opacity: 0.6;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Column */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 182.86px;
height: 816px;


/* Inside auto layout */
flex: none;
order: 6;
align-self: stretch;
flex-grow: 1;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 34px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Text */

width: 23px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

display: none;
width: 6px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 8px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 86px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #FAFAFA;
border: 1px solid #E9EAEB;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #F9F5FF;
border: 1px solid #E9D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

display: none;
width: 160px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 14px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 26px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #F4F3FF;
border: 1px solid #D9D6FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #7A5AF8;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 138.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 90.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #5925DC;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 46px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #6938EF;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #F9F5FF;
border: 1px solid #E9D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

display: none;
width: 160px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 14px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 86px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #FAFAFA;
border: 1px solid #E9EAEB;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #F9F5FF;
border: 1px solid #E9D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

display: none;
width: 160px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 16px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 86px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #FAFAFA;
border: 1px solid #E9EAEB;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #F9F5FF;
border: 1px solid #E9D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

display: none;
width: 160px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;
gap: 4px;

width: 182.86px;
height: 156.4px;

background: #FDFDFD;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 8px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;



/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;

width: 166.86px;
height: 26px;

opacity: 0.6;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 166.86px;
height: 26px;

background: #FEF6EE;
border: 1px solid #F9DBAF;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #EF6820;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 138.86px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 138.86px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #B93815;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

display: none;
width: 48px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #E04F16;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #F9F5FF;
border: 1px solid #E9D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

display: none;
width: 160px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 8px;

display: none;
width: 160px;
height: 18px;

opacity: 0.6;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Type=Week view, Breakpoint=Desktop */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

position: absolute;
width: 1280px;
height: 912px;
left: 16px;
top: 995px;

background: #FFFFFF;
border: 1px solid #E9EAEB;
/* Shadows/shadow-xs

Shadows allow you to add depth and realism to designs by positioning elements on a z-axis.
*/
box-shadow: 0px 1px 2px rgba(10, 13, 18, 0.05);
border-radius: 12px;


/* _Calendar header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 20px;
isolation: isolate;

width: 1280px;
height: 96px;

background: #FFFFFF;
border-bottom: 1px solid #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 1;


/* Content */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 20px 24px;
gap: 16px;

width: 1280px;
height: 96px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* Date and text */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 722px;
height: 56px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Calendar date icon */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 0px;

width: 64px;
height: 56px;

background: #FFFFFF;
border: 1px solid #E9EAEB;
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Month wrapper */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 4px 8px 2px;

width: 64px;
height: 24px;

background: #FAFAFA;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Month */

width: 25px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 1px 8px 3px;

width: 64px;
height: 32px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Date */

width: 22px;
height: 28px;

/* Text lg/Bold */
font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 28px;
/* identical to box height, or 156% */

color: #6941C6;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and supporting text */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 646px;
height: 50px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Text and badge */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 8px;

width: 182px;
height: 28px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text */

width: 121px;
height: 28px;

/* Text lg/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 28px;
/* identical to box height, or 156% */

color: #181D27;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Badge */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 2px 6px;

width: 53px;
height: 22px;

background: #FFFFFF;
border: 1px solid #D5D7DA;
/* Shadows/shadow-xs

Shadows allow you to add depth and realism to designs by positioning elements on a z-axis.
*/
box-shadow: 0px 1px 2px rgba(10, 13, 18, 0.05);
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Text */

width: 41px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: center;

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Supporting text */

width: 646px;
height: 20px;

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #535862;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Actions */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 12px;

width: 494px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Buttons/Button */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 10px;

width: 40px;
height: 40px;

border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* placeholder

<p>placeholder, circle</p>
*/

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 8.33%;
right: 8.33%;
top: 8.33%;
bottom: 8.33%;

border: 1.66667px solid #A4A7AE;


/* Button group */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 162px;
height: 40px;

border: 1px solid #D5D7DA;
/* Shadows/shadow-xs-skeuomorphic

Used to create a subtle skeuomorphic effect in components such as buttons and tabs.

This can be removed or replaced with shadow-xs if you prefer a flat style.
*/
box-shadow: inset 0px 0px 0px 1px rgba(10, 13, 18, 0.18), inset 0px -2px 0px rgba(10, 13, 18, 0.05);
filter: drop-shadow(0px 1px 2px rgba(10, 13, 18, 0.05));
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 8;


/* arrow-left

arrow, left
*/

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 20.83%;
right: 20.83%;
top: 20.83%;
bottom: 20.83%;

border: 1.66667px solid #A4A7AE;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 16px;
gap: 6px;

width: 74px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
z-index: 7;


/* Text */

width: 42px;
height: 20px;

/* Text sm/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;
z-index: 6;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;
z-index: 5;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 0;
z-index: 4;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 5;
flex-grow: 0;
z-index: 3;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 6;
flex-grow: 0;
z-index: 2;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 7;
flex-grow: 0;
z-index: 1;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 8;
flex-grow: 0;
z-index: 0;


/* arrow-right

arrow, right
*/

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 20.83%;
right: 20.83%;
top: 20.83%;
bottom: 20.83%;

border: 1.66667px solid #A4A7AE;


/* _Calendar view dropdown */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 130px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Dropdown */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 130px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Buttons/Button */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 10px 14px;
gap: 4px;

width: 130px;
height: 40px;

background: #FFFFFF;
border: 1px solid #D5D7DA;
/* Shadows/shadow-xs-skeuomorphic

Used to create a subtle skeuomorphic effect in components such as buttons and tabs.

This can be removed or replaced with shadow-xs if you prefer a flat style.
*/
box-shadow: 0px 1px 2px rgba(10, 13, 18, 0.05), inset 0px 0px 0px 1px rgba(10, 13, 18, 0.18), inset 0px -2px 0px rgba(10, 13, 18, 0.05);
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* placeholder

<p>placeholder, circle</p>
*/

display: none;
width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text padding */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px 2px;

width: 78px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Text */

width: 74px;
height: 20px;

/* Text sm/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* chevron-down

chevron, down, dropdown
*/

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Icon */

position: absolute;
left: 25%;
right: 25%;
top: 37.5%;
bottom: 37.5%;

border: 1.66667px solid #A4A7AE;


/* Button */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 10px 14px;
gap: 4px;

width: 126px;
height: 40px;

background: #7F56D9;
/* Shadows/shadow-xs-skeuomorphic

Used to create a subtle skeuomorphic effect in components such as buttons and tabs.

This can be removed or replaced with shadow-xs if you prefer a flat style.
*/
box-shadow: 0px 1px 2px rgba(10, 13, 18, 0.05), inset 0px 0px 0px 1px rgba(10, 13, 18, 0.18), inset 0px -2px 0px rgba(10, 13, 18, 0.05);
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* plus

plus, add, addition, calculate, mathematics
*/

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 20.83%;
right: 20.83%;
top: 20.83%;
bottom: 20.83%;

border: 1.66667px solid #D6BBFB;


/* Text padding */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px 2px;

width: 74px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Text */

width: 70px;
height: 20px;

/* Text sm/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #FFFFFF;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* placeholder

<p>placeholder, circle</p>
*/

display: none;
width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Main */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 1280px;
height: 816px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 1;
z-index: 0;


/* Header */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

position: absolute;
height: 40px;
left: 0px;
right: 0px;
top: 0px;

/* Shadows/shadow-sm

Shadows allow you to add depth and realism to designs by positioning elements on a z-axis.
*/
box-shadow: 0px 1px 2px -1px rgba(10, 13, 18, 0.1);
filter: drop-shadow(0px 1px 3px rgba(10, 13, 18, 0.1));

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 1;


/* Spacer */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 72px;
height: 40px;

background: #FFFFFF;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px;
gap: 4px;

width: 172.57px;
height: 40px;

background: #FFFFFF;
border-right: 1px solid #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Text */

width: 26px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

width: 8px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Date */

width: 8px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px;
gap: 4px;

width: 172.57px;
height: 40px;

background: #FFFFFF;
border-right: 1px solid #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 1;


/* Text */

width: 22px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

width: 8px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Date */

width: 8px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px;
gap: 4px;

width: 172.57px;
height: 40px;

background: #FFFFFF;
border-right: 1px solid #E9EAEB;

/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 1;


/* Text */

width: 26px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

width: 8px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Date */

width: 8px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px;
gap: 4px;

width: 172.57px;
height: 40px;

background: #FFFFFF;
border-right: 1px solid #E9EAEB;

/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 1;


/* Text */

width: 27px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

width: 8px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Date */

width: 8px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px;
gap: 8px;

width: 172.57px;
height: 40px;

background: #FFFFFF;
border-right: 1px solid #E9EAEB;

/* Inside auto layout */
flex: none;
order: 5;
flex-grow: 1;


/* Text */

width: 15px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

width: 24px;
height: 24px;

background: #7F56D9;
border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Date */

width: 24px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: center;

color: #FFFFFF;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px;
gap: 4px;

width: 172.57px;
height: 40px;

background: #FFFFFF;
border-right: 1px solid #E9EAEB;

/* Inside auto layout */
flex: none;
order: 6;
flex-grow: 1;


/* Text */

width: 20px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

width: 12px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Date */

width: 12px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px;
gap: 4px;

width: 172.57px;
height: 40px;

background: #FFFFFF;
border-right: 1px solid #E9EAEB;

/* Inside auto layout */
flex: none;
order: 7;
flex-grow: 1;


/* Text */

width: 23px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

width: 14px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Date */

width: 14px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Content */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 8px 0px 0px;
isolation: isolate;

width: 1280px;
height: 816px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 1;
z-index: 0;


/* Column */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 72px;
height: 960px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 72px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Time */

position: absolute;
width: 30px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 72px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Time */

position: absolute;
width: 30px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 72px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Time */

position: absolute;
width: 36px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 72px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* Time */

position: absolute;
width: 34px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 72px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 0;


/* Time */

position: absolute;
width: 35px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 72px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 5;
flex-grow: 0;


/* Time */

position: absolute;
width: 28px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 72px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 6;
flex-grow: 0;


/* Time */

position: absolute;
width: 29px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 72px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 7;
flex-grow: 0;


/* Time */

position: absolute;
width: 30px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 72px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 8;
flex-grow: 0;


/* Time */

position: absolute;
width: 30px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 72px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 9;
flex-grow: 0;


/* Time */

position: absolute;
width: 30px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* Column */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 172.57px;
height: 1008px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;
z-index: 1;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Event wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;

position: absolute;
left: 0px;
right: -0.43px;
top: 0px;
bottom: 0px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 1;


/* _Calendar event/Day and week view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 6px 8px;
gap: 4px;

width: 161px;
height: 36px;

background: #FAFAFA;
border: 1px solid #E9EAEB;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 145px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Text and dot */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 145px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Event */

width: 145px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Time */

display: none;
width: 144px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #535862;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 96px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 6;
align-self: stretch;
flex-grow: 0;


/* Event wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;

position: absolute;
left: 0px;
right: -0.43px;
top: 0px;
bottom: 0px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 2;


/* _Calendar event/Day and week view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 6px 8px;
gap: 4px;

width: 161px;
height: 84px;

background: #EFF8FF;
border: 1px solid #B2DDFF;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 145px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Text and dot */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 145px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Event */

width: 145px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #175CD3;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Time */

width: 145px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #1570EF;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
z-index: 1;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 7;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 8;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 9;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 10;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 11;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 12;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 13;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 14;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 15;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 16;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 17;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 18;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 19;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* Column */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 172.57px;
height: 1104px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 1;
z-index: 2;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 96px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 0;


/* Event wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;

position: absolute;
left: 0px;
right: -0.43px;
top: 0px;
bottom: 0px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 2;


/* _Calendar event/Day and week view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 6px 8px;
gap: 4px;

width: 161px;
height: 84px;

background: #FDF2FA;
border: 1px solid #FCCEEE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 145px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Text and dot */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 145px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Event */

width: 145px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #C11574;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Time */

width: 145px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #DD2590;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
z-index: 1;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 6;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 7;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 8;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 9;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 10;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 11;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 144px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 12;
align-self: stretch;
flex-grow: 0;


/* Event wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;

position: absolute;
left: 0px;
right: -0.43px;
top: 0px;
bottom: 0px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 3;


/* _Calendar event/Day and week view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 6px 8px;
gap: 4px;

width: 161px;
height: 132px;

background: #F4F3FF;
border: 1px solid #D9D6FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 145px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Text and dot */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 145px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Event */

width: 145px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #5925DC;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Time */

width: 145px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #6938EF;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
z-index: 2;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;
z-index: 1;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 13;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 14;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 15;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 16;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 17;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 18;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 19;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* Column */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 172.57px;
height: 1296px;


/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 1;
z-index: 3;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 144px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Event wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;

position: absolute;
left: 0px;
right: -0.43px;
top: 0px;
bottom: 0px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 3;


/* _Calendar event/Day and week view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 6px 8px;
gap: 4px;

width: 161px;
height: 132px;

background: #EFF8FF;
border: 1px solid #B2DDFF;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 145px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Text and dot */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 145px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Event */

width: 145px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #175CD3;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Time */

width: 145px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #1570EF;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
z-index: 2;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;
z-index: 1;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 96px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* Event wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;

position: absolute;
left: 0px;
right: -0.43px;
top: 0px;
bottom: 0px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 2;


/* _Calendar event/Day and week view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 6px 8px;
gap: 4px;

width: 161px;
height: 84px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 145px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Text and dot */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 145px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Event */

width: 145px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #3538CD;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Time */

width: 145px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #444CE7;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
z-index: 1;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 6;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 7;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 96px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 8;
align-self: stretch;
flex-grow: 0;


/* Event wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;

position: absolute;
left: 0px;
right: -0.43px;
top: 0px;
bottom: 0px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 2;


/* _Calendar event/Day and week view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 6px 8px;
gap: 4px;

width: 161px;
height: 84px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 145px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Text and dot */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 145px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Event */

width: 145px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #3538CD;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Time */

width: 145px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #444CE7;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
z-index: 1;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 9;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 192px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 10;
align-self: stretch;
flex-grow: 0;


/* Event wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
padding: 6px;

position: absolute;
left: 0px;
right: -0.43px;
top: 0px;
bottom: 0px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 4;


/* _Calendar event/Day and week view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 6px 8px;
gap: 4px;

width: 161px;
height: 180px;

background: #FEFBE8;
border: 1px solid #FEEE95;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 145px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Text and dot */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 145px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Event */

width: 145px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #A15C07;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Time */

width: 145px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #CA8504;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
z-index: 3;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;
z-index: 2;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;
z-index: 1;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 11;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 12;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 13;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 14;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 15;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 16;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 17;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 18;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 19;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* Column */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 172.57px;
height: 1008px;


/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 1;
z-index: 4;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 6;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 7;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 96px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 8;
align-self: stretch;
flex-grow: 0;


/* Event wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;

position: absolute;
left: 0px;
right: -0.43px;
top: 0px;
bottom: 0px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 2;


/* _Calendar event/Day and week view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 6px 8px;
gap: 4px;

width: 161px;
height: 84px;

background: #EDFCF2;
border: 1px solid #AAF0C4;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 145px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Text and dot */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 145px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Event */

width: 135px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #087443;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #16B364;


/* Time */

width: 145px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #099250;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
z-index: 1;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 9;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 10;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 11;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 12;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 13;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 14;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 15;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 16;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 17;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 18;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 19;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* Column */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 172.57px;
height: 1152px;


/* Inside auto layout */
flex: none;
order: 5;
flex-grow: 1;
z-index: 5;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Event wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;

position: absolute;
left: 0px;
right: -0.43px;
top: 0px;
bottom: 0px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 1;


/* _Calendar event/Day and week view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 6px 8px;
gap: 4px;

width: 161px;
height: 36px;

background: #FAFAFA;
border: 1px solid #E9EAEB;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 145px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Text and dot */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 145px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Event */

width: 145px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Time */

display: none;
width: 144px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #535862;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 96px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 0;


/* Event wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;

position: absolute;
left: 0px;
right: -0.43px;
top: 0px;
bottom: 0px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 2;


/* _Calendar event/Day and week view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 6px 8px;
gap: 4px;

width: 161px;
height: 84px;

background: #F9F5FF;
border: 1px solid #E9D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 145px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Text and dot */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 145px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Event */

width: 145px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #6941C6;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Time */

width: 145px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #7F56D9;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
z-index: 1;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 6;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 7;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 8;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 9;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 192px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 10;
align-self: stretch;
flex-grow: 0;


/* Event wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
padding: 6px;

position: absolute;
left: 0px;
right: -0.43px;
top: 0px;
bottom: 0px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 4;


/* _Calendar event/Day and week view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 6px 8px;
gap: 4px;

width: 161px;
height: 180px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 145px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Text and dot */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 145px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Event */

width: 145px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #3538CD;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Time */

width: 145px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #444CE7;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
z-index: 3;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;
z-index: 2;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;
z-index: 1;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 11;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 12;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 13;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 14;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 15;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 16;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 17;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 18;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 19;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* Column */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 172.57px;
height: 960px;


/* Inside auto layout */
flex: none;
order: 6;
flex-grow: 1;
z-index: 6;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 6;
align-self: stretch;
flex-grow: 0;


/* Event wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;

position: absolute;
left: 0px;
right: -0.43px;
top: 0px;
bottom: 0px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 1;


/* _Calendar event/Day and week view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 6px 8px;
gap: 4px;

width: 161px;
height: 36px;

background: #FEF6EE;
border: 1px solid #F9DBAF;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 145px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Text and dot */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 145px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Event */

width: 135px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #B93815;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #EF6820;


/* Time */

display: none;
width: 144px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #E04F16;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 7;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 8;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 9;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 10;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 11;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 12;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 13;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 14;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 15;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 16;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 17;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 18;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 19;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* Column */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 172.57px;
height: 1008px;


/* Inside auto layout */
flex: none;
order: 7;
flex-grow: 1;
z-index: 7;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 6;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 7;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 8;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 9;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 96px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 10;
align-self: stretch;
flex-grow: 0;


/* Event wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;

position: absolute;
left: 0px;
right: -0.43px;
top: 0px;
bottom: 0px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 2;


/* _Calendar event/Day and week view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 6px 8px;
gap: 4px;

width: 161px;
height: 84px;

background: #F4F3FF;
border: 1px solid #D9D6FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 145px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Text and dot */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 145px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Event */

width: 135px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #5925DC;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #7A5AF8;


/* Time */

width: 145px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #6938EF;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
z-index: 1;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 11;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 12;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 13;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 14;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 15;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 16;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 17;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 18;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 172.57px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 19;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 172.57px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Scroll bar (control fill with bottom padding) */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px 6px 360px;

position: absolute;
width: 18px;
right: 0px;
top: 40px;
bottom: 0px;


/* Inside auto layout */
flex: none;
order: 8;
flex-grow: 0;
z-index: 8;


/* Bar */

width: 6px;
height: 408px;

background: #000000;
opacity: 0.15;
border: 1px solid #FFFFFF;
border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Calendar time marker */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 4px;

position: absolute;
height: 18px;
left: 0px;
right: 0px;
top: 604px;


/* Inside auto layout */
flex: none;
order: 9;
flex-grow: 0;
z-index: 9;


/* Time */

width: 64px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #7F56D9;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Marker */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 1212px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Dot */

width: 8px;
height: 8px;

background: #7F56D9;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
margin: 0px -2px;


/* Line */

width: 1206px;
height: 1px;

background: #7F56D9;
border-radius: 2px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Type=Day view, Breakpoint=Desktop */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

position: absolute;
width: 1280px;
height: 912px;
left: 16px;
top: 1971px;

background: #FFFFFF;
border: 1px solid #E9EAEB;
/* Shadows/shadow-xs

Shadows allow you to add depth and realism to designs by positioning elements on a z-axis.
*/
box-shadow: 0px 1px 2px rgba(10, 13, 18, 0.05);
border-radius: 12px;


/* _Calendar header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 20px;
isolation: isolate;

width: 1280px;
height: 96px;

background: #FFFFFF;
border-bottom: 1px solid #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 1;


/* Content */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 20px 24px;
gap: 16px;

width: 1280px;
height: 96px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* Date and text */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 734px;
height: 56px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Calendar date icon */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 0px;

width: 64px;
height: 56px;

background: #FFFFFF;
border: 1px solid #E9EAEB;
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Month wrapper */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 4px 8px 2px;

width: 64px;
height: 24px;

background: #FAFAFA;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Month */

width: 25px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 1px 8px 3px;

width: 64px;
height: 32px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Date */

width: 22px;
height: 28px;

/* Text lg/Bold */
font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 28px;
/* identical to box height, or 156% */

color: #6941C6;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and supporting text */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 658px;
height: 50px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Text and badge */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 8px;

width: 212px;
height: 28px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text */

width: 151px;
height: 28px;

/* Text lg/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 28px;
/* identical to box height, or 156% */

color: #181D27;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Badge */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 2px 6px;

width: 53px;
height: 22px;

background: #FFFFFF;
border: 1px solid #D5D7DA;
/* Shadows/shadow-xs

Shadows allow you to add depth and realism to designs by positioning elements on a z-axis.
*/
box-shadow: 0px 1px 2px rgba(10, 13, 18, 0.05);
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Text */

width: 41px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: center;

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Supporting text */

width: 658px;
height: 20px;

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #535862;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Actions */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 12px;

width: 482px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Buttons/Button */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 10px;

width: 40px;
height: 40px;

border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* placeholder

<p>placeholder, circle</p>
*/

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 8.33%;
right: 8.33%;
top: 8.33%;
bottom: 8.33%;

border: 1.66667px solid #A4A7AE;


/* Button group */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 162px;
height: 40px;

border: 1px solid #D5D7DA;
/* Shadows/shadow-xs-skeuomorphic

Used to create a subtle skeuomorphic effect in components such as buttons and tabs.

This can be removed or replaced with shadow-xs if you prefer a flat style.
*/
box-shadow: inset 0px 0px 0px 1px rgba(10, 13, 18, 0.18), inset 0px -2px 0px rgba(10, 13, 18, 0.05);
filter: drop-shadow(0px 1px 2px rgba(10, 13, 18, 0.05));
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 8;


/* arrow-left

arrow, left
*/

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 20.83%;
right: 20.83%;
top: 20.83%;
bottom: 20.83%;

border: 1.66667px solid #A4A7AE;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 16px;
gap: 6px;

width: 74px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
z-index: 7;


/* Text */

width: 42px;
height: 20px;

/* Text sm/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;
z-index: 6;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;
z-index: 5;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 0;
z-index: 4;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 5;
flex-grow: 0;
z-index: 3;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 6;
flex-grow: 0;
z-index: 2;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 7;
flex-grow: 0;
z-index: 1;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 8;
flex-grow: 0;
z-index: 0;


/* arrow-right

arrow, right
*/

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 20.83%;
right: 20.83%;
top: 20.83%;
bottom: 20.83%;

border: 1.66667px solid #A4A7AE;


/* _Calendar view dropdown */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 118px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Dropdown */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 118px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Buttons/Button */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 10px 14px;
gap: 4px;

width: 118px;
height: 40px;

background: #FFFFFF;
border: 1px solid #D5D7DA;
/* Shadows/shadow-xs-skeuomorphic

Used to create a subtle skeuomorphic effect in components such as buttons and tabs.

This can be removed or replaced with shadow-xs if you prefer a flat style.
*/
box-shadow: 0px 1px 2px rgba(10, 13, 18, 0.05), inset 0px 0px 0px 1px rgba(10, 13, 18, 0.18), inset 0px -2px 0px rgba(10, 13, 18, 0.05);
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* placeholder

<p>placeholder, circle</p>
*/

display: none;
width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text padding */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px 2px;

width: 66px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Text */

width: 62px;
height: 20px;

/* Text sm/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* chevron-down

chevron, down, dropdown
*/

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Icon */

position: absolute;
left: 25%;
right: 25%;
top: 37.5%;
bottom: 37.5%;

border: 1.66667px solid #A4A7AE;


/* Button */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 10px 14px;
gap: 4px;

width: 126px;
height: 40px;

background: #7F56D9;
/* Shadows/shadow-xs-skeuomorphic

Used to create a subtle skeuomorphic effect in components such as buttons and tabs.

This can be removed or replaced with shadow-xs if you prefer a flat style.
*/
box-shadow: 0px 1px 2px rgba(10, 13, 18, 0.05), inset 0px 0px 0px 1px rgba(10, 13, 18, 0.18), inset 0px -2px 0px rgba(10, 13, 18, 0.05);
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* plus

plus, add, addition, calculate, mathematics
*/

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 20.83%;
right: 20.83%;
top: 20.83%;
bottom: 20.83%;

border: 1.66667px solid #D6BBFB;


/* Text padding */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px 2px;

width: 74px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Text */

width: 70px;
height: 20px;

/* Text sm/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #FFFFFF;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* placeholder

<p>placeholder, circle</p>
*/

display: none;
width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Main */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;

width: 1280px;
height: 816px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 1;
z-index: 0;


/* Left content */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 952px;
height: 822px;

border-right: 1px solid #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Content */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 952px;
height: 822px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;
z-index: 0;


/* Column */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 72px;
height: 960px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 72px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Time */

position: absolute;
width: 30px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 72px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Time */

position: absolute;
width: 30px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 72px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Time */

position: absolute;
width: 36px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 72px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* Time */

position: absolute;
width: 34px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 72px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 0;


/* Time */

position: absolute;
width: 35px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 72px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 5;
flex-grow: 0;


/* Time */

position: absolute;
width: 28px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 72px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 6;
flex-grow: 0;


/* Time */

position: absolute;
width: 29px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 72px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 7;
flex-grow: 0;


/* Time */

position: absolute;
width: 30px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 72px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 8;
flex-grow: 0;


/* Time */

position: absolute;
width: 30px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 72px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 9;
flex-grow: 0;


/* Time */

position: absolute;
width: 30px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* Column */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 880px;
height: 1152px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;
z-index: 1;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 880px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 880px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 880px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 880px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 880px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Event wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;

position: absolute;
left: 0px;
right: 0px;
top: 0px;
bottom: 0px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 1;


/* _Calendar event/Day and week view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 6px 8px;
gap: 4px;

width: 868px;
height: 36px;

background: #FAFAFA;
border: 1px solid #E9EAEB;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 852px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Text and dot */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 852px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Event */

width: 852px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Time */

display: none;
width: 144px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #535862;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 880px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 880px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 880px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 880px;
height: 96px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 0;


/* Event wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;

position: absolute;
left: 0px;
right: 0px;
top: 0px;
bottom: 0px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 2;


/* _Calendar event/Day and week view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 6px 8px;
gap: 4px;

width: 868px;
height: 84px;

background: #F9F5FF;
border: 1px solid #E9D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 852px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Text and dot */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 852px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Event */

width: 852px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #6941C6;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Time */

width: 852px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #7F56D9;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 880px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
z-index: 1;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 880px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 880px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 880px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 880px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 6;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 880px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 880px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 7;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 880px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 880px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 8;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 880px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 880px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 9;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 880px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 880px;
height: 192px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 10;
align-self: stretch;
flex-grow: 0;


/* Event wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
padding: 6px;

position: absolute;
left: 0px;
right: 0px;
top: 0px;
bottom: 0px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 4;


/* _Calendar event/Day and week view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 6px 8px;
gap: 4px;

width: 868px;
height: 180px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 852px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Text and dot */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 852px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Event */

width: 852px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #3538CD;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Time */

width: 852px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #444CE7;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 880px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
z-index: 3;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 880px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;
z-index: 2;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 880px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;
z-index: 1;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 880px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 880px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 11;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 880px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 880px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 12;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 880px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 880px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 13;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 880px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 880px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 14;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 880px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 880px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 15;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 880px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 880px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 16;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 880px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 880px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 17;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 880px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 880px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 18;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 880px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 880px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 19;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 880px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Scroll bar (control fill with bottom padding) */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px 6px 400px;

position: absolute;
width: 18px;
right: 0px;
top: 0px;
bottom: 0px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;
z-index: 2;


/* Bar */

width: 6px;
height: 414px;

background: #000000;
opacity: 0.15;
border: 1px solid #FFFFFF;
border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Calendar time marker */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 4px;

position: absolute;
height: 18px;
left: 0px;
right: 0px;
top: 604px;


/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;
z-index: 3;


/* Time */

width: 64px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #7F56D9;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Marker */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 884px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Dot */

width: 8px;
height: 8px;

background: #7F56D9;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
margin: 0px -2px;


/* Line */

width: 878px;
height: 1px;

background: #7F56D9;
border-radius: 2px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Right content */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 328px;
height: 816px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Date picker menu */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;

width: 328px;
height: 388px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 1;


/* Date picker */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 0px;

width: 328px;
height: 388px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Content */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 20px 24px;
gap: 16px;

width: 328px;
height: 388px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Calendar */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 280px;
height: 348px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Month */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
gap: 57px;

width: 280px;
height: 32px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Buttons/Button utility */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 6px;

margin: 0 auto;
width: 32px;
height: 32px;

border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* chevron-left

chevron, left
*/

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 37.5%;
right: 37.5%;
top: 25%;
bottom: 25%;

border: 1.67px solid #A4A7AE;


/* Text */

margin: 0 auto;
width: 94px;
height: 20px;

/* Text sm/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Buttons/Button utility */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 6px;

margin: 0 auto;
width: 32px;
height: 32px;

border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* chevron-right

chevron, right
*/

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 37.5%;
right: 37.5%;
top: 25%;
bottom: 25%;

border: 1.67px solid #A4A7AE;


/* Actions */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 12px;

display: none;
width: 280px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Dates */

/* Auto layout */
display: flex;
flex-direction: row;
flex-wrap: wrap;
align-items: flex-start;
align-content: flex-start;
padding: 0px;
row-gap: 4px;

width: 280px;
height: 304px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 5;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 6;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 7;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #717680;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #A4A7AE;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 8;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #717680;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #A4A7AE;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 9;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 10;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 11;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 12;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 13;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 14;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 15;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 16;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 17;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

background: #7F56D9;
border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 18;
flex-grow: 0;


/* Connector right */

position: absolute;
visibility: hidden;
width: 40px;
height: 40px;
right: -20px;
top: 0px;

background: #FAFAFA;


/* Connector left */

position: absolute;
visibility: hidden;
width: 40px;
height: 40px;
left: -20px;
top: 0px;

background: #FAFAFA;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #FFFFFF;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #FFFFFF;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 19;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 20;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 21;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 22;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 23;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 24;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 25;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 26;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 27;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 28;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 29;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 30;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 31;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 32;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 33;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 34;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 35;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 36;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 37;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

background: #FAFAFA;
border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 38;
flex-grow: 0;


/* Connector right */

position: absolute;
visibility: hidden;
width: 40px;
height: 40px;
right: -20px;
top: 0px;

background: #FAFAFA;


/* Connector left */

position: absolute;
visibility: hidden;
width: 40px;
height: 40px;
left: -20px;
top: 0px;

background: #FAFAFA;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 39;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #414651;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #7F56D9;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 40;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #717680;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #A4A7AE;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 41;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #717680;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #A4A7AE;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 42;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #717680;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #A4A7AE;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 43;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #717680;



/* Dot */

position: absolute;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #A4A7AE;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 44;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #717680;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #A4A7AE;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 45;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #717680;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #A4A7AE;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 46;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #717680;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #A4A7AE;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 47;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #717680;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #A4A7AE;


/* _Calendar cell */

width: 40px;
height: 40px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 48;
flex-grow: 0;


/* Text */

position: absolute;
width: 24px;
height: 20px;
left: calc(50% - 24px/2);
top: calc(50% - 20px/2);

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #717680;



/* Dot */

position: absolute;
visibility: hidden;
width: 5px;
height: 5px;
left: calc(50% - 5px/2);
bottom: 4px;

background: #A4A7AE;


/* Bottom panel */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: flex-start;
padding: 16px;
gap: 12px;

display: none;
width: 328px;
height: 72px;

border-top: 1px solid #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Event wrapper */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 20px 24px;
gap: 20px;
isolation: isolate;

width: 328px;
height: 428px;

border-top: 1px solid #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 1;
z-index: 0;


/* _Scroll bar (control fill with bottom padding) */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px 6px 128px;

position: absolute;
width: 18px;
left: 312px;
top: 0px;
bottom: 0px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* Bar */

width: 6px;
height: 292px;

background: #000000;
opacity: 0.15;
border: 1px solid #FFFFFF;
border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Gradient mask */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

position: absolute;
left: 0px;
right: 0px;
top: 0px;
bottom: 0px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
z-index: 1;


/* Gradient mask main */

width: 328px;
height: 332px;

background: #000000;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;


/* Gradient mask bottom */

width: 328px;
height: 96px;

background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.00552296) 8.07%, rgba(0, 0, 0, 0.0217837) 15.54%, rgba(0, 0, 0, 0.04832) 22.5%, rgba(0, 0, 0, 0.0846696) 29.04%, rgba(0, 0, 0, 0.13037) 35.26%, rgba(0, 0, 0, 0.18496) 41.25%, rgba(0, 0, 0, 0.247976) 47.1%, rgba(0, 0, 0, 0.318957) 52.9%, rgba(0, 0, 0, 0.39744) 58.75%, rgba(0, 0, 0, 0.482963) 64.74%, rgba(0, 0, 0, 0.575064) 70.96%, rgba(0, 0, 0, 0.67328) 77.5%, rgba(0, 0, 0, 0.77715) 84.46%, rgba(0, 0, 0, 0.88621) 91.93%, #000000 100%);

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Heading and details */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 8px;

width: 280px;
height: 104px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;
z-index: 2;


/* Heading */

width: 280px;
height: 24px;

/* Text md/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 24px;
/* identical to box height, or 150% */

color: #181D27;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Details */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 6px;

width: 280px;
height: 72px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Icon and text */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 6px;

width: 280px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* calendar

calendar, date, booking
*/

width: 16px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 12.5%;
right: 12.5%;
top: 8.33%;
bottom: 8.33%;

border: 1.5px solid #A4A7AE;


/* Text */

width: 258px;
height: 20px;

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #535862;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Icon and text */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 6px;

width: 280px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* clock

clock, timer, alarm, watch
*/

width: 16px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 8.33%;
right: 8.33%;
top: 8.33%;
bottom: 8.33%;

border: 1.5px solid #A4A7AE;


/* Text */

width: 258px;
height: 20px;

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #535862;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Icon and text */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 6px;

width: 280px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* bell-ringing-01

bell, ringing, notification, alert
*/

width: 16px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 9.56%;
right: 9.57%;
top: 8.33%;
bottom: 8.33%;

border: 1.5px solid #A4A7AE;


/* Text */

width: 258px;
height: 20px;

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #535862;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Avatar group and text */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 12px;

width: 280px;
height: 64px;


/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;
z-index: 3;


/* Avatar group */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 8px;

width: 192px;
height: 32px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Avatars */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;

width: 152px;
height: 32px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Avatar */

box-sizing: border-box;

width: 32px;
height: 32px;

/* Avatar user square/Sienna Hewitt (color background) */
background: url(Sienna Hewitt.png), #E9DCBB;
border: 0.75px solid rgba(0, 0, 0, 0.08);
box-shadow: 0px 0px 0px 1.5px #FFFFFF;
border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
margin: 0px -8px;


/* Avatar */

box-sizing: border-box;

width: 32px;
height: 32px;

/* Avatar user square/Ammar Foley (color background) */
background: url(Ammar Foley.png), #C7D1B0;
border: 0.75px solid rgba(0, 0, 0, 0.08);
box-shadow: 0px 0px 0px 1.5px #FFFFFF;
border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
margin: 0px -8px;


/* Avatar */

box-sizing: border-box;

width: 32px;
height: 32px;

/* Avatar user square/Pippa Wilkinson (color background) */
background: url(Pippa Wilkinson.png), #CED1E5;
border: 0.75px solid rgba(0, 0, 0, 0.08);
box-shadow: 0px 0px 0px 1.5px #FFFFFF;
border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;
margin: 0px -8px;


/* Avatar */

box-sizing: border-box;

width: 32px;
height: 32px;

/* Avatar user square/Olly Schroeder (color background) */
background: url(Olly Schroeder.png), #DDD0BE;
border: 0.75px solid rgba(0, 0, 0, 0.08);
box-shadow: 0px 0px 0px 1.5px #FFFFFF;
border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;
margin: 0px -8px;


/* Avatar */

box-sizing: border-box;

width: 32px;
height: 32px;

/* Avatar user square/Mathilde Lewis (color background) */
background: url(Mathilde Lewis.png), #DFC2C0;
border: 0.75px solid rgba(0, 0, 0, 0.08);
box-shadow: 0px 0px 0px 1.5px #FFFFFF;
border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 0;
margin: 0px -8px;


/* Avatar */

box-sizing: border-box;

width: 32px;
height: 32px;

background: #F5F5F5;
border: 0.75px solid #E9EAEB;
box-shadow: 0px 0px 0px 1.5px #FFFFFF;
border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 5;
flex-grow: 0;


/* Text */

position: absolute;
width: 32px;
height: 20px;
left: calc(50% - 32px/2);
top: calc(50% - 20px/2);

/* Text sm/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */
text-align: center;

color: #717680;



/* Avatar */

box-sizing: border-box;

display: none;
width: 32px;
height: 32px;

/* Avatar user square/Drew Cano */
background: url(Drew Cano.jpg);
border: 0.75px solid rgba(0, 0, 0, 0.08);
border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 6;
flex-grow: 0;
margin: 0px -8px;


/* Avatar */

box-sizing: border-box;

display: none;
width: 32px;
height: 32px;

/* Avatar user square/Orlando Diggs */
background: url(Orlando Diggs.jpg);
border: 0.75px solid rgba(0, 0, 0, 0.08);
border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 7;
flex-grow: 0;
margin: 0px -8px;


/* Avatar */

box-sizing: border-box;

display: none;
width: 32px;
height: 32px;

/* Avatar user square/Andi Lane */
background: url(Andi Lane.jpg);
border: 0.75px solid rgba(0, 0, 0, 0.08);
border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 8;
flex-grow: 0;
margin: 0px -8px;


/* Avatar */

box-sizing: border-box;

display: none;
width: 32px;
height: 32px;

/* Avatar user square/Kate Morrison */
background: url(Kate Morrison.jpg);
border: 0.75px solid rgba(0, 0, 0, 0.08);
border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 9;
flex-grow: 0;
margin: 0px -8px;


/* Avatar */

box-sizing: border-box;

display: none;
width: 32px;
height: 32px;

background: #F5F5F5;
border: 0.75px solid #E9EAEB;
border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 10;
flex-grow: 0;
margin: 0px -8px;


/* _Avatar add button */

width: 32px;
height: 32px;

background: #FFFFFF;
border: 1px dashed #D5D7DA;
border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Content */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 4px;

position: absolute;
left: 12.5%;
right: 12.5%;
top: 12.5%;
bottom: 12.5%;



/* plus

plus, add, addition, calculate, mathematics
*/

width: 16px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 20.83%;
right: 20.83%;
top: 20.83%;
bottom: 20.83%;

border: 1.33333px solid #A4A7AE;


/* Text and supporting text */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 8px;

width: 280px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Text */

width: 59px;
height: 20px;

/* Text sm/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #181D27;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Divider */

width: 0px;
height: 12px;

border: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Supporting text */

width: 36px;
height: 20px;

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #535862;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Divider */

width: 0px;
height: 12px;

border: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* Supporting text */

width: 67px;
height: 20px;

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #535862;


/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 0;


/* Text and supporting text */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 8px;

width: 280px;
height: 210px;


/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 0;
z-index: 4;


/* Text */

width: 280px;
height: 20px;

/* Text sm/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #181D27;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Supporting text */

width: 280px;
height: 182px;

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* or 143% */

color: #535862;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Actions */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 2px;

position: absolute;
width: 88px;
height: 28px;
right: 16px;
top: 16px;


/* Inside auto layout */
flex: none;
order: 5;
flex-grow: 0;
z-index: 5;


/* Buttons/Button utility */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 6px;

width: 28px;
height: 28px;

border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* copy-01

<p>copy, duplicate, replicate, squares, square</p>
*/

width: 16px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 8.33%;
right: 8.33%;
top: 8.33%;
bottom: 8.33%;

border: 1.5px solid #A4A7AE;


/* Buttons/Button utility */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 6px;

width: 28px;
height: 28px;

border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* trash-01

trash, delete, trashcan, bin, remove
*/

width: 16px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 12.5%;
right: 12.5%;
top: 8.33%;
bottom: 8.33%;

border: 1.5px solid #A4A7AE;


/* Buttons/Button utility */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 6px;

width: 28px;
height: 28px;

border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* edit-01

<p>edit, pencil, change, draw, design, write</p>
*/

width: 16px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 10.42%;
right: 9.05%;
top: 9.05%;
bottom: 10.42%;

border: 1.5px solid #A4A7AE;


/* Type=Month view, Breakpoint=Mobile */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

position: absolute;
width: 375px;
height: 912px;
left: 1328px;
top: 16px;

background: #FFFFFF;
border-width: 1px 0px;
border-style: solid;
border-color: #E9EAEB;
/* Shadows/shadow-xs

Shadows allow you to add depth and realism to designs by positioning elements on a z-axis.
*/
box-shadow: 0px 1px 2px rgba(10, 13, 18, 0.05);


/* _Calendar header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 20px;
isolation: isolate;

width: 375px;
height: 202px;

background: #FFFFFF;
border-bottom: 1px solid #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 1;


/* Content */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 20px 16px;
gap: 16px;

width: 375px;
height: 202px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* Text and supporting text */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 343px;
height: 50px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Badge and text */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 8px;

width: 343px;
height: 28px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Text */

width: 121px;
height: 28px;

/* Text lg/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 28px;
/* identical to box height, or 156% */

color: #181D27;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Badge */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 2px 6px;

width: 53px;
height: 22px;

background: #FFFFFF;
border: 1px solid #D5D7DA;
/* Shadows/shadow-xs

Shadows allow you to add depth and realism to designs by positioning elements on a z-axis.
*/
box-shadow: 0px 1px 2px rgba(10, 13, 18, 0.05);
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Text */

width: 41px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: center;

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Supporting text */

width: 343px;
height: 20px;

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #535862;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Actions */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 12px;

width: 325px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar view dropdown */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 135px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dropdown */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 135px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Buttons/Button */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 10px 14px;
gap: 4px;

width: 135px;
height: 40px;

background: #FFFFFF;
border: 1px solid #D5D7DA;
/* Shadows/shadow-xs-skeuomorphic

Used to create a subtle skeuomorphic effect in components such as buttons and tabs.

This can be removed or replaced with shadow-xs if you prefer a flat style.
*/
box-shadow: 0px 1px 2px rgba(10, 13, 18, 0.05), inset 0px 0px 0px 1px rgba(10, 13, 18, 0.18), inset 0px -2px 0px rgba(10, 13, 18, 0.05);
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* placeholder

<p>placeholder, circle</p>
*/

display: none;
width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text padding */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px 2px;

width: 83px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Text */

width: 79px;
height: 20px;

/* Text sm/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* chevron-down

chevron, down, dropdown
*/

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Icon */

position: absolute;
left: 25%;
right: 25%;
top: 37.5%;
bottom: 37.5%;

border: 1.66667px solid #A4A7AE;


/* Button */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 10px 14px;
gap: 4px;

width: 126px;
height: 40px;

background: #7F56D9;
/* Shadows/shadow-xs-skeuomorphic

Used to create a subtle skeuomorphic effect in components such as buttons and tabs.

This can be removed or replaced with shadow-xs if you prefer a flat style.
*/
box-shadow: 0px 1px 2px rgba(10, 13, 18, 0.05), inset 0px 0px 0px 1px rgba(10, 13, 18, 0.18), inset 0px -2px 0px rgba(10, 13, 18, 0.05);
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* plus

plus, add, addition, calculate, mathematics
*/

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 20.83%;
right: 20.83%;
top: 20.83%;
bottom: 20.83%;

border: 1.66667px solid #D6BBFB;


/* Text padding */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px 2px;

width: 74px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Text */

width: 70px;
height: 20px;

/* Text sm/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #FFFFFF;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* placeholder

<p>placeholder, circle</p>
*/

display: none;
width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Buttons/Button */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 10px;

width: 40px;
height: 40px;

border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* search-lg

search, search bar, searchbar, magnify, magnifying glass, filter
*/

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 12.5%;
right: 12.5%;
top: 12.5%;
bottom: 12.5%;

border: 1.66667px solid #A4A7AE;


/* Button group */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 343px;
height: 40px;

border: 1px solid #D5D7DA;
/* Shadows/shadow-xs-skeuomorphic

Used to create a subtle skeuomorphic effect in components such as buttons and tabs.

This can be removed or replaced with shadow-xs if you prefer a flat style.
*/
box-shadow: inset 0px 0px 0px 1px rgba(10, 13, 18, 0.18), inset 0px -2px 0px rgba(10, 13, 18, 0.05);
filter: drop-shadow(0px 1px 2px rgba(10, 13, 18, 0.05));
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 8;


/* arrow-left

arrow, left
*/

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 20.83%;
right: 20.83%;
top: 20.83%;
bottom: 20.83%;

border: 1.66667px solid #A4A7AE;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 16px;
gap: 6px;

width: 255px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;
z-index: 7;


/* Text */

width: 42px;
height: 20px;

/* Text sm/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;
z-index: 6;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;
z-index: 5;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 0;
z-index: 4;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 5;
flex-grow: 0;
z-index: 3;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 6;
flex-grow: 0;
z-index: 2;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 7;
flex-grow: 0;
z-index: 1;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 8;
flex-grow: 0;
z-index: 0;


/* arrow-right

arrow, right
*/

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 20.83%;
right: 20.83%;
top: 20.83%;
bottom: 20.83%;

border: 1.66667px solid #A4A7AE;


/* Main */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 375px;
height: 710px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 1;
z-index: 0;


/* Content */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;

width: 375px;
height: 510px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;


/* Column */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 53.57px;
height: 510px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 8px;
gap: 6px;

width: 53.57px;
height: 34px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Text */

width: 26px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

display: none;
width: 6px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FDFDFD;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 16px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 36px;
height: 8px;

opacity: 0.6;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #717680;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #9E77ED;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #6172F3;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

width: 41.57px;
height: 18px;

opacity: 0.6;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Text */

width: 37.57px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 8px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 12px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #717680;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

display: none;
width: 44px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 14px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 24px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #717680;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #EE46BC;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

display: none;
width: 44px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 16px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 24px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #717680;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #2E90FA;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

display: none;
width: 44px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 15px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 12px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #717680;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

display: none;
width: 44px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Column */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 53.57px;
height: 510px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 1;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 8px;
gap: 6px;

width: 53.57px;
height: 34px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Text */

width: 8px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

display: none;
width: 6px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FDFDFD;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 14px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 12px;
height: 8px;

opacity: 0.6;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #2E90FA;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

display: none;
width: 44px;
height: 18px;

opacity: 0.6;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 8px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 24px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #EE46BC;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #9E77ED;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

display: none;
width: 44px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 14px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 36px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

display: none;
width: 44px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 14px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 36px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #EF6820;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #9E77ED;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #16B364;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

display: none;
width: 44px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 16px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 24px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #6172F3;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #9E77ED;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

display: none;
width: 44px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Column */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 53.57px;
height: 510px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 1;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 8px;
gap: 6px;

width: 53.57px;
height: 34px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Text */

width: 12px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

display: none;
width: 6px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 6px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 36px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

display: none;
width: 44px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 8px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 36px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #2E90FA;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #6172F3;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #6172F3;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

width: 41.57px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Text */

width: 37.57px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 14px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 12px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #2E90FA;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

display: none;
width: 44px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

background: #FAFAFA;
border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 24px;
height: 18px;
left: calc(50% - 24px/2);
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: center;

color: #414651;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 24px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #2E90FA;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #6172F3;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

display: none;
width: 44px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 16px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 12px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #2E90FA;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

display: none;
width: 44px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Column */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 53.57px;
height: 510px;


/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 1;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 8px;
gap: 6px;

width: 53.57px;
height: 34px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Text */

width: 8px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

display: none;
width: 6px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 8px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 36px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #EE46BC;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #717680;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #16B364;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

display: none;
width: 44px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 8px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 36px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

display: none;
width: 44px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

background: #FAFAFA;
border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 24px;
height: 18px;
left: calc(50% - 24px/2);
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: center;

color: #414651;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 24px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #EE46BC;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #717680;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

display: none;
width: 44px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 16px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 12px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #EE46BC;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

display: none;
width: 44px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 16px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 24px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #717680;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #EE46BC;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

display: none;
width: 44px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Column */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 53.57px;
height: 510px;


/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 1;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 8px;
gap: 6px;

width: 53.57px;
height: 34px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Text */

width: 8px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

display: none;
width: 6px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 8px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 12px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #717680;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

display: none;
width: 44px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

background: #7F56D9;
border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 24px;
height: 18px;
left: calc(50% - 24px/2);
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: center;

color: #FFFFFF;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 36px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #717680;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #9E77ED;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #6172F3;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

display: none;
width: 44px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 13px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 36px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #717680;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #9E77ED;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #6172F3;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

width: 41.57px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Text */

width: 37.57px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 16px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 36px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #717680;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #EAAA08;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #6172F3;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

width: 41.57px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Text */

width: 37.57px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 14px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 12px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #717680;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

display: none;
width: 44px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Column */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 53.57px;
height: 510px;


/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 1;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 8px;
gap: 6px;

width: 53.57px;
height: 34px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Text */

width: 8px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

display: none;
width: 6px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 8px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 12px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #EF6820;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

display: none;
width: 44px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 12px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 12px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #EF6820;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

display: none;
width: 44px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 14px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 12px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #16B364;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

display: none;
width: 44px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 16px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 36px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

display: none;
width: 44px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FDFDFD;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 6px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 36px;
height: 8px;

opacity: 0.6;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

display: none;
width: 44px;
height: 18px;

opacity: 0.6;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Column */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 53.57px;
height: 510px;


/* Inside auto layout */
flex: none;
order: 6;
align-self: stretch;
flex-grow: 1;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 8px;
gap: 6px;

width: 53.57px;
height: 34px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Text */

width: 8px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

display: none;
width: 6px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 8px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 36px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

display: none;
width: 44px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 14px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 12px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #7A5AF8;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

display: none;
width: 44px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 14px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 36px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

display: none;
width: 44px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FFFFFF;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 16px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 36px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

display: none;
width: 44px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Calendar cell/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;
gap: 6px;

width: 53.57px;
height: 95.2px;

background: #FDFDFD;
border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 1;


/* _Calendar cell date */

width: 24px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date */

position: absolute;
width: 8px;
height: 18px;
left: 4px;
top: calc(50% - 18px/2);

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;



/* Eventsx */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;
gap: 4px;

width: 12px;
height: 8px;

opacity: 0.6;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Dot */

width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dot */

position: absolute;
width: 6px;
height: 6px;
left: 1px;
top: 1px;

background: #EF6820;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px 0px 4px;

display: none;
width: 44px;
height: 18px;

opacity: 0.6;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* Selected date */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 20px 16px;
gap: 16px;
isolation: isolate;

width: 375px;
height: 200px;

border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Text */

width: 343px;
height: 20px;

/* Text sm/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #181D27;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 2;


/* Events */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 6px;

width: 343px;
height: 90px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
z-index: 1;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 343px;
height: 26px;

background: #FAFAFA;
border: 1px solid #E9EAEB;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 327px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 277px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 48px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #535862;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 343px;
height: 26px;

background: #F9F5FF;
border: 1px solid #E9D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 327px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 272px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #6941C6;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 53px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #7F56D9;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar event/Month view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 4px 8px;
gap: 4px;

width: 343px;
height: 26px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 2px;

width: 327px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Event */

width: 279px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #3538CD;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Time */

width: 46px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #444CE7;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* More events */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;

width: 343px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* Text */

width: 343px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Type=Week view, Breakpoint=Mobile */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

position: absolute;
width: 375px;
height: 912px;
left: 1328px;
top: 992px;

background: #FFFFFF;
border-width: 1px 0px;
border-style: solid;
border-color: #E9EAEB;
/* Shadows/shadow-xs

Shadows allow you to add depth and realism to designs by positioning elements on a z-axis.
*/
box-shadow: 0px 1px 2px rgba(10, 13, 18, 0.05);


/* _Calendar header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 20px;
isolation: isolate;

width: 375px;
height: 202px;

background: #FFFFFF;
border-bottom: 1px solid #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 1;


/* Content */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 20px 16px;
gap: 16px;

width: 375px;
height: 202px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* Text and supporting text */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 343px;
height: 50px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Badge and text */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 8px;

width: 343px;
height: 28px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Text */

width: 121px;
height: 28px;

/* Text lg/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 28px;
/* identical to box height, or 156% */

color: #181D27;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Badge */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 2px 6px;

width: 53px;
height: 22px;

background: #FFFFFF;
border: 1px solid #D5D7DA;
/* Shadows/shadow-xs

Shadows allow you to add depth and realism to designs by positioning elements on a z-axis.
*/
box-shadow: 0px 1px 2px rgba(10, 13, 18, 0.05);
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Text */

width: 41px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: center;

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Supporting text */

width: 343px;
height: 20px;

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #535862;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Actions */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 12px;

width: 320px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar view dropdown */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 130px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dropdown */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 130px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Buttons/Button */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 10px 14px;
gap: 4px;

width: 130px;
height: 40px;

background: #FFFFFF;
border: 1px solid #D5D7DA;
/* Shadows/shadow-xs-skeuomorphic

Used to create a subtle skeuomorphic effect in components such as buttons and tabs.

This can be removed or replaced with shadow-xs if you prefer a flat style.
*/
box-shadow: 0px 1px 2px rgba(10, 13, 18, 0.05), inset 0px 0px 0px 1px rgba(10, 13, 18, 0.18), inset 0px -2px 0px rgba(10, 13, 18, 0.05);
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* placeholder

<p>placeholder, circle</p>
*/

display: none;
width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text padding */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px 2px;

width: 78px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Text */

width: 74px;
height: 20px;

/* Text sm/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* chevron-down

chevron, down, dropdown
*/

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Icon */

position: absolute;
left: 25%;
right: 25%;
top: 37.5%;
bottom: 37.5%;

border: 1.66667px solid #A4A7AE;


/* Button */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 10px 14px;
gap: 4px;

width: 126px;
height: 40px;

background: #7F56D9;
/* Shadows/shadow-xs-skeuomorphic

Used to create a subtle skeuomorphic effect in components such as buttons and tabs.

This can be removed or replaced with shadow-xs if you prefer a flat style.
*/
box-shadow: 0px 1px 2px rgba(10, 13, 18, 0.05), inset 0px 0px 0px 1px rgba(10, 13, 18, 0.18), inset 0px -2px 0px rgba(10, 13, 18, 0.05);
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* plus

plus, add, addition, calculate, mathematics
*/

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 20.83%;
right: 20.83%;
top: 20.83%;
bottom: 20.83%;

border: 1.66667px solid #D6BBFB;


/* Text padding */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px 2px;

width: 74px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Text */

width: 70px;
height: 20px;

/* Text sm/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #FFFFFF;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* placeholder

<p>placeholder, circle</p>
*/

display: none;
width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Buttons/Button */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 10px;

width: 40px;
height: 40px;

border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* search-lg

search, search bar, searchbar, magnify, magnifying glass, filter
*/

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 12.5%;
right: 12.5%;
top: 12.5%;
bottom: 12.5%;

border: 1.66667px solid #A4A7AE;


/* Button group */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 343px;
height: 40px;

border: 1px solid #D5D7DA;
/* Shadows/shadow-xs-skeuomorphic

Used to create a subtle skeuomorphic effect in components such as buttons and tabs.

This can be removed or replaced with shadow-xs if you prefer a flat style.
*/
box-shadow: inset 0px 0px 0px 1px rgba(10, 13, 18, 0.18), inset 0px -2px 0px rgba(10, 13, 18, 0.05);
filter: drop-shadow(0px 1px 2px rgba(10, 13, 18, 0.05));
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 8;


/* arrow-left

arrow, left
*/

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 20.83%;
right: 20.83%;
top: 20.83%;
bottom: 20.83%;

border: 1.66667px solid #A4A7AE;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 16px;
gap: 6px;

width: 255px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;
z-index: 7;


/* Text */

width: 42px;
height: 20px;

/* Text sm/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;
z-index: 6;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;
z-index: 5;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 0;
z-index: 4;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 5;
flex-grow: 0;
z-index: 3;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 6;
flex-grow: 0;
z-index: 2;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 7;
flex-grow: 0;
z-index: 1;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 8;
flex-grow: 0;
z-index: 0;


/* arrow-right

arrow, right
*/

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 20.83%;
right: 20.83%;
top: 20.83%;
bottom: 20.83%;

border: 1.66667px solid #A4A7AE;


/* Main */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 375px;
height: 710px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 1;
z-index: 0;


/* Header */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

position: absolute;
height: 64px;
left: 0px;
right: 0px;
top: 0px;

/* Shadows/shadow-sm

Shadows allow you to add depth and realism to designs by positioning elements on a z-axis.
*/
box-shadow: 0px 1px 2px -1px rgba(10, 13, 18, 0.1);
filter: drop-shadow(0px 1px 3px rgba(10, 13, 18, 0.1));

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 1;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 8px;
gap: 6px;

width: 53.57px;
height: 64px;

background: #FFFFFF;
border-right: 1px solid #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Text */

width: 26px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

width: 8px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Date */

width: 8px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 8px;
gap: 6px;

width: 53.57px;
height: 64px;

background: #FFFFFF;
border-right: 1px solid #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Text */

width: 22px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

width: 8px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Date */

width: 8px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 8px;
gap: 6px;

width: 53.57px;
height: 64px;

background: #FFFFFF;
border-right: 1px solid #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 1;


/* Text */

width: 26px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

width: 8px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Date */

width: 8px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 8px;
gap: 6px;

width: 53.57px;
height: 64px;

background: #FFFFFF;
border-right: 1px solid #E9EAEB;

/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 1;


/* Text */

width: 27px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

width: 8px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Date */

width: 8px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 8px;
gap: 6px;

width: 53.57px;
height: 64px;

background: #FFFFFF;
border-right: 1px solid #E9EAEB;

/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 1;


/* Text */

width: 15px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

width: 24px;
height: 24px;

background: #7F56D9;
border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Date */

width: 24px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: center;

color: #FFFFFF;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 8px;
gap: 6px;

width: 53.57px;
height: 64px;

background: #FFFFFF;
border-right: 1px solid #E9EAEB;

/* Inside auto layout */
flex: none;
order: 5;
flex-grow: 1;


/* Text */

width: 20px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

width: 12px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Date */

width: 12px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 8px;
gap: 6px;

width: 53.57px;
height: 64px;

background: #FFFFFF;
border-right: 1px solid #E9EAEB;

/* Inside auto layout */
flex: none;
order: 6;
flex-grow: 1;


/* Text */

width: 23px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

width: 14px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Date */

width: 14px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Content */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 375px;
height: 710px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 1;
z-index: 0;


/* Column */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 56px;
height: 960px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 56px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Time */

position: absolute;
width: 30px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 56px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Time */

position: absolute;
width: 30px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 56px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Time */

position: absolute;
width: 36px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 56px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* Time */

position: absolute;
width: 34px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 56px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 0;


/* Time */

position: absolute;
width: 35px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 56px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 5;
flex-grow: 0;


/* Time */

position: absolute;
width: 28px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 56px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 6;
flex-grow: 0;


/* Time */

position: absolute;
width: 29px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 56px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 7;
flex-grow: 0;


/* Time */

position: absolute;
width: 30px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 56px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 8;
flex-grow: 0;


/* Time */

position: absolute;
width: 30px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 56px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 9;
flex-grow: 0;


/* Time */

position: absolute;
width: 30px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* Column */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 1152px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;
z-index: 1;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
z-index: 1;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;
z-index: 2;


/* Event wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;

position: absolute;
left: 0px;
right: 0px;
top: 0px;
bottom: 0px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 1;


/* _Calendar event/Day and week view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 6px 8px;
gap: 4px;

width: 307px;
height: 36px;

background: #FAFAFA;
border: 1px solid #E9EAEB;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 291px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Text and dot */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 291px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Event */

width: 291px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Time */

display: none;
width: 144px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #535862;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;
z-index: 3;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 96px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 0;
z-index: 4;


/* Event wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 6px;

position: absolute;
left: 0px;
right: 0px;
top: 0px;
bottom: 0px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 2;


/* _Calendar event/Day and week view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 6px 8px;
gap: 4px;

width: 307px;
height: 84px;

background: #F9F5FF;
border: 1px solid #E9D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 291px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Text and dot */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 291px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Event */

width: 291px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #6941C6;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Time */

width: 291px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #7F56D9;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
z-index: 1;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 0;
z-index: 5;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 6;
align-self: stretch;
flex-grow: 0;
z-index: 6;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 7;
align-self: stretch;
flex-grow: 0;
z-index: 7;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 8;
align-self: stretch;
flex-grow: 0;
z-index: 8;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 9;
align-self: stretch;
flex-grow: 0;
z-index: 9;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 192px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 10;
align-self: stretch;
flex-grow: 0;
z-index: 10;


/* Event wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
padding: 6px;

position: absolute;
left: 0px;
right: 0px;
top: 0px;
bottom: 0px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 4;


/* _Calendar event/Day and week view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 6px 8px;
gap: 4px;

width: 307px;
height: 180px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 291px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Text and dot */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 291px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Event */

width: 291px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #3538CD;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Time */

width: 291px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #444CE7;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
z-index: 3;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;
z-index: 2;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;
z-index: 1;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 11;
align-self: stretch;
flex-grow: 0;
z-index: 11;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 12;
align-self: stretch;
flex-grow: 0;
z-index: 12;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 13;
align-self: stretch;
flex-grow: 0;
z-index: 13;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 14;
align-self: stretch;
flex-grow: 0;
z-index: 14;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 15;
align-self: stretch;
flex-grow: 0;
z-index: 15;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 16;
align-self: stretch;
flex-grow: 0;
z-index: 16;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 17;
align-self: stretch;
flex-grow: 0;
z-index: 17;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 18;
align-self: stretch;
flex-grow: 0;
z-index: 18;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 19;
align-self: stretch;
flex-grow: 0;
z-index: 19;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar time marker */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 6px;

position: absolute;
height: 18px;
left: -4px;
right: 0px;
top: 601px;


/* Inside auto layout */
flex: none;
order: 20;
flex-grow: 0;
z-index: 20;


/* Marker */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 131.5px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Dot */

width: 8px;
height: 8px;

background: #7F56D9;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
margin: 0px -2px;


/* Line */

width: 125.5px;
height: 1px;

background: #7F56D9;
border-radius: 2px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Time */

width: 48px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #7F56D9;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Marker */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 131.5px;
height: 1px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 1;


/* Line */

width: 131.5px;
height: 1px;

background: #7F56D9;
border-radius: 2px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Scroll bar (control fill with bottom padding) */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px 6px 312px;

position: absolute;
width: 18px;
right: 0px;
top: 64px;
bottom: -2px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;
z-index: 2;


/* Bar */

width: 6px;
height: 328px;

background: #000000;
opacity: 0.15;
border: 1px solid #FFFFFF;
border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Type=Day view, Breakpoint=Mobile */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

position: absolute;
width: 375px;
height: 912px;
left: 1328px;
top: 1971px;

background: #FFFFFF;
border-width: 1px 0px;
border-style: solid;
border-color: #E9EAEB;
/* Shadows/shadow-xs

Shadows allow you to add depth and realism to designs by positioning elements on a z-axis.
*/
box-shadow: 0px 1px 2px rgba(10, 13, 18, 0.05);


/* _Calendar header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 20px;
isolation: isolate;

width: 375px;
height: 202px;

background: #FFFFFF;
border-bottom: 1px solid #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 1;


/* Content */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 20px 16px;
gap: 16px;

width: 375px;
height: 202px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* Text and supporting text */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 343px;
height: 50px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Badge and text */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 8px;

width: 343px;
height: 28px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Text */

width: 151px;
height: 28px;

/* Text lg/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 28px;
/* identical to box height, or 156% */

color: #181D27;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Badge */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 2px 6px;

width: 53px;
height: 22px;

background: #FFFFFF;
border: 1px solid #D5D7DA;
/* Shadows/shadow-xs

Shadows allow you to add depth and realism to designs by positioning elements on a z-axis.
*/
box-shadow: 0px 1px 2px rgba(10, 13, 18, 0.05);
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Text */

width: 41px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: center;

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Supporting text */

width: 343px;
height: 20px;

/* Text sm/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #535862;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Actions */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 12px;

width: 308px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* _Calendar view dropdown */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 118px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Dropdown */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 118px;
height: 40px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Buttons/Button */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 10px 14px;
gap: 4px;

width: 118px;
height: 40px;

background: #FFFFFF;
border: 1px solid #D5D7DA;
/* Shadows/shadow-xs-skeuomorphic

Used to create a subtle skeuomorphic effect in components such as buttons and tabs.

This can be removed or replaced with shadow-xs if you prefer a flat style.
*/
box-shadow: 0px 1px 2px rgba(10, 13, 18, 0.05), inset 0px 0px 0px 1px rgba(10, 13, 18, 0.18), inset 0px -2px 0px rgba(10, 13, 18, 0.05);
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* placeholder

<p>placeholder, circle</p>
*/

display: none;
width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Text padding */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px 2px;

width: 66px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Text */

width: 62px;
height: 20px;

/* Text sm/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* chevron-down

chevron, down, dropdown
*/

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Icon */

position: absolute;
left: 25%;
right: 25%;
top: 37.5%;
bottom: 37.5%;

border: 1.66667px solid #A4A7AE;


/* Button */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 10px 14px;
gap: 4px;

width: 126px;
height: 40px;

background: #7F56D9;
/* Shadows/shadow-xs-skeuomorphic

Used to create a subtle skeuomorphic effect in components such as buttons and tabs.

This can be removed or replaced with shadow-xs if you prefer a flat style.
*/
box-shadow: 0px 1px 2px rgba(10, 13, 18, 0.05), inset 0px 0px 0px 1px rgba(10, 13, 18, 0.18), inset 0px -2px 0px rgba(10, 13, 18, 0.05);
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* plus

plus, add, addition, calculate, mathematics
*/

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 20.83%;
right: 20.83%;
top: 20.83%;
bottom: 20.83%;

border: 1.66667px solid #D6BBFB;


/* Text padding */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px 2px;

width: 74px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Text */

width: 70px;
height: 20px;

/* Text sm/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #FFFFFF;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* placeholder

<p>placeholder, circle</p>
*/

display: none;
width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Buttons/Button */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 10px;

width: 40px;
height: 40px;

border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* search-lg

search, search bar, searchbar, magnify, magnifying glass, filter
*/

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 12.5%;
right: 12.5%;
top: 12.5%;
bottom: 12.5%;

border: 1.66667px solid #A4A7AE;


/* Button group */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 343px;
height: 40px;

border: 1px solid #D5D7DA;
/* Shadows/shadow-xs-skeuomorphic

Used to create a subtle skeuomorphic effect in components such as buttons and tabs.

This can be removed or replaced with shadow-xs if you prefer a flat style.
*/
box-shadow: inset 0px 0px 0px 1px rgba(10, 13, 18, 0.18), inset 0px -2px 0px rgba(10, 13, 18, 0.05);
filter: drop-shadow(0px 1px 2px rgba(10, 13, 18, 0.05));
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 8;


/* arrow-left

arrow, left
*/

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 20.83%;
right: 20.83%;
top: 20.83%;
bottom: 20.83%;

border: 1.66667px solid #A4A7AE;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 16px;
gap: 6px;

width: 255px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;
z-index: 7;


/* Text */

width: 42px;
height: 20px;

/* Text sm/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;
z-index: 6;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;
z-index: 5;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 0;
z-index: 4;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 5;
flex-grow: 0;
z-index: 3;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 6;
flex-grow: 0;
z-index: 2;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

display: none;
width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 7;
flex-grow: 0;
z-index: 1;


/* _Button group base */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 6px;

width: 44px;
height: 40px;
min-height: 40px;

background: #FFFFFF;
border-right: 1px solid #D5D7DA;

/* Inside auto layout */
flex: none;
order: 8;
flex-grow: 0;
z-index: 0;


/* arrow-right

arrow, right
*/

width: 20px;
height: 20px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Icon */

position: absolute;
left: 20.83%;
right: 20.83%;
top: 20.83%;
bottom: 20.83%;

border: 1.66667px solid #A4A7AE;


/* Main */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 375px;
height: 710px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 1;
z-index: 0;


/* Header */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

position: absolute;
height: 64px;
left: 0px;
right: 0px;
top: 0px;

/* Shadows/shadow-sm

Shadows allow you to add depth and realism to designs by positioning elements on a z-axis.
*/
box-shadow: 0px 1px 2px -1px rgba(10, 13, 18, 0.1);
filter: drop-shadow(0px 1px 3px rgba(10, 13, 18, 0.1));

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 1;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 8px;
gap: 6px;

width: 53.57px;
height: 64px;

background: #FFFFFF;
border-right: 1px solid #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Text */

width: 26px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

width: 8px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Date */

width: 8px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 8px;
gap: 6px;

width: 53.57px;
height: 64px;

background: #FFFFFF;
border-right: 1px solid #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Text */

width: 22px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

width: 8px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Date */

width: 8px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 8px;
gap: 6px;

width: 53.57px;
height: 64px;

background: #FFFFFF;
border-right: 1px solid #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 1;


/* Text */

width: 26px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

width: 8px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Date */

width: 8px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 8px;
gap: 6px;

width: 53.57px;
height: 64px;

background: #FFFFFF;
border-right: 1px solid #E9EAEB;

/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 1;


/* Text */

width: 27px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

width: 8px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Date */

width: 8px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 8px;
gap: 6px;

width: 53.57px;
height: 64px;

background: #FFFFFF;
border-right: 1px solid #E9EAEB;

/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 1;


/* Text */

width: 15px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

width: 24px;
height: 24px;

background: #7F56D9;
border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Date */

width: 24px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: center;

color: #FFFFFF;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 8px;
gap: 6px;

width: 53.57px;
height: 64px;

background: #FFFFFF;
border-right: 1px solid #E9EAEB;

/* Inside auto layout */
flex: none;
order: 5;
flex-grow: 1;


/* Text */

width: 20px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

width: 12px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Date */

width: 12px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* _Calendar column header */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 8px;
gap: 6px;

width: 53.57px;
height: 64px;

background: #FFFFFF;
border-right: 1px solid #E9EAEB;

/* Inside auto layout */
flex: none;
order: 6;
flex-grow: 1;


/* Text */

width: 23px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Date wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 0px;

width: 14px;
height: 24px;

border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Date */

width: 14px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #414651;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Content */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 375px;
height: 710px;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 1;
z-index: 0;


/* Column */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;

width: 56px;
height: 960px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 56px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


/* Time */

position: absolute;
width: 34px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 56px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Time */

position: absolute;
width: 35px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 56px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;


/* Time */

position: absolute;
width: 28px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 56px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;


/* Time */

position: absolute;
width: 29px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 56px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 0;


/* Time */

position: absolute;
width: 30px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 56px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 5;
flex-grow: 0;


/* Time */

position: absolute;
width: 30px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 56px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 6;
flex-grow: 0;


/* Time */

position: absolute;
width: 30px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 56px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 7;
flex-grow: 0;


/* Time */

position: absolute;
width: 30px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 56px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 8;
flex-grow: 0;


/* Time */

position: absolute;
width: 29px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* _Calendar row label */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 56px;
height: 96px;

background: #FDFDFD;
border-right: 1px solid #E9EAEB;
border-radius: 0px;

/* Inside auto layout */
flex: none;
order: 9;
flex-grow: 0;


/* Time */

position: absolute;
width: 30px;
height: 18px;
right: 8px;
top: -8px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #717680;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 0;


/* Column */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 1104px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;
z-index: 1;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
z-index: 1;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;
z-index: 2;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;
z-index: 3;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 0;
z-index: 4;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 192px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 5;
align-self: stretch;
flex-grow: 0;
z-index: 5;


/* Event wrapper */

/* Auto layout */
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
padding: 6px;

position: absolute;
left: 0px;
right: 0px;
top: 0px;
bottom: 0px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
z-index: 4;


/* _Calendar event/Day and week view */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 6px 8px;
gap: 4px;

width: 307px;
height: 180px;

background: #EEF4FF;
border: 1px solid #C7D7FE;
border-radius: 6px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 1;


/* Text and time */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 291px;
height: 38px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Text and dot */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 2px;

width: 291px;
height: 18px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


/* Event */

width: 291px;
height: 18px;

/* Text xs/Semibold */
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #3538CD;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Dot */

display: none;
width: 8px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Time */

width: 291px;
height: 18px;

/* Text xs/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */

color: #444CE7;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
z-index: 3;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;
z-index: 2;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;
z-index: 1;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 4;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 6;
align-self: stretch;
flex-grow: 0;
z-index: 6;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 7;
align-self: stretch;
flex-grow: 0;
z-index: 7;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 8;
align-self: stretch;
flex-grow: 0;
z-index: 8;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 9;
align-self: stretch;
flex-grow: 0;
z-index: 9;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 10;
align-self: stretch;
flex-grow: 0;
z-index: 10;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 11;
align-self: stretch;
flex-grow: 0;
z-index: 11;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 12;
align-self: stretch;
flex-grow: 0;
z-index: 12;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 13;
align-self: stretch;
flex-grow: 0;
z-index: 13;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 14;
align-self: stretch;
flex-grow: 0;
z-index: 14;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 15;
align-self: stretch;
flex-grow: 0;
z-index: 15;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 16;
align-self: stretch;
flex-grow: 0;
z-index: 16;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 17;
align-self: stretch;
flex-grow: 0;
z-index: 17;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 18;
align-self: stretch;
flex-grow: 0;
z-index: 18;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar cell/Day and week view */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
isolation: isolate;

width: 319px;
height: 48px;

background: #FFFFFF;

/* Inside auto layout */
flex: none;
order: 19;
align-self: stretch;
flex-grow: 0;
z-index: 19;


/* Cell */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px;

width: 319px;
height: 48px;

border-width: 0px 1px 1px 0px;
border-style: solid;
border-color: #E9EAEB;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
z-index: 0;


/* _Calendar time marker */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 6px;

position: absolute;
height: 18px;
left: -4px;
right: 0px;
top: 313px;


/* Inside auto layout */
flex: none;
order: 20;
flex-grow: 0;
z-index: 20;


/* Marker */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 131.5px;
height: 8px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* Dot */

width: 8px;
height: 8px;

background: #7F56D9;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
margin: 0px -2px;


/* Line */

width: 125.5px;
height: 1px;

background: #7F56D9;
border-radius: 2px;

/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 1;


/* Time */

width: 48px;
height: 18px;

/* Text xs/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 18px;
/* identical to box height, or 150% */
text-align: right;

color: #7F56D9;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;


/* Marker */

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;

width: 131.5px;
height: 1px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 1;


/* Line */

width: 131.5px;
height: 1px;

background: #7F56D9;
border-radius: 2px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;


/* _Scroll bar (control fill with bottom padding) */

/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 8px 6px 312px;

position: absolute;
width: 18px;
right: 0px;
top: 64px;
bottom: -2px;


/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;
z-index: 2;


/* Bar */

width: 6px;
height: 328px;

background: #000000;
opacity: 0.15;
border: 1px solid #FFFFFF;
border-radius: 9999px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;

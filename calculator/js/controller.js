import { display } from "./view.js";

export { listenKeyStrokes }

/*
    +,-,*,/,% -- operators
    .         -- decimal
    0..9      -- numbers
*/
const append = (value) => {
    if ( Number.isInteger(value) ) {
        if ( display.textContent === '0') {
            if ( value !== 0 ) {
                display.textContent = value;
            }

        } else {
            display.textContent += value;
        }

    } else if ( value === '.' && !display.textContent.includes('.')) {
        display.textContent += '.';
    }

    console.log(display.textContent);
}

const reset = () => {
    display.textContent = '0';
}

const listenKeyStrokes = () => {
    // Firefox - disable default behaviour like quick search when key is pressed down
    document.body.addEventListener('keydown', keyDownEvent => {
        if ( keyDownEvent.key === '/') {
            keyDownEvent.preventDefault();
        }
    });

    document.body.addEventListener('keyup', (event) => {
        event.preventDefault();
        switch ( event.key ) {
            // numbers
            case ( '0' ) : {
                console.log('zero');
                append(0);
                break;
            }

            case ( '1' ) : {
                console.log('one');
                append(1);
                break;
            }

            case ( '2' ) : {
                console.log('two');
                append(2);
                break;
            }

            case ( '3' ) : {
                console.log('three');
                append(3);
                break;
            }

            case ( '4' ) : {
                console.log('four');
                append(4);
                break;
            }

            case ( '5' ) : {
                console.log('five');
                append(5);
                break;
            }

            case ( '6' ) : {
                console.log('six');
                append(6);
                break;
            }

            case ( '7') : {
                console.log('seven');
                append(7);
                break;
            }

            case ( '8' ) : {
                console.log('eight');
                append(8);
                break;
            }

            case ( '9' ) : {
                console.log('nine');
                append(9);
                break;
            }

            case ( '.' ) : case ( ',' ) : {
                console.log('. , ');
                append('.');
                break;
            }

            // operators
            case ( '+' ) : {
                console.log('+');
                break;
            }

            case ( '-' ) : {
                console.log('-');
                break;
            }

            case ( '*' ) : {
                console.log('*');
                break;
            }

            case ( '/' ) : {
                console.log('/');
                break;
            }

            case ( '%' ) : {
                console.log('%');
                break;
            }

            // delete
            case ( 'Escape' ) : {
                console.log('escape');
                reset();
                break;
            }

            case ( 'Backspace' ) : {
                console.log('backspace');
                break;
            }

            // enter, return
            case ( 'Enter' ) : {
                console.log('enter');
                break;
            }

            default : {
                console.log('Something else');
            }
        }
    });
}

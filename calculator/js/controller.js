import { display } from "./view.js";

export { listenKeyStrokes }

/*
    +,-,*,/,% -- operators
    .         -- decimal
    0..9      -- numbers
*/
let stored_value  = 0;
let number_string = '0';
let operator      = null;

const storeValue = () => {
    stored_value = Number(number_string);
}

const storeOperator = (op) => {
    operator = op;
}

const clearOperator = () => {
    operator = null;
}

const appendToDisplay = (value) => {
    if ( operator !== null ) {
        storeValue();
        number_string = '0';
    }

    if ( value === '0' ) {
        if ( number_string === '0') return;
    }

    if ( value === '.' && !number_string.includes('.')) {
        number_string += '.';
        return;
    }

    if ( value in [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ]) {
        if ( number_string !== '0' ) {
            number_string += value;
            display.textContent = number_string;
        } else {
            number_string = value.toString();
            display.textContent = number_string;
        }

        if ( operator !== null ) {
            clearOperator();
        }
    }

    console.log('number_string:', number_string);
    console.log('textContent:', display.textContent);
}

const reset = () => {
    stored_value = 0;
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
                appendToDisplay('0');
                break;
            }

            case ( '1' ) : {
                appendToDisplay('1');
                break;
            }

            case ( '2' ) : {
                appendToDisplay('2');
                break;
            }

            case ( '3' ) : {
                appendToDisplay('3');
                break;
            }

            case ( '4' ) : {
                appendToDisplay('4');
                break;
            }

            case ( '5' ) : {
                appendToDisplay('5');
                break;
            }

            case ( '6' ) : {
                appendToDisplay('6');
                break;
            }

            case ( '7') : {
                appendToDisplay('7');
                break;
            }

            case ( '8' ) : {
                appendToDisplay('8');
                break;
            }

            case ( '9' ) : {
                appendToDisplay('9');
                break;
            }

            case ( '.' ) : case ( ',' ) : {
                appendToDisplay('.');
                break;
            }

            // operators
            case ( '+' ) : {
                storeValue();
                storeOperator('+');
                break;
            }

            case ( '-' ) : {
                storeOperator('-');
                break;
            }

            case ( '*' ) : {
                storeOperator('*');
                break;
            }

            case ( '/' ) : {
                storeOperator('/');
                break;
            }

            case ( '%' ) : {
                storeOperator('%');
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

            // enter, return add = here too
            case ( 'Enter' ) : case ( '=' ) : {
                console.log('enter');
                break;
            }

            default : {
                console.log('Something else');
            }
        }
    });
}

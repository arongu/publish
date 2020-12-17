export { listenKeyStrokes }

const listenKeyStrokes = () => {
    // disable default behaviour like quick search when key is pressed down
    // so numbers can be typed
    document.body.addEventListener('keydown', keyDownEvent => {
       keyDownEvent.preventDefault()
    });

    document.body.addEventListener('keyup', (event) => {
        event.preventDefault();
        switch ( event.key ) {
            // numbers
            case ( '0' ) : {
                console.log('zero');
                break;
            }

            case ( '1' ) : {
                console.log('one');
                break;
            }

            case ( '2' ) : {
                console.log('two');
                break;
            }

            case ( '3' ) : {
                console.log('three');
                break;
            }

            case ( '4' ) : {
                console.log('four');
                break;
            }

            case ( '5' ) : {
                console.log('five');
                break;
            }

            case ( '6' ) : {
                console.log('six');
                break;
            }

            case ( '7') : {
                console.log('seven');
                break;
            }

            case ( '8' ) : {
                console.log('eight');
                break;
            }

            case ( '9' ) : {
                console.log('nine');
                break;
            }

            case ( '.' ) : case ( ',' ) : {
                console.log('. , ');
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
                break;
            }

            case ( 'Backspace' ) : {
                console.log('backspace');
                break;
            }

            default : {
                console.log('Something else');
            }
        }
    });
}

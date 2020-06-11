export {
    Http
}

class Http {
    static fetchData(url){
        return new Promise((resolve, reject) => {
            const HTTP_REQUEST = new XMLHttpRequest();

            HTTP_REQUEST.onreadystatechange = () => {
                if(HTTP_REQUEST.readyState === XMLHttpRequest.DONE) {
                    switch (HTTP_REQUEST.status){
                        case 200: {
                            const RESPONSE_DATA = JSON.parse(HTTP_REQUEST.responseText);
                            resolve(RESPONSE_DATA);
                            break;
                        }

                        default: {
                            const errorMessage = 'ERROR, HTTP Response: '+ HTTP_REQUEST.status;
                            console.log(errorMessage);
                            reject(errorMessage);
                        }
                    }
                } else {
                    console.log('XMLHttpRequest.readyState, status', HTTP_REQUEST.readyState, HTTP_REQUEST.status);
                }
            };

            HTTP_REQUEST.open('GET', url);
            HTTP_REQUEST.send();
        });
    }
}


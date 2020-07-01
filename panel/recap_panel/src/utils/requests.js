import axios from 'axios';

class Requests {
    static objectToGetParams(params) {
        var str = "";
        for (var key in params) {
            if (str !== "") {
                str += "&";
            }
            str += key + "=" + encodeURIComponent(params[key]);
        }
        return str;
    }
    static dlsApiGet(method, params, successCallback, errorCallback) {
        var str = Requests.objectToGetParams(params);
        axios.get('/dls/api?method='+method+'&'+str)
            .then((response) => {
                successCallback(response);
            })
            .catch((error) => {
                errorCallback(error);
            });
    }

    static dlsApiPost(method, getParams, postParams, successCallback, errorCallback) {
        var str = Requests.objectToGetParams(getParams);
        axios.post('/dls/api?method='+method+'&'+str, postParams)
            .then((response) => {
                successCallback(response);
            })
            .catch((error) => {
                errorCallback(error);
            });
    }

    static gameApiGet(params, successCallback, errorCallback) {
        var str = "";
        for (var key in params) {
            if (str !== "") {
                str += "&";
            }
            str += key + "=" + encodeURIComponent(params[key]);
        }
        axios.get('/game/api?'+str)
            .then((response) => {
                successCallback(response);
            })
            .catch((error) => {
                errorCallback(error);
            });
    }
}
export default Requests;
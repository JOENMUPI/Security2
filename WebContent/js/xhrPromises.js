function XHR() {

	var jsonToParams = function(json) {
		var res="";
		for (var attr in json){ if(res === "") { res=attr + "=" + json[attr]; }
			else { res += "&" + attr + "=" + json[attr]; }
		}
		return res;
	};
    var xmlObject = null;
    var xhr = (method,url) => {
        return new Promise((res, rej) => {
            try {
                xmlObject = new XMLHttpRequest();
                xmlObject.onload = () => {
                    if (xmlObject.status >= 200 && xmlObject.status < 300) {
                        res(JSON.parse(xmlObject.responseText));
                    } else {
                        rej({
                            status: xmlObject.status,
                            statusText: xmlObject.statusText
                        });
                    }
                };
                xmlObject.open(method, url, true);
                if (method === 'POST') {
                    xmlObject.send(JSON.stringify(params));
                }
                else{
                	xmlObject.send();
                }
                

            } catch (err) {
                console.log('error');
                rej(err);
            }
        });
    }
    this.get = (url,params) => {
        return new Promise((res, rej) => {
        	params=typeof params==="string"?
        	params:jsonToParams(params);
        	url+="?"+params;
            xhr('GET', url,params).then((data) => {
                res(data);
            });
        });

    }
    this.post = (url,params) => {
        return new Promise((res, rej) => {
            xhr('POST', url,params).then((data) => {
                res(data);
            });
        });
    }
    this.put = (url,params) => {
        return new Promise((res, rej) => {
        	params=typeof params==="string"?
            params:jsonToParams(params);
            url+="?"+params;
            xhr('PUT', url,params).then((data) => {
                res(data);
            });
        });
    }
    this.del = (url,params) => {
        return new Promise((res, rej) => {
        	params=typeof params==="string"?
            params:jsonToParams(params);
            url+="?"+params;
            xhr('DELETE', url,params).then((data) => {
            	res(data);
            });
        });
    }
}
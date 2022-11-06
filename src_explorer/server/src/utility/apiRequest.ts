import request from 'request';

export default class APIRequest {
    public url :string;

    constructor(url:string) {
        this.url = url;
    }

    async get(endpoint:string) {

        const obj = this;

        console.log("obj:", obj.url)
        console.log("endpoint:", endpoint)
        

        return new Promise(function (resolved:any, rejected:any) {

            
            var headers = {
            }

            const requestOptions = {
                headers: headers,
                url: obj.url + endpoint,
                method: "GET",
                body: "",
                timeout: 10000
            };            
    
            request(requestOptions, 
                function (error, response, body) {
                if (error) {
                    rejected(error);                             
                }
                resolved(body);
            });
        });

        
    }

    async postHeaders(endpoint:string, headers:any, data:any) {
        const obj = this;

        return new Promise(function (resolved:any, rejected:any) {
            headers['Content-Type'] = 'application/x-www-form-urlencoded';
            headers['Content-Length'] = data.length;
    
            const requestOptions = {
                headers: headers,
                url: obj.url + endpoint,
                method: "POST",
                body: data,
                timeout: 10000
            };
    
            request(requestOptions, function (error, response, body) {
                if (error) {
                    rejected(error);
                }
                resolved(body);          
            });
        });
    }

    async postFoble(endpoint:string, secretHash:any, formData:any) {
        const obj = this;

        return new Promise(function (resolved:any, rejected:any) {
            var requestOptions = {
                url: obj.url + endpoint,
                headers: {
                 SecretHeader: secretHash
                },                
                form: formData
               };
            request.post(requestOptions, function (error, response, body) {
            if (error) {
                rejected(error);
            } else {
                resolved(body); 
            }
            });
        });
    }

    async getHeaders(endpoint:string, headers:any) {


        const obj = this;

        return new Promise(function (resolved:any, rejected:any) {

            console.log("headers:", headers);

            const requestOptions = {
                headers: headers,
                url: obj.url + endpoint,
                method: "GET",
                body: "",
                timeout: 10000
            };

            request(requestOptions, function (error, response, body) {
                if (error) {
                    rejected(error);
                }
                resolved(body);            
            });
        });

    }


    async postJSON(endpoint:string, data:any) {

        const obj = this;

        return new Promise(function (resolved:any, rejected:any) {

            var dataString = JSON.stringify(data);

            var headers = {
                'Content-Type': 'application/json',
                'Content-Length': dataString.length
            };

            const requestOptions = {
                headers: headers,
                url: obj.url + endpoint,
                method: "POST",
                body: dataString,
                timeout: 10000
            };

            request(requestOptions, function (error, response, body) {
                if (error) {
                    rejected(error);
                }
                resolved(body);
                //console.log(body);            
            });
        });

    }

    async postJSONHeaders(endpoint:string, headers:any, data:any) {

        
        const obj = this;

        return new Promise(function (resolved:any, rejected:any) {

        var dataString = JSON.stringify(data);

            headers['Content-Type'] = 'application/json';
            headers['Content-Length'] = dataString.length;

            const requestOptions = {
                headers: headers,
                url: obj.url + endpoint,
                method: "POST",
                body: dataString,
                timeout: 10000
            };

            request(requestOptions, function (error, response, body) {
                if (error) {
                    rejected(error);
                }
                resolved(body);            
            });
        });
    }
}
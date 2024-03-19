import fetch, {Response} from "node-fetch";


class Api {
    private static instance: Api;

    private constructor() { }

    public static getInstance(): Api {
        if (!Api.instance) {
            Api.instance = new Api();
        }

        return Api.instance;
    }


    /**
     * Finally, any singleton should define some business logic, which can be
     * executed on its instance.
     */
    public async LoginWithAPI()  {
        //const response = await fetch('https://api.github.com/users/github');
        const response : Response= await fetch('https://qa.joinswapp.com/rental/api/auth/login', 
        {method: 'POST',
        headers: { 'Content-Type': 'application/json', 'connection':' keep-alive'},
         body: JSON.stringify({
            email:"david.swapp.test.001@email.com",
            password:"Test123123"
            })
        });

        
        const data = await response.text();
        const headers = await response.headers;
        console.log(headers);
        const startCharVal = "=";
        const endCharVal = ";";
        // @ts-ignore: Object is possibly 'null'.
        const startIndex = headers.get('set-cookie').indexOf(startCharVal) + 1;  
        // @ts-ignore: Object is possibly 'null'.
        const endIndex = headers.get('set-cookie').indexOf(endCharVal, startIndex);
        // @ts-ignore: Object is possibly 'null'.
        const result = headers.get('set-cookie').substring(startIndex, endIndex);
        console.log(result);

        const set_cookie = headers.get('set-cookie');

        console.log(headers.get('set-cookie'));
        await browser.setCookies({
            name: 'swapp_auth_jwt',
            value: result,
            domain:"qa.joinswapp.com"

        });

        console.log(data);
    }
}

export const API = Api.getInstance();
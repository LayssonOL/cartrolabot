
export default interface IAuthProps {}

export default interface IAuthState {
    email?: string;
    password?: string;
    serviceId: number;
    statusText?: string;
    baseURL: string;
    // baseURL: `${window.location.origin}`;
    headers: object;
    // headers: {
    //         "Content-Type": "application/json; charset=UTF-8",
    //         //"Host": "login.globo.com",
    //         //"Origin": "https://login.globo.com",
    //         "Accept": "application/json, text/javascript",
    //         //"Referer": "https://login.globo.com/login/438?url=https://cartolafc.globo.com",
    //         //  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36"

    //     },
    url: string;
    // url: `${window.location.origin}/proxy/https://login.globo.com/api/authentication`,
        // url: 'https://login.globo.com/api/authentication',
    token: string;
    connected: boolean;
}

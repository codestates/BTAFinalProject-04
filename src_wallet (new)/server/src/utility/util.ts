
export default class Util{
    static Number(n : any, rtn : number = 0) {
        n = Number(n);
        if (isNaN(n)) {
            n = rtn;
        }
        return n;
    };

    static String(s : any) {
        
        var result : string;
        result = "";
        if (s != undefined) {
            result = s;
        }
        return result;
    };
}
import { ResponseFixerModel } from './model';
import axios from 'axios';

export class ConnectionFixer {

    private url: string = 'http://data.fixer.io/api';
    private API_KEY: string = '824e753b9d8f1bf170e5adf80e7788e9';

    constructor() {}

    public async getFixerLatest(base, symbols): Promise<ResponseFixerModel | any> {
        try {
            const { data: response_data } = await axios.get(`${this.url}/latest?access_key=${this.API_KEY}&base=${base}&symbols=${symbols}`,);
            if (Object.keys(response_data).length === 0 || !response_data.success) { throw new Error(response_data) }
            return response_data;
        }
        catch (error)  {
            // instance decorator Logger
            return error;
        }
    }
}

import { ResponseFixerModel } from './model';
import axios from 'axios';

export class ConnectionFixer {

    private url: string = '';
    private API_KEY: string = '';

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

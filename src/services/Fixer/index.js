const axios = require('axios');

class ConnectionFixer {

    constructor(){
        this.url = 'http://data.fixer.io/api';
        this.API_KEY = '824e753b9d8f1bf170e5adf80e7788e9';
    }

    async getFixerLatest(base, symbols) {
        try {
            const { data: response_data } = await axios.get(`${this.url}/latest?access_key=${this.API_KEY}&base=${base}&symbols=${symbols}`,);
            if (Object.keys(response_data).length === 0 || !response_data.success) { throw new Error(response_data) }
            return response_data;
        }
        catch (error)  {
            return error;
        }
    }
}

module.exports = {
    ConnectionFixer
}

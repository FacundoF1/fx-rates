const axios = require('axios');

class ConnectionFixer {

    constructor(){
        this.url = '';
        this.API_KEY = '';
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

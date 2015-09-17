var uri = 'http://10.0.1.236:80/api/v2/DBTest';

var flow = {
    before: [],
    beforeMain: [],
    main: [
        {
            // Delete the table

            del: uri + '/_schema/test_table',
            headers: {Accept: 'application/json, text/javascript, */*; q=0.01'}
        }
    ],
    afterMain: [],
    after: []
};

module.exports = flow;
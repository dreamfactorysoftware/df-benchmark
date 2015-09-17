var uri = 'http://10.0.1.236:80/api/v2/DBTest';

var flow = {
    before: [
    ],
    beforeMain: [],
    main: [
        {
            // Search for a record

            get: uri + '/_table/test_table?filter=name%3DREAD%20TEST',
            headers: {Accept: 'application/json, text/javascript, */*; q=0.01'},
        }
    ],
    afterMain: [],
    after: [
    ]
};

module.exports = flow;
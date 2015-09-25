var uri = 'http://10.0.1.236:80/api/v2/DBTest';

var flow = {
    before: [],
    beforeMain: [{
        // Create the test table

        post: uri + '/_schema',
        headers: {Accept: 'application/json, text/javascript, */*; q=0.01'},
        json: {
            resource: [
                {
                    name: "test_table",
                    field: [
                        {
                            name: "id",
                            type: "id",
                            is_primary_key: true,
                            auto_increment: true
                        },
                        {
                            name: "name",
                            type: "string"
                        }
                    ]
                }
            ]
        }
    }],
    main: [
        {
            // Insert a record

            post: uri + '/_table/test_table',
            headers: {Accept: 'application/json, text/javascript, */*; q=0.01'},
            json: {
                id: null,
                name: "READ TEST"
            }
        }
    ],
    afterMain: [],
    after: []
};

module.exports = flow;
var uri = 'http://52.7.101.1:80/api/v2/DBTest';

var flow = {
    before: [
        {
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
        },
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
        {
            // Delete the table

            del: uri + '/_schema/test_table',
            headers: {Accept: 'application/json, text/javascript, */*; q=0.01'}
        }
    ]
};

module.exports = flow;
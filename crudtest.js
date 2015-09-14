'use strict';

var assert = require('assert');

var uri = 'http://10.10.2.21:80/api/v2/DBTest';

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
        }
    ],
    beforeMain: [],
    main: [
        {
            // Insert a record

            post: uri + '/_table/test_table',
            headers: {Accept: 'application/json, text/javascript, */*; q=0.01'},
            json: {
                id: null,
                name: "Record #{INDEX}"
            },
            afterHooks: [
                function (all) {
                    all.iterCtx.insertId = all.body.resource[0].id;
                    return all;
                }
            ]

        },
        {
            // Update a record

            put: uri + '/_table/test_table/#ID#',
            headers: {Accept: 'application/json, text/javascript, */*; q=0.01'},
            json: {
                name: "Record #{INDEX} updated"
            },
            beforeHooks: [
                function (all) {
                    var insertId = all.iterCtx.insertId;
                    all.requestOptions.uri = all.requestOptions.uri.replace('#ID#', insertId);
                    return all;
                }
            ]
        },
        {
            // Delete a record

            del: uri + '/_table/test_table/#ID#',
            headers: {Accept: 'application/json, text/javascript, */*; q=0.01'},
            beforeHooks: [
                function (all) {
                    var insertId = all.iterCtx.insertId;
                    all.requestOptions.uri = all.requestOptions.uri.replace('#ID#', insertId);
                    return all;
                }
            ]
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

export default [
  {
    key: 'common',
    fields: [
      {
        process: 'add',
        key: 'follow',
        value: false,
      },
      {
        key: 'setting1',
        value: 'Value 1',
      },
      {
        process: 'delete',
        key: 'setting2',
        value: 200,
      },
      {
        process: 'delete',
        key: 'setting3',
        value: true,
      },
      {
        process: 'add',
        key: 'setting3',
        value: null,
      },
      {
        process: 'add',
        key: 'setting4',
        value: 'blah blah',
      },
      {
        process: 'add',
        key: 'setting5',
        fields: [
          {
            key: 'key5',
            value: 'value5',
          },
        ],
      },
      {
        key: 'setting6',
        fields: [
          {
            key: 'doge',
            fields: [
              {
                process: 'delete',
                key: 'wow',
                value: '',
              },
              {
                process: 'add',
                key: 'wow',
                value: 'so much',
              },
            ],
          },
          {
            key: 'key',
            value: 'value',
          },
          {
            process: 'add',
            key: 'ops',
            value: 'vops',
          },
        ],
      },
    ],
  },
  {
    key: 'group1',
    fields: [
      {
        process: 'delete',
        key: 'baz',
        value: 'bas',
      },
      {
        process: 'add',
        key: 'baz',
        value: 'bars',
      },
      {
        key: 'foo',
        value: 'bar',
      },
      {
        process: 'delete',
        key: 'nest',
        fields: [
          {
            key: 'key',
            value: 'value',
          },
        ],
      },
      {
        process: 'add',
        key: 'nest',
        value: 'str',
      },
    ],
  },
  {
    process: 'delete',
    key: 'group2',
    fields: [
      {
        key: 'abc',
        value: 12345,
      },
      {
        key: 'deep',
        fields: [
          {
            key: 'id',
            value: 45,
          },
        ],
      },
    ],
  },
  {
    process: 'add',
    key: 'group3',
    fields: [
      {
        key: 'deep',
        fields: [
          {
            key: 'id',
            fields: [
              {
                key: 'number',
                value: 45,
              },
            ],
          },
        ],
      },
      {
        key: 'fee',
        value: 100500,
      },
    ],
  },
];

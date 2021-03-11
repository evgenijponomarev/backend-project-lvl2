export default [
  {
    key: 'common',
    value: [
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
        process: 'del',
        key: 'setting2',
        value: 200,
      },
      {
        process: 'del',
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
        value: [
          {
            key: 'key5',
            value: 'value5',
          },
        ],
      },
      {
        key: 'setting6',
        value: [
          {
            key: 'doge',
            value: [
              {
                process: 'del',
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
    value: [
      {
        process: 'del',
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
        process: 'del',
        key: 'nest',
        value: [
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
    process: 'del',
    key: 'group2',
    value: [
      {
        key: 'abc',
        value: 12345,
      },
      {
        key: 'deep',
        value: [
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
    value: [
      {
        key: 'deep',
        value: [
          {
            key: 'id',
            value: [
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

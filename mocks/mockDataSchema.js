const schema = {
  type: 'object',
  properties: {
    wines: {
      type: 'array',
      minItems: 400,
      maxItems: 440,
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            unique: true,
            minimum: 1,
            autoIncrement: true,
          },
          name: {
            type: 'string',
            faker: 'random.uuid',
          },
          year: {
            type: 'integer',
            faker: {
              'random.arrayElement': [[2017, 2018, 2019, 2020]],
            },
          },
          type: {
            type: 'string',
            faker: {
              'random.arrayElement': [['white', 'red', 'rosse']],
            },
          },
          region: {
            type: 'string',
            faker: {
              'random.arrayElement': [['Spain', 'France', 'Portugal', 'Italy', 'Chile']],
            },
          },
          sells: {
            type: 'integer',
            faker: {
              'random.number': {
                min: 1,
                max: 60,
              },
            },
          },
          comments: {
            type: 'array',
            minItems: 0,
            maxItems: 3,
            items: {
              type: 'object',
              properties: {
                date: {
                  type: 'string',
                  faker: 'date.past',
                },
                comment: {
                  type: 'string',
                  faker: 'lorem.text',
                },
              },
              required: ['date', 'comment'],
            },
          },
        },
        required: ['id', 'name', 'year', 'type', 'region', 'sells', 'comments'],
      },
    },
    user: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          unique: true,
          minimum: 1,
          autoIncrement: true,
        },
        name: {
          type: 'string',
          faker: 'name.firstName',
        },
        email: {
          type: 'string',
          faker: 'internet.email',
        },
        password: {
          type: 'string',
          faker: 'internet.password',
        },
        registrationDate: {
          type: 'string',
          faker: 'date.past',
        },
        image: {
          type: 'string',
          faker: 'image.avatar',
        },
      },
      required: ['id', 'name', 'email', 'image', 'password'],
    },
  },
  required: ['wines', 'user'],
  definitions: {
    node: {
      type: 'array',
      items: {
        Id: {
          type: 'integer',
        },
        Label: {
          type: 'string',
        },
      },
    },
  },
};

module.exports = schema;

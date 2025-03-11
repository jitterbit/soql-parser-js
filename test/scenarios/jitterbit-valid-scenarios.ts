import { Query } from '../../src';
import { JitterbitBaseScenario } from './shared-scenarios';

interface JitterbitValidScenario extends JitterbitBaseScenario {
  metadata: Query;
}

const quotedVariable: JitterbitValidScenario[] = [
  {
    name: 'quoted variable without default value',
    query: "SELECT Id FROM Account WHERE Id = '[variable]'",
    metadata: {
      fields: [
        {
          type: 'Field',
          field: 'Id',
        },
      ],
      sObject: 'Account',
      where: {
        left: {
          field: 'Id',
          literalType: 'JITTERBIT_VARIABLE',
          operator: '=',
          value: { text: "'[variable]'", defaultValue: undefined, variable: 'variable' },
        },
      },
    },
  },
  {
    name: 'quoted variable with default value',
    query: "SELECT Id FROM Account WHERE Id = '[variable{default}]'",
    metadata: {
      fields: [
        {
          type: 'Field',
          field: 'Id',
        },
      ],
      sObject: 'Account',
      where: {
        left: {
          field: 'Id',
          literalType: 'JITTERBIT_VARIABLE',
          operator: '=',
          value: { text: "'[variable{default}]'", defaultValue: 'default', variable: 'variable' },
        },
      },
    },
  },
];

const unquotedVariable: JitterbitValidScenario[] = [
  {
    name: 'unquoted variable without default value',
    query: 'SELECT Id FROM Account WHERE Id = [variable]',
    metadata: {
      fields: [
        {
          type: 'Field',
          field: 'Id',
        },
      ],
      sObject: 'Account',
      where: {
        left: {
          field: 'Id',
          literalType: 'JITTERBIT_VARIABLE',
          operator: '=',
          value: { text: '[variable]', defaultValue: undefined, variable: 'variable' },
        },
      },
    },
  },
  {
    name: 'unquoted variable with default value',
    query: 'SELECT Id FROM Account WHERE Id = [variable{default}]',
    metadata: {
      fields: [
        {
          type: 'Field',
          field: 'Id',
        },
      ],
      sObject: 'Account',
      where: {
        left: {
          field: 'Id',
          literalType: 'JITTERBIT_VARIABLE',
          operator: '=',
          value: { text: '[variable{default}]', defaultValue: 'default', variable: 'variable' },
        },
      },
    },
  },
  {
    name: 'unquoted variable with quoted default value',
    query: "SELECT Id FROM Account WHERE Id = [variable{'default'}]",
    metadata: {
      fields: [
        {
          type: 'Field',
          field: 'Id',
        },
      ],
      sObject: 'Account',
      where: {
        left: {
          field: 'Id',
          literalType: 'JITTERBIT_VARIABLE',
          operator: '=',
          value: { text: "[variable{'default'}]", defaultValue: "'default'", variable: 'variable' },
        },
      },
    },
  },
];

const allPossibleVariableCharacters: JitterbitValidScenario = {
  name: 'all possible variable characters',
  query: 'SELECT Id FROM Account WHERE Id = [0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ._]',
  metadata: {
    fields: [
      {
        type: 'Field',
        field: 'Id',
      },
    ],
    sObject: 'Account',
    where: {
      left: {
        field: 'Id',
        literalType: 'JITTERBIT_VARIABLE',
        operator: '=',
        value: {
          text: '[0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ._]',
          defaultValue: undefined,
          variable: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ._',
        },
      },
    },
  },
};

const allCharacters = [];
// printable ascii characters
// 32 - space
// 126 - ~
for (let i = 32; i < 127; i++) {
  allCharacters.push(String.fromCharCode(i));
}
const allCharactersText = allCharacters.join('');

const defaultValues: JitterbitValidScenario[] = [
  {
    name: 'all possible default value characters',
    query: `SELECT Id FROM Account WHERE Id = [variable{${allCharactersText}}]`,
    metadata: {
      fields: [
        {
          type: 'Field',
          field: 'Id',
        },
      ],
      sObject: 'Account',
      where: {
        left: {
          field: 'Id',
          literalType: 'JITTERBIT_VARIABLE',
          operator: '=',
          value: {
            text: `[variable{${allCharactersText}}]`,
            defaultValue: allCharactersText,
            variable: 'variable',
          },
        },
      },
    },
  },
  {
    name: 'specific utc date time',
    query: `SELECT Id FROM Account WHERE CreatedDate >= [variable{2005-10-08T01:02:03Z}]`,
    metadata: {
      fields: [
        {
          type: 'Field',
          field: 'Id',
        },
      ],
      sObject: 'Account',
      where: {
        left: {
          field: 'CreatedDate',
          literalType: 'JITTERBIT_VARIABLE',
          operator: '>=',
          value: {
            text: `[variable{2005-10-08T01:02:03Z}]`,
            defaultValue: '2005-10-08T01:02:03Z',
            variable: 'variable',
          },
        },
      },
    },
  },
  {
    name: 'specific timezoned date time',
    query: `SELECT Id FROM Account WHERE CreatedDate >= [variable{1999-01-01T23:01:01+01:00}]`,
    metadata: {
      fields: [
        {
          type: 'Field',
          field: 'Id',
        },
      ],
      sObject: 'Account',
      where: {
        left: {
          field: 'CreatedDate',
          literalType: 'JITTERBIT_VARIABLE',
          operator: '>=',
          value: {
            text: `[variable{1999-01-01T23:01:01+01:00}]`,
            defaultValue: '1999-01-01T23:01:01+01:00',
            variable: 'variable',
          },
        },
      },
    },
  },
  {
    name: 'date literal',
    query: `SELECT Id FROM Account WHERE CreatedDate >= [variable{LAST_N_DAYS:365}]`,
    metadata: {
      fields: [
        {
          type: 'Field',
          field: 'Id',
        },
      ],
      sObject: 'Account',
      where: {
        left: {
          field: 'CreatedDate',
          literalType: 'JITTERBIT_VARIABLE',
          operator: '>=',
          value: {
            text: `[variable{LAST_N_DAYS:365}]`,
            defaultValue: 'LAST_N_DAYS:365',
            variable: 'variable',
          },
        },
      },
    },
  },
  {
    name: 'escaped curly bracket',
    query: `SELECT Id FROM Account WHERE Id = '[variable{\\{test\\}}]'`,
    metadata: {
      fields: [
        {
          type: 'Field',
          field: 'Id',
        },
      ],
      sObject: 'Account',
      where: {
        left: {
          field: 'Id',
          literalType: 'JITTERBIT_VARIABLE',
          operator: '=',
          value: {
            text: `'[variable{\\{test\\}}]'`,
            defaultValue: '\\{test\\}',
            variable: 'variable',
          },
        },
      },
    },
  },
];

const malformedQuoted: JitterbitValidScenario[] = [
  {
    name: 'parse as string when missing opening square bracket',
    query: "SELECT Id FROM Account WHERE Id = 'variable]'",
    metadata: {
      fields: [
        {
          field: 'Id',
          type: 'Field',
        },
      ],
      sObject: 'Account',
      where: {
        left: {
          field: 'Id',
          literalType: 'STRING',
          operator: '=',
          value: "'variable]'",
        },
      },
    },
  },
  {
    name: 'parse as string when missing closing square bracket',
    query: "SELECT Id FROM Account WHERE Id = '[variable'",
    metadata: {
      fields: [
        {
          field: 'Id',
          type: 'Field',
        },
      ],
      sObject: 'Account',
      where: {
        left: {
          field: 'Id',
          literalType: 'STRING',
          operator: '=',
          value: "'[variable'",
        },
      },
    },
  },
  {
    name: 'parse as string when missing opening curly bracket',
    query: "SELECT Id FROM Account WHERE Id = '[variabledefault}]'",
    metadata: {
      fields: [
        {
          field: 'Id',
          type: 'Field',
        },
      ],
      sObject: 'Account',
      where: {
        left: {
          field: 'Id',
          literalType: 'STRING',
          operator: '=',
          value: "'[variabledefault}]'",
        },
      },
    },
  },
  {
    name: 'parse as string when missing closing curly bracket',
    query: "SELECT Id FROM Account WHERE Id = '[variable{default]'",
    metadata: {
      fields: [
        {
          field: 'Id',
          type: 'Field',
        },
      ],
      sObject: 'Account',
      where: {
        left: {
          field: 'Id',
          literalType: 'STRING',
          operator: '=',
          value: "'[variable{default]'",
        },
      },
    },
  },
];

const variablesInSubquery: JitterbitValidScenario[] = [
  {
    name: 'subquery select',
    query: "SELECT Id, (SELECT Name FROM Person WHERE Name = '[variable]') FROM Account",
    metadata: {
      sObject: 'Account',
      fields: [
        {
          type: 'Field',
          field: 'Id',
        },
        {
          type: 'FieldSubquery',
          subquery: {
            fields: [
              {
                type: 'Field',
                field: 'Name',
              },
            ],
            relationshipName: 'Person',
            where: {
              left: {
                field: 'Name',
                literalType: 'JITTERBIT_VARIABLE',
                operator: '=',
                value: { text: "'[variable]'", defaultValue: undefined, variable: 'variable' },
              },
            },
          },
        },
      ],
    },
  },
];

const variablesWithRelations: JitterbitValidScenario[] = [
  {
    name: 'relation comparison with variable',
    query: 'SELECT Id FROM Account WHERE Person.Name = [variable]',
    metadata: {
      sObject: 'Account',
      fields: [
        {
          type: 'Field',
          field: 'Id',
        },
      ],
      where: {
        left: {
          field: 'Person.Name',
          literalType: 'JITTERBIT_VARIABLE',
          operator: '=',
          value: { text: '[variable]', defaultValue: undefined, variable: 'variable' },
        },
      },
    },
  },
];

const complexQueries: JitterbitValidScenario[] = [
  {
    name: 'order by and limit',
    query: 'SELECT Id FROM Account WHERE Id = [variable] ORDER BY Id ASC LIMIT 10',
    metadata: {
      sObject: 'Account',
      fields: [
        {
          type: 'Field',
          field: 'Id',
        },
      ],
      where: {
        left: {
          field: 'Id',
          literalType: 'JITTERBIT_VARIABLE',
          operator: '=',
          value: { text: '[variable]', defaultValue: undefined, variable: 'variable' },
        },
      },
      limit: 10,
      orderBy: [
        {
          field: 'Id',
          order: 'ASC',
        },
      ],
    },
  },
  {
    name: 'string and quoted variables',
    query: "SELECT Id FROM Account WHERE Id = '[variable]' AND Name = 'Bob' AND Country = '[countryVar{Brazil}]'",
    metadata: {
      sObject: 'Account',
      fields: [
        {
          type: 'Field',
          field: 'Id',
        },
      ],
      where: {
        left: {
          field: 'Id',
          literalType: 'JITTERBIT_VARIABLE',
          operator: '=',
          value: { text: "'[variable]'", defaultValue: undefined, variable: 'variable' },
        },
        operator: 'AND',
        right: {
          left: {
            field: 'Name',
            literalType: 'STRING',
            operator: '=',
            value: "'Bob'",
          },
          operator: 'AND',
          right: {
            left: {
              field: 'Country',
              literalType: 'JITTERBIT_VARIABLE',
              operator: '=',
              value: { text: "'[countryVar{Brazil}]'", defaultValue: 'Brazil', variable: 'countryVar' },
            },
          },
        },
      },
    },
  },
  {
    name: 'quoted and unquoted variables',
    query: "SELECT Id FROM Account WHERE Id = '[variable]' OR Age >= [ageVar{27}]",
    metadata: {
      sObject: 'Account',
      fields: [
        {
          type: 'Field',
          field: 'Id',
        },
      ],
      where: {
        left: {
          field: 'Id',
          literalType: 'JITTERBIT_VARIABLE',
          operator: '=',
          value: { text: "'[variable]'", defaultValue: undefined, variable: 'variable' },
        },
        operator: 'OR',
        right: {
          left: {
            field: 'Age',
            literalType: 'JITTERBIT_VARIABLE',
            operator: '>=',
            value: { text: '[ageVar{27}]', defaultValue: '27', variable: 'ageVar' },
          },
        },
      },
    },
  },
  {
    name: 'two variables with default value',
    query: "SELECT Id FROM Account WHERE Id = '[variable{abc}]' OR Id = '[idVar{def}]'",
    metadata: {
      sObject: 'Account',
      fields: [
        {
          type: 'Field',
          field: 'Id',
        },
      ],
      where: {
        left: {
          field: 'Id',
          literalType: 'JITTERBIT_VARIABLE',
          operator: '=',
          value: { text: "'[variable{abc}]'", defaultValue: 'abc', variable: 'variable' },
        },
        operator: 'OR',
        right: {
          left: {
            field: 'Id',
            literalType: 'JITTERBIT_VARIABLE',
            operator: '=',
            value: { text: "'[idVar{def}]'", defaultValue: 'def', variable: 'idVar' },
          },
        },
      },
    },
  },
  {
    name: 'three variables with default value',
    query: "SELECT Id FROM Account WHERE Id = '[variable{abc}]' OR Age >= [ageVar{27}] OR Id = '[idVar{def}]'",
    metadata: {
      sObject: 'Account',
      fields: [
        {
          type: 'Field',
          field: 'Id',
        },
      ],
      where: {
        left: {
          field: 'Id',
          literalType: 'JITTERBIT_VARIABLE',
          operator: '=',
          value: { text: "'[variable{abc}]'", defaultValue: 'abc', variable: 'variable' },
        },
        operator: 'OR',
        right: {
          left: {
            field: 'Age',
            literalType: 'JITTERBIT_VARIABLE',
            operator: '>=',
            value: { text: '[ageVar{27}]', defaultValue: '27', variable: 'ageVar' },
          },
          operator: 'OR',
          right: {
            left: {
              field: 'Id',
              literalType: 'JITTERBIT_VARIABLE',
              operator: '=',
              value: { text: "'[idVar{def}]'", defaultValue: 'def', variable: 'idVar' },
            },
          },
        },
      },
    },
  },
  {
    name: 'function and variables in where',
    query: "SELECT Id, FORMAT(CreatedDate) FROM Account WHERE Id = '[variable]'",
    metadata: {
      sObject: 'Account',
      fields: [
        {
          type: 'Field',
          field: 'Id',
        },
        {
          functionName: 'FORMAT',
          parameters: ['CreatedDate'],
          rawValue: 'FORMAT(CreatedDate)',
          type: 'FieldFunctionExpression',
        },
      ],
      where: {
        left: {
          field: 'Id',
          literalType: 'JITTERBIT_VARIABLE',
          operator: '=',
          value: { text: "'[variable]'", defaultValue: undefined, variable: 'variable' },
        },
      },
    },
  },
];

export const jitterbitValidScenarios: JitterbitValidScenario[] = [
  ...quotedVariable,
  ...unquotedVariable,
  allPossibleVariableCharacters,
  ...defaultValues,
  ...malformedQuoted,
  ...variablesInSubquery,
  ...variablesWithRelations,
  ...complexQueries,
];

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

const allPossibleDefaultValueCharacters: JitterbitValidScenario = {
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
};

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
];

export const jitterbitValidScenarios: JitterbitValidScenario[] = [
  ...quotedVariable,
  ...unquotedVariable,
  allPossibleVariableCharacters,
  allPossibleDefaultValueCharacters,
  ...malformedQuoted,
  ...variablesInSubquery,
  ...variablesWithRelations,
  ...complexQueries,
];

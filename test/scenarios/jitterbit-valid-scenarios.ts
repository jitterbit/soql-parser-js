import { Query } from '../../src';
import { JitterbitBaseScenario } from './shared-scenarios';

interface JitterbitValidScenario extends JitterbitBaseScenario {
  expected: Query;
}

const quotedVariable: JitterbitValidScenario[] = [
  {
    name: 'quoted variable without default value',
    query: "SELECT Id FROM Account WHERE Id = '[variable]'",
    expected: {
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
    expected: {
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
    expected: {
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
    expected: {
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
  expected: {
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
  expected: {
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
    expected: {
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
    expected: {
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
    expected: {
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
    expected: {
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

export const jitterbitValidScenarios: JitterbitValidScenario[] = [
  ...quotedVariable,
  ...unquotedVariable,
  allPossibleVariableCharacters,
  allPossibleDefaultValueCharacters,
  ...malformedQuoted,
];

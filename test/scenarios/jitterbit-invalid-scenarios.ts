import { LexingError, ParsingError } from '../../src/parser/parser';
import { JitterbitBaseScenario } from './shared-scenarios';

interface JitterbitInvalidScenario extends JitterbitBaseScenario {
  error: any;
}

export const jitterbitInvalidScenarios: JitterbitInvalidScenario[] = [
  {
    name: 'missing opening square bracket',
    query: 'SELECT Id FROM Account WHERE Id = variable]',
    error: ParsingError,
  },
  {
    name: 'missing closing square bracket',
    query: 'SELECT Id FROM Account WHERE Id = [variable',
    error: ParsingError,
  },
  {
    name: 'missing opening curly bracket',
    query: 'SELECT Id FROM Account WHERE Id = [variabledefault}]',
    error: LexingError,
  },
  {
    name: 'missing closing curly bracket',
    query: 'SELECT Id FROM Account WHERE Id = [variable{default]',
    error: LexingError,
  },
];

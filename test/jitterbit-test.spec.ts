import { parseQuery } from '../src';
import { jitterbitInvalidScenarios, jitterbitValidScenarios } from './scenarios';

describe('parseQuery', () => {
  describe('valid', () => {
    it.each(jitterbitValidScenarios)('should correctly parse test case - $name', ({ query, expected }) => {
      const soqlQuery = parseQuery(query);
      expect(soqlQuery).toEqual(expected);
    });
  });

  describe('invalid', () => {
    it.each(jitterbitInvalidScenarios)('should throw error - $name', ({ query, error }) => {
      expect(() => parseQuery(query)).toThrow(error);
    });
  });
});

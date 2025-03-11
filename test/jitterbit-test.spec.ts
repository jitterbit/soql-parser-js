import { composeQuery, isQueryValid, parseQuery } from '../src';
import { jitterbitInvalidScenarios, jitterbitValidScenarios } from './scenarios';

describe('valid', () => {
  describe('parse', () => {
    it.each(jitterbitValidScenarios)('should correctly parse test case - $name', ({ query, metadata }) => {
      expect(parseQuery(query)).toEqual(metadata);
    });
  });

  describe('compose', () => {
    it.each(jitterbitValidScenarios)('should correctly compose test case - $name', ({ query, metadata }) => {
      expect(composeQuery(metadata)).toBe(query);
    });
  });

  describe('isValid', () => {
    it.each(jitterbitValidScenarios)('should return is valid true for test case - $name', ({ query }) => {
      expect(isQueryValid(query)).toBe(true);
    });
  });
});

describe('invalid', () => {
  describe('parse', () => {
    it.each(jitterbitInvalidScenarios)('should throw error - $name', ({ query, error }) => {
      expect(() => parseQuery(query)).toThrow(error);
    });
  });

  describe('isValid', () => {
    it.each(jitterbitInvalidScenarios)('should return is valid false for test case - $name', ({ query }) => {
      expect(isQueryValid(query)).toBe(false);
    });
  });
});

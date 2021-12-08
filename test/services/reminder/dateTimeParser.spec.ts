import { expect } from 'chai';
import { DateTimeParser } from '../../../src/services/reminder/dateTimeParser';

describe('Date Time Parser', () => {
  describe('getIsoStringForDateTimeArray', function() {
    it('should test that a valid date time array is mapped correctly', () => {
      const dateTimeArray = [
        20210801,
        2021,
        8,
        1,
        6,
        5,
        365
      ];
      expect(DateTimeParser.getIsoStringForDateTimeArray(dateTimeArray)).to.equal('2021-08-01T06:05:00.000Z');
    });

    it('should test that an incomplete date time array is mapped correctly', () => {
      const dateTimeArray = [
        20210801,
        2021,
        8,
        1];
      expect(DateTimeParser.getIsoStringForDateTimeArray(dateTimeArray)).to.equal('2021-08-01T00:00:00.000Z');
    });

    it('should test that an empty date time array leads to n/a', () => {
      const dateTimeArray: Array<number> = [];
      expect(DateTimeParser.getIsoStringForDateTimeArray(dateTimeArray)).to.equal('n/a');
    });
  });
});

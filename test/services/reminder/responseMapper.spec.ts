import { expect } from 'chai';
import { ResponseMapper } from '../../../src/services/reminder/responseMapper';

import emptyList from './emptyList.json';
import expectedResultEmptyList from './expectedResultEmptyList.json';
import oneCollectionContainingOneReminder from './oneCollectionContainingOneReminder.json';
import expectedResultOneCollectionContainingOneReminder from './expectedResultOneCollectionContainingOneReminder.json';
import oneCollectionWithoutReminders from './oneCollectionWithoutReminders.json';
import expectedResultOneCollectionWithoutReminders from './expectedResultOneCollectionWithoutReminders.json';
import oneCollectionContainingOneReminderWithAnAlarmTime from './oneCollectionContainingOneReminderWithAnAlarmTime.json';
import oneCollectionContainingOneReminderWithPriority from './oneCollectionContainingOneReminderWithPriority.json';
import expectedResultOneCollectionContainingOneReminderWithAnAlarmTime from './expectedResultOneCollectionContainingOneReminderWithAnAlarmTime.json';
import oneCollectionContainingOneReminderWithAnAlarmLocationArriving from './oneCollectionContainingOneReminderWithAnAlarmLocationArriving.json';
import expectedResultOneCollectionContainingOneReminderWithAnAlarmLocationArriving from './expectedResultOneCollectionContainingOneReminderWithAnAlarmLocationArriving.json';
import oneCollectionContainingOneReminderWithAnAlarmLocationArrivingMissingLocationTitle from './oneCollectionContainingOneReminderWithAnAlarmLocationArrivingMissingLocationTitle.json';
import expectedResultoneCollectionContainingOneReminderWithAnAlarmLocationArrivingMissingLocationTitle from './expectedResultoneCollectionContainingOneReminderWithAnAlarmLocationArrivingMissingLocationTitle.json';
import oneCollectionContainingOneReminderWithAnAlarmLocationLeaving from './oneCollectionContainingOneReminderWithAnAlarmLocationLeaving.json';
import expectedResultOneCollectionContainingOneReminderWithPriority from './expectedResultOneCollectionContainingOneReminderWithPriority.json';
import expectedResultOneCollectionContainingOneReminderWithAnAlarmLocationLeaving from './expectedResultOneCollectionContainingOneReminderWithAnAlarmLocationLeaving.json';
import oneCollectionContainingTwoReminders from './oneCollectionContainingTwoReminders.json';
import expectedResultOneCollectionContainingTwoReminders from './expectedResultOneCollectionContainingTwoReminders.json';

describe('Response Mapper', () => {
  describe('getReminderFromResponseData', () => {
    let responseMapper: ResponseMapper;

    before('create new ResponseMapper', () => {
      responseMapper = new ResponseMapper();
    });

    it('should test an empty list is mapped correctly', (done) => {
      responseMapper.getReminderFromResponseData(emptyList)
      .then((reminder) => {
        expect(reminder).to.deep.equal(expectedResultEmptyList)
        done();
      })
      .catch(done);
    });

    it('should test a list with one collection without reminders is mapped correctly', (done) => {
      responseMapper.getReminderFromResponseData(oneCollectionWithoutReminders)
      .then((reminder) => {
        expect(reminder).to.deep.equal(expectedResultOneCollectionWithoutReminders);
        done();
      })
      .catch(done);
    });

    it('should test a list with one collection containing one reminder is mapped correctly', (done) => {
      responseMapper.getReminderFromResponseData(oneCollectionContainingOneReminder)
      .then((reminder) => {
        expect(reminder).to.deep.equal(expectedResultOneCollectionContainingOneReminder);
        done();
      })
      .catch(done);
    });

    it('should test a list with one collection containing one reminder with an alarm (time) is mapped correctly', (done) => {
      responseMapper.getReminderFromResponseData(oneCollectionContainingOneReminderWithAnAlarmTime)
      .then((reminder) => {
        expect(reminder).to.deep.equal(expectedResultOneCollectionContainingOneReminderWithAnAlarmTime);
        done();
      })
      .catch(done);
    });

    it('should test a list with one collection containing one reminder with an alarm (location arriving) is mapped correctly', (done) => {
      responseMapper.getReminderFromResponseData(oneCollectionContainingOneReminderWithAnAlarmLocationArriving)
      .then((reminder) => {
        expect(reminder).to.deep.equal(expectedResultOneCollectionContainingOneReminderWithAnAlarmLocationArriving);
        done();
      })
      .catch(done);
    });

    it('should test a list with one collection containing one reminder with an alarm (location leaving without location title) is mapped correctly', (done) => {
      responseMapper.getReminderFromResponseData(oneCollectionContainingOneReminderWithAnAlarmLocationArrivingMissingLocationTitle)
      .then((reminder) => {
        expect(reminder).to.deep.equal(expectedResultoneCollectionContainingOneReminderWithAnAlarmLocationArrivingMissingLocationTitle);
        done();
      })
      .catch(done);
    });

    it('should test a list with one collection containing one reminder with an alarm (location leaving) is mapped correctly', (done) => {
      responseMapper.getReminderFromResponseData(oneCollectionContainingOneReminderWithAnAlarmLocationLeaving)
      .then((reminder) => {
        expect(reminder).to.deep.equal(expectedResultOneCollectionContainingOneReminderWithAnAlarmLocationLeaving);
        done();
      })
      .catch(done);
    });

    it('should test a list with one collection containing one reminder with a priority is mapped correctly', (done) => {
      responseMapper.getReminderFromResponseData(oneCollectionContainingOneReminderWithPriority)
      .then((reminder) => {
        expect(reminder).to.deep.equal(expectedResultOneCollectionContainingOneReminderWithPriority);
        done();
      })
      .catch(done);
    });

    it('should test a list with one collection containing two reminders is mapped correctly', (done) => {
      responseMapper.getReminderFromResponseData(oneCollectionContainingTwoReminders)
      .then((reminder) => {
        expect(reminder).to.deep.equal(expectedResultOneCollectionContainingTwoReminders);
        done();
      })
      .catch(done);
    });
  });
});

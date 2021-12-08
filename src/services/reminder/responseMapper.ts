import { List, Reminder } from '../../types';
import { DateTimeParser } from './dateTimeParser';
import { Collection } from 'icloud-types/types/collection';

export class ResponseMapper {
  getReminderFromResponseData(responseData: any): Promise<Array<List>> {
    const collections: Array<Collection> = responseData['Collections'];
    const mappedResponse: Array<List> = collections.map((collection) => {
      const guid = collection.guid;
      const title = collection.title;

      const reminders: Array<any> = responseData['Reminders'];
      const remindersForGuid: Array<Reminder> = reminders
        .filter(reminder => reminder.pGuid === guid)
        .map(reminder => this.mapReminder(reminder));

      return {
        id: guid,
        name: title,
        reminders: remindersForGuid,
      };
    });

    return Promise.resolve(mappedResponse);
  }

  private mapReminder(reminder: any): Reminder {
    return {
      title: this.getTitle(reminder),
      description: this.getDescription(reminder),
      priority: this.getPriority(reminder),
      locationName: this.getLocationName(reminder.alarms),
      address: null,
      latitude: this.getLatitude(reminder.alarms),
      longitude: this.getLongitude(reminder.alarms),
      radius: this.getRadius(reminder.alarms),
      proximity: this.getProximity(reminder.alarms),
      alarm: this.getAlarm(reminder.alarms),
      completed: false,
    };
  }

  private getTitle(reminder: any): string {
    return reminder.title;
  }

  private getDescription(reminder: any): string | null {
    return reminder.description ? reminder.description : null;
  }

  private getPriority(reminder: any): string | null {
    return reminder.priority ? reminder.priority : null;
  }

  private getLocationName(alarms: Array<any>): string {
    return alarms[0] &&
      alarms[0].structuredLocation?.title ? alarms[0].structuredLocation?.title : null;
  }

  private getLatitude(alarms: Array<any>): number | null {
    return alarms[0] &&
      alarms[0].structuredLocation ? Number.parseFloat(alarms[0].structuredLocation.latitude) :
      null;
  }

  private getLongitude(alarms: Array<any>): number | null {
    return alarms[0] &&
      alarms[0].structuredLocation ? Number.parseFloat(alarms[0].structuredLocation.longitude) :
      null;
  }

  private getRadius(alarms: Array<any>): number | null {
    return alarms[0] &&
      alarms[0].structuredLocation ? Number.parseFloat(alarms[0].structuredLocation.radius) : null;
  }

  private getProximity(alarms: Array<any>): string | null {
    return alarms[0] && alarms[0].proximity ? alarms[0].proximity : null;
  }

  private getAlarm(alarms: Array<any>): string | null {
    return alarms[0] &&
      alarms[0].onDate ? DateTimeParser.getIsoStringForDateTimeArray(alarms[0].onDate) : null;
  }
}

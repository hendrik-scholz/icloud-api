import axios from 'axios';
import { Constants } from '../../constants';
import { List } from '../../types';
import { Credentials } from '../access/credentials';
import { ReminderService } from './reminderService';
import { ResponseMapper } from './responseMapper';

export class ICloudReminderServiceIos12AndEarlier implements ReminderService {
  private readonly responseMapper: ResponseMapper;
  private readonly listNameListIdMap: Map<string, string>;

  constructor(responseMapper: ResponseMapper) {
    this.responseMapper = responseMapper;
    this.listNameListIdMap = new Map<string, string>();
  }

  getRemindersLists(credentials: Credentials): Promise<Array<List>> {
    return new Promise((resolve, reject) => {
      axios.get(Constants.START_UP_ENDPOINT, this.getConfigurationForCredentials(credentials))
      .then((response) => {
        if (response?.data) {
          resolve(this.responseMapper.getReminderFromResponseData(response.data));
        } else {
          reject(`error status: ${response.status}`);
        }
      })
      .catch(error => reject(`${error.message}`));
    });
  }

  getRemindersListsList(credentials: Credentials, listName: string): Promise<List> {
    const configuration = this.getConfigurationForCredentials(credentials);

    return new Promise((resolve, reject) => {
      const listId = this.listNameListIdMap.get(listName);

      if (listId) {
        axios.get(`${Constants.REMINDERS_UP_ENDPOINT}/${listId}`, configuration)
          .then(response => this.responseMapper.getReminders(response.data['Reminders']))
          .then((mappedReminders) => {
            mappedReminders.id = listId ? listId : 'n/a';
            mappedReminders.name = listName;
            resolve(mappedReminders);
          })
          .catch(error => reject(`${error.message}`));
      } else {
        axios.get(Constants.START_UP_ENDPOINT, configuration)
          .then((response) => {
            if (response?.data) {
              const collections = response.data['Collections']
                .filter((collection: any) => collection.title === listName);
              if (collections[0] && collections[0].guid) {
                const id = collections[0].guid;
                this.listNameListIdMap.set(listName, id);
                return id;
              }

              reject(`Unable to determine list ID for list with name '${listName}'.`);
            }
          })
          .then(id => axios.get(`${Constants.REMINDERS_UP_ENDPOINT}/${id}`, configuration))
          .then(response => this.responseMapper.getReminders(response.data['Reminders']))
          .then((mappedReminders) => {
            const id = this.listNameListIdMap.get(listName);
            mappedReminders.id = id ? id : 'n/a';
            mappedReminders.name = listName;
            resolve(mappedReminders);
          })
          .catch(error => reject(`${error.message}`));
      }
    });
  }

  private getConfigurationForCredentials(credentials: Credentials) {
    return {
      headers: {
        Origin: Constants.HTTP_HEADER_ORIGIN,
        Referer: Constants.HTTP_HEADER_REFERER,
        Cookie: credentials.token,
      },
      params: { dsid: credentials.dsid },
    };
  }
}

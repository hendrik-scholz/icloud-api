import axios from 'axios';
import { Constants } from '../../constants';
import { List } from '../../types';
import { Credentials } from '../access/credentials';
import { ReminderService } from './reminderService';
import { ResponseMapper } from './responseMapper';

export class ICloudReminderServiceIos12AndEarlier implements ReminderService {
  private readonly responseMapper: ResponseMapper;

  constructor(responseMapper: ResponseMapper) {
    this.responseMapper = responseMapper;
  }

  getRemindersLists(credentials: Credentials): Promise<Array<List>> {
    const config = {
      headers: {
        Origin: Constants.HTTP_HEADER_ORIGIN,
        Referer: Constants.HTTP_HEADER_REFERER,
        Cookie: credentials.token,
      },
      params: { dsid: credentials.dsid },
    };

    return new Promise((resolve, reject) => {
      axios.get(Constants.START_UP_ENDPOINT, config)
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
}

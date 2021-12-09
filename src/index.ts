import { config } from 'dotenv';
import { Constants } from './constants';
import { ICloudAPIController } from './controllers';
import { Service, ICloudAPIService } from './services';
import { AccessService, CredentialService, ICloudAccessService } from './services/access';
import { ICloudReminderServiceIos12AndEarlier, ReminderService } from './services/reminder';
import { ResponseMapper } from './services/reminder/responseMapper';

config();
const parsedPort = process.env.port ?
  Number.parseInt(process.env.port, Constants.DEFAULT_RADIX) :
  Constants.DEFAULT_PORT;
const port = Number.isInteger(parsedPort) ? parsedPort : Constants.DEFAULT_PORT;

const credentialService: CredentialService = new CredentialService();
const accessService: AccessService =
  new ICloudAccessService(credentialService, Constants.LOGIN_ENDPOINT, Constants.LOGOUT_ENDPOINT);
const responseMapper: ResponseMapper = new ResponseMapper();
const reminderService: ReminderService = new ICloudReminderServiceIos12AndEarlier(responseMapper);
const service: Service = new ICloudAPIService(accessService, reminderService);

ICloudAPIController.start(service, port);

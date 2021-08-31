import { iCloudAPIController } from './controllers';
import { Service, iCloudAPIService } from './services';

const service: Service = new iCloudAPIService();

iCloudAPIController.start(service, 3000);

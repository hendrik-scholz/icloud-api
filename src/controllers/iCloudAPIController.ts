import express, { Request, Response } from 'express';
import * as log4js from 'log4js';
import { Constants } from '../constants';
import { Service } from '../services';
import { ErrorResponseService } from '../services/error';
import { ErrorResponse } from '../types';

log4js.configure({
  appenders: { controller: { type: 'console' } },
  categories: { default: { appenders: ['controller'], level: 'info' } },
});

export class ICloudAPIController {
  static start(service: Service, port: number) {
    const logger = log4js.getLogger();
    const app = express();

    app.get('/isalive', (req: Request, res: Response) =>
      service.isAlive()
      .then((data: any) => res.sendStatus(Constants.HTTP_STATUS_NO_CONTENT))
      .catch((error: any) => res.sendStatus(Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)));

    app.get('/ishealthy', (req: Request, res: Response) => {
      const appleId = req.get(Constants.HTTP_HEADER_APPLE_ID);
      const password = req.get(Constants.HTTP_HEADER_PASSWORD);

      if (appleId && password) {
        service.isHealthy(appleId, password)
          .then((data: any) => res.sendStatus(Constants.HTTP_STATUS_NO_CONTENT))
          .catch((error: any) => {
            const errorResponse: ErrorResponse = ErrorResponseService.getErrorResponse(
              Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
              '/ishealthy', 'Unknown error.',
              error,
            );
            res.status(Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(errorResponse);
          });
      } else {
        const errorResponse: ErrorResponse = ErrorResponseService.getErrorResponse(
          Constants.HTTP_STATUS_BAD_REQUEST,
          '/ishealthy', 'Missing credentials.',
          `Header ${Constants.HTTP_HEADER_APPLE_ID}` +
            ` and / or ${Constants.HTTP_HEADER_PASSWORD} is missing.`);
        res.status(Constants.HTTP_STATUS_BAD_REQUEST).send(errorResponse);
      }
    });

    app.get('/reminders/lists', (req: Request, res: Response) => {
      const appleId = req.get(Constants.HTTP_HEADER_APPLE_ID);
      const password = req.get(Constants.HTTP_HEADER_PASSWORD);

      if (appleId && password) {
        service.getRemindersLists(appleId, password)
          .then((data: any) => res.send(data))
          .catch((error: any) => {
            const errorResponse: ErrorResponse = ErrorResponseService.getErrorResponse(
              Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
              '/reminders/lists', 'Unknown error.',
              error,
            );
            res.status(Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(errorResponse);
          });
      } else {
        const errorResponse: ErrorResponse = ErrorResponseService.getErrorResponse(
          Constants.HTTP_STATUS_BAD_REQUEST,
          '/reminders/lists', 'Missing credentials.',
          `Header ${Constants.HTTP_HEADER_APPLE_ID}` +
            ` and / or ${Constants.HTTP_HEADER_PASSWORD} is missing.`);
        res.status(Constants.HTTP_STATUS_BAD_REQUEST).send(errorResponse);
      }
    });

    app.get('/reminders/lists/:list', (req: Request, res: Response) => {
      const appleId = req.get(Constants.HTTP_HEADER_APPLE_ID);
      const password = req.get(Constants.HTTP_HEADER_PASSWORD);
      const list = req.params.list;
      const endpoint = `/reminders/lists/${list}`;

      if (appleId && password && list) {
        service.getRemindersListsList(appleId, password, list)
          .then((data: any) => res.send(data))
          .catch((error: any) => {
            const errorResponse: ErrorResponse = ErrorResponseService.getErrorResponse(
              Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
              endpoint, 'Unknown error.',
              error,
            );
            res.status(Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(errorResponse);
          });
      } else if (!appleId || !password) {
        const errorResponse: ErrorResponse = ErrorResponseService.getErrorResponse(
          Constants.HTTP_STATUS_BAD_REQUEST,
          endpoint, 'Missing credentials.',
          `Header ${Constants.HTTP_HEADER_APPLE_ID}` +
            ` and / or ${Constants.HTTP_HEADER_PASSWORD} is missing.`);
        res.status(Constants.HTTP_STATUS_BAD_REQUEST).send(errorResponse);
      } else if (!list) {
        const errorResponse: ErrorResponse = ErrorResponseService.getErrorResponse(
          Constants.HTTP_STATUS_BAD_REQUEST,
          endpoint, 'Missing credentials.',
          `Path parameter 'list' is missing.`);
        res.status(Constants.HTTP_STATUS_BAD_REQUEST).send(errorResponse);
      }
    });

    app.post('/reminders/lists/:list', (req: Request, res: Response) =>
      service.postRemindersListsList()
      .then((data: any) => res.sendStatus(Constants.HTTP_STATUS_NO_CONTENT))
      .catch((error: any) => res.sendStatus(Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)));

    app.put('/reminders/lists/:list/:id', (req: Request, res: Response) =>
      service.putRemindersListsListId()
      .then((data: any) => res.sendStatus(Constants.HTTP_STATUS_NO_CONTENT))
      .catch((error: any) => res.sendStatus(Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)));

    app.patch('/reminders/lists/:list/:id', (req: Request, res: Response) =>
      service.patchRemindersListsListId()
      .then((data: any) => res.sendStatus(Constants.HTTP_STATUS_NO_CONTENT))
      .catch((error: any) => res.sendStatus(Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)));

    app.delete('/reminders/lists/:list/:id', (req: Request, res: Response) =>
      service.deleteRemindersListsListId()
      .then((data: any) => res.sendStatus(Constants.HTTP_STATUS_NO_CONTENT))
      .catch((error: any) => res.sendStatus(Constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)));

    app.listen(port, () => logger.info(`iCloudAPI app listening on port ${port}!`));
  }
}

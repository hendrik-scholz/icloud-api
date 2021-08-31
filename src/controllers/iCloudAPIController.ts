import express, { Request, Response } from 'express';
import { Service } from '../services';

export class iCloudAPIController {

  static start(service: Service, port: number) {
    const app = express();

    app.get('/isalive', (req: Request, res: Response) =>
      service.getIsalive()
      .then((data: any) => res.sendStatus(204))
      .catch((error: any) => res.sendStatus(500)));

    app.get('/ishealthy', (req: Request, res: Response) =>
      service.getIshealthy()
      .then((data: any) => res.sendStatus(204))
      .catch((error: any) => res.sendStatus(500)));

    app.get('/reminders/lists', (req: Request, res: Response) =>
      service.getRemindersLists()
      .then((data: any) => res.sendStatus(204))
      .catch((error: any) => res.sendStatus(500)));

    app.get('/reminders/lists/:list', (req: Request, res: Response) =>
      service.getRemindersListsList()
      .then((data: any) => res.sendStatus(204))
      .catch((error: any) => res.sendStatus(500)));

    app.post('/reminders/lists/:list', (req: Request, res: Response) =>
      service.postRemindersListsList()
      .then((data: any) => res.sendStatus(204))
      .catch((error: any) => res.sendStatus(500)));

    app.put('/reminders/lists/:list/:id', (req: Request, res: Response) =>
      service.putRemindersListsListId()
      .then((data: any) => res.sendStatus(204))
      .catch((error: any) => res.sendStatus(500)));

    app.patch('/reminders/lists/:list/:id', (req: Request, res: Response) =>
      service.patchRemindersListsListId()
      .then((data: any) => res.sendStatus(204))
      .catch((error: any) => res.sendStatus(500)));

    app.delete('/reminders/lists/:list/:id', (req: Request, res: Response) =>
      service.deleteRemindersListsListId()
      .then((data: any) => res.sendStatus(204))
      .catch((error: any) => res.sendStatus(500)));

    app.listen(port, () => console.log(`iCloudAPI app listening on port ${port}!`));
  }
}

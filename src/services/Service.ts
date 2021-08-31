export interface Service {
  getIsalive(): Promise<void>;

  getIshealthy(): Promise<void>;

  getRemindersLists(): Promise<void>;

  getRemindersListsList(): Promise<void>;

  postRemindersListsList(): Promise<void>;

  putRemindersListsListId(): Promise<void>;

  patchRemindersListsListId(): Promise<void>;

  deleteRemindersListsListId(): Promise<void>;
}

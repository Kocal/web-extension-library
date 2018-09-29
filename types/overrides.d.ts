declare namespace browser.notifications {
  function create(id: string | null, options: NotificationOptions): Promise<string>;
  function create(options: NotificationOptions): Promise<string>;
}

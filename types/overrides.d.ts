declare namespace browser.notifications {
  function create(id: string | null, options: NotificationOptions): Promise<string>;
  function create(options: NotificationOptions): Promise<string>;
}

declare namespace browser.tabs {
  type CreateProperties = {
    active?: boolean;
    cookieStoreId?: string;
    index?: number;
    openerTabId?: number;
    pinned?: boolean;
    // deprecated: selected: boolean,
    url?: string;
    windowId?: number;
  };
}

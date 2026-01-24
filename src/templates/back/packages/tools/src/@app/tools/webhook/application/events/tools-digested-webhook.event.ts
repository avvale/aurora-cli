export class ToolsDigestedWebhookEvent {
  constructor(
    public readonly event: {
      payload: {
        headers: any;
        payload: any;
      };
    },
  ) {}
}

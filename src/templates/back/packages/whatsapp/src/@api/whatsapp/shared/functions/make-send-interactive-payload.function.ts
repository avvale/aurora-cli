import {
  WhatsappInteractiveBody,
  WhatsappInteractiveFooter,
  WhatsappInteractiveHeader,
  WhatsappInteractiveType,
} from '@app/whatsapp';

/* eslint-disable camelcase */
export const makeSendInteractivePayload = ({
  to,
  type,
  header,
  body,
  footer,
  action,
}: {
  to: string;
  type: WhatsappInteractiveType;
  header?: WhatsappInteractiveHeader;
  body?: WhatsappInteractiveBody;
  footer?: WhatsappInteractiveFooter;
  action: any;
}): {
  to: string;
  [key: string]: any;
} => {
  return {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'interactive',
    interactive: {
      type,
      header,
      body,
      footer,
      action,
    },
  };
};

import { WhatsappMessageStatus } from '@api/graphql';

export const mapMessageStatus = (
    status: string,
): WhatsappMessageStatus =>
{
    switch (status)
    {
        case 'accepted':
            return WhatsappMessageStatus.ACCEPTED;

        case 'sent':
            return WhatsappMessageStatus.SENT;

        case 'delivered':
            return WhatsappMessageStatus.DELIVERED;

        case 'read':
            return WhatsappMessageStatus.READ;
    }
};
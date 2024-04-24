/* eslint-disable indent */
/* eslint-disable key-spacing */
import { IamAccountModel } from '@app/iam/account';
import { WhatsappConversationModel } from '@app/whatsapp/conversation';
import { WhatsappTimelineModel } from '@app/whatsapp/timeline';
import { DataTypes } from 'sequelize';
import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';

@Table({
    modelName: 'WhatsappMessage',
    freezeTableName: true,
    timestamps: false,
    indexes: [
		{
			fields: ['wabaMessageId'],
			unique: true,
		},
		{
			fields: ['accountId'],
			unique: false,
		},
		{
			fields: ['wabaContactId'],
			unique: false,
		},
    ],
})
export class WhatsappMessageModel extends Model<WhatsappMessageModel>
{
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @Column({
        field: 'wabaMessageId',
        allowNull: false,
        type: DataTypes.STRING(128),
    })
    wabaMessageId: string;

    @ForeignKey(() => WhatsappTimelineModel)
    @Column({
        field: 'timelineId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    timelineId: string;

    @BelongsTo(() => WhatsappTimelineModel, {
        constraints: false,
        foreignKey: 'timelineId',
    })
    timeline: WhatsappTimelineModel;

    @ForeignKey(() => WhatsappConversationModel)
    @Column({
        field: 'conversationId',
        allowNull: true,
        type: DataTypes.UUID,
    })
    conversationId: string;

    @BelongsTo(() => WhatsappConversationModel, {
        constraints: false,
        foreignKey: 'conversationId',
    })
    conversation: WhatsappConversationModel;

    @Column({
        field: 'statuses',
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.ENUM('ACCEPTED','DELIVERED','READ','SENT')),
    })
    statuses: string[];

    @Column({
        field: 'direction',
        allowNull: false,
        type: DataTypes.ENUM('INPUT','OUTPUT'),
    })
    direction: string;

    @ForeignKey(() => IamAccountModel)
    @Column({
        field: 'accountId',
        allowNull: true,
        type: DataTypes.UUID,
    })
    accountId: string;

    @BelongsTo(() => IamAccountModel, {
        foreignKey: 'accountId',
    })
    account: IamAccountModel;

    @Column({
        field: 'wabaContactId',
        allowNull: false,
        type: DataTypes.STRING(36),
    })
    wabaContactId: string;

    @Column({
        field: 'contactName',
        allowNull: true,
        type: DataTypes.STRING(127),
    })
    contactName: string;

    @Column({
        field: 'type',
        allowNull: false,
        type: DataTypes.ENUM('BUTTON','CONTACTS','IMAGE','INTERACTIVE','LOCATION','ORDER','REACTION','STICKER','SYSTEM','TEMPLATE','TEXT','UNKNOWN'),
    })
    type: string;

    @Column({
        field: 'payload',
        allowNull: false,
        type: DataTypes.JSONB,
    })
    payload: any;

    @Column({
        field: 'createdAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    createdAt: string;

    @Column({
        field: 'updatedAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    updatedAt: string;

    @Column({
        field: 'deletedAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    deletedAt: string;

}

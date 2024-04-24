/* eslint-disable indent */
/* eslint-disable key-spacing */
import { IamAccountModel } from '@app/iam/account';
import { WhatsappConversationModel } from '@app/whatsapp/conversation';
import { DataTypes } from 'sequelize';
import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';

@Table({
    modelName: 'WhatsappMessage',
    freezeTableName: true,
    timestamps: false,
    indexes: [
		{
			fields: ['accountId'],
			unique: false,
		},
		{
			fields: ['displayPhoneNumber'],
			unique: false,
		},
		{
			fields: ['phoneNumberId'],
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
        field: 'whatsappMessageId',
        allowNull: false,
        type: DataTypes.STRING(),
    })
    whatsappMessageId: string;

    @ForeignKey(() => WhatsappConversationModel)
    @Column({
        field: 'conversationId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    conversationId: string;

    @BelongsTo(() => WhatsappConversationModel, {
        constraints: false,
        foreignKey: 'conversationId',
    })
    conversation: WhatsappConversationModel;

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
        constraints: false,
        foreignKey: 'accountId',
    })
    account: IamAccountModel;

    @Column({
        field: 'displayPhoneNumber',
        allowNull: false,
        type: DataTypes.STRING(36),
    })
    displayPhoneNumber: string;

    @Column({
        field: 'phoneNumberId',
        allowNull: false,
        type: DataTypes.STRING(36),
    })
    phoneNumberId: string;

    @Column({
        field: 'type',
        allowNull: false,
        type: DataTypes.ENUM('TEMPLATE','REACTION','IMAGE','LOCATION','CONTACTS','INTERACTIVE','TEXT'),
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

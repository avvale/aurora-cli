/* eslint-disable indent */
/* eslint-disable key-spacing */
import { DataTypes } from 'sequelize';
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';

@Table({
    modelName: 'WhatsappTimeline',
    freezeTableName: true,
    timestamps: false,
    indexes: [
		{
			fields: ['accounts'],
			unique: false,
		},
		{
			fields: ['wabaPhoneNumberId', 'wabaContactId'],
			unique: true,
		},
    ],
})
export class WhatsappTimelineModel extends Model<WhatsappTimelineModel>
{
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @Column({
        field: 'accounts',
        allowNull: true,
        type: DataTypes.ARRAY(DataTypes.UUID),
    })
    accounts: string[];

    @Column({
        field: 'wabaPhoneNumberId',
        allowNull: false,
        type: DataTypes.STRING(36),
    })
    wabaPhoneNumberId: string;

    @Column({
        field: 'wabaContactId',
        allowNull: false,
        type: DataTypes.STRING(36),
    })
    wabaContactId: string;

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

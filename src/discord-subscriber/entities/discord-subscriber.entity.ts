import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'discord_subscribers' })
export class DiscordSubscriber extends Model {
    @Column({ primaryKey: true, allowNull: false })
    declare user_id: string;

    @Column({ allowNull: false, defaultValue: 'en' })
    declare language: string;

    @Column({ allowNull: true })
    declare subscribed_at: Date;
}

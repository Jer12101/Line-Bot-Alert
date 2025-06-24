// src/line/entities/line-subscriber.entity.ts
import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'line_subscribers' })
export class LineSubscriber extends Model {
    @Column({ primaryKey: true, allowNull: false,})
    declare user_id: string;

    @Column({ allowNull: true })
    declare subscribed_at: Date;

    // 👇 Add this new language column
    @Column({ allowNull: true })
    declare language: string;
    
}

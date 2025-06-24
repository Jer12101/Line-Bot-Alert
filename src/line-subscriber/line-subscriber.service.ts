// src/line-subscriber/line-subscriber.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LineSubscriber } from '../line/entities/line-subscriber.entity';

@Injectable()
export class LineSubscriberService {
    constructor(
        @InjectModel(LineSubscriber)
        private subscriberModel: typeof LineSubscriber,
    ) {}

    async createOrUpdate(userId: string, data: Partial<LineSubscriber>) {
        await this.subscriberModel.upsert({
            user_id: userId,
            ...data,
        });
    }


    async subscribe(userId: string): Promise<boolean> {
        try {
            const result = await this.subscriberModel.create({
                user_id: userId,
                subscribed_at: new Date(),
            });
            console.log('🧾 Saved subscriber:', result.toJSON());
            return true;
        } catch (error) {
        return false;
        }
    }

    async unsubscribe(userId: string): Promise<boolean> {
        const deleted = await this.subscriberModel.destroy({ where: { user_id: userId } });
        return deleted > 0;
    }

    async getAllUserIds(): Promise<string[]> {
        const all = await this.subscriberModel.findAll();
        const ids = all.map(s => s.user_id);
        console.log('📋 Fetched user IDs:', ids);
        return ids;
    }

}


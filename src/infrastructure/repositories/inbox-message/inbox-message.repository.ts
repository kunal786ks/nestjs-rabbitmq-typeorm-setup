import { Injectable } from "@nestjs/common";
import { InboxMessage } from "src/domain/inbox-message/inbox-message.entity";
import { InboxMessagePayload } from "src/infrastructure/message-bus/rabbitmq/rabbitmq.interface";
import { DataSource, EntityManager, Repository } from "typeorm";

@Injectable()
export class InboxMessageRepository extends Repository<InboxMessage> {
    constructor(dataSource: DataSource) {
        super(InboxMessage, dataSource.createEntityManager());
    }

    async storeInboxMessage(
        payload: InboxMessagePayload,
        transaction: EntityManager = null,
    ) {
        if (transaction) {
            return await transaction.save(InboxMessage, payload);
        }
        return await this.save(payload);
    }

    async getInboxMessageExists(message_id: string, handler_name: string) {
        const criteria = { message_id, handler_name };
        return this.findOne({ where: criteria });
    }
}
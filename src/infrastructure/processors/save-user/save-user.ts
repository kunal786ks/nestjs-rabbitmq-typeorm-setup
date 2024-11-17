import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { InboxMessageRepository } from "src/infrastructure/repositories/inbox-message/inbox-message.repository";
import { DataSource } from "typeorm";
import { Message } from "../common/message.interface";
import { MessageBody } from "./save-user.interface";

export class SaveUser {
    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource,
        @InjectRepository(InboxMessageRepository)
        private readonly inboxMessageRepository: InboxMessageRepository,

    ) { }

    getHandlerName(): string {
        return this.constructor.name;
    }

    async handleEvent(payload: Message<MessageBody>) {
        await this.dataSource.transaction(async (transaction) => {
            console.log("this is in the processss......................!", payload)

            await this.inboxMessageRepository.storeInboxMessage(
                {
                    message_id: payload.messageId,
                    handler_name: this.getHandlerName(),
                },
                transaction,
            );
            
        })
    }
}
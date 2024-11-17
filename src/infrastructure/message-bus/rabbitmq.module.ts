import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DispatchMessages } from "./cli-commands/dispatch-messages";
import { HandleMessages } from "./cli-commands/handle-messages";
import { RabbitmqConfigService } from "./rabbitmq/config/rabbitmq-config.service";
import { RabbitmqConfigurerService } from "./rabbitmq/config/rabbitmq-configurer.service";
import { RabbitmqConnectionService } from "./rabbitmq/config/rabbitmq-connection.service";
import { OutboxMessageRepository } from "../repositories/outbox-message/outbox-message.repository";
import { OutboxMessageRelay } from "./outbox-message-relay.service";
import { ConsumerService } from "./rabbitmq/workers/consumer.service";
import { InboxMessageHandler } from "./inbox-message-handler.service";
import { SignatureTypes } from "../processors/signature-types.service";
import { InboxMessageRepository } from "../repositories/inbox-message/inbox-message.repository";
import { TypeOrmModule } from "../database/type-orm";
import { ProducerService } from "./rabbitmq/workers/producer.service";
import { SaveUser } from "../processors/save-user/save-user";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule,
    ],
    providers: [
        DispatchMessages,
        HandleMessages,
        RabbitmqConfigService,
        RabbitmqConfigurerService,
        RabbitmqConnectionService,
        OutboxMessageRepository,
        OutboxMessageRelay,
        ConsumerService,
        ProducerService,
        InboxMessageHandler,
        SignatureTypes,
        InboxMessageRepository,
        SaveUser
    ],
})

export class RabbitmqModule { }
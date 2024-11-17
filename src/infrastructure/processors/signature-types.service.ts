import { Injectable } from "@nestjs/common";
import { SaveUser } from "./save-user/save-user";

@Injectable()
export class SignatureTypes {
    constructor(
        private readonly saveUser: SaveUser
    ) { }

    public signatureTypes: Record<string, any[]> = {
        'intenal-messaging.save-user': [this.saveUser]
    }

    public getSignaturesTypes(): Record<string, any[]> {
        return this.signatureTypes;
    }
}
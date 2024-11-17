interface SaveUser{
    uuid:string;
}

export interface MessageBody{
    uuid:string;
    fired_at:Date;
    save_user:SaveUser
}
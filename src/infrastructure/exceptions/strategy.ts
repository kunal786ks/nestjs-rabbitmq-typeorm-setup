import { MapperRegistry } from "http-problem-details-mapper";
import { QueryFailedError } from "typeorm";

export class MappingStrategy{
    private readonly registry:MapperRegistry;

    constructor(registry:MapperRegistry){
        this.registry=registry;
    }

    map(error:Error){
        const errorMapper=this.registry.getMapper(error);
        if(errorMapper){
            return errorMapper.mapError(error)
        }else{
            return {
                status:500,
                title:'Internal Servor Error',
                detail:error.message
            }
        }
    }
}
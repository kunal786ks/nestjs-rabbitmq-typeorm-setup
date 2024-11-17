import { MapperRegistry } from 'http-problem-details-mapper';
import { DtoValidationExceptionMapper, UniqueConstraintErrorMapper } from './mappers';


export class MapperRegistryFactory {
    static create(): MapperRegistry {
        return new MapperRegistry({ useDefaultErrorMapper: false })
            .registerMapper(new DtoValidationExceptionMapper())
            .registerMapper(new UniqueConstraintErrorMapper())
    }
}
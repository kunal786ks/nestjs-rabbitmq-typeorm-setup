import { HttpStatus } from "@nestjs/common";
import { ProblemDocument, ProblemDocumentExtension } from "http-problem-details";
import { ErrorMapper } from "http-problem-details-mapper";
import { DtoValidation } from "./exceptions";
import { QueryFailedError } from "typeorm";


class BadRequestMapper {
    static mapError(
        error: Error,
        extension?: ProblemDocumentExtension
    ): ProblemDocument {
        return new ProblemDocument(
            {
                title: 'Bad Request',
                detail: error?.message,
                status: HttpStatus.BAD_REQUEST
            },
            extension
        )
    }
}


class ConflictMapper {
    static mapError(
        error: Error,
        extension?: ProblemDocumentExtension
    ): ProblemDocument {
        return new ProblemDocument(
            {
                title: 'CONFLICT',
                detail: error?.message,
                status: HttpStatus.CONFLICT
            },
            extension
        )
    }
}


export class DtoValidationExceptionMapper extends ErrorMapper {
    constructor() {
        super(DtoValidation);
    }

    mapError(error: Error): ProblemDocument {
        console.log(error)
        const response =
            error instanceof DtoValidation ? error.getResponse() : null;
        const extension = new ProblemDocumentExtension({
            invalid_params:
                response && typeof response === 'object'
                    ? (response as any)?.message
                    : null,
        });
        return BadRequestMapper.mapError(error, extension);
    }
}

export class UniqueConstraintErrorMapper extends ErrorMapper {
    constructor() {
        super(QueryFailedError)
    }

    mapError(error: Error): ProblemDocument {
        const isUniqueConstraintViolation =
            error instanceof QueryFailedError && (error as any)?.code === '23505';

        console.log(error, "this is error")
        if (isUniqueConstraintViolation) {
            const extension = new ProblemDocumentExtension({
                invalid_params: {
                    name: "Unique Constraint Violation: Duplicate Entry for a Unique Field ",
                    message: (error as any)?.detail
                },
            });
            return ConflictMapper.mapError(
                new Error("Unique constraint "),
                extension
            );
        }
        return BadRequestMapper.mapError(error);
    }
}





// {
//     "title": "Bad Request",
//     "detail": "Dto Validation",
//     "status": 400,
//     "invalid_params": [
//         {
//             "name": "first_name",
//             "message": "first_name must be a string"
//         }
//     ]
// }
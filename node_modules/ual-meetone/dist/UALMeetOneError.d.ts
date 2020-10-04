import { UALError, UALErrorType } from 'universal-authenticator-library';
export declare class UALMeetOneError extends UALError {
    constructor(message: string, type: UALErrorType, cause: Error | null);
}

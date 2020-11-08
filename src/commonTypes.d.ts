import { HttpError } from "http-errors";

export type ErrorT = Error | HttpError | string;
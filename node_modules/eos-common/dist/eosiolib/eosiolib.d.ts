import { BigInteger } from "big-integer";
/**
*  Writes a number as a string
*
*  @brief Writes number x 10^(-num_decimal_places) (optionally negative) as a string
*  @param number - The number to print before shifting the decimal point to the left by num_decimal_places.
*  @param num_decimal_places - The number of decimal places to shift the decimal point.
*  @param negative - Whether to print a minus sign in the front.
*/
export declare function write_decimal(number: BigInteger, num_decimal_places: number, negative: boolean): string;

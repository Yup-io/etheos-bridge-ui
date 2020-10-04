"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Time {
    sec_since_epoch() {
        return Date.now();
    }
}
function current_time_point() {
    return new Time();
}
exports.current_time_point = current_time_point;
exports.block_timestamp_epoch = new Date(Date.UTC(2000, 0, 1, 0, 0, 0, 0)).getTime();
exports.seconds_per_day = 60 * 60 * 24;

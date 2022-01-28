// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment-timezone');

export class ConvertTimezone {
    /**
     * unixtimeをJSTへ変換する
     * @param unixtime
     * @returns YYYY/MM/DD HH:mm:ssでの日本時間
     */
    unixtimeToJst(unixtime: number): string {
        moment.tz.setDefault('Asia/Tokyo');
        const date = moment(unixtime, 'X').format('YYYY/MM/DD HH:mm:ss');
        return date;
    }

    /**
     * GMT（ISO表記）をJSTに変換する。
     * 時間が取得できない場合は、空文字列を返却する
     *
     * @param isogmt ISO表記GMT時間
     * @returns YYYY/MM/DD HH:mm:ssでの日本時間
     */
    isoGmttoJst(isogmt?: string): string {
        if (isogmt === undefined) return '';
        const date = moment(isogmt).format('YYYY/MM/DD HH:mm:ss');
        return date;
    }
}

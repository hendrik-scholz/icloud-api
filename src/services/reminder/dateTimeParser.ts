export class DateTimeParser {
  private static readonly INCOMPLETE_DATE_TIME_ARRAY_LENGTH = 4;
  private static readonly COMPLETE_DATE_TIME_ARRAY_LENGTH = 7;
  private static readonly YEAR_INDEX = 1;
  private static readonly MONTH_INDEX = 2;
  private static readonly DAY_INDEX = 3;
  private static readonly HOUR_INDEX = 4;
  private static readonly MINUTE_INDEX = 5;
  private static readonly PADDING_TARGET_LENGTH = 2;

  public static getIsoStringForDateTimeArray(dateTime: Array<number>): string {
    switch(dateTime.length) {
      case DateTimeParser.INCOMPLETE_DATE_TIME_ARRAY_LENGTH:
        return `${DateTimeParser.getDate(dateTime)}T00:00:00.000Z`;
      case DateTimeParser.COMPLETE_DATE_TIME_ARRAY_LENGTH:
        return `${DateTimeParser.getDate(dateTime)}T${DateTimeParser.getTime(dateTime)}`;
      default:
        return 'n/a';
    }
  }

  private static getDate(dateTime: Array<number>): string {
    const year = dateTime[DateTimeParser.YEAR_INDEX];
    const month = DateTimeParser.padTextWithZero(dateTime[DateTimeParser.MONTH_INDEX].toString());
    const day = DateTimeParser.padTextWithZero(dateTime[DateTimeParser.DAY_INDEX].toString());
    return `${year}-${month}-${day}`;
  }

  private static getTime(dateTime: Array<number>): string {
    const hour = DateTimeParser.padTextWithZero(dateTime[DateTimeParser.HOUR_INDEX].toString());
    const minute = DateTimeParser.padTextWithZero(dateTime[DateTimeParser.MINUTE_INDEX].toString());
    return `${hour}:${minute}:00.000Z`;
  }

  private static padTextWithZero(text: string) {
    return text.padStart(DateTimeParser.PADDING_TARGET_LENGTH, '0');
  }
}

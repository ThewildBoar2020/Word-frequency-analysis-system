package com.analysis.words.utils;

import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 描述：日期工具类
 * @author Administrator
 *
 */
public class DateUtil
{
	/**
	 * 描述：返回当前的年月日  格式：20150304223344
	 * @return
	 */
	public static String getTimeStamp()
	{
		String yearMonthDay;
		Date d = new Date();

		SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
		yearMonthDay = format.format(d);

		return yearMonthDay;
	}
	/**
	 * 描述：返回当前的年月日  格式：2015-03-04
	 * @return
	 */
	public static String getCurrentDate()
	{
		String yearMonthDay;
		Date d = new Date();

		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		yearMonthDay = format.format(d);

		return yearMonthDay;
	}

	/**
	 * 获取现在时间
	 *
	 * @return返回短时间格式 yyyy-MM-dd
	 */
	public static Date getNowDateShort() {
		Date currentTime = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		String dateString = formatter.format(currentTime);
		ParsePosition pos = new ParsePosition(0);
		Date currentTime_2 = formatter.parse(dateString, pos);
		return currentTime_2;
	}

	/**
	 * 描述：返回当前的年月  格式：2015-03
	 * @return
	 */
	public static String getCurrentYearMonth()
	{
		String yearAndMonth;
		Date d = new Date();

		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM");
		yearAndMonth = format.format(d);

		return yearAndMonth;
	}

	/**
	 * 描述：返回当前的年月  格式：2015
	 * @return
	 */
	public static String getCurrentYear()
	{
		String yearAndMonth;
		Date d = new Date();

		SimpleDateFormat format = new SimpleDateFormat("yyyy");
		yearAndMonth = format.format(d);

		return yearAndMonth;
	}

	/**
	 * 描述：根据指定的日期返回相应的天数
	 * @param date 格式:2015-01
	 * @return
	 */
	public static int getDaysByMonth(String date)
	{
		int days=0;

		String d[] = date.split("-");

		int year=Integer.parseInt(d[0]);
		int month=Integer.parseInt(d[1]);

		switch(month)
		{
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				days=31;
				break;
			case 4:
			case 6:
			case 9:
			case 11:
				days=30;
				break;
			case 2:
				if((year%4==0&&year%100!=0)||(year%400==0))
					days=29;
				else
					days=28;
				break;

		}

		return days;
	}

	public static String getNowDateLong() {
		Date currentTime = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String dateString = formatter.format(currentTime);
		return dateString;
	}
}

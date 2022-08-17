package com.analysis.words.utils;

import java.util.HashMap;
import java.util.Map;


/**
 * 项目工具栏
 * @author Administrator
 *
 */
public class AppUtil
{
	private static Map configMap = new HashMap();
	
	
	public static String getCompanyName()
	{
		String defaultName = "文本大数据词频分析系统";
		String companyName = (String) configMap.get("app.companyName");

		return defaultName;
	}
	
	/**
	 * 返回版本信息
	 * @return
	 */
	public static String getCopyRight()
	{
		return 2021+"-"+DateUtil.getCurrentYear();
	}
}

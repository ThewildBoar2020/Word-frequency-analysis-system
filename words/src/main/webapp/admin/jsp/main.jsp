<%@ page language="java" pageEncoding="utf-8"%>
<%@ page import="com.analysis.words.utils.AppUtil" %>
<%@ page import="com.analysis.words.entity.UserInfo" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
basePath+="admin/";

	if(request.getSession().getAttribute("userinfo")==null)
	{
		response.sendRedirect(basePath+"login.jsp");
	}
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>欢迎登录<%=AppUtil.getCompanyName() %></title>
    
	<meta http-equiv="msthemecompatible" content="no">
	
	<link rel="stylesheet" type="text/css" href="<%=basePath%>extjs/resources/css/ext-all.css"/>
	<link rel="stylesheet" type="text/css" href="<%=basePath%>css/admin.css"/>
	<link rel="stylesheet" type="text/css" href="<%=basePath%>css/admin_header.css"/>
	<link rel="stylesheet" type="text/css" href="<%=basePath%>css/Portal.css"/>
	
	<script type="text/javascript" src="<%=basePath%>extjs/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="<%=basePath%>extjs/ext-all-debug.js"></script>
	<script type="text/javascript" src="<%=basePath%>extjs/ext-lang-zh_CN.js"></script>
	<script type="text/javascript" src="<%=basePath%>extjs/ux/Portal.js"></script>
	<script type="text/javascript" src="<%=basePath%>extjs/ux/PortalColumn.js"></script>
	<script type="text/javascript" src="<%=basePath%>extjs/ux/Portlet.js"></script>
	<script type="text/javascript" src="<%=basePath%>extjs/ux/FileUploadField.js"></script>
	<script type="text/javascript">
		var path="<%=basePath%>";
		var username="<%=((UserInfo)(request.getSession().getAttribute("userinfo"))).getUsername()%>";
		var userpower="<%=((UserInfo)(request.getSession().getAttribute("userinfo"))).getPower()%>";
		var userInfoId=<%=((UserInfo)(request.getSession().getAttribute("userinfo"))).getUserinfoId()%>

		function closeWin(wid,sid) {
			Ext.getCmp(wid).close();
			if(sid=="articleStore")
				articleStore.reload();
			else if(sid=="contentStore")
				contentStore.reload();
		}
	</script>
	
	<script type="text/javascript" src="<%=basePath%>js/helpCode.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/allevents.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/uploadfile.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/userinfo/list.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/userinfo/add.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/userinfo/edit.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/userinfo/delete.js"></script>
	  <script type="text/javascript" src="<%=basePath%>js/userinfo/position_change.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/userinfo/personalInfo.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/userinfo/passwordModify.js"></script>

	<script type="text/javascript" src="<%=basePath%>js/department/list.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/department/add.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/department/edit.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/department/delete.js"></script>

	<script type="text/javascript" src="<%=basePath%>js/position/list.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/position/add.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/position/edit.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/position/delete.js"></script>

	<script type="text/javascript" src="<%=basePath%>js/contract/list.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/contract/add.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/contract/edit.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/contract/delete.js"></script>

	<script type="text/javascript" src="<%=basePath%>js/welfare/list.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/welfare/add.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/welfare/edit.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/welfare/delete.js"></script>

	<script type="text/javascript" src="<%=basePath%>js/work/list.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/work/add.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/work/edit.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/work/delete.js"></script>

	<script type="text/javascript" src="<%=basePath%>js/leave/list.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/leave/add.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/leave/edit.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/leave/delete.js"></script>
	  <script type="text/javascript" src="<%=basePath%>js/leave/check.js"></script>

	<script type="text/javascript" src="<%=basePath%>js/reward_punish_log/list.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/reward_punish_log/add.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/reward_punish_log/edit.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/reward_punish_log/delete.js"></script>

	<script type="text/javascript" src="<%=basePath%>js/userinfo_position_log/list.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/userinfo_position_log/add.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/userinfo_position_log/edit.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/userinfo_position_log/delete.js"></script>

	<script type="text/javascript" src="<%=basePath%>js/cms/channel/list.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/cms/channel/add.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/cms/channel/edit.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/cms/channel/delete.js"></script>

	<script type="text/javascript" src="<%=basePath%>js/cms/article/list.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/cms/article/add.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/cms/article/edit.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/cms/article/delete.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/cms/article/analisys.js"></script>

	<script type="text/javascript" src="<%=basePath%>js/cms/comment/list.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/cms/comment/add.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/cms/comment/edit.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/cms/comment/delete.js"></script>

	<script type="text/javascript" src="<%=basePath%>js/cms/content/list.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/cms/content/add.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/cms/content/edit.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/cms/content/delete.js"></script>

	<script type="text/javascript" src="<%=basePath%>js/cms/message/list.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/cms/message/add.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/cms/message/edit.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/cms/message/delete.js"></script>

	<script type="text/javascript" src="<%=basePath%>js/stu/course/list.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/stu/course/add.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/stu/course/edit.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/stu/course/delete.js"></script>

	<script type="text/javascript" src="<%=basePath%>js/car/list.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/car/delete.js"></script>

	<script type="text/javascript" src="<%=basePath%>js/stu/course_table/list.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/stu/course_table/add.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/stu/course_table/edit.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/stu/course_table/delete.js"></script>

	<script type="text/javascript" src="<%=basePath%>js/stu/office/list.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/stu/office/delete.js"></script>

	<script type="text/javascript" src="<%=basePath%>fckeditor/fckeditor.js"></script>
	<script type="text/javascript" src="<%=basePath%>extfckeditor/extfckeditor.js"></script>

	<script type="text/javascript" src="<%=basePath%>js/main.js"></script>

	<script type="text/javascript" src="<%=basePath%>echars/echarts.simple.js"></script>
	<script type="text/javascript" src="<%=basePath%>echars/echarts-wordcloud.js"></script>
	<link rel="stylesheet" href="<%=basePath%>layui/css/layui.css"  media="all">
    <script charset="utf-8" src="<%=basePath%>layui/layui.js" ></script>
	<script type="text/javascript" src="<%=basePath%>js/desk/desk_char.js"></script>

	<script type="text/javascript">
		Ext.QuickTips.init();	//启用悬停提示
	</script>
  </head>
  
  <body>
		<div id="loading">
             <div class="loading-indicator">
                  <div class="clear"></div>
             </div>
         </div>
        <div id="loading-mask"></div>

	<%--	<div id="header" class="app-header">
			<div class="headerNav">
				<div class="headerRight"></div>
			</div>

		</div>--%>

  </body>
</html>

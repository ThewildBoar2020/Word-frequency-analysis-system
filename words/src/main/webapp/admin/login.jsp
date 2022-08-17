<%@ page language="java" pageEncoding="utf-8"%>
<%@ page import="com.analysis.words.utils.AppUtil" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/admin/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>

<title>欢迎登录<%=AppUtil.getCompanyName() %></title>
<link rel="stylesheet" type="text/css" href="<%=basePath%>extjs/resources/css/ext-all.css"/>
	
	<script type="text/javascript" src="<%=basePath%>extjs/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="<%=basePath%>extjs/ext-all.js"></script>
<style>
*{margin:0;padding:0;font-size:12px;color:#676464}

.clear {clear:both;}
a, a:link {text-decoration:none;color:#676464;}
a:hover {color:#f3400c;}

#topBar, #loginForm, #loginForm2, #bottomBar, #cpBar {width:100%;min-width:960px;_width:expression_r((documentElement.clientWidth<960)?"960px":"100%");}
#topBar .center, #loginForm .center, #bottomBar .center, #cpBar .center {width: 960px;margin: 0 auto;}
#topBar {height: 80px;background-color: #F5F4F2;border-top:1px solid #E8E8E7}
#topBar .logo, #topBar .systemname, #topBar .navbar {height: 80px;}
#topBar {height: 80px;background-color: #F5F4F2;}
#topBar .logo {width:600px;float:left;}
#topBar .navbar {float:right;}
#topBar .navbar p {font-size:14px;text-align: right;margin-top: 50px;color:#9c9b9a;margin-right: 5px;}
#topBar .navbar p a {font-size:14px;}
#loginForm, #loginForm2, #loginForm .center {height: 630px;}
#loginForm #loginForm2, #loginForm .center {background:transparent url(<%=basePath%>images/login/index_bg.jpg) no-repeat center;}
#form{margin-right: 5px;margin-top: 60px;width: 300px;float: right;background-color: #EDEFF1;-moz-box-shadow: 0 0 12px #000;-webkit-box-shadow: 0 0 12px #000;box-shadow: 0 0 12px #000;/*-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=90)";filter:alpha(opacity=80);-moz-opacity:0.9; -khtml-opacity: 0.9;opacity: 0.9;*/}
#form .formTitle {font-size: 20px;height: 50px;text-align: center;line-height: 50px;text-align: center;font-family: '微软雅黑', '黑体';color:#000;background:url(<%=basePath%>images/login/login_title.png) repeat-x;}
.loginTable {margin: 20px;}
.loginTable td {height: 40px;}
.loginTable td.h70 {height: 80px;}
.loginTable .tip{height:30px;text-align:center;color:red;}
.loginTable .tip span{color:red;}
.loginTable .inputText{height:30px;border:1px solid #cdcdcd;line-height:30px;font-size:16px;outline: none;text-indent:5px;}
.loginTable input.focus{border:1px solid #FF8000;}
.loginTable .inputTextLong {width:200px;}
.loginTable .inputTextShort {width:128px;}
a.submitbtn {background:url(<%=basePath%>images/login/btn_submit.jpg) no-repeat;display:block;height:44px;width:160px;color:#FFF;}
a.submitbtn:hover {background:url(<%=basePath%>images/login/btn_submit.jpg) no-repeat 0 -44px;display:block;height:44px;width:160px;color:#FFF;}
#bottomBar {height: 40px;background-color: #F5F4F2;padding-top:20px;border-bottom:1px solid #E8E8E7}
#bottomBar table {margin:0 auto;}
#bottomBar table a {line-height: 34px;font-size:12px;display:block;}
#cpBar {line-height: 70px;height: 70px;text-align: center;}
#tooltip{position:absolute;border:1px solid #333;background:#f7f5d1;padding:2px 5px;color:#333;display:none;z-index:999;}
.authCodeImg{border:1px solid #C5C5C5;padding:4px;padding-bottom:4px;background-color: #FFF;}

</style>
<script type="text/javascript">
document.onkeydown=keyEnter;
function keyEnter()
{
	if(event.keyCode==13){loginSubmit();}   
}
function loginSubmit()
{
	var _username=document.getElementById("username").value;
	var _password=document.getElementById("password").value;
	
	if(_username=="")
	{
		Ext.Msg.show({title:"提示",msg:'对不起，账号不能为空！',buttons:Ext.Msg.OK,icon:Ext.Msg.INFO});
		return;
	}
	else if(_password=="")
	{
		Ext.Msg.show({title:"提示",msg:'对不起，密码不能为空！',buttons:Ext.Msg.OK,icon:Ext.Msg.INFO});
		return;
	}
	else
	{
		Ext.MessageBox.show({
		    msg : '正在初始化数据，请稍候......',
		    progressText : '执行中...',
		    width : 300,
		    wait : true,
		    waitConfig : {
		        interval : 100
		    }
		});
		Ext.Ajax.request({
			url:'<%=basePath%>userinfo/login?m=Math.random()*1000',
			method: 'POST',
			params:{username:_username,password:_password},
			success:function(response)
			{
			    console.log(Ext.util.JSON.decode(response.responseText).code==200);
				if(Ext.util.JSON.decode(response.responseText).code==200)
				{
					window.location.href="<%=basePath%>jsp/main.jsp";
				}
				else
				{
					Ext.Msg.show({title:"提示",msg:Ext.util.JSON.decode(response.responseText).msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
				}
			}
		});
	}
}
</script>
</head>

<body style="background-color:#F2F2F2">
<div id="headbar" style="height: 50px;"></div>

<div id="topBar">
  <div class="center">
    <div class="logo">
    	<img src="<%=basePath%>images/login/logo.jpg" height="80"/>
    </div>
    <div class="clear"></div>
  </div>
</div>

<div id="loginForm">
  <div id="loginForm2">
    <div class="center">
      <div id="form">
        <div class="formTitle">登录系统</div>
		<form method="post" action="<%=basePath%>LoginServlet" name="_loginForm" id="_loginForm">
        <table class="loginTable">
          <tbody><tr>
            <td class="fontStyle15" width="60">帐　号</td>
            <td colspan="2">
            <input type="text" id="username" name="username" class="inputText inputTextLong" value="" style="background-color: rgb(255, 255, 255);"></input></td>
          </tr>
          <tr>
            <td class="fontStyle15">密　码</td>
            <td colspan="2"><input type="password" id="password" name="password" class="inputText inputTextLong"/></td>
          </tr>
          <tr>
            <td class="h70"><input type="hidden" id="language" name="language" value="cn"/></td>
            <td class="h70" colspan="2" valign="bottom">
            <a href="javascript:void(0);" class="submitbtn" id="submitbtn" onclick="loginSubmit();"></a></td>
          </tr>

		  <tr>
            <td colspan="3" class="tip" id="notice">
              <span>
                <a href="<%=basePath%>register.jsp">注册</a>
              </span>

            </td>
          </tr>
        </tbody></table>
		</form>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</div>
<div id="bottomBar">
  <div class="center">
  </div>
</div>
<div id="cpBar">
  <div class="center"><a href="" target="_blank"></a><a href="#" target="_blank">© <%=AppUtil.getCopyRight() %> 文本大数据词频分析系统</a></div>
</div>
</body></html>


<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.analysis.words.utils.AppUtil" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/admin/";
%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
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
        #form .formTitle {font-size: 20px;height: 50px;text-align: center;line-height: 50px;text-align: center;font-family: '微软雅黑', '黑体';color:#000;background:url(/static/images/login/login_title.png) repeat-x;}
        .loginTable {margin: 20px;}
        .loginTable td {height: 40px;}
        .loginTable td.h70 {height: 80px;}
        .loginTable .tip{height:30px;text-align:center;color:red;}
        .loginTable .tip span{color:red;}
        .loginTable .inputText{height:30px;border:1px solid #cdcdcd;line-height:30px;font-size:16px;outline: none;text-indent:5px;}
        .loginTable input.focus{border:1px solid #FF8000;}
        .loginTable .inputTextLong {width:200px;}
        .loginTable .inputTextShort {width:128px;}
        a.submitbtn {background:url(<%=basePath%>images/login/btn_submit1.png) no-repeat;display:block;height:44px;width:160px;color:#FFF;}
        a.submitbtn:hover {background:url(<%=basePath%>images/login/btn_submit1.png) no-repeat 0 -44px;display:block;height:44px;width:160px;color:#FFF;}
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
            if(event.keyCode==13){registerSubmit();}
        }
        function registerSubmit()
        {
            var _username=document.getElementById("username").value;
            var _password=document.getElementById("password").value;
            var _password1=document.getElementById("password1").value;
            var _phone=document.getElementById("phone").value;

            if(_username==''){
                Ext.Msg.show({title:"提示",msg:"账号不能为空",buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
                return;
            }
            else if(_password==''){
                Ext.Msg.show({title:"提示",msg:"密码不能为空",buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
                return;
            }
            else if(_phone==''){
                Ext.Msg.show({title:"提示",msg:"手机号不能为空",buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
                return;
            }
            else if(_password!=_password1){
                Ext.Msg.show({title:"提示",msg:"两次输入的密码不一致！",buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
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
                    url:'<%=basePath%>/userinfo/registerSubmit',
                    method: 'POST',
                    params:{username:_username,password:_password,phone:_phone},
                    success:function(response)
                    {
                        console.log(response.responseText);
                        let result=JSON.parse(response.responseText);
                        if(result.code==200)
                        {
                            Ext.Msg.show({title:"提示",msg:result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.INFO});
                            //window.location.href="login";
                        }
                        else
                        {
                            Ext.Msg.show({title:"提示",msg:result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
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
            <img src="<%=basePath%>/images/login/logo.jpg" height="80"/>
        </div>
        <div class="clear"></div>
    </div>
</div>

<div id="loginForm">
    <div id="loginForm2">
        <div class="center">
            <div id="form">
                <div class="formTitle">注册系统</div>
                <form method="post" action="/register" name="_loginForm" id="_loginForm">
                    <table class="loginTable">
                        <tbody>
                        <tr>
                            <td class="fontStyle15" width="60">帐　号</td>
                            <td colspan="2">
                                <input type="text" id="username" name="username" class="inputText inputTextLong" value="" style="background-color: rgb(255, 255, 255);"></input></td>
                        </tr>
                        <tr  style="display: none">
                            <td class="fontStyle15" width="60">电　话</td>
                            <td colspan="2">

                                <input type="text" id="phone" name="phone" class="inputText inputTextLong" value="189xxxxxxxx" style="background-color: rgb(255, 255, 255);visibility: hidden"/>

                            </td>
                        </tr>
                        <tr>
                            <td class="fontStyle15">密　码</td>
                            <td colspan="2"><input type="password" id="password" name="password" class="inputText inputTextLong"/></td>
                        </tr>
                        <tr>
                            <td class="fontStyle15">确认密码</td>
                            <td colspan="2"><input type="password" id="password1" name="password1" class="inputText inputTextLong"/></td>
                        </tr>
                        <tr>
                            <td class="h70"><input type="hidden" id="language" name="language" value="cn"/></td>
                            <td class="h70" colspan="2" valign="bottom">
                                <a href="javascript:void(0);" class="submitbtn" id="submitbtn" onclick="registerSubmit();"></a></td>
                        </tr>
                        <tr>
                            <td colspan="3" class="tip" id="notice"><span>
              <a href="<%=basePath%>login.jsp">去登录</a>
            </span></td>
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
</body>
</html>

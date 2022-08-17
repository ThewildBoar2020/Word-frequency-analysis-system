<%--
  Created by IntelliJ IDEA.
  User: gmllt20171110
  Date: 2020/4/18
  Time: 下午8:03
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" pageEncoding="utf-8"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
    basePath+="admin/";
%>
<html>
<head>
    <title>二维码</title>
</head>
<body>

<img id="barCodeImage" src="<%=basePath%>getBarCodeImage"/>
<br/><br/>

<input type="button" value="刷新" onclick="refreshCode()">
<script>
    function refreshCode() {
        document.getElementById("barCodeImage").src="<%=basePath%>getBarCodeImage?time="+new Date().getTime();
    }
</script>
</body>
</html>

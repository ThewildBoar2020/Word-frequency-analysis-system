<%--
  Created by IntelliJ IDEA.
  User: gmllt20171110
  Date: 2020/2/14
  Time: 上午11:30
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
    basePath+="admin/";

    int contentId=0;
    if(request.getParameter("contentId")!=null&&!"".equals(request.getParameter("contentId")))
    {
        contentId=Integer.parseInt(request.getParameter("contentId"));
    }
%>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        #container
        {
            padding: 15px;
        }
        .bar
        {
            width: 100%;
            height: 1em;
            line-height: 1em;
            margin: 1em;
        }
        .bar p
        {
            float: left;
            width: 50%;
            text-align: center;
            height: .9em;
            line-height: .9em;
            color: #8E8E8E;
            font-size: 0.7em;

        }
        .title
        {
            text-align: center;
            border-bottom: 1px dotted #CCCCCC;
        }
    </style>
    <link rel="stylesheet" href="<%=basePath%>layui/css/layui.css"  media="all">
    <script charset="utf-8" src="<%=basePath%>layui/layui.js" ></script>
</head>
<body>
<div id="container">
    <h2 class="title" id="title"></h2>

    <div class="bar">
        <p>发布时间：<span id="addtime"></span></p>
        <p id="author"></p>
    </div>
    <div id="content">

    </div>
</div>
</body>
<script>
    var path="<%=basePath%>";
    var _contentId=<%=contentId%>;

    layui.use(['form'], function(){

        var form = layui.form
            ,layer = layui.layer
            ,$ = layui.$;

        $(function(){
            initDate(_contentId);
        });

        function initDate(_contentId) {
            $.ajax({
                type:'POST',
                data:{contentId:_contentId},
                url:path+'content/findById',
                success:function(res){
                    if(res.code==200){
                        console.log(res.data);
                        $("#title").html(res.data.title);
                        $("#addtime").html(res.data.createTime);
                        $("#author").html(res.data.author);
                        $("#content").html(res.data.content);
                    }else
                    {
                        layer.msg(res.msg);
                    }
                }
            });
        }
    });

</script>
</html>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
    basePath+="admin/";

    String articleId=request.getParameter("articleId");
%>
<html>
<head>
    <title>Title</title>
    <script type="text/javascript" src="<%=basePath%>echars/echarts.simple.js"></script>
    <script type="text/javascript" src="<%=basePath%>echars/echarts-wordcloud.js"></script>
    <link rel="stylesheet" href="<%=basePath%>layui/css/layui.css"  media="all">
    <script charset="utf-8" src="<%=basePath%>layui/layui.js" ></script>
    <style>
        html { overflow-x:hidden; overflow-y:auto; }
    </style>
    <script>
        var path="<%=basePath%>";
        var article_id="<%=articleId%>";
    </script>
</head>
<body>
<div class="time" id="time"></div>
<div class="layui-row layui-col-space15">
    <div class="layui-col-md6">
        <div style="padding: 50px 30px;" id="articleContent"></div>
    </div>
    <div class="layui-col-md6">
        <div id="articleContentCloud" style="min-width:290px;height:560px"></div>
    </div>
</div>


</body>
</html>
<script>
    let myChartSecond = echarts.init(document.getElementById('articleContentCloud'));
    myChartSecond.showLoading();    //数据加载完之前先显示一段简单的loading动画

    layui.use(['form', 'layedit', 'laydate'], function(){
        var form = layui.form
            ,layer = layui.layer
            ,layedit = layui.layedit
            ,laydate = layui.laydate
            ,$ = layui.$;

        $.ajax({
            type:'POST',
            url:path+'article/analysis?m='+Math.random(),
            data:{articleId:article_id},
            success:function (res) {
                console.log("=======")
                console.log(res.dataCloud)
                if(res.code==200){
                    // 拿计算结果进行图形布局
                    $('#articleContent').html(res.data.content);
                    $('#time').html(res.time);
                    myChartSecond.hideLoading();    //隐藏加载动画
                    myChartSecond.setOption({
                        series: [{
                            type: 'wordCloud',
                            gridSize: 2,
                            sizeRange: [12, 50],
                            rotationRange: [-90, 90],
                            shape: 'pentagon',
                            width: 600,
                            height: 560,
                            drawOutOfBound: true,
                            textStyle: {
                                normal: {
                                    color: function () {
                                        return 'rgb(' + [
                                            Math.round(Math.random() * 160),
                                            Math.round(Math.random() * 160),
                                            Math.round(Math.random() * 160)
                                        ].join(',') + ')';
                                    }
                                },
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowColor: '#333'
                                }
                            },
                            data:res.dataCloud
                        }]
                    });
                    //initMyData();
                }else{
                    layer.msg(res.msg);
                }
            }
        });

    });
</script>

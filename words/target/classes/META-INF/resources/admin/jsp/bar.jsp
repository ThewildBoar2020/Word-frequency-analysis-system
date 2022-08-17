<%@ page language="java" pageEncoding="utf-8"%>
<%@ page import="com.analysis.words.utils.AppUtil" %>
<%@ page import="com.analysis.words.entity.UserInfo" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
    basePath+="admin/";
%>
<html>
<head>
    <title>欢迎登录<%=AppUtil.getCompanyName() %></title>
    <meta http-equiv="msthemecompatible" content="no">
    <script type="text/javascript" src="<%=basePath%>echars/echarts.min.js"></script>
    <link rel="stylesheet" href="<%=basePath%>layui/css/layui.css"  media="all">
    <script charset="utf-8" src="<%=basePath%>layui/layui.js" ></script>
</head>
<body>

        <div id="pie_echarts" style="width:600px;height:600px;">

</div>

<script>
    var path="<%=basePath%>";
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('pie_echarts'));
    // 指定图表的配置项和数据
    option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(220, 220, 220, 0.8)'
            }
        }]
    };

    myChart.showLoading();    //数据加载完之前先显示一段简单的loading动画

    var names=[];    //类别数组（实际用来盛放X轴坐标值）
    var nums=[];    //销量数组（实际用来盛放Y坐标值）

    layui.use(['form'], function(){

        var form = layui.form
            ,layer = layui.layer
            ,$ = layui.$;

        $(function(){
            initDate();
        });

        function initDate() {
            $.ajax({
                type:'POST',
                data:{},
                url:path+'doctor/barCharts',
                success:function(res){
                    if(res.code==200){
                        console.log(res);
                        for(var i=0;i<res.data.length;i++){
                            names.push(res.data[i].name);    //挨个取出类别并填入类别数组
                        }
                        for(var i=0;i<res.data.length;i++){
                            nums.push(res.data[i].value);    //挨个取出销量并填入销量数组
                        }

                        myChart.hideLoading();    //隐藏加载动画
                        myChart.setOption({
                            xAxis: {
                                type: 'category',
                                data: names
                            },
                            yAxis: {
                                type: 'value'
                            },
                            tooltip: {
                                trigger: 'item',
                                formatter: "接诊人数：<br>{b} : {c}"
                            },
                            name: '科室医生数量',
                            series: [{
                                data: nums,
                                type: 'bar',
                                showBackground: true,
                                backgroundStyle: {
                                    color: 'rgba(220, 220, 220, 0.8)'
                                }
                            }]
                        });
                    }else
                    {
                        layer.msg(res.msg);
                    }
                }
            });
        }
    });


    // 使用刚指定的配置项和数据显示图表。
    //myChart.setOption(option);



</script>
</body>
</html>

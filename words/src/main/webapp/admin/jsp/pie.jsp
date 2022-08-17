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
        title: {
            text: '',
            x: 'left'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        //color: ['#CD5C5C', '#00CED1', '#9ACD32', '#FFC0CB'],
        stillShowZeroSum: false,
        series: [
            {
                name: '科室医生数量',
                type: 'pie',
                radius: '80%',
                center: ['50%', '50%'],
                data: [],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(128, 128, 128, 0.5)'
                    }
                }
            }
        ]
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
                url:path+'doctor/picCharts',
                success:function(res){
                    if(res.code==200){
                        myChart.hideLoading();    //隐藏加载动画
                        myChart.setOption({        //加载数据图表
                            series: [{
                                data:res.data
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
    myChart.setOption(option);



</script>
</body>
</html>

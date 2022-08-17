<%--
  Created by IntelliJ IDEA.
  User: gmllt20171110
  Date: 2020/2/16
  Time: 下午3:09
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
    basePath+="";

    String username="老子";
    if(request.getParameter("c")!=null&&!"".equals(request.getParameter("c")))
    {
        username=request.getParameter("c");
    }
%>
<html>
<head>
    <title>我的课表</title>

    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link href='https://fonts.googleapis.com/css?family=Architects+Daughter' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" type="text/css" href="<%=basePath%>calendar/stylesheets/stylesheet.css" media="screen">
    <!-- <link rel="stylesheet" type="text/css" href="stylesheets/github-light.css" media="screen"> -->
    <link rel="stylesheet" type="text/css" href="<%=basePath%>calendar/stylesheets/print.css" media="print">
    <link rel="stylesheet" type="text/css" href="<%=basePath%>calendar/stylesheets/simple-calendar.css">
    <link rel="stylesheet" href="<%=basePath%>admin/layui/css/layui.css"  media="all">
    <script charset="utf-8" src="<%=basePath%>admin/layui/layui.js" ></script>

    <style>
        #calendar{
            width: 100%
        }
        .clearfix{
            margin-bottom: 50px !important;
        }
    </style>
</head>
<body>
<form></form>
<div id = 'calendar'>

</div>
</body>
<script type="text/javascript" src="<%=basePath%>calendar/javascripts/simple-calendar.js"></script>
<script>
    var options = {
        width: '500px',
        height: '500px',
        language: 'CH', //语言
        showLunarCalendar: true, //阴历
        showHoliday: true, //休假
        showFestival: false, //节日
        showLunarFestival: false, //农历节日
        showMark: true, //标记
        showSolarTerm: false, //节气

        //获取点击的日期
        timeRange: {
            startYear: 1900,
            endYear: 2049
        },
        onSelect: (day) => {
            console.log(day);
        },
        mark: {
        },
        theme: {
            changeAble: false,
            weeks: {
                backgroundColor: '#FBEC9C',
                fontColor: '#4A4A4A',
                fontSize: '20px',
            },
            days: {
                backgroundColor: '#ffffff',
                fontColor: '#565555',
                fontSize: '24px'
            },
            todaycolor: '#3f51b5',
            activeSelectColor: '#3f51b5',
        }
    };
    var myCalendar = new SimpleCalendar('#calendar',options);
</script>

<script>
    var path="<%=basePath%>";
    var _username='<%=username%>';    //姓名

    layui.use(['form'], function(){

        var form = layui.form
            ,layer = layui.layer
            ,$ = layui.$;

        $(function(){
            initDate(1);
        });

        function initDate(wt) {
            $.ajax({
                type:'POST',
                data:{truename:_username},
                url:path+'admin/courseTable/teacherCourse',
                success:function(res){
                    if(res.code==200){
                        console.log(res.data);
                        for (let i=0;i<res.data.length;i++)
                        {
                            console.log(res.data[i].tableDate);
                            myCalendar.addMark(""+res.data[i].tableDate+"",
                                res.data[i].tableHours+"\n"+res.data[i].department.departmentName);
                        }

                    }
                }
            });
        }
    });
</script>

</html>

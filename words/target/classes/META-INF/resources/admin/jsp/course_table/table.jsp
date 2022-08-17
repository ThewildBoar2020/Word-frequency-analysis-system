<%--
  Created by IntelliJ IDEA.
  User: gmllt20171110
  Date: 2020/2/12
  Time: 下午6:12
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
    basePath+="admin/";

    int classId=13;
    if(request.getParameter("c")!=null&&!"".equals(request.getParameter("c")))
    {
        classId=Integer.parseInt(request.getParameter("c"));
    }
%>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
    <script src="<%=basePath%>js/coursetable/Timetables.min.js"></script>

    <link rel="stylesheet" href="<%=basePath%>layui/css/layui.css"  media="all">
    <script charset="utf-8" src="<%=basePath%>layui/layui.js" ></script>

    <title>大学课表</title>
    <style>
        #coursesTable {
            padding: 15px 10px;
        }

        .Courses-head {
            background-color: #edffff;
        }

        .Courses-head > div {
            text-align: center;
            font-size: 14px;
            line-height: 28px;
        }

        .left-hand-TextDom, .Courses-head {
            background-color: #f2f6f7;
        }

        .Courses-leftHand {
            background-color: #f2f6f7;
            font-size: 12px;
        }

        .Courses-leftHand .left-hand-index {
            color: #9c9c9c;
            margin-bottom: 4px !important;
        }

        .Courses-leftHand .left-hand-name {
            color: #666;
        }

        .Courses-leftHand p {
            text-align: center;
            font-weight: 900;
        }

        .Courses-head > div {
            border-left: none !important;
        }

        .Courses-leftHand > div {
            padding-top: 5px;
            border-bottom: 1px dashed rgb(219, 219, 219);
        }

        .Courses-leftHand > div:last-child {
            border-bottom: none !important;
        }

        .left-hand-TextDom, .Courses-head {
            border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
        }

        .Courses-content > ul {
            border-bottom: 1px dashed rgb(219, 219, 219);
            box-sizing: border-box;
        }

        .Courses-content > ul:last-child {
            border-bottom: none !important;
        }

        .highlight-week {
            color: #02a9f5 !important;
        }

        .Courses-content li {
            text-align: center;
            color: #666666;
            font-size: 14px;
            line-height: 50px;
        }

        .Courses-content li span {
            padding: 6px 2px;
            box-sizing: border-box;
            line-height: 18px;
            border-radius: 4px;
            white-space: normal;
            word-break: break-all;
            cursor: pointer;
        }

        .grid-active {
            z-index: 9999;
        }

        .grid-active span {
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
        }
    </style>
</head>
<body>

<blockquote class="layui-elem-quote layui-text">
    <form class="layui-form layui-form-pane" action="">
        <label class="layui-form-label" style="width: 130px">-<%=classId%>班课表-</label>
        <label class="layui-form-label" style="width: 60px">第</label>
        <div class="layui-input-inline" style="width: 60px">
        <select name="weekTh" id="weekTh" lay-filter="test">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
        </select>

        </div>
        <div class="layui-input-inline">
            <label class="layui-form-label" style="width: 60px">周</label>
        </div>
    </form>
</blockquote>


<div id="coursesTable"></div>
<script>
    var path="<%=basePath%>";
    var _departmentId=<%=classId%>;    //部门

    var courseList = [
        ['大学英语(Ⅳ)@10203', '大学英语(Ⅳ)@10203', '', '', '', '', '毛概@14208', '毛概@14208'],
        ['', '', '信号与系统@11302', '信号与系统@11302', '模拟电子技术基础@16204', '模拟电子技术基础@16204', '', ''],
        ['大学体育(Ⅳ)', '大学体育(Ⅳ)', '形势与政策(Ⅳ)@15208', '形势与政策(Ⅳ)@15208', '', '', '电路、信号与系统实验', '电路、信号与系统实验'],
        ['', '', '', '', '电装实习@11301', '电装实习@11301', '', ''],
        ['', '', '大学英语(Ⅳ)@10203', '大学英语(Ⅳ)@10203', '', '', '', ''],
    ];
    var week = window.innerWidth > 360 ? ['周一', '周二', '周三', '周四', '周五'] :
        ['一', '二', '三', '四', '五'];
    var day = new Date().getDay();
    var courseType = [
        [{index: '1', name: '8:00'}, 1],
        [{index: '2', name: '10:00'}, 1],
        [{index: '3', name: '10:00'}, 1],
        [{index: '4', name: '12:00'}, 1],
        [{index: '5', name: '14:00'}, 1],
        [{index: '6', name: '16:00'}, 1],
        [{index: '7', name: '16:00'}, 1],
        [{index: '8', name: '18:00'}, 1]
    ];

    layui.use(['form'], function(){

        var form = layui.form
            ,layer = layui.layer
            ,$ = layui.$;

        $(function(){
            initDate(1);
        });

        form.on('select(test)', function(data){
            initDate(data.value);
        });

        function initDate(wt) {
            $.ajax({
                type:'POST',
                data:{departmentId:_departmentId,weekTh:wt},
                url:path+'courseTable/getCourseTable',
                success:function(res){
                    if(res.code==200){
                        console.log(res.data);
                        courseList=res.data;
                        // 实例化(初始化课表)
                        $("#coursesTable").empty();
                        var Timetable = new Timetables({
                            el: '#coursesTable',
                            timetables: courseList,
                            week: week,
                            timetableType: courseType,
                            highlightWeek: day,
                            gridOnClick: function (e) {
                                //alert(e.name + '  ' + e.week + ', 第' + e.index + '节课, 课长' + e.length + '节');
                                //console.log(e);
                            },
                            styles: {
                                Gheight: 50
                            }
                        });
                    }
                }
            });
        }
    });



</script>
</body>
</html>
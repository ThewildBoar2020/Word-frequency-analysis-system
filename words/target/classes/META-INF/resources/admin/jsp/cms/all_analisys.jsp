 <%@ page contentType="text/html;charset=UTF-8" language="java" %>
 <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
 <%
     String path = request.getContextPath();
     String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
     basePath+="admin/";
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
    </script>
</head>
<body>
<div class="layui-row layui-col-space15">

    <div class="layui-col-md12">
        <div class="layui-card">
            <div class="layui-card-body">
                <form class="layui-form" action="">
                    <div class="layui-form-item">
                        <div class="layui-inline">
                            <label class="layui-form-label">文章类别</label>
                            <div class="layui-input-inline">
                                <select name="channelIds" lay-verify="required" id="channel_ids">
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>
                        <button type="button" class="layui-btn layui-btn-primary" id="kqSearch">查询</button>
                    </div>
                </form>
                <div class="layui-tab custom-tab layui-tab-brief" lay-filter="docDemoTabBrief">
                    <div id="articleContentCloud" style="background-color:#ffffff;min-height:620px;padding: 10px"></div>
                </div>
            </div>
        </div>
    </div>
</div>
<%--<div class="layui-row layui-col-space15">--%>
<%--    <div class="layui-col-md12">--%>
<%--        <div id="articleContentCloud" style="min-width:290px;height:560px"></div>--%>
<%--    </div>--%>
<%--</div>--%>


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

         function loadChannel(){
             $.ajax({
                 type:'POST',
                 url:path+'channel/findAll',
                 success:function(res){
                     if(res.code==200){
                         var option = '<option value="0" selected >全部</option>';  // option进行拼接
                         for(var i in res.data){
                             if(i=="remove")
                                 break;
                             option += "<option value='"+res.data[i]['channelId']+"'>"+res.data[i]['title']+"</option>";
                         }
                         $('#channel_ids').append(option);　　// 给select节点追加
                         form.render('select');
                     }
                 }
             });
         }


         function loadWordsCloud(){
             console.log($('#channel_ids').val())
             let channelId = $('#channel_ids').val()
             $.ajax({
                 type:'POST',
                 url:path+'chineseChart?m='+Math.random(),
                 data:{channelId:channelId},
                 success:function (res) {
                     console.log("=======")
                     console.log(res.data)
                     if(res.code==200){
                         $('#articleContent').html(res.data.content);
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
                                 data:res.data
                             }]
                         });
                         //initMyData();
                     }else{
                         layer.msg(res.msg);
                     }
                 }
             });
         }

         $(document).ready(function (){
             loadChannel();
             loadWordsCloud();
             $("#kqSearch").click(function (){
                 loadWordsCloud();
             })
         });


     });
 </script>

<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%--
  Created by IntelliJ IDEA.
  User: gmllt20171110
  Date: 2020/2/3
  Time: 下午8:12
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
    basePath+="admin/";

%>
<html>
<head>
    <title>文章添加</title>
    <script charset="utf-8" src="<%=basePath%>kindeditor/kindeditor-all.js"></script>
    <script charset="utf-8" src="<%=basePath%>kindeditor/lang/zh-CN.js"></script>
    <link rel="stylesheet" href="<%=basePath%>layui/css/layui.css"  media="all">
    <script charset="utf-8" src="<%=basePath%>layui/layui.js" ></script>


    <link rel="stylesheet" type="text/css" href="<%=basePath%>extjs/resources/css/ext-all.css"/>
    <script type="text/javascript" src="<%=basePath%>extjs/adapter/ext/ext-base.js"></script>
    <script type="text/javascript" src="<%=basePath%>extjs/ext-all-debug.js"></script>
    <script type="text/javascript" src="<%=basePath%>extjs/ext-lang-zh_CN.js"></script>

    <script type="text/javascript" src="<%=basePath%>js/cms/article/list.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/cms/article/add.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/cms/article/edit.js"></script>
    <script type="text/javascript" src="<%=basePath%>js/cms/article/delete.js"></script>



    <script>
        var path="<%=basePath%>";
      /*  KindEditor.ready(function(K) {
            window.editor = K.create('#content',{
                uploadJson : path+'file/upload',
                fileManagerJson : '../jsp/file_manager_json.jsp',
                allowFileManager : false,
                afterBlur: function(){this.sync();}
            });
        });*/
    </script>
</head>
<body>
<fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
    <legend>文章</legend>
</fieldset>
<form class="layui-form layui-form-pane" method="post" enctype="multipart/form-data"
      action="/admin/article/add" id="form1">
    <div class="layui-form-item">
        <label class="layui-form-label">标题</label>
        <div class="layui-input-block">
            <input type="text" name="title" autocomplete="off" lay-verify="required" placeholder="请输入标题" class="layui-input">
        </div>
    </div>

    <div class="layui-form-item">
        <label class="layui-form-label">作者</label>
        <div class="layui-input-inline">
            <input type="text" name="author" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
        </div>
    </div>

    <div class="layui-form-item">
        <label class="layui-form-label">日期</label>
        <div class="layui-input-inline">
            <input type="text" name="createDatetime" id="createDatetime" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
        </div>
    </div>

    <div class="layui-form-item">
        <label class="layui-form-label">栏目</label>
        <div class="layui-input-block">
            <select name="channelIds" lay-verify="required" id="channel_ids">
                <option value=""></option>
            </select>
        </div>
    </div>

    <div class="layui-form-item">
        <label class="layui-form-label">内容</label>
        <div class="layui-input-block">
            <textarea name="content" id="content" class="layui-textarea" style="width: 920px;height: 220px"></textarea>
        </div>
    </div>

    <div class="layui-form-item">
        <button type="submit" class="layui-btn" lay-submit="" lay-filter="demo1">立即提交</button>
        <button type="reset" class="layui-btn layui-btn-primary">重置</button>
    </div>

</form>


</body>
</html>
<script>
    layui.use(['form', 'layedit', 'laydate'], function(){
        var form = layui.form
            ,layer = layui.layer
            ,layedit = layui.layedit
            ,laydate = layui.laydate
            ,$ = layui.$;
        //日期
        laydate.render({
            elem: '#createDatetime'
        });

        //监听提交
        form.on('submit(demo1)', function(data){
            // layer.alert(JSON.stringify(data.field), {
            //     title: '最终的提交信息'
            // });
            $.ajax({
                url:path+'article/add',
                type:'post',
                data:data.field,
                beforeSend:function () {
                    this.layerIndex = layer.load(0, { shade: [0.5, '#393D49'] });
                },
                success:function(d){
                    if(d.code != 200){
                        layer.msg(data.msg,{icon: 5});//失败的表情
                        return;
                    }else if(d.code == 200){
                        Ext.Msg.show({title:"提示",msg:d.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.INFO});
                        parent.closeWin("articleAddWin","articleStore");
                    }
                }
            });
            return false;
        });

        $(function(){
            $.ajax({
                type:'POST',
                url:path+'channel/findAll',
                success:function(res){
                    if(res.code==200){
                        var option = '';  // option进行拼接
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
        });

    });
</script>
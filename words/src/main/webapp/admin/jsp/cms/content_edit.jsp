<%--
  Created by IntelliJ IDEA.
  User: gmllt20171110
  Date: 2020/2/4
  Time: 下午4:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
    basePath+="admin/";

    String contentId=request.getParameter("contentId");
%>

<html>
<head>
    <title>内容编辑</title>
    <script charset="utf-8" src="<%=basePath%>kindeditor/kindeditor-all.js"></script>
    <script charset="utf-8" src="<%=basePath%>kindeditor/lang/zh-CN.js"></script>
    <link rel="stylesheet" href="<%=basePath%>layui/css/layui.css"  media="all">
    <script charset="utf-8" src="<%=basePath%>layui/layui.js" ></script>


    <link rel="stylesheet" type="text/css" href="<%=basePath%>extjs/resources/css/ext-all.css"/>
    <script type="text/javascript" src="<%=basePath%>extjs/adapter/ext/ext-base.js"></script>
    <script type="text/javascript" src="<%=basePath%>extjs/ext-all-debug.js"></script>
    <script type="text/javascript" src="<%=basePath%>extjs/ext-lang-zh_CN.js"></script>
    <script>
        var path="<%=basePath%>";
        var content_id="<%=contentId%>";
        KindEditor.ready(function(K) {
            window.editor = K.create('#content',{
                uploadJson : path+'file/upload',
                fileManagerJson : '../jsp/file_manager_json.jsp',
                allowFileManager : false,
                afterBlur: function(){this.sync();}
            });
        });
    </script>
</head>
<body>
<fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
    <legend>文件</legend>
</fieldset>
<form class="layui-form layui-form-pane" method="post" enctype="multipart/form-data"
      action="/admin/content/edit" id="form1" lay-filter="content_edit">
    <div class="layui-form-item">
        <label class="layui-form-label">标题</label>
        <div class="layui-input-block">
            <input type="hidden" name="contentId" id="contentId">
            <input type="text" name="title" id="title" autocomplete="off" lay-verify="required" placeholder="请输入标题" class="layui-input">
        </div>
    </div>

    <div class="layui-form-item">
        <label class="layui-form-label">作者</label>
        <div class="layui-input-inline">
            <input type="text" name="author" id="author" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
        </div>
    </div>

    <div class="layui-form-item">
        <label class="layui-form-label">日期</label>
        <div class="layui-input-inline">
            <input type="text" name="createTime" id="createTime" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
        </div>
    </div>

    <div class="layui-form-item">
        <label class="layui-form-label">类别</label>
        <div class="layui-input-block">
            <select name="channelId" lay-verify="required" id="channelId">
                <option value=""></option>
            </select>
        </div>
    </div>

    <!--************图片上传***************-->
    <div class="layui-form-item">
        <label class="layui-form-label">封面</label>
        <div class="layui-input-inline">
            <input type="text" name="titleImg" lay-verify="required" autocomplete="off" class="layui-input" id="titleImg">
        </div>
        <div class="layui-input-inline">
            <button type="button" class="layui-btn" id="titleImagUploadBtn">上传封面</button>
            <div class="layui-upload-list">
                <img class="layui-upload-img" id="imgPreview" style="width: 40px">
                <p id="demoText"></p>
            </div>
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">文件</label>
        <div class="layui-input-inline">
            <input type="text" name="mediaPath" lay-verify="required" autocomplete="off" class="layui-input" id="mediaPath">
        </div>
        <div class="layui-input-inline">
            <button type="button" class="layui-btn" id="videoUploadBtn"><i class="layui-icon"></i>上传文件</button>
            <div class="layui-upload-list">
                <p id="shomMsg"></p>
            </div>
        </div>
    </div>

    <div class="layui-form-item">
        <label class="layui-form-label">内容</label>
        <div class="layui-input-block">
            <textarea name="content" id="content" class="layui-textarea" style="width: 900px"></textarea>
        </div>
    </div>

    <div class="layui-form-item" style="text-align: center">
        <button type="submit" class="layui-btn" lay-submit="" lay-filter="contentSubmit">立即提交</button>
        <button type="reset" class="layui-btn layui-btn-primary">重置</button>
    </div>

</form>


</body>
</html>
<script>
    layui.use('upload', function() {
        var $ = layui.jquery
            , upload = layui.upload;
        //普通图片上传
        var uploadInst = upload.render({
            elem: '#titleImagUploadBtn'
            , url: path+'file/uploadImg' //改成您自己的上传接口
            ,accept:'images'
            , exts: 'jpg|png|jpeg'
            ,size:50000
            , before: function (obj) {
                //预读本地文件示例，不支持ie8
                obj.preview(function (index, file, result) {
                    $('#imgPreview').attr('src', result); //图片链接（base64）
                });
            }
            , done: function (res) {
                //如果上传失败
                if (res.code != 200) {
                    return layer.msg('上传失败');
                }
                //上传成功
                var domText=$("#demoText");
                domText.html("<span style='color:#4cac4c'>上传成功</span>");
                var imgPreview=$("#imgPreview");
                imgPreview.attr("value",res.url);
                $("#titleImg").val(res.url);
            }
            , error: function () {
                //演示失败状态，并实现重传
                var demoText = $('#demoText');
                demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
                demoText.find('.demo-reload').on('click', function () {
                    uploadInst.upload();
                });
            }
        });
        //视频上传
        var uploadMedia = upload.render({
            elem: '#videoUploadBtn'
            , url: path+'file/uploadImg' //改成您自己的上传接口
            ,accept:'video'
            , exts: 'mp4|flv|avi|doc|txt|docx|xls|xlsx|ppt|pptx|jpg|png'
            ,size:838860800
            , before: function (obj) {
                //预读本地文件示例，不支持ie8
                obj.preview(function (index, file, result) {
                    //$('#titleImag').attr('src', result); //图片链接（base64）
                });
            }
            , done: function (res) {
                //如果上传失败
                if (res.code != 200) {
                    return layer.msg('上传失败');
                }
                //上传成功
                var shomMsg=$("#shomMsg");
                shomMsg.html("<span style='color:#4cac4c'>上传成功</span>");
                $("#mediaPath").val(res.url);
            }
            , error: function () {
                //演示失败状态，并实现重传
                var shomMsg = $('#shomMsg');
                shomMsg.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
                shomMsg.find('.demo-reload').on('click', function () {
                    uploadMedia.upload();
                });
            }
        });
    });

    layui.use(['form','laydate'], function(){
        var form = layui.form
            ,laydate = layui.laydate
            ,$ = layui.$;
        //日期
        laydate.render({
            elem: '#createTime'
        });

        //监听提交
        form.on('submit(contentSubmit)', function(data){
            // layer.alert(JSON.stringify(data.field), {
            //     title: '最终的提交信息'
            // });
            $.ajax({
                url:path+'content/edit',
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
                        parent.closeWin("contentEditWin","contentStore");
                    }
                }
            });
            return false;
        });
        //获取栏目
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
                        $('#channelId').append(option);　　// 给select节点追加
                        form.render('select');
                        //获取文章内容
                        $.ajax({
                            type:'POST',
                            url:path+'content/findById?m='+Math.random(),
                            data:{contentId:content_id},
                            success:function (res) {
                                if(res.code==200){
                                    form.val('content_edit', {
                                        "contentId": res.data.contentId
                                        ,"title": res.data.title
                                        ,"author": res.data.author
                                        ,"createTime": res.data.createTime
                                        ,"titleImg": res.data.titleImg
                                        ,"mediaPath": res.data.mediaPath
                                    });
                                    window.editor.html(res.data.content);
                                    window.editor.sync();
                                    $('#channelId').val(res.data.channelId);
                                    form.render('select');


                                }
                            }
                        });
                    }
                }
            });
        });

    });
</script>
</body>
</html>

<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>车辆列表</title>
    <link rel="stylesheet" type="text/css" href="${basePath}/templates/css/base.css" />
    <link rel="stylesheet" type="text/css" href="${basePath}/templates/css/index.css" />

    <script type="text/javascript" src="${basePath}/admin/echars/echarts.min.js"></script>
    <link rel="stylesheet" href="${basePath}/admin/layui/css/layui.css"  media="all">
    <script charset="utf-8" src="${basePath}/admin/layui/layui.js" ></script>

</head>
<body>
<div class="ui-grid ui-main clearfix">
    <div class="header-bd ui-grid clearfix">
        <h1 class="logo">
            <a href="/"><img src="${basePath}/templates/images/logo_.jpg" alt="logo"></a>
        </h1>
        <div class="search-container">
            <form action="index.html" autocomplete="off">
                <input class="query" type="text" id="doctorName"
                       name="doctorName" placeholder="搜车辆" value="${doctorName!}">
                <button class="search-btn" type="submit"></button>
            </form>
        </div>
        <div class="user-contanier ">

            <a class="login－wrap user-item" href="${basePath}/admin/login.jsp">
                <i class="icon-login"></i>
                <span>登录</span>
            </a>
        </div>
    </div>
    <div class="doctor-list">
        <#if cars??>
        <#list cars as car>
            <#if car_index == 0>
                <div class="doctor-info-item first">
            <#elseif car_index == 49>
                <div class="doctor-info-item odd last">
            <#elseif car_index % 2!=0>
                <div class="doctor-info-item odd">
            <#else>
                <div class="doctor-info-item">
            </#if>
            <div class="avatar-wrap">
                <a href="/pc/doctor/clinic_web_88722f35e987eaf1/" target="_blank">

                    <img src="${car.coverImg!}">

                </a>

                <span class="available">${car.carName}</span>

            </div>
            <div class="detail">
                <div class="des-item">
                    <a class="name-wrap" href="#" target="_blank">
                        <span class="name">指导价:&nbsp;</span>
                        <span class="clinic">&nbsp;</span>
                        <span class="grade">${car.dealerPrice!}</span>
                    </a>
                </div>
                <div class="des-item">
                    <a class="hospital" href="#" target="_blank">
                        ${car.rankTips}
                    </a>
                </div>
                <div class="des-item">
                    <span class="half-item">评价人数：<i class="color-black"> ${car.commentNum}</i></span>
                    <span class="half-item">评价结果：<i class="color-black">${car.commentResult}</i></span>
                    <span class="half-item">综合得分：<i class="color-black">${car.score}</i></span>
                </div>
                <p class="des">
                        <span class="half-item">外观：<i class="color-black"> ${car.wgScore}</i></span>
                        <span class="half-item">内饰：<i class="color-black">${car.nsScore}</i></span>
                        <span class="half-item">配置：<i class="color-black"> ${car.pzScore}</i></span>
                        <span class="half-item">空间：<i class="color-black">${car.kjScore}</i></span>
                        <span class="half-item">操控：<i class="color-black"> ${car.ckScore}</i></span>
                        <span class="half-item">动力：<i class="color-black">${car.dlScore}</i></span>
                </p>
            </div>
        </div>
        </#list>
        </#if>
    </div>

    <div class="pagebar">

        <a class="prev disabled" href="index.html?start=${last}">上一页</a>

        <a class="page" href="javascript:void(0)">${(current)?c}</a>

        <a class="next" href="index.html?start=${next?c}">下一页</a>

    </div>

</div>

</body>
</html>
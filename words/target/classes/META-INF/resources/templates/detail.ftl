<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${doctor.doctorName}</title>
    <link rel="stylesheet" type="text/css" href="${basePath}/templates/css/base.css" />
    <link rel="stylesheet" type="text/css" href="${basePath}/templates/css/detail.css" />
</head>
<body>

<div class="ui-grid ui-main clearfix">
    <div class="doctor-wrap clearfix">
        <div class="doctor-left-wrap">
            <div class="doctor-info-item">
                <div class="avatar-wrap">

                    <img src="${doctor.picUrl!}">


                </div>
                <div class="detail">
                    <div class="des-item name-item">
                        <span class="name">${doctor.doctorName}&nbsp;</span>
                        <a class="clinic" href="#" target="_blank">
                            ${doctor.classroom}
                        </a>
                        <span class="grade">&nbsp;${doctor.positionName}</span>

                        <span class="verified-bage">已认证</span>
                        <a class="j-verified-btn verified-btn" href="javascript:void(0);">?</a>

                    </div>
                    <div class="des-item">
                        <a class="hospital" href="#" target="_blank">
                            ${doctor.hospital}
                        </a>
                    </div>

                    <div class="doctor-hospital">

                        <span>知名医院</span>

                        <span>特色科室</span>

                    </div>

                </div>
            </div>
            <ul class="doctor-data">
                <li class="item odd-item">
                    <span class="number">${doctor.personCount}</span>
                    <span class="des">服务人次</span>
                </li>
                <li class="item">
                    <span class="number">${doctor.goodComment}</span>
                    <span class="des">好评率（%）</span>
                </li>
            </ul>
        </div>


        <div class="wexin-qr-code">
            <div class="qr-code">

                <img src="https://resource.chunyu.mobi/@/media/images/2018/01/23/_csc8_-7na0QUlyCMj-xD7g" alt="${doctor.doctorName}二维码">

                <div class="des">微信关注${doctor.doctorName!}医生<br>方便随时提问</div>
            </div>
        </div>
    </div>
    <!--医生介绍-->
    <div class="title-wrap">
        <h6 class="title">医生介绍</h6>
    </div>

    <div class="paragraph j-paragraph" data-column="5">
        <p class="detail">
            <span class="title">医学教育背景介绍 :</span>

            暂无信息

        </p>

        <div class="more-btn">
            <a class="more-btn-inner">展开<i class="icon-arrow arrow-up"></i></a>
            <a class="more-btn-inner hide">收起<i class="icon-arrow arrow-down"></i></a>
        </div>

    </div>


    <div class="paragraph j-paragraph" data-column="3">
        <p class="detail">
            <span class="title">擅长疾病 :</span>

            ${doctor.skilled}

        </p>

        <div class="more-btn">
            <a class="more-btn-inner">展开<i class="icon-arrow arrow-up"></i></a>
            <a class="more-btn-inner hide">收起<i class="icon-arrow arrow-down"></i></a>
        </div>

    </div>


    <div class="paragraph j-paragraph" data-column="3">
        <p class="detail">
            <span class="title">医院地点 :</span>

            北京大学第三医院 北京市海淀区花园北路49号【春雨提示：部分医院有多个院区，请先与医生确认好地点后再前往就诊】

        </p>

        <div class="more-btn">
            <a class="more-btn-inner">展开<i class="icon-arrow arrow-up"></i></a>
            <a class="more-btn-inner hide">收起<i class="icon-arrow arrow-down"></i></a>
        </div>

    </div>

    <!-- 医生话题 -->
    <div class="j-doctor-topic"></div>
</div>

</body>
</html>
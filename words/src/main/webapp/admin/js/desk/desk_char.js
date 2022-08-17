function alarmChart()
{
    var myChart = echarts.init(document.getElementById('palarmcon'));

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
                url:path+'car/barCharts',
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
                            title: {
                                text: '车辆评论条数',
                                subtext: '车辆评论条数',
                                left: 'center'
                            },
                            xAxis: {
                                type: 'category',
                                data: names
                            },
                            yAxis: {
                                type: 'value'
                            },
                            tooltip: {
                                trigger: 'item',
                                formatter: "评价人数：<br>{b} : {c}"
                            },
                            name: '评价人数',
                            series: [{
                                data: nums,
                                type: 'bar',
                                showBackground: true,
                                backgroundStyle: {
                                    color: 'rgba(220, 220, 220, 0.8)'
                                }
                            }]
                        });
                    }else {
                        layer.msg(res.msg);
                    }
                }
            });
        }
    });
}

function alarmChart1()
{
    var myChart1 = echarts.init(document.getElementById('palarmcon'));

    myChart1.showLoading();    //数据加载完之前先显示一段简单的loading动画

    let names=[];    //类别数组（实际用来盛放X轴坐标值）
    let nums=[];    //销量数组（实际用来盛放Y坐标值）

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
                url:path+'/englishChart',
                success:function(res){
                    if(res.code==0){
                        console.log(res);
                        myChart1.hideLoading();    //隐藏加载动画
                        myChart1.setOption({
                            name: '词云',
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
                    }else {
                        layer.msg(res.msg);
                    }
                }
            });
        }
    });
}

function alarmChart2()
{
    let myChart2 = echarts.init(document.getElementById('palarmcon1'));
    myChart2.showLoading();    //数据加载完之前先显示一段简单的loading动画
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
                url:path+'chineseChart',
                success:function(res){
                    if(res.code==0){
                        myChart2.hideLoading();    //隐藏加载动画
                        myChart2.setOption({

                            series: [{
                                type: 'wordCloud',
                                gridSize: 2,
                                sizeRange: [12, 50],
                                rotationRange: [-90, 90],
                                shape: 'square',
                                width: 1400,
                                height: 800,
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
                    }else {
                        layer.msg(res.msg);
                    }
                }
            });
        }
    });
}

function alarmChart3()
{
    let myChart3 = echarts.init(document.getElementById('palarmcon3'));

    myChart3.showLoading();    //数据加载完之前先显示一段简单的loading动画

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
                url:path+'car/scoreBarCharts',
                success:function(res){
                    if(res.code==200){
                        myChart3.hideLoading();    //隐藏加载动画
                        myChart3.setOption({
                            title: {
                                text: '车辆评分',
                                subtext: '车辆评分',
                                left: 'center'
                            },
                            tooltip: {
                                trigger: 'item'
                            },
                            legend: {
                                orient: 'vertical',
                                left: 'left',
                            },
                            series: [
                                {
                                    name: '',
                                    type: 'pie',
                                    radius: '50%',
                                    data: res.data,
                                    emphasis: {
                                        itemStyle: {
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    }
                                }
                            ]
                        });
                    }else {
                        layer.msg(res.msg);
                    }
                }
            });
        }
    });
}

function showIndexChart() {
	//alarmChart();
    //alarmChart1();
    alarmChart2();
    //alarmChart3();
}
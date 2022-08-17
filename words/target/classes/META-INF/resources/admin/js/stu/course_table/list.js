/**
 * @Title: courseTable
 * @Package null
 * @Description 课表管理
 * @author
 * @date 2022年2月2日 20:20:30
 * @version V1.0
 */
var courseTableStore;
function courseTableList(node)
{
    //分页数量
    var _pageSize=15;
    //Record定义记录结果
    var courseTable=Ext.data.Record.create([
        {name:'courseTable_id',type:'string',mapping:'couserTableId'},
        {name:'course_id',type:'string',mapping:'course.courseId'},
        {name:'course_name',type:'string',mapping:'course.courseName'},
        {name:'tableWeekth',type:'string',mapping:'tableWeekth'},
        {name:'tableDay',type:'string',mapping:'tableDay'},
        {name:'tableHours',type:'string',mapping:'tableHours'},
        {name:'department_id',type:'string',mapping:'department.departmentId'},
        {name:'department_name',type:'string',mapping:'department.departmentName'},
        {name:'remark',type:'string',mapping:'remark'}
    ]);

    courseTableStore=new Ext.data.Store({
        proxy:new Ext.data.HttpProxy({
            url:path+'courseTable/findAll',
            method:'post'
        }),
        reader:new Ext.data.JsonReader({
            root:'data',
            id:'id',
            totalProperty:'totalSize'
        },courseTable)
    });
    //加载时参数
    //courseTableStore.load({params:{start:0,pageSize:_pageSize}});

    //列选择模式
    var sm=new Ext.grid.CheckboxSelectionModel({dataIndex:'courseTable_id'});
    //列头
    var cm=new Ext.grid.ColumnModel([
        sm,
        {header:'编号',dataIndex:'courseTable_id',align:'center'},
        {header:'课程编号',dataIndex:'course_id',align:'center'},
        {header:'课程名称',dataIndex:'course_name',align:'center'},
        {header:'第几周',dataIndex:'tableWeekth',align:'center'},
        {header:'星期',dataIndex:'tableDay',align:'center'},
        {header:'时间',dataIndex:'tableHours',align:'center'},
        {header:'部门编号',dataIndex:'department_id',align:'center'},
        {header:'部门名称',dataIndex:'department_name',align:'center'},
        {header:'上课地点-教师',dataIndex:'remark',align:'center'}
    ]);
    var courseTableGrid=new Ext.grid.GridPanel({
        id:'courseTableGrid',
        store:courseTableStore,
        sm:sm,
        cm:cm,
        loadMask:true,
        autoScroll:true,
        trackMouseOver : true,
        disableSelection : false,
        border:false,
        viewConfig:{
            columnsText:'显示/隐藏列',
            sortAscText:'正序排列',
            sortDescText:'倒序排列',
            forceFit:true
        },
        bbar:new Ext.PagingToolbar({
            store:courseTableStore,
            pageSize:_pageSize,
            //显示有
            displayInfo:true,
            displayMsg:'当前记录 {0}至{1}条 共 {2} 条记录',
            emptyMsg:'暂时没有记录',
            prevText:'上一页',
            nextText:'下一页',
            lastText:'尾页',
            firstText:'首页',
            beforePageText:'当前页',
            afterPageText:'共{0}页'
        }),
        tbar:['->',{xtype:'tbspacer',width:105},'部门：',
            {
                xtype:'combo',
                name:'departmentId',
                id:'ctsdepartmentId',
                width:100,
                emptyText:'请输入部门',
                mode:'remote',
                triggerAction:'all',
                store:new Ext.data.JsonStore({
                    url:path+'department/findAll',
                    root:'data',
                    fields:['departmentId','departmentName']
                }),
                displayField:'departmentName',
                valueField:'departmentId'
            },'周：',
            {
                xtype:'combo',
                name:'tableWeekth',
                id:'tbstableWeekth',
                width:100,
                emptyText: '请输入第几周',
                mode:'local',
                triggerAction:'all',
                editable:false,
                store:new Ext.data.ArrayStore({
                    fields:['rp_typeId','rp_typeName'],
                    data:[['第一周','第一周'],['第二周','第二周'],['第三周','第三周'],['第四周','第四周'],['第五周','第五周'],
                        ['第六周','第六周'],['第七周','第七周'],['第八周','第八周'],['第九周','第九周'],
                        ['第十周','第十周'],['第十一周','第十一周'],['第十二周','第十二周'],['第十三周','第十三周']
                    ]
                }),
                valueField:'rp_typeId',
                displayField:'rp_typeName'
            },{
                text:'搜索',
                iconCls:'search',
                handler:function(){courseTableSearch();},
                scope:this
            },'-'
            ,{
                text:'添加',
                iconCls:'menu-add',
                handler:function(){courseTableAdd();},
                scope:this
             },'-',
            {
                text:'修改',
                iconCls:'btn-edit',
                handler:function(){
                    var selRow=Ext.getCmp("courseTableGrid").getSelectionModel();
                    if(!selRow.hasSelection())
                    {
                        Ext.Msg.alert("提示","请选择你要修改的记录!");
                    }
                    else if(selRow.getSelections().length>1)
                    {
                        Ext.Msg.alert("提示","一次只能修改一行记录,你选择了多行!");
                    }
                    else
                    {
                        record=selRow.getSelected();
                        courseTableEdit(record);
                    }

                },
                scope:this
            },'-',
            {
                text:'删除',
                iconCls:'menu-del',
                scope:this,
                handler:function(){
                    courseTableDelete();
                }
            },'-',
            {
                text:'生成签到二维码',
                iconCls:'btn-archives-finish',
                scope:this,
                handler:function(){
                    var selRow=Ext.getCmp("courseTableGrid").getSelectionModel();
                    if(!selRow.hasSelection())
                    {
                        Ext.Msg.alert("提示","请选择你要生成二维码的记录!");
                    }
                    else if(selRow.getSelections().length>1)
                    {
                        Ext.Msg.alert("提示","一次只能生成一行记录,你选择了多行!");
                    }
                    else
                    {
                        record=selRow.getSelected();
                        createQRBar(record);
                    }

                },
            },'-',
            {
                text:'刷新',
                iconCls:'btn-refresh',
                scope:this,
                handler:function(){courseTableStore.reload();}
            }
        ]
    });
    GridMain(node,courseTableGrid,node.attributes.iconCls);
    courseTableStore.load({params:{start:0,limit:_pageSize}});
}

function courseTableSearch()
{
    //分页数量
    let pageSize=15;
    let _departmentId=Ext.getCmp("ctsdepartmentId").getValue();
    let _tableWeekth=Ext.getCmp("tbstableWeekth").getValue();

    courseTableStore.proxy=new Ext.data.HttpProxy({
        url:path+'courseTable/findAll',
        method:'post'
    });
    courseTableStore.load({
        params:{start:0,limit:pageSize,departmentId:_departmentId,tableWeekth:_tableWeekth},
        callback:function(r,options,success)
        {
            if(!success){
                Ext.Msg.alert("提示","数据加载失败!")
            }else{
            }
        }
    });
}

function createQRBar(record) {
    Ext.Ajax.request({
        url:'getBarCodeImage',
        params:{couserTableId:record.get("courseTable_id"),
            courseId:record.get("course_id"),tableWeekth:record.get("tableWeekth"),
            tableDay:record.get("tableDay"),tableHours:record.get("tableHours"),
            departmentId:record.get("department_id")},
        method:'post',
        success:function(response)
        {
            console.log(response)
            var QrCodeWin=new Ext.Window({
                title:'签到二维码',
                modal:true,
                iconCls:'menu-public-fol',
                width:215,
                height:265,
                html:"<img src='getBarCodeImage?courseId="+record.get("course_id")+"&couserTableId="+
                    record.get("courseTable_id")+"&courseName="+record.get("course_name")+
                    "&tableDay="+record.get("tableDay")+"&tableHours="+record.get("tableHours")+"'/>",
                //items:[leaveAddForm],
                buttons:[{
                    text:'关闭',
                    iconCls:'btn-cancel',
                    handler:function(){
                        QrCodeWin.close();
                    }
                }]
            });
            QrCodeWin.show();
            // if(Ext.util.JSON.decode(response.responseText).code==200)
            // {
            //     leaveStore.reload();
            // }
            // else
            // {
            //     Ext.Msg.show({title:"提示",msg:Ext.util.JSON.decode(response.responseText).msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
            // }
        },
        failure:function(response)
        {
            Ext.Msg.show({title:"提示",msg:Ext.util.JSON.decode(response.responseText).msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
        }
    })
}
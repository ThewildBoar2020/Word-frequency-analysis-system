/**
 * @Title: courseTableAdd
 * @Package null
 * @Description 管理员信息添加
 * @author
 * @date 2022年2月2日
 * @version V1.0
 **/
// 复选框  
function courseTableAdd()
{
    var courseTableAddForm=new Ext.form.FormPanel({
        border:false,
        padding:'8 8 8 8',
        border:false,
        layout:'form',
        labelAlign:"right",
        labelWidth : 75,
        items:[{
            xtype:'fieldset',
            title:'课表信息',
            items:[{
                layout:'column',				//第一行
                border:false,
                items:[{
                    columnWidth:0.5,
                    layout:'form',
                    border:false,
                    items:[{
                        xtype:'combo',
                        name:'tableWeekth',
                        id:'tableWeekth',
                        hiddenName:'tableWeekth',
                        fieldLabel:'第几周',
                        allowBlank:false,
                        width:130,
                        emptyText: '请输入第几周',
                        blankText:'请输入第几周',
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
                    }]
                },{
                    columnWidth:0.5,
                    layout:'form',
                    border:false,
                    items:[{
                        xtype:'combo',
                        name:'tableDay',
                        id:'tableDay',
                        hiddenName:'tableDay',
                        fieldLabel:'星期',
                        allowBlank:false,
                        width:130,
                        emptyText: '请输入星期',
                        blankText:'请输入星期',
                        mode:'local',
                        triggerAction:'all',
                        editable:false,
                        store:new Ext.data.ArrayStore({
                            fields:['rp_typeId','rp_typeName'],
                            data:[['星期一','星期一'],['星期二','星期二'],['星期三','星期三'],['星期四','星期四'],['星期五','星期五']]
                        }),
                        valueField:'rp_typeId',
                        displayField:'rp_typeName'
                    }]
                }]
            },{
                //第二行
                layout:'column',
                border:false,
                items:[{
                    columnWidth:0.5,
                    layout:'form',
                    border:false,
                    items:[{
                        xtype:'combo',
                        name:'departmentId',
                        id:'ct_departmentId',
                        fieldLabel:'所属部门<font color=red>*</font>',
                        width:130,
                        editable:false,
                        allowBlank:false,
                        hiddenName:'departmentId',
                        blankText:'请输入部门',
                        emptyText: '请输入部门',
                        mode:'remote',
                        triggerAction:'all',
                        store:new Ext.data.JsonStore({
                            url:path+'department/findAll',
                            root:'data',
                            fields:['departmentId','departmentName']
                        }),
                        displayField:'departmentName',
                        valueField:'departmentId'
                    }]
                },{
                    columnWidth:0.5,
                    layout:'form',
                    border:false,
                    items:[{
                        xtype:'combo',
                        name:'courseId',
                        id:'courseId',
                        fieldLabel:'选择课程<font color=red>*</font>',
                        width:130,
                        editable:false,
                        allowBlank:false,
                        hiddenName:'courseId',
                        blankText:'请输入选择课程',
                        emptyText:'选择课程',
                        mode:'remote',
                        triggerAction:'all',
                        store:new Ext.data.JsonStore({
                            url:path+'course/findAll',
                            root:'data',
                            fields:['courseId','courseName']
                        }),
                        displayField:'courseName',
                        valueField:'courseId'
                    }]
                }]
            },{
                layout:'column',				//第三行
                border:false,
                items:[{
                    columnWidth:0.5,
                    layout:'form',
                    border:false,
                    items:[{
                        xtype:'combo',
                        name:'tableHours',
                        id:'tableHours',
                        hiddenName:'tableHours',
                        fieldLabel:'上课时间',
                        allowBlank:false,
                        width:130,
                        blankText:'上课时间',
                        emptyText:'上课时间',
                        mode:'local',
                        triggerAction:'all',
                        editable:false,
                        store:new Ext.data.ArrayStore({
                            fields:['rp_typeId','rp_typeName'],
                            data:[['8:00','8:00'],['10:00','10:00'],['14:00','14:00'],['16:00','16:00']]
                        }),
                        valueField:'rp_typeId',
                        displayField:'rp_typeName'
                    }]
                }]
            },{
                layout:'column',
                border:false,
                items:[{
                    columnWidth:1,
                    layout:'form',
                    border:false,
                    items:[{
                        xtype:'textarea',
                        name:'remark',
                        id:'remark',
                        width: 400,
                        fieldLabel:'地点(教师)<font color=red>*</font>',
                        allowBlank:false,
                        blankText:'请输入地点(教师)',
                        emptyText:'上课地点/教师'
                    }]
                }]
            }]
        }]
    });

    var courseTableAddWin=new Ext.Window({
        title:'课表添加',
        modal:true,
        iconCls:'menu-public-fol',
        width:600,
        height:265,
        items:[courseTableAddForm],
        buttons:[{
            text:'保存',
            iconCls:'btn-save',
            handler:function(){
                courseTableAddWinSubmit();
            }
        },{
            text:'取消',
            iconCls:'btn-cancel',
            handler:function(){
                courseTableAddWin.close();
            }
        }]
    });

    //提交表单
    function courseTableAddWinSubmit()
    {
        if(courseTableAddForm.form.isValid())
        {
            courseTableAddForm.form.submit({
                waitTitle:"请稍后...",
                waitMsg:"正在提交......",
                url:path+"courseTable/add",
                success:function(g,a)
                {
                    Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.INFO});
                    courseTableAddWin.close();
                    courseTableStore.reload();
                },
                failure:function(g,a)
                {
                    Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
                }
            });
        }
    }

    courseTableAddWin.show();
}
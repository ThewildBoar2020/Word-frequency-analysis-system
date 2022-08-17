/**
 * @Title: userInfoPositionLogAdd
 * @Package null
 * @Description 职务变更管理
 * @author
 * @date 2022年2月2日 23:05:49
 * @version V1.0
 */
var userinfoPositionLogAddWin;
function userinfoPositionLogAdd(record)
{
    var userinfoPositionLogAddForm=new Ext.form.FormPanel({
        border:false,
        padding:'8 8 8 8',
        border:false,
        layout:'form',
        labelAlign:"right",
        labelWidth : 75,
        items:[{
            xtype:'fieldset',
            title:'部门',
            items:[{
                layout:'column',				//第一行
                border:false,
                items:[{
                    columnWidth:0.5,
                    layout:'form',
                    border:false,
                    items:[{
                        xtype:'textfield',
                        name:'currentPositionName',
                        id:'currentPositionName',
                        width:200,
                        value:record.get("position_name"),
                        fieldLabel:'当前职务<font color=red>*</font>',
                        allowBlank:false,
                        blankText:'请输入当前职务'
                    }]
                },{
                    columnWidth:0.5,
                    layout:'form',
                    border:false,
                    items:[{
                        xtype:'textfield',
                        name:'changedPositionName',
                        id:'changedPositionName',
                        hidden: true,
                        hideLabel:true
                    },{
                        xtype:'combo',
                        name:'positionId',
                        fieldLabel:'职务名称<font color=red>*</font>',
                        width:130,
                        allowBlank:false,
                        hiddenName:'positionId',
                        blankText:'请输入职务',
                        mode:'remote',
                        triggerAction:'all',
                        store:new Ext.data.JsonStore({
                            url:path+'position/findAll',
                            root:'data',
                            fields:['positionId','positionName']
                        }),
                        displayField:'positionName',
                        valueField:'positionId',
                        listeners:{
                            afterRender:function(c){
                                c.setValue(record.get("position_id"));
                                c.setRawValue(record.get("position_name"));
                            },
                            change:function (c) {
                                Ext.getCmp("changedPositionName").setValue(c.getRawValue());
                            }
                        }
                    }]
                }]
            },{								//第二行
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
                        width: 200,
                        fieldLabel:'变更描述<font color=red>*</font>',
                        allowBlank:false,
                        blankText:'请输入变更描述'
                    }]
                }]
            }]
        }]
    });
    userinfoPositionLogAddWin=new Ext.Window({
        title:record.get("truename")+'->职务变更',
        modal:true,
        iconCls:'menu-public-fol',
        width:365,
        height:230,
        items:[userinfoPositionLogAddForm],
        buttons:[{
            text:'确认变更',
            iconCls:'btn-save',
            handler:function(){
                userinfoPositionLogAddWinSubmit(userinfoPositionLogAddForm,userinfoPositionLogAddWin);
            }
        },{
            text:'取消变更',
            iconCls:'btn-cancel',
            handler:function(){
                userinfoPositionLogAddWin.close();
            }
        }]
    });
    userinfoPositionLogAddWin.show();
}
function userinfoPositionLogAddWinSubmit(userinfoPositionLogAddForm,userinfoPositionLogAddWin)
{
    if(userinfoPositionLogAddForm.form.isValid())
    {
        userinfoPositionLogAddForm.form.submit({
            waitTitle:"请稍后...",
            waitMsg:"正在提交......",
            url:path+"userinfoPositionLog/add",
            success:function(g,a)
            {
                Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.INFO});
                userinfoPositionLogAddWin.close();
                userinfoPositionLogStore.reload();
            },
            failure:function(g,a)
            {
                Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
            }
        });
    }
}
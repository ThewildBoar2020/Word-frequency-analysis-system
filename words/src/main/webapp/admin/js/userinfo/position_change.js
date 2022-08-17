/**
 * @Title: position_change
 * @Package null
 * @Description 职务变更
 * @author
 * @date 2020-01-28 11:18:29
 * @version V1.0
 **/
function positionChangWin(record)
{
    var positionChangeForm=new Ext.form.FormPanel({
        border:false,
        padding:'8 8 8 8',
        border:false,
        layout:'form',
        labelAlign:"right",
        labelWidth : 75,
        items:[{
            xtype:'fieldset',
            title:record.get("truename")+'->职务调整',
            items:[{
                //第二行
                layout:'column',
                border:false,
                items:[{
                    xtype:'textfield',
                    name:'userinfoId',
                    id:'userinfoId',
                    hidden: true,
                    hideLabel:true,
                    value:record.get("userinfo_id")
                },{
                    columnWidth:0.5,
                    layout:'form',
                    border:false,
                    items:[{
                        xtype:'textfield',
                        name:'currentPosition',
                        id:'currentPosition',
                        fieldLabel:'当前职务',
                        allowBlank:false,
                        blankText:'请输入当前职务',
                        value:record.get("position_name")
                    }]
                },{
                    columnWidth:0.5,
                    layout:'form',
                    border:false,
                    items:[{
                        xtype:'combo',
                        name:'changePosition',
                        id:'changePosition',
                        fieldLabel:'变更职务<font color=red>*</font>',
                        width:130,
                        allowBlank:false,
                        hiddenName:'changePosition',
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
                                //c.setValue(record.get("position_id"));
                                //c.setRawValue(record.get("position_name"));
                            }
                        }
                    }]
                }]
            }]
        }]
    });

    var positionChangeWin=new Ext.Window({
        title:'员工职务变动',
        modal:true,
        iconCls:'menu-public-fol',
        width:560,
        height:160,
        items:[positionChangeForm],
        buttons:[{
            text:'保存',
            iconCls:'btn-save',
            handler:function(){
                positionChangeWinSubmit();
            }
        },{
            text:'取消',
            iconCls:'btn-cancel',
            handler:function(){
                positionChangeWin.close();
            }
        }]
    });

    //提交表单
    function positionChangeWinSubmit()
    {
        if(positionChangeForm.form.isValid())
        {
            positionChangeForm.form.submit({
                waitTitle:"请稍后...",
                waitMsg:"正在提交......",
                url:path+"userinfoPositionLog/add",
                success:function(g,a)
                {
                    Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.INFO});
                    positionChangeWin.close();
                    userinfoStore.reload();
                },
                failure:function(g,a)
                {
                    Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
                }
            });
        }
    }

    positionChangeWin.show();
}
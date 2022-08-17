/**
 * @Title: positionEdit
 * @Package null
 * @Description 部门添加
 * @author
 * @date 2022年2月2日 23:05:49
 * @version V1.0
 */
var positionEditWin;
function positionEdit(record)
{
    var positionEditForm=new Ext.form.FormPanel({
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
                    xtype:'textfield',
                    name:'positionId',
                    id:'positionId',
                    value:record.get("position_id"),
                    hidden: true,
                    hideLabel:true
                },{
                    columnWidth:1,
                    layout:'form',
                    border:false,
                    items:[{
                        xtype:'textfield',
                        name:'positionName',
                        id:'positionName',
                        width:200,
                        value:record.get("position_name"),
                        fieldLabel:'部门名称<font color=red>*</font>',
                        allowBlank:false,
                        blankText:'请输入部门名称'
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
                        xtype:'textfield',
                        name:'positionNo',
                        id:'positionNo',
                        width:200,
                        value:record.get("position_no"),
                        fieldLabel:'职务编号<font color=red>*</font>',
                        allowBlank:false,
                        emptyText: '请输入职务编号',
                        blankText:'请输入职务编号'
                    }]
                }]
            },{								//第3行
                layout:'column',
                border:false,
                items:[{
                    columnWidth:1,
                    layout:'form',
                    border:false,
                    items:[{
                        xtype:'textarea',
                        name:'qualification',
                        id:'qualification',
                        width: 200,
                        value:record.get("qualification"),
                        fieldLabel:'职务描述<font color=red>*</font>',
                        allowBlank:false,
                        blankText:'请输入职务描述'
                    }]
                }]
            }]
        }]
    });
    var positionEditWin=new Ext.Window({
        title:'职务修改',
        modal:true,
        iconCls:'menu-public-fol',
        width:365,
        height:230,
        items:[positionEditForm],
        buttons:[{
            text:'保存',
            iconCls:'btn-save',
            handler:function(){
                positionEditWinSubmit(positionEditForm,positionEditWin);
            }
        },{
            text:'取消',
            iconCls:'btn-cancel',
            handler:function(){
                positionEditWin.close();
            }
        }]
    });
    positionEditWin.show();

}
function positionEditWinSubmit(positionEditForm,positionEditWin)
{
    if(positionEditForm.form.isValid())
    {
        positionEditForm.form.submit({
            waitTitle:"请稍后...",
            waitMsg:"正在提交......",
            url:path+"position/edit",
            success:function(g,a)
            {
                Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.INFO});
                positionEditWin.close();
                positionStore.reload();
            },
            failure:function(g,a)
            {
                Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
            }
        });
    }
}
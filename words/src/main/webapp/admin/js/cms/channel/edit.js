/**
 * @Title: channelEdit
 * @Package null
 * @Description 部门添加
 * @author
 * @date 2022年2月2日 23:05:49
 * @version V1.0
 */
var channelEditWin;
function channelEdit(record)
{
    var channelEditForm=new Ext.form.FormPanel({
        border:false,
        padding:'8 8 8 8',
        border:false,
        layout:'form',
        labelAlign:"right",
        labelWidth : 75,
        items:[{
            xtype:'fieldset',
            title:'栏目',
            items:[{
                layout:'column',				//第一行
                border:false,
                items:[{
                    xtype:'textfield',
                    name:'channelId',
                    id:'channelId',
                    value:record.get("channel_id"),
                    hidden: true,
                    hideLabel:true
                },{
                    columnWidth:1,
                    layout:'form',
                    border:false,
                    items:[{
                        xtype:'textfield',
                        name:'title',
                        id:'channel_name',
                        width:200,
                        fieldLabel:'栏目名称<font color=red>*</font>',
                        allowBlank:false,
                        blankText:'请输入栏目名称',
                        value:record.get("channel_name")
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
                        name:'description',
                        id:'channelDesc',
                        width: 200,
                        value:record.get('channel_desc'),
                        fieldLabel:'描述<font color=red>*</font>',
                        allowBlank:false,
                        blankText:'请输入描述'
                    }]
                }]
            }]
        }]
    });
    var channelEditWin=new Ext.Window({
        title:'栏目修改',
        modal:true,
        iconCls:'menu-public-fol',
        width:365,
        height:230,
        items:[channelEditForm],
        buttons:[{
            text:'保存',
            iconCls:'btn-save',
            handler:function(){
                channelEditWinSubmit(channelEditForm,channelEditWin);
            }
        },{
            text:'取消',
            iconCls:'btn-cancel',
            handler:function(){
                channelEditWin.close();
            }
        }]
    });
    channelEditWin.show();

}
function channelEditWinSubmit(channelEditForm,channelEditWin)
{
    if(channelEditForm.form.isValid())
    {
        channelEditForm.form.submit({
            waitTitle:"请稍后...",
            waitMsg:"正在提交......",
            url:path+"channel/edit",
            success:function(g,a)
            {
                Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.INFO});
                channelEditWin.close();
                channelStore.reload();
            },
            failure:function(g,a)
            {
                Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
            }
        });
    }
}
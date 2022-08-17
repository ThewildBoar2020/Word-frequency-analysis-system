/**
 * @Title: channelAdd
 * @Package null
 * @Description 栏目添加
 * @author
 * @date 2022年2月2日 23:05:49
 * @version V1.0
 */
var channelAddWin;
function channelAdd(node)
{
    var channelAddForm=new Ext.form.FormPanel({
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
                    columnWidth:1,
                    layout:'form',
                    border:false,
                    items:[{
                        xtype:'textfield',
                        name:'title',
                        id:'channelName',
                        width:200,
                        fieldLabel:'名称<font color=red>*</font>',
                        allowBlank:false,
                        blankText:'请输入名称'
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
                        fieldLabel:'描述<font color=red>*</font>',
                        allowBlank:false,
                        blankText:'请输入描述'
                    }]
                }]
            }]
        }]
    });
    var channelAddWin=new Ext.Window({
        title:'栏目添加',
        modal:true,
        iconCls:'menu-public-fol',
        width:365,
        height:230,
        items:[channelAddForm],
        buttons:[{
            text:'保存',
            iconCls:'btn-save',
            handler:function(){
                channelAddWinSubmit(channelAddForm,channelAddWin);
            }
        },{
            text:'取消',
            iconCls:'btn-cancel',
            handler:function(){
                channelAddWin.close();
            }
        }]
    });
    channelAddWin.show();
}
function channelAddWinSubmit(channelAddForm,channelAddWin)
{
    if(channelAddForm.form.isValid())
    {
        channelAddForm.form.submit({
            waitTitle:"请稍后...",
            waitMsg:"正在提交......",
            url:path+"channel/add",
            success:function(g,a)
            {
                Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.INFO});
                channelAddWin.close();
                channelStore.reload();
            },
            failure:function(g,a)
            {
                Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
            }
        });
    }
}
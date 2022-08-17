/**
 * @Title: positionAdd
 * @Package null
 * @Description 部门添加
 * @author
 * @date 2022年2月2日 23:05:49
 * @version V1.0
 */
var positionAddWin;
function positionAdd(node)
{
    var positionAddForm=new Ext.form.FormPanel({
        border:false,
        padding:'8 8 8 8',
        border:false,
        layout:'form',
        labelAlign:"right",
        labelWidth : 75,
        items:[{
            xtype:'fieldset',
            title:'职务',
            items:[{
                layout:'column',				//第一行
                border:false,
                items:[{
                    columnWidth:1,
                    layout:'form',
                    border:false,
                    items:[{
                        xtype:'textfield',
                        name:'positionName',
                        id:'positionName',
                        width:200,
                        fieldLabel:'职务名称<font color=red>*</font>',
                        allowBlank:false,
                        emptyText:'请输入职务名称',
                        blankText:'请输入职务名称'
                    }]
                }]
            },{                             //第2行
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
                        fieldLabel:'职务描述<font color=red>*</font>',
                        allowBlank:false,
                        blankText:'请输入职务描述'
                    }]
                }]
            }]
        }]
    });
    var positionAddWin=new Ext.Window({
        title:'职务添加',
        modal:true,
        iconCls:'menu-public-fol',
        width:365,
        height:240,
        items:[positionAddForm],
        buttons:[{
            text:'保存',
            iconCls:'btn-save',
            handler:function(){
                positionAddWinSubmit(positionAddForm,positionAddWin);
            }
        },{
            text:'取消',
            iconCls:'btn-cancel',
            handler:function(){
                positionAddWin.close();
            }
        }]
    });
    positionAddWin.show();
}
function positionAddWinSubmit(positionAddForm,positionAddWin)
{
    if(positionAddForm.form.isValid())
    {
        positionAddForm.form.submit({
            waitTitle:"请稍后...",
            waitMsg:"正在提交......",
            url:path+"position/add",
            success:function(g,a)
            {
                console.info(g);
                console.info(a);
                Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.INFO});
                positionAddWin.close();
                positionStore.reload();
            },
            failure:function(g,a)
            {
                Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
            }
        });
    }
}
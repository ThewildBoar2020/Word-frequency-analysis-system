/**
 * @Title: departmentAdd
 * @Package null
 * @Description 部门添加
 * @author
 * @date 2022年2月2日 23:05:49
 * @version V1.0
 */
var departmentAddWin;
function departmentAdd(node)
{
    var departmentAddForm=new Ext.form.FormPanel({
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
                    columnWidth:1,
                    layout:'form',
                    border:false,
                    items:[{
                        xtype:'textfield',
                        name:'departmentName',
                        id:'departmentName',
                        width:200,
                        fieldLabel:'部门名称<font color=red>*</font>',
                        allowBlank:false,
                        blankText:'请输入部门名称'
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
                        name:'departmentDesc',
                        id:'departmentDesc',
                        width: 200,
                        fieldLabel:'部门描述<font color=red>*</font>',
                        allowBlank:false,
                        blankText:'请输入部门描述'
                    }]
                }]
            }]
        }]
    });
    var departmentAddWin=new Ext.Window({
        title:'部门添加',
        modal:true,
        iconCls:'menu-public-fol',
        width:365,
        height:230,
        items:[departmentAddForm],
        buttons:[{
            text:'保存',
            iconCls:'btn-save',
            handler:function(){
                departmentAddWinSubmit(departmentAddForm,departmentAddWin);
            }
        },{
            text:'取消',
            iconCls:'btn-cancel',
            handler:function(){
                departmentAddWin.close();
            }
        }]
    });
    departmentAddWin.show();
}
function departmentAddWinSubmit(departmentAddForm,departmentAddWin)
{
    if(departmentAddForm.form.isValid())
    {
        departmentAddForm.form.submit({
            waitTitle:"请稍后...",
            waitMsg:"正在提交......",
            url:path+"department/add",
            success:function(g,a)
            {
                console.info(g);
                console.info(a);
                Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.INFO});
                departmentAddWin.close();
                departmentStore.reload();
            },
            failure:function(g,a)
            {
                Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
            }
        });
    }
}
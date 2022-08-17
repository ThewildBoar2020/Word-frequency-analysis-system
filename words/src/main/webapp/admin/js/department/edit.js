/**
 * @Title: departmentEdit
 * @Package null
 * @Description 部门添加
 * @author
 * @date 2022年2月2日 23:05:49
 * @version V1.0
 */
var departmentEditWin;
function departmentEdit(record)
{
    var departmentEditForm=new Ext.form.FormPanel({
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
                    name:'departmentId',
                    id:'departmentId',
                    value:record.get("department_id"),
                    hidden: true,
                    hideLabel:true
                },{
                    columnWidth:1,
                    layout:'form',
                    border:false,
                    items:[{
                        xtype:'textfield',
                        name:'departmentName',
                        id:'departmentName',
                        width:200,
                        value:'',
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
                        value:'',
                        fieldLabel:'部门描述<font color=red>*</font>',
                        allowBlank:false,
                        blankText:'请输入部门描述'
                    }]
                }]
            }]
        }]
    });
    var departmentEditWin=new Ext.Window({
        title:'部门修改',
        modal:true,
        iconCls:'menu-public-fol',
        width:365,
        height:230,
        items:[departmentEditForm],
        buttons:[{
            text:'保存',
            iconCls:'btn-save',
            handler:function(){
                departmentEditWinSubmit(departmentEditForm,departmentEditWin);
            }
        },{
            text:'取消',
            iconCls:'btn-cancel',
            handler:function(){
                departmentEditWin.close();
            }
        }]
    });
    departmentEditWin.show();
    //设置数据
    Ext.Ajax.request({
        url:'department/findById',
        params:{departmentId:record.get("department_id")},
        method:'post',
        async: false,
        success:function(response)
        {
            if(Ext.util.JSON.decode(response.responseText).code==200)
            {
                Ext.getCmp("departmentName").setValue(Ext.util.JSON.decode(response.responseText).data.departmentName);
                Ext.getCmp("departmentDesc").setValue(Ext.util.JSON.decode(response.responseText).data.departmentDesc);
            }
            else
            {
                Ext.Msg.show({title:"提示",msg:Ext.util.JSON.decode(response.responseText).msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
            }
        },
        failure:function(response)
        {
            console.info(Ext.util.JSON.decode(response.responseText).msg);
            Ext.Msg.show({title:"提示",msg:Ext.util.JSON.decode(response.responseText).msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
        }
    });
}
function departmentEditWinSubmit(departmentEditForm,departmentEditWin)
{
    if(departmentEditForm.form.isValid())
    {
        departmentEditForm.form.submit({
            waitTitle:"请稍后...",
            waitMsg:"正在提交......",
            url:path+"department/edit",
            success:function(g,a)
            {
                Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.INFO});
                departmentEditWin.close();
                departmentStore.reload();
            },
            failure:function(g,a)
            {
                Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
            }
        });
    }
}
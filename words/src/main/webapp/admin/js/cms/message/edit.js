/**
 * @Title: messageEdit
 * @Package null
 * @Description 部门添加
 * @author
 * @date 2022年2月2日 23:05:49
 * @version V1.0
 */
var messageEditWin;
function messageEdit(record)
{
    var messageEditForm=new Ext.form.FormPanel({
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
                    name:'messageId',
                    id:'messageId',
                    value:record.get("message_id"),
                    hidden: true,
                    hideLabel:true
                },{
                    columnWidth:1,
                    layout:'form',
                    border:false,
                    items:[{
                        xtype:'textfield',
                        name:'message_userinfo_name',
                        id:'message_userinfo_name',
                        width:400,
                        value:record.get('message_userinfo_name'),
                        fieldLabel:'用户<font color=red>*</font>',
                        allowBlank:false,
                        blankText:'请输入用户'
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
                        name:'message_content',
                        width: 400,
                        value:record.get('message_content'),
                        fieldLabel:'内容<font color=red>*</font>',
                        allowBlank:false,
                        blankText:'请输入内容'
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
                        xtype:'datefield',
                        name:'create_time',
                        width: 400,
                        value:record.get('create_time'),
                        fieldLabel:'时间<font color=red>*</font>',
                        allowBlank:false,
                        format:'Y-m-d',
                        blankText:'请输入时间'
                    }]
                }]
            },{
                xtype:'combo',
                name:'isChecked',
                id:'isChecked',
                fieldLabel:'审核<font color=red>*</font>',
                width:400,
                allowBlank:false,
                hiddenName:'isChecked',
                blankText:'审核状态',
                emptyText:"请选择审核状态",
                mode:'local',
                triggerAction:'all',
                store:new Ext.data.ArrayStore({
                    fields:['progressId','progressName'],
                    data:[[1,'审核中'],[2,'通过']]
                }),
                valueField:'progressId',
                displayField:'progressName',
                listeners:{
                    afterRender:function(c){
                        c.setValue(record.get("is_checked"));
                        c.setRawValue(record.get("is_checked")==1?'审核中':'已审核');
                    }
                }
            }]
        }]
    });
    var messageEditWin=new Ext.Window({
        title:'审核',
        modal:true,
        iconCls:'menu-public-fol',
        width:555,
        height:280,
        items:[messageEditForm],
        buttons:[{
            text:'保存',
            iconCls:'btn-save',
            handler:function(){
                messageEditWinSubmit(messageEditForm,messageEditWin);
            }
        },{
            text:'取消',
            iconCls:'btn-cancel',
            handler:function(){
                messageEditWin.close();
            }
        }]
    });
    messageEditWin.show();
}
function messageEditWinSubmit(messageEditForm,messageEditWin)
{
    if(messageEditForm.form.isValid())
    {
        messageEditForm.form.submit({
            waitTitle:"请稍后...",
            waitMsg:"正在提交......",
            url:path+"message/editCheck",
            success:function(g,a)
            {
                Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.INFO});
                messageEditWin.close();
                messageStore.reload();
            },
            failure:function(g,a)
            {
                Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
            }
        });
    }
}
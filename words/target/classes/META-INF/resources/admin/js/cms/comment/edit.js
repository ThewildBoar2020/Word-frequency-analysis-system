/**
 * @Title: commentEdit
 * @Package null
 * @Description 部门添加
 * @author
 * @date 2022年2月2日 23:05:49
 * @version V1.0
 */
var commentEditWin;
function commentEdit(record)
{
    var commentEditForm=new Ext.form.FormPanel({
        border:false,
        padding:'8 8 8 8',
        border:false,
        layout:'form',
        labelAlign:"right",
        labelWidth : 75,
        items:[{
            xtype:'fieldset',
            title:'评论',
            items:[{
                layout:'column',				//第一行
                border:false,
                items:[{
                    xtype:'textfield',
                    name:'commentId',
                    id:'commentId',
                    value:record.get("comment_id"),
                    hidden: true,
                    hideLabel:true
                },{
                    columnWidth:1,
                    layout:'form',
                    border:false,
                    items:[{
                        xtype:'textfield',
                        name:'userinfoId',
                        id:'comment_userinfo_id',
                        width:200,
                        value:record.get('comment_userinfo_name'),
                        fieldLabel:'评论人<font color=red>*</font>',
                        allowBlank:false,
                        blankText:'请输入评论人'
                    }]
                }]
            },{
                layout:'column',				//第一行
                border:false,
                items:[{
                    columnWidth:1,
                    layout:'form',
                    border:false,
                    items:[{
                        xtype:'datefield',
                        name:'create_time',
                        id:'common_create_time',
                        width:200,
                        fieldLabel:'评论时间<font color=red>*</font>',
                        allowBlank:false,
                        blankText:'请输入评论时间',
                        value:record.get('create_time'),
                        format:'Y-m-d'
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
                        name:'commentContent',
                        id:'commentContent',
                        width: 200,
                        value:record.get('comment_content'),
                        fieldLabel:'内容<font color=red>*</font>',
                        allowBlank:false,
                        blankText:'请输入内容'
                    }]
                }]
            }]
        }]
    });
    var commentEditWin=new Ext.Window({
        title:'评论详情',
        modal:true,
        iconCls:'menu-public-fol',
        width:365,
        height:230,
        items:[commentEditForm],
        buttons:[{
            text:'保存',
            iconCls:'btn-save',
            handler:function(){
                commentEditWinSubmit(commentEditForm,commentEditWin);
            }
        },{
            text:'取消',
            iconCls:'btn-cancel',
            handler:function(){
                commentEditWin.close();
            }
        }]
    });
    commentEditWin.show();
}
function commentEditWinSubmit(commentEditForm,commentEditWin)
{
    if(commentEditForm.form.isValid())
    {
        commentEditForm.form.submit({
            waitTitle:"请稍后...",
            waitMsg:"正在提交......",
            url:path+"comment/edit",
            success:function(g,a)
            {
                Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.INFO});
                commentEditWin.close();
                commentStore.reload();
            },
            failure:function(g,a)
            {
                Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
            }
        });
    }
}
/**
 * @Title: commentAdd
 * @Package null
 * @Description 栏目添加
 * @author
 * @date 2022年2月2日 23:05:49
 * @version V1.0
 */
var commentAddWin;
function commentAdd(node)
{
    var commentAddForm=new Ext.form.FormPanel({
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
                        name:'userinfoId',
                        id:'comment_userinfo_id',
                        width:200,
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
                        value:new Date(),
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
                        fieldLabel:'内容<font color=red>*</font>',
                        allowBlank:false,
                        blankText:'请输入内容'
                    }]
                }]
            }]
        }]
    });
    var commentAddWin=new Ext.Window({
        title:'栏目添加',
        modal:true,
        iconCls:'menu-public-fol',
        width:465,
        height:260,
        items:[commentAddForm],
        buttons:[{
            text:'保存',
            iconCls:'btn-save',
            handler:function(){
                commentAddWinSubmit(commentAddForm,commentAddWin);
            }
        },{
            text:'取消',
            iconCls:'btn-cancel',
            handler:function(){
                commentAddWin.close();
            }
        }]
    });
    commentAddWin.show();
}
function commentAddWinSubmit(commentAddForm,commentAddWin)
{
    if(commentAddForm.form.isValid())
    {
        commentAddForm.form.submit({
            waitTitle:"请稍后...",
            waitMsg:"正在提交......",
            url:path+"comment/add",
            success:function(g,a)
            {
                Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.INFO});
                commentAddWin.close();
                commentStore.reload();
            },
            failure:function(g,a)
            {
                Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
            }
        });
    }
}
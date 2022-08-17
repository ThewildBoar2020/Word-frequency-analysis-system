/**
 * @Title: articleEdit
 * @Package null
 * @Description 文章编辑
 * @author
 * @date 2022年2月2日 23:05:49
 * @version V1.0
 */
var articleEditWin;
function articleEdit(record)
{
    var article_id=record.get("article_id");
    var articleEditWin=new Ext.Window({
        title:'文章修改',
        modal:true,
        id:'articleEditWin',
        iconCls:'menu-public-fol',
        width:1100,
        height:680,
        items:[{
            xtype:"panel",
            id:"index",
            iconCls:"menu-news",
            html:"<iframe src='"+path+"jsp/cms/article_edit.jsp?articleId="+article_id+"' scrolling='yes' frameborder=0 width=98% height=98%></iframe>"
        }],
        buttons:[{
            text:'取消',
            iconCls:'btn-cancel',
            handler:function(){
                articleEditWin.close();
            }
        }]
    });
    articleEditWin.show();
}
function articleEditWinSubmit(articleEditForm,articleEditWin)
{
    if(articleEditForm.form.isValid())
    {
        articleEditForm.form.submit({
            waitTitle:"请稍后...",
            waitMsg:"正在提交......",
            url:path+"article/edit",
            success:function(g,a)
            {
                Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.INFO});
                articleEditWin.close();
                articleStore.reload();
            },
            failure:function(g,a)
            {
                Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
            }
        });
    }
}
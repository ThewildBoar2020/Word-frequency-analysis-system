/**
 * @Title: articleAnalisys
 * @Package null
 * @Description 文章编辑
 * @author
 * @date 2022年2月2日 23:05:49
 * @version V1.0
 */
var articleAnalisysWin;
function articleAnalisys(record)
{
    var article_id=record.get("article_id");
    var articleAnalisysWin=new Ext.Window({
        title:'文章分析',
        modal:true,
        id:'articleAnalisysWin',
        iconCls:'menu-public-fol',
        width:1200,
        height:800,
        items:[{
            xtype:"panel",
            id:"index",
            iconCls:"menu-news",
            html:"<iframe src='"+path+"jsp/cms/analisys.jsp?articleId="+article_id+"' scrolling='auto' frameborder=0 width=100% height=98% style='overflow-x:hidden; overflow-y:auto;'></iframe>"
        }],
        buttons:[{
            text:'取消',
            iconCls:'btn-cancel',
            handler:function(){
                articleAnalisysWin.close();
            }
        }]
    });
    articleAnalisysWin.show();
}
function articleAnalisysWinSubmit(articleAnalisysForm,articleAnalisysWin)
{
    if(articleAnalisysForm.form.isValid())
    {
        articleAnalisysForm.form.submit({
            waitTitle:"请稍后...",
            waitMsg:"正在提交......",
            url:path+"article/edit",
            success:function(g,a)
            {
                Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.INFO});
                articleAnalisysWin.close();
                articleStore.reload();
            },
            failure:function(g,a)
            {
                Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
            }
        });
    }
}


function articleAllAnalisys(){
    var allArticleAnalisysWin=new Ext.Window({
        title:'文章分析',
        modal:true,
        id:'articleAnalisysWin',
        iconCls:'menu-public-fol',
        width:1200,
        height:800,
        items:[{
            xtype:"panel",
            id:"index",
            iconCls:"menu-news",
            html:"<iframe src='"+path+"jsp/cms/all_analisys.jsp' scrolling='auto' frameborder=0 width=100% height=98% style='overflow-x:hidden; overflow-y:auto;'></iframe>"
        }],
        buttons:[{
            text:'取消',
            iconCls:'btn-cancel',
            handler:function(){
                allArticleAnalisysWin.close();
            }
        }]
    });
    allArticleAnalisysWin.show();
}
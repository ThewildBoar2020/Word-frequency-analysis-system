/**
 * @Title: contentAdd
 * @Package null
 * @Description 内容添加
 * @author
 * @date 2022年2月2日 23:05:49
 * @version V1.0
 */
var contentAddWin;
function contentAdd(node)
{
    var contentAddWin=new Ext.Window({
        title:'添加',
        modal:true,
        id:'contentAddWin',
        iconCls:'menu-public-fol',
        width:1100,
        height:780,
        autoScroll:true,
        items:[{
            xtype:"panel",
            id:"index",
            iconCls:"menu-news",
            html:"<iframe src='"+path+"jsp/cms/content_add.jsp'scrolling='yes' frameborder=0 width=98% height=98%></iframe>"
        }],
        buttons:[{
            text:'取消',
            iconCls:'btn-cancel',
            handler:function(){
                contentAddWin.close();
            }
        }]
    });
    contentAddWin.show();
}
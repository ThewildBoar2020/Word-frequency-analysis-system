/**
 * @Title: contentEdit
 * @Package null
 * @Description 内容修改
 * @author
 * @date 2022年2月2日 23:05:49
 * @version V1.0
 */
var contentEditWin;
function contentEdit(record)
{
    var content_id=record.get("content_id");
    var contentEditWin=new Ext.Window({
        title:'修改',
        modal:true,
        id:'contentEditWin',
        iconCls:'menu-public-fol',
        width:1100,
        height:780,
        items:[{
            xtype:"panel",
            iconCls:"menu-news",
            html:"<iframe src='"+path+"jsp/cms/content_edit.jsp?contentId="+content_id+"' scrolling='yes' frameborder=0 width=98% height=98%></iframe>"
        }],
        buttons:[{
            text:'取消',
            iconCls:'btn-cancel',
            handler:function(){
                contentEditWin.close();
            }
        }]
    });
    contentEditWin.show();
}
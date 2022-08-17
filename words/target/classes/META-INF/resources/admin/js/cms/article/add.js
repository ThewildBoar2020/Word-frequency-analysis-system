/**
 * @Title: articleAdd
 * @Package null
 * @Description 栏目添加
 * @author
 * @date 2022年2月2日 23:05:49
 * @version V1.0
 */
var articleAddWin;
function articleAdd(node)
{
    var articleAddForm=new Ext.form.FormPanel({
        border:false,
        padding:'8 8 8 8',
        border:false,
        layout:'form',
        labelAlign:"right",
        labelWidth : 75,
        items:[{
            xtype:'fieldset',
            title:'文章',
            items:[{
                layout:'column',				//第一行
                border:false,
                items:[{
                    columnWidth:1,
                    layout:'form',
                    border:false,
                    items:[{
                        xtype:'textfield',
                        name:'title',
                        id:'articleName',
                        width: 850,
                        fieldLabel:'标题<font color=red>*</font>',
                        allowBlank:false,
                        blankText:'请输入标题'
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
                        xtype:'textfield',
                        name:'author',
                        id:'author',
                        width: 850,
                        fieldLabel:'作者<font color=red>*</font>',
                        allowBlank:false,
                        emptyText: '请输入作者',
                        blankText:'请输入作者'
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
                        xtype:'combo',
                        name:'channel_ids',
                        id:'channel_ids',
                        hiddenName:'channel_ids',
                        fieldLabel:'栏目<font color=red>*</font>',
                        allowBlank:false,
                        width: 850,
                        editable:false,
                        emptyText:'请选择栏目',
                        blankText:'请选择栏目',
                        mode:'remote',
                        triggerAction:'all',
                        store:new Ext.data.JsonStore({
                            url:path+'channel/findAll',
                            root:'data',
                            fields:['channelId','title']
                        }),
                        displayField:'title',
                        valueField:'channelId'
                    }]
                }]
            },{
                xtype:'datefield',
                name:'createDatetime',
                id:'createDatetime',
                fieldLabel:'时间<font color=red>*</font>',
                allowBlank:false,
                width: 850,
                emptyText:'请输入时间',
                format:'Y-m-d',
                value:new Date()
            },{								//第3行
                layout:'column',
                border:false,
                items:[{
                    columnWidth:1,
                    layout:'form',
                    border:false,
                    items:[{
                        xtype:'extfckeditor',
                        name:'description',
                        id:'description',
                        fieldLabel:'内容<font color=red>*</font>',
                        //allowBlank:false,
                        fckConfig : {
                            width : 850,
                            height : 430,
                            toolbarSet : 'Default',
                            basePath : '/admin/fckeditor/'
                        }
                    }]
                }]
            }]
        }]
    });
    articleAddWin=new Ext.Window({
        title:'文章添加',
        //modal:true,
        id:'articleAddWin',
        iconCls:'menu-public-fol',
        width:1100,
        height:680,
        autoScroll:true,
        items:[{
            xtype:"panel",
            id:"index",
            iconCls:"menu-news",
            html:"<iframe src='"+path+"jsp/cms/article_add.jsp'scrolling='yes' frameborder=0 width=98% height=98%></iframe>"
        }]
    });



    articleAddWin.show();


}
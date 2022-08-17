/**
 * @Title: comment
 * @Package null
 * @Description comment管理
 * @author
 * @date 2022年2月2日 20:20:30
 * @version V1.0
 */
var commentStore;
function commentList(node)
{
    //分页数量
    var _pageSize=15;
    //Record定义记录结果
    var comment=Ext.data.Record.create([
        {name:'comment_id',type:'string',mapping:'commentId'},
        {name:'comment_userinfo_id',type:'string',mapping:'userInfo.userinfoId'},
        {name:'comment_userinfo_name',type:'string',mapping:'userInfo.truename'},
        {name:'comment_content',type:'string',mapping:'commentContent'},
        {name:'create_time',type:'string',mapping:'createTime'}
    ]);

    commentStore=new Ext.data.Store({
        proxy:new Ext.data.HttpProxy({
            url:path+'comment/findAll',
            method:'post'
        }),
        reader:new Ext.data.JsonReader({
            root:'data',
            id:'id',
            totalProperty:'totalSize'
        },comment)
    });
    //加载时参数
    //commentStore.load({params:{start:0,pageSize:_pageSize}});

    //列选择模式
    var sm=new Ext.grid.CheckboxSelectionModel({dataIndex:'comment_id'});
    //列头
    var cm=new Ext.grid.ColumnModel([
        sm,
        {header:'编号',dataIndex:'comment_id',align:'center'},
        {header:'名称',dataIndex:'comment_userinfo_id',align:'center',hidden:true},
        {header:'用户',dataIndex:'comment_userinfo_name',align:'center'},
        {header:'内容',dataIndex:'comment_content',align:'center'},
        {header:'时间',dataIndex:'create_time',align:'center'}
    ]);
    var commentGrid=new Ext.grid.GridPanel({
        id:'commentGrid',
        store:commentStore,
        sm:sm,
        cm:cm,
        loadMask:true,
        autoScroll:true,
        trackMouseOver : true,
        disableSelection : false,
        border:false,
        viewConfig:{
            columnsText:'显示/隐藏列',
            sortAscText:'正序排列',
            sortDescText:'倒序排列',
            forceFit:true
        },
        bbar:new Ext.PagingToolbar({
            store:commentStore,
            pageSize:_pageSize,
            //显示有
            displayInfo:true,
            displayMsg:'当前记录 {0}至{1}条 共 {2} 条记录',
            emptyMsg:'暂时没有记录',
            prevText:'上一页',
            nextText:'下一页',
            lastText:'尾页',
            firstText:'首页',
            beforePageText:'当前页',
            afterPageText:'共{0}页'
        }),
        tbar:['->',
            {
                text:'详情',
                iconCls:'menu-list',
                handler:function(){
                    var selRow=Ext.getCmp("commentGrid").getSelectionModel();
                    if(!selRow.hasSelection())
                    {
                        Ext.Msg.alert("提示","请选择你要查看的记录!");
                    }
                    else if(selRow.getSelections().length>1)
                    {
                        Ext.Msg.alert("提示","一次只能查看一行记录,你选择了多行!");
                    }
                    else
                    {
                        record=selRow.getSelected();
                        commentEdit(record);
                    }

                },
                scope:this
            },
            {
                text:'删除',
                iconCls:'menu-del',
                scope:this,
                handler:function(){
                    commentDelete();
                }
            },'-',
            {
                text:'刷新',
                iconCls:'btn-refresh',
                scope:this,
                handler:function(){commentStore.reload();}
            }
        ]
    });
    GridMain(node,commentGrid,node.attributes.iconCls);
    commentStore.load({params:{start:0,limit:_pageSize}});
}
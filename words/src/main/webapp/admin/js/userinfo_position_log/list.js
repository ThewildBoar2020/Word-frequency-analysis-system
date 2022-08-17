/**
 * @Title: userInfoPositionLog
 * @Package null
 * @Description 职务变更管理
 * @author
 * @date 2022年2月2日 20:20:30
 * @version V1.0
 */
var userinfoPositionLogStore;
function userinfoPositionLogList(node)
{
    //分页数量
    var _pageSize=15;
    //Record定义记录结果
    var userinfoPositionLog=Ext.data.Record.create([
        {name:'id',type:'string',mapping:'id'},
        {name:'userinfo_id',type:'string',mapping:'userInfo.userinfoId'},
        {name:'userinfo_name',type:'string',mapping:'userInfo.truename'},
        {name:'remark',type:'string',mapping:'remark'},
        {name:'addtime',type:'string',mapping:'addtime'}
    ]);

    userinfoPositionLogStore=new Ext.data.Store({
        proxy:new Ext.data.HttpProxy({
            url:path+'userinfoPositionLog/findAll',
            method:'post'
        }),
        reader:new Ext.data.JsonReader({
            root:'data',
            id:'id',
            totalProperty:'totalSize'
        },userinfoPositionLog)
    });
    //加载时参数
    //userinfoPositionLogStore.load({params:{start:0,pageSize:_pageSize}});

    //列选择模式
    var sm=new Ext.grid.CheckboxSelectionModel({dataIndex:'id'});
    //列头
    var cm=new Ext.grid.ColumnModel([
        sm,
        {header:'编号',dataIndex:'id',align:'center'},
        {header:'员工姓名',dataIndex:'userinfo_name',align:'center'},
        {header:'职务调动描述',dataIndex:'remark',align:'center'},
        {header:'时间',dataIndex:'addtime',align:'center'}
    ]);
    var userinfoPositionLogGrid=new Ext.grid.GridPanel({
        id:'userinfoPositionLogGrid',
        store:userinfoPositionLogStore,
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
            store:userinfoPositionLogStore,
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
                text:'删除',
                id:'userinfoPositionLogGrid_btn_del',
                iconCls:'menu-del',
                scope:this,
                handler:function(){
                    userinfoPositionLogDelete();
                }
            },'-',
            {
                text:'刷新',
                iconCls:'btn-refresh',
                scope:this,
                handler:function(){userinfoPositionLogStore.reload();}
            }
        ]
    });
    GridMain(node,userinfoPositionLogGrid,node.attributes.iconCls);
    userinfoPositionLogStore.load({params:{start:0,limit:_pageSize}});
    setReadOnlyUser("userinfoPositionLogGrid");
}
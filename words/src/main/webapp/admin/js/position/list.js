/**
 * @Title: position
 * @Package null
 * @Description 职务管理
 * @author
 * @date 2022年2月2日 20:20:30
 * @version V1.0
 */
var positionStore;
function positionList(node)
{
    //分页数量
    var _pageSize=15;
    //Record定义记录结果
    var position=Ext.data.Record.create([
        {name:'position_id',type:'string',mapping:'positionId'},
        {name:'position_no',type:'string',mapping:'positionNo'},
        {name:'position_name',type:'string',mapping:'positionName'},
        {name:'qualification',type:'string',mapping:'qualification'},
        {name:'is_deleted',type:'string',mapping:'is_deleted'}
    ]);

    positionStore=new Ext.data.Store({
        proxy:new Ext.data.HttpProxy({
            url:path+'position/findAll',
            method:'post'
        }),
        reader:new Ext.data.JsonReader({
            root:'data',
            id:'id',
            totalProperty:'totalSize'
        },position)
    });
    //加载时参数
    //positionStore.load({params:{start:0,pageSize:_pageSize}});

    //列选择模式
    var sm=new Ext.grid.CheckboxSelectionModel({dataIndex:'position_id'});
    //列头
    var cm=new Ext.grid.ColumnModel([
        sm,
        {header:'编号',dataIndex:'position_id',align:'center'},
        {header:'职务编号',dataIndex:'position_no',align:'center'},
        {header:'职务名称',dataIndex:'position_name',align:'center'},
        {header:'职务描述',dataIndex:'qualification',align:'center'},
        {header:'是否启用',dataIndex:'is_deleted',align:'center',hidden:true}
    ]);
    var positionGrid=new Ext.grid.GridPanel({
        id:'positionGrid',
        store:positionStore,
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
            store:positionStore,
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
        tbar:['->',{
            text:'添加',
            iconCls:'menu-add',
            handler:function(){positionAdd();},
            scope:this
        },'-',
            {
                text:'修改',
                iconCls:'btn-edit',
                handler:function(){
                    var selRow=Ext.getCmp("positionGrid").getSelectionModel();
                    if(!selRow.hasSelection())
                    {
                        Ext.Msg.alert("提示","请选择你要修改的记录!");
                    }
                    else if(selRow.getSelections().length>1)
                    {
                        Ext.Msg.alert("提示","一次只能修改一行记录,你选择了多行!");
                    }
                    else
                    {
                        record=selRow.getSelected();
                        positionEdit(record);
                    }

                },
                scope:this
            },'-',
            {
                text:'删除',
                iconCls:'menu-del',
                scope:this,
                handler:function(){
                    positionDelete();
                }
            },'-',
            {
                text:'刷新',
                iconCls:'btn-refresh',
                scope:this,
                handler:function(){positionStore.reload();}
            }
        ]
    });
    GridMain(node,positionGrid,node.attributes.iconCls);
    positionStore.load({params:{start:0,limit:_pageSize}});
}
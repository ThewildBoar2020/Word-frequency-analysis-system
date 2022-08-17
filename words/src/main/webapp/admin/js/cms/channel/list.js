/**
 * @Title: channel
 * @Package null
 * @Description channel管理
 * @author
 * @date 2022年2月2日 20:20:30
 * @version V1.0
 */
var channelStore;
function channelList(node)
{
    //分页数量
    var _pageSize=15;
    //Record定义记录结果
    var channel=Ext.data.Record.create([
        {name:'channel_id',type:'string',mapping:'channelId'},
        {name:'channel_name',type:'string',mapping:'title'},
        {name:'channel_desc',type:'string',mapping:'description'}
    ]);

    channelStore=new Ext.data.Store({
        proxy:new Ext.data.HttpProxy({
            url:path+'channel/findAll',
            method:'post'
        }),
        reader:new Ext.data.JsonReader({
            root:'data',
            id:'id',
            totalProperty:'totalSize'
        },channel)
    });
    //加载时参数
    //channelStore.load({params:{start:0,pageSize:_pageSize}});

    //列选择模式
    var sm=new Ext.grid.CheckboxSelectionModel({dataIndex:'channel_id'});
    //列头
    var cm=new Ext.grid.ColumnModel([
        sm,
        {header:'编号',dataIndex:'channel_id',align:'center'},
        {header:'名称',dataIndex:'channel_name',align:'center'},
        {header:'描述',dataIndex:'channel_desc',align:'center'}
    ]);
    var channelGrid=new Ext.grid.GridPanel({
        id:'channelGrid',
        store:channelStore,
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
            store:channelStore,
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
            handler:function(){channelAdd();},
            scope:this
        },'-',
            {
                text:'修改',
                iconCls:'btn-edit',
                handler:function(){
                    var selRow=Ext.getCmp("channelGrid").getSelectionModel();
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
                        channelEdit(record);
                    }

                },
                scope:this
            },'-',
            {
                text:'删除',
                iconCls:'menu-del',
                scope:this,
                handler:function(){
                    channelDelete();
                }
            },'-',
            {
                text:'刷新',
                iconCls:'btn-refresh',
                scope:this,
                handler:function(){channelStore.reload();}
            }
        ]
    });
    GridMain(node,channelGrid,node.attributes.iconCls);
    channelStore.load({params:{start:0,limit:_pageSize},
        callback:function(r,options,success)
        {
            if(!success){
                Ext.Msg.alert("提示","数据加载失败!")
            }else{
            }
        }
    });
}
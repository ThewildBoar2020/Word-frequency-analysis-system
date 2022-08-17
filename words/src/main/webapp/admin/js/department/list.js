/**
 * @Title: department
 * @Package null
 * @Description 部门管理
 * @author
 * @date 2022年2月2日 20:20:30
 * @version V1.0
 */
var departmentStore;
function departmentList(node)
{
    //分页数量
    var _pageSize=15;
    //Record定义记录结果
    var department=Ext.data.Record.create([
        {name:'department_id',type:'string',mapping:'departmentId'},
        {name:'department_name',type:'string',mapping:'departmentName'},
        {name:'department_desc',type:'string',mapping:'departmentDesc'},
        {name:'status',type:'string',mapping:'status'}
    ]);

    departmentStore=new Ext.data.Store({
        proxy:new Ext.data.HttpProxy({
            url:path+'department/findAll',
            method:'post'
        }),
        reader:new Ext.data.JsonReader({
            root:'data',
            id:'id',
            totalProperty:'totalSize'
        },department)
    });
    //加载时参数
    //departmentStore.load({params:{start:0,pageSize:_pageSize}});

    //列选择模式
    var sm=new Ext.grid.CheckboxSelectionModel({dataIndex:'department_id'});
    //列头
    var cm=new Ext.grid.ColumnModel([
        sm,
        {header:'编号',dataIndex:'department_id',align:'center'},
        {header:'部门名称',dataIndex:'department_name',align:'center'},
        {header:'部门描述',dataIndex:'department_desc',align:'center'},
        {header:'是否启用',dataIndex:'status',align:'center',hidden:true,
            renderer:function(v){
                if(v==1)
                {return "是";}
                else{return "否";}}
        }
    ]);
    var departmentGrid=new Ext.grid.GridPanel({
        id:'departmentGrid',
        store:departmentStore,
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
            store:departmentStore,
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
            handler:function(){departmentAdd();},
            scope:this
        },'-',
            {
                text:'修改',
                iconCls:'btn-edit',
                handler:function(){
                    var selRow=Ext.getCmp("departmentGrid").getSelectionModel();
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
                        departmentEdit(record);
                    }

                },
                scope:this
            },'-',
            {
                text:'删除',
                iconCls:'menu-del',
                scope:this,
                handler:function(){
                    departmentDelete();
                }
            },'-',
            {
                text:'刷新',
                iconCls:'btn-refresh',
                scope:this,
                handler:function(){departmentStore.reload();}
            }
        ]
    });
    GridMain(node,departmentGrid,node.attributes.iconCls);
    departmentStore.load({params:{start:0,limit:_pageSize}});
}
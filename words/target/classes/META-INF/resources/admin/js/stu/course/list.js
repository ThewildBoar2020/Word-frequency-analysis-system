/**
 * @Title: course
 * @Package null
 * @Description 课程管理
 * @author
 * @date 2022年2月2日 20:20:30
 * @version V1.0
 */
var courseStore;
function courseList(node)
{
    //分页数量
    var _pageSize=15;
    //Record定义记录结果
    var course=Ext.data.Record.create([
        {name:'course_id',type:'string',mapping:'courseId'},
        {name:'course_name',type:'string',mapping:'courseName'},
        {name:'course_desc',type:'string',mapping:'courseDesc'}
    ]);

    courseStore=new Ext.data.Store({
        proxy:new Ext.data.HttpProxy({
            url:path+'course/findAll',
            method:'post'
        }),
        reader:new Ext.data.JsonReader({
            root:'data',
            id:'id',
            totalProperty:'totalSize'
        },course)
    });
    //加载时参数
    //courseStore.load({params:{start:0,pageSize:_pageSize}});

    //列选择模式
    var sm=new Ext.grid.CheckboxSelectionModel({dataIndex:'course_id'});
    //列头
    var cm=new Ext.grid.ColumnModel([
        sm,
        {header:'编号',dataIndex:'course_id',align:'center'},
        {header:'课程名称',dataIndex:'course_name',align:'center'},
        {header:'课程描述',dataIndex:'course_desc',align:'center'}
    ]);
    var courseGrid=new Ext.grid.GridPanel({
        id:'courseGrid',
        store:courseStore,
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
            store:courseStore,
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
            handler:function(){courseAdd();},
            scope:this
        },'-',
            {
                text:'修改',
                iconCls:'btn-edit',
                handler:function(){
                    var selRow=Ext.getCmp("courseGrid").getSelectionModel();
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
                        courseEdit(record);
                    }

                },
                scope:this
            },'-',
            {
                text:'删除',
                iconCls:'menu-del',
                scope:this,
                handler:function(){
                    courseDelete();
                }
            },'-',
            {
                text:'刷新',
                iconCls:'btn-refresh',
                scope:this,
                handler:function(){courseStore.reload();}
            }
        ]
    });
    GridMain(node,courseGrid,node.attributes.iconCls);
    courseStore.load({params:{start:0,limit:_pageSize}});
}
/**
 * @Title: content
 * @Package null
 * @Description content管理
 * @author
 * @date 2022年2月2日 20:20:30
 * @version V1.0
 */
var contentStore;
function contentList(node)
{
    //分页数量
    var _pageSize=15;
    //Record定义记录结果
    var content=Ext.data.Record.create([
        {name:'content_id',type:'string',mapping:'contentId'},
        {name:'channel_id',type:'string',mapping:'channelId'},
        {name:'channel_name',type:'string',mapping:'channel.title'},
        {name:'title',type:'string',mapping:'title'},
        {name:'content',type:'string',mapping:'content'},
        {name:'title_img',type:'string',mapping:'titleImg'},
        {name:'media_path',type:'string',mapping:'mediaPath'},
        {name:'author',type:'string',mapping:'author'},
        {name:'create_time',type:'string',mapping:'createTime'}
    ]);

    contentStore=new Ext.data.Store({
        proxy:new Ext.data.HttpProxy({
            url:path+'content/findAll',
            method:'post'
        }),
        reader:new Ext.data.JsonReader({
            root:'data',
            id:'content_id',
            totalProperty:'totalSize'
        },content)
    });
    //加载时参数
    //contentStore.load({params:{start:0,pageSize:_pageSize}});

    //列选择模式
    var sm=new Ext.grid.CheckboxSelectionModel({dataIndex:'content_id'});
    //列头
    var cm=new Ext.grid.ColumnModel([
        sm,
        {header:'编号',dataIndex:'content_id',align:'center',width:120},
        {header:'类别名称',dataIndex:'channel_name',align:'center'},
        {header:'标题',dataIndex:'title',align:'center'},
        {header:'地址',dataIndex:'media_path',align:'center',renderer:function (v){
            return "<a href='http://localhost:1234/"+v+"' target='_blank'>"+v+"</a>"
        }},
        {header:'内容',dataIndex:'content',align:'center',hidden:true},
        {header:'作者',dataIndex:'author',align:'center',width:120},
        {header:'创建时间',dataIndex:'create_time',align:'center',width:120}
    ]);
    var contentGrid=new Ext.grid.GridPanel({
        id:'contentGrid',
        store:contentStore,
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
            store:contentStore,
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
        tbar:['->',{xtype:'tbspacer',width:105},'标题：',
            {
                xtype: 'textfield',
                name:'searchTitle',
                id:'contentSearchTitle',
                emptyText: '输入文章标题',
                width:120
            },
            {
                text:'搜索',
                iconCls:'search',
                handler:function(){contentSearch();},
                scope:this
            },
            {
            text:'添加',
            iconCls:'menu-add',
            handler:function(){contentAdd();},
            scope:this
            },'-',
            {
                text:'修改',
                iconCls:'btn-edit',
                handler:function(){
                    var selRow=Ext.getCmp("contentGrid").getSelectionModel();
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
                        contentEdit(record);
                    }

                },
                scope:this
            },'-',
            {
                text:'删除',
                iconCls:'menu-del',
                scope:this,
                handler:function(){
                    contentDelete();
                }
            },'-',
            {
                text:'刷新',
                iconCls:'btn-refresh',
                scope:this,
                handler:function(){contentStore.reload();}
            }
        ]
    });
    GridMain(node,contentGrid,node.attributes.iconCls);
    contentStore.load({params:{start:0,limit:_pageSize}});
}

function contentSearch()
{
    //分页数量
    let pageSize=15;
    let contentSearchTitle=Ext.getCmp("contentSearchTitle").getValue();

    contentStore.proxy=new Ext.data.HttpProxy({
        url:path+'content/findAll',
        method:'post'
    });
    contentStore.load({
        params:{start:0,limit:pageSize,title:contentSearchTitle},
        callback:function(r,options,success)
        {
            if(!success){
                Ext.Msg.alert("提示","数据加载失败!")
            }else{
            }
        }
    });
}
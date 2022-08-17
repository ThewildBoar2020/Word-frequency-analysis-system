/**
 * @Title: article
 * @Package null
 * @Description article管理
 * @author
 * @date 2022年2月2日 20:20:30
 * @version V1.0
 */
var articleStore;
function articleList(node)
{
    //分页数量
    var _pageSize=15;
    //Record定义记录结果
    var article=Ext.data.Record.create([
        {name:'article_id',type:'string',mapping:'articleId'},
        {name:'title',type:'string',mapping:'title'},
        {name:'channel_ids',type:'string',mapping:'channelIds'},
        {name:'content',type:'string',mapping:'content'},
        {name:'author',type:'string',mapping:'author'},
        {name:'create_datetime',type:'string',mapping:'createDatetime'}
    ]);

    articleStore=new Ext.data.Store({
        proxy:new Ext.data.HttpProxy({
            url:path+'article/findAll',
            method:'post'
        }),
        reader:new Ext.data.JsonReader({
            root:'data',
            id:'id',
            totalProperty:'totalSize'
        },article),
        id:'articleStore'
    });

    //列选择模式
    var sm=new Ext.grid.CheckboxSelectionModel({dataIndex:'article_id'});
    //列头
    var cm=new Ext.grid.ColumnModel([
        sm,
        {header:'编号',dataIndex:'article_id',align:'center',width:20},
        {header:'标题',dataIndex:'title',align:'center'},
        {header:'栏目',dataIndex:'channel_ids',align:'center',renderer:function(v){
                if(v==2)
                {return "新闻";}
                else if(v==1){return "文献";}
            }},
        {header:'内容',dataIndex:'content',align:'center'},
        {header:'作者',dataIndex:'author',align:'center',width:20},
        {header:'添加时间',dataIndex:'create_datetime',align:'center',width:20}
    ]);
    var articleGrid=new Ext.grid.GridPanel({
        id:'articleGrid',
        store:articleStore,
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
            store:articleStore,
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
                id:'articleSearchTitle',
                emptyText: '输入文章标题',
                width:120
            },
            {
                text:'搜索',
                iconCls:'search',
                handler:function(){articleSearch();},
                scope:this
            },'-',
            {
                text:'当前文章分析',
                iconCls:'menu-report',
                handler:function(){
                    var selRow=Ext.getCmp("articleGrid").getSelectionModel();
                    if(!selRow.hasSelection())
                    {
                        Ext.Msg.alert("提示","请选择你要分析的记录!");
                    }
                    else if(selRow.getSelections().length>1)
                    {
                        Ext.Msg.alert("提示","一次只能分析一行记录,你选择了多行!");
                    }
                    else
                    {
                        record=selRow.getSelected();
                        articleAnalisys(record);
                    }

                },
                scope:this
            },
            {
                text:'总体文章分析',
                iconCls:'menu-attachment',
                handler:function(){
                    articleAllAnalisys();
                }
            },
            {
                text:'修改',
                iconCls:'btn-edit',
                handler:function(){
                    var selRow=Ext.getCmp("articleGrid").getSelectionModel();
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
                        articleEdit(record);
                    }

                },
                scope:this
            },'-',
            {
                text:'删除',
                iconCls:'menu-del',
                scope:this,
                handler:function(){
                    articleDelete();
                }
            },'-',
            {
                text:'刷新',
                iconCls:'btn-refresh',
                scope:this,
                handler:function(){articleStore.reload();}
            }
        ]
    });
    GridMain(node,articleGrid,node.attributes.iconCls);
    articleStore.load({params:{start:0,limit:_pageSize}});
}

function articleSearch()
{
    //分页数量
    let pageSize=15;
    let articleSearchTitle=Ext.getCmp("articleSearchTitle").getValue();

    articleStore.proxy=new Ext.data.HttpProxy({
        url:path+'article/findAll',
        method:'post'
    });
    articleStore.load({
        params:{start:0,limit:pageSize,title:articleSearchTitle},
    });
}
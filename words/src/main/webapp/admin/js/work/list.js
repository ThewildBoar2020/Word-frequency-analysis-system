/**   
* @Title: work/list.js
* @Package null 
* @Description 加班信息管理
* @author 
* @date 2020-01-27 12:10:33
* @version V1.0   
*/
var workStore;

function workList(node)
{
	//分页数量
	var _pageSize=15;

	//Record定义记录结果
	var work=Ext.data.Record.create([
		{name:'work_id',type:'string',mapping:'workId'},
		{name:'userInfo_id',type:'string',mapping:'userInfo.userinfoId'},
		{name:'userInfo_name',type:'string',mapping:'userInfo.truename'},
		{name:'start_date',type:'string',mapping:'startDate'},
		{name:'end_date',type:'string',mapping:'endDate'},
		{name:'reason',type:'string',mapping:'reason'},
		{name:'is_deleted',type:'string',mapping:'is_deleted'}
	]);
		
	workStore=new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({
			url:path+'work/findAll',
			method:'post',
			limitParam: "pageSize",
			startParam: "start"
		}),
		reader:new Ext.data.JsonReader({
			root:'data',
			id:'id',
			totalProperty:'totalSize'
		},work)
	});
	//列选择模式
	var sm=new Ext.grid.CheckboxSelectionModel({dataIndex:'work_id'});
	//列头
	var cm=new Ext.grid.ColumnModel([
		sm,
		{
			header:'编号',
			dataIndex:'work_id',
			hidden:false,
			align:'center'
		},
		{
			header:'用户姓名',
			dataIndex:'userInfo_name',
			align:'center'
		},
		{
			header:'加班开始时间',
			dataIndex:'start_date',
			align:'center'
		},
		{
			header:'加班截止时间',
			dataIndex:'end_date',
			align:'center'
		},
		{
			header:'加班原因',
			dataIndex:'reason',
			align:'center'
		},
		{
			header:'是否删除',
			dataIndex:'is_deleted',
			align:'center',
			hidden:true
		}
	]);
	//用户grid
	var workGrid=new Ext.grid.GridPanel({
		id:'workGrid',
		store:workStore,
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
			store:workStore,
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
		tbar:["->",{xtype:'tbspacer',width:105},'姓名：',
			{
				xtype: 'textfield',
				name:'searchTrueName',
				id:'wsearchTrueName',
				emptyText: '输入用户姓名',
				width:90
			},
			{
				text:'搜索',
				iconCls:'search',
				handler:function(){workSearch();},
				scope:this
			},'-',
			{
				text:'添加',
				iconCls:'menu-add',
				id:'workGrid_btn_add',
				handler:function(){workAdd();},
				scope:this
			},'-',
			{
				text:'修改',
				iconCls:'btn-edit',
				id:'workGrid_btn_edit',
				handler:function(){
					var selRow=Ext.getCmp("workGrid").getSelectionModel();
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
						workEdit(record);
					}
					
				},
				scope:this
			},'-',
			{
				text:'删除',
				id:'workGrid_btn_del',
				iconCls:'btn-delete',
				scope:this,
				handler:function(){
					workDelete();
				}
			},'-',
			{
				text:'刷新',
				iconCls:'btn-refresh',
				scope:this,
				handler:function(){workStore.reload();}
			}
		]
	});
	//加载时参数
	workStore.load({params:{start:0,limit:_pageSize}});
	GridMain(node,workGrid,node.attributes.iconCls);
	setReadOnlyUser("workGrid");
};

//根据提供的条件查询数据
function workSearch()
{
	//分页数量
	let pageSize=15;
	let searchTrueName=Ext.getCmp("wsearchTrueName").getValue();

	workStore.proxy=new Ext.data.HttpProxy({
		url:path+'work/findAll',
		method:'post'
	});
	workStore.load({
		params:{start:0,limit:pageSize,truename:searchTrueName},
		callback:function(r,options,success)
		{
			if(!success){
				Ext.Msg.alert("提示","数据加载失败!")
			}else{
			}
		}
	});
}
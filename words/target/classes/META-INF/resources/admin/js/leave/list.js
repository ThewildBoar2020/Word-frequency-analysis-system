/**   
* @Title: leave/list.js
* @Package null 
* @Description 请假信息管理
* @author 
* @date 2020-01-27 12:10:33
* @version V1.0   
*/
var leaveStore;

function leaveList(node)
{
	//分页数量
	var _pageSize=15;

	//Record定义记录结果
	var leave=Ext.data.Record.create([
		{name:'leave_id',type:'string',mapping:'leaveId'},
		{name:'userInfo_id',type:'string',mapping:'userInfo.userinfoId'},
		{name:'userInfo_name',type:'string',mapping:'userInfo.truename'},
		{name:'start_date',type:'string',mapping:'startDate'},
		{name:'end_date',type:'string',mapping:'endDate'},
		{name:'reason',type:'string',mapping:'reason'},
		{name:'progress',type:'int',mapping:'progress'},
		{name:'is_deleted',type:'string',mapping:'is_deleted'}
	]);
		
	leaveStore=new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({
			url:path+'leave/findAll',
			method:'post',
			limitParam: "pageSize",
			startParam: "start"
		}),
		reader:new Ext.data.JsonReader({
			root:'data',
			id:'id',
			totalProperty:'totalSize'
		},leave)
	});
	//列选择模式
	var sm=new Ext.grid.CheckboxSelectionModel({dataIndex:'leave_id'});
	//列头
	var cm=new Ext.grid.ColumnModel([
		sm,
		{
			header:'编号',
			dataIndex:'leave_id',
			hidden:false,
			align:'center'
		},
		{
			header:'用户姓名',
			dataIndex:'userInfo_name',
			align:'center'
		},
		{
			header:'请假开始时间',
			dataIndex:'start_date',
			align:'center'
		},
		{
			header:'请假截止时间',
			dataIndex:'end_date',
			align:'center'
		},
		{
			header:'请假原因',
			dataIndex:'reason',
			align:'center'
		},
		{
			header:'审核状态',
			dataIndex:'progress',
			align:'center',
			renderer:function(v){
				if(v==1)
					return "审核中";
				else if(v==2)
					return  "通过";
				else if(v==3)
					return "驳回";
			}
		},
		{
			header:'是否删除',
			dataIndex:'is_deleted',
			align:'center',
			hidden:true
		}
	]);
	//用户grid
	var leaveGrid=new Ext.grid.GridPanel({
		id:'leaveGrid',
		store:leaveStore,
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
			store:leaveStore,
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
				id:'lsearchTrueName',
				emptyText: '输入用户姓名',
				width:90
			},
			{
				text:'搜索',
				iconCls:'search',
				handler:function(){leaveSearch();},
				scope:this
			},'-',
			{
				text:'添加',
				iconCls:'menu-add',
				handler:function(){leaveAdd();},
				scope:this
			},'-',
			{
				text:'修改',
				iconCls:'btn-edit',
				handler:function(){
					var selRow=Ext.getCmp("leaveGrid").getSelectionModel();
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
						leaveEdit(record);
					}
					
				},
				scope:this
			},'-',
			{
				text:'审核',
				id:'leaveGrid_btn_check',
				iconCls:'menu-duty',
				handler:function(){
					var selRow=Ext.getCmp("leaveGrid").getSelectionModel();
					if(!selRow.hasSelection())
					{
						Ext.Msg.alert("提示","请选择你要审核的记录!");
					}
					else if(selRow.getSelections().length>1)
					{
						Ext.Msg.alert("提示","一次只能审核一行记录,你选择了多行!");
					}
					else
					{
						record=selRow.getSelected();
						checkEdit(record);
					}

				},
				scope:this
			},'-',
			{
				text:'删除',
				id:'leaveGrid_btn_del',
				iconCls:'btn-delete',
				scope:this,
				handler:function(){
					leaveDelete();
				}
			},'-',
			{
				text:'刷新',
				iconCls:'btn-refresh',
				scope:this,
				handler:function(){leaveStore.reload();}
			}
		]
	});
	//加载时参数
	leaveStore.load({params:{start:0,limit:_pageSize}});
	GridMain(node,leaveGrid,node.attributes.iconCls);
	setReadOnlyUser("leaveGrid");
};

//根据提供的条件查询数据
function leaveSearch()
{
	//分页数量
	let pageSize=15;
	let searchTrueName=Ext.getCmp("lsearchTrueName").getValue();

	leaveStore.proxy=new Ext.data.HttpProxy({
		url:path+'leave/findAll',
		method:'post'
	});
	leaveStore.load({
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
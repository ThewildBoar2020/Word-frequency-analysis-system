/**   
* @Title: contract/list.js
* @Package null 
* @Description 合同管理
* @author 
* @date 2020-01-27 12:10:33
* @version V1.0   
*/
var contractStore;

function contractList(node)
{
	//分页数量
	var _pageSize=15;

	//Record定义记录结果
	var contract=Ext.data.Record.create([
		{name:'contract_id',type:'string',mapping:'contractId'},
		{name:'contract_no',type:'string',mapping:'contractNo'},
		{name:'userInfo_id',type:'string',mapping:'userInfo.userinfoId'},
		{name:'userInfo_name',type:'string',mapping:'userInfo.truename'},
		{name:'start_date',type:'string',mapping:'startDate'},
		{name:'end_date',type:'string',mapping:'endDate'},
		{name:'sign_date',type:'string',mapping:'signDate'},
		{name:'con_state',type:'string',mapping:'conState'},
		{name:'con_type',type:'string',mapping:'conType'}
	]);
		
	contractStore=new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({
			url:path+'contract/findAll',
			method:'post',
			limitParam: "pageSize",
			startParam: "start"
		}),
		reader:new Ext.data.JsonReader({
			root:'data',
			id:'id',
			totalProperty:'totalSize'
		},contract)
	});
	//列选择模式
	var sm=new Ext.grid.CheckboxSelectionModel({dataIndex:'contract_id'});
	//列头
	var cm=new Ext.grid.ColumnModel([
		sm,
		{
			header:'合同编号',
			dataIndex:'contract_id',
			hidden:false,
			align:'center'
		},
		{
			header:'合同编号',
			dataIndex:'contract_no',
			align:'center'
		},
		{
			header:'用户姓名',
			dataIndex:'userInfo_name',
			align:'center'
		},
		{
			header:'开始时间',
			dataIndex:'start_date',
			align:'center'
		},
		{
			header:'结束时间',
			dataIndex:'end_date',
			align:'center'
		},
		{
			header:'签订时间',
			dataIndex:'sign_date',
			align:'center'
		},
		{
			header:'合同状态',
			dataIndex:'con_state',
			align:'center'
		},
		{
			header:'合同类型',
			dataIndex:'con_type',
			align:'center'
		}
	]);
	//用户grid
	var contractGrid=new Ext.grid.GridPanel({
		id:'contractGrid',
		store:contractStore,
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
			store:contractStore,
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
				id:'searchTrueName',
				emptyText: '输入用户姓名',
				width:90
			},
			{
				text:'搜索',
				iconCls:'search',
				handler:function(){contractSearch();},
				scope:this
			},'-',
			{
				text:'添加',
				iconCls:'menu-add',
				id:'contractGrid_btn_add',
				handler:function(){contractAdd();},
				scope:this
			},'-',
			{
				text:'修改',
				iconCls:'btn-edit',
				id:'contractGrid_btn_edit',
				handler:function(){
					var selRow=Ext.getCmp("contractGrid").getSelectionModel();
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
						contractEdit(record);
					}
					
				},
				scope:this
			},'-',
			{
				text:'删除',
				id:'contractGrid_btn_del',
				iconCls:'btn-delete',
				scope:this,
				handler:function(){
					contractDelete();
				}
			},'-',
			{
				text:'刷新',
				iconCls:'btn-refresh',
				scope:this,
				handler:function(){contractStore.reload();}
			}
		]
	});
	//加载时参数
	contractStore.load({params:{start:0,limit:_pageSize}});
	GridMain(node,contractGrid,node.attributes.iconCls);
	setReadOnlyUser("contractGrid");
};

//根据提供的条件查询数据
function contractSearch()
{
	//分页数量
	let pageSize=15;
	let searchTrueName=Ext.getCmp("searchTrueName").getValue();

	contractStore.proxy=new Ext.data.HttpProxy({
		url:path+'contract/findAll',
		method:'post'
	});
	contractStore.load({
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
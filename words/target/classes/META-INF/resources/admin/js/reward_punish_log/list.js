/**   
* @Title: reward_punish/list.js
* @Package null 
* @Description 奖罚管理
* @author 
* @date 2020-01-27 12:10:33
* @version V1.0   
*/
var rewardPunishStore;

function rewardPunishList(node)
{
	//分页数量
	var _pageSize=15;

	//Record定义记录结果
	var rewardPunish=Ext.data.Record.create([
		{name:'reward_punish_id',type:'string',mapping:'rewardPunishId'},
		{name:'userInfo_id',type:'string',mapping:'userInfo.userinfoId'},
		{name:'userInfo_name',type:'string',mapping:'userInfo.truename'},
		{name:'type_name',type:'string',mapping:'typeName'},
		{name:'remark',type:'string',mapping:'remark'},
		{name:'is_deleted',type:'string',mapping:'is_deleted'}
	]);
		
	rewardPunishStore=new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({
			url:path+'rewardPunishLog/findAll',
			method:'post',
			limitParam: "pageSize",
			startParam: "start"
		}),
		reader:new Ext.data.JsonReader({
			root:'data',
			id:'id',
			totalProperty:'totalSize'
		},rewardPunish)
	});
	//列选择模式
	var sm=new Ext.grid.CheckboxSelectionModel({dataIndex:'reward_punish_id'});
	//列头
	var cm=new Ext.grid.ColumnModel([
		sm,
		{
			header:'编号',
			dataIndex:'reward_punish_id',
			hidden:false,
			align:'center'
		},
		{
			header:'用户姓名',
			dataIndex:'userInfo_name',
			align:'center'
		},
		{
			header:'奖惩类型',
			dataIndex:'type_name',
			align:'center'
		},
		{
			header:'奖惩依据',
			dataIndex:'remark',
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
	var rewardPunishGrid=new Ext.grid.GridPanel({
		id:'rewardPunishGrid',
		store:rewardPunishStore,
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
			store:rewardPunishStore,
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
				id:'rpSearchTrueName',
				emptyText: '输入用户姓名',
				width:90
			},
			{
				text:'搜索',
				iconCls:'search',
				handler:function(){rewardPunishSearch();},
				scope:this
			},'-',
			{
				text:'添加',
				id:'rewardPunishGrid_btn_add',
				iconCls:'menu-add',
				handler:function(){rewardPunishAdd();},
				scope:this
			},'-',
			{
				text:'修改',
				id:'rewardPunishGrid_btn_edit',
				iconCls:'btn-edit',
				handler:function(){
					var selRow=Ext.getCmp("rewardPunishGrid").getSelectionModel();
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
						rewardPunishEdit(record);
					}
					
				},
				scope:this
			},'-',
			{
				text:'删除',
				id:'rewardPunishGrid_btn_del',
				iconCls:'btn-delete',
				scope:this,
				handler:function(){
					rewardPunishDelete();
				}
			},'-',
			{
				text:'刷新',
				iconCls:'btn-refresh',
				scope:this,
				handler:function(){rewardPunishStore.reload();}
			}
		]
	});
	//加载时参数
	rewardPunishStore.load({params:{start:0,limit:_pageSize}});
	GridMain(node,rewardPunishGrid,node.attributes.iconCls);
	setReadOnlyUser("rewardPunishGrid");
};

//根据提供的条件查询数据
function rewardPunishSearch()
{
	//分页数量
	let pageSize=15;
	let searchTrueName=Ext.getCmp("rpSearchTrueName").getValue();

	rewardPunishStore.proxy=new Ext.data.HttpProxy({
		url:path+'rewardPunishLog/findAll',
		method:'post'
	});
	rewardPunishStore.load({
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
/**   
* @Title: welfare/list.js
* @Package null 
* @Description 福利管理
* @author 
* @date 2020-01-27 12:10:33
* @version V1.0   
*/
var welfareStore;

function welfareList(node)
{
	//分页数量
	var _pageSize=15;

	//Record定义记录结果
	var welfare=Ext.data.Record.create([
		{name:'welfare_id',type:'string',mapping:'welfareId'},
		{name:'userInfo_id',type:'string',mapping:'userInfo.userinfoId'},
		{name:'userInfo_name',type:'string',mapping:'userInfo.truename'},
		{name:'social_security_startdate',type:'string',mapping:'socialSecurityStartdate'},
		{name:'social_security_enddate',type:'string',mapping:'socialSecurityEnddate'},
		{name:'accumulation_fund_startdate',type:'string',mapping:'accumulationFundStartdate'},
		{name:'accumulation_fund_enddate',type:'string',mapping:'accumulationFundEnddate'},
		{name:'is_deleted',type:'string',mapping:'is_deleted'}
	]);
		
	welfareStore=new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({
			url:path+'welfare/findAll',
			method:'post',
			limitParam: "pageSize",
			startParam: "start"
		}),
		reader:new Ext.data.JsonReader({
			root:'data',
			id:'id',
			totalProperty:'totalSize'
		},welfare)
	});
	//列选择模式
	var sm=new Ext.grid.CheckboxSelectionModel({dataIndex:'welfare_id'});
	//列头
	var cm=new Ext.grid.ColumnModel([
		sm,
		{
			header:'编号',
			dataIndex:'welfare_id',
			hidden:false,
			align:'center'
		},
		{
			header:'用户姓名',
			dataIndex:'userInfo_name',
			align:'center'
		},
		{
			header:'社保起始缴纳时间',
			dataIndex:'social_security_startdate',
			align:'center'
		},
		{
			header:'社保最后缴纳时间',
			dataIndex:'social_security_enddate',
			align:'center'
		},
		{
			header:'公积金起始缴纳时间',
			dataIndex:'accumulation_fund_startdate',
			align:'center'
		},
		{
			header:'公积金结束缴纳时间',
			dataIndex:'accumulation_fund_enddate',
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
	var welfareGrid=new Ext.grid.GridPanel({
		id:'welfareGrid',
		store:welfareStore,
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
			store:welfareStore,
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
				handler:function(){welfareSearch();},
				scope:this
			},'-',
			{
				text:'添加',
				iconCls:'menu-add',
				id:'welfareGrid_btn_add',
				handler:function(){welfareAdd();},
				scope:this
			},'-',
			{
				text:'修改',
				iconCls:'btn-edit',
				id:'welfareGrid_btn_edit',
				handler:function(){
					var selRow=Ext.getCmp("welfareGrid").getSelectionModel();
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
						welfareEdit(record);
					}
					
				},
				scope:this
			},'-',
			{
				text:'删除',
				id:'welfareGrid_btn_del',
				iconCls:'btn-delete',
				scope:this,
				handler:function(){
					welfareDelete();
				}
			},'-',
			{
				text:'刷新',
				iconCls:'btn-refresh',
				scope:this,
				handler:function(){welfareStore.reload();}
			}
		]
	});
	//加载时参数
	welfareStore.load({params:{start:0,limit:_pageSize}});
	GridMain(node,welfareGrid,node.attributes.iconCls);
	setReadOnlyUser("welfareGrid");
};

//根据提供的条件查询数据
function welfareSearch()
{
	//分页数量
	let pageSize=15;
	let searchTrueName=Ext.getCmp("searchTrueName").getValue();

	welfareStore.proxy=new Ext.data.HttpProxy({
		url:path+'welfare/findAll',
		method:'post'
	});
	welfareStore.load({
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
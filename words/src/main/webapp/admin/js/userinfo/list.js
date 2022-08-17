/**
 * @Title: userinfo.js
 * @Package null
 * @Description 管理员信息管理
 * @author
 * @date 2022年2月2日
 * @version V1.0
 */
var userinfoStore;

function userinfoList(node)
{
	//分页数量
	var _pageSize=15;

	//Record定义记录结果
	var userinfo=Ext.data.Record.create([
		{name:'userinfo_id',type:'string',mapping:'userinfoId'},
		{name:'username',type:'string',mapping:'username'},
		{name:'password',type:'string',mapping:'password'},
		{name:'truename',type:'string',mapping:'truename'},
		{name:'phone',type:'string',mapping:'phone'},
		{name:'power',type:'string',mapping:'power'},
		{name:'position_name',type:'string',mapping:'position.positionName'},
		{name:'position_id',type:'string',mapping:'position.positionId'},
		{name:'department_name',type:'string',mapping:'department.departmentName'},
		{name:'department_id',type:'string',mapping:'department.departmentId'}
	]);

	userinfoStore=new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({
			url:path+'userinfo/findAll',
			method:'post',
			limitParam:"pageSize",
			startParam:"start"
		}),
		reader:new Ext.data.JsonReader({
			root:'data',
			id:'id',
			totalProperty:'totalSize'
		},userinfo)
	});
	//列选择模式
	var sm=new Ext.grid.CheckboxSelectionModel({dataIndex:'userinfo_id'});
	//列头
	var cm=new Ext.grid.ColumnModel([
		sm,
		{
			header:'用户编号',
			dataIndex:'userinfo_id',
			align:'center'
		},
		{
			header:'账号',
			dataIndex:'username',
			align:'center'
		},
		{
			header:'密码',
			dataIndex:'password',
			align:'center',
			// hidden: true
		},
		{
			header:'真实姓名',
			dataIndex:'truename',
			align:'center',
			hidden: true
		},
		{
			header:'联系电话',
			dataIndex:'phone',
			align:'center',
			hidden: true
		},
		{
			header:'权限',
			dataIndex:'power',
			align:'center',
			renderer:function(v){
				if(v==2)
				{return "用户";}
				else if(v==1){return "<font color='blue'>管理员</font>";}
			}
		},
		{
			header:'部门名称',
			hidden: true,
			dataIndex:'department_name',
			renderer:function (value, cellmeta, record) {
				return value;
			}
		},
		{
			header:'职务名称',
			hidden: true,
			dataIndex:'position_name'
		},{header:'职务编号',dataIndex:'position_id',hidden:true},
		{header:'部门编号',dataIndex:'department_id',hidden:true}
	]);
	//用户grid
	var userinfoGrid=new Ext.grid.GridPanel({
		id:'userinfoGrid',
		store:userinfoStore,
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
			store:userinfoStore,
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
		tbar:["->",{xtype:'tbspacer',width:105},'账户查询：',
			{
				xtype: 'textfield',
				name:'searchUsername',
				id:'searchUsername',
				emptyText: '输入账号',
				width:90
			},
			{
				text:'搜索',
				iconCls:'search',
				handler:function(){userinfoSearch();},
				scope:this
			},'-',
			{
				text:'添加',
				iconCls:'menu-add',
				handler:function(){userinfoAdd();},
				scope:this
			},'-',
			{
				text:'修改',
				iconCls:'btn-edit',
				handler:function(){
					var selRow=Ext.getCmp("userinfoGrid").getSelectionModel();
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
						userinfoEdit(record);
					}

				},
				scope:this
			},'-',
			{
				text:'删除',
				iconCls:'btn-delete',
				scope:this,
				handler:function(){
					userinfoDelete();
				}
			},'-',
			{
				text:'刷新',
				iconCls:'btn-refresh',
				scope:this,
				handler:function(){userinfoStore.reload();}
			}
		]
	});
	//加载时参数
	userinfoStore.load({params:{start:0,limit:_pageSize}});
	GridMain(node,userinfoGrid,node.attributes.iconCls);
};

//根据提供的条件查询数据
function userinfoSearch()
{
	//分页数量
	let pageSize=15;
	let searchUsername=Ext.getCmp("searchUsername").getValue();

	userinfoStore.proxy=new Ext.data.HttpProxy({
		url:path+'userinfo/findAll',
		method:'post'
	});
	userinfoStore.load({
		params:{start:0,limit:pageSize,username:searchUsername},
		callback:function(r,options,success)
		{
			if(!success){
				Ext.Msg.alert("提示","数据加载失败!")
			}else{
			}
		}
	});
}


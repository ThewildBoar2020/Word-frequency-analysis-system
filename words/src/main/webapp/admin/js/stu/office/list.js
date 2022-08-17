/**   
* @Title: office/list.js
* @Package null 
* @Description 考勤信息管理
* @author 
* @date 2020-01-27 12:10:33
* @version V1.0   
*/
var officeStore;

function officeList(node)
{
	//分页数量
	var _pageSize=15;

	//Record定义记录结果
	var office=Ext.data.Record.create([
		{name:'office_id',type:'string',mapping:'officeId'},
		{name:'userInfo_id',type:'string',mapping:'userInfo.userinfoId'},
		{name:'userInfo_name',type:'string',mapping:'userInfo.truename'},
		{name:'department_name',type:'string',mapping:'userInfo.department.departmentName'},
		{name:'course_id',type:'string',mapping:'course.courseId'},
		{name:'course_name',type:'string',mapping:'course.courseName'},
		{name:'officeDatetime',type:'string',mapping:'officeDatetime'},
		{name:'addDatetime',type:'string',mapping:'addDatetime'},
		{name:'is_deleted',type:'string',mapping:'is_deleted'}
	]);
		
	officeStore=new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({
			url:path+'office/findAll',
			method:'post',
			limitParam: "pageSize",
			startParam: "start"
		}),
		reader:new Ext.data.JsonReader({
			root:'data',
			id:'id',
			totalProperty:'totalSize'
		},office)
	});
	//列选择模式
	var sm=new Ext.grid.CheckboxSelectionModel({dataIndex:'office_id'});
	//列头
	var cm=new Ext.grid.ColumnModel([
		sm,
		{
			header:'编号',
			dataIndex:'office_id',
			hidden:false,
			align:'center'
		},
		{
			header:'学生姓名',
			dataIndex:'userInfo_name',
			align:'center'
		},
		{
			header:'部门',
			dataIndex:'department_name',
			align:'center'
		},
		{
			header:'课程名称',
			dataIndex:'course_name',
			align:'center'
		},
		{
			header:'签到时间',
			dataIndex:'officeDatetime',
			align:'center'
		},
		{
			header:'签到日期',
			dataIndex:'addDatetime',
			align:'center'
		}
	]);
	//用户grid
	var officeGrid=new Ext.grid.GridPanel({
		id:'officeGrid',
		store:officeStore,
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
			store:officeStore,
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
				id:'osearchTrueName',
				emptyText: '输入用户姓名',
				width:90
			},
			{
				text:'搜索',
				iconCls:'search',
				handler:function(){officeSearch();},
				scope:this
			},'-',
			{
				text:'删除',
				id:'officeGrid_btn_del',
				iconCls:'btn-delete',
				scope:this,
				handler:function(){
					officeDelete();
				}
			},'-',
			{
				text:'刷新',
				iconCls:'btn-refresh',
				scope:this,
				handler:function(){officeStore.reload();}
			}
		]
	});
	//加载时参数
	officeStore.load({params:{start:0,limit:_pageSize}});
	GridMain(node,officeGrid,node.attributes.iconCls);
	setReadOnlyUser("officeGrid");
};

//根据提供的条件查询数据
function officeSearch()
{
	//分页数量
	let pageSize=15;
	let searchTrueName=Ext.getCmp("osearchTrueName").getValue();

	officeStore.proxy=new Ext.data.HttpProxy({
		url:path+'office/findAll',
		method:'post'
	});
	officeStore.load({
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
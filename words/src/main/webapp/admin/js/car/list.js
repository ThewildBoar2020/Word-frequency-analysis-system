var carStore;

function carList(node)
{
	//分页数量
	var _pageSize=35;

	//Record定义记录结果
	var car=Ext.data.Record.create([
		{name:'car_id',type:'string',mapping:'carId'},
		{name:'concern_id',type:'string',mapping:'concernId'},
		{name:'car_name',type:'string',mapping:'carName'},
		{name:'dealer_max_price',type:'string',mapping:'dealerMaxPrice'},
		{name:'dealer_min_price',type:'string',mapping:'dealerMinPrice'},
		{name:'max_price',type:'string',mapping:'maxPrice'},
		{name:'min_price',type:'string',mapping:'minPrice'},
		{name:'dealer_price',type:'string',mapping:'dealerPrice'},
		{name:'cover_img',type:'string',mapping:'coverImg'},
		{name:'comment_num',type:'string',mapping:'commentNum'},
		{name:'comment_result',type:'string',mapping:'commentResult'},
		{name:'score',type:'string',mapping:'score'},
		{name:'rank_tips',type:'string',mapping:'rankTips'},
		{name:'wg_score',type:'string',mapping:'wgScore'},
		{name:'ns_score',type:'string',mapping:'nsScore'},
		{name:'pz_score',type:'string',mapping:'pzScore'},
		{name:'kj_score',type:'string',mapping:'kjScore'},
		{name:'ck_score',type:'string',mapping:'ckScore'},
		{name:'dl_score',type:'string',mapping:'dlScore'}
	]);
		
	carStore=new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({
			url:path+'car/findAll',
			method:'post',
			limitParam: "pageSize",
			startParam: "start"
		}),
		reader:new Ext.data.JsonReader({
			root:'data',
			id:'id',
			totalProperty:'totalSize'
		},car)
	});
	//列选择模式
	var sm=new Ext.grid.CheckboxSelectionModel({dataIndex:'id'});
	//列头
	var cm=new Ext.grid.ColumnModel([
		sm,
		{
			header:'编号',
			dataIndex:'car_id',
			align:'center'
		},
		{
			header:'懂车帝车辆编号',
			dataIndex:'concern_id',
			hidden:true,
			align:'center'
		},
		{
			header:'名称',
			dataIndex:'car_name',
			align:'center'
		},
		{
			header:'最高价',
			dataIndex:'max_price',
			align:'center'
		},
		{
			header:'最低价',
			dataIndex:'min_price',
			align:'center'
		},
		{
			header:'官方指导价',
			dataIndex:'dealer_price',
			align:'center'
		},
		{
			header:'官方指导价',
			dataIndex:'dealer_price',
			align:'center'
		},
		{
			header:'图片',
			dataIndex:'cover_img',
			align:'center',
			renderer:function (v) {
				return "<img src="+v+" width='30'/>"
			}
		},
		{
			header:'评价人数',
			dataIndex:'comment_num',
			align:'center'
		},
		{
			header:'结果',
			dataIndex:'comment_result',
			align:'center'
		},
		{
			header:'综合得分',
			dataIndex:'score',
			align:'center'
		},
		{
			header:'排名描述',
			dataIndex:'rank_tips',
			align:'center'
		},
		{
			header:'外观',
			dataIndex:'wg_score'
		},
		{
			header:'内饰',
			dataIndex:'ns_score'
		},
		{
			header:'配置',
			dataIndex:'pz_score'
		},
		{
			header:'控件',
			dataIndex:'kj_score'
		},
		{
			header:'操控',
			dataIndex:'ck_score'
		},
		{
			header:'动力',
			dataIndex:'dl_score'
		}
	]);
	//用户grid
	var carGrid=new Ext.grid.GridPanel({
		id:'carGrid',
		store:carStore,
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
			store:carStore,
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
		tbar:["->",{xtype:'tbspacer',width:105},'车辆名称：',
			{
				xtype: 'textfield',
				name:'searchName',
				id:'searchName',
				emptyText: '请输入车辆名称',
				width:90
			},
			{
				text:'搜索',
				iconCls:'search',
				handler:function(){carSearch();},
				scope:this
			},'-',
			{
				text:'删除',
				iconCls:'btn-delete',
				scope:this,
				handler:function(){
					carDelete();
				}
			},'-',
			{
				text:'刷新',
				iconCls:'btn-refresh',
				scope:this,
				handler:function(){carStore.reload();}
			}
		]
	});
	//加载时参数
	carStore.load({params:{start:0,limit:_pageSize}});
	GridMain(node,carGrid,node.attributes.iconCls);
};

//根据提供的条件查询数据
function carSearch()
{
	//分页数量
	let pageSize=35;
	let searchPhone=Ext.getCmp("searchName").getValue();

	carStore.proxy=new Ext.data.HttpProxy({
		url:path+'car/findAll',
		method:'post'
	});
	carStore.load({
		params:{start:0,limit:pageSize,carName:searchPhone},
		callback:function(r,options,success)
		{
			if(!success){
				Ext.Msg.alert("提示","数据加载失败!")
			}else{
			}
		}
	});
}

function barChart() {
	var win=new Ext.Window({
		title:'得分排名',
		modal:true,
		iconCls:'menu-public-fol',
		width:800,
		height:680,
		autoScroll:true,
		items:[{
			xtype:"panel",
			id:"index",
			iconCls:"menu-news",
			html:"<iframe src='"+path+"jsp/bar.jsp'scrolling='yes' frameborder=0 width=98% height=98%></iframe>"
		}]
	});
	win.show();
}

function pieChart() {
	var win=new Ext.Window({
		title:'医生人数分布',
		modal:true,
		iconCls:'menu-public-fol',
		width:800,
		height:680,
		autoScroll:true,
		items:[{
			xtype:"panel",
			id:"index",
			iconCls:"menu-news",
			html:"<iframe src='"+path+"jsp/pie.jsp'scrolling='yes' frameborder=0 width=98% height=98%></iframe>"
		}]
	});
	win.show();
}
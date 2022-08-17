/**系统主页面**/
/**第一个面板树节点start**/
var systemRoot=new Ext.tree.TreeNode({
	id:"systemRoot",
	leaf:false
});
var positionManager=new Ext.tree.TreeNode({
	id:"positionManager",
	text:"职务管理",
	iconCls:"menu-role",
	leaf:true
});
var departmentManager=new Ext.tree.TreeNode({
	id:"departmentManager",
	text:"部门管理",
	iconCls:"menu-system-setting",
	leaf:true
});
var userinfoManager=new Ext.tree.TreeNode({
	id:"userinfoManager",
	text:"用户目录",
	iconCls:"menu-job",
	leaf:true
});
systemRoot.appendChild([userinfoManager]);

//========cms管理start===========//
var cmsRoot=new Ext.tree.TreeNode({
	id:"cmsRoot",
	leaf:false
});
var channelManager=new Ext.tree.TreeNode({
	id:"channelManager",
	text:"栏目设置",
	iconCls:"",
	leaf:true
});
var articleManager=new Ext.tree.TreeNode({
	id:"articleManager",
	text:"内容管理与分析",
	iconCls:"",
	leaf:true
});
var articleManagerAdd=new Ext.tree.TreeNode({
	id:"articleManagerAdd",
	text:"文章添加",
	iconCls:"",
	leaf:true
});
var fileManager=new Ext.tree.TreeNode({
	id:"fileManager",
	text:"文件管理",
	iconCls:"",
	leaf:true
});


if (userpower==1)
{
	cmsRoot.appendChild([channelManager]);
}
else
{
	cmsRoot.appendChild([articleManager,articleManagerAdd]);
}

var cmsPanel=new Ext.tree.TreePanel({
	title:"文本管理",
	iconCls:'online-user',
	rootVisible: false,
	border:false,
	listeners:{
		click:function(n){
			var nodeId=n.attributes.id;
			var url=n.attributes.url;
			if(nodeId)
			{
				if(centerPanel.getItem(nodeId))
				{
					centerPanel.setActiveTab(nodeId);
				}
				else
				{
					if(nodeId=="channelManager")
					{
						channelList(n);
					}
					else if(nodeId=="articleManager")
					{
						articleList(n);
					}
					else if(nodeId=="articleManagerAdd"){
						articleAdd(n)
					}
					else if(nodeId=="fileManager"){
						contentList(n)
					}
				}
			}
		}
	}
});
cmsPanel.setRootNode(cmsRoot);
//========cms管理end===========//

var personalRoot=new Ext.tree.TreeNode({
	id:"personalRoot",
	leaf:false
});
var personalInfo=new Ext.tree.TreeNode({
	id:"personalRoot_1",
	text:"我的信息",
	iconCls:"menu-hireIssue",
	url:'person.jsp'
});
var passwordModify=new Ext.tree.TreeNode({
	id:"personalRoot_2",
	text:"密码修改",
	iconCls:"menu-personal-doc",
	url:'person.jsp'
});
/**第六个面板节点end**/
var settingPanel=new Ext.tree.TreePanel({
	title:"用户管理",
	id:'settingPanel',
	rootVisible: false,
	iconCls:"menu-company",
	border:false,
	listeners:{
		click:function(n){
			var nodeId=n.attributes.id;
			var url=n.attributes.url;
			if(n.isLeaf())
			{
				if(centerPanel.getItem(nodeId))			//已打开激活
				{
					centerPanel.setActiveTab(nodeId);
				}
				else									//打开一个新面板
				{
					if(nodeId=="departmentManager")
					{
						departmentList(n);
					}
					else if(nodeId=="userinfoManager")
					{
						userinfoList(n);
					}
					else if(nodeId=="positionManager")
					{
						positionList(n);
					}
					else if(nodeId=="carManager")
					{
						carList(n);
					}
					else{}
				}
			}
		}
	}
});
settingPanel.setRootNode(systemRoot);
//settingPanel.expandAll();
personalRoot.appendChild([personalInfo,passwordModify]);
var personalPanel=new Ext.tree.TreePanel({
	title:"个人信息管理",
	iconCls:'online-user',
	rootVisible: false,
	border:false,
	listeners:{
		click:function(n){
			var nodeId=n.attributes.id;
			var url=n.attributes.url;
			if(url)
			{
				if(centerPanel.getItem(nodeId))
				{
					centerPanel.setActiveTab(nodeId);
				}
				else
				{
					if(nodeId=="personalRoot_1")
					{
						personalInfoManager(n);
					}
					else if(nodeId=="personalRoot_2")
					{
						passwordModifyManager();
					}
				}
			}
		}
	}
});
personalPanel.setRootNode(personalRoot);
var topPanel = new Ext.Panel({
	region:"north",
	border:true,
	tbar:[{
		text:'文本大数据词频分析系统'
	}]
});
let a;
if (userpower==1)
{
	a=[settingPanel,cmsPanel,personalPanel]
}
else
{
	a=[cmsPanel,personalPanel]
}

var leftPanel=new Ext.Panel({
	region:"west",
	width:"160",
	margins:'5 0 5 5',
	title:"系统导航",
	iconCls:"menu-navigation",
	split:true,
	collapseMode:'mini',
	collapsible:true,
	layout:'accordion',
	items:a
});


let portalNotice = {
	title:"英文词频",
	iconCls:'menu-chart-bar',
	id:'alarmInfo',
	height:560,
	html:'<div id="palarmcon" style="min-width:290px;height:560px"></div>',
	tools:[{id:"refresh"},{id:"close"}],
	listeners:{'afterrender':function(){}
	}
};
let portalNotice1 = {
	title:"系统词云概览",
	iconCls:'menu-navigation',
	id:'alarmInfo1',
	height:800,
	html:'<div id="palarmcon1" style="min-width:1400px;height:800px"></div>',
	tools:[{id:"refresh"},{id:"close"}],
	listeners:{'afterrender':function(){}
	}
};
let portalNotice2 = {
	title:"占比",
	iconCls:'menu-chart-bar',
	id:'alarmInfo2',
	height:260,
	html:'<div id="palarmcon2" style="min-width:290px;height:240px"></div>',
	tools:[{id:"refresh"},{id:"close"}],
	listeners:{'afterrender':function(){}
	}
};
/**中间面板**/
var centerPanel=new Ext.TabPanel({
	region:"center",
	margins:'5 5 5 0',
	items:[{
		id:"desktop",
		title:"桌面",
		iconCls:"menu-destop",
		tbar:["->",{text:"刷新",iconCls:"btn-refresh"}],
		xtype:"portal",
		items: [
			{ columnWidth: 1, items: [{
					html:'文本大数据词频分析系统1.0'
				}], style: 'padding:10px 0 5px 10px' },
			{ columnWidth: .5, items: [], style: 'padding:0px 0 10px 10px'},
			{ columnWidth: .5, items: [], style: 'padding:0px 0 10px 10px'}]
	}
	],
	activeItem:0

});
/**底部面板**/
var southPanel=new Ext.Panel({
	region : "south",
	height : 28,
	border : false,
	bbar:[
		{
			text : "退出系统",
			iconCls : "btn-logout",
			handler:function(){
				window.location.href=path+'jsp/loginOut.jsp';
			}
		},
		{xtype : "tbfill"},
		{
			xtype : "tbtext",
			text : "您好,"+username,
			id : "toolbarCompanyName"
		}
	]
});
/** 初始化界面* */
function init()
{
	var vp=new Ext.Viewport({
		layout:"border",
		items:[topPanel,leftPanel,centerPanel,southPanel]
	});
	hideMask.defer(500);
	showIndexChart()
}
/**隐藏加载图片**/
function hideMask()
{
	Ext.get('loading').remove();
	Ext.fly('loading-mask').fadeOut({
		remove:true
	});
}
Ext.onReady(init);


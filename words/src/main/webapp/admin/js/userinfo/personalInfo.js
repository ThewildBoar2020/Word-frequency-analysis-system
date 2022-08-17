/**
 * @Title: personalInfo
 * @Package null
 * @Description 管理员信息
 * @author
 * @date 2015年3月14日
 * @version V1.0
 */
function personalInfoManager(node)
{
	var p = new Ext.form.FormPanel({
		border:false,
		bodyStyle:'padding:5px 5px 0',
		width:400,
		height:200,
		tbar:['->',{text:'修改密码',iconCls:"menu-personal-doc",handler:function(){passwordModifyManager();},scope:this}],
		items:[{
			xtype:'fieldset',
			title:'个人信息',
			defaultType: 'textfield',
			labelAlign:"right",
			labelWidth : 85,
			items:[{
				xtype:'textfield',
				id:'persUsername',
				fieldLabel:'登录账号',
				width:150
			},{
				xtype:'textfield',
				id:'persPower',
				fieldLabel:'权限',
				width:150
			}]
		}]
	});

	Ext.Ajax.request({
		url:path+'userinfo/findById',
		params:{userinfoId:userInfoId},
		method:'post',
		success: function(resp,opts) {
			console.log("ssss")
			var respText = Ext.util.JSON.decode(resp.responseText);
			Ext.getCmp("persUsername").setValue(respText.data.username);
			Ext.getCmp("persPower").setValue((respText.data.power==1)?"管理员":"用户");
		},
		failure: function(resp,opts) {
			var respText = Ext.util.JSON.decode(resp.responseText);
			Ext.Msg.alert('错误',"个人信息获取失败!");
		}
	});

	GridMain(node,p,node.attributes.iconCls);
}

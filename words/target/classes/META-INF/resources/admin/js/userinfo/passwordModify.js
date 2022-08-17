/**   
* @Title: passwordModify.js 
* @Package null 
* @Description 密码修改
* @author 
* @date 2015年3月14日 
* @version V1.0   
*/
function passwordModifyManager()
{
	var passwordModifyPanel=new Ext.form.FormPanel({
		bodyStyle:'padding:5px 5px 0',
		border:false,
		id:'passModifyPanel',
		items:[{
			xtype:'fieldset',
			title:'密码修改',
			defaultType: 'textfield',
			labelAlign:"right",
			labelWidth : 85,
			items:[{
				fieldLabel:'原密码',
				id:'oldPassword',
				name:'oldPassword',
				inputType : 'password',
				allowBlank : false,
				blankText : '原密码不能为空'
			},{
				fieldLabel:'新密码',
				id:'newPassword',
				name:'newPassword',
				inputType : 'password',
				allowBlank : false,
                blankText : '新密码不能为空'
			},{
				fieldLabel:'确认新密码',
				id:'confirmPassword',
				name:'confirmPassword',
				inputType : 'password',   
				allowBlank : false,
                blankText : '确认密码不能为空'
			}]
		}]
	});
	var passwordModifyWin=new Ext.Window({
		title:'密码修改',
		iconCls:'',
		modal:true,
		width:300,
		height:200,
		layout:'fit',
		items:[passwordModifyPanel],
		buttons:[{
			text:'保存',
			iconCls:"btn-save",
			scope:this,
			handler:function(){savePassword()}
		},{
			text:'取消',
			iconCls:"btn-cancel",
			scope:this,
			handler:function(){passwordModifyWin.close();}
		}]
	});
	
	function savePassword()
	{
		var newPassword=Ext.getCmp("newPassword").getValue();
		var confirmPassword=Ext.getCmp("confirmPassword").getValue();
		if(newPassword!=confirmPassword)
		{
			Ext.Msg.alert("提示","两次输入的密码不一致!");
			return;
		}
		else
		{
			if(passwordModifyPanel.form.isValid())
			{
				passwordModifyPanel.form.submit({
					waitTitle:"请稍后...",
					waitMsg:"正在提交......",
					url:path+"userinfo/modifyPassword",
					success:function(g,a)
					{
						Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.INFO});
						passwordModifyWin.close();
					},
					failure:function(g,a)
					{
						Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
					}
				});
			}
		}
	}
	
	passwordModifyWin.show();
}

/**
 * @Title: userinfoAdd
 * @Package null
 * @Description 管理员信息添加
 * @author
 * @date 2022年2月2日
 * @version V1.0
 **/
// 复选框
function userinfoAdd()
{
	var userinfoAddForm=new Ext.form.FormPanel({
		border:false,
		padding:'8 8 8 8',
		border:false,
		layout:'form',
		labelAlign:"right",
		labelWidth : 75,
		items:[{
			xtype:'fieldset',
			title:'基本信息',
			items:[{
				layout:'column',				//第一行
				border:false,
				items:[{
					columnWidth:0.5,
					layout:'form',
					border:false,
					items:[{
						xtype:'textfield',
						name:'username',
						id:'username',
						fieldLabel:'登录账号',
						allowBlank:false,
						blankText:'请输入登录账号'
					}]
				},{
					columnWidth:0.5,
					layout:'form',
					border:false,
					items:[{
						xtype:'textfield',
						name:'password',
						id:'password',
						inputType : 'password',
						fieldLabel:'登录密码',
						allowBlank:false,
						blankText:'请输入密码'
					}]
				}]
			},{
				layout:'column',				//第三行
				border:false,
				items:[{
					columnWidth:0.8,
					layout:'form',
					border:false,
					items:[{
						xtype:'radiogroup',
						name:'_power',
						id:'_power',
						fieldLabel:'权限',
						items:[{
							boxLabel:'用户',
							name:'power',
							inputValue:'2',
							checked:true
						},{
							boxLabel:'管理员',
							name:'power',
							inputValue:'1'
						}/*,{
							boxLabel:'高级管理员',
							inputValue:'1',
							name:'power'
						}*/],
						/*listeners:{
							'change':function (group,checked) {
								if(checked.inputValue!=3) {
									Ext.getCmp("departmentId").setValue(20);
									Ext.getCmp("departmentId").setRawValue("---");
								}
							}
						}*/
					}]
				},{
					columnWidth:0.5,
					layout:'form',
					border:false,
					hidden:true,
					items:[{
						xtype:'combo',
						name:'departmentId',
						id:'departmentId',
						fieldLabel:'所属部门<font color=red>*</font>',
						width:130,
						allowBlank:true,
						hiddenName:'departmentId',
						blankText:'请输入部门',
						emptyText:'请输入部门',
						mode:'remote',
						triggerAction:'all',
						store:new Ext.data.JsonStore({
							url:path+'department/findAll',
							root:'data',
							fields:['departmentId','departmentName']
						}),
						displayField:'departmentName',
						valueField:'departmentId',
						listeners:{
							afterRender:function(c){
								c.setValue(13);
							}
						}
					}]
				}]
			},{
				columnWidth:0.5,
				layout:'form',
				border:false,
				hidden:true,
				items:[{
					xtype:'combo',
					name:'positionId',
					fieldLabel:'职务名称<font color=red>*</font>',
					width:130,
					allowBlank:true,
					hiddenName:'positionId',
					blankText:'请输入职务',
					mode:'remote',
					triggerAction:'all',
					store:new Ext.data.JsonStore({
						url:path+'position/findAll',
						root:'data',
						fields:['positionId','positionName']
					}),
					displayField:'positionName',
					valueField:'positionId',
					listeners:{
						afterRender:function(c){
							c.setValue(1);
						}
					}
				}]
			}]
		}]
	});

	var userinfoAddWin=new Ext.Window({
		title:'用户添加',
		modal:true,
		iconCls:'menu-public-fol',
		width:600,
		height:255,
		items:[userinfoAddForm],
		buttons:[{
			text:'保存',
			iconCls:'btn-save',
			handler:function(){
				userinfoAddWinSubmit();
			}
		},{
			text:'取消',
			iconCls:'btn-cancel',
			handler:function(){
				userinfoAddWin.close();
			}
		}]
	});

	//提交表单
	function userinfoAddWinSubmit()
	{
		if(userinfoAddForm.form.isValid())
		{
			userinfoAddForm.form.submit({
				waitTitle:"请稍后...",
				waitMsg:"正在提交......",
				url:path+"userinfo/add",
				success:function(g,a)
				{
					Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.INFO});
					userinfoAddWin.close();
					userinfoStore.reload();
				},
				failure:function(g,a)
				{
					Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
				}
			});
		}
	}

	userinfoAddWin.show();
}
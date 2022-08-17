/**
 * @Title: userinfoAdd
 * @Package null
 * @Description 管理员信息编辑
 * @author
 * @date 2022年2月2日
 * @version V1.0
 **/
function userinfoEdit(record)
{
	var userinfoEditForm=new Ext.form.FormPanel({
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
						name:'userinfoId',
						id:'userinfoId',
						hidden: true,
						hideLabel:true,
						value:record.get("userinfo_id")
					},{
						xtype:'textfield',
						name:'username',
						id:'username',
						fieldLabel:'登录账号',
						allowBlank:false,
						blankText:'请输入登录账号',
						value:record.get("username")
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
						value:record.get("password"),
						blankText:'请输入密码'
					}]
				}]
			},{
				//第二行
				layout:'column',
				border:false,
				hidden:true,
				items:[{
					columnWidth:0.5,
					layout:'form',
					border:false,
					items:[{
						xtype:'textfield',
						name:'phone',
						id:'phone',
						fieldLabel:'联系电话',
						allowBlank:true,
						blankText:'请输入联系电话',
						value:record.get("phone")
					}]
				},{
					columnWidth:0.5,
					layout:'form',
					border:false,
					items:[{
						xtype:'textfield',
						name:'truename',
						id:'truename',
						fieldLabel:'真实姓名',
						allowBlank:true,
						blankText:'请输入真实姓名',
						value:record.get("truename")
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
						fieldLabel:'系统角色',
						items:[/*{
							boxLabel:'普通',
							name:'power',
							inputValue:'3',
							checked:true
						},*/{
							boxLabel:'用户',
							name:'power',
							inputValue:'2'
						},{
							boxLabel:'管理员',
							inputValue:'1',
							name:'power'
						}],
						listeners:{
							'afterrender':function(){Ext.getCmp("_power").setValue(record.get("power"));},
							'change':function (group,checked) {
								if(checked.inputValue!=3) {
									//Ext.getCmp("departmentId").setValue(20);
									//Ext.getCmp("departmentId").setRawValue("---");
								}
							}
						}
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
						mode:'remote',
						triggerAction:'all',
						store:new Ext.data.JsonStore({
							url:path+'department/findAll',
							root:'data',
							fields:['departmentId','departmentName']
						}),
						displayField:'departmentName',
						valueField:'departmentId',
						//readOnly:true,
						listeners:{
							afterRender:function(c){
								//c.setValue(record.get("department_id"));
								//c.setRawValue(record.get("department_name"));
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
							// c.setValue(record.get("position_id"));
							// c.setRawValue(record.get("position_name"));
							c.setValue(1);
						}
					}
				}]
			}]
		}]
	});

	var userinfoEditWin=new Ext.Window({
		title:'员工修改',
		modal:true,
		iconCls:'menu-public-fol',
		width:560,
		height:245,
		items:[userinfoEditForm],
		buttons:[{
			text:'保存',
			iconCls:'btn-save',
			handler:function(){
				userinfoEditWinSubmit();
			}
		},{
			text:'取消',
			iconCls:'btn-cancel',
			handler:function(){
				userinfoEditWin.close();
			}
		}]
	});

	//提交表单
	function userinfoEditWinSubmit()
	{
		if(userinfoEditForm.form.isValid())
		{
			userinfoEditForm.form.submit({
				waitTitle:"请稍后...",
				waitMsg:"正在提交......",
				url:path+"userinfo/edit",
				success:function(g,a)
				{
					Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.INFO});
					userinfoEditWin.close();
					userinfoStore.reload();
				},
				failure:function(g,a)
				{
					Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
				}
			});
		}
	}

	userinfoEditWin.show();
}
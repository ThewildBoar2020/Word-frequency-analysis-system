/**   
* @Title: rewardPunish/add
* @Package null 
* @Description 奖惩添加
* @author 
* @date 2020-01-27 14:02:44
* @version V1.0   
**/ 
function rewardPunishAdd()
{
	var rewardPunishAddForm=new Ext.form.FormPanel({
		border:false,
 		padding:'8 8 8 8',
		border:false,
		layout:'form',
		labelAlign:"right",
		labelWidth : 75,
		items:[
			{
			xtype:'fieldset',			
			title:'基本信息',
			items:[
				{
				layout:'column',				//第一行
				border:false,
				items:[{
					columnWidth:1,
					layout:'form',
					border:false,
					items:[{
						xtype:'combo',
						name:'userinfoId',
						fieldLabel:'员工姓名<font color=red>*</font>',
						allowBlank:false,
						blankText:'请输入员工姓名',
						emptyText:'员工姓名',
						width:400,
						hiddenName:'userinfoId',
						mode:'remote',
						triggerAction:'all',
						store:new Ext.data.JsonStore({
							url:path+'userinfo/findAll',
							root:'data',
							fields:['userinfoId','truename']
						}),
						displayField:'truename',
						valueField:'userinfoId',
						listeners:{
							afterRender:function(c){
								//c.setValue(1);
							}
						}
					}]
				}]
			},
				{
												//第二行
				layout:'column',
				border:false,
				items:[{
					columnWidth:1,
					layout:'form',
					border:false,
					items:[{
						xtype:'combo',
						name:'typeName',
						id:'typeName',
						fieldLabel:'奖惩类别<font color=red>*</font>',
						allowBlank:false,
						width:400,
						hiddenName:'typeName',
						blankText:'请输入奖惩类别',
						emptyText:"请选择奖惩类别",
						mode:'local',
						triggerAction:'all',
						store:new Ext.data.ArrayStore({
							fields:['rp_typeId','rp_typeName'],
							data:[['奖励','奖励'],['惩罚','惩罚']]
						}),
						valueField:'rp_typeId',
						displayField:'rp_typeName'
					}]
				}]
			},
				{
				layout:'column',				//第三行
				border:false,
				items:[{
					columnWidth:1,
					layout:'form',
					border:false,
					items:[{
						xtype:'textarea',
						name:'remark',
						id:'rp_remark',
						fieldLabel:'奖惩依据<font color=red>*</font>',
						allowBlank:false,
						width:400,
						emptyText:"请输入奖惩依据",
						blankText:'请输入奖惩依据'
					}]
				}]
			}]
		}]
	});
	var rewardPunishAddWin=new Ext.Window({
		title:'奖惩添加',
		modal:true,
		iconCls:'menu-public-fol',
		width:560,
		height:245,
		items:[rewardPunishAddForm],
		buttons:[{
			text:'保存',
			iconCls:'btn-save',
			handler:function(){
				rewardPunishAddWinSubmit();
			}
		},{
			text:'取消',
			iconCls:'btn-cancel',
			handler:function(){
				rewardPunishAddWin.close();
			}
		}]
	});
	
	//提交表单
	function rewardPunishAddWinSubmit()
	{
		if(rewardPunishAddForm.form.isValid())
		{
			rewardPunishAddForm.form.submit({
				waitTitle:"请稍后...",
				waitMsg:"正在提交......",
				url:path+"rewardPunishLog/add",
				success:function(g,a)
				{
					Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.INFO});
					rewardPunishAddWin.close();
					rewardPunishStore.reload();
				},
				failure:function(g,a)
				{
					Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
				}
			});
		}
	}
	rewardPunishAddWin.show();
}
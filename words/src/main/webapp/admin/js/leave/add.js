/**   
* @Title: leave/add
* @Package null 
* @Description 请假信息添加
* @author 
* @date 2020-01-27 14:02:44
* @version V1.0   
**/ 
function leaveAdd()
{
	var leaveAddForm=new Ext.form.FormPanel({
		border:false,
 		padding:'8 8 8 8',
		border:false,
		layout:'form',
		labelAlign:"right",
		labelWidth : 90,
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
						fieldLabel:'用户姓名<font color=red>*</font>',
						allowBlank:false,
						blankText:'请输入用户姓名',
						emptyText:'用户姓名',
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
					columnWidth:0.5,
					layout:'form',
					border:false,
					items:[{
						xtype:'datefield',
						name:'startDate',
						id:'lstartDate',
						fieldLabel:'请假开始时间<font color=red>*</font>',
						allowBlank:false,
						width:130,
						format:'Y-m-d',
						emptyText:"请假开始时间",
						blankText:'请假开始时间'
					}]
				},{
					columnWidth:0.5,
					layout:'form',
					border:false,
					items:[{
						xtype:'datefield',
						name:'endDate',
						id:'wendDate',
						fieldLabel:'请假截止时间<font color=red>*</font>',
						allowBlank:false,
						width:130,
						format:'Y-m-d',
						emptyText:"请选择请假截止时间",
						blankText:'请输入请假截止时间'
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
						name:'reason',
						id:'wreason',
						fieldLabel:'请假原因<font color=red>*</font>',
						allowBlank:false,
						width:400,
						emptyText:"请输入请假原因",
						blankText:'请输入请假原因'
					}]
				}]
			}]
		}]
	});
	var leaveAddWin=new Ext.Window({
		title:'请假录入',
		modal:true,
		iconCls:'menu-public-fol',
		width:600,
		height:245,
		items:[leaveAddForm],
		buttons:[{
			text:'保存',
			iconCls:'btn-save',
			handler:function(){
				leaveAddWinSubmit();
			}
		},{
			text:'取消',
			iconCls:'btn-cancel',
			handler:function(){
				leaveAddWin.close();
			}
		}]
	});
	
	//提交表单
	function leaveAddWinSubmit()
	{
		if(leaveAddForm.form.isValid())
		{
			leaveAddForm.form.submit({
				waitTitle:"请稍后...",
				waitMsg:"正在提交......",
				url:path+"leave/add",
				success:function(g,a)
				{
					Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.INFO});
					leaveAddWin.close();
					leaveStore.reload();
				},
				failure:function(g,a)
				{
					Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
				}
			});
		}
	}
	leaveAddWin.show();
}
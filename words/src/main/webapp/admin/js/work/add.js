/**   
* @Title: work/add
* @Package null 
* @Description 加班信息添加
* @author 
* @date 2020-01-27 14:02:44
* @version V1.0   
**/ 
function workAdd()
{
	var workAddForm=new Ext.form.FormPanel({
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
					columnWidth:0.5,
					layout:'form',
					border:false,
					items:[{
						xtype:'datefield',
						name:'startDate',
						id:'wstartDate',
						fieldLabel:'加班开始时间<font color=red>*</font>',
						allowBlank:false,
						width:130,
						format:'Y-m-d',
						emptyText:"加班开始时间",
						blankText:'加班开始时间'
					}]
				},{
					columnWidth:0.5,
					layout:'form',
					border:false,
					items:[{
						xtype:'datefield',
						name:'endDate',
						id:'wendDate',
						fieldLabel:'加班截止时间<font color=red>*</font>',
						allowBlank:false,
						width:130,
						format:'Y-m-d',
						emptyText:"请选择加班截止时间",
						blankText:'请输入加班截止时间'
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
						fieldLabel:'加班原因<font color=red>*</font>',
						allowBlank:false,
						width:400,
						emptyText:"请输入加班原因",
						blankText:'请输入加班原因'
					}]
				}]
			}]
		}]
	});
	var workAddWin=new Ext.Window({
		title:'加班录入',
		modal:true,
		iconCls:'menu-public-fol',
		width:600,
		height:245,
		items:[workAddForm],
		buttons:[{
			text:'保存',
			iconCls:'btn-save',
			handler:function(){
				workAddWinSubmit();
			}
		},{
			text:'取消',
			iconCls:'btn-cancel',
			handler:function(){
				workAddWin.close();
			}
		}]
	});
	
	//提交表单
	function workAddWinSubmit()
	{
		if(workAddForm.form.isValid())
		{
			workAddForm.form.submit({
				waitTitle:"请稍后...",
				waitMsg:"正在提交......",
				url:path+"work/add",
				success:function(g,a)
				{
					Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.INFO});
					workAddWin.close();
					workStore.reload();
				},
				failure:function(g,a)
				{
					Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
				}
			});
		}
	}
	workAddWin.show();
}
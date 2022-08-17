/**
 * @Title: leave/edit
 * @Package null
 * @Description 请假信息修改
 * @author
 * @date 2020-01-27 14:02:44
 * @version V1.0
 **/
function leaveEdit(record)
{
	var leaveEditForm=new Ext.form.FormPanel({
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
								xtype:'textfield',
								name:'leaveId',
								id:'leaveId',
								hidden: true,
								hideLabel:true,
								value:record.get("leave_id")
							},{
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
										c.setValue(record.get("userInfo_id"));
										c.setRawValue(record.get("userInfo_name"));
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
								fieldLabel:'请假开始时间<font color=red>*</font>',
								allowBlank:false,
								width:130,
								format:'Y-m-d',
								value:record.get("start_date"),
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
								value:record.get("end_date"),
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
								value:record.get("reason"),
								emptyText:"请输入请假原因",
								blankText:'请输入请假原因'
							}]
						}]
					}]
			}]
	});
	var leaveEditWin=new Ext.Window({
		title:'请假修改',
		modal:true,
		iconCls:'menu-public-fol',
		width:600,
		height:245,
		items:[leaveEditForm],
		buttons:[{
			text:'保存',
			iconCls:'btn-save',
			handler:function(){
				leaveEditWinSubmit();
			}
		},{
			text:'取消',
			iconCls:'btn-cancel',
			handler:function(){
				leaveEditWin.close();
			}
		}]
	});

	//提交表单
	function leaveEditWinSubmit()
	{
		if(leaveEditForm.form.isValid())
		{
			leaveEditForm.form.submit({
				waitTitle:"请稍后...",
				waitMsg:"正在提交......",
				url:path+"leave/edit",
				success:function(g,a)
				{
					Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.INFO});
					leaveEditWin.close();
					leaveStore.reload();
				},
				failure:function(g,a)
				{
					Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
				}
			});
		}
	}
	leaveEditWin.show();
}
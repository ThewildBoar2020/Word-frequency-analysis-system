/**
 * @Title: contract/edit
 * @Package null
 * @Description 合同修改
 * @author
 * @date 2020-01-27 14:02:44
 * @version V1.0
 **/
function contractEdit(record)
{
	var contractEditForm=new Ext.form.FormPanel({
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
							columnWidth:0.5,
							layout:'form',
							border:false,
							items:[{
								xtype:'textfield',
								name:'contractId',
								id:'contractId',
								value:record.get("contract_id"),
								hidden: true,
								hideLabel:true
							},{
								xtype:'textfield',
								name:'contractNo',
								id:'contract_no',
								emptyText:'合同编号',
								value:record.get("contract_no"),
								fieldLabel:'合同编号<font color=red>*</font>',
								allowBlank:false,
								width:130,
								blankText:'请输入合同编号'
							}]
						},{
							columnWidth:0.5,
							layout:'form',
							border:false,
							items:[{
								xtype:'combo',
								name:'userinfoId',
								id:'userinfoId',
								fieldLabel:'员工姓名<font color=red>*</font>',
								allowBlank:false,
								blankText:'请输入员工姓名',
								emptyText:'员工姓名',
								width:130,
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
								id:'startDate',
								fieldLabel:'开始日期<font color=red>*</font>',
								allowBlank:false,
								width:130,
								format:'Y-m-d',
								value:record.get("start_date"),
								emptyText:"请选择开始日期",
								blankText:'请输入开始日期'
							}]
						},{
							columnWidth:0.5,
							layout:'form',
							border:false,
							items:[{
								xtype:'datefield',
								name:'endDate',
								id:'endDate',
								fieldLabel:'结束日期<font color=red>*</font>',
								allowBlank:false,
								width:130,
								format:'Y-m-d',
								value:record.get("end_date"),
								emptyText:"请选择结束日期",
								blankText:'请输入结束日期'
							}]
						}]
					},
					{
						layout:'column',				//第三行
						border:false,
						items:[{
							columnWidth:0.5,
							layout:'form',
							border:false,
							items:[{
								xtype:'datefield',
								name:'signDate',
								id:'signDate',
								fieldLabel:'签订日期<font color=red>*</font>',
								allowBlank:false,
								width:130,
								format:'Y-m-d',
								value:record.get("sign_date"),
								emptyText:"请选择签订日期",
								blankText:'请输入结束日期'
							}]
						},{
							columnWidth:0.5,
							layout:'form',
							border:false,
							items:[{
								xtype:'combo',
								name:'conState',
								id:'conState',
								fieldLabel:'合同状态<font color=red>*</font>',
								width:130,
								allowBlank:false,
								hiddenName:'conState',
								blankText:'请输入合同状态',
								emptyText:"请选择合同状态",
								mode:'local',
								triggerAction:'all',
								store:new Ext.data.ArrayStore({
									fields:['con_stateId','con_stateName'],
									data:[['已续签','已续签'],['已驳回','已驳回']]
								}),
								valueField:'con_stateId',
								displayField:'con_stateName',
								listeners:{
									afterRender:function(c){
										c.setValue(record.get("con_state"));
										c.setRawValue(record.get("con_state"));
									}
								}

							}]
						}]
					},
					{
						layout:'column',				//第四行
						border:false,
						items:[{
							columnWidth:.5,
							layout:'form',
							border:false,
							items:[{
								xtype:'combo',
								name:'conType',
								id:'conType',
								fieldLabel:'合同类型<font color=red>*</font>',
								allowBlank:false,
								blankText:'请输入合同类型',
								mode:'local',
								width:130,
								emptyText:"请输入合同类型",
								triggerAction:'all',
								store:new Ext.data.ArrayStore({
									fields:['con_typeId','con_typeName'],
									data:[['实习合同','实习合同'],['劳动合同','劳动合同']]
								}),
								valueField:'con_typeId',
								displayField:'con_typeName',
								listeners:{
									afterRender:function(c){
										c.setValue(record.get("con_type"));
										c.setRawValue(record.get("con_type"));
									}
								}
							}]
						}]
					}
				]
			}]
	});
	var contractEditWin=new Ext.Window({
		title:'合同修改',
		modal:true,
		iconCls:'menu-public-fol',
		width:600,
		height:245,
		items:[contractEditForm],
		buttons:[{
			text:'保存',
			iconCls:'btn-save',
			handler:function(){
				contractEditWinSubmit();
			}
		},{
			text:'取消',
			iconCls:'btn-cancel',
			handler:function(){
				contractEditWin.close();
			}
		}]
	});
	//提交表单
	function contractEditWinSubmit()
	{
		if(contractEditForm.form.isValid())
		{
			contractEditForm.form.submit({
				waitTitle:"请稍后...",
				waitMsg:"正在提交......",
				url:path+"contract/edit",
				success:function(g,a)
				{
					Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.INFO});
					contractEditWin.close();
					contractStore.reload();
				},
				failure:function(g,a)
				{
					Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
				}
			});
		}
	}
	contractEditWin.show();
}
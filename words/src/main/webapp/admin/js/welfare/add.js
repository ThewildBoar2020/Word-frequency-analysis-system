/**   
* @Title: welfare/add
* @Package null 
* @Description 福利添加
* @author 
* @date 2020-01-27 14:02:44
* @version V1.0   
**/ 
function welfareAdd()
{
	var welfareAddForm=new Ext.form.FormPanel({
		border:false,
 		padding:'8 8 8 8',
		border:false,
		layout:'form',
		labelAlign:"right",
		labelWidth : 135,
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
						name:'userInfoId',
						id:'userInfoId',
						fieldLabel:'员工姓名<font color=red>*</font>',
						allowBlank:false,
						blankText:'请输入员工姓名',
						emptyText:'员工姓名',
						width:400,
						hiddenName:'userInfoId',
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
						name:'socialSecurityStartdate',
						id:'socialSecurityStartdate',
						fieldLabel:'社保起始缴纳时间<font color=red>*</font>',
						allowBlank:false,
						width:130,
						format:'Y-m-d',
						emptyText:"请选择开始日期",
						blankText:'请输入开始日期'
					}]
				},{
					columnWidth:0.5,
					layout:'form',
					border:false,
					items:[{
						xtype:'datefield',
						name:'socialSecurityEnddate',
						id:'socialSecurityEnddate',
						fieldLabel:'社保最后缴纳时间<font color=red>*</font>',
						allowBlank:false,
						width:130,
						format:'Y-m-d',
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
						name:'accumulationFundStartdate',
						id:'accumulationFundStartdate',
						fieldLabel:'公积金起始缴纳时间<font color=red>*</font>',
						allowBlank:false,
						width:130,
						format:'Y-m-d',
						emptyText:"请选择公积金起始缴纳时间",
						blankText:'请输入公积金起始缴纳时间'
					}]
				},{
					columnWidth:0.5,
					layout:'form',
					border:false,
					items:[{
						xtype:'datefield',
						name:'accumulationFundEnddate',
						id:'accumulationFundEnddate',
						fieldLabel:'公积金结束缴纳时间<font color=red>*</font>',
						allowBlank:false,
						width:130,
						format:'Y-m-d',
						emptyText:"请选择公积金结束缴纳时间",
						blankText:'请输入公积金结束缴纳时间'
					}]
				}]
			}]
		}]
	});
	var welfareAddWin=new Ext.Window({
		title:'福利添加',
		modal:true,
		iconCls:'menu-public-fol',
		width:600,
		height:245,
		items:[welfareAddForm],
		buttons:[{
			text:'保存',
			iconCls:'btn-save',
			handler:function(){
				welfareAddWinSubmit();
			}
		},{
			text:'取消',
			iconCls:'btn-cancel',
			handler:function(){
				welfareAddWin.close();
			}
		}]
	});
	
	//提交表单
	function welfareAddWinSubmit()
	{
		if(welfareAddForm.form.isValid())
		{
			welfareAddForm.form.submit({
				waitTitle:"请稍后...",
				waitMsg:"正在提交......",
				url:path+"welfare/add",
				success:function(g,a)
				{
					Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.INFO});
					welfareAddWin.close();
					welfareStore.reload();
				},
				failure:function(g,a)
				{
					Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
				}
			});
		}
	}
	
	welfareAddWin.show();

	//获取合同编号
	Ext.Ajax.request({
		url:'welfare/createwelfareNo',
		method:'post',
		success:function(response)
		{
			console.log(Ext.util.JSON.decode(response.responseText).data);
			//Ext.Msg.show({title:"提示",msg:Ext.util.JSON.decode(response.responseText).msg,buttons:Ext.Msg.OK,icon:Ext.Msg.INFO});
			Ext.getCmp("welfare_no").setValue(Ext.util.JSON.decode(response.responseText).data);

		},
		failure:function(response)
		{
			Ext.Msg.show({title:"提示",msg:Ext.util.JSON.decode(response.responseText).msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
		}
	});
}
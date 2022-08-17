/**登录页面**/
function uploadFile()
{

	var uploadFileForm=new Ext.form.FormPanel({
		fileUpload: true,  
		width: 500,  
		frame: true,
		border:false,
		autoHeight: true,  
		bodyStyle: 'padding: 10px 10px 0 10px;',  
		labelWidth: 70,  
		defaults: {  
			anchor: '76%',  
			allowBlank: false,  
			msgTarget: 'side'  
		},  
		items:[{  
				xtype: 'textfield',  
				fieldLabel: '新闻编号',  
				name:"newsNumber",
				id:'newsNumber',
				allowBlank:false,
				blankText:'请输入新闻编号'
			},{  
				xtype: 'fileuploadfield',  
				id: 'form-file',  
				emptyText: '选择图片',  
				fieldLabel: '图片',  
				name: 'photo-path',  
				//buttonText: '',  
				buttonCfg: {  
					//iconCls: 'upload-icon'  
				}  
		}],
		buttons:[{
			text:'上传',
			handler:function()
			{
				 var newsNumber=Ext.getCmp("newsNumber").getValue();
				 if (uploadFileForm.getForm().isValid()) {  
					uploadFileForm.getForm().submit({  
						url: 'FileUploadServlet?newsNumber='+newsNumber,//后台处理的页面  
						waitMsg: 'Uploading your photo...',  
						success: function(fp,o) {  
							Ext.Msg.show({title:"提示",msg:o.result.message,buttons:Ext.Msg.OK,icon:Ext.Msg.INFO});  
						}  
					});  
				}  
			}
		}]
	});
	var uploadFileWin=new Ext.Window({
		modal:true,
		title:"上传图片",
		iconCls:"",
		border:false,
		items:[uploadFileForm]
	});
	uploadFileWin.show();
}
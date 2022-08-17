/**   
* @Title: employeeDelete.js 
* @Package null 
* @Description 管理员信息删除
* @author 
* @date 2022年2月2日
* @version V1.0   
*/

function userinfoDelete()
{
	var selRow=Ext.getCmp("userinfoGrid").getSelectionModel();
	if(!selRow.hasSelection())
	{
		Ext.Msg.alert("提示","请选择你要删除的记录!");	
	}
	else if(selRow.getSelections().length>1)
	{
		Ext.Msg.alert("提示","一次只能删除一行记录,你选择了多行!");
	}else{
		Ext.Msg.confirm("提示","您确认要删除选择的记录吗?",function(btn){
				if(btn=='yes')
				{
					record=selRow.getSelected();
					Ext.Ajax.request({
						url:'userinfo/delete',
						params:{userinfoId:record.get("userinfo_id")},
						method:'post',
						success:function(response)
						{
							
							//Ext.Msg.show({title:"提示",msg:Ext.util.JSON.decode(response.responseText).msg,buttons:Ext.Msg.OK,icon:Ext.Msg.INFO});
							userinfoStore.reload();
						},
						failure:function(response)
						{
							Ext.Msg.show({title:"提示",msg:Ext.util.JSON.decode(response.responseText).msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
						}
					})
				}
			})
	}
}
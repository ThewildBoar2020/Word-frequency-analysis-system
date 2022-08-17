/**   
* @Title: leave/delete.js
* @Package null 
* @Description 加班信息删除
* @author 
* @date 2020-01-29 20:19:57
* @version V1.0   
*/

function leaveDelete()
{
	var selRow=Ext.getCmp("leaveGrid").getSelectionModel();
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
						url:'leave/delete',
						params:{leaveId:record.get("leave_id")},
						method:'post',
						success:function(response)
						{
							if(Ext.util.JSON.decode(response.responseText).code==200)
							{
								leaveStore.reload();
							}
							else
							{
								Ext.Msg.show({title:"提示",msg:Ext.util.JSON.decode(response.responseText).msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
							}
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
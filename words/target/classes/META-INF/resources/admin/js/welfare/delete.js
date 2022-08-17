/**   
* @Title: welfare/delete.js
* @Package null 
* @Description 合同删除
* @author 
* @date 2022年2月2日
* @version V1.0   
*/

function welfareDelete()
{
	var selRow=Ext.getCmp("welfareGrid").getSelectionModel();
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
						url:'welfare/delete',
						params:{welfareId:record.get("welfare_id")},
						method:'post',
						success:function(response)
						{
							if(Ext.util.JSON.decode(response.responseText).code==200)
							{
								welfareStore.reload();
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
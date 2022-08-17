/**   
* @Title: reward_punish/delete.js
* @Package null 
* @Description 奖惩删除
* @author 
* @date 2020-01-29 00:17:44
* @version V1.0   
*/

function rewardPunishDelete()
{
	var selRow=Ext.getCmp("rewardPunishGrid").getSelectionModel();
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
						url:'rewardPunishLog/delete',
						params:{rewardPunishId:record.get("reward_punish_id")},
						method:'post',
						success:function(response)
						{
							if(Ext.util.JSON.decode(response.responseText).code==200)
							{
								rewardPunishStore.reload();
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
/**
 * @Title: courseEdit
 * @Package null
 * @Description 课程添加
 * @author
 * @date 2022年2月2日 23:05:49
 * @version V1.0
 */
var courseEditWin;
function courseEdit(record)
{
    var courseEditForm=new Ext.form.FormPanel({
        border:false,
        padding:'8 8 8 8',
        border:false,
        layout:'form',
        labelAlign:"right",
        labelWidth : 75,
        items:[{
            xtype:'fieldset',
            title:'课程',
            items:[{
                layout:'column',				//第一行
                border:false,
                items:[{
                    xtype:'textfield',
                    name:'courseId',
                    id:'courseId',
                    value:record.get("course_id"),
                    hidden: true,
                    hideLabel:true
                },{
                    columnWidth:1,
                    layout:'form',
                    border:false,
                    items:[{
                        xtype:'textfield',
                        name:'courseName',
                        id:'courseName',
                        width:200,
                        value:record.get("course_name"),
                        fieldLabel:'课程名称<font color=red>*</font>',
                        allowBlank:false,
                        blankText:'请输入课程名称'
                    }]
                }]
            },{								//第二行
                layout:'column',
                border:false,
                items:[{
                    columnWidth:1,
                    layout:'form',
                    border:false,
                    items:[{
                        xtype:'textarea',
                        name:'courseDesc',
                        id:'courseDesc',
                        width: 200,
                        value:record.get("course_desc"),
                        fieldLabel:'课程描述<font color=red>*</font>',
                        allowBlank:false,
                        blankText:'请输入课程描述'
                    }]
                }]
            }]
        }]
    });
    var courseEditWin=new Ext.Window({
        title:'课程修改',
        modal:true,
        iconCls:'menu-public-fol',
        width:365,
        height:230,
        items:[courseEditForm],
        buttons:[{
            text:'保存',
            iconCls:'btn-save',
            handler:function(){
                courseEditWinSubmit(courseEditForm,courseEditWin);
            }
        },{
            text:'取消',
            iconCls:'btn-cancel',
            handler:function(){
                courseEditWin.close();
            }
        }]
    });
    courseEditWin.show();
}
function courseEditWinSubmit(courseEditForm,courseEditWin)
{
    if(courseEditForm.form.isValid())
    {
        courseEditForm.form.submit({
            waitTitle:"请稍后...",
            waitMsg:"正在提交......",
            url:path+"course/edit",
            success:function(g,a)
            {
                Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.INFO});
                courseEditWin.close();
                courseStore.reload();
            },
            failure:function(g,a)
            {
                Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
            }
        });
    }
}
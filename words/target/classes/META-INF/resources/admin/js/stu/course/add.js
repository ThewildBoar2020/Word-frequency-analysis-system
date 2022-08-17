/**
 * @Title: departmentAdd
 * @Package null
 * @Description 课程添加
 * @author
 * @date 2022年2月2日 23:05:49
 * @version V1.0
 */
var courseAddWin;
function courseAdd(node)
{
    var courseAddForm=new Ext.form.FormPanel({
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
                    columnWidth:1,
                    layout:'form',
                    border:false,
                    items:[{
                        xtype:'textfield',
                        name:'courseName',
                        id:'courseName',
                        width:200,
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
                        fieldLabel:'课程描述<font color=red>*</font>',
                        allowBlank:false,
                        blankText:'请输入课程描述'
                    }]
                }]
            }]
        }]
    });
    var courseAddWin=new Ext.Window({
        title:'课程添加',
        modal:true,
        iconCls:'menu-public-fol',
        width:365,
        height:230,
        items:[courseAddForm],
        buttons:[{
            text:'保存',
            iconCls:'btn-save',
            handler:function(){
                courseAddWinSubmit(courseAddForm,courseAddWin);
            }
        },{
            text:'取消',
            iconCls:'btn-cancel',
            handler:function(){
                courseAddWin.close();
            }
        }]
    });
    courseAddWin.show();
}
function courseAddWinSubmit(courseAddForm,courseAddWin)
{
    if(courseAddForm.form.isValid())
    {
        courseAddForm.form.submit({
            waitTitle:"请稍后...",
            waitMsg:"正在提交......",
            url:path+"course/add",
            success:function(g,a)
            {
                console.info(g);
                console.info(a);
                Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.INFO});
                courseAddWin.close();
                courseStore.reload();
            },
            failure:function(g,a)
            {
                Ext.Msg.show({title:"提示",msg:a.result.msg,buttons:Ext.Msg.OK,icon:Ext.Msg.WARNING});
            }
        });
    }
}
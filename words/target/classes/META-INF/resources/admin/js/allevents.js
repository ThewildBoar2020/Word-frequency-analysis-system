//内容为Grid

//打印报表 
function printGrid(gridId) {  
    var grid =Ext.getCmp(gridId); 
    var tableStr = '<table width="100%" border=1>';  
    var cm = grid.getColumnModel();  
    var colCount = cm.getColumnCount();  
    var temp_obj = new Array();  
    // 只下载没有隐藏的列(isHidden()为true表示隐藏,其他都为显示)  
    // 临时数组,存放所有当前显示列的下标  
    for (var i = 1; i < colCount; i++) {//从第三列开始，因为我的第1、2列是分别是rownumber和selectmodel。  
        if (cm.isHidden(i) == true) {  
       } else { 
		   if(i==2||i==8||i==15||i==20||i==22||i==23||i==24)
           temp_obj.push(i);  
       }  
   }  
    	//tableStr = tableStr + '<tr><td>序号</td>';  
   for (var i = 0; i < temp_obj.length; i++) {  
       // 显示列的列标题  
       tableStr = tableStr + '<td>' + cm.getColumnHeader(temp_obj[i])  
               + '</td>';  
   }  
   tableStr = tableStr + '</tr>';  
   var store = grid.getStore();  
   var recordCount = store.getCount();  
   for (var i = 0; i < recordCount; i++) {  
       var r = store.getAt(i);  
       //tableStr = tableStr + '<tr><td>' + (i + 1) + '</td>';  
       for (var j = 0; j < temp_obj.length; j++) {  
           var dataIndex = cm.getDataIndex(temp_obj[j]);  
           var tdValue = r.get(dataIndex);  
           var rendererFunc = cm.getRenderer(temp_obj[j]);  
           if (rendererFunc != null) {  
               tdValue = rendererFunc(tdValue);  
           }  
           if (tdValue == null) {  
               tdValue = '';  
           }  
           tableStr = tableStr + '<td>' + tdValue + '</td>';  
       }  
       tableStr = tableStr + '</tr>';  
   }  
   tableStr = tableStr + '</table>';  
   var titleHTML = tableStr;// document.getElementById("printGridfff").innerHTML;  
   var newwin = window.open('printer.jsp', '', '');  
 
   newwin.document.write(titleHTML);  
   newwin.document.location.reload();  
   newwin.print();  
   newwin.close();  
}  

/**
*描述：打印考勤报表
*gridId-grid ID号
*cols1-要打印的列
*/
function printWorkGrid(gridId) {  
    var grid =Ext.getCmp(gridId); 
    var tableStr = '<table width="100%" border=1>';  
    var cm = grid.getColumnModel();  
    var colCount = cm.getColumnCount();  
    var temp_obj = new Array();  
    // 只下载没有隐藏的列(isHidden()为true表示隐藏,其他都为显示)  
    // 临时数组,存放所有当前显示列的下标
	//从第三列开始，因为我的第1、2列是分别是rownumber和selectmodel
	for (var i = 1; i < colCount; i++)
	{
		if (cm.getDataIndex(i)=="empName"||cm.getDataIndex(i)=="totalDays"||cm.getDataIndex(i)=="totalMeals"||cm.getDataIndex(i)=="totalJobs")
		{ 
			temp_obj.push(i);
		} 
	}  
   //tableStr = tableStr + '<tr><td>序号</td>';  
   for (var i = 0; i < temp_obj.length; i++) {  
       // 显示列的列标题  
       tableStr = tableStr + '<td>' + cm.getColumnHeader(temp_obj[i])  
               + '</td>';  
   }  
   tableStr = tableStr + '</tr>';  
   var store = grid.getStore();  
   var recordCount = store.getCount();  
   for (var i = 0; i < recordCount; i++) {  
       var r = store.getAt(i);  
       //tableStr = tableStr + '<tr><td>' + (i + 1) + '</td>';  
       for (var j = 0; j < temp_obj.length; j++) {  
           var dataIndex = cm.getDataIndex(temp_obj[j]);  
           var tdValue = r.get(dataIndex);  
           var rendererFunc = cm.getRenderer(temp_obj[j]);  
           if (rendererFunc != null) {  
               tdValue = rendererFunc(tdValue);  
           }  
           if (tdValue == null) {  
               tdValue = '';  
           }  
           tableStr = tableStr + '<td>' + tdValue + '</td>';  
       }  
       tableStr = tableStr + '</tr>';  
   }  
   tableStr = tableStr + '</table>';  
   var titleHTML = tableStr;// document.getElementById("printGridfff").innerHTML;  
   var newwin = window.open('printer.jsp', '', '');  
 
   newwin.document.write(titleHTML);  
   newwin.document.location.reload();  
   newwin.print();  
   newwin.close();  
}  
/**
 * 描述：center区域添加grid控件
 * @param {} node 树节点
 * @param {} grid grid对象
 * @param {} icon 图标
 */
function GridMain(node,grid,icon)
{
	var tab=centerPanel.getItem(node.id);
	if(!tab)
	{
		var tab=centerPanel.add({
			id:node.id,
		    iconCls:icon,
		    xtype:"panel",
		    title:node.text,
		    closable:true,
		    layout:"fit",
		    items:[grid]
		});
	}
	centerPanel.setActiveTab(tab);
};

/**
 * 数字转中文
 * @param dValue
 * @returns
 */
function chineseNumber(dValue) {
	var maxDec = 2;

	// 验证输入金额数值或数值字符串：
	dValue = dValue.toString().replace(/,/g, "");
	dValue = dValue.replace(/^0+/, ""); // 金额数值转字符、移除逗号、移除前导零
	if (dValue == "") {
		return "零元整";
	} // （错误：金额为空！）
	else if (isNaN(dValue)) {
		return "错误：金额不是合法的数值！";
	}
	var minus = ""; // 负数的符号“-”的大写：“负”字。可自定义字符，如“（负）”。
	var CN_SYMBOL = ""; // 币种名称（如“人民币”，默认空）
	if (dValue.length > 1) {
		if (dValue.indexOf('-') == 0) {
			dValue = dValue.replace("-", "");
			minus = "负";
		} // 处理负数符号“-”
		if (dValue.indexOf('+') == 0) {
			dValue = dValue.replace("+", "");
		} // 处理前导正数符号“+”（无实际意义）
	}
	// 变量定义：
	var vInt = "";
	var vDec = ""; // 字符串：金额的整数部分、小数部分
	var resAIW; // 字符串：要输出的结果
	var parts; // 数组（整数部分.小数部分），length=1时则仅为整数。
	var digits, radices, bigRadices, decimals; // 数组：数字（0~9——零~玖）；基（十进制记数系统中每个数字位的基是10——拾,佰,仟）；大基（万,亿,兆,京,垓,杼,穰,沟,涧,正）；辅币（元以下，角/分/厘/毫/丝）。
	var zeroCount; // 零计数
	var i, p, d; // 循环因子；前一位数字；当前位数字。
	var quotient, modulus; // 整数部分计算用：商数、模数。
	// 金额数值转换为字符，分割整数部分和小数部分：整数、小数分开来搞（小数部分有可能四舍五入后对整数部分有进位）。
	var NoneDecLen = (typeof (maxDec) == "undefined" || maxDec == null || Number(maxDec) < 0 || Number(maxDec) > 5); // 是否未指定有效小数位（true/false）
	parts = dValue.split('.'); // 数组赋值：（整数部分.小数部分），Array的length=1则仅为整数。
	if (parts.length > 1) {
		vInt = parts[0];
		vDec = parts[1]; // 变量赋值：金额的整数部分、小数部分
		if (NoneDecLen) {
			maxDec = vDec.length > 5 ? 5 : vDec.length;
		} // 未指定有效小数位参数值时，自动取实际小数位长但不超5。
		var rDec = Number("0." + vDec);
		rDec *= Math.pow(10, maxDec);
		rDec = Math.round(Math.abs(rDec));
		rDec /= Math.pow(10, maxDec); // 小数四舍五入
		var aIntDec = rDec.toString().split('.');
		if (Number(aIntDec[0]) == 1) {
			vInt = (Number(vInt) + 1).toString();
		} // 小数部分四舍五入后有可能向整数部分的个位进位（值1）
		if (aIntDec.length > 1) {
			vDec = aIntDec[1];
		} else {
			vDec = "";
		}
	} else {
		vInt = dValue;
		vDec = "";
		if (NoneDecLen) {
			maxDec = 0;
		}
	}
	if (vInt.length > 44) {
		return "错误：金额值太大了！整数位长【" + vInt.length.toString() + "】超过了上限——44位/千正/10^43（注：1正=1万涧=1亿亿亿亿亿，10^40）！";
	}
	// 准备各字符数组 Prepare the characters corresponding to the digits:
	digits = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); // 零~玖
	radices = new Array("", "拾", "佰", "仟"); // 拾,佰,仟
	bigRadices = new Array("", "万", "亿", "兆", "京", "垓", "杼", "穰", "沟", "涧", "正"); // 万,亿,兆,京,垓,杼,穰,沟,涧,正
	decimals = new Array("角", "分", "厘", "毫", "丝"); // 角/分/厘/毫/丝
	resAIW = ""; // 开始处理
	// 处理整数部分（如果有）
	if (Number(vInt) > 0) {
		zeroCount = 0;
		for (i = 0; i < vInt.length; i++) {
			p = vInt.length - i - 1;
			d = vInt.substr(i, 1);
			quotient = p / 4;
			modulus = p % 4;
			if (d == "0") {
				zeroCount++;
			} else {
				if (zeroCount > 0) {
					resAIW += digits[0];
				}
				zeroCount = 0;
				resAIW += digits[Number(d)] + radices[modulus];
			}
			if (modulus == 0 && zeroCount < 4) {
				resAIW += bigRadices[quotient];
			}
		}
		resAIW += "元";
	}
	// 处理小数部分（如果有）
	for (i = 0; i < vDec.length; i++) {
		d = vDec.substr(i, 1);
		if (d != "0") {
			resAIW += digits[Number(d)] + decimals[i];
		}
	}
	// 处理结果
	if (resAIW == "") {
		resAIW = "零" + "元";
	} // 零元
	if (vDec == "") {
		resAIW += "整";
	} // ...元整
	resAIW = CN_SYMBOL + minus + resAIW; // 人民币/负......元角分/整
	return resAIW;
}

/**
 * 中文转数字
 * @param num
 * @returns
 */
function aNumber(num) {
	var numArray = new Array();
	var unit = "亿万元$";
	for ( var i = 0; i < unit.length; i++) {
		var re = eval("/" + (numArray[i - 1] ? unit.charAt(i - 1) : "") + "(.*)" + unit.charAt(i) + "/");
		if (num.match(re)) {
			numArray[i] = num.match(re)[1].replace(/^拾/, "壹拾");
			numArray[i] = numArray[i].replace(/[零壹贰叁肆伍陆柒捌玖]/g, function($1) {
				return "零壹贰叁肆伍陆柒捌玖".indexOf($1);
			});
			numArray[i] = numArray[i].replace(/[分角拾佰仟]/g, function($1) {
				return "*" + Math.pow(10, "分角 拾佰仟 ".indexOf($1) - 2) + "+"
			}).replace(/^\*|\+$/g, "").replace(/整/, "0");
			numArray[i] = "(" + numArray[i] + ")*" + Math.ceil(Math.pow(10, (2 - i) * 4));
		} else
			numArray[i] = 0;
	}
	return eval(numArray.join("+"));
}

//用户名唯一性的验证
var respIsExist=true;
Ext.apply(Ext.form.VTypes,{
	verifyCarLicence:function(value)
	{
		Ext.Ajax.request({
			url:'CarInfoServlet?m=isExist',
			async:false,
			params:{carLicence:value},
			method:'post',
			success:function(response)
			{
				if(Ext.util.JSON.decode(response.responseText).msg==1)
					respIsExist=false;
				else
					respIsExist=true;
			}
		});
		return respIsExist;
   },
   verifyCarLicenceText:'提示,此车牌号已经存在!'
});
/**导出Excel表格**/
function exportExcelProcd(place)
{
	if(place=="jiaoList")
	{}
	else if(place=="czList")
	{
		
	}
	else{
		place="list";
	}
	var expExcelPanel=new Ext.form.FormPanel({
		border:false,
 		padding:'8 8 8 8',
		border:false,
		layout:'form',
		labelAlign:"right",
		labelWidth : 85,
		items:[{
			xtype:'fieldset',			
			title:'导出条件',
			items:[{
				layout:'column',				//第一行
				border:false,
				items:[{
					columnWidth:0.5,
					layout:'form',
					border:false,
					items:[{
						xtype: 'datefield',
						fieldLabel:'办理开始日期<font color=red>*</font>',
						name:'exch_doDateStart',
						id:'exch_doDateStart',
						format:'Y-m-d',
						emptyText: '输入办理开始日期',
						value:new Date(),
						width:110
					}]
				},{
					columnWidth:0.5,
					layout:'form',
					border:false,
					items:[{
						xtype: 'datefield',
						fieldLabel:'办理结束日期<font color=red>*</font>',
						name:'exch_doDateEnd',
						id:'exch_doDateEnd',
						format:'Y-m-d',
						emptyText: '输入办理结束日期',
						value:new Date(),
						width:110
					}]
				}]
			},{
				layout:'column',				//第三行
				border:false,
				items:[{
					columnWidth:0.5,
					layout:'form',
					border:false,
					items:[{
						xtype:'radiogroup',
						name:'exIsPay',
						id:'exIsPay',
						fieldLabel:'支付情况<font color=red>*</font>',
						items:[{
							boxLabel:'全部数据',
							inputValue:'0',
							name:'_exIsPay',
							checked:true
						},{
							boxLabel:'仅未付',
							name:'_exIsPay',
							inputValue:'2'
						}]
					}]
				},{
					columnWidth:0.5,
					layout:'form',
					border:false,
					items:[{
						xtype:'textfield',
						name:'exp_fromPerson',
						id:'exp_fromPerson',
						fieldLabel:'介绍人<font color=red>*</font>',
						width:110,
						allowBlank:true,
						emptyText:'请输入介绍人',
						blankText:'请输入介绍人'
					}]
				}]
			},{					//第三行
				layout:'column',
				border:false,
				items:[{
					columnWidth:0.5,
					layout:'form',
					border:false,
					items:[{
						xtype: 'combo',
						name:'exp_toDepartmentId',
						id:'exp_toDepartmentId',
						fieldLabel:'办理网点<font color=red>*</font>',
						emptyText: '办理网点',
						allowBlank:false,
						mode:'remote',
						triggerAction:'all',
						store:new Ext.data.JsonStore({
							url:path+'DepartmentServlet?m='+place,
							root:'data',
							fields:['depId','depName']
						}),
						displayField:'depName',
						valueField:'depId',
						width:110
					}]
				},{
					columnWidth:0.5,
					layout:'form',
					border:false,
					items:[{
						xtype: 'textfield',
						name:'exp_doPerson',
						id:'exp_doPerson',
						fieldLabel:'办理人<font color=red>*</font>',
						emptyText: '办理人',
						width:110
					}]
				}]			
			}]
		}]
	});

	var expExcelWin=new Ext.Window({
		title:'导出Excel表格',
		modal:true,
		iconCls:'menu-public-fol',
		width:520,
		height:200,
		items:[expExcelPanel],
		buttons:[{
			text:'导出',
			iconCls:'btn-excel',
			id:'btnExportExcel',
			handler:function(){
				Ext.getCmp('btnExportExcel').setDisabled(true);
				var _exIsPay=Ext.getCmp("exIsPay").getValue().inputValue;
				var sdate=Ext.util.Format.date(Ext.getCmp("exch_doDateStart").getValue(), "Y-m-d");
				var edate=Ext.util.Format.date(Ext.getCmp("exch_doDateEnd").getValue(),"Y-m-d");
				var fromPerson=Ext.getCmp("exp_fromPerson").getValue();
				var	depId=Ext.getCmp("exp_toDepartmentId").getValue();
				var doPerson=encodeURI(Ext.getCmp("exp_doPerson").getValue());
				window.location.href=path+"ExcelManagerServlet?m=exportExcel&exIsPay="+_exIsPay+"&sdate="+sdate+"&edate="+edate+"&fromPerson="+fromPerson+"&depId="+depId+"&doPerson="+doPerson;
				window.setTimeout(function(){Ext.getCmp('btnExportExcel').setDisabled(false);},3000);
			}
		},{
			text:'取消',
			iconCls:'btn-cancel',
			handler:function(){
				expExcelWin.close();
			}
		}]
	});
	expExcelWin.show();
}
//给gridPanel添加单机事件
var onrowClick = function(grid, index, e){
	
	var selectionModel = grid.getSelectionModel();    
    var record = selectionModel.getSelected();
    if(record.get('addDate')!=""&&userpower==2)
    {
    	 var dt1 = new Date(record.get('addDate'));//获取选择的时期对象
    	var dt2 = new Date();  
        var value2 = dt2.format('Y-m-d');//
        dt2 = new Date(value2);//获取当前日期的时间对象  
        var value1 = Date.parse(dt1); //Date.parse的处理很关键  
        var value2 = Date.parse(dt2);  
        if(value1==value2)
        {
        	Ext.getCmp(grid.getId()+"BtnEdit").setDisabled(false);
        }
        else
        {
        	Ext.getCmp(grid.getId()+"BtnEdit").setDisabled(true);
        }
    }
    else if(record.get('addDate')=="")
    {
    	Ext.getCmp(grid.getId()+"BtnEdit").setDisabled(true);
    } 
	else
	{
		Ext.getCmp(grid.getId()+"BtnEdit").setDisabled(false);
	}
}
/**设置只读用户**/
function setReadOnlyUser(gridlist)
{
	console.log(gridlist);
	if(userpower!=1)
	{
		if(gridlist=="userinfoPositionLogGrid")
		{
			console.log(Ext.getCmp(gridlist+"_btn_del"));
			Ext.getCmp(gridlist+"_btn_del").setDisabled(true)
		}
		else if(gridlist=="contractGrid"||gridlist=='rewardPunishGrid'||gridlist=="workGrid"||gridlist=="welfareGrid")
		{
			Ext.getCmp(gridlist+"_btn_add").setDisabled(true);
			Ext.getCmp(gridlist+"_btn_del").setDisabled(true);
			Ext.getCmp(gridlist+"_btn_edit").setDisabled(true);
		}
		else if(gridlist=='leaveGrid')
		{
			Ext.getCmp(gridlist+"_btn_check").setDisabled(true);
			Ext.getCmp(gridlist+"_btn_del").setDisabled(true);
		}
		// else if()
		// {
		//
		// }
		// Ext.getCmp(mycars+"_btn_add").setDisabled(true);
		// Ext.getCmp(mycars+"_btn_del").setDisabled(true);
		// Ext.getCmp(mycars+"_btn_edit").setDisabled(true);

	}
}

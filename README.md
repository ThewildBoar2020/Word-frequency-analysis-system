# Word-frequency-analysis-system
<<<<<<< HEAD
★内容：本项目针对用户无法及时找出数据量较大的文本的热点信息的难点问题，在SpringBoot框架上利用Spark大数据组件对用户上传至MySQL上的文本信息进行词频计算，最后实现文本热点的前端可视化展示。

  ★技术栈：IK分词器、Spark、MyBatis、SpringBoot

# 文本大数据技术词频分析系统实现

说明：这个项目前后在一起，启动服务即可

在 resource 目录下面有个两个重要的文件，控制哪些词语或字需要统计哪些不需要统计

extend.dic 这个文件里面可以设置需要识别的词语或句子
stopword.dic 这个文件是设置不希望统计的词或句子

根据自己的需要设置即可

项目启动后
http://localhost:1234/admin/login.jsp

管理员用户名：admin 密码：admin888

出现过的词语或着重显示，右边是当前内容的词云，出现的次数多，字体大
现在这个统计的是一个词语， 如果不希望统计时 在stopword.dic 在设置后，就不会在统计了

注意的是 设置完成后，重启一下服务

修改部分：*****
1.用户栏目功能只能显示两个，添加再webapp/admin/js/cms/article/list.js中第45行！！！

2.数据库修改：resources/mapper/application.properties中的第5/6行分别修改密码以及端口号

3.注意事项：
djk1.8
数据库的表、表中属性的字符集

=======
★内容：本项目针对用户无法及时找出数据量较大的文本的热点信息的难点问题，在SpringBoot框架上利用Spark大数据组件对用户上传至MySQL上的文本信息进行词频计算，最后实现文本热点的前端可视化展示。  ★技术栈：IK分词器、Spark、MyBatis、SpringBoot
>>>>>>> 6129c9b750d2bf3fe27e7d6f3904c149bae9174d

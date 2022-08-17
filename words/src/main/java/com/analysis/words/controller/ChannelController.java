package com.analysis.words.controller;


import com.analysis.words.entity.Channel;
import com.analysis.words.service.impl.ChannelService;
import com.analysis.words.utils.ResponseCode;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @ClassName ChannelController
 * @Description: TODO
 * @Author gmllt20171110
 * @Date 2020/2/1
 * @Version V1.0
 **/
@Controller
@RequestMapping("/admin/channel")
public class ChannelController
{
    @Resource
    private ChannelService channelService;

    Map result=null;

    @PostMapping("/findAll")
    @ResponseBody
    public Map findAll(Integer start, Integer limit)
    {
        result=new HashMap();

        Map params=new HashMap();
        params.put("start",start);
        params.put("limit",limit);

        try
        {
            List<Channel> channels=channelService.findAll();
            result.put("code", ResponseCode.SUCCESS_HEAD);
            result.put("msg","success");
            result.put("data",channels);
            result.put("totalSize",channelService.findTotalSize());
        }
        catch(Exception e)
        {
            result.put("code", ResponseCode.EXCEPTION_HEAD);
            result.put("failure",true);
            result.put("msg",e.getMessage());
            e.printStackTrace();
        }


        return result;
    }

    @PostMapping("/findById")
    @ResponseBody
    public Map findById(long channelId)
    {
        result=new HashMap();
        try
        {
            Channel channel=channelService.findById(channelId);

            result.put("code", ResponseCode.SUCCESS_HEAD);
            result.put("success",true);
            result.put("msg","success");
            result.put("data",channel);
        } catch (Exception e)
        {
            result.put("code", ResponseCode.EXCEPTION_HEAD);
            result.put("failure",true);
            result.put("msg",e.getMessage());
            e.printStackTrace();
        }

        return result;
    }

    @PostMapping("/add")
    @ResponseBody
    public Map add(Channel channel)
    {
        result=new HashMap();
        try
        {
            int count = channelService.add(channel);
            if (count > 0)
            {
                result.put("code", ResponseCode.SUCCESS_HEAD);
                result.put("success", true);
                result.put("msg", "栏目添加成功");
                result.put("data", count);
            } else
            {
                result.put("code", ResponseCode.EXCEPTION_HEAD);
                result.put("failure", true);
                result.put("msg", "栏目添加失败");
            }
        } catch (Exception e)
        {
            result.put("code", ResponseCode.EXCEPTION_HEAD);
            result.put("failure",true);
            result.put("msg",e.getMessage());
            e.printStackTrace();
        }

        return result;
    }

    @PostMapping("/edit")
    @ResponseBody
    public Map edit(Channel channel)
    {
        result=new HashMap();
        try
        {
            int count=channelService.edit(channel);
            if (count>0)
            {
                result.put("code", ResponseCode.SUCCESS_HEAD);
                result.put("success",true);
                result.put("msg","栏目修改成功!");
            }
            else {
                result.put("code", ResponseCode.EXCEPTION_HEAD);
                result.put("failure",true);
                result.put("msg","栏目修改失败!");
            }
        } catch (Exception e)
        {
            result.put("code", ResponseCode.EXCEPTION_HEAD);
            result.put("failure",true);
            result.put("msg",e.getMessage());
            e.printStackTrace();
        }

        return result;
    }

    @PostMapping("/delete")
    @ResponseBody
    public Map delete(long channelId)
    {
        result=new HashMap();
        try
        {
            int count=channelService.delete(channelId);
            if(count>0)
            {
                result.put("code", ResponseCode.SUCCESS_HEAD);
                result.put("success",true);
                result.put("msg","栏目删除成功！");
            }
            else
            {
                result.put("code", ResponseCode.EXCEPTION_HEAD);
                result.put("failure",true);
                result.put("msg","栏目删除失败！");
            }
        } catch (Exception e)
        {
            result.put("code", ResponseCode.EXCEPTION_HEAD);
            result.put("failure",true);
            result.put("msg",e.getMessage());
            e.printStackTrace();
        }

        return result;
    }

}

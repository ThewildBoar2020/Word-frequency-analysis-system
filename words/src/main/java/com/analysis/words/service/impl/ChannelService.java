package com.analysis.words.service.impl;

import com.analysis.words.entity.Channel;
import com.analysis.words.exception.MyException;
import com.analysis.words.mapper.ChannelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @ClassName ChannelService
 * @Description: TODO
 * @Author gmllt20171110
 * @Date 2020/2/1
 * @Version V1.0
 **/
@Service
public class ChannelService
{
    private static final Logger log = LoggerFactory.getLogger(ChannelService.class);
    @Resource
    private ChannelMapper channelMapper;

    public int delete(Long channelId)
    {
        try
        {
            return channelMapper.delete(channelId);
        }
        catch(Exception e)
        {
            e.printStackTrace();
            throw new MyException(e.getMessage());

        }
    }

    public int add(Channel channel)
    {
        try
        {
            return channelMapper.add(channel);
        }
        catch(Exception e)
        {
            e.printStackTrace();
            throw new MyException(e.getMessage());

        }
    }

    public int edit(Channel channel)
    {
        try
        {
            return channelMapper.edit(channel);
        }
        catch(Exception e)
        {
            e.printStackTrace();
            throw new MyException(e.getMessage());

        }
    }

    public Channel findById(Long channelId)
    {
        try
        {
            return channelMapper.findById(channelId);
        }
        catch(Exception e)
        {
            e.printStackTrace();
            throw new MyException(e.getMessage());

        }
    }

    public List<Channel> findAll()
    {
        try
        {
            return channelMapper.findAll();
        }
        catch(Exception e)
        {
            e.printStackTrace();
            throw new MyException(e.getMessage());

        }
    }

    public int findTotalSize()
    {
        try
        {
            return channelMapper.findTotalSize();
        }
        catch(Exception e)
        {
            e.printStackTrace();
            throw new MyException(e.getMessage());

        }
    }
}

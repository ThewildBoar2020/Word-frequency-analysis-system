package com.analysis.words.mapper;


import com.analysis.words.entity.Channel;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface ChannelMapper {

    int delete(Long channelId);

    int add(Channel channel);

    int edit(Channel record);

    Channel findById(Long channelId);

    List<Channel> findAll();

    int findTotalSize();
}
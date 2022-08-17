package com.analysis.words.mapper;



import com.analysis.words.entity.Content;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ContentMapper {

    int delete(Long contentId);

    int add(Content content);

    int edit(Content content);

    Content findById(Long contentId);

    List<Content> findAll(Map params);

    int findTotalSize(Map params);
}
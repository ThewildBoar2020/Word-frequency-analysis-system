package com.analysis.words.mapper;


import com.analysis.words.entity.Article;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * @author admin
 */
@Mapper
public interface ArticleMapper {

    Article findById(long id);
    List<Article> findAll(Map params);
    int findTotalSize(Map params);
    int save(Article article);
    int edit(Article article);
    int deleteById(long id);
    //int deleteByIds(String[] ids);
}

package com.analysis.words.service;


import com.analysis.words.entity.Article;

import java.util.List;
import java.util.Map;

/**
 * @author admin
 */
public interface ArticleService {
    Article findById(long id);
    List<Article> findAll(Map params);
    int findTotalSize(Map params);
    int save(Article article);
    int edit(Article article);
    int deleteById(long id);
    //int deleteByIds(String[] ids);
}

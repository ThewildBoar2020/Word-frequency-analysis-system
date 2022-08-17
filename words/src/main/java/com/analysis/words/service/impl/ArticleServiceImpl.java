package com.analysis.words.service.impl;

import com.analysis.words.entity.Article;
import com.analysis.words.mapper.ArticleMapper;
import com.analysis.words.service.ArticleService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * @author admin
 */
@Service
public class ArticleServiceImpl implements ArticleService {

    @Resource
    private ArticleMapper articleMapper;

    @Override
    public Article findById(long id) {
        return articleMapper.findById(id);
    }

    @Override
    public List<Article> findAll(Map article) {
        return articleMapper.findAll(article);
    }

    @Override
    public int findTotalSize(Map article) {
        return articleMapper.findTotalSize(article);
    }

    @Override
    public int save(Article article) {
        return articleMapper.save(article);
    }

    @Override
    public int edit(Article article) {
        return articleMapper.edit(article);
    }

    @Override
    public int deleteById(long id) {
        return articleMapper.deleteById(id);
    }


}

package com.analysis.words.controller;

import com.analysis.words.entity.Article;
import com.analysis.words.entity.Chart;
import com.analysis.words.service.ArticleService;
import com.analysis.words.service.impl.SparkChartService;
import org.apache.commons.lang3.StringUtils;
import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.api.java.function.FlatMapFunction;
import org.apache.spark.api.java.function.Function2;
import org.apache.spark.api.java.function.PairFunction;

import org.apdplat.word.WordSegmenter;
import org.apdplat.word.segmentation.Word;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import scala.Char;
import scala.Tuple2;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import java.io.Serializable;
import java.util.*;

/**
 *
 * 图表
 *
 * @author admin
 */
@RestController
@RequestMapping("/admin")
public class ChartController{

    @Resource
    SparkChartService sparkChartService;
    @Resource
    ArticleService articleService;

    @RequestMapping("/chineseChart")
    public Map chineseSpark(String channelId){

        Map result = new HashMap<String,Object>();
        Map params = new HashMap<String,String>();
        if(StringUtils.isEmpty(channelId)){
            params.put("channelIds","0");
        }else{
            params.put("channelIds",channelId);
        }
        List<Article> articles = articleService.findAll(params);
        Map<String, Integer> charts = sparkChartService.chineseSparkChart(articles);

        List<Chart> data = new ArrayList<>();
        Set<Map.Entry<String, Integer>> entries = charts.entrySet();
        for (Map.Entry<String, Integer> entry : entries) {
            Chart chart = new Chart();
            chart.setName(entry.getKey());
            chart.setValue(entry.getValue());
            data.add(chart);
        }
        result.put("data",data);
        result.put("code",200);
        result.put("msg","返回数据成功!");
        return result;
    }
}

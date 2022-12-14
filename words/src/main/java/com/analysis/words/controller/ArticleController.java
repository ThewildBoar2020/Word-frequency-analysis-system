package com.analysis.words.controller;


import com.analysis.words.entity.Article;
import com.analysis.words.entity.Chart;
import com.analysis.words.service.ArticleService;
import com.analysis.words.service.impl.SparkChartService;
import com.analysis.words.utils.ResponseCode;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.util.*;

/**
 * @author admin
 */
@Controller
@RequestMapping("/admin/article")
public class ArticleController {

    @Resource
    private ArticleService articleService;
    @Resource
    SparkChartService sparkChartService;
    Map result=null;

    @PostMapping("/findAll")
    @ResponseBody
    public Map findAll(String title,Integer start, Integer limit)
    {
        result=new HashMap();

        Map params=new HashMap();

        params.put("title",title);
        params.put("start",start);
        params.put("limit",limit);

        try
        {
            List<Article> articles=articleService.findAll(params);
            result.put("code", ResponseCode.SUCCESS_HEAD);
            result.put("msg","success");
            result.put("data",articles);
            result.put("totalSize",articleService.findTotalSize(params));
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
    public Map findById(long articleId)
    {
        result=new HashMap();
        try
        {
            Article article=articleService.findById(articleId);

            result.put("code", ResponseCode.SUCCESS_HEAD);
            result.put("success",true);
            result.put("msg","success");
            result.put("data",article);
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
    public Map add(Article article)
    {
        result=new HashMap();
        try
        {
            int count = articleService.save(article);
            if (count > 0)
            {
                result.put("code", ResponseCode.SUCCESS_HEAD);
                result.put("success", true);
                result.put("msg", "??????????????????");
                result.put("data", count);
            } else
            {
                result.put("code", ResponseCode.EXCEPTION_HEAD);
                result.put("failure", true);
                result.put("msg", "??????????????????");
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
    public Map edit(Article article)
    {
        result=new HashMap();
        try
        {
            int count=articleService.edit(article);
            if (count>0)
            {
                result.put("code", ResponseCode.SUCCESS_HEAD);
                result.put("success",true);
                result.put("msg","??????????????????!");
            }
            else {
                result.put("code", ResponseCode.EXCEPTION_HEAD);
                result.put("failure",true);
                result.put("msg","??????????????????!");
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
    public Map delete(long articleId)
    {
        result=new HashMap();
        try
        {
            int count=articleService.deleteById(articleId);
            if(count>0)
            {
                result.put("code", ResponseCode.SUCCESS_HEAD);
                result.put("success",true);
                result.put("msg","?????????????????????");
            }
            else
            {
                result.put("code", ResponseCode.EXCEPTION_HEAD);
                result.put("failure",true);
                result.put("msg","?????????????????????");
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


    @RequestMapping("/articleList")
    public ModelAndView articleList(Integer start, Integer limit)
    {
        ModelAndView mv=new ModelAndView("/song/index");

        mv.addObject("hello","world");
        return mv;
    }

    @PostMapping("/analysis")
    @ResponseBody
    public Map analysis(long articleId)
    {
//        long start= System.currentTimeMillis();
        result=new HashMap();
        try
        {

            Article article=articleService.findById(articleId);// ??????????????????ID???????????????
            List<Article> articles = new ArrayList<Article>();
            articles.add(article);

            Map<String, Integer> charts = null;
            long start= System.currentTimeMillis();
            // ????????????????????????????????????????????????????????????????????????????????????spark?????????Map<String,Integer>
            charts = sparkChartService.chineseSparkChart(articles);
            long end = System.currentTimeMillis();

            Set<Map.Entry<String, Integer>> entries = charts.entrySet();
            List<Chart> data = new ArrayList<Chart>();
            // ????????????????????????????????????????????????
            // ?????????content?????????????????????2??????????????????????????????????????????
            for (Map.Entry<String, Integer> entry : entries) {
//                System.out.println("(" + entry.getKey() + "???" + entry.getValue() + ")");
                if(entry.getValue()>=2){
                    // ?????????????????????????????????????????????????????????????????????
                    String temp = article.getContent().replaceAll(entry.getKey(),"<font color='#"+randomHexStr()+"'>"+entry.getKey()+"</font>");
                    article.setContent(temp);
                }

                Chart chart = new Chart();
                chart.setName(entry.getKey());
                chart.setValue(entry.getValue());
                data.add(chart);
            }

//            long end = System.currentTimeMillis();
            result.put("code", ResponseCode.SUCCESS_HEAD);
            result.put("success",true);
            result.put("msg","success");
            result.put("data",article);
            result.put("dataCloud",data);
            result.put("time","???????????????"+(end-start)+"??????");
        } catch (Exception e)
        {
            result.put("code", ResponseCode.EXCEPTION_HEAD);
            result.put("failure",true);
            result.put("msg",e.getMessage());
            e.printStackTrace();
        }
        return result;
    }

    public static String randomHexStr(){
        StringBuffer result = new StringBuffer();
        for (int i=0;i<6;i++){
            result.append(Integer.toHexString(new Random().nextInt(15)));
        }
        return result.toString().toUpperCase();
    }
}

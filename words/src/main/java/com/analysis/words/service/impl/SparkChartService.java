package com.analysis.words.service.impl;

import com.analysis.words.entity.Article;
import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.api.java.function.FlatMapFunction;
import org.apache.spark.api.java.function.Function2;
import org.apache.spark.api.java.function.PairFunction;
import org.springframework.stereotype.Service;
import org.wltea.analyzer.core.IKSegmenter;
import org.wltea.analyzer.core.Lexeme;
import scala.Tuple2;

import java.io.*;
import java.util.*;
@Service
public class SparkChartService implements Serializable{

    public static SparkConf sparkConfig;
    public static JavaSparkContext sc;

    public SparkChartService(){
        if(sparkConfig==null||sc==null){
            sparkConfig = new SparkConf().setAppName("chart").setMaster("local[*]");
//            sparkConfig = new SparkConf().setAppName("chart").setMaster("spark://192.168.10.102:7077").setJars(new String[]{"D:\\wordss\\out\\artifacts\\words_jar\\words.jar"});
            sc =  new JavaSparkContext(sparkConfig);
        }
    }


    /**
     * 汉字分词
     * @param articles
     * @return
     */
    public Map<String,Integer> chineseSparkChart(List<Article> articles){
        List<String> stringList = new ArrayList<String>();
        for (Article article:articles){
            stringList.add(article.getContent());
        }

        //创建出一个可以被并行操作的分布式数据集
        JavaRDD<String> stringJavaRDD = sc.parallelize(stringList);

        //使用flatMap函数对原始Rdd进行转换
        JavaRDD<String> flatMapRdd = stringJavaRDD.flatMap(new FlatMapFunction<String, String>() {
            @Override
            public Iterator<String> call(String s) throws Exception {
                return getSplitWords(s).iterator();
            }
        });

        // 使用mapToPair进行map操作 形如： （word，1）
        JavaPairRDD<String, Integer> mapRdd = flatMapRdd.mapToPair(new PairFunction<String, String, Integer>() {
            @Override
            public Tuple2<String, Integer> call(String s) throws Exception {
                return new Tuple2<String, Integer>(s, 1);
            }
        });

        // 使用reduceByKey进行单词统计 返回 （word，CountSum）
        JavaPairRDD<String, Integer> res = mapRdd.reduceByKey(new Function2<Integer, Integer, Integer>() {
            @Override
            public Integer call(Integer integer, Integer integer2) throws Exception {
                return integer+integer2;
            }
        });

        Map<String, Integer> stringIntegerMap = res.collectAsMap();
        for (Map.Entry<String, Integer> entry : stringIntegerMap.entrySet()) {
            System.out.println("key = " + entry.getKey() + ", value = " + entry.getValue());
        }
        return stringIntegerMap;


    }

    /**
     * 分词、去停用词
     */
    private List<String> getSplitWords(String line){
        List<String> words = new ArrayList<String>();
        if (line == null || line.trim().length() == 0){
            return words;
        }

        try {
            IKSegmenter seg = new IKSegmenter(new StringReader(line),true);
            Lexeme lex;
            while ( (lex = seg.next()) != null){
                String word = lex.getLexemeText();
                words.add(word);
            }

        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return words;
    }
}

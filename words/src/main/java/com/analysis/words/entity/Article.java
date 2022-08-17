package com.analysis.words.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class Article {
    private Long articleId;
    private String channelIds;
    private String title;
    private String author;
    private String thumb;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date createDatetime;
    private int isDeleted;
    private String content;
    private String description;


}
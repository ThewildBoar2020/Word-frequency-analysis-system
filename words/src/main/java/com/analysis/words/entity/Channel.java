package com.analysis.words.entity;

import lombok.Data;

@Data
public class Channel {
    private long channelId;

    private long chanelParentId;

    private String title;

    private String description;

    private int isDeleted;

}
package com.analysis.words.entity;


import lombok.Data;

/**
 * @author admin
 */
@Data
public class Position {
    private long positionId;
    private String positionNo;
    private String positionName;
    private String qualification;
    private int is_deleted;
}

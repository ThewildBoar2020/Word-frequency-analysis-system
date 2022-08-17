package com.analysis.words.exception;

/**
 * @ClassName MyException
 * @Description: TODO
 * @Author gmllt20171110
 * @Date 2020/1/25
 * @Version V1.0
 **/
public class MyException extends RuntimeException
{
    String message;

    public MyException(String message)
    {
        this.message = message;
    }

    @Override
    public String getMessage()
    {
        return message;
    }
}

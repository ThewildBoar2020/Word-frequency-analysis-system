package com.analysis.words;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 * @author admin
 */
@SpringBootApplication
@Controller
@RequestMapping("/admin")
public class WordsApplication {

    @RequestMapping(value = {"/login.jsp"})
    public String loginPage(HttpServletRequest request){
        System.out.println("aaa");
        return "admin/login" ;
    }

    public static void main(String[] args) {
        SpringApplication.run(WordsApplication.class, args);
    }

}

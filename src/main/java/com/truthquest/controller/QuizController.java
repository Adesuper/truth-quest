package com.truthquest.controller;

import com.truthquest.model.QuizQuestion;
import com.truthquest.service.QuizService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping("/questions")
    public List<QuizQuestion> getAllQuestions() {
        return quizService.getAllQuestions();
    }

    @GetMapping("/questions/{id}")
    public ResponseEntity<QuizQuestion> getQuestionById(@PathVariable Long id) {
        return quizService.getQuestionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

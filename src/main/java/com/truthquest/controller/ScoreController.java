package com.truthquest.controller;

import com.truthquest.model.ScoreResult;
import com.truthquest.model.ScoreSubmission;
import com.truthquest.service.ScoreService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ScoreController {

    private final ScoreService scoreService;

    public ScoreController(ScoreService scoreService) {
        this.scoreService = scoreService;
    }

    @PostMapping("/score")
    public ScoreResult submitScore(@RequestBody ScoreSubmission submission) {
        return scoreService.evaluateAndStore(submission);
    }

    @GetMapping("/score/{playerName}")
    public List<ScoreResult> getScoreHistory(@PathVariable String playerName) {
        return scoreService.getScoreHistory(playerName);
    }
}

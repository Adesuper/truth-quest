package com.truthquest.service;

import com.truthquest.model.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ScoreService {

    private final QuizService quizService;
    private final Map<String, List<ScoreResult>> scoreHistory = new ConcurrentHashMap<>();

    public ScoreService(QuizService quizService) {
        this.quizService = quizService;
    }

    public ScoreResult evaluateAndStore(ScoreSubmission submission) {
        List<ScoreResult.QuestionFeedback> feedbackList = new ArrayList<>();
        int correct = 0;

        for (ScoreSubmission.Answer answer : submission.getAnswers()) {
            var question = quizService.getQuestionById(answer.getQuestionId());
            if (question.isPresent()) {
                QuizQuestion q = question.get();
                boolean isCorrect = answer.getSelectedOption() == q.getCorrectAnswerIndex();
                if (isCorrect) {
                    correct++;
                }
                feedbackList.add(new ScoreResult.QuestionFeedback(
                        q.getId(),
                        isCorrect,
                        q.getExplanation()
                ));
            }
        }

        int total = submission.getAnswers().size();
        int percent = total > 0 ? (correct * 100) / total : 0;

        ScoreResult result = new ScoreResult();
        result.setPlayerName(submission.getPlayerName());
        result.setTotalQuestions(total);
        result.setCorrectAnswers(correct);
        result.setScorePercent(percent);
        result.setFeedback(feedbackList);

        if (percent == 100) {
            result.setMessage("Amazing job, " + submission.getPlayerName()
                    + "! You got every answer right!");
            result.setEncouragement("You truly understand the value of truth. "
                    + "Keep shining your light for Jesus!");
        } else if (percent >= 70) {
            result.setMessage("Great work, " + submission.getPlayerName()
                    + "! You know a lot about truth!");
            result.setEncouragement("Keep learning and growing in God's Word. "
                    + "Jesus is the way, the truth, and the life!");
        } else if (percent >= 40) {
            result.setMessage("Good try, " + submission.getPlayerName()
                    + "! You're learning!");
            result.setEncouragement("Read the story again and remember — "
                    + "God loves a truthful heart. You can always try again!");
        } else {
            result.setMessage("Don't give up, " + submission.getPlayerName()
                    + "! Every try helps you learn.");
            result.setEncouragement("Go back and read the story of Sam. "
                    + "Remember Exodus 20:16 — God wants us to always tell the truth. "
                    + "You'll do better next time!");
        }

        result.setVerse(new BibleVerse(
                "John 14:6",
                "Jesus answered, 'I am the way and the truth and the life. "
                        + "No one comes to the Father except through me.'"
        ));

        scoreHistory.computeIfAbsent(submission.getPlayerName(), k -> new ArrayList<>())
                .add(result);

        return result;
    }

    public List<ScoreResult> getScoreHistory(String playerName) {
        return scoreHistory.getOrDefault(playerName, List.of());
    }
}

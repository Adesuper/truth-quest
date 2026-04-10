package com.truthquest.service;

import com.truthquest.model.QuizQuestion;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuizService {

    private final List<QuizQuestion> questions;

    public QuizService() {
        questions = List.of(
                new QuizQuestion(
                        1L,
                        "Sam broke Mom's vase. What is the RIGHT thing to do?",
                        List.of(
                                "Tell Mom the truth and say sorry",
                                "Hide the pieces and blame the cat",
                                "Pretend nothing happened",
                                "Run away and hope no one notices"
                        ),
                        0,
                        "Telling the truth and saying sorry is always the right thing, "
                                + "even when it's scary. God gives us courage to be honest!",
                        "Exodus 20:16"
                ),
                new QuizQuestion(
                        2L,
                        "What does the 9th Commandment teach us?",
                        List.of(
                                "Do not steal",
                                "Do not give false testimony (do not lie)",
                                "Honor your parents",
                                "Remember the Sabbath"
                        ),
                        1,
                        "The 9th Commandment says 'You shall not give false testimony "
                                + "against your neighbor.' This means God wants us to always be truthful.",
                        "Exodus 20:16"
                ),
                new QuizQuestion(
                        3L,
                        "In John 14:6, Jesus says 'I am the way and the _____ and the life.'",
                        List.of(
                                "light",
                                "hope",
                                "truth",
                                "love"
                        ),
                        2,
                        "Jesus said 'I am the way and the TRUTH and the life.' "
                                + "Jesus Himself is the truth — when we follow Him, we learn to live truthfully!",
                        "John 14:6"
                ),
                new QuizQuestion(
                        4L,
                        "Your friend asks if you ate the last cookie. You did eat it. What should you say?",
                        List.of(
                                "No, I didn't eat it",
                                "Maybe the dog ate it",
                                "Yes, I ate it — I'm sorry!",
                                "I don't know what happened to it"
                        ),
                        2,
                        "Being honest about what we did — even small things like a cookie — "
                                + "builds trust with our friends and pleases God.",
                        "Exodus 20:16"
                ),
                new QuizQuestion(
                        5L,
                        "What happens when we choose to tell the truth?",
                        List.of(
                                "People might be upset, but they will trust us more",
                                "Nothing good ever happens",
                                "We always get in trouble",
                                "It doesn't really matter"
                        ),
                        0,
                        "When we tell the truth, we build trust. People may feel sad at first, "
                                + "but they will respect and trust us. That's how God designed relationships!",
                        "John 14:6"
                ),
                new QuizQuestion(
                        6L,
                        "Why does God want us to tell the truth?",
                        List.of(
                                "Because He wants us to get in trouble",
                                "Because truth builds love, trust, and strong relationships",
                                "Because lies are more fun",
                                "It doesn't matter to God"
                        ),
                        1,
                        "God is truth, and He created us to live in truth. Honest relationships "
                                + "are stronger and full of love — that's God's plan for us!",
                        "John 14:6"
                ),
                new QuizQuestion(
                        7L,
                        "What did lying do to Sam's relationship with Mom?",
                        List.of(
                                "It made Mom trust Sam more",
                                "Nothing changed",
                                "It broke Mom's trust and made Sam feel guilty",
                                "Mom didn't care at all"
                        ),
                        2,
                        "Lying broke trust between Sam and Mom and gave Sam a heavy feeling "
                                + "of guilt. Truth always leads to peace, but lies bring heaviness.",
                        "Exodus 20:16"
                )
        );
    }

    public List<QuizQuestion> getAllQuestions() {
        return questions;
    }

    public Optional<QuizQuestion> getQuestionById(Long id) {
        return questions.stream()
                .filter(q -> q.getId().equals(id))
                .findFirst();
    }
}

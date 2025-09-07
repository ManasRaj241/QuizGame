package com.quizapp.controllers;

import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {

    int x=5;
    //com
    // Just a dummy in-memory list for demo purpose
    private final Map<Integer, String> quizzes = new HashMap<>();

    @GetMapping
    public List<String> getAllQuizzes() {
        return new ArrayList<>(quizzes.values());
    }

    @GetMapping("/{id}")
    public String getQuizById(@PathVariable int id) {
        return quizzes.getOrDefault(id, "Quiz not found");
    }

    @PostMapping
    public String createQuiz(@RequestBody String quizName) {
        int id = quizzes.size() + 1;
        quizzes.put(id, quizName);
        return "Quiz created with ID: " + id;
    }

    @PutMapping("/{id}")
    public String updateQuiz(@PathVariable int id, @RequestBody String quizName) {
        if (quizzes.containsKey(id)) {
            quizzes.put(id, quizName);
            return "Quiz updated successfully!";
        }
        return "Quiz not found!";
    }

    @DeleteMapping("/{id}")
    public String deleteQuiz(@PathVariable int id) {
        if (quizzes.containsKey(id)) {
            quizzes.remove(id);
            return "Quiz deleted successfully!";
        }
        return "Quiz not found!";
    }
}

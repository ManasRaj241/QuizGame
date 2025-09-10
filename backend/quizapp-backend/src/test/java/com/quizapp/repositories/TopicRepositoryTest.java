package com.quizapp.repositories;

import com.quizapp.entity.Topic;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class TopicRepositoryTest {

    @Autowired
    private TopicRepository topicRepository;

    @AfterEach
    void tearDown() {
        topicRepository.deleteAll(); // avoid unique constraint violation
    }

    @Test
    void testSaveAndFindById() {
        Topic topic = new Topic("general", "General Knowledge", "Basics");
        Topic saved = topicRepository.saveAndFlush(topic);

        Optional<Topic> found = topicRepository.findById(saved.getId());

        assertTrue(found.isPresent());
        assertEquals("general", found.get().getCode());
    }

    @Test
    void testFindByCode() {
        Topic topic = new Topic("science", "Science", "Physics");
        topicRepository.saveAndFlush(topic);

        Optional<Topic> found = topicRepository.findByCode("science");

        assertTrue(found.isPresent());
        assertEquals("Science", found.get().getName());
    }

    @Test
    void testDeleteTopic() {
        Topic topic = new Topic("math", "Mathematics", "Algebra & Geometry");
        Topic saved = topicRepository.saveAndFlush(topic);

        topicRepository.deleteById(saved.getId());

        Optional<Topic> found = topicRepository.findById(saved.getId());
        assertFalse(found.isPresent());
    }
}

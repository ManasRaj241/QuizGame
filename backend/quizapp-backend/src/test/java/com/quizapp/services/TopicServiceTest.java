package com.quizapp.services;

import com.quizapp.entity.Topic;
import com.quizapp.repositories.TopicRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TopicServiceTest {

    @Mock
    private TopicRepository topicRepository;

    @InjectMocks
    private TopicService topicService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllTopics() {
        List<Topic> mockTopics = Arrays.asList(
                new Topic("general", "General Knowledge", "Basics"),
                new Topic("science", "Science", "Physics & Chemistry")
        );

        when(topicRepository.findAll()).thenReturn(mockTopics);

        List<Topic> topics = topicService.getAllTopics();

        assertEquals(2, topics.size());
        assertEquals("general", topics.get(0).getCode());
        verify(topicRepository, times(1)).findAll();
    }

    @Test
    void testGetTopicById_Found() {
        Topic topic = new Topic("general", "General Knowledge", "Basics");
        topic.setCode("general");
        when(topicRepository.findById(1L)).thenReturn(Optional.of(topic));

        Optional<Topic> found = topicService.getTopicById(1L);

        assertTrue(found.isPresent());
        assertEquals("general", found.get().getCode());
    }

    @Test
    void testGetTopicById_NotFound() {
        when(topicRepository.findById(1L)).thenReturn(Optional.empty());

        Optional<Topic> found = topicService.getTopicById(1L);

        assertFalse(found.isPresent());
    }

    @Test
    void testCreateTopic() {
        Topic topic = new Topic("general", "General Knowledge", "Basics");

        when(topicRepository.save(topic)).thenReturn(topic);

        Topic saved = topicService.createTopic(topic);

        assertEquals("general", saved.getCode());
        verify(topicRepository, times(1)).save(topic);
    }

    @Test
    void testUpdateTopic_Found() {
        Topic existing = new Topic("general", "General Knowledge", "Basics");
        Topic updated = new Topic("science", "Science", "Updated Description");

        when(topicRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(topicRepository.save(any(Topic.class))).thenAnswer(i -> i.getArguments()[0]);

        Optional<Topic> result = topicService.updateTopic(1L, updated);

        assertTrue(result.isPresent());
        assertEquals("science", result.get().getCode());
        assertEquals("Science", result.get().getName());
    }

    @Test
    void testUpdateTopic_NotFound() {
        Topic updated = new Topic("science", "Science", "Updated");

        when(topicRepository.findById(1L)).thenReturn(Optional.empty());

        Optional<Topic> result = topicService.updateTopic(1L, updated);

        assertFalse(result.isPresent());
    }

    @Test
    void testDeleteTopic_Found() {
        Topic existing = new Topic("general", "General Knowledge", "Basics");
        when(topicRepository.findById(1L)).thenReturn(Optional.of(existing));

        boolean deleted = topicService.deleteTopic(1L);

        assertTrue(deleted);
        verify(topicRepository, times(1)).delete(existing);
    }

    @Test
    void testDeleteTopic_NotFound() {
        when(topicRepository.findById(1L)).thenReturn(Optional.empty());

        boolean deleted = topicService.deleteTopic(1L);

        assertFalse(deleted);
        verify(topicRepository, never()).delete(any());
    }
}

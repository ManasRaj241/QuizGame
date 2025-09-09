package com.quizapp.services;

import com.quizapp.entity.Topic;
import com.quizapp.repositories.TopicRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TopicService {

    private final TopicRepository topicRepository;

    public TopicService(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    public List<Topic> getAllTopics() {
        return topicRepository.findAll();
    }

    public Optional<Topic> getTopicById(Long id) {
        return topicRepository.findById(id);
    }

    public Topic createTopic(Topic topic) {
        return topicRepository.save(topic);
    }

    public Optional<Topic> updateTopic(Long id, Topic updatedTopic) {
        return topicRepository.findById(id).map(existing -> {
            existing.setCode(updatedTopic.getCode());
            existing.setName(updatedTopic.getName());
            existing.setDescription(updatedTopic.getDescription());
            return topicRepository.save(existing);
        });
    }

    public boolean deleteTopic(Long id) {
        return topicRepository.findById(id).map(topic -> {
            topicRepository.delete(topic);
            return true;
        }).orElse(false);
    }
}

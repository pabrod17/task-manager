package com.imatia.taskmanagerAC.model.service;

import com.imatia.taskmanagerAC.model.dao.TaskDao;
import com.imatia.taskmanagerAC.model.entity.Task;
import com.imatia.taskmanagerAC.model.exception.InvalidDateRangeException;
import com.imatia.taskmanagerAC.model.exception.ResourceNotFoundException;
import com.imatia.taskmanagerAC.rest.dto.TaskDto;
import com.imatia.taskmanagerAC.rest.dto.TaskDtoConversor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskDao taskDao;

    @Override
    public TaskDto createTask(Task task) {
        if (task.getCreationDate() == null) {
            task.setCreationDate(Timestamp.valueOf(LocalDateTime.now()));
        }
        task.setCompleted(false);

        if (task.getEndingDate() != null && task.getCreationDate() != null) {
            if (task.getEndingDate().before(task.getCreationDate())) {
                throw new InvalidDateRangeException("The end date cannot be earlier than the creation date.");
            }
        }

        Task saved = taskDao.save(task);
        return TaskDtoConversor.toDto(saved);
    }

    @Override
    public TaskDto getTaskById(Long taskId) {
        Task task = taskDao.findById(taskId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found with id: " + taskId));
        return TaskDtoConversor.toDto(task);
    }

    @Override
    public List<TaskDto> getTasks() {
        return taskDao.findAll()
                .stream()
                .map(TaskDtoConversor::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public TaskDto markCompleted(Long taskId) {
        Task task = taskDao.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not with id: " + taskId));

        if(task.getCompleted()) {
            task.setCompleted(false);
            task.setEndingDate(null);
        } else {
            task.setCompleted(true);
            task.setEndingDate(Timestamp.valueOf(LocalDateTime.now()));
        }

        if (task.getEndingDate() != null && task.getCreationDate() != null) {
            if (task.getEndingDate().before(task.getCreationDate())) {
                throw new InvalidDateRangeException("The end date cannot be earlier than the creation date.");
            }
        }
        Task saved = taskDao.save(task);
        return TaskDtoConversor.toDto(saved);
    }

    @Override
    public void deleteTask(Long taskId) {
        Task task = taskDao.findById(taskId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found with id: " + taskId));
        taskDao.deleteById(taskId);
    }
}

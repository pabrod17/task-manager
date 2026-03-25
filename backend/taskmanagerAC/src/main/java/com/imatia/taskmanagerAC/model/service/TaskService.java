package com.imatia.taskmanagerAC.model.service;

import com.imatia.taskmanagerAC.model.entity.Task;
import com.imatia.taskmanagerAC.rest.dto.TaskDto;

import java.util.List;

public interface TaskService {

    TaskDto createTask(Task task);
    TaskDto getTaskById(Long taskId);
    List<TaskDto> getTasks();
    TaskDto markCompleted(Long taskId);
    void deleteTask(Long taskId);
}

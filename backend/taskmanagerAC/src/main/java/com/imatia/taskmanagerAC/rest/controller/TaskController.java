package com.imatia.taskmanagerAC.rest.controller;

import com.imatia.taskmanagerAC.model.entity.Task;
import com.imatia.taskmanagerAC.model.service.TaskService;
import com.imatia.taskmanagerAC.rest.dto.TaskDto;
import com.imatia.taskmanagerAC.rest.dto.TaskDtoConversor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/tasks")
public class TaskController {

  @Autowired
  private TaskService taskService;

  @PostMapping
  public ResponseEntity<TaskDto> create(@RequestBody TaskDto taskDto) {
    TaskDto taskSaved = taskService.createTask(TaskDtoConversor.fromDto(taskDto));
    return ResponseEntity.status(HttpStatus.CREATED).body(taskSaved);
  }

  @GetMapping("/{id}")
  public ResponseEntity<TaskDto> getTaskById(@PathVariable("id") Long taskId) {
    TaskDto taskDto = taskService.getTaskById(taskId);
    return ResponseEntity.ok(taskDto);
  }

  @GetMapping
  public ResponseEntity<List<TaskDto>> getTasks() {
    return ResponseEntity.ok(taskService.getTasks());
  }

  @PatchMapping("/{id}/complete")
  public ResponseEntity<TaskDto> markCompleted(@PathVariable("id") Long taskId) {
    return ResponseEntity.ok(taskService.markCompleted(taskId));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteTask(@PathVariable("id") Long taskId) {
    taskService.deleteTask(taskId);
    return ResponseEntity.noContent().build();
  }


}

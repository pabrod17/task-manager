package com.imatia.taskmanagerAC.rest.dto;

import com.imatia.taskmanagerAC.model.entity.Task;

import java.sql.Timestamp;
import java.time.LocalDateTime;

public class TaskDtoConversor {

    public static TaskDto toDto(Task task) {
        return new TaskDto(
                task.getId(),
                task.getName(),
                task.getText(),
                toLocalDateTime(task.getCreationDate()),
                toLocalDateTime(task.getEndingDate()),
                task.getCompleted()
        );
    }

    public static Task fromDto(TaskDto taskDto) {
        return new Task(
                taskDto.getId(),
            taskDto.getName(),
            taskDto.getText(),
            toTimestamp(taskDto.getCreationDate()),
            toTimestamp(taskDto.getEndingDate()),
            taskDto.getCompleted()
        );
    }

    private static Timestamp toTimestamp(LocalDateTime ldt) {
        return ldt == null ? null : Timestamp.valueOf(ldt);
    }
    private static LocalDateTime toLocalDateTime(Timestamp ts) {
        return ts == null ? null : ts.toLocalDateTime();
    }

}

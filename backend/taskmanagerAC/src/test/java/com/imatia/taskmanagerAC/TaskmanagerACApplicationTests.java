package com.imatia.taskmanagerAC;

import com.imatia.taskmanagerAC.model.dao.TaskDao;
import com.imatia.taskmanagerAC.model.entity.Task;
import com.imatia.taskmanagerAC.model.exception.InvalidDateRangeException;
import com.imatia.taskmanagerAC.model.exception.ResourceNotFoundException;
import com.imatia.taskmanagerAC.model.service.TaskService;
import com.imatia.taskmanagerAC.rest.dto.TaskDto;
import com.imatia.taskmanagerAC.rest.dto.TaskDtoConversor;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class TaskmanagerACApplicationTests {

	@Autowired
	private TaskService taskService;

	@Autowired
	private TaskDao taskDao;

	@Test
	void contextLoads() {
		assertThat(taskService).isNotNull();
	}

	@BeforeEach
	void cleanDatabase() {
		taskDao.deleteAll();
	}

	@Test
	void createTaskTest() {
		Task newTask = new Task(1L, "Task 1", "Description example",
				Timestamp.valueOf(LocalDateTime.of(2025,2,3,10,0)),
				null,
				false);
		TaskDto taskDto = taskService.createTask(newTask);
		Task taskSaved = TaskDtoConversor.fromDto(taskDto);
		assertThat(taskSaved.getName()).isEqualTo(newTask.getName());
		assertThat(taskSaved.getText()).isEqualTo(newTask.getText());
		assertThat(taskSaved.getCreationDate()).isEqualTo(newTask.getCreationDate());
		assertThat(taskSaved.getEndingDate()).isEqualTo(newTask.getEndingDate());
		assertThat(taskSaved.getCompleted()).isEqualTo(newTask.getCompleted());
	}

	@Test
	void createTaskWithNullNameTest() {
		Task invalidTask = new Task(null, null, "Description example", null, null, false);
		assertThatThrownBy(() -> taskService.createTask(invalidTask))
				.isInstanceOf(Exception.class);
	}

	@Test
	void createTaskWithNullTextTest() {
		Task invalidTask = new Task(null, "Task 1", null, null, null, false);
		assertThatThrownBy(() -> taskService.createTask(invalidTask))
				.isInstanceOf(Exception.class);
	}

	@Test
	void createTaskWithInvalidDatesTest() {
		Task invalidTask = new Task(null, "Task 1", null,
				Timestamp.valueOf(LocalDateTime.of(2025,2,3,10,0)),
				Timestamp.valueOf(LocalDateTime.of(2025,1,3,10,0)),
				false);
		assertThatThrownBy(() -> taskService.createTask(invalidTask))
				.isInstanceOf(InvalidDateRangeException.class);
	}

	@Test
	void getTaskByIdTest() {
		Task newTask = new Task(1L, "Task 1", "Description example",
				Timestamp.valueOf(LocalDateTime.of(2025,2,3,10,0)),
				null,
				false);
		TaskDto taskSaved = taskService.createTask(newTask);
		TaskDto taskDto = taskService.getTaskById(taskSaved.getId());
		assertThat(taskSaved.getName()).isEqualTo(taskDto.getName());
		assertThat(taskSaved.getText()).isEqualTo(taskDto.getText());
		assertThat(taskSaved.getCreationDate()).isEqualTo(taskDto.getCreationDate());
		assertThat(taskSaved.getEndingDate()).isEqualTo(taskDto.getEndingDate());
		assertThat(taskSaved.getCompleted()).isEqualTo(taskDto.getCompleted());
	}

	@Test
	void getTaskByIdWithInvalidIdTest() {
		assertThatThrownBy(() -> taskService.getTaskById(25L))
				.isInstanceOf(ResourceNotFoundException.class);
	}

	@Test
	void getTaskTest() {
		Task newTask = new Task(1L, "Task 1", "Description example",
				Timestamp.valueOf(LocalDateTime.of(2025,2,3,10,0)),
				null,
				false);
		Task newTask2 = new Task(2L, "Task 2", "Description example",
				Timestamp.valueOf(LocalDateTime.of(2025,2,3,10,0)),
				null,
				false);
		Task newTask3 = new Task(3L, "Task 3", "Description example",
				Timestamp.valueOf(LocalDateTime.of(2025,2,3,10,0)),
				null,
				false);
		taskService.createTask(newTask);
		taskService.createTask(newTask2);
		taskService.createTask(newTask3);
		List<TaskDto> tasksDto = taskService.getTasks();

		assertThat(3).isEqualTo(tasksDto.size());
	}

	@Test
	void markCompletedTrueTest() {
		Task newTask = new Task(1L, "Task 1", "Description example",
				Timestamp.valueOf(LocalDateTime.of(2025,2,3,10,0)),
				null,
				false);
		TaskDto taskDtoSaved = taskService.createTask(newTask);
		taskService.markCompleted(taskDtoSaved.getId());
		TaskDto taskDtoUpdated = taskService.getTaskById(taskDtoSaved.getId());
		assertThat(taskDtoSaved.getId()).isEqualTo(taskDtoUpdated.getId());
		assertThat(Boolean.TRUE).isEqualTo(taskDtoUpdated.getCompleted());
		assertThat(taskDtoUpdated.getEndingDate()).isNotNull();
	}

	@Test
	void markCompletedFalseTest() {
		Task newTask = new Task(1L, "Task 1", "Description example",
				Timestamp.valueOf(LocalDateTime.of(2025,2,3,10,0)),
				null,
				false);
		TaskDto taskDtoSaved = taskService.createTask(newTask);
		taskService.markCompleted(taskDtoSaved.getId());
		TaskDto taskDtoUpdatedTrue = taskService.getTaskById(taskDtoSaved.getId());
		taskService.markCompleted(taskDtoSaved.getId());
		TaskDto taskDtoUpdatedFalse = taskService.getTaskById(taskDtoSaved.getId());

		assertThat(taskDtoSaved.getId()).isEqualTo(taskDtoUpdatedFalse.getId());
		assertThat(Boolean.FALSE).isEqualTo(taskDtoUpdatedFalse.getCompleted());
		assertThat(taskDtoUpdatedFalse.getEndingDate()).isNull();
	}

	@Test
	void deleteInvalidTaskTest() {
		assertThatThrownBy(() -> taskService.deleteTask(25L))
				.isInstanceOf(ResourceNotFoundException.class);
	}

}

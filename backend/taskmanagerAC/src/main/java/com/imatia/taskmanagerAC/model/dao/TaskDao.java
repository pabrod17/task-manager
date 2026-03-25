package com.imatia.taskmanagerAC.model.dao;

import com.imatia.taskmanagerAC.model.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskDao extends JpaRepository <Task, Long> {}

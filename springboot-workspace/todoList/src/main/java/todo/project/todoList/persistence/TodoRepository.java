package todo.project.todoList.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import todo.project.todoList.model.TodoEntity;

import java.util.List;
import java.util.UUID;

public interface TodoRepository extends JpaRepository<TodoEntity, String> {
    List<TodoEntity> findByUserId(String userId);
}

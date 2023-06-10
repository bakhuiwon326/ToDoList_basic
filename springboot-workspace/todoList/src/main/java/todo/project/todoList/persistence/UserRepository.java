package todo.project.todoList.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import todo.project.todoList.model.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, String> {
    UserEntity findByEmail(String email);
    Boolean existsByEmail(String email);
    UserEntity findByEmailAndPassword(String email, String password);
}

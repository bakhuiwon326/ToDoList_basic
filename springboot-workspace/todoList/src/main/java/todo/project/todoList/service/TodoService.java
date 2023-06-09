package todo.project.todoList.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import todo.project.todoList.model.TodoEntity;
import todo.project.todoList.persistence.TodoRepository;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class TodoService {

    @Autowired
    TodoRepository todoRepository;

    public String testService(){
        // TodoEntity 생성
        TodoEntity entity = TodoEntity.builder().title("My first todo item - test").build();
        // DB에 저장
        todoRepository.save(entity);
        // DB에 검색
        TodoEntity savedEntity = todoRepository.findById(entity.getId()).get();
        return savedEntity.getTitle();
    }

    public List<TodoEntity> create(final TodoEntity entity){
        validate(entity);
        todoRepository.save(entity);
        List<TodoEntity> todoList = todoRepository.findByUserId(entity.getUserId());
        return todoList;
    }

    public List<TodoEntity> retrieve(final String userId){
        return todoRepository.findByUserId(userId);
    }

    public List<TodoEntity> update(final TodoEntity entity){
        validate(entity);
        final Optional<TodoEntity> origin = todoRepository.findById(entity.getId());
        origin.ifPresent(todo -> {
            todo.setTitle(entity.getTitle());
            todo.setDone(entity.isDone());
            todoRepository.save(todo);
        });
        return retrieve(entity.getUserId());
    }

    public List<TodoEntity> delete(final TodoEntity entity){
        validate(entity);
        try{
            todoRepository.delete(entity);
        }catch (Exception e){
            log.error("error deleting entity" + entity.getId() + e);
            throw new RuntimeException("error deleting entity " + entity.getId());
        }
        return retrieve(entity.getUserId());
    }

    private void validate(TodoEntity entity){
        if(entity == null){
            log.warn("Entity cannot be null");
            throw new RuntimeException("Entity cannot be null.");
        }else if(entity.getUserId() == null){
            log.warn("Unknown User");
            throw new RuntimeException("Unknown user");
        }
    }

}

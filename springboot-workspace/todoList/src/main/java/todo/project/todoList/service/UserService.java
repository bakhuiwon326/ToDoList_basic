package todo.project.todoList.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import todo.project.todoList.model.UserEntity;
import todo.project.todoList.persistence.UserRepository;

import java.util.List;

@Slf4j
@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public UserEntity create(UserEntity userEntity){
        if(userEntity == null || userEntity.getEmail() == null) {
            throw new RuntimeException("Invalid arguments");
        }
        final String email = userEntity.getEmail();
        if(userRepository.existsByEmail(email)){
            log.warn("email already exists{}", email);
            throw new RuntimeException("Email already exists");
        }
        return userRepository.save(userEntity);
    }

    public UserEntity getByCredentials(final String email, final String password, final PasswordEncoder encoder){
        final UserEntity origin = userRepository.findByEmail(email);
        if(origin != null && encoder.matches(password, origin.getPassword())) return origin;
        return null;
    }

    public List<UserEntity> getAllUsers(){
        return userRepository.findAll();
    }
}

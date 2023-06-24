package todo.project.todoList.controller;

import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import todo.project.todoList.dto.ResponseDTO;
import todo.project.todoList.dto.UserDTO;
import todo.project.todoList.model.UserEntity;
import todo.project.todoList.security.TokenProvider;
import todo.project.todoList.service.UserService;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/auth")
public class UserController {
    @Autowired
    UserService userService;
    @Autowired
    private TokenProvider tokenProvider;
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO dto){
        try{
            UserEntity user = UserEntity.builder()
                    .email(dto.getEmail())
                    .username(dto.getUsername())
                    .password(passwordEncoder.encode(dto.getPassword()))
                    .build();
            UserEntity registeredUser = userService.create(user);
            UserDTO responseDTO = UserDTO.builder()
                    .email(registeredUser.getEmail())
                    .username(registeredUser.getUsername())
                    .build();
            return ResponseEntity.ok().body(responseDTO);
        } catch (Exception e){
            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticate(@RequestBody UserDTO dto){
        System.out.println("login APi 입니다.");
        UserEntity user = userService.getByCredentials(dto.getEmail(), dto.getPassword(), passwordEncoder);
        if(user != null){
            final String token = tokenProvider.create(user);
            System.out.println("로그인 후 발급된 토큰: " + token);
            final UserDTO responseUserDTO = UserDTO.builder()
                    .email(user.getEmail())
                    .id(user.getId())
                    .token(token)
                    .build();
            return ResponseEntity.ok().body(responseUserDTO);
        }
        else{
            ResponseDTO responseDTO = ResponseDTO.builder().error("Login failed").build();
            return ResponseEntity.badRequest().body(responseDTO);
        }
    }

    @GetMapping("/returnAll")
    public ResponseEntity<?> returnAll(){
        List<UserEntity> users =  userService.getAllUsers();
        return ResponseEntity.ok().body(users);
    }

}

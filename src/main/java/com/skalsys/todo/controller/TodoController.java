package com.skalsys.todo.controller;

import com.skalsys.todo.entity.Todo;
import com.skalsys.todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController // initialisierung
public class TodoController {
    @Autowired //Spring bitte gib mir ein singleton
    private TodoRepository repository;

    @GetMapping("/todos")
    public Todo getAllTodos(){
       // return repository.findAll();
        Todo test = new Todo();
        test.setDescription("Das ist ein Test");
        test.setDate("07.05.21");
        test.setProgress(0);
        return test;
    }

    @PostMapping("/todos")
    public String createTodo(@RequestBody Todo newTodo){
        repository.save(newTodo);
        return "done successfully";
    }

}

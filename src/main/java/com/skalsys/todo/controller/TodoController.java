package com.skalsys.todo.controller;

import com.skalsys.todo.entity.Todo;
import com.skalsys.todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@CrossOrigin("*")
@RestController // initialisierung
public class TodoController {
    @Autowired //Spring bitte gib mir ein singleton
    private TodoRepository repository;

    @RequestMapping("/")
    public String hello(){
        return "Hallo was geht";
    }

    @GetMapping("/todos")
    public List<Todo> getAllTodos(){
        return repository.findAll();
    }

    @RequestMapping("/todos/{id}")
    public Todo getTodo(@PathVariable int id){
        return repository.getOne(id);
    }

    @PostMapping("/todos")
    public String addTodo(@RequestBody Todo newTodo){
        repository.save(newTodo);
        return "done successfully";
    }

    @DeleteMapping("/todos/{id}")
    public String deleteTodo(@PathVariable int id) {
        repository.deleteById(id);
        return "done";
    }

    @PutMapping("/todos/{id}")
    public void updateTodo(@RequestBody Todo newTodo, @PathVariable int id) {
        if(newTodo.getId() == id)repository.save(newTodo);
        //repository.getOne(id).setDate(newTodo.getDate());
        //repository.getOne(id).setDescription(newTodo.getDescription());
    }

}

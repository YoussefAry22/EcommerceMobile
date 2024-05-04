package com.twd.SpringSecurityJWT.controller;
import com.twd.SpringSecurityJWT.entity.Commande;
import com.twd.SpringSecurityJWT.service.CommandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users/commands")
public class CommandController {

    @Autowired
    private CommandService commandService;

    @PostMapping("/add")
    public Commande addCommande(@RequestBody Commande commande) {
        return commandService.addCommande(commande);
    }



    @DeleteMapping("/delete/{id}")
    public String deleteCommande(@PathVariable Long id) {
        return commandService.deleteCommande(id);
}}

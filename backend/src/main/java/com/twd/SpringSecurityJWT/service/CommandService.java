package com.twd.SpringSecurityJWT.service;
import com.twd.SpringSecurityJWT.entity.Commande;
import com.twd.SpringSecurityJWT.repository.CommandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommandService {

    @Autowired
    private CommandRepository commandRepository;

    public Commande addCommande(Commande commande) {
        return commandRepository.save(commande);
    }

    public String deleteCommande(Long id) {
        commandRepository.deleteById(id);
        return "Commande with ID " + id + " deleted successfully";
    }
}
